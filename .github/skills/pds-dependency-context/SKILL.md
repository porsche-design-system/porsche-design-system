---
name: pds-dependency-context
description: "Shared Porsche Design System facts for dependency-update agents: held-back deps, lockstep families, hard rules, and file locations."
version: "1.0"
---

# PDS Dependency-Update Context

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

## Lockstep families (bump together, as a unit)

Group related packages so they move in lockstep. Assign each update a `group`:

- **angular** — `@angular/*`, `ng-packagr`, `zone.js`
- **react** — `react`, `react-dom`, `@types/react`, `@types/react-dom`
- **react-router** — `react-router`, `react-router-dom`, `@react-router/*`
- **tailwind** — `tailwindcss`, `@tailwindcss/*`
- **ag-grid** — `ag-grid-community`, `ag-grid-enterprise`, `ag-grid-angular`, `ag-grid-react`, `ag-grid-vue3`
- **vanilla-extract** — `@vanilla-extract/*`
- **next** — `next`, `@next/*`
- **vitest** — `vitest`, `@vitest/ui`
- everything else → `group: other`

A family is applied all-or-nothing: include every member the report lists, or
defer the whole family.

## TypeScript ↔ Angular ceiling (hard constraint)

Angular caps the supported TypeScript version via `MAX_TS_VERSION` in
`packages/components-angular/node_modules/@angular/compiler-cli/src/typescript_support.js`.
That ceiling is only knowable **after** the new Angular installs. Therefore:

- If the Angular family is bumped, **exclude `typescript` from this round's
  `updates`** and record it in `excluded`. The `angular-migrations` stage
  reconciles TypeScript against the new ceiling.

## Hard rules (never violate)

- Never push to `main`; work happens on a `chore/dependency-updates-<date>` branch and lands via PR.
- Never bump a held-back dependency.
- Never use `npm install --legacy-peer-deps`, `--force`, or `npm audit fix`.
- Never hand-edit `package-lock.json`; regenerate it via `npm install`.
- Target versions are **frozen** from the outdated report — never re-choose a version.
