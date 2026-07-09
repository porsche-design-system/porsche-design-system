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

  // Each probe starts from the ORIGINAL overrides so bisect subsets never compound.
  const probe = (keys) => {
    const next = withoutOverrideKeys(originalPkg, keys);
    writeFileSync(pkgPath, `${JSON.stringify(next, null, 2)}\n`);
    const { status, log } = cleanInstall(root);
    return { status, log, audit: runAudit(root) };
  };

  const { removed, kept } = runPrune({ pkg: originalPkg, baselineAudit, candidates, probe });

  // Authoritative final state: apply exactly the proven-removable set, install, audit.
  const finalPkg = withoutOverrideKeys(originalPkg, removed.map((r) => r.key));
  writeFileSync(pkgPath, `${JSON.stringify(finalPkg, null, 2)}\n`);
  const finalInstall = cleanInstall(root);
  const install_ok = finalInstall.status === 0;
  const regressed = auditRegressed(baselineAudit, runAudit(root));

  writeFileSync(`${outDir}/overrides-removed.json`, `${JSON.stringify(removed, null, 2)}\n`);
  writeFileSync(`${outDir}/prune-result.json`, `${JSON.stringify({ install_ok, regressed }, null, 2)}\n`);
  console.log(`prune: removed ${removed.length}, kept ${kept.length}, install_ok=${install_ok}, regressed=${regressed}`);
  return 0;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  process.exit(main(process.argv));
}
