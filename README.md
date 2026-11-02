# wicklib-site

Landing page and documentation for [Wicklib](https://wicklib.com).

**Status: Phase 2 — documentation content.** The landing page, docs routes, usage guides,
and renderer documentation are in place. API-reference generation and the live demo remain.

## Development

```sh
pnpm install
pnpm dev
```

## Checks

```sh
pnpm build
pnpm typecheck
```

Build runs first because Next generates route types and `next-env.d.ts`.

## Structure

- `app/(home)` — landing page
- `app/docs` — Fumadocs documentation
- `content/docs` — MDX source
- `lib/source.ts` — Fumadocs content source

## Deployment

Vercel, production on `main`, preview per pull request. Point `wicklib.com` at the
project and add `www` as a redirect.

## Licenses

Code: MIT. Documentation prose: CC BY 4.0. See [LICENSE](./LICENSE) and
[LICENSE-docs](./LICENSE-docs).
