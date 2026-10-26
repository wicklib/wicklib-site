import type { Metadata } from "next";
import type { ReactNode } from "react";
import { RootProvider } from "fumadocs-ui/provider/next";

import "./global.css";

export const metadata: Metadata = {
  title: {
    default: "Wicklib — open-source charting engine",
    template: "%s | Wicklib",
  },
  description:
    "Canvas-first, framework-agnostic charting engine for the web. Open core, typed API, built for scale.",
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
