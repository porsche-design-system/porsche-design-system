// Deterministic TypeScript reconciliation for the angular-migrations stage.
// When Angular is bumped, the planner defers `typescript` into the plan's
// `excluded` list, carrying its FROZEN `to` specifier from the outdated report.
// After Angular installs (its MAX_TS_VERSION ceiling is now knowable), this
// script applies that exact frozen specifier when it is within the ceiling, or
// holds `typescript` back otherwise — so the migrator never re-chooses a version.
//
// Exit 0 = reconciled (applied or intentionally held), 2 = env/parse error.

import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { compareSemver, parseMaxTsVersion } from './check-ts-ceiling.mjs';
import { applyPlanToPackageJson, findPackageJsons } from './apply-plan.mjs';

const COMPILER_CLI_PATHS = [
  'packages/components-angular/node_modules/@angular/compiler-cli/src/typescript_support.js',
  'node_modules/@angular/compiler-cli/src/typescript_support.js',
];

/** The deferred `typescript` entry carrying a frozen target, or null. */
export function excludedTypescript(plan) {
  const excluded = Array.isArray(plan?.excluded) ? plan.excluded : [];
  const ts = excluded.find((e) => e.name === 'typescript');
  return ts && ts.to ? ts : null;
}

/** Numeric version inside a range specifier (`^5.9.3` -> `5.9.3`). */
function versionOf(specifier) {
  const m = String(specifier).match(/(\d+\.\d+(?:\.\d+)?)/);
  return m ? m[1] : null;
}

/**
 * Decide whether the frozen TypeScript target may be applied under the ceiling.
 * @param {string|null|undefined} frozenTo  the specifier from the excluded entry
 * @param {string} ceiling                  Angular MAX_TS_VERSION
 * @returns {{apply: boolean, version: string|null}}
 */
export function reconcileTs(frozenTo, ceiling) {
  if (!frozenTo) return { apply: false, version: null };
  const target = versionOf(frozenTo);
  if (!target) return { apply: false, version: null };
  return compareSemver(target, ceiling) <= 0
    ? { apply: true, version: frozenTo }
    : { apply: false, version: null };
}

function readFirst(root, relPaths) {
  for (const rel of relPaths) {
    try {
      return readFileSync(join(root, rel), 'utf8');
    } catch {
      // try next
    }
  }
  return null;
}

function main(argv) {
  const planPath = argv[2] || '.turbo-spec/out/update-plan.json';
  const root = argv[3] || '.';

  let plan;
  try {
    plan = JSON.parse(readFileSync(planPath, 'utf8'));
  } catch (err) {
    console.error(`cannot read plan: ${err.message}`);
    return 2;
  }

  const ts = excludedTypescript(plan);
  if (!ts) {
    console.log('reconcile-ts: no deferred typescript target — nothing to do');
    return 0;
  }

  const cliSrc = readFirst(root, COMPILER_CLI_PATHS);
  if (cliSrc === null) {
    console.error('reconcile-ts: Angular compiler-cli not installed — cannot read ceiling');
    return 2;
  }
  const ceiling = parseMaxTsVersion(cliSrc);
  if (!ceiling) {
    console.error('reconcile-ts: could not parse MAX_TS_VERSION from compiler-cli');
    return 2;
  }

  const { apply, version } = reconcileTs(ts.to, ceiling);
  if (!apply) {
    console.log(
      `reconcile-ts: holding typescript back — frozen target ${ts.to} exceeds MAX_TS_VERSION ${ceiling}`
    );
    return 0;
  }

  const updatesByName = new Map([['typescript', version]]);
  let touched = 0;
  for (const file of findPackageJsons(root)) {
    const pkg = JSON.parse(readFileSync(file, 'utf8'));
    const changes = applyPlanToPackageJson(pkg, updatesByName);
    if (changes.length > 0) {
      writeFileSync(file, `${JSON.stringify(pkg, null, 2)}\n`);
      touched++;
    }
  }
  console.log(
    `reconcile-ts: applied frozen typescript ${version} (<= MAX_TS_VERSION ${ceiling}) across ${touched} package.json file(s)`
  );
  return 0;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  process.exit(main(process.argv));
}
