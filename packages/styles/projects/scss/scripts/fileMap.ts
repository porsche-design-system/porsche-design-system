// Legacy per-domain generators awaiting migration onto the meta-driven composition layer
// (`src/scss`). Every domain has now moved there; the remaining dead `get*Scss()` builders (e.g.
// `getGradientScss`) are removed in the cleanup slice. This registry stays as an (empty) seam so the
// build script and output-parity spec keep their shape until that slice lands.
export const fileMap: Record<string, () => string> = {};
