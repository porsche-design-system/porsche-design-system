import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { collectDepsFromFiles, trackedPackageJsonFiles } from './collect-deps.ts';
import { OUT_DIR, writeVerdict } from './lib/verdict.ts';
import { type DependencyPolicy, matchesAny, readDependencyPolicy } from './policy.ts';
import { classifyLevel, isNewer, type SemverLevel } from './semver-level.ts';

// Surfaces updates the automated flow did NOT apply, so a human sees exactly
// what was held. Runs `npm outdated` against the POST-BUMP tree: after syncpack
// applied the capped bump and `npm install` ran, `current` already encodes every
// policy decision, so any DECLARED dependency where `latest > current` is
// held back — a family major left under the minor cap, a permanently held patch,
// or an "other" major the flow chose not to take. Detection is version-driven;
// policy is read ONLY to label WHY, never to decide inclusion. This avoids
// re-implementing syncpack's group matching for the decision itself.
//
// It is TRI-STATE and never fails open. `status` is COMPLETE only when
// `npm outdated` ran against an installed tree and every declared candidate could
// be evaluated; UNAVAILABLE when the tree is not installed or the registry is
// unreachable; INCOMPLETE when some declared candidate lacked a resolvable
// version. A missing/empty result is UNAVAILABLE, never "nothing held".

export type HeldBackStatus = 'COMPLETE' | 'INCOMPLETE' | 'UNAVAILABLE';
export type HeldReason = 'family' | 'held' | 'other';

export interface OutdatedEntry {
  current?: string;
  wanted?: string;
  latest?: string;
  location?: string;
  dependent?: string;
}
export type NpmOutdated = Record<string, OutdatedEntry | OutdatedEntry[]>;

export interface HeldPackage {
  name: string;
  current: string;
  latest: string;
  level: SemverLevel;
  reason: HeldReason;
}
export interface HeldBackResult {
  status: HeldBackStatus;
  packages: HeldPackage[];
  note?: string;
}

// Unpublished workspace internals: never a real "held-back" update.
const INTERNAL_PREFIX = '@porsche-design-system/';

function labelReason(name: string, policy: DependencyPolicy): HeldReason {
  if (matchesAny(name, policy.minorOnly)) return 'family';
  if (matchesAny(name, policy.ignored)) return 'held';
  return 'other';
}

// Pure core: given whether `npm outdated` produced parseable JSON (`ok`), whether
// the tree is installed, the raw outdated map, the set of DECLARED dependency
// names, and the policy, decide the tri-state result. Kept pure for testing.
export function buildHeldBack(
  ok: boolean,
  treeInstalled: boolean,
  outdated: NpmOutdated,
  declared: Set<string>,
  policy: DependencyPolicy
): HeldBackResult {
  if (!ok) {
    return {
      status: 'UNAVAILABLE',
      packages: [],
      note: 'npm outdated did not return parseable data (registry unreachable?).',
    };
  }
  if (!treeInstalled) {
    return {
      status: 'UNAVAILABLE',
      packages: [],
      note: 'Dependency tree is not installed; cannot determine held-back updates.',
    };
  }
  const packages: HeldPackage[] = [];
  let incomplete = false;
  for (const [name, value] of Object.entries(outdated)) {
    if (!declared.has(name)) continue; // transitive dep: not ours to bump.
    if (name.startsWith(INTERNAL_PREFIX)) continue; // unpublished internal.
    const entry = Array.isArray(value) ? value[0] : value;
    const current = entry?.current;
    const latest = entry?.latest;
    if (!current || !latest) {
      incomplete = true;
      continue;
    }
    if (!isNewer(current, latest)) continue; // already up to date.
    packages.push({ name, current, latest, level: classifyLevel(current, latest), reason: labelReason(name, policy) });
  }
  packages.sort((a, b) => a.name.localeCompare(b.name));
  return incomplete
    ? { status: 'INCOMPLETE', packages, note: 'Some declared packages could not be evaluated; list may be partial.' }
    : { status: 'COMPLETE', packages };
}

// Runs `npm outdated --json`. Returns ok=false only when the command produced no
// parseable JSON at all (registry/process failure); npm exiting 1 because
// outdated deps exist is a normal success with JSON on stdout.
function readOutdated(): { ok: boolean; data: NpmOutdated } {
  const parse = (stdout: string | undefined): { ok: boolean; data: NpmOutdated } => {
    if (stdout === undefined) return { ok: false, data: {} };
    const trimmed = stdout.trim();
    if (!trimmed) return { ok: true, data: {} };
    try {
      return { ok: true, data: JSON.parse(trimmed) as NpmOutdated };
    } catch {
      return { ok: false, data: {} };
    }
  };
  try {
    return parse(execFileSync('npm', ['outdated', '--json'], { encoding: 'utf8' }));
  } catch (error) {
    return parse((error as { stdout?: string }).stdout);
  }
}

// Enumerate declared dependency names. In-sandbox, read the host-snapshotted
// package.json list from preflight (no git); fall back to git ls-files when the
// snapshot is absent (host-side / ad-hoc runs).
function declaredDependencyNames(): Set<string> {
  let files: string[];
  try {
    const snapshot = JSON.parse(readFileSync(resolve(OUT_DIR, 'package-json-files.json'), 'utf8')) as {
      files: string[];
    };
    files = snapshot.files;
  } catch {
    files = trackedPackageJsonFiles();
  }
  return new Set(Object.keys(collectDepsFromFiles(files, (file) => readFileSync(file, 'utf8'))));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const { ok, data } = readOutdated();
  const treeInstalled = existsSync(resolve(process.cwd(), 'node_modules'));
  const result = buildHeldBack(ok, treeInstalled, data, declaredDependencyNames(), readDependencyPolicy());
  writeVerdict('held-back.json', { schemaVersion: 1, ...result });
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
}
