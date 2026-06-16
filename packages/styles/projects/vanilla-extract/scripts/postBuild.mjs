import { existsSync, readdirSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const rename = (from, to) => {
  if (existsSync(from)) {
    renameSync(from, to);
  }
};

rename('dist/esm/styles/index.styles.d.ts', 'dist/esm/styles/index.d.ts');
rename('dist/esm/meta/index.meta.d.ts', 'dist/esm/meta/index.d.ts');

writeFileSync('dist/esm/index.d.ts', "export * from './styles/index';\nexport * from './meta/index';\n");

const metaDir = 'dist/esm/meta';
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
