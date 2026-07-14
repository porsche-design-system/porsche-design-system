import { execFileSync } from 'node:child_process';
import { existsSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { coerce, major as semverMajor } from 'semver';
import { OUT_DIR, writeVerdict } from './lib/verdict.ts';
import { type DependencyPolicy, matchesAny, readDependencyPolicy } from './policy.ts';

// Surfaces major updates the automated flow intentionally does NOT apply, so a
// human sees exactly what was held. It is POLICY-AWARE: it reports only the
// packages the policy holds back — framework/styling families capped to
// minor/patch, permanently held packages, and typescript pinned under Angular's
// ceiling — and ignores "other" majors (those are applied by the flow). Being
// policy-aware makes the hint deterministic: it no longer depends on running
// against a post-bump tree so applied majors "drop out" of `npm outdated`.
//
// It is also TRI-STATE and never fails open. `status` is COMPLETE only when
// `npm outdated` ran against an installed tree and every held candidate could be
// evaluated; UNAVAILABLE when the tree is not installed or the registry is
// unreachable; INCOMPLETE when some held candidate lacked a resolvable version.
// A missing/empty result is reported as UNAVAILABLE, never as "nothing held".

export type HintStatus = 'COMPLETE' | 'INCOMPLETE' | 'UNAVAILABLE';
export type HintReason = 'family' | 'held' | 'typescript-ceiling';

export interface OutdatedEntry {
  current?: string;
  wanted?: string;
  latest?: string;
  location?: string;
  dependent?: string;
}
export type NpmOutdated = Record<string, OutdatedEntry | OutdatedEntry[]>;

export interface MajorHint {
  name: string;
  current: string;
  latest: string;
  reason: HintReason;
}
export interface MajorHintResult {
  status: HintStatus;
  hints: MajorHint[];
  note?: string;
}

// typescript is not in a policy group; it is held dynamically under Angular's
// compiler-cli peer ceiling by scripts/update-dependencies.ts. Treat it as a
// held candidate so a ceiling-held major is surfaced too.
function classifyHeld(name: string, policy: DependencyPolicy): HintReason | null {
  if (matchesAny(name, policy.minorOnly)) return 'family';
  if (matchesAny(name, policy.ignored)) return 'held';
  if (name === 'typescript') return 'typescript-ceiling';
  return null;
}

// Pure core: given the outcome of `npm outdated` (ok = the command produced
// parseable JSON), whether the dependency tree is installed, the raw outdated
// map, and the policy, decide the tri-state result. Kept pure for testing.
export function buildMajorHintResult(
  ok: boolean,
  treeInstalled: boolean,
  outdated: NpmOutdated,
  policy: DependencyPolicy
): MajorHintResult {
  if (!ok) {
    return {
      status: 'UNAVAILABLE',
      hints: [],
      note: 'npm outdated did not return parseable data (registry unreachable?).',
    };
  }
  if (!treeInstalled) {
    return {
      status: 'UNAVAILABLE',
      hints: [],
      note: 'Dependency tree is not installed; cannot determine held-back majors.',
    };
  }
  const hints: MajorHint[] = [];
  let incomplete = false;
  for (const [name, value] of Object.entries(outdated)) {
    const reason = classifyHeld(name, policy);
    if (!reason) continue; // "other" majors are applied by the flow; ignore.
    const entry = Array.isArray(value) ? value[0] : value;
    const current = entry?.current;
    const latest = entry?.latest;
    if (!current || !latest) {
      incomplete = true;
      continue;
    }
    const currentSemver = coerce(current);
    const latestSemver = coerce(latest);
    if (!currentSemver || !latestSemver) {
      incomplete = true;
      continue;
    }
    if (semverMajor(latestSemver) > semverMajor(currentSemver)) {
      hints.push({ name, current, latest, reason });
    }
  }
  hints.sort((a, b) => a.name.localeCompare(b.name));
  return incomplete
    ? { status: 'INCOMPLETE', hints, note: 'Some held-back packages could not be evaluated; list may be partial.' }
    : { status: 'COMPLETE', hints };
}

const REASON_LABEL: Record<HintReason, string> = {
  family: 'framework/styling family (capped to minor/patch)',
  held: 'permanently held package',
  'typescript-ceiling': 'typescript held under Angular’s peer ceiling',
};

export function renderMajorHints(result: MajorHintResult): string {
  const heading = '## Held-back major updates (apply by hand)';
  if (result.status === 'UNAVAILABLE') {
    return `${heading}\n\n⚠️ Held-back major information is unavailable${result.note ? ` — ${result.note}` : ''} Review manually.`;
  }
  if (result.hints.length === 0) {
    const suffix = result.status === 'INCOMPLETE' && result.note ? ` (${result.note})` : '';
    return `${heading}\n\n_No major updates are being held back._${suffix}`;
  }
  const rows = result.hints
    .map((hint) => `- \`${hint.name}\` ${hint.current} → **${hint.latest}** — ${REASON_LABEL[hint.reason]}`)
    .join('\n');
  const preamble =
    'The automated flow applies minor/patch only for framework/styling families ' +
    '(Angular, React, Vue, ag-grid, Tailwind, Emotion, Vanilla-Extract, sass), never bumps ' +
    'permanently held packages, and pins typescript under Angular’s ceiling. The following ' +
    'majors are available and must be reviewed and upgraded manually:';
  const warning = result.status === 'INCOMPLETE' && result.note ? `\n\n> ⚠️ ${result.note}` : '';
  return `${heading}\n\n${preamble}\n\n${rows}${warning}`;
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

if (import.meta.url === `file://${process.argv[1]}`) {
  const { ok, data } = readOutdated();
  const treeInstalled = existsSync(resolve(process.cwd(), 'node_modules'));
  const result = buildMajorHintResult(ok, treeInstalled, data, readDependencyPolicy());
  const markdown = renderMajorHints(result);
  writeVerdict('major-hint.json', { schemaVersion: 1, ...result });
  writeFileSync(resolve(OUT_DIR, 'major-hint.md'), `${markdown}\n`, 'utf8');
  process.stdout.write(`${markdown}\n`);
}
