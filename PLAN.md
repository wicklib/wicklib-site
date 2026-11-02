# wicklib-site — Implementation Plan

Status: Phase 3 in progress. Phase 2 is complete; generated changelogs and SEO metadata are
implemented. Versioned docs and API-symbol search tuning remain.

## Phase 2 — docs content

1. [done] Getting started, package overview, and installation expectations.
2. [done] Core concepts, time model, renderer, and package boundaries.
3. [done] API reference generated from the published `.d.ts` with TypeDoc, not hand-written.
4. [done] Guides: charts, renderers, series, datafeeds, drawings, themes, export, React,
   WickScript, migration, and licensing.
5. [done] Demo page pinned to exact `@wicklib/core@0.10.0`.
6. [done] Internal link and heading-anchor validation in CI.

## Phase 3 — versioned docs

1. Version selector wired to Fumadocs; `v1` route from the first stable release.
2. [done] Changelog pages generated from Changesets output.
3. Search tuned for API symbols.
4. [done] Open Graph image, sitemap, robots, and canonical metadata.

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
