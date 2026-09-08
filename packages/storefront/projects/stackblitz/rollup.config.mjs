// @ts-check
import { createAssetLibRollupConfig } from '../../../assets/projects/rollup.config.base.mjs';

export default createAssetLibRollupConfig({
  input: 'scripts/openInStackblitz.ts',
  outputName: 'openInStackblitz',
  // Keep the runtime dependency external (matches the previous tsup behavior); the
  // colocated `../generated/bundle` data module is inlined.
  external: ['@stackblitz/sdk'],
});

