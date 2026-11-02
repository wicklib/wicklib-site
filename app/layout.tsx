import type { Metadata } from "next";
import type { ReactNode } from "react";
import { RootProvider } from "fumadocs-ui/provider/next";

import "./global.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://wicklib.com"),
  title: {
    default: "Wicklib — open-source charting engine",
    template: "%s | Wicklib",
  },
  description:
    "Canvas-first, framework-agnostic charting engine for the web. Open core, typed API, built for scale.",
  openGraph: {
    type: "website",
    siteName: "Wicklib",
    title: "Wicklib — open-source charting engine",
    description:
      "Canvas-first charting engine with candlestick, line, area, and histogram series, drawings, themes, export, and WickScript.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wicklib — open-source charting engine",
    description:
      "Canvas-first charting engine with candlestick, line, area, and histogram series, drawings, themes, export, and WickScript.",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
