// The package's JS entry point — INTERNAL. Nothing here is published to npm: only `dist/` (the
// generated `.scss` files) is copied into the wrapper packages, and `@porsche-design-system/…/scss`
// exposes it under the `sass` condition alone, with no JavaScript and no types. This entry point
// exists for the storefront docs and the skills generator. Verify with
// `ls packages/components-js/dist/components-wrapper/scss` — that folder is the npm package. See
// `docs/public-api.md`.
//
// Package API: the documented `scssMeta` model, the `scssDeprecations` list of the legacy surface
// still shipping beside it, their types, the `kindOf` declaration discriminant and the `flatten`
// catalog walker. The deprecation marker, its wording and the message helpers come from
// `@porsche-design-system/shared/deprecation`, which importers of this entry point use directly.
//
// Not exported on purpose: the catalog both exports are projections of, `stripDeprecated` which is
// only meaningful with it, and `scssIdentifier`, whose spelling is already applied to the exported
// list. SCSS-file generation (`scss/index.ts`) is imported directly by the build scripts.
export { kindOf } from './kind';
export { scssDeprecations, scssMeta } from './meta';
export { flatten } from './scss/render';
export type * from './types';
