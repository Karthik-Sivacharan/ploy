import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const clashGrotesk = localFont({
  src: [
    { path: "./fonts/ClashGrotesk-Extralight.woff2", weight: "200" },
    { path: "./fonts/ClashGrotesk-Light.woff2", weight: "300" },
    { path: "./fonts/ClashGrotesk-Regular.woff2", weight: "400" },
    { path: "./fonts/ClashGrotesk-Medium.woff2", weight: "500" },
    { path: "./fonts/ClashGrotesk-Semibold.woff2", weight: "600" },
    { path: "./fonts/ClashGrotesk-Bold.woff2", weight: "700" },
  ],
  variable: "--font-clash-grotesk",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI-Native Marketing Platform",
  description: "One platform for brand, website, and multi-channel growth",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${clashGrotesk.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>{children}</TooltipProvider>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
