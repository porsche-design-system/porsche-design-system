// Public JS API: the documented `tokensMeta` catalog and the `tokenDeprecations` list of the legacy
// surface still shipping beside it, plus their types. The deprecation marker and its wording come
// from `@porsche-design-system/shared/deprecation`, which consumers import directly.
//
// The deprecated surface is one shared `Deprecations` and nothing else — the same single export
// scss publishes — so an audit reads names and markers without knowing this package's layout.
export { tokenDeprecations, tokensMeta } from './lib/tokensMeta';
export type { TokenMeta, TokensMetaTree } from './types/token-meta';
