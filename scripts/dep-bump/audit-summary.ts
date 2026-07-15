import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { AuditReport } from './audit-compare.ts';
import { OUT_DIR } from './lib/verdict.ts';

export interface AdvisoryRow {
  name: string;
  severity: string;
  title: string;
}

export function summarizeAudit(report: AuditReport): AdvisoryRow[] {
  const rows: AdvisoryRow[] = [];
  for (const [name, vuln] of Object.entries(report.vulnerabilities ?? {})) {
    const v = vuln as { severity?: string; via?: (string | { title?: string })[] };
    const objVia = (v.via ?? []).find((entry) => typeof entry === 'object') as { title?: string } | undefined;
    rows.push({ name, severity: v.severity ?? 'unknown', title: objVia?.title ?? '—' });
  }
  return rows.sort((a, b) => a.name.localeCompare(b.name));
}

export function renderAuditSummary(rows: AdvisoryRow[]): string {
  const heading = `### Security advisories (${rows.length})`;
  if (rows.length === 0) return `${heading}\n\n_No advisories reported by \`npm audit\`._`;
  const body = rows.map((r) => `| \`${r.name}\` | ${r.severity} | ${r.title} |`).join('\n');
  return `${heading}\n\n> Report-only — advisories are summarized, never auto-fixed.\n\n| Package | Severity | Advisory |\n| --- | --- | --- |\n${body}`;
}

function readReport(file: string): AuditReport {
  try {
    return JSON.parse(readFileSync(resolve(OUT_DIR, file), 'utf8')) as AuditReport;
  } catch {
    return {};
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const md = renderAuditSummary(summarizeAudit(readReport('audit-current.json')));
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(resolve(OUT_DIR, 'audit-summary.md'), md);
  process.stdout.write(md);
}
