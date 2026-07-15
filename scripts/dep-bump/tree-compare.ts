import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { OUT_DIR, writeVerdict } from './lib/verdict.ts';

export interface LsReport {
  problems?: string[];
}

export function treeProblems(report: LsReport): Set<string> {
  const keys = new Set<string>();
  for (const problem of report.problems ?? []) {
    keys.add(problem.split(' /')[0].trim());
  }
  return keys;
}

export function compareTree(
  baseline: LsReport,
  current: LsReport
): {
  introduced: string[];
  resolved: string[];
} {
  const before = treeProblems(baseline);
  const after = treeProblems(current);
  return {
    introduced: [...after].filter((key) => !before.has(key)).sort(),
    resolved: [...before].filter((key) => !after.has(key)).sort(),
  };
}

function readReport(file: string): LsReport {
  try {
    return JSON.parse(readFileSync(resolve(OUT_DIR, file), 'utf8')) as LsReport;
  } catch {
    return {};
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const result = compareTree(readReport('ls-baseline.json'), readReport('ls-current.json'));
  writeVerdict('tree-compare.json', { schemaVersion: 1, ...result });
  if (result.introduced.length > 0) {
    process.stderr.write(`New invalid/extraneous edges introduced by this run:\n  ${result.introduced.join('\n  ')}\n`);
    process.exit(1);
  }
  process.stdout.write('No new tree problems vs baseline (pre-existing edges tolerated)\n');
}
