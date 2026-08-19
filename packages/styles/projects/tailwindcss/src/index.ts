// Public API: the documented `tailwindMeta` model, the `tailwindDeprecations` list of the legacy
// surface still shipping beside it, their types and the `kindOf` leaf discriminant. The deprecation
// marker, its wording and the message helpers come from `@porsche-design-system/shared/deprecation`,
// which consumers import directly.
//
// Internal on purpose: `tailwindDeprecationsMeta`, whose grouping is routing information for the
// `@theme` composition, and `tailwindIdentifier`, whose spelling is already applied to the published
// list. CSS-file generation (`css/index.ts`) is imported directly by `scripts/build.ts`.
export { kindOf, type TailwindKind } from './kind';
export { tailwindDeprecations, tailwindMeta } from './meta';
export type * from './types';
