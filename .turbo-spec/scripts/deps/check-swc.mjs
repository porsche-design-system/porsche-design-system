// Gate: the regenerated package-lock.json must record all 8 platform-specific
// @next/swc-* optional dependencies (a truncated set breaks CI on other OSes).
// Exit 0 = all present, 1 = missing (loop_back), 2 = env error.

import { readFileSync } from 'node:fs';

export const REQUIRED_SWC = [
  '@next/swc-darwin-arm64',
  '@next/swc-darwin-x64',
  '@next/swc-linux-arm64-gnu',
  '@next/swc-linux-arm64-musl',
  '@next/swc-linux-x64-gnu',
  '@next/swc-linux-x64-musl',
  '@next/swc-win32-arm64-msvc',
  '@next/swc-win32-x64-msvc',
];

/** Return the required swc packages NOT present in the lockfile text. */
export function findMissingSwc(lockText, required = REQUIRED_SWC) {
  return required.filter((pkg) => !lockText.includes(`node_modules/${pkg}`));
}

function main(argv) {
  const lockPath = argv[2] || 'package-lock.json';
  let lockText;
  try {
    lockText = readFileSync(lockPath, 'utf8');
  } catch (err) {
    console.error(`cannot read lockfile: ${err.message}`);
    return 2;
  }
  const missing = findMissingSwc(lockText);
  if (missing.length > 0) {
    console.error(`package-lock.json missing @next/swc packages: ${missing.join(', ')}`);
    return 1;
  }
  console.log(`swc check passed: all ${REQUIRED_SWC.length} @next/swc-* packages present`);
  return 0;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  process.exit(main(process.argv));
}
