// Public JS API: the documented `emotionMeta` model, the `emotionDeprecations` list of the legacy
// surface still shipping beside it, their types, and the `kindOf` leaf discriminant.
//
// The domain-keyed `emotionDeprecationsMeta` stays internal: its grouping records which domains were
// checked, and nothing outside this package reads it.
export { emotionDeprecations } from './deprecationList';
export { type EmotionKind, kindOf } from './kind';
export { emotionMeta } from './meta';
export type * from './types';
