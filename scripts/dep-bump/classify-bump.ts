import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { collectDepsFromFiles } from './collect-deps.ts';
import { OUT_DIR, writeVerdict } from './lib/verdict.ts';
import { type DependencyPolicy, matchesAny, readDependencyPolicy } from './policy.ts';
import { classifyLevel, type SemverLevel } from './semver-level.ts';

export type DepMap = Record<string, string>;
export interface BumpChange {
  name: string;
  from: string;
  to: string;
  major: boolean;
  level: SemverLevel;
}
export interface BumpClassification {
  outcome: 'NO_CHANGES' | 'CHANGED';
  changes: BumpChange[];
  heldViolations: string[];
}

export function classifyBump(before: DepMap, after: DepMap, policy: DependencyPolicy): BumpClassification {
  const changes: BumpChange[] = [];
  const heldViolations: string[] = [];
  for (const name of Object.keys(after)) {
    const from = before[name];
    const to = after[name];
    if (from === undefined || from === to) continue;
    const level = classifyLevel(from, to);
    const major = level === 'major';
    changes.push({ name, from, to, major, level });
    // Permanent holds must never change; minor/patch families must never take a major.
    if (matchesAny(name, policy.ignored) || (major && matchesAny(name, policy.minorOnly))) {
      heldViolations.push(name);
    }
  }
  changes.sort((a, b) => a.name.localeCompare(b.name));
  return { outcome: changes.length === 0 ? 'NO_CHANGES' : 'CHANGED', changes, heldViolations };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  // Read the host-snapshotted baseline (preflight) and the current tree from
  // disk — no git, so classification works in-sandbox regardless of the .git
  // mount (F6). Fail loudly if preflight did not run.
  const readOut = (file: string): unknown => JSON.parse(readFileSync(resolve(OUT_DIR, file), 'utf8'));
  const files = (readOut('package-json-files.json') as { files: string[] }).files;
  const before = (readOut('deps-baseline.json') as { deps: DepMap }).deps;
  const after = collectDepsFromFiles(files, (file) => readFileSync(file, 'utf8'));
  const result = classifyBump(before, after, readDependencyPolicy());
  writeVerdict('bump.json', { schemaVersion: 1, ...result });
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
}
