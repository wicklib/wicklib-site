import Link from "next/link";

const features = [
  {
    title: "Canvas-first",
    body: "Layered Canvas2D rendering with a WebGL2 backend planned behind the same renderer interface.",
  },
  {
    title: "Typed API",
    body: "A frozen, API-Extractor-gated TypeScript surface. No any, no leaking internals.",
  },
  {
    title: "Extension registry",
    body: "Series, indicators, drawings and script runtimes plug into one registry with license metadata.",
  },
  {
    title: "Open core",
    body: "Apache-2.0 engine, commercially licensed analytics. One boundary, enforced in CI.",
  },
];

const packages = [
  ["@wicklib/core", "Renderer, scales, series, panes, datafeed"],
  ["@wicklib/indicators", "Built-in indicator catalog"],
  ["@wicklib/script", "WickScript runtime — TypeScript for charts"],
  ["@wicklib/pro", "Orderflow, volume profile, layouts and strategy"],
];

export default function HomePage() {
  return (
    <main className="flex-1">
      <header className="border-b border-neutral-200 dark:border-neutral-800">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-sm font-semibold tracking-tight">
            wicklib
          </Link>
          <nav className="flex items-center gap-6 text-sm text-neutral-600 dark:text-neutral-300">
            <Link href="/docs" className="hover:text-neutral-950 dark:hover:text-white">
              Docs
            </Link>
            <Link
              href="https://github.com/wicklib/wicklib"
              className="hover:text-neutral-950 dark:hover:text-white"
            >
              GitHub
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-24">
        <p className="mb-6 inline-flex items-center rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-600 dark:border-neutral-800 dark:text-neutral-300">
          Phase 1 — foundation
        </p>
        <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-neutral-950 dark:text-white">
          The charting engine you can build a platform on.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600 dark:text-neutral-300">
          Wicklib is an open-source, Canvas-first charting engine for the web. Framework agnostic,
          typed end to end, and designed so the free engine and the commercial analytics share one
          boundary instead of one codebase.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/docs"
            className="rounded-md bg-neutral-950 px-5 py-3 text-sm font-medium text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
          >
            Read the docs
          </Link>
          <Link
            href="https://github.com/wicklib/wicklib"
            className="rounded-md border border-neutral-300 px-5 py-3 text-sm font-medium hover:border-neutral-950 dark:border-neutral-700 dark:hover:border-white"
          >
            View the source
          </Link>
        </div>
      </section>

      <section className="border-y border-neutral-200 dark:border-neutral-800">
        <div className="mx-auto grid max-w-5xl gap-px px-6 py-16 sm:grid-cols-2">
          {features.map((feature) => (
            <div key={feature.title} className="p-6">
              <h2 className="text-base font-semibold text-neutral-950 dark:text-white">
                {feature.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                {feature.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-950 dark:text-white">
          Packages
        </h2>
        <div className="mt-8 divide-y divide-neutral-200 dark:divide-neutral-800">
          {packages.map(([name, description]) => (
            <div
              key={name}
              className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-6"
            >
              <code className="w-56 shrink-0 text-sm font-medium text-neutral-950 dark:text-white">
                {name}
              </code>
              <span className="text-sm text-neutral-600 dark:text-neutral-300">{description}</span>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-neutral-500 dark:text-neutral-400">
          <code>@wicklib/script</code> is opt-in: the sandbox adds a wasm payload that basic charts
          should not pay for.
        </p>
      </section>

      <footer className="mt-auto border-t border-neutral-200 dark:border-neutral-800">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-8 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between dark:text-neutral-400">
          <span>© 2026 Wicklib contributors. Apache-2.0 engine, commercial analytics.</span>
          <span>
            <Link href="/docs/licensing" className="hover:text-neutral-950 dark:hover:text-white">
              Licensing
            </Link>
          </span>
        </div>
      </footer>
    </main>
  );
}
