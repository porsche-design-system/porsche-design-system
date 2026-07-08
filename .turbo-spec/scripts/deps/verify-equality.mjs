// Equality gate: proves "apply == vetted plan". Compares each package.json's
// dependency fields against its committed (HEAD) version and asserts that every
// change corresponds to a planned update at its frozen target, that no held-back
// dependency moved, and that nothing outside the plan drifted.
//
// Exit 0 = clean, 1 = violation (loop_back), 2 = env error (escalate).

import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { relative } from 'node:path';
import { isHeldBack } from './held-back.mjs';
import { findPackageJsons } from './apply-plan.mjs';

const DEP_FIELDS = [
  'dependencies',
  'devDependencies',
  'peerDependencies',
  'optionalDependencies',
];

/** Diff dependency fields of two parsed package.json objects. */
export function changedDeps(headPkg, workPkg) {
  const changes = [];
  for (const field of DEP_FIELDS) {
    const before = (headPkg && headPkg[field]) || {};
    const after = (workPkg && workPkg[field]) || {};
    const names = new Set([...Object.keys(before), ...Object.keys(after)]);
    for (const name of names) {
      const from = before[name];
      const to = after[name];
      if (from !== to) changes.push({ field, name, from: from ?? null, to: to ?? null });
    }
  }
  return changes;
}

/**
 * Validate aggregated changes against the plan and held-back policy.
 * @returns {string[]} violation messages (empty = pass)
 */
export function validateChanges(changes, plan, heldBackFn = isHeldBack) {
  const violations = [];
  const updates = Array.isArray(plan?.updates) ? plan.updates : [];
  const excluded = Array.isArray(plan?.excluded) ? plan.excluded : [];
  const planMap = new Map(updates.map((u) => [u.name, u.to]));
  const excludedSet = new Set(excluded.map((e) => e.name));
  const appliedNames = new Set();

  for (const c of changes) {
    if (heldBackFn(c.name)) {
      violations.push(`held-back dependency changed: ${c.name} (${c.from} -> ${c.to})`);
      continue;
    }
    // Excluded deps (e.g. typescript deferred under Angular) are sanctioned to
    // change in a later stage — allow them without a plan target.
    if (excludedSet.has(c.name)) continue;
    if (!planMap.has(c.name)) {
      violations.push(`unplanned dependency changed: ${c.name} (${c.from} -> ${c.to})`);
      continue;
    }
    if (c.to !== planMap.get(c.name)) {
      violations.push(
        `dependency ${c.name} set to ${c.to} but plan froze ${planMap.get(c.name)}`
      );
    }
    appliedNames.add(c.name);
  }

  for (const u of updates) {
    if (u.from !== u.to && !appliedNames.has(u.name)) {
      violations.push(`planned dependency not applied anywhere: ${u.name} -> ${u.to}`);
    }
  }
  return violations;
}

function gitShowHead(relPath, root) {
  try {
    return execFileSync('git', ['show', `HEAD:${relPath}`], {
      cwd: root,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    });
  } catch {
    return null; // new file not in HEAD
  }
}

function main(argv) {
  const planPath = argv[2];
  const root = argv[3] || '.';
  if (!planPath) {
    console.error('usage: verify-equality.mjs <update-plan.json> [repo-root]');
    return 2;
  }
  let plan;
  try {
    plan = JSON.parse(readFileSync(planPath, 'utf8'));
  } catch (err) {
    console.error(`cannot read plan: ${err.message}`);
    return 2;
  }
  const allChanges = [];
  for (const file of findPackageJsons(root)) {
    const rel = relative(root, file);
    const headRaw = gitShowHead(rel, root);
    if (headRaw === null) continue; // untracked package.json — no baseline to compare
    let headPkg;
    let workPkg;
    try {
      headPkg = JSON.parse(headRaw);
      workPkg = JSON.parse(readFileSync(file, 'utf8'));
    } catch (err) {
      console.error(`cannot parse ${rel}: ${err.message}`);
      return 2;
    }
    allChanges.push(...changedDeps(headPkg, workPkg));
  }

  const violations = validateChanges(allChanges, plan);
  if (violations.length > 0) {
    console.error('equality gate failed:');
    for (const v of violations) console.error(`  - ${v}`);
    return 1;
  }
  console.log(`equality gate passed: ${allChanges.length} change(s), all match the frozen plan`);
  return 0;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  process.exit(main(process.argv));
}
