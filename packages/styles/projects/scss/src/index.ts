// Public JS API: the documented `scssMeta` model, its types, the `kindOf` leaf discriminant, and the
// `flatten` tree walker (collapses a grouped branch — e.g. the nested `grid` domain — into an ordered
// leaf list). SCSS-file generation (`scss/index.ts`) is imported directly by the build scripts.
export { kindOf, type ScssKind } from './kind';
export { flatten } from './scss/render';
export { scssMeta } from './meta';
export type * from './types';
