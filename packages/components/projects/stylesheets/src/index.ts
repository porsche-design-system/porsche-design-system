// The package's main (`.`) entry. It exposes only what runtime consumers (the components package)
// need: the individual, tree-shakeable CSS custom property *name* consts (e.g. `colorCanvas =
// '--p-color-canvas'`) plus the `ref()` helper that wraps a name into `var(...)`. The consts are a
// DERIVED build artifact generated from the documented meta (`stylesheetsMeta`, the single source
// of truth) into the gitignored `src/generated/` folder by `scripts/buildCssVariableConstants.ts`;
// `ref` is hand-written. Components consume these directly in their JSS styles.
//
// The documented meta model (the `stylesheetsMeta` catalog, the leaf/`CssNode` types and `kindOf`)
// is intentionally NOT exposed here — it lives behind the dedicated `./meta` subpath
// (`src/meta.ts`), mirroring the `@porsche-design-system/scss` / `tailwindcss` packages.
export * from './generated/cssVariables';
export { ref } from './ref';
