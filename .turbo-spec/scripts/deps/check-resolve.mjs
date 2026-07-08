// Gate for resolve-conflicts: confirms the agent added at least one override and
// used no forbidden install flags. (Structural "root overrides only" is left to
// the equality/no-drift gate in consistency, which ignores the `overrides` key.)
//
// Exit 0 = clean, 1 = violation (loop_back), 2 = env error.

import { readFileSync } from 'node:fs';

const FORBIDDEN = [/--legacy-peer-deps/i, /--force\b/i, /audit\s+fix/i];

/** Return the forbidden flags/commands found in an install log. */
export function findForbiddenFlags(log) {
  const text = String(log || '');
  return FORBIDDEN.filter((re) => re.test(text)).map((re) => re.source);
}

function main(argv) {
  const overridesPath = argv[2] || '.turbo-spec/out/overrides-added.json';
  const logPath = argv[3] || '.turbo-spec/out/install.log';

  let overrides;
  try {
    overrides = JSON.parse(readFileSync(overridesPath, 'utf8'));
  } catch (err) {
    console.error(`cannot read overrides-added.json: ${err.message}`);
    return 1;
  }
  if (!Array.isArray(overrides) || overrides.length === 0) {
    console.error('resolve check failed: no overrides were recorded');
    return 1;
  }

  let log = '';
  try {
    log = readFileSync(logPath, 'utf8');
  } catch {
    // absent log is not fatal for this check
  }
  const forbidden = findForbiddenFlags(log);
  if (forbidden.length > 0) {
    console.error(`resolve check failed: forbidden flag(s) used: ${forbidden.join(', ')}`);
    return 1;
  }

  console.log(`resolve check passed: ${overrides.length} override(s), no forbidden flags`);
  return 0;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  process.exit(main(process.argv));
}
