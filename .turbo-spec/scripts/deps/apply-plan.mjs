// Deterministic writer: applies the frozen update-plan to every matching
// package.json instance across the workspace. syncpack cannot target a specific
// version, so we write the frozen specifiers directly. The plan is the sole
// source of truth — no registry re-query.

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const DEP_FIELDS = [
  'dependencies',
  'devDependencies',
  'peerDependencies',
  'optionalDependencies',
];

const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', 'dist-tmp', 'tmp', '.turbo-spec']);

/**
 * Apply updates (Map name->to) to a parsed package.json object in place.
 * Only replaces existing entries; never adds a dependency.
 * @returns {Array<{field:string,name:string,from:string,to:string}>} changes made
 */
export function applyPlanToPackageJson(pkg, updatesByName) {
  const changes = [];
  for (const field of DEP_FIELDS) {
    const deps = pkg[field];
    if (!deps || typeof deps !== 'object') continue;
    for (const [name, to] of updatesByName) {
      if (Object.hasOwn(deps, name) && deps[name] !== to) {
        changes.push({ field, name, from: deps[name], to });
        deps[name] = to;
      }
    }
  }
  return changes;
}

/** Recursively collect package.json paths, skipping vendored/build dirs. */
export function findPackageJsons(root) {
  const found = [];
  const walk = (dir) => {
    let entries;
    try {
      entries = readdirSync(dir);
    } catch {
      return;
    }
    for (const entry of entries) {
      const full = join(dir, entry);
      let st;
      try {
        st = statSync(full);
      } catch {
        continue;
      }
      if (st.isDirectory()) {
        if (!SKIP_DIRS.has(entry)) walk(full);
      } else if (entry === 'package.json') {
        found.push(full);
      }
    }
  };
  walk(root);
  return found;
}

function buildUpdateMap(plan) {
  const updates = Array.isArray(plan?.updates) ? plan.updates : [];
  return new Map(updates.map((u) => [u.name, u.to]));
}

function main(argv) {
  const planPath = argv[2];
  const root = argv[3] || '.';
  if (!planPath) {
    console.error('usage: apply-plan.mjs <update-plan.json> [repo-root]');
    return 2;
  }
  let plan;
  try {
    plan = JSON.parse(readFileSync(planPath, 'utf8'));
  } catch (err) {
    console.error(`cannot read plan: ${err.message}`);
    return 2;
  }
  const updatesByName = buildUpdateMap(plan);
  let filesTouched = 0;
  let totalChanges = 0;
  for (const file of findPackageJsons(root)) {
    const raw = readFileSync(file, 'utf8');
    const pkg = JSON.parse(raw);
    const changes = applyPlanToPackageJson(pkg, updatesByName);
    if (changes.length > 0) {
      writeFileSync(file, `${JSON.stringify(pkg, null, 2)}\n`);
      filesTouched++;
      totalChanges += changes.length;
    }
  }
  console.log(
    `apply-plan: wrote ${totalChanges} change(s) across ${filesTouched} package.json file(s)`
  );
  return 0;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  process.exit(main(process.argv));
}
