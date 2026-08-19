// Public JS API: the documented `tokensMeta` catalog and the `tokenDeprecations` list of the legacy
// surface still shipping beside it, plus their types. The deprecation marker, its wording and the
// message helpers come from `@porsche-design-system/shared/deprecation`, which consumers import
// directly.
//
// Internal on purpose: `tokenDeprecationsMeta`, whose grouping is generator bookkeeping, and
// `tokenIdentifier`, whose spelling is already applied to the published list.
export { tokenDeprecations } from './deprecationList';
export { tokensMeta } from './lib/tokensMeta';
export type { DeprecatedTokenMeta, TokenDeprecationsMeta, TokenMeta, TokensMetaTree } from './types/token-meta';
