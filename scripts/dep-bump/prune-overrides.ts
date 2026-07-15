export interface Overrides {
  [key: string]: string | Overrides;
}

// Override keys may pin a single major via a trailing `@<major>` (e.g.
// "minimatch@9"). Scoped names start with "@", so only strip an "@<digits>"
// suffix, never the leading scope "@".
export function overrideBaseName(key: string): string {
  const at = key.lastIndexOf('@');
  if (at > 0 && /^\d+$/.test(key.slice(at + 1))) return key.slice(0, at);
  return key;
}

function childBaseNames(value: string | Overrides): string[] {
  if (typeof value === 'string') return [];
  return Object.keys(value).map(overrideBaseName);
}

// Targeted scope: only re-validate overrides related to THIS run's bumps, so the
// (expensive) relax→reinstall loop stays bounded. An override is a candidate when
// its own base name is in changedNames, or any object-form child is.
export function selectPruneCandidates(overrides: Overrides, changedNames: string[]): string[] {
  const changed = new Set(changedNames);
  const candidates = new Set<string>();
  for (const [key, value] of Object.entries(overrides)) {
    if (changed.has(overrideBaseName(key)) || childBaseNames(value).some((n) => changed.has(n))) {
      candidates.add(key);
    }
  }
  return [...candidates].sort();
}

export function shouldRemoveOverride(installClean: boolean, auditRegressed: boolean): boolean {
  return installClean && !auditRegressed;
}

import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { type AuditReport, compareAudits } from './audit-compare.ts';
import type { BumpChange } from './classify-bump.ts';
import { OUT_DIR, writeVerdict } from './lib/verdict.ts';

export interface PruneResult {
  schemaVersion: 1;
  removed: { name: string }[];
  kept: { name: string; reason: string }[];
}

export function planPrune(overrides: Overrides, changedNames: string[]): string[] {
  return selectPruneCandidates(overrides, changedNames);
}

function readJson<T>(path: string, fallback: T): T {
  try {
    return JSON.parse(readFileSync(path, 'utf8')) as T;
  } catch {
    return fallback;
  }
}

function readRootOverrides(): Overrides {
  return readJson<{ overrides?: Overrides }>(resolve(process.cwd(), 'package.json'), {}).overrides ?? {};
}

function writeRootOverrides(overrides: Overrides): void {
  const path = resolve(process.cwd(), 'package.json');
  const pkg = JSON.parse(readFileSync(path, 'utf8'));
  if (Object.keys(overrides).length === 0) delete pkg.overrides;
  else pkg.overrides = overrides;
  writeFileSync(path, `${JSON.stringify(pkg, null, 2)}\n`, 'utf8');
}

function reinstallClean(): boolean {
  try {
    execFileSync('npm', ['run', 'npm:reinstall'], { stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
}

function auditRegressed(baseline: AuditReport): boolean {
  let current: AuditReport = {};
  try {
    current = JSON.parse(execFileSync('npm', ['audit', '--json'], { encoding: 'utf8' }));
  } catch (err) {
    // `npm audit` exits non-zero when advisories exist; still parse stdout.
    const stdout = (err as { stdout?: string }).stdout;
    if (stdout) current = JSON.parse(stdout);
  }
  return compareAudits(baseline, current).introduced.length > 0;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  void OUT_DIR;
  const overrides = readRootOverrides();
  const changed = readJson<{ changes?: BumpChange[] }>(resolve(OUT_DIR, 'bump.json'), {}).changes ?? [];
  const candidates = planPrune(overrides, changed.map((c) => c.name));
  const baseline = readJson<AuditReport>(resolve(OUT_DIR, 'audit-baseline.json'), {});

  const result: PruneResult = { schemaVersion: 1, removed: [], kept: [] };
  for (const name of candidates) {
    const trial: Overrides = { ...overrides };
    delete trial[name];
    writeRootOverrides(trial);
    const clean = reinstallClean();
    const regressed = clean ? auditRegressed(baseline) : false;
    if (shouldRemoveOverride(clean, regressed)) {
      delete overrides[name];
      result.removed.push({ name });
    } else {
      writeRootOverrides(overrides); // restore
      reinstallClean(); // reconcile tree to the restored manifest
      result.kept.push({ name, reason: !clean ? 'reintroduces-eresolve' : 'audit-regression' });
    }
  }
  writeVerdict('pruned.json', result);
  process.stdout.write(`[prune] removed ${result.removed.length}, kept ${result.kept.length}\n`);
}
