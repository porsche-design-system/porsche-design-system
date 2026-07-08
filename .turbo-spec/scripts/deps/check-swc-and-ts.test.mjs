import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { REQUIRED_SWC, findMissingSwc } from './check-swc.mjs';
import { compareSemver, parseMaxTsVersion, withinCeiling } from './check-ts-ceiling.mjs';

const here = dirname(fileURLToPath(import.meta.url));

test('findMissingSwc returns empty when all 8 present', () => {
  const lock = REQUIRED_SWC.map((p) => `"node_modules/${p}": {}`).join('\n');
  assert.deepEqual(findMissingSwc(lock), []);
});

test('findMissingSwc reports the missing platform packages', () => {
  const lock = REQUIRED_SWC.slice(0, 6)
    .map((p) => `"node_modules/${p}": {}`)
    .join('\n');
  assert.deepEqual(findMissingSwc(lock), [
    '@next/swc-win32-arm64-msvc',
    '@next/swc-win32-x64-msvc',
  ]);
});

test('real package-lock.json contains all 8 swc packages', () => {
  const lock = readFileSync(join(here, '..', '..', '..', 'package-lock.json'), 'utf8');
  assert.deepEqual(findMissingSwc(lock), []);
});

test('compareSemver orders versions', () => {
  assert.equal(compareSemver('6.0.3', '6.1.0'), -1);
  assert.equal(compareSemver('6.1.0', '6.0.3'), 1);
  assert.equal(compareSemver('6.0.0', '6.0.0'), 0);
  assert.equal(compareSemver('5.9', '5.9.0'), 0);
});

test('withinCeiling is inclusive of the ceiling', () => {
  assert.equal(withinCeiling('6.0.3', '6.1.0'), true);
  assert.equal(withinCeiling('6.1.0', '6.1.0'), true);
  assert.equal(withinCeiling('6.2.0', '6.1.0'), false);
});

test('parseMaxTsVersion extracts the ceiling from compiler-cli source', () => {
  const src = "const MIN_TS_VERSION = '5.8.0';\nconst MAX_TS_VERSION = '6.1.0';\n";
  assert.equal(parseMaxTsVersion(src), '6.1.0');
  assert.equal(parseMaxTsVersion('no version here'), null);
});
