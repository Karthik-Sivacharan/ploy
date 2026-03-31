import { NextRequest, NextResponse } from "next/server";

// ---------------------------------------------------------------------------
// In-memory rate limiter — 100 requests per minute per IP
// ---------------------------------------------------------------------------

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 100;

const ipHits = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipHits.get(ip);

  if (!entry || now > entry.resetAt) {
    ipHits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

// ---------------------------------------------------------------------------
// Domain validation
// ---------------------------------------------------------------------------

/** Allow only valid-looking domains (letters, digits, hyphens, dots). */
const DOMAIN_RE = /^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+$/;

function isValidDomain(domain: string): boolean {
  if (domain.length > 253) return false;
  if (domain.includes("..")) return false;
  return DOMAIN_RE.test(domain);
}

// ---------------------------------------------------------------------------
// GET handler
// ---------------------------------------------------------------------------

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ domain: string }> },
) {
  const { domain } = await params;

  // Validate domain
  if (!isValidDomain(domain)) {
    return NextResponse.json(
      { error: "Invalid domain parameter" },
      { status: 400 },
    );
  }

  // Rate limit by IP
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Try again later." },
      { status: 429 },
    );
  }

  // Brandfetch client ID — prefer server-only var, fall back to public one
  const clientId =
    process.env.BRANDFETCH_CLIENT_ID ??
    process.env.NEXT_PUBLIC_BRANDFETCH_CLIENT_ID;
  if (!clientId) {
    return NextResponse.json(
      { error: "Brandfetch client ID is not configured" },
      { status: 500 },
    );
  }

  const brandfetchUrl = `https://cdn.brandfetch.io/${domain}/w/512/h/512/icon?c=${clientId}`;

  try {
    const upstream = await fetch(brandfetchUrl, {
      headers: {
        Referer: "https://useploy.vercel.app/",
      },
    });

    if (!upstream.ok) {
      return NextResponse.json(
        { error: "Logo not found" },
        { status: 404 },
      );
    }

    const contentType =
      upstream.headers.get("content-type") ?? "image/png";
    const body = await upstream.arrayBuffer();

    return new NextResponse(body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch logo from upstream" },
      { status: 502 },
    );
  }
}
