// The `./meta` entry point — INTERNAL. `meta/` is never copied into the wrapper packages; the
// published `@porsche-design-system/…/vanilla-extract` surface is built from `src/` alone. This
// entry point describes that surface for the storefront docs and the skills generator, so removing
// an export here is not a breaking change while removing one from `src/` is. Verify with
// `ls packages/components-js/dist/components-wrapper/vanilla-extract` — that folder is the npm
// package. See `docs/public-api.md`.
//
// Package API: the documented `vanillaExtractMeta` model, the `vanillaExtractDeprecations` list of
// the legacy surface still shipping beside it, their types, and the `kindOf` leaf discriminant.
//
// The deprecated surface is one shared `Deprecations` and nothing else — the same single export
// scss exposes — so an audit reads names and markers without knowing this package's layout.
export { vanillaExtractDeprecations } from './deprecations';
export { kindOf } from './kind';
export { vanillaExtractMeta } from './meta';
export type * from './types';
