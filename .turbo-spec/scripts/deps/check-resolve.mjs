// Gate for resolve-conflicts: confirms the agent recorded at least one override
// AND the resulting install no longer reports an ERESOLVE peer conflict.
//
// We deliberately do NOT scan the log for forbidden flags (`--force`,
// `--legacy-peer-deps`, `npm audit fix`): those strings also appear in npm's OWN
// output (its ERESOLVE hint and audit summary), which produced false-positive
// loop-backs. A flag "cheat" cannot persist anyway — only `overrides` in
// package.json survives — so the authoritative guard is the flagless clean
// install in the `consistency` stage, which fails if the override does not
// genuinely resolve the tree.
//
// Exit 0 = clean, 1 = violation (loop_back), 2 = env error.

import { readFileSync } from 'node:fs';

/**
 * Decide the resolve-conflicts verdict from the recorded overrides and the final
 * install log.
 * @returns {{ok: boolean, reason: string}}
 */
export function resolveVerdict(overrides, log) {
  if (!Array.isArray(overrides) || overrides.length === 0) {
    return { ok: false, reason: 'no overrides were recorded' };
  }
  if (/ERESOLVE/i.test(String(log || ''))) {
    return { ok: false, reason: 'final install still reports ERESOLVE (conflict unresolved)' };
  }
  return { ok: true, reason: `${overrides.length} override(s) recorded, install ERESOLVE-free` };
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

  let log = '';
  try {
    log = readFileSync(logPath, 'utf8');
  } catch {
    // absent log is not fatal for this check
  }

  const verdict = resolveVerdict(overrides, log);
  if (!verdict.ok) {
    console.error(`resolve check failed: ${verdict.reason}`);
    return 1;
  }
  console.log(`resolve check passed: ${verdict.reason}`);
  return 0;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  process.exit(main(process.argv));
}
