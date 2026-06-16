// Public API. Only the meta object as a whole (`tailwindMeta`) and the types are
// exposed — the single source of truth driving the storefront docs, the LLM context
// and the generated CSS. The individual building blocks (`color`, `typography`,
// `blur`, the `*Utilities`, the infrastructure pieces, …) are intentionally kept
// internal; consumers read everything from `tailwindMeta`. `tailwindCssMeta` /
// `getTailwindcssTheme` drive the CSS file generation (consumed by `scripts/build.ts`).
export { getTailwindcssTheme, tailwindCssMeta, tailwindMeta } from './meta';
export type * from './types';
