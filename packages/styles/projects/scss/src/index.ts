// Public JS API: the documented `scssMeta` model, the `scssDeprecations` list of the legacy surface
// still shipping beside it, their types, the `kindOf` leaf discriminant and the `flatten` tree walker
// (collapses a grouped branch — e.g. the nested `grid` domain — into an ordered leaf list). The
// deprecation marker, its wording and the message helpers come from
// `@porsche-design-system/shared/deprecation`, which consumers import directly.
//
// Internal on purpose: `scssDeprecationsMeta`, whose grouping is routing information for the partial
// composition, and `scssIdentifier`, whose spelling is already applied to the published list.
// SCSS-file generation (`scss/index.ts`) is imported directly by the build scripts.
export { kindOf, type ScssKind } from './kind';
export { scssDeprecations, scssMeta } from './meta';
export { flatten } from './scss/render';
export type * from './types';
