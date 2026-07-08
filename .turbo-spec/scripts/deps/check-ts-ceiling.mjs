// Gate: the installed TypeScript version must not exceed Angular's supported
// ceiling (MAX_TS_VERSION), which is only knowable after the new Angular installs.
// Exit 0 = within ceiling, 1 = exceeds (loop_back), 2 = env error (escalate).

import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const COMPILER_CLI_PATHS = [
  'packages/components-angular/node_modules/@angular/compiler-cli/src/typescript_support.js',
  'node_modules/@angular/compiler-cli/src/typescript_support.js',
];
const TS_PKG_REL = 'node_modules/typescript/package.json';

/** Compare dotted numeric versions. Returns -1, 0 or 1. */
export function compareSemver(a, b) {
  const pa = String(a).split('.').map((n) => Number.parseInt(n, 10) || 0);
  const pb = String(b).split('.').map((n) => Number.parseInt(n, 10) || 0);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const d = (pa[i] || 0) - (pb[i] || 0);
    if (d !== 0) return d > 0 ? 1 : -1;
  }
  return 0;
}

/** True when installed <= ceiling (ceiling treated as inclusive max). */
export function withinCeiling(installed, ceiling) {
  return compareSemver(installed, ceiling) <= 0;
}

/** Extract MAX_TS_VERSION from the Angular compiler-cli support module. */
export function parseMaxTsVersion(source) {
  const m = source.match(/MAX_TS_VERSION\s*=\s*['"]([\d.]+)['"]/);
  return m ? m[1] : null;
}

function readFirst(root, relPaths) {
  for (const rel of relPaths) {
    try {
      return readFileSync(join(root, rel), 'utf8');
    } catch {
      // try next
    }
  }
  return null;
}

function main(argv) {
  const root = argv[2] || '.';
  // Angular not installed → no ceiling to violate → not applicable (pass).
  const cliSrc = readFirst(root, COMPILER_CLI_PATHS);
  if (cliSrc === null) {
    console.log('ts-ceiling check: Angular compiler-cli not installed — not applicable');
    return 0;
  }
  const ceiling = parseMaxTsVersion(cliSrc);
  if (!ceiling) {
    console.error('could not parse MAX_TS_VERSION from compiler-cli');
    return 2;
  }
  let installed;
  try {
    installed = JSON.parse(readFileSync(join(root, TS_PKG_REL), 'utf8')).version;
  } catch {
    console.log('ts-ceiling check: typescript not installed — not applicable');
    return 0;
  }
  if (!withinCeiling(installed, ceiling)) {
    console.error(`typescript ${installed} exceeds Angular MAX_TS_VERSION ${ceiling}`);
    return 1;
  }
  console.log(`ts-ceiling check passed: typescript ${installed} <= MAX_TS_VERSION ${ceiling}`);
  return 0;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  process.exit(main(process.argv));
}
