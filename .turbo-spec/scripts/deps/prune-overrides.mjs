// Deterministic helpers for override pruning (runbook step 7). Pure functions +
// a batch-first probe strategy. The staleness verdict is ERESOLVE-free AND no
// npm-audit regression — an ERESOLVE-only probe is unsafe because security pins
// rarely ERESOLVE on removal.

/** Flatten overrides to keys: scalar `"braces"`, nested `"next > postcss"`. */
export function readOverrideKeys(pkg) {
  const o = pkg?.overrides;
  if (!o || typeof o !== 'object') return [];
  const keys = [];
  for (const [k, v] of Object.entries(o)) {
    if (v && typeof v === 'object') {
      for (const child of Object.keys(v)) keys.push(`${k} > ${child}`);
    } else {
      keys.push(k);
    }
  }
  return keys;
}

/** Deep-copy `pkg` minus `keys`; prune a nested parent left with no children. */
export function withoutOverrideKeys(pkg, keys) {
  const copy = JSON.parse(JSON.stringify(pkg ?? {}));
  const o = copy.overrides;
  if (!o) return copy;
  for (const key of keys) {
    if (key.includes(' > ')) {
      const [parent, child] = key.split(' > ');
      if (o[parent] && typeof o[parent] === 'object') {
        delete o[parent][child];
        if (Object.keys(o[parent]).length === 0) delete o[parent];
      }
    } else {
      delete o[key];
    }
  }
  return copy;
}

const sevKeys = ['info', 'low', 'moderate', 'high', 'critical', 'total'];

/** True if `after` introduces a new advisory id or raises any severity count. */
export function auditRegressed(baseline, after) {
  const baseIds = new Set(Object.keys(baseline?.advisories ?? {}));
  for (const id of Object.keys(after?.advisories ?? {})) {
    if (!baseIds.has(id)) return true;
  }
  const b = baseline?.vulnerabilities ?? {};
  const a = after?.vulnerabilities ?? {};
  for (const k of sevKeys) {
    if ((a[k] ?? 0) > (b[k] ?? 0)) return true;
  }
  return false;
}

/** Classify an install attempt. */
export function verdictFromInstall(status, log) {
  if (status === 0) return 'ok';
  if (/ERESOLVE/i.test(String(log || ''))) return 'eresolve';
  return 'other';
}

/**
 * Batch-first removal: probe all candidates at once; if clean, all are stale.
 * Otherwise bisect (bounded) to isolate load-bearing keys.
 * @param {string[]} candidates
 * @param {(keys: string[]) => {verdict: string, regressed: boolean}} probe
 */
export function collectRemovable(candidates, probe, budget = { installs: 0, max: 6 }) {
  if (candidates.length === 0) return { removed: [], kept: [], installs: budget.installs };
  if (budget.installs >= budget.max) {
    return { removed: [], kept: [...candidates], installs: budget.installs };
  }
  budget.installs += 1;
  const { verdict, regressed } = probe(candidates);
  if (verdict === 'ok' && !regressed) {
    return { removed: [...candidates], kept: [], installs: budget.installs };
  }
  if (candidates.length === 1 || budget.installs >= budget.max) {
    // Cannot split further (or out of budget): the failing set stays.
    return { removed: [], kept: [...candidates], installs: budget.installs };
  }
  const mid = Math.floor(candidates.length / 2);
  const left = collectRemovable(candidates.slice(0, mid), probe, budget);
  const right = collectRemovable(candidates.slice(mid), probe, budget);
  return {
    removed: [...left.removed, ...right.removed],
    kept: [...left.kept, ...right.kept],
    installs: budget.installs,
  };
}
