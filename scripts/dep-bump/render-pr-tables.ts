import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { AuditReport } from './audit-compare.ts';
import { type AdvisoryRow, renderAuditSummary, summarizeAudit } from './audit-summary.ts';
import type { BumpChange } from './classify-bump.ts';
import type { HeldBackResult, HeldReason } from './held-back.ts';
import { OUT_DIR } from './lib/verdict.ts';
import type { PruneResult } from './prune-overrides.ts';
import type { SemverLevel } from './semver-level.ts';

// The ONLY Markdown producer in the dep-bump flow. Turns the two data-only
// datasets — bump.json (updated) + held-back.json (held) — into two tables for
// the PR comment. The leading MARKER lets post-pr-tables.sh find and upsert its
// own comment idempotently.

export const MARKER = '<!-- dep-bump-tables -->';

const TAG: Record<SemverLevel, string> = {
  major: 'MAJOR',
  minor: 'MINOR',
  patch: 'PATCH',
  prerelease: 'PRERELEASE',
  unknown: '—',
};

const REASON: Record<HeldReason, string> = {
  family: 'minor/patch only',
  held: 'permanently held',
  other: 'not applied',
};

function updatedTable(updated: BumpChange[]): string {
  const heading = `### Updated dependencies (${updated.length})`;
  if (updated.length === 0) return `${heading}\n\n_No dependencies were updated._`;
  const rows = updated.map((c) => `| \`${c.name}\` | ${c.from} | ${c.to} | ${TAG[c.level]} |`).join('\n');
  return `${heading}\n\n| Package | From | To | Bump |\n| --- | --- | --- | --- |\n${rows}`;
}

function heldTable(held: HeldBackResult): string {
  const heading = `### Available updates held back (${held.packages.length})`;
  if (held.status === 'UNAVAILABLE') {
    return `${heading}\n\n> ⚠️ Held-back data is unavailable${held.note ? ` — ${held.note}` : ''} Review manually.`;
  }
  if (held.packages.length === 0) {
    return `${heading}\n\n_No held-back updates: everything updatable is up to date._`;
  }
  const rows = held.packages
    .map((p) => `| \`${p.name}\` | ${p.current} | ${p.latest} | ${TAG[p.level]} | ${REASON[p.reason]} |`)
    .join('\n');
  const note = held.status === 'INCOMPLETE' && held.note ? `\n\n> ⚠️ ${held.note}` : '';
  return `${heading}\n\n| Package | Current | Latest | Bump | Reason |\n| --- | --- | --- | --- | --- |\n${rows}${note}`;
}

function prunedTable(pruned?: PruneResult): string {
  const removed = pruned?.removed ?? [];
  const heading = `### Pruned overrides (${removed.length})`;
  if (removed.length === 0) return `${heading}\n\n_No overrides were removed this run._`;
  const rows = removed.map((r) => `| \`${r.name}\` |`).join('\n');
  return `${heading}\n\n| Removed override |\n| --- |\n${rows}`;
}

export function renderTables(
  updated: BumpChange[],
  held: HeldBackResult,
  advisories: AdvisoryRow[] = [],
  pruned?: PruneResult,
): string {
  return `${MARKER}\n\n${updatedTable(updated)}\n\n${heldTable(held)}\n\n${renderAuditSummary(advisories)}\n\n${prunedTable(pruned)}\n`;
}

function readOut<T>(file: string, fallback: T): T {
  try {
    return JSON.parse(readFileSync(resolve(OUT_DIR, file), 'utf8')) as T;
  } catch {
    return fallback;
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const bump = readOut<{ changes?: BumpChange[] }>('bump.json', {});
  const held = readOut<HeldBackResult>('held-back.json', {
    status: 'UNAVAILABLE',
    packages: [],
    note: 'held-back.json was not produced.',
  });
  const audit = readOut<AuditReport>('audit-current.json', {});
  const pruned = readOut<PruneResult>('pruned.json', { schemaVersion: 1, removed: [], kept: [] });
  const markdown = renderTables(bump.changes ?? [], held, summarizeAudit(audit), pruned);
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(resolve(OUT_DIR, 'pr-tables.md'), markdown, 'utf8');
  process.stdout.write(markdown);
}
