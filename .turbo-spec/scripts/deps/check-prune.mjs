import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

/** @returns {{ok: boolean, reason: string}} */
export function pruneVerdict({ installOk, regressed, removed, docsTouched }) {
  if (!installOk) return { ok: false, reason: 'post-prune install is not clean' };
  if (regressed) return { ok: false, reason: 'npm audit regressed after pruning' };
  if (!Array.isArray(removed)) return { ok: false, reason: 'overrides-removed.json is not an array' };
  for (const r of removed) {
    if (!r || typeof r.key !== 'string' || typeof r.reason !== 'string') {
      return { ok: false, reason: 'malformed removed entry (need {key, reason})' };
    }
  }
  if (removed.length > 0 && !docsTouched) {
    return { ok: false, reason: 'removed overrides but docs/dependencies.md not updated' };
  }
  return { ok: true, reason: `${removed.length} override(s) pruned, install clean, audit stable` };
}

function docsTouched() {
  const r = spawnSync('git', ['status', '--porcelain', '--', 'docs/dependencies.md'], { encoding: 'utf8' });
  return (r.stdout || '').trim().length > 0;
}

function main(argv) {
  const removedPath = argv[2] || '.turbo-spec/out/overrides-removed.json';
  const resultPath = argv[3] || '.turbo-spec/out/prune-result.json';
  let removed;
  let result;
  try {
    removed = JSON.parse(readFileSync(removedPath, 'utf8'));
    result = JSON.parse(readFileSync(resultPath, 'utf8'));
  } catch (err) {
    console.error(`cannot read prune artifacts: ${err.message}`);
    return 1;
  }
  const v = pruneVerdict({
    installOk: result.install_ok,
    regressed: result.regressed,
    removed,
    docsTouched: docsTouched(),
  });
  if (!v.ok) {
    console.error(`prune check failed: ${v.reason}`);
    return 1;
  }
  console.log(`prune check passed: ${v.reason}`);
  return 0;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  process.exit(main(process.argv));
}
