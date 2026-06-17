// Public API. Only the documented model as a whole (`tailwindMeta`) and the types are exposed —
// the single source of truth driving the storefront docs and the LLM context. The individual
// building blocks (`color`, `typography`, `blur`, the `*Utilities`, the infrastructure pieces, …)
// are intentionally kept internal; consumers read everything from `tailwindMeta`. The CSS-file
// generation (`css.ts`: `tailwindCssMeta` / `getTailwindcssTheme`) never leaves the package — it
// is imported directly by `scripts/build.ts` and `scripts/build-skill.ts`.
export { tailwindMeta } from './meta';
export type * from './types';
