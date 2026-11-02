# wicklib-site

Landing page and documentation for [Wicklib](https://wicklib.com).

**Status: Phase 3 in progress.** Landing page, docs, API reference, live demo, docs validation,
sitemap, robots, Open Graph metadata, and generated changelogs are in place.

## Development

```sh
pnpm install
pnpm dev
```

## Checks

```sh
pnpm build
pnpm typecheck
pnpm api:generate
pnpm changelog:generate
pnpm docs:check
```

Build runs first because Next generates route types and `next-env.d.ts`.

## Structure

- `app/(home)` — landing page
- `app/demo` — live chart pinned to the published core version
- `app/docs` — Fumadocs documentation
- `content/docs` — MDX source, including generated API pages
- `lib/source.ts` — Fumadocs content source
- `scripts/generate-api.mjs` — TypeDoc generation
- `scripts/check-docs.mjs` — internal link and heading-anchor validation

## Deployment

Vercel, production on `main`, preview per pull request. Point `wicklib.com` at the
project and add `www` as a redirect.

## Licenses

Code: MIT. Documentation prose: CC BY 4.0. See [LICENSE](./LICENSE) and
[LICENSE-docs](./LICENSE-docs).
