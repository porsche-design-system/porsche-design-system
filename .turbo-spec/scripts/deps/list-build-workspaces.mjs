// Lists the built "dist" workspace directories declared in the root package.json
// `workspaces` array. These are gitignored BUILD OUTPUTS that npm nonetheless
// resolves as workspaces; a stale one left over from a prior run (with bumped
// peer ranges) breaks `npm install` in the assess stage. Preflight removes them
// so every run starts from the fresh-checkout baseline (no dist present).
//
// Prints one directory per line (e.g. `packages/components-angular/dist`).

import { readFileSync } from 'node:fs';

const DIST_SEGMENT = /\/dist(\/|$)/;

/** Distinct `.../dist` dirs implied by the workspace globs. */
export function buildWorkspaceDirs(workspaces) {
  const dirs = new Set();
  for (const w of Array.isArray(workspaces) ? workspaces : []) {
    if (DIST_SEGMENT.test(w)) {
      dirs.add(w.replace(/(\/dist)(\/.*)?$/, '$1'));
    }
  }
  return [...dirs];
}

function main(argv) {
  const root = argv[2] || '.';
  let pkg;
  try {
    pkg = JSON.parse(readFileSync(`${root}/package.json`, 'utf8'));
  } catch (err) {
    console.error(`cannot read package.json: ${err.message}`);
    return 2;
  }
  for (const d of buildWorkspaceDirs(pkg.workspaces)) {
    console.log(d);
  }
  return 0;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  process.exit(main(process.argv));
}
