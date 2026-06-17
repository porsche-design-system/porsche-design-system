import { existsSync, readdirSync, renameSync, rmSync } from 'node:fs';
import { join } from 'node:path';

// rootDir '.' causes TypeScript to emit meta declarations into meta/esm/vanillaExtractMeta/.
// Move them up one level to meta/esm/ so meta/package.json exports resolve correctly.
const metaEsmDir = 'meta/esm';
const metaSrcSubdir = join(metaEsmDir, 'vanillaExtractMeta');
if (existsSync(metaSrcSubdir)) {
  for (const entry of readdirSync(metaSrcSubdir, { withFileTypes: true })) {
    if (entry.name.endsWith('.d.ts')) {
      renameSync(join(metaSrcSubdir, entry.name), join(metaEsmDir, entry.name));
    }
  }
  rmSync(metaSrcSubdir, { recursive: true });
}

// Remove src/ declarations leaked by TypeScript compiling transitive imports from src/.
const leakedSrcDir = join(metaEsmDir, 'src');
if (existsSync(leakedSrcDir)) {
  rmSync(leakedSrcDir, { recursive: true });
}
