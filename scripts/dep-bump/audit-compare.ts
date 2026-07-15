import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { OUT_DIR, writeVerdict } from './lib/verdict.ts';

export interface AuditReport {
  vulnerabilities?: Record<string, { via?: (string | { source?: number; name?: string })[] }>;
}

export function advisoryIdentities(report: AuditReport): Set<string> {
  const ids = new Set<string>();
  for (const vuln of Object.values(report.vulnerabilities ?? {})) {
    for (const via of vuln.via ?? []) {
      if (typeof via === 'object' && via.source != null) {
        ids.add(`${via.source}:${via.name ?? ''}`);
      }
    }
  }
  return ids;
}

export function compareAudits(
  baseline: AuditReport,
  current: AuditReport
): {
  introduced: string[];
  resolved: string[];
} {
  const before = advisoryIdentities(baseline);
  const after = advisoryIdentities(current);
  return {
    introduced: [...after].filter((id) => !before.has(id)).sort(),
    resolved: [...before].filter((id) => !after.has(id)).sort(),
  };
}

function readReport(file: string): AuditReport {
  try {
    return JSON.parse(readFileSync(resolve(OUT_DIR, file), 'utf8')) as AuditReport;
  } catch {
    return {};
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const result = compareAudits(readReport('audit-baseline.json'), readReport('audit-current.json'));
  writeVerdict('audit-compare.json', { schemaVersion: 1, ...result });
  if (result.introduced.length > 0) {
    process.stderr.write(`New advisories introduced: ${result.introduced.join(', ')}\n`);
    process.exit(1);
  }
  process.stdout.write('No new advisories vs baseline\n');
}
