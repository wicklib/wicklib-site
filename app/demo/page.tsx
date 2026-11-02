import type { Metadata } from "next";

import { DemoChart } from "./demo-chart";

export const metadata: Metadata = {
  title: "Live demo",
  description: "A live Wicklib chart running against the published @wicklib/core package.",
};

export default function DemoPage() {
  return (
    <main className="flex min-h-screen flex-col bg-neutral-50 text-neutral-950 dark:bg-neutral-950 dark:text-white">
      <header className="border-b border-neutral-200 dark:border-neutral-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="/" className="text-sm font-semibold tracking-tight">
            wicklib <span className="font-normal text-neutral-500">demo</span>
          </a>
          <nav className="flex items-center gap-6 text-sm text-neutral-600 dark:text-neutral-300">
            <a href="/docs" className="hover:text-neutral-950 dark:hover:text-white">
              Docs
            </a>
            <a
              href="https://github.com/wicklib/wicklib"
              className="hover:text-neutral-950 dark:hover:text-white"
            >
              GitHub
            </a>
          </nav>
        </div>
      </header>
      <section className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">
            Live demo · pinned to @wicklib/core 0.10.0
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            Candles, annotations, and interaction from the published package.
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
            This page imports the exact published core version from npm. It exercises candlestick
            rendering, price lines, markers, themes, crosshair, zoom, pan, and screenshot export.
          </p>
        </div>
        <DemoChart />
      </section>
    </main>
  );
}
