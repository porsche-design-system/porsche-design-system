// Public JS API: the documented `emotionMeta` model, the `emotionDeprecations` list of the legacy
// surface still shipping beside it, their types, and the `kindOf` leaf discriminant.
//
// The deprecated surface is one shared `Deprecations` and nothing else — the same single export
// scss publishes — so an audit reads names and markers without knowing this package's layout.
export { emotionDeprecations } from './deprecations';
export { kindOf } from './kind';
export { emotionMeta } from './meta';
export type * from './types';
