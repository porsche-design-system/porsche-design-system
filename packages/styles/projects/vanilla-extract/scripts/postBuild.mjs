import { existsSync, readdirSync, renameSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const rename = (from, to) => {
  if (existsSync(from)) {
    renameSync(from, to);
  }
};

// dist: rename styles barrel declaration
rename('dist/esm/index.styles.d.ts', 'dist/esm/index.d.ts');

// meta: rename meta barrel declaration
rename('meta/esm/index.meta.d.ts', 'meta/esm/index.d.ts');

const metaDir = 'meta/esm';
const isMetaDeclaration = (path) =>
  path === join(metaDir, 'index.d.ts') || path === join(metaDir, 'meta.types.d.ts') || path.endsWith('.meta.d.ts');

const pruneLeakedStyleDeclarations = (dir) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      pruneLeakedStyleDeclarations(path);
      if (readdirSync(path).length === 0) {
        rmSync(path, { recursive: true });
      }
    } else if (path.endsWith('.d.ts') && !isMetaDeclaration(path)) {
      rmSync(path);
    }
  }
};

if (existsSync(metaDir)) {
  pruneLeakedStyleDeclarations(metaDir);
}
