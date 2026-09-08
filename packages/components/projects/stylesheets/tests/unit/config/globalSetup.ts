import { buildCssVariableConstants } from '../../../scripts/buildCssVariableConstants';

// The per-variable name consts under `src/generated/` are a gitignored build artifact.
// Generate them before the unit tests run so specs importing them (and the package barrel)
// resolve on a fresh checkout without requiring a prior `npm run build`.
export default function setup(): void {
  buildCssVariableConstants();
}

