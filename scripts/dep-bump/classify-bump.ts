import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { coerce, diff as semverDiff, valid as semverValid } from 'semver';
import { collectDepsFromFiles } from './collect-deps.ts';
import { OUT_DIR, writeVerdict } from './lib/verdict.ts';

export type DepMap = Record<string, string>;
export interface BumpChange {
  name: string;
  from: string;
  to: string;
  major: boolean;
}
export interface BumpClassification {
  outcome: 'NO_CHANGES' | 'CHANGED';
  changes: BumpChange[];
  heldViolations: string[];
}

const MAJOR_LEVELS = new Set(['major', 'premajor']);

export function isHeld(name: string, patterns: string[]): boolean {
  return patterns.some((pattern) => {
    if (pattern.endsWith('/**')) {
      const scope = pattern.slice(0, -3);
      return name === scope || name.startsWith(`${scope}/`);
    }
    return name === pattern;
  });
}

export function classifyBump(before: DepMap, after: DepMap, heldBack: string[]): BumpClassification {
  const changes: BumpChange[] = [];
  const heldViolations: string[] = [];
  for (const name of Object.keys(after)) {
    const from = before[name];
    const to = after[name];
    if (from === undefined || from === to) continue;
    const fromVersion = coerce(from)?.version ?? from;
    const toVersion = coerce(to)?.version ?? to;
    let major = false;
    if (semverValid(fromVersion) && semverValid(toVersion)) {
      const level = semverDiff(fromVersion, toVersion);
      major = level !== null && MAJOR_LEVELS.has(level);
    }
    changes.push({ name, from, to, major });
    if (isHeld(name, heldBack)) heldViolations.push(name);
  }
  changes.sort((a, b) => a.name.localeCompare(b.name));
  return { outcome: changes.length === 0 ? 'NO_CHANGES' : 'CHANGED', changes, heldViolations };
}

const HELD_BACK = ['@porsche-design-system/**', '@angular/**', 'ng-packagr', 'zone.js'];

if (import.meta.url === `file://${process.argv[1]}`) {
  // Read the host-snapshotted baseline (preflight) and the current tree from
  // disk — no git, so classification works in-sandbox regardless of the .git
  // mount (F6). Fail loudly if preflight did not run.
  const readOut = (file: string): unknown => JSON.parse(readFileSync(resolve(OUT_DIR, file), 'utf8'));
  const files = (readOut('package-json-files.json') as { files: string[] }).files;
  const before = (readOut('deps-baseline.json') as { deps: DepMap }).deps;
  const after = collectDepsFromFiles(files, (file) => readFileSync(file, 'utf8'));
  const result = classifyBump(before, after, HELD_BACK);
  writeVerdict('bump.json', { schemaVersion: 1, ...result });
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
}
