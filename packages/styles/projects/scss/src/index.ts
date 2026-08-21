// Public JS API: the documented `scssMeta` model, the `scssDeprecations` list of the legacy surface
// still shipping beside it, their types, the `kindOf` declaration discriminant and the `flatten`
// catalog walker. The deprecation marker, its wording and the message helpers come from
// `@porsche-design-system/shared/deprecation`, which consumers import directly.
//
// Internal on purpose: the catalog both exports are projections of, `stripDeprecated` which is only
// meaningful with it, and `scssIdentifier`, whose spelling is already applied to the published list.
// SCSS-file generation (`scss/index.ts`) is imported directly by the build scripts.
export { kindOf } from './kind';
export { scssDeprecations, scssMeta } from './meta';
export { flatten } from './scss/render';
export type * from './types';
