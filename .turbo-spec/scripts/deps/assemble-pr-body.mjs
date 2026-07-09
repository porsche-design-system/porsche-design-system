// Assembles the PR body for the finalize stage from the frozen plan, any
// overrides the resolve-conflicts agent added, and an optional issue number.
// Pure `buildPrBody(...)` so it is unit-testable.

import { readFileSync, writeFileSync } from 'node:fs';
import { familyOf } from './families.mjs';

function groupUpdates(updates) {
  const groups = new Map();
  for (const u of updates) {
    // Derive the group from the shared family table so grouping stays consistent
    // even if the planner omits the (optional) `group` field.
    const key = u.group || familyOf(u.name);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(u);
  }
  return groups;
}

export function buildPrBody({ plan, overrides = [], overridesSkipped = [], issue = null, date = null } = {}) {
  const updates = Array.isArray(plan?.updates) ? plan.updates : [];
  const excluded = Array.isArray(plan?.excluded) ? plan.excluded : [];
  const day = date || new Date().toISOString().slice(0, 10);
  const lines = [];

  lines.push(`## Weekly dependency updates (${day})`, '');
  lines.push('Automated by the dependency-update workflow.', '');

  lines.push('### Updated dependencies', '');
  if (updates.length === 0) {
    lines.push('_No dependency version changes in this round._', '');
  } else {
    for (const [group, deps] of groupUpdates(updates)) {
      lines.push(`**${group}**`);
      for (const d of deps) lines.push(`- \`${d.name}\`: \`${d.from}\` → \`${d.to}\``);
      lines.push('');
    }
  }

  lines.push('### Angular framework', '');
  lines.push(
    plan?.angular_bumped
      ? '- Angular family bumped; framework migrations applied via `ng update --migrate-only`.'
      : '- Not part of this round.',
    ''
  );

  lines.push('### Overrides added', '');
  if (overrides.length === 0) {
    lines.push('- None.', '');
  } else {
    for (const o of overrides) {
      const spec = o.specifier ? ` \`${o.specifier}\`` : '';
      const reason = o.reason ? ` — ${o.reason}` : '';
      lines.push(`- \`${o.package}\`:${spec}${reason}`);
    }
    lines.push('');
  }

  if (excluded.length > 0) {
    lines.push('### Excluded this round', '');
    for (const e of excluded) lines.push(`- \`${e.name}\` — ${e.reason}`);
    lines.push('');
  }

  if (overridesSkipped.length > 0) {
    lines.push('### Override pins with available updates — review manually', '');
    lines.push(
      '_These live only in the root `overrides` block (hand-curated transitive-security pins). ' +
        'The automation never bumps them; update deliberately if appropriate._',
      ''
    );
    for (const o of overridesSkipped) {
      lines.push(`- \`${o.name}\`: \`${o.from}\` → \`${o.to}\``);
    }
    lines.push('');
  }

  lines.push(
    '> ⚠️ Local build, tests and `npm audit` did **not** run in this phase — ' +
      '**CI on this PR is the correctness gate.**',
    ''
  );

  if (issue) lines.push(`Closes #${issue}`, '');

  return lines.join('\n');
}

function readJsonMaybe(path) {
  if (!path) return null;
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch {
    return null;
  }
}

function main(argv) {
  const args = argv.slice(2);
  let planPath = null;
  let overridesPath = null;
  let reportPath = null;
  let issue = null;
  let outFile = null;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--overrides') overridesPath = args[++i];
    else if (args[i] === '--outdated-report') reportPath = args[++i];
    else if (args[i] === '--issue') issue = args[++i];
    else if (args[i] === '--out') outFile = args[++i];
    else if (!planPath) planPath = args[i];
  }
  const plan = readJsonMaybe(planPath) || { updates: [], angular_bumped: false };
  const overrides = readJsonMaybe(overridesPath) || [];
  const report = readJsonMaybe(reportPath) || {};
  const overridesSkipped = Array.isArray(report.overrides_skipped) ? report.overrides_skipped : [];
  const body = buildPrBody({ plan, overrides, overridesSkipped, issue });
  if (outFile) writeFileSync(outFile, body);
  else process.stdout.write(body);
  return 0;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  process.exit(main(process.argv));
}
