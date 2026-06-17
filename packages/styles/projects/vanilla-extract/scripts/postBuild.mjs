import { existsSync, renameSync } from 'node:fs';

// TypeScript emits the barrel as index.styles.d.ts (matching the input filename).
// Rename it to index.d.ts to match the types path in dist/package.json.
if (existsSync('dist/esm/index.styles.d.ts')) {
  renameSync('dist/esm/index.styles.d.ts', 'dist/esm/index.d.ts');
}
