// Gate: a lockstep family must be applied all-or-nothing. The planner skill
// instructs "never split a family", but the schema/held-back gates cannot catch
// a partially-bumped family — so this deterministic gate enforces it against the
// outdated report. Exit 0 = no split, 1 = split family (loop_back), 2 = env error.

import { readFileSync } from 'node:fs';
import { membersByFamily } from './families.mjs';

/**
 * Families whose *reported* members are only partially present in the plan.
 * @param {{dependencies?: Array<{name:string}>}} report  outdated-report.json
 * @param {{updates?: Array<{name:string}>}} plan          update-plan.json
 * @returns {Array<{family:string, planned:string[], missing:string[]}>}
 */
export function findSplitFamilies(report, plan) {
  const reportedNames = (report?.dependencies ?? []).map((d) => d.name);
  const plannedSet = new Set((plan?.updates ?? []).map((u) => u.name));
  const splits = [];
  for (const [family, reportedMembers] of membersByFamily(reportedNames)) {
    const planned = reportedMembers.filter((m) => plannedSet.has(m));
    if (planned.length > 0 && planned.length < reportedMembers.length) {
      splits.push({
        family,
        planned,
        missing: reportedMembers.filter((m) => !plannedSet.has(m)),
      });
    }
  }
  return splits;
}

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function main(argv) {
  const reportPath = argv[2];
  const planPath = argv[3];
  if (!reportPath || !planPath) {
    console.error('usage: check-families.mjs <outdated-report.json> <update-plan.json>');
    return 2;
  }
  let report;
  let plan;
  try {
    report = readJson(reportPath);
    plan = readJson(planPath);
  } catch (err) {
    console.error(`cannot read inputs: ${err.message}`);
    return 2;
  }
  const splits = findSplitFamilies(report, plan);
  if (splits.length > 0) {
    for (const s of splits) {
      console.error(
        `split family "${s.family}": planned ${s.planned.join(', ')} but missing ${s.missing.join(', ')} (include the whole family or defer it)`
      );
    }
    return 1;
  }
  console.log('families check passed: no partially-bumped lockstep family');
  return 0;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  process.exit(main(process.argv));
}
