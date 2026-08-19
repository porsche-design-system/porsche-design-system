// Public JS API: the documented `vanillaExtractMeta` model, the `vanillaExtractDeprecations` list of the legacy
// surface still shipping beside it, their types, and the `kindOf` leaf discriminant.
//
// The domain-keyed `vanillaExtractDeprecationsMeta` stays internal: its grouping records which domains were
// checked, and nothing outside this package reads it.
export { vanillaExtractDeprecations } from './deprecationList';
export { kindOf, type VanillaExtractKind } from './kind';
export { vanillaExtractMeta } from './meta';
export type * from './types';
