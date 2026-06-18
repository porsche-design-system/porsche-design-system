// Public JS API: only the documented model (`scssMeta`) and its types are exposed — the single
// source of truth for the storefront docs and LLM context. Building blocks stay internal. SCSS-file
// generation (`scss/index.ts`) is imported directly by `scripts/build.ts` / `build-skill.ts`.
export { scssMeta } from './meta';
export type * from './types';
