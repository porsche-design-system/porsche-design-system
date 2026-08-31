// The package's JS entry point — INTERNAL. Nothing here is published to npm: only `dist/index.css`
// is copied into the wrapper packages, and `@porsche-design-system/…/tailwindcss` resolves to that
// stylesheet alone. This entry point exists for the storefront docs and the skills generator. Verify
// with `ls packages/components-js/dist/components-wrapper/tailwindcss` — that folder is the npm
// package. See `docs/public-api.md`.
//
// Package API: the documented `tailwindMeta` model, the `tailwindDeprecations` list of the legacy
// surface still shipping beside it, their types and the `kindOf` declaration discriminant. The
// deprecation marker, its wording and the message helpers come from
// `@porsche-design-system/shared/deprecation`, which importers of this entry point use directly.
//
// Not exported on purpose: the catalog both exports are projections of, `stripDeprecated` which is
// only meaningful with it, and `tailwindIdentifier`, whose spelling is already applied to the
// exported list. CSS-file generation (`css/index.ts`) is imported directly by `scripts/build.ts`.
export { kindOf } from './kind';
export { tailwindDeprecations, tailwindMeta } from './meta';
export type * from './types';
