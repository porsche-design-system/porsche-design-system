// Public API: the documented `tailwindMeta` model, the `tailwindDeprecations` list of the legacy
// surface still shipping beside it, their types and the `kindOf` declaration discriminant. The
// deprecation marker, its wording and the message helpers come from
// `@porsche-design-system/shared/deprecation`, which consumers import directly.
//
// Internal on purpose: the catalog both exports are projections of, `stripDeprecated` which is only
// meaningful with it, and `tailwindIdentifier`, whose spelling is already applied to the published
// list. CSS-file generation (`css/index.ts`) is imported directly by `scripts/build.ts`.
export { kindOf } from './kind';
export { tailwindDeprecations, tailwindMeta } from './meta';
export type * from './types';
