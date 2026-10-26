# wicklib-site — Implementation Plan

Status: Phase 1 complete. Landing page and docs shell build.

## Phase 2 — docs content

1. Getting started with installation from the first published prerelease.
2. Core concepts: renderer architecture, extension registry, datafeed contract.
3. API reference generated from the published `.d.ts` (TypeDoc → MDX), not hand-written.
4. Guides: candlestick chart, custom series, crosshair sync, theming.
5. Demo page that installs `@wicklib/core` pinned to an exact version.
6. Link checking and heading anchors in CI.

## Phase 3 — versioned docs

1. Version selector wired to Fumadocs; `v1` route from the first stable release.
2. Changelog page generated from Changesets output.
3. Search tuned for API symbols.
4. Open Graph images and sitemap.

## Phase 4 — commercial surface

1. Licensing page with plan comparison and FAQ.
2. Redirect to checkout/purchase (external provider).
3. No license validation in the site; that is `@wicklib/pro`'s job.
4. Optional customer portal is a separate app, not this repo.

## Rules

- The site consumes **published** packages only, pinned to exact versions.
- No source copies of the engine in this repo, ever.
- API reference is generated; prose never restates type signatures by hand.
- Docs prose is CC BY 4.0; code is MIT.

## Deployment

Vercel. Production on `main`, previews per pull request. `wicklib.com` points at the
project; `www` redirects to the apex.
