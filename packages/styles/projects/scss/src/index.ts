// Public JS API: the documented `scssMeta` model, the `scssDeprecationsMeta` catalog of the legacy
// surface still shipping beside it, their types, the `kindOf` leaf discriminant, the deprecation
// identity/wording helpers, and the `flatten` tree walker (collapses a grouped branch — e.g. the
// nested `grid` domain — into an ordered leaf list). SCSS-file generation (`scss/index.ts`) is
// imported directly by the build scripts.
export { isDeprecated, scssDeprecationMessage, scssDeprecationText, scssIdentifier } from './deprecation';
export { kindOf, type ScssKind } from './kind';
export { scssDeprecationsMeta, scssMeta } from './meta';
export { flatten } from './scss/render';
export type * from './types';
