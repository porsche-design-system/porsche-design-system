// Public API: only the documented model (`tailwindMeta`) and its types are exposed — the single
// source of truth for the storefront docs and LLM context. Building blocks stay internal. CSS-file
// generation (`css/index.ts`) is imported directly by `scripts/build.ts` / `build-skill.ts`.
export { tailwindMeta } from './meta';
export type * from './types';
