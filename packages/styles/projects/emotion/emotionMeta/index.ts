// Public JS API: the documented `emotionMeta` model, the generated `emotionDeprecationsMeta` catalog
// of the legacy surface still shipping beside it, their types, and the `kindOf` leaf discriminant.
export { emotionDeprecationsMeta } from './deprecations';
export { type EmotionKind, kindOf } from './kind';
export { emotionMeta } from './meta';
export type * from './types';
