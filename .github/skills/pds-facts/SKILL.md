---
name: pds-facts
description: "Shared Porsche Design System facts for every dependency-update agent: repository shape, held-back deps, the TypeScript-under-Angular ceiling, hard rules, and file locations."
version: "1.0"
---

# PDS Dependency-Update Facts

Shared facts for every agent in the dependency-update workflow. Read this before
acting.

## Repository shape

- npm workspaces monorepo. Root scripts wrap `syncpack`:
  - `npm run npm:outdated` → `syncpack update --check` (read-only; exits **non-zero when updates exist** — that is data, not failure).
  - `npm run npm:lint` / `npm run npm:format` → `syncpack lint` / `syncpack format --check`.
- Deterministic helper scripts live in `.turbo-spec/scripts/deps/`.
- Run artifacts live in `.turbo-spec/out/`.

## Held-back dependencies (NEVER bump these)

Upgraded deliberately by humans, never by this workflow (mirrors the `isIgnored`
group in `.syncpackrc.json`):

- `@porsche-design-system/**`
- `@playwright/test`
- `@stencil/core`

`syncpack` already skips them, so they should never appear in the outdated
report — but never add them to a plan or override under any circumstances.

## TypeScript ↔ Angular ceiling (hard constraint)

Angular caps the supported TypeScript version via `MAX_TS_VERSION` in
`packages/components-angular/node_modules/@angular/compiler-cli/src/typescript_support.js`.
That ceiling is only knowable **after** the new Angular installs. `typescript`
must always end **≤ `MAX_TS_VERSION`**; the `angular-migrations` stage reconciles
it deterministically via `reconcile-ts.mjs`.

## Hard rules (never violate)

- Never push to `main`; work happens on a `chore/dependency-updates-<date>` branch and lands via PR.
- Never bump a held-back dependency.
- Never use `npm install --legacy-peer-deps`, `--force`, or `npm audit fix`.
- Never hand-edit `package-lock.json`; regenerate it via `npm install`.
- Target versions are **frozen** from the outdated report — never re-choose a version.
