---
name: pds-planning-policy
description: "Porsche Design System dependency PLANNING policy (planner agent only): lockstep families, all-or-nothing grouping, and the TypeScript-defer-under-Angular decision."
version: "1.0"
---

# PDS Dependency Planning Policy

Planning policy for the `decide` agent only. Assumes the `pds-facts` skill.

## Lockstep families (bump together, as a unit)

Group related packages so they move in lockstep. Assign each update a `group`:

- **angular** — `@angular/**`, `ng-packagr`, `zone.js`
- **react** — `react`, `react-dom`, `@types/react`, `@types/react-dom`
- **react-router** — `react-router`, `react-router-dom`, `@react-router/**`
- **tailwind** — `tailwindcss`, `@tailwindcss/**`
- **ag-grid** — `ag-grid-community`, `ag-grid-enterprise`, `ag-grid-angular`, `ag-grid-react`, `ag-grid-vue3`
- **vanilla-extract** — `@vanilla-extract/**`
- **next** — `next`, `@next/**`
- **vitest** — `vitest`, `@vitest/ui`
- everything else → `group: other`

A family is applied all-or-nothing: include every member the report lists, or
defer the whole family. This is gate-enforced by `check-families.mjs`.

## TypeScript defer under Angular

If the Angular family is bumped, **exclude `typescript` from this round's
`updates`** and record it in `excluded` (carry its frozen `from`/`to` verbatim).
The `angular-migrations` stage reconciles TypeScript against the new
`MAX_TS_VERSION` ceiling (see `pds-facts`).
