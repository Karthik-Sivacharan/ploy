/**
 * Inline SVG data URI placeholders for mock/demo images.
 * Work in both light and dark mode — uses mid-grey tones (#9ca3af, #6b7280).
 * No external dependencies; safe for consumer projects without local assets.
 */

function encode(svg: string): string {
  return `data:image/svg+xml,${encodeURIComponent(svg.replace(/\n\s*/g, ""))}`;
}

/** Generic image placeholder — dashed border with image icon silhouette */
export const PLACEHOLDER_IMAGE = encode(`
  <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" fill="none">
    <rect x="4" y="4" width="392" height="292" rx="12" stroke="#9ca3af" stroke-width="1.5"
      stroke-dasharray="8 4" />
    <path d="M170 170l20-28 16 20 12-10 22 30H160z" fill="#d1d5db"/>
    <circle cx="182" cy="132" r="12" fill="#d1d5db"/>
  </svg>
`);

/** Square logo placeholder — compact with dashed border */
export const PLACEHOLDER_LOGO = encode(`
  <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" fill="none">
    <rect x="4" y="4" width="112" height="112" rx="10" stroke="#9ca3af" stroke-width="1.5"
      stroke-dasharray="6 3" />
    <rect x="36" y="44" width="48" height="8" rx="4" fill="#d1d5db"/>
    <rect x="44" y="60" width="32" height="6" rx="3" fill="#d1d5db"/>
  </svg>
`);

/** Circular avatar placeholder — person silhouette */
export const PLACEHOLDER_AVATAR = encode(`
  <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" fill="none">
    <circle cx="60" cy="60" r="58" stroke="#9ca3af" stroke-width="1.5"
      stroke-dasharray="6 3" />
    <circle cx="60" cy="48" r="16" fill="#d1d5db"/>
    <path d="M32 96c0-16 12-28 28-28s28 12 28 28" fill="#d1d5db"/>
  </svg>
`);

/** Brand asset placeholder — wider landscape format */
export const PLACEHOLDER_BRAND = encode(`
  <svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" fill="none">
    <rect x="4" y="4" width="392" height="192" rx="12" stroke="#9ca3af" stroke-width="1.5"
      stroke-dasharray="8 4" />
    <rect x="140" y="80" width="120" height="12" rx="6" fill="#d1d5db"/>
    <rect x="160" y="100" width="80" height="8" rx="4" fill="#d1d5db"/>
  </svg>
`);

/** Generate a custom-sized placeholder with optional dimensions */
export function placeholder(width = 400, height = 300): string {
  const rx = Math.min(12, Math.min(width, height) / 4);
  const cx = width / 2;
  const cy = height / 2;
  const barW = Math.min(80, width * 0.3);
  return encode(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" fill="none">
      <rect x="4" y="4" width="${width - 8}" height="${height - 8}" rx="${rx}"
        stroke="#9ca3af" stroke-width="1.5" stroke-dasharray="8 4" />
      <rect x="${cx - barW / 2}" y="${cy - 4}" width="${barW}" height="8" rx="4" fill="#d1d5db"/>
    </svg>
  `);
}
