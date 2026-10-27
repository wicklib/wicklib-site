# AGENTS.md

Instructions for AI agents and maintainers working in this repository.

## Mission

`wicklib-site` is the public landing page and documentation for Wicklib, deployed at
`wicklib.com`. It is the public face of the library and the first place a developer forms an
opinion about it.

Read `PLAN.md` before starting work.

## The non-negotiable standard

Build the durable version first. Do not hand-wave docs, do not hardcode API shapes that will
drift, and do not take shortcuts that force a rewrite of the docs IA or the demo later.

## Hard rules

- Consume **published** Wicklib packages only, pinned to exact versions.
- Never copy engine source into this repository, and never link across repos for local dev.
  Use `apps/playground` in the `wicklib` repo for that.
- API reference is generated from the published `.d.ts`. Prose never restates type
  signatures by hand.
- Code is MIT. Documentation prose is CC BY 4.0.
- No secrets, no analytics that identify users without consent, no tracking pixels.
- Accessibility is not optional: semantic HTML, keyboard navigation, visible focus.
- Do not publish a page that promises an unimplemented feature without an explicit status
  label.

## Workflow

1. Content and IA changes start in `PLAN.md` or an RFC.
2. Build first (`pnpm build`), then typecheck; Next generates route types.
3. `pnpm format:check` before committing.
4. Conventional Commits with DCO sign-off.

## Commands

```sh
pnpm install
pnpm dev
pnpm build
pnpm typecheck
pnpm format:check
```

## Definition of done

- Page builds and typechecks.
- Links resolve; headings are structured; metadata is set.
- No unpublished package references.
- Licensing and claims match the actual state of the library.
