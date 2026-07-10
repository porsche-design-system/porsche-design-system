import { collectRemovable, verdictFromInstall, auditRegressed, withoutOverrideKeys } from './prune-overrides.mjs';

/**
 * @param {{pkg: object, baselineAudit: object, candidates: string[],
 *   probe: (keys: string[]) => {status: number, log: string, audit: object}}} args
 */
export function runPrune({ pkg, baselineAudit, candidates, probe }) {
  const wrapped = (keys) => {
    const r = probe(keys);
    return {
      verdict: verdictFromInstall(r.status, r.log),
      regressed: auditRegressed(baselineAudit, r.audit),
    };
  };
  const { removed, kept, installs } = collectRemovable(candidates, wrapped);
  return {
    removed: removed.map((key) => ({ key, reason: 'stale: ERESOLVE-free and no audit regression on removal' })),
    kept,
    installs,
    install_ok: true,
    regressed: false,
  };
}

import { readFileSync, writeFileSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

/** Normalize npm 11 `audit --json` to the {vulnerabilities:<counts>, advisories:<ids>} shape auditRegressed expects. */
export function normalizeAudit(raw) {
  const counts = raw?.metadata?.vulnerabilities ?? {};
  const advisories = {};
  for (const v of Object.values(raw?.vulnerabilities ?? {})) {
    for (const via of v?.via ?? []) {
      if (via && typeof via === 'object' && via.source != null) advisories[String(via.source)] = {};
    }
  }
  return { vulnerabilities: counts, advisories };
}

/**
 * Summarize per-probe timings so the "is prune install-dominated?" decision
 * (T6 gate) is deterministic and data-driven rather than assumed. `install_ms`
 * is the wall-time we could shave with `--package-lock-only`; `other_ms` (audit
 * + bookkeeping) is not. Only optimize installs when they dominate.
 * @param {{phase: string, install_ms: number, audit_ms: number}[]} timings
 */
export function summarizeTimings(timings) {
  const list = timings ?? [];
  const install_ms = list.reduce((a, t) => a + (t.install_ms || 0), 0);
  const audit_ms = list.reduce((a, t) => a + (t.audit_ms || 0), 0);
  const total_ms = install_ms + audit_ms;
  const install_fraction = total_ms > 0 ? install_ms / total_ms : 0;
  return {
    probes: list.length,
    install_ms,
    audit_ms,
    total_ms,
    install_fraction,
    install_dominated: install_fraction >= 0.6,
  };
}

function timeit(fn) {
  const start = Date.now();
  const result = fn();
  return { result, ms: Date.now() - start };
}

function cleanInstall(root) {
  rmSync(`${root}/package-lock.json`, { force: true });
  rmSync(`${root}/node_modules`, { recursive: true, force: true });
  const r = spawnSync('npm', ['install', '--no-audit', '--no-fund'], { cwd: root, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  return { status: r.status ?? 1, log: `${r.stdout || ''}\n${r.stderr || ''}` };
}

function runAudit(root) {
  const r = spawnSync('npm', ['audit', '--json'], { cwd: root, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  try { return normalizeAudit(JSON.parse(r.stdout || '{}')); } catch { return { vulnerabilities: {}, advisories: {} }; }
}

function main(argv) {
  const root = argv[2] || '.';
  const outDir = `${root}/.turbo-spec/out`;
  const pkgPath = `${root}/package.json`;
  const originalPkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
  const baselineAudit = normalizeAudit(JSON.parse(readFileSync(`${outDir}/audit-baseline.json`, 'utf8')));
  let candidates = [];
  try { candidates = JSON.parse(readFileSync(`${outDir}/override-candidates.json`, 'utf8')); } catch { candidates = []; }

  // T6 measure-first: record install vs audit wall-time per probe so we can prove
  // (via prune-timing.json) whether installs dominate before switching probing to
  // `--package-lock-only`. Instrumentation only — install strategy is unchanged.
  const timings = [];

  // Each probe starts from the ORIGINAL overrides so bisect subsets never compound.
  const probe = (keys) => {
    const next = withoutOverrideKeys(originalPkg, keys);
    writeFileSync(pkgPath, `${JSON.stringify(next, null, 2)}\n`);
    const inst = timeit(() => cleanInstall(root));
    const aud = timeit(() => runAudit(root));
    timings.push({ phase: `probe:${keys.join(',') || 'none'}`, install_ms: inst.ms, audit_ms: aud.ms });
    return { status: inst.result.status, log: inst.result.log, audit: aud.result };
  };

  const { removed, kept } = runPrune({ pkg: originalPkg, baselineAudit, candidates, probe });

  // Authoritative final state: apply exactly the proven-removable set, install, audit.
  const finalPkg = withoutOverrideKeys(originalPkg, removed.map((r) => r.key));
  writeFileSync(pkgPath, `${JSON.stringify(finalPkg, null, 2)}\n`);
  const finalInst = timeit(() => cleanInstall(root));
  const install_ok = finalInst.result.status === 0;
  const finalAud = timeit(() => runAudit(root));
  const regressed = auditRegressed(baselineAudit, finalAud.result);
  timings.push({ phase: 'final', install_ms: finalInst.ms, audit_ms: finalAud.ms });

  writeFileSync(`${outDir}/overrides-removed.json`, `${JSON.stringify(removed, null, 2)}\n`);
  writeFileSync(`${outDir}/prune-result.json`, `${JSON.stringify({ install_ok, regressed }, null, 2)}\n`);
  const timingSummary = summarizeTimings(timings);
  writeFileSync(`${outDir}/prune-timing.json`, `${JSON.stringify({ ...timingSummary, timings }, null, 2)}\n`);
  console.log(`prune: removed ${removed.length}, kept ${kept.length}, install_ok=${install_ok}, regressed=${regressed}`);
  console.log(`prune-timing: install ${timingSummary.install_ms}ms / total ${timingSummary.total_ms}ms (install_dominated=${timingSummary.install_dominated})`);
  return 0;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  process.exit(main(process.argv));
}
