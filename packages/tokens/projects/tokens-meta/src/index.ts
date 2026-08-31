// The package's entry point — INTERNAL. `@porsche-design-system/tokens-meta` is never published;
// the public token surface is `@porsche-design-system/tokens`, reachable as
// `@porsche-design-system/…/tokens`. This entry point describes that surface for the storefront
// docs and the skills generator, so removing an export here is not a breaking change while removing
// a token from `@porsche-design-system/tokens` is. Verify with
// `grep -rl tokensMeta packages/components-*/dist/*-wrapper/` — those folders are the npm packages.
// See `docs/public-api.md`.
//
// Package API: the documented `tokensMeta` catalog and the `tokenDeprecations` list of the legacy
// surface still shipping beside it, plus their types. The deprecation marker and its wording come
// from `@porsche-design-system/shared/deprecation`, which importers of this entry point use
// directly.
//
// The deprecated surface is one shared `Deprecations` and nothing else — the same single export
// scss exposes — so an audit reads names and markers without knowing this package's layout.
export { tokenDeprecations, tokensMeta } from './lib/tokensMeta';
export type { TokenMeta, TokensMetaTree } from './types/token-meta';
