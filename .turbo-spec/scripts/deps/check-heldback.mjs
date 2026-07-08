// Gate: the update-plan must not contain any held-back dependency.
// Schema validity alone cannot catch a held-back NAME, so this is a separate
// deterministic check. Exit 0 = clean, 1 = violation (loop_back), 2 = env error.

import { readFileSync } from 'node:fs';
import { HELD_BACK_PATTERNS, isHeldBack } from './held-back.mjs';

/** Return the names in the plan that are held back (should be empty). */
export function findHeldBackViolations(plan, patterns = HELD_BACK_PATTERNS) {
  const updates = Array.isArray(plan?.updates) ? plan.updates : [];
  return updates.map((u) => u.name).filter((name) => isHeldBack(name, patterns));
}

function main(argv) {
  const planPath = argv[2];
  if (!planPath) {
    console.error('usage: check-heldback.mjs <update-plan.json>');
    return 2;
  }
  let plan;
  try {
    plan = JSON.parse(readFileSync(planPath, 'utf8'));
  } catch (err) {
    console.error(`cannot read plan: ${err.message}`);
    return 2;
  }
  const violations = findHeldBackViolations(plan);
  if (violations.length > 0) {
    console.error(`held-back dependencies present in plan: ${violations.join(', ')}`);
    return 1;
  }
  console.log('held-back check passed: no held-back dependency in plan');
  return 0;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  process.exit(main(process.argv));
}
