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
