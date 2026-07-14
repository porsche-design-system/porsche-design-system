import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { coerce, major as semverMajor } from 'semver';
import { OUT_DIR, writeVerdict } from './lib/verdict.ts';

// Surfaces major updates that the automated flow intentionally does NOT apply:
// framework/styling families are capped to minor/patch, permanent holds are
// frozen, and typescript is pinned under Angular's ceiling. Sourced from native
// `npm outdated` (policy-unaware) so a human sees every skipped major. Must run
// against a fully installed tree, so `current` reflects the resolved versions.
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
}

export function collectMajorHints(outdated: NpmOutdated): MajorHint[] {
  const hints: MajorHint[] = [];
  for (const [name, value] of Object.entries(outdated)) {
    const entry = Array.isArray(value) ? value[0] : value;
    const { current, latest } = entry ?? {};
    if (!current || !latest) continue;
    const currentSemver = coerce(current);
    const latestSemver = coerce(latest);
    if (!currentSemver || !latestSemver) continue;
    if (semverMajor(latestSemver) > semverMajor(currentSemver)) {
      hints.push({ name, current, latest });
    }
  }
  hints.sort((a, b) => a.name.localeCompare(b.name));
  return hints;
}

export function renderMajorHints(hints: MajorHint[]): string {
  const heading = '## Held-back major updates (apply by hand)';
  if (hints.length === 0) {
    return `${heading}\n\n_No major updates are being held back._`;
  }
  const rows = hints.map((hint) => `- \`${hint.name}\` ${hint.current} → **${hint.latest}**`).join('\n');
  return (
    `${heading}\n\n` +
    'The automated flow applies minor/patch only for framework/styling families ' +
    '(Angular, React, Vue, ag-grid, Tailwind, Emotion, Vanilla-Extract, sass) and never ' +
    'bumps permanently held-back packages. The following majors are available and must be ' +
    `reviewed and upgraded manually:\n\n${rows}`
  );
}

function readOutdated(): NpmOutdated {
  try {
    const stdout = execFileSync('npm', ['outdated', '--json'], { encoding: 'utf8' });
    return stdout.trim() ? (JSON.parse(stdout) as NpmOutdated) : {};
  } catch (error) {
    // `npm outdated` exits 1 when outdated deps exist; the JSON is still on stdout.
    const stdout = (error as { stdout?: string }).stdout;
    return stdout?.trim() ? (JSON.parse(stdout) as NpmOutdated) : {};
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const hints = collectMajorHints(readOutdated());
  const markdown = renderMajorHints(hints);
  writeVerdict('major-hint.json', { schemaVersion: 1, hints });
  writeFileSync(resolve(OUT_DIR, 'major-hint.md'), `${markdown}\n`, 'utf8');
  process.stdout.write(`${markdown}\n`);
}
