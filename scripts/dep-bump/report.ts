import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { OUT_DIR, writeVerdict } from './lib/verdict.ts';

export interface UpdateVerdict {
  outcome: 'RESOLVED' | 'NO_CHANGES' | 'BLOCKED' | 'BLOCKED_PREEXISTING';
  summary?: string;
  bumped?: unknown[];
  conflicts?: unknown[];
  overridesAdded?: unknown[];
  holdbacks?: unknown[];
  stopReason?: string | null;
}
export interface VerifyVerdict {
  outcome: 'PASS';
}
export interface Report {
  schemaVersion: 1;
  verdict: 'SUCCESS' | 'NO_CHANGES' | 'BLOCKED' | 'BLOCKED_PREEXISTING';
  summary: string;
  bumped: unknown[];
  conflicts: unknown[];
  overrides: unknown[];
  holdbacks: unknown[];
  stopReason: string | null;
}

export function buildReport(update: UpdateVerdict, verify: VerifyVerdict | null): Report {
  const base = {
    schemaVersion: 1 as const,
    bumped: update.bumped ?? [],
    conflicts: update.conflicts ?? [],
    overrides: update.overridesAdded ?? [],
    holdbacks: update.holdbacks ?? [],
    stopReason: update.stopReason ?? null,
  };
  if (update.outcome === 'NO_CHANGES') {
    return { ...base, verdict: 'NO_CHANGES', summary: update.summary ?? 'Nothing to bump.' };
  }
  if (update.outcome === 'RESOLVED' && verify?.outcome === 'PASS') {
    return { ...base, verdict: 'SUCCESS', summary: update.summary ?? 'Dependencies bumped and verified.' };
  }
  if (update.outcome === 'BLOCKED_PREEXISTING') {
    return {
      ...base,
      verdict: 'BLOCKED_PREEXISTING',
      summary:
        update.summary ?? 'Bumps applied and retained; a pre-existing, out-of-scope defect blocks the gate. Escalate.',
    };
  }
  const summary =
    update.outcome === 'BLOCKED'
      ? (update.summary ?? 'Blocked during update.')
      : 'Update resolved but verification did not pass; tree is unverified.';
  return { ...base, verdict: 'BLOCKED', summary };
}

function readVerdict<T>(file: string): T | null {
  try {
    return JSON.parse(readFileSync(resolve(OUT_DIR, file), 'utf8')) as T;
  } catch {
    return null;
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const update = readVerdict<UpdateVerdict>('update.json');
  if (!update) {
    process.stderr.write('Missing update.json; cannot build report\n');
    process.exit(2);
  }
  const verify = readVerdict<VerifyVerdict>('verify.json');
  const report = buildReport(update, verify);
  writeVerdict('dep-bump-report.json', report);
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
}
