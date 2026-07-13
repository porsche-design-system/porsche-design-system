# Dependency-Bump Turbo-Spec Workflow Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Instantiate a turbo-spec workflow in this repo that bumps third-party npm dependencies, resolves any ERESOLVE peer conflicts with an evidenced remedy, verifies a reproducible tree, and emits exactly one terminal verdict (SUCCESS / NO_CHANGES / BLOCKED).

**Architecture:** Deterministic-by-default. A 4-stage turbo-spec blueprint (`preflight` -> `update` -> `verify` -> `report`) wires repo scripts through `script_gate` and `outcome_contract` quality gates. Only the `update` stage is agentic: one agent runs deterministic bump/install scripts and reasons **only** on ERESOLVE, activating the existing `resolving-npm-eresolve` project skill on demand. Every stage writes a JSON verdict to the gitignored `.turbo-spec/out/`; conditions and the final report read those verdicts. Pure decision logic lives in small, unit-tested TypeScript modules; shell scripts are thin orchestrators.

**Tech Stack:** turbo-spec (`workflow-skeleton` engine, installed at `/Users/FNN57BH/Developer/turbo-spec`), Node 24.15.0, npm 11.12.1, TypeScript executed via `tsx`, `node:test` for unit tests, `semver` (already a root dependency), the existing `.github/skills/resolving-npm-eresolve` skill (reused, not recreated).

## Global Constraints

- Never use `--force`, `--legacy-peer-deps`, or any `npm audit fix` (verbatim from spec).
- The `update` agent must activate the `resolving-npm-eresolve` skill BEFORE editing any peer range or override.
- After editing a wrapper SOURCE peer range (`packages/components-<fw>/projects/<fw>-wrapper/package.json`), run `npm run preinstall:components-<fw>` and prove source == generated dist manifest with `git diff --no-index` before the next install. Never edit dist directly.
- After any `overrides` change: delete `package-lock.json` AND all `node_modules`, reinstall, inspect lockfile churn (preserve platform-specific `@next/swc-*` optional entries), then run `npm ci`.
- Never re-run the unrestricted bump after holding a dependency back: do a TARGETED syncpack rollback and keep a run-local exclusion.
- Stop when the same conflict fingerprint (declarer + peer + demanded range + provider version) survives one evidence-backed remedy, or after a hard cap of 6 resolve iterations.
- Held-back set is defined by `scripts/update-dependencies.ts` (`@porsche-design-system/**`, `@angular/**`, `ng-packagr`, `zone.js`, conditional `typescript`). The bump classifier asserts "held-back unchanged" from the real git diff, never from a hardcoded trust list.
- A retained breaking major with unverified behavior is BLOCKED, never SUCCESS.
- All run output lives under `.turbo-spec/out/` (gitignored). Verdicts are JSON. Never commit `.turbo-spec/out/`.

## File Structure

```
.gitignore                                     (modify: add .turbo-spec/out/)
package.json                                   (modify: add test:dep-bump script)
.turbo-spec/
  workflows/dep-bump.yml                       (blueprint: 4 stages)
  system_prompts/dep_update.md                 (update-agent prompt: run scripts; reason only on ERESOLVE; run-control ledger)
  schemas/
    dep-bump-update.schema.json                (update.json contract)
    dep-bump-verify.schema.json                (verify.json contract)
    dep-bump-report.schema.json                (dep-bump-report.json contract)
scripts/dep-bump/
  lib/verdict.ts                               (writeVerdict + OUT_DIR helper)
  collect-deps.ts                              (git-backed dependency-map reader, shared by classify CLI)
  classify-bump.ts                             (S2 pure classify + CLI -> bump.json)
  classify-bump.test.ts
  audit-compare.ts                             (S5 advisory-identity set-diff + CLI)
  audit-compare.test.ts
  select-impact-tests.ts                       (S5 changed-dep -> test commands + CLI -> impact.json)
  select-impact-tests.test.ts
  report.ts                                    (S6 aggregate verdicts + CLI -> dep-bump-report.json)
  report.test.ts
  finalize-verify.ts                           (assemble verify.json PASS from intermediate out files)
  preflight.sh                                 (S1 agentless script_gate body)
  bump.sh                                      (S2 agent-invoked: update + classify)
  install-check.sh                             (S3 agent-invoked: npm install, detect ERESOLVE)
  run-impact.sh                                (S5 agentless: run impact.json commands)
  verify-checks.sh                             (S5 agentless: tree checks orchestrator)
docs/runbooks/dependency-updates-agent.md      (modify: add "superseded by workflow" note)
docs/superpowers/specs/2026-07-13-dep-bump-workflow-design.md  (modify: close open items)
```

**Verdict JSON shapes** (all `schemaVersion: 1`):

- `preflight.json`: `{ schemaVersion, outcome: "CONTINUE" }` (written by `preflight.sh`; absence/escalation means the run stopped at preflight).
- `bump.json`: `{ schemaVersion, outcome: "CHANGED"|"NO_CHANGES", changes: [{name, from, to, major}], heldViolations: [name] }` (written by `classify-bump.ts`; consumed by the agent, not gated).
- `update.json`: `{ schemaVersion, outcome: "RESOLVED"|"NO_CHANGES"|"BLOCKED", summary, bumped, conflicts, overridesAdded, holdbacks, filesChanged, stopReason }` (authored by the agent; gated by `dep-bump-update.schema.json`).
- `verify.json`: `{ schemaVersion, outcome: "PASS", checks, newAdvisories, impactCommands }` (written by `finalize-verify.ts`; gated by `dep-bump-verify.schema.json`).
- `dep-bump-report.json`: `{ schemaVersion, verdict: "SUCCESS"|"NO_CHANGES"|"BLOCKED", summary, bumped, conflicts, overrides, holdbacks, stopReason }` (written by `report.ts`; gated by `dep-bump-report.schema.json`).

**Blueprint control flow:**

- `preflight` (agentless, `orchestrator: testing`): `script_gate` runs `preflight.sh`. Clean -> exit 0 -> PASS. Any failure -> exit >= 2 -> `environment_verdict: escalate` (terminal BLOCKED at preflight; the run stops, a human sees it). No `outputs`.
- `update` (agent, `orchestrator: implementation`, `depends_on: [preflight]`): one `implementer` agent, `skills` omitted so project skills (incl. `resolving-npm-eresolve`) auto-advertise. Runs `bump.sh` then `install-check.sh`; on ERESOLVE activates the skill and resolves. Authors `update.json`. `outputs: { result: .turbo-spec/out/update.json }`. Gate `outcome_contract` validates `update.json` (`on_fail: loop_back`, re-author if malformed). RESOLVED / NO_CHANGES / BLOCKED are all valid passing declarations.
- `verify` (agentless, `orchestrator: testing`, `depends_on: [update]`, `condition: "update.result.outcome == 'RESOLVED'"`): three ordered `script_gate`s -- (1) tree checks (`npm ci`, `npm ls --all`, `npm run npm:lint`) with `failure_verdict: loop_back` + `loop_back.target_stage: update` (invalid edge/lockfile mismatch routes to S4); (2) audit compare with `failure_verdict: escalate` (new advisory -> security triage); (3) impact tests + `finalize-verify.ts` with `failure_verdict: escalate` (build/test break -> compat triage). Then `outcome_contract` validates `verify.json`. `outputs: { result: .turbo-spec/out/verify.json }`.
- `report` (agentless, `orchestrator: testing`, `depends_on: [update, verify]`, no condition -> runs even when `verify` is skipped): `script_gate` runs `report.ts` -> `dep-bump-report.json`; `outcome_contract` validates it.

## Task Right-Sizing note

Tasks 2-5 are pure-logic modules with `node:test` unit tests. Tasks 1, 6-8 are scaffolding/shell orchestrators validated by a documented smoke run against the real repo (shell glue is not unit-tested, matching the repo's untested `scripts/` convention). Tasks 9-11 are the turbo-spec artifacts, validated with the engine's `validate` + `run --dry-run`. Task 12 closes docs.

---

### Task 1: Scaffold `.turbo-spec/` and the shared verdict helper

**Files:**
- Modify: `.gitignore` (append `.turbo-spec/out/`)
- Modify: `package.json` (add `test:dep-bump` script)
- Create: `scripts/dep-bump/lib/verdict.ts`
- Create: `scripts/dep-bump/lib/verdict.test.ts`

**Interfaces:**
- Produces: `OUT_DIR: string` (absolute path to `<cwd>/.turbo-spec/out`), `writeVerdict(fileName: string, verdict: Record<string, unknown>): string` (writes pretty JSON + trailing newline, creates the dir, returns the absolute path).

- [ ] **Step 1: Add the gitignore entry**

Append to `.gitignore`:

```
# turbo-spec run output (baselines, ledgers, verdicts) — never committed
.turbo-spec/out/
```

- [ ] **Step 2: Add the test script to root `package.json`**

Add this entry to the `"scripts"` object (near the other `test:unit:*` entries):

```json
"test:dep-bump": "node --import tsx --test scripts/dep-bump/*.test.ts",
```

- [ ] **Step 3: Write the failing test for `writeVerdict`**

Create `scripts/dep-bump/lib/verdict.test.ts`:

```ts
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';

test('writeVerdict writes pretty JSON with a trailing newline and returns the path', async () => {
  const dir = mkdtempSync(join(tmpdir(), 'verdict-'));
  const cwd = process.cwd();
  process.chdir(dir);
  try {
    const { writeVerdict, OUT_DIR } = await import('../lib/verdict.ts');
    const path = writeVerdict('sample.json', { schemaVersion: 1, outcome: 'CONTINUE' });
    assert.ok(path.startsWith(OUT_DIR));
    const raw = readFileSync(path, 'utf8');
    assert.equal(raw.at(-1), '\n');
    assert.deepEqual(JSON.parse(raw), { schemaVersion: 1, outcome: 'CONTINUE' });
  } finally {
    process.chdir(cwd);
    rmSync(dir, { recursive: true, force: true });
  }
});
```

- [ ] **Step 4: Run the test to verify it fails**

Run: `node --import tsx --test scripts/dep-bump/lib/verdict.test.ts`
Expected: FAIL (cannot resolve `../lib/verdict.ts`).

- [ ] **Step 5: Implement `verdict.ts`**

Create `scripts/dep-bump/lib/verdict.ts`:

```ts
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

export const OUT_DIR = resolve(process.cwd(), '.turbo-spec/out');

export function writeVerdict(fileName: string, verdict: Record<string, unknown>): string {
  const path = resolve(OUT_DIR, fileName);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${JSON.stringify(verdict, null, 2)}\n`, 'utf8');
  return path;
}
```

- [ ] **Step 6: Run the test to verify it passes**

Run: `node --import tsx --test scripts/dep-bump/lib/verdict.test.ts`
Expected: PASS (1 test).

- [ ] **Step 7: Commit**

```bash
git add .gitignore package.json scripts/dep-bump/lib/verdict.ts scripts/dep-bump/lib/verdict.test.ts
git commit -m "chore(dep-bump): scaffold turbo-spec out dir and verdict helper"
```

---

### Task 2: `classify-bump` — S2 diff classifier

**Files:**
- Create: `scripts/dep-bump/classify-bump.ts`
- Create: `scripts/dep-bump/classify-bump.test.ts`
- Create: `scripts/dep-bump/collect-deps.ts`

**Interfaces:**
- Consumes: `writeVerdict` from Task 1.
- Produces:
  - `type DepMap = Record<string, string>`
  - `interface BumpChange { name: string; from: string; to: string; major: boolean }`
  - `interface BumpClassification { outcome: 'NO_CHANGES' | 'CHANGED'; changes: BumpChange[]; heldViolations: string[] }`
  - `isHeld(name: string, patterns: string[]): boolean`
  - `classifyBump(before: DepMap, after: DepMap, heldBack: string[]): BumpClassification`
  - `collectDeps(ref: string | null): DepMap` (reads all tracked `package.json` dependency + devDependency + optionalDependency entries at a git ref, or from the working tree when `ref` is `null`).

- [ ] **Step 1: Write the failing test**

Create `scripts/dep-bump/classify-bump.test.ts`:

```ts
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { classifyBump, isHeld } from './classify-bump.ts';

const HELD = ['@porsche-design-system/**', '@angular/**', 'ng-packagr', 'zone.js'];

test('isHeld matches scoped globs and exact names', () => {
  assert.equal(isHeld('@porsche-design-system/components', HELD), true);
  assert.equal(isHeld('@angular/core', HELD), true);
  assert.equal(isHeld('zone.js', HELD), true);
  assert.equal(isHeld('react', HELD), false);
});

test('classifyBump flags majors and reports NO_CHANGES', () => {
  const before = { react: '18.3.1', typescript: '5.9.2', vite: '5.4.0' };
  const after = { react: '19.0.0', typescript: '5.9.3', vite: '5.4.0' };
  const result = classifyBump(before, after, HELD);
  assert.equal(result.outcome, 'CHANGED');
  assert.deepEqual(result.changes, [
    { name: 'react', from: '18.3.1', to: '19.0.0', major: true },
    { name: 'typescript', from: '5.9.2', to: '5.9.3', major: false },
  ]);
  assert.deepEqual(result.heldViolations, []);
  assert.equal(classifyBump(before, before, HELD).outcome, 'NO_CHANGES');
});

test('classifyBump records held-back violations', () => {
  const before = { '@angular/core': '20.0.0' };
  const after = { '@angular/core': '21.0.0' };
  const result = classifyBump(before, after, HELD);
  assert.deepEqual(result.heldViolations, ['@angular/core']);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --import tsx --test scripts/dep-bump/classify-bump.test.ts`
Expected: FAIL (cannot resolve `./classify-bump.ts`).

- [ ] **Step 3: Implement `collect-deps.ts`**

Create `scripts/dep-bump/collect-deps.ts`:

```ts
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import type { DepMap } from './classify-bump.ts';

const FIELDS = ['dependencies', 'devDependencies', 'optionalDependencies'] as const;

function git(args: string[]): string {
  return execFileSync('git', args, { encoding: 'utf8' });
}

export function collectDeps(ref: string | null): DepMap {
  const files = git(['ls-files', '*package.json']).trim().split('\n').filter(Boolean);
  const map: DepMap = {};
  for (const file of files) {
    let raw: string;
    try {
      raw = ref ? git(['show', `${ref}:${file}`]) : readFileSync(file, 'utf8');
    } catch {
      continue;
    }
    const json = JSON.parse(raw) as Record<string, Record<string, string> | undefined>;
    for (const field of FIELDS) {
      Object.assign(map, json[field] ?? {});
    }
  }
  return map;
}
```

- [ ] **Step 4: Implement `classify-bump.ts`**

Create `scripts/dep-bump/classify-bump.ts`:

```ts
import { coerce, diff as semverDiff, valid as semverValid } from 'semver';
import { collectDeps } from './collect-deps.ts';
import { writeVerdict } from './lib/verdict.ts';

export type DepMap = Record<string, string>;
export interface BumpChange {
  name: string;
  from: string;
  to: string;
  major: boolean;
}
export interface BumpClassification {
  outcome: 'NO_CHANGES' | 'CHANGED';
  changes: BumpChange[];
  heldViolations: string[];
}

const MAJOR_LEVELS = new Set(['major', 'premajor']);

export function isHeld(name: string, patterns: string[]): boolean {
  return patterns.some((pattern) => {
    if (pattern.endsWith('/**')) {
      const scope = pattern.slice(0, -3);
      return name === scope || name.startsWith(`${scope}/`);
    }
    return name === pattern;
  });
}

export function classifyBump(before: DepMap, after: DepMap, heldBack: string[]): BumpClassification {
  const changes: BumpChange[] = [];
  const heldViolations: string[] = [];
  for (const name of Object.keys(after)) {
    const from = before[name];
    const to = after[name];
    if (from === undefined || from === to) continue;
    const fromVersion = coerce(from)?.version ?? from;
    const toVersion = coerce(to)?.version ?? to;
    let major = false;
    if (semverValid(fromVersion) && semverValid(toVersion)) {
      const level = semverDiff(fromVersion, toVersion);
      major = level !== null && MAJOR_LEVELS.has(level);
    }
    changes.push({ name, from, to, major });
    if (isHeld(name, heldBack)) heldViolations.push(name);
  }
  changes.sort((a, b) => a.name.localeCompare(b.name));
  return { outcome: changes.length === 0 ? 'NO_CHANGES' : 'CHANGED', changes, heldViolations };
}

const HELD_BACK = ['@porsche-design-system/**', '@angular/**', 'ng-packagr', 'zone.js'];

if (import.meta.url === `file://${process.argv[1]}`) {
  const result = classifyBump(collectDeps('HEAD'), collectDeps(null), HELD_BACK);
  writeVerdict('bump.json', { schemaVersion: 1, ...result });
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
}
```

- [ ] **Step 5: Run the test to verify it passes**

Run: `node --import tsx --test scripts/dep-bump/classify-bump.test.ts`
Expected: PASS (3 tests).

- [ ] **Step 6: Commit**

```bash
git add scripts/dep-bump/classify-bump.ts scripts/dep-bump/classify-bump.test.ts scripts/dep-bump/collect-deps.ts
git commit -m "feat(dep-bump): add S2 bump classifier with held-back detection"
```

---

### Task 3: `audit-compare` — S5 advisory-identity diff

**Files:**
- Create: `scripts/dep-bump/audit-compare.ts`
- Create: `scripts/dep-bump/audit-compare.test.ts`

**Interfaces:**
- Consumes: `writeVerdict` + `OUT_DIR` from Task 1.
- Produces:
  - `interface AuditReport { vulnerabilities?: Record<string, { via?: (string | { source?: number; name?: string })[] }> }`
  - `advisoryIdentities(report: AuditReport): Set<string>` (identity = `"<source>:<name>"` per object `via` entry).
  - `compareAudits(baseline: AuditReport, current: AuditReport): { introduced: string[]; resolved: string[] }` (sorted).

- [ ] **Step 1: Write the failing test**

Create `scripts/dep-bump/audit-compare.test.ts`:

```ts
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { advisoryIdentities, compareAudits } from './audit-compare.ts';

const baseline = {
  vulnerabilities: {
    lodash: { via: [{ source: 1001, name: 'lodash' }] },
  },
};
const current = {
  vulnerabilities: {
    lodash: { via: [{ source: 1001, name: 'lodash' }] },
    minimatch: { via: [{ source: 2002, name: 'minimatch' }, 'brace-expansion'] },
  },
};

test('advisoryIdentities keys by source id and package name, ignoring string via entries', () => {
  assert.deepEqual([...advisoryIdentities(current)].sort(), ['1001:lodash', '2002:minimatch']);
});

test('compareAudits reports newly introduced advisories only', () => {
  const result = compareAudits(baseline, current);
  assert.deepEqual(result.introduced, ['2002:minimatch']);
  assert.deepEqual(result.resolved, []);
});

test('compareAudits reports resolved advisories', () => {
  const result = compareAudits(current, baseline);
  assert.deepEqual(result.introduced, []);
  assert.deepEqual(result.resolved, ['2002:minimatch']);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --import tsx --test scripts/dep-bump/audit-compare.test.ts`
Expected: FAIL (cannot resolve `./audit-compare.ts`).

- [ ] **Step 3: Implement `audit-compare.ts`**

Create `scripts/dep-bump/audit-compare.ts`:

```ts
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

export function compareAudits(baseline: AuditReport, current: AuditReport): {
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
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `node --import tsx --test scripts/dep-bump/audit-compare.test.ts`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add scripts/dep-bump/audit-compare.ts scripts/dep-bump/audit-compare.test.ts
git commit -m "feat(dep-bump): add S5 audit advisory-identity comparison"
```

---

### Task 4: `select-impact-tests` — S5 impact mapping

**Files:**
- Create: `scripts/dep-bump/select-impact-tests.ts`
- Create: `scripts/dep-bump/select-impact-tests.test.ts`

**Interfaces:**
- Consumes: `writeVerdict` + `OUT_DIR` from Task 1; `bump.json` shape from Task 2 (`changes: [{name}]`).
- Produces:
  - `interface ImpactPlan { commands: string[]; reason: string; broadenOrStop: boolean }`
  - `selectImpactTests(changedDeps: string[]): ImpactPlan`

Mapping rules (from spec S5): a root/shared build tool change -> full build + broad unit tests; a wrapper/runtime dep change -> core build + that wrapper's unit tests; unknown impact -> broaden (full build + components unit) and flag `broadenOrStop`.

- [ ] **Step 1: Write the failing test**

Create `scripts/dep-bump/select-impact-tests.test.ts`:

```ts
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { selectImpactTests } from './select-impact-tests.ts';

test('root build-tool change triggers full build and broad unit tests', () => {
  const plan = selectImpactTests(['typescript']);
  assert.ok(plan.commands.includes('npm run build'));
  assert.ok(plan.commands.includes('npm run test:unit:components'));
  assert.equal(plan.broadenOrStop, false);
});

test('react wrapper dep change triggers core build and react unit tests', () => {
  const plan = selectImpactTests(['react-dom']);
  assert.ok(plan.commands.includes('npm run build:core-dependencies'));
  assert.ok(plan.commands.includes('npm run test:unit:components-react'));
});

test('unknown dep broadens and flags broadenOrStop', () => {
  const plan = selectImpactTests(['some-unknown-lib']);
  assert.equal(plan.broadenOrStop, true);
  assert.ok(plan.commands.includes('npm run build'));
  assert.ok(plan.commands.includes('npm run test:unit:components'));
});

test('empty change set runs a conservative core build and components unit', () => {
  const plan = selectImpactTests([]);
  assert.deepEqual(plan.commands, ['npm run build:core-dependencies', 'npm run test:unit:components']);
  assert.equal(plan.broadenOrStop, false);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --import tsx --test scripts/dep-bump/select-impact-tests.test.ts`
Expected: FAIL (cannot resolve `./select-impact-tests.ts`).

- [ ] **Step 3: Implement `select-impact-tests.ts`**

Create `scripts/dep-bump/select-impact-tests.ts`:

```ts
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { OUT_DIR, writeVerdict } from './lib/verdict.ts';

export interface ImpactPlan {
  commands: string[];
  reason: string;
  broadenOrStop: boolean;
}

const ROOT_BUILD_TOOLS = new Set([
  'typescript',
  'vite',
  'rollup',
  'vitest',
  'webpack',
  'esbuild',
  '@biomejs/biome',
]);

const WRAPPER_TESTS: Record<string, string> = {
  react: 'npm run test:unit:components-react',
  'react-dom': 'npm run test:unit:components-react',
  next: 'npm run test:unit:components-react',
  'react-router': 'npm run test:unit:components-react',
  'react-router-dom': 'npm run test:unit:components-react',
  vue: 'npm run test:unit:components-vue',
};

export function selectImpactTests(changedDeps: string[]): ImpactPlan {
  if (changedDeps.length === 0) {
    return {
      commands: ['npm run build:core-dependencies', 'npm run test:unit:components'],
      reason: 'No third-party changes classified; running a conservative core build and components unit tests.',
      broadenOrStop: false,
    };
  }

  const commands = new Set<string>();
  const reasons: string[] = [];
  let broadenOrStop = false;

  for (const dep of changedDeps) {
    if (ROOT_BUILD_TOOLS.has(dep)) {
      commands.add('npm run build');
      commands.add('npm run test:unit:components');
      reasons.push(`${dep} is a root build tool -> full build + broad unit`);
    } else if (WRAPPER_TESTS[dep]) {
      commands.add('npm run build:core-dependencies');
      commands.add(WRAPPER_TESTS[dep]);
      reasons.push(`${dep} is a wrapper runtime dep -> core build + wrapper unit`);
    } else {
      commands.add('npm run build');
      commands.add('npm run test:unit:components');
      broadenOrStop = true;
      reasons.push(`${dep} impact unknown -> broaden (full build + components unit)`);
    }
  }

  return { commands: [...commands], reason: reasons.join('; '), broadenOrStop };
}

interface BumpVerdict {
  changes?: { name: string }[];
}

if (import.meta.url === `file://${process.argv[1]}`) {
  let changed: string[] = [];
  try {
    const bump = JSON.parse(readFileSync(resolve(OUT_DIR, 'bump.json'), 'utf8')) as BumpVerdict;
    changed = (bump.changes ?? []).map((change) => change.name);
  } catch {
    changed = [];
  }
  const plan = selectImpactTests(changed);
  writeVerdict('impact.json', { schemaVersion: 1, ...plan });
  process.stdout.write(`${JSON.stringify(plan, null, 2)}\n`);
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `node --import tsx --test scripts/dep-bump/select-impact-tests.test.ts`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add scripts/dep-bump/select-impact-tests.ts scripts/dep-bump/select-impact-tests.test.ts
git commit -m "feat(dep-bump): add S5 impact-based test selection"
```

---

### Task 5: `report` — S6 terminal-verdict aggregator

**Files:**
- Create: `scripts/dep-bump/report.ts`
- Create: `scripts/dep-bump/report.test.ts`

**Interfaces:**
- Consumes: `writeVerdict` + `OUT_DIR` from Task 1; `update.json` shape from Task 2/8; `verify.json` shape from Task 6/9.
- Produces:
  - `interface UpdateVerdict { outcome: 'RESOLVED' | 'NO_CHANGES' | 'BLOCKED'; summary?: string; bumped?: unknown[]; conflicts?: unknown[]; overridesAdded?: unknown[]; holdbacks?: unknown[]; stopReason?: string | null }`
  - `interface VerifyVerdict { outcome: 'PASS' }`
  - `interface Report { schemaVersion: 1; verdict: 'SUCCESS' | 'NO_CHANGES' | 'BLOCKED'; summary: string; bumped: unknown[]; conflicts: unknown[]; overrides: unknown[]; holdbacks: unknown[]; stopReason: string | null }`
  - `buildReport(update: UpdateVerdict, verify: VerifyVerdict | null): Report`

- [ ] **Step 1: Write the failing test**

Create `scripts/dep-bump/report.test.ts`:

```ts
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { buildReport } from './report.ts';

test('RESOLVED update with passing verify is SUCCESS', () => {
  const report = buildReport({ outcome: 'RESOLVED', bumped: [{ name: 'react' }] }, { outcome: 'PASS' });
  assert.equal(report.verdict, 'SUCCESS');
  assert.deepEqual(report.bumped, [{ name: 'react' }]);
});

test('NO_CHANGES update is NO_CHANGES regardless of verify', () => {
  assert.equal(buildReport({ outcome: 'NO_CHANGES' }, null).verdict, 'NO_CHANGES');
});

test('BLOCKED update is BLOCKED and carries the stop reason', () => {
  const report = buildReport({ outcome: 'BLOCKED', stopReason: 'react@19 breaking major' }, null);
  assert.equal(report.verdict, 'BLOCKED');
  assert.equal(report.stopReason, 'react@19 breaking major');
});

test('RESOLVED update with missing verify is BLOCKED (unverified tree)', () => {
  assert.equal(buildReport({ outcome: 'RESOLVED' }, null).verdict, 'BLOCKED');
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --import tsx --test scripts/dep-bump/report.test.ts`
Expected: FAIL (cannot resolve `./report.ts`).

- [ ] **Step 3: Implement `report.ts`**

Create `scripts/dep-bump/report.ts`:

```ts
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { OUT_DIR, writeVerdict } from './lib/verdict.ts';

export interface UpdateVerdict {
  outcome: 'RESOLVED' | 'NO_CHANGES' | 'BLOCKED';
  summary?: string;
  bumped?: unknown[];
  conflicts?: unknown[];
  overridesAdded?: unknown[];
  holdbacks?: unknown[];
  stopReason?: string | null;
}
export interface VerifyVerdict {
  outcome: 'PASS';
}
export interface Report {
  schemaVersion: 1;
  verdict: 'SUCCESS' | 'NO_CHANGES' | 'BLOCKED';
  summary: string;
  bumped: unknown[];
  conflicts: unknown[];
  overrides: unknown[];
  holdbacks: unknown[];
  stopReason: string | null;
}

export function buildReport(update: UpdateVerdict, verify: VerifyVerdict | null): Report {
  const base = {
    schemaVersion: 1 as const,
    bumped: update.bumped ?? [],
    conflicts: update.conflicts ?? [],
    overrides: update.overridesAdded ?? [],
    holdbacks: update.holdbacks ?? [],
    stopReason: update.stopReason ?? null,
  };
  if (update.outcome === 'NO_CHANGES') {
    return { ...base, verdict: 'NO_CHANGES', summary: update.summary ?? 'Nothing to bump.' };
  }
  if (update.outcome === 'RESOLVED' && verify?.outcome === 'PASS') {
    return { ...base, verdict: 'SUCCESS', summary: update.summary ?? 'Dependencies bumped and verified.' };
  }
  const summary =
    update.outcome === 'BLOCKED'
      ? update.summary ?? 'Blocked during update.'
      : 'Update resolved but verification did not pass; tree is unverified.';
  return { ...base, verdict: 'BLOCKED', summary };
}

function readVerdict<T>(file: string): T | null {
  try {
    return JSON.parse(readFileSync(resolve(OUT_DIR, file), 'utf8')) as T;
  } catch {
    return null;
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const update = readVerdict<UpdateVerdict>('update.json');
  if (!update) {
    process.stderr.write('Missing update.json; cannot build report\n');
    process.exit(2);
  }
  const verify = readVerdict<VerifyVerdict>('verify.json');
  const report = buildReport(update, verify);
  writeVerdict('dep-bump-report.json', report);
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `node --import tsx --test scripts/dep-bump/report.test.ts`
Expected: PASS (4 tests).

- [ ] **Step 5: Run the whole dep-bump suite**

Run: `npm run test:dep-bump`
Expected: PASS (all `node:test` files, ~14 tests).

- [ ] **Step 6: Commit**

```bash
git add scripts/dep-bump/report.ts scripts/dep-bump/report.test.ts
git commit -m "feat(dep-bump): add S6 terminal-verdict aggregator"
```

---

### Task 6: S1 `preflight.sh` orchestrator

**Files:**
- Create: `scripts/dep-bump/preflight.sh`

**Interfaces:**
- Consumes: nothing from earlier tasks (pure shell).
- Produces: `.turbo-spec/out/preflight.json`, `.turbo-spec/out/audit-baseline.json`, `.turbo-spec/out/ls-baseline.json`. Exit 0 = clean/reproducible; exit >= 2 = escalate (dirty tree, non-reproducible lockfile, or repeated network/ci failure).

- [ ] **Step 1: Write `preflight.sh`**

Create `scripts/dep-bump/preflight.sh`:

```bash
#!/usr/bin/env bash
# S1 Preflight (mechanical). Assert a clean, reproducible tree and snapshot baselines.
# Exit 0 -> CONTINUE. Exit >=2 -> escalate (terminal BLOCKED at preflight).
set -uo pipefail

OUT=".turbo-spec/out"
mkdir -p "$OUT"

if [ -n "$(git status --porcelain)" ]; then
  echo "[preflight] worktree is not clean; refusing to start" >&2
  exit 2
fi

if ! npm ci; then
  echo "[preflight] npm ci failed; retrying once for transient/network reasons" >&2
  sleep 5
  if ! npm ci; then
    echo "[preflight] npm ci failed twice; stopping" >&2
    exit 2
  fi
fi

if ! git diff --quiet; then
  echo "[preflight] npm ci mutated tracked files; lockfile is not reproducible" >&2
  exit 2
fi

npm audit --json > "$OUT/audit-baseline.json" || true
npm ls --all --json > "$OUT/ls-baseline.json" 2>/dev/null || true

printf '{\n  "schemaVersion": 1,\n  "outcome": "CONTINUE"\n}\n' > "$OUT/preflight.json"
echo "[preflight] clean, reproducible, baselines captured"
exit 0
```

- [ ] **Step 2: Make it executable**

Run: `chmod +x scripts/dep-bump/preflight.sh`

- [ ] **Step 3: Smoke test against the real repo**

Run: `bash scripts/dep-bump/preflight.sh; echo "exit=$?"`
Expected: on a clean checkout, ends with `[preflight] clean, reproducible, baselines captured` and `exit=0`, and `.turbo-spec/out/preflight.json` / `audit-baseline.json` / `ls-baseline.json` exist. (Note: `npm ci` reinstalls `node_modules`; allow several minutes.)

- [ ] **Step 4: Verify the baselines are non-empty and gitignored**

Run: `git status --porcelain .turbo-spec/out && wc -c .turbo-spec/out/audit-baseline.json`
Expected: no `.turbo-spec/out` entries in `git status` (gitignored), and a non-zero byte count for the audit baseline.

- [ ] **Step 5: Commit**

```bash
git add scripts/dep-bump/preflight.sh
git commit -m "feat(dep-bump): add S1 preflight orchestrator"
```

---

### Task 7: S2/S3 `bump.sh` + `install-check.sh` (agent-invoked)

**Files:**
- Create: `scripts/dep-bump/bump.sh`
- Create: `scripts/dep-bump/install-check.sh`

**Interfaces:**
- Consumes: `classify-bump.ts` CLI from Task 2.
- Produces: `bump.sh` runs the held-back-aware update then classification (writes `bump.json`); `install-check.sh` runs `npm install`, writing `.turbo-spec/out/install.log` and printing/exiting `CLEAN` (0), `ERESOLVE` (3), or `INSTALL_FAILED` (2). These are invoked by the `update` agent, which reads their output.

- [ ] **Step 1: Write `bump.sh`**

Create `scripts/dep-bump/bump.sh`:

```bash
#!/usr/bin/env bash
# S2 Bump. Run the repository's held-back-aware update, then classify the diff.
# Writes .turbo-spec/out/bump.json. Exit 0 unless the update command itself failed.
set -uo pipefail

if ! npm run npm:update:non-interactive; then
  echo "[bump] npm:update:non-interactive failed" >&2
  exit 2
fi

node --import tsx scripts/dep-bump/classify-bump.ts
echo "[bump] classification written to .turbo-spec/out/bump.json"
```

- [ ] **Step 2: Write `install-check.sh`**

Create `scripts/dep-bump/install-check.sh`:

```bash
#!/usr/bin/env bash
# S3 Install & triage. Run npm install and classify the outcome for the agent.
# Exit 0 = clean; 3 = ERESOLVE (agent must resolve); 2 = other install failure.
set -uo pipefail

OUT=".turbo-spec/out"
mkdir -p "$OUT"
LOG="$OUT/install.log"

if npm install > "$LOG" 2>&1; then
  echo "CLEAN"
  exit 0
fi

if grep -q "ERESOLVE" "$LOG"; then
  echo "ERESOLVE"
  exit 3
fi

echo "INSTALL_FAILED"
exit 2
```

- [ ] **Step 3: Make both executable**

Run: `chmod +x scripts/dep-bump/bump.sh scripts/dep-bump/install-check.sh`

- [ ] **Step 4: Smoke test `install-check.sh` on the current clean tree**

Run: `bash scripts/dep-bump/install-check.sh; echo "exit=$?"`
Expected: prints `CLEAN` and `exit=0` on a tree whose lockfile already resolves. (`bump.sh` is exercised end-to-end only in the full dry/live run since it mutates manifests; do not run it standalone here.)

- [ ] **Step 5: Commit**

```bash
git add scripts/dep-bump/bump.sh scripts/dep-bump/install-check.sh
git commit -m "feat(dep-bump): add S2 bump and S3 install-check scripts"
```

---

### Task 8: S5 `verify-checks.sh` + `run-impact.sh` + `finalize-verify.ts`

**Files:**
- Create: `scripts/dep-bump/verify-checks.sh`
- Create: `scripts/dep-bump/run-impact.sh`
- Create: `scripts/dep-bump/finalize-verify.ts`

**Interfaces:**
- Consumes: `audit-compare.ts`, `select-impact-tests.ts` CLIs (Tasks 3-4), `impact.json`, `audit-compare.json`; `writeVerdict` from Task 1.
- Produces:
  - `verify-checks.sh` -> runs `npm ci`, `npm ls --all`, `npm run npm:lint` (tree gate body); exit 1 on a real check failure (loop_back to update), exit >= 2 on environment error.
  - `run-impact.sh` -> reads `impact.json` and runs each command in order; exit 1 on a failing command.
  - `finalize-verify.ts` -> assembles `.turbo-spec/out/verify.json` with `outcome: "PASS"` from the intermediate out files (only reached when all prior checks passed).

- [ ] **Step 1: Write `verify-checks.sh`**

Create `scripts/dep-bump/verify-checks.sh`:

```bash
#!/usr/bin/env bash
# S5 tree checks. npm ci (reproducible), npm ls --all (no invalid peer edges),
# npm run npm:lint (syncpack). Exit 1 -> real failure (loop_back to update);
# exit >=2 -> environment error (escalate).
set -uo pipefail

if ! npm ci; then
  echo "[verify] npm ci failed from the new lockfile" >&2
  exit 1
fi

if ! npm ls --all > .turbo-spec/out/ls-current.txt 2>&1; then
  echo "[verify] npm ls --all reported unmet/invalid peer edges" >&2
  cat .turbo-spec/out/ls-current.txt >&2
  exit 1
fi

if ! npm run npm:lint; then
  echo "[verify] syncpack lint failed" >&2
  exit 1
fi

echo "[verify] tree checks passed"
exit 0
```

- [ ] **Step 2: Write `run-impact.sh`**

Create `scripts/dep-bump/run-impact.sh`:

```bash
#!/usr/bin/env bash
# S5 impact tests. Select impact commands from bump.json, then run them in order.
# Exit 1 -> a test/build command failed (escalate at the gate).
set -uo pipefail

node --import tsx scripts/dep-bump/select-impact-tests.ts

mapfile -t COMMANDS < <(node -e '
  const fs = require("node:fs");
  const plan = JSON.parse(fs.readFileSync(".turbo-spec/out/impact.json", "utf8"));
  for (const cmd of plan.commands ?? []) console.log(cmd);
')

for cmd in "${COMMANDS[@]}"; do
  echo "[verify] running impact command: $cmd"
  if ! eval "$cmd"; then
    echo "[verify] impact command failed: $cmd" >&2
    exit 1
  fi
done

echo "[verify] all impact commands passed"
exit 0
```

- [ ] **Step 3: Write `finalize-verify.ts`**

Create `scripts/dep-bump/finalize-verify.ts`:

```ts
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { OUT_DIR, writeVerdict } from './lib/verdict.ts';

function read<T>(file: string, fallback: T): T {
  try {
    return JSON.parse(readFileSync(resolve(OUT_DIR, file), 'utf8')) as T;
  } catch {
    return fallback;
  }
}

const audit = read<{ introduced?: string[] }>('audit-compare.json', { introduced: [] });
const impact = read<{ commands?: string[] }>('impact.json', { commands: [] });

writeVerdict('verify.json', {
  schemaVersion: 1,
  outcome: 'PASS',
  checks: { npmCi: true, npmLs: true, npmLint: true, audit: true, impactTests: true },
  newAdvisories: audit.introduced ?? [],
  impactCommands: impact.commands ?? [],
});

process.stdout.write('[verify] verify.json written (PASS)\n');
```

- [ ] **Step 4: Make the shell scripts executable**

Run: `chmod +x scripts/dep-bump/verify-checks.sh scripts/dep-bump/run-impact.sh`

- [ ] **Step 5: Smoke test the finalize step in isolation**

Run: `node --import tsx scripts/dep-bump/finalize-verify.ts && cat .turbo-spec/out/verify.json`
Expected: `verify.json` exists with `"outcome": "PASS"` and `newAdvisories`/`impactCommands` arrays (empty when no intermediates present).

- [ ] **Step 6: Commit**

```bash
git add scripts/dep-bump/verify-checks.sh scripts/dep-bump/run-impact.sh scripts/dep-bump/finalize-verify.ts
git commit -m "feat(dep-bump): add S5 verify tree checks, impact runner, and verdict finalizer"
```

---

### Task 9: Outcome-contract JSON schemas

**Files:**
- Create: `.turbo-spec/schemas/dep-bump-update.schema.json`
- Create: `.turbo-spec/schemas/dep-bump-verify.schema.json`
- Create: `.turbo-spec/schemas/dep-bump-report.schema.json`

**Interfaces:**
- Consumes: the verdict JSON shapes produced by Tasks 2/5/8 and the `update` agent (Task 10).
- Produces: three JSON Schema (draft 2020-12) files referenced by path from the blueprint's `outcome_contract` gates.

- [ ] **Step 1: Write the update schema**

Create `.turbo-spec/schemas/dep-bump-update.schema.json`:

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Dependency-bump update outcome",
  "description": "Declaration authored by the update agent after the bump/install/resolve stage.",
  "type": "object",
  "additionalProperties": true,
  "required": ["schemaVersion", "outcome", "summary"],
  "properties": {
    "schemaVersion": { "const": 1 },
    "outcome": {
      "type": "string",
      "enum": ["RESOLVED", "NO_CHANGES", "BLOCKED"],
      "description": "RESOLVED = tree installs clean; NO_CHANGES = nothing to bump; BLOCKED = could not safely resolve."
    },
    "summary": { "type": "string", "minLength": 1 },
    "bumped": { "type": "array", "description": "old->new dependency transitions, grouped." },
    "conflicts": { "type": "array", "description": "Each ERESOLVE conflict and the chosen remedy." },
    "overridesAdded": { "type": "array", "description": "Scoped root overrides added, if any." },
    "holdbacks": { "type": "array", "description": "Dependencies held back via targeted rollback." },
    "filesChanged": { "type": "array", "description": "Tracked files changed; empty when the tree was restored." },
    "stopReason": {
      "type": ["string", "null"],
      "description": "Non-null when BLOCKED: what could not be resolved and what a follow-up needs."
    }
  }
}
```

- [ ] **Step 2: Write the verify schema**

Create `.turbo-spec/schemas/dep-bump-verify.schema.json`:

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Dependency-bump verify outcome",
  "description": "Deterministic verification result written by finalize-verify.ts.",
  "type": "object",
  "additionalProperties": true,
  "required": ["schemaVersion", "outcome"],
  "properties": {
    "schemaVersion": { "const": 1 },
    "outcome": { "type": "string", "enum": ["PASS"] },
    "checks": { "type": "object", "description": "Per-check booleans (npmCi, npmLs, npmLint, audit, impactTests)." },
    "newAdvisories": { "type": "array", "description": "Advisory identities present now but not in the S1 baseline." },
    "impactCommands": { "type": "array", "description": "Impact-based build/test commands that were run." }
  }
}
```

- [ ] **Step 3: Write the report schema**

Create `.turbo-spec/schemas/dep-bump-report.schema.json`:

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Dependency-bump terminal report",
  "description": "Single terminal verdict aggregated by report.ts.",
  "type": "object",
  "additionalProperties": true,
  "required": ["schemaVersion", "verdict", "summary"],
  "properties": {
    "schemaVersion": { "const": 1 },
    "verdict": { "type": "string", "enum": ["SUCCESS", "NO_CHANGES", "BLOCKED"] },
    "summary": { "type": "string", "minLength": 1 },
    "bumped": { "type": "array" },
    "conflicts": { "type": "array" },
    "overrides": { "type": "array" },
    "holdbacks": { "type": "array" },
    "stopReason": { "type": ["string", "null"] }
  }
}
```

- [ ] **Step 4: Validate the schemas parse as JSON**

Run: `for f in .turbo-spec/schemas/*.json; do node -e "JSON.parse(require('fs').readFileSync('$f','utf8')); console.log('ok $f')"; done`
Expected: `ok` line per schema file.

- [ ] **Step 5: Commit**

```bash
git add .turbo-spec/schemas/
git commit -m "feat(dep-bump): add outcome-contract schemas for update/verify/report"
```

---

### Task 10: `update` agent system prompt

**Files:**
- Create: `.turbo-spec/system_prompts/dep_update.md`

**Interfaces:**
- Consumes: `bump.sh`, `install-check.sh` (Task 7); the `resolving-npm-eresolve` skill (existing); the update schema (Task 9).
- Produces: the system prompt that drives the single agentic stage. It owns run-control (fingerprints, 6-iteration cap, ledger at `.turbo-spec/out/resolve-ledger.json`) and the `update.json` authoring contract. Run-control lives here, NOT in the skill.

- [ ] **Step 1: Write `dep_update.md`**

Create `.turbo-spec/system_prompts/dep_update.md`:

```markdown
# Dependency-Bump Update Agent

You run the single agentic stage of the dependency-bump workflow. Everything mechanical is a script; you reason ONLY when `npm install` reports ERESOLVE. This task supersedes `docs/runbooks/dependency-updates-agent.md` — do only what is written here.

## Hard rules (never violate)

- Never use `--force`, `--legacy-peer-deps`, or any `npm audit fix`.
- Activate the `resolving-npm-eresolve` skill BEFORE editing any peer range or override. It is the decision brain for every remedy.
- After editing a wrapper SOURCE peer range (`packages/components-<fw>/projects/<fw>-wrapper/package.json`), run the exact `npm run preinstall:components-<fw>` and prove source == generated dist with `git diff --no-index` BEFORE the next install. Never edit dist directly.
- After any `overrides` change: delete `package-lock.json` AND all `node_modules`, reinstall, inspect lockfile churn (preserve the platform-specific `@next/swc-*` optional entries), then run `npm ci`.
- Never re-run the unrestricted bump after holding a dependency back — do a TARGETED syncpack rollback and keep a run-local exclusion for that dep.

## Procedure

1. Run `bash scripts/dep-bump/bump.sh`. Read `.turbo-spec/out/bump.json`.
   - If `outcome == "NO_CHANGES"`: restore the entry tree (`git checkout -- .` on tracked manifests only), author `update.json` with `outcome: "NO_CHANGES"` and empty `filesChanged`, and stop.
   - If `heldViolations` is non-empty: a held-back dependency changed. Do a targeted syncpack rollback of exactly those names, re-run install-check, and record the holdback. Do NOT re-run the unrestricted bump.
   - Otherwise enumerate every old->new transition and flag every MAJOR.
2. Run `bash scripts/dep-bump/install-check.sh`.
   - Exit 0 (`CLEAN`): author `update.json` with `outcome: "RESOLVED"`, the bumped list, and the changed files. Stop.
   - Exit 3 (`ERESOLVE`): read `.turbo-spec/out/install.log` and go to Resolve.
   - Exit 2 (`INSTALL_FAILED`): retry once for transient reasons; if it persists, author `outcome: "BLOCKED"` with a `stopReason` and restore the tree.

## Resolve (ERESOLVE only)

Activate the `resolving-npm-eresolve` skill and follow it per conflict: gather evidence, establish compatibility independently, then apply the remedy the skill dictates (widen our stale wrapper SOURCE range and materialize; add a SCOPED root override with the clean lock+node_modules regeneration; or hold back a breaking major via targeted rollback). Re-run `bash scripts/dep-bump/install-check.sh` after each remedy.

### Run-control (yours, not the skill's)

- Maintain a ledger at `.turbo-spec/out/resolve-ledger.json`: append one entry per remedy attempt with the conflict fingerprint `{declarer, peer, demandedRange, providerVersion}`, the remedy, and the resulting install outcome. Read it back on every iteration so the cap survives loop-backs.
- STOP if the same fingerprint survives one evidence-backed remedy, or after a hard cap of 6 total resolve iterations. On stop, author `outcome: "BLOCKED"` with a `stopReason` describing the conflict and what a follow-up migration needs, and restore the entry tree.

## Authoring `update.json` (required, every path)

Write `.turbo-spec/out/update.json` conforming to `.turbo-spec/schemas/dep-bump-update.schema.json`:
`{ schemaVersion: 1, outcome, summary, bumped, conflicts, overridesAdded, holdbacks, filesChanged, stopReason }`.

- `outcome`: `RESOLVED` only when `npm install` resolved clean; `NO_CHANGES` when nothing was bumped; `BLOCKED` when a breaking major or held-back-only advisory could not be safely resolved.
- If you restored the tree (NO_CHANGES or BLOCKED), `filesChanged` MUST be empty — do not claim edits you rolled back.
- A retained breaking major with unverified behavior is BLOCKED, never RESOLVED.
```

- [ ] **Step 2: Verify the prompt references only real scripts and the existing skill**

Run: `grep -oE 'scripts/dep-bump/[a-z-]+\.sh' .turbo-spec/system_prompts/dep_update.md | sort -u | while read p; do test -f "$p" && echo "ok $p" || echo "MISSING $p"; done; test -f .github/skills/resolving-npm-eresolve/SKILL.md && echo "ok skill reachable"`
Expected: `ok` for `bump.sh`, `install-check.sh`, and the skill; no `MISSING`.

- [ ] **Step 3: Commit**

```bash
git add .turbo-spec/system_prompts/dep_update.md
git commit -m "feat(dep-bump): add update-agent system prompt with run-control ledger"
```

---

### Task 11: The `dep-bump.yml` blueprint

**Files:**
- Create: `.turbo-spec/workflows/dep-bump.yml`

**Interfaces:**
- Consumes: every artifact from Tasks 1-10 (scripts, prompt, schemas, skill).
- Produces: the 4-stage blueprint validated by `workflow-skeleton validate` and planned by `run --dry-run`.

- [ ] **Step 1: Write `dep-bump.yml`**

Create `.turbo-spec/workflows/dep-bump.yml`:

```yaml
name: dep-bump
version: "1.0"
description: >-
  Bump third-party npm dependencies in the Porsche Design System monorepo and
  resolve any resulting ERESOLVE peer conflicts with an evidenced remedy.
  Deterministic by default; only the update stage is agentic.

# The full gh-aw + Porsche ecosystem domain lists are always allowed (registries
# included). Add EXTRA literal release-note evidence hosts here if the sandbox
# log prints "[sandbox] egress denied" for a host the resolver needs.
network:
  allowed: []

stages:
  # S1 Preflight — agentless. Clean, reproducible tree + baselines. Any failure
  # escalates (terminal BLOCKED at preflight); there is no agent to fix it.
  - name: preflight
    orchestrator: testing
    quality_gates:
      - evaluator: script_gate
        on_fail: escalate
        max_retries: 1
        config:
          gate_name: preflight
          failure_verdict: escalate
          environment_verdict: escalate
          success_reason: "Clean, reproducible tree; baselines captured"
          steps:
            - name: preflight
              command: ["bash", "scripts/dep-bump/preflight.sh"]

  # S2+S3+S4 — the ONE agentic stage. Runs deterministic bump/install scripts and
  # reasons only on ERESOLVE. `skills` is omitted so project skills (including
  # resolving-npm-eresolve) auto-advertise; the agent activates it on demand.
  - name: update
    orchestrator: implementation
    depends_on: [preflight]
    agents:
      - type: implementer
        system_prompt: .turbo-spec/system_prompts/dep_update.md
        tools: [github, file, shell]
        model_kwargs:
          model_id: claude-opus-4.8
    outputs:
      result: .turbo-spec/out/update.json
    quality_gates:
      - evaluator: outcome_contract
        on_fail: loop_back
        max_retries: 2
        config:
          outcome_path: .turbo-spec/out/update.json
          schema: .turbo-spec/schemas/dep-bump-update.schema.json

  # S5 Verify — agentless. Only runs when the update resolved a real change.
  # Gate 1 (tree) loops back to `update` on a real failure (invalid edge / lock
  # mismatch -> S4). Gates 2-3 escalate (audit regression / build break -> triage).
  - name: verify
    orchestrator: testing
    depends_on: [update]
    condition: "update.result.outcome == 'RESOLVED'"
    outputs:
      result: .turbo-spec/out/verify.json
    quality_gates:
      - evaluator: script_gate
        on_fail: loop_back
        max_retries: 2
        loop_back:
          target_stage: update
        config:
          gate_name: verify-tree
          failure_verdict: loop_back
          environment_verdict: escalate
          success_reason: "Reproducible tree with no invalid peer edges; syncpack clean"
          steps:
            - name: tree-checks
              command: ["bash", "scripts/dep-bump/verify-checks.sh"]
      - evaluator: script_gate
        on_fail: escalate
        max_retries: 1
        config:
          gate_name: verify-audit
          failure_verdict: escalate
          environment_verdict: escalate
          success_reason: "No new advisory identities vs the S1 baseline"
          steps:
            - name: snapshot-current-audit
              command: ["sh", "-c", "npm audit --json > .turbo-spec/out/audit-current.json || true"]
            - name: audit-compare
              command: ["node", "--import", "tsx", "scripts/dep-bump/audit-compare.ts"]
      - evaluator: script_gate
        on_fail: escalate
        max_retries: 1
        config:
          gate_name: verify-tests
          failure_verdict: escalate
          environment_verdict: escalate
          success_reason: "Impact-based build and unit tests passed"
          steps:
            - name: impact-tests
              command: ["bash", "scripts/dep-bump/run-impact.sh"]
            - name: finalize-verify
              command: ["node", "--import", "tsx", "scripts/dep-bump/finalize-verify.ts"]
      - evaluator: outcome_contract
        on_fail: loop_back
        max_retries: 1
        config:
          outcome_path: .turbo-spec/out/verify.json
          schema: .turbo-spec/schemas/dep-bump-verify.schema.json

  # S6 Report — agentless. Runs even when verify is skipped (NO_CHANGES / BLOCKED),
  # so every terminated run emits exactly one verdict.
  - name: report
    orchestrator: testing
    depends_on: [update, verify]
    quality_gates:
      - evaluator: script_gate
        on_fail: escalate
        max_retries: 1
        config:
          gate_name: report
          failure_verdict: escalate
          environment_verdict: escalate
          success_reason: "Terminal verdict written"
          steps:
            - name: build-report
              command: ["node", "--import", "tsx", "scripts/dep-bump/report.ts"]
      - evaluator: outcome_contract
        on_fail: escalate
        max_retries: 1
        config:
          outcome_path: .turbo-spec/out/dep-bump-report.json
          schema: .turbo-spec/schemas/dep-bump-report.schema.json

model_provider:
  primary: copilot
  config:
    model_id: claude-sonnet-5

settings:
  max_total_retries: 8
  timeout_per_stage: "45m"
  human_escalation: true
```

- [ ] **Step 2: Validate the blueprint with the turbo-spec engine**

Run (working dir must be this repo so path-based schema/prompt refs resolve against the repo root):

```bash
uv run --project /Users/FNN57BH/Developer/turbo-spec workflow-skeleton validate .turbo-spec/workflows/dep-bump.yml
```

Expected: `✓ Valid workflow: dep-bump`, `Stages: 4`, and a "Resolved references" list that includes the `.turbo-spec/system_prompts/dep_update.md` prompt and the three schema paths with no `✗ ... did not resolve` lines.

- [ ] **Step 3: Fix any unresolved references**

If validate prints a `✗` for a schema/prompt path, correct the path in the blueprint (paths resolve relative to the repo root / current working directory) and re-run Step 2 until it is clean.

- [ ] **Step 4: Dry-run to confirm the plan builds without executing agents**

Run:

```bash
uv run --project /Users/FNN57BH/Developer/turbo-spec workflow-skeleton run .turbo-spec/workflows/dep-bump.yml --dry-run --repo porsche-design-system/porsche-design-system
```

Expected: the run validates and prints a stage plan (preflight -> update -> verify -> report) and exits without spawning agents or mutating the tree.

- [ ] **Step 5: Commit**

```bash
git add .turbo-spec/workflows/dep-bump.yml
git commit -m "feat(dep-bump): add 4-stage dependency-bump blueprint"
```

---

### Task 12: Documentation close-out

**Files:**
- Modify: `docs/runbooks/dependency-updates-agent.md` (add a superseded-by note near the top)
- Modify: `docs/superpowers/specs/2026-07-13-dep-bump-workflow-design.md` (resolve the "Open items" section)

**Interfaces:**
- Consumes: the finished artifacts from Tasks 1-11.
- Produces: cross-references so a human running the recurring task finds the workflow, and the design doc's open items are closed.

- [ ] **Step 1: Add the superseded-by note to the runbook**

Insert immediately after the runbook's top-level title in `docs/runbooks/dependency-updates-agent.md`:

```markdown
> **Superseded for agent runs:** the recurring npm dependency bump is now driven by
> the turbo-spec workflow at `.turbo-spec/workflows/dep-bump.yml` (scripts under
> `scripts/dep-bump/`, ERESOLVE remedies via the `resolving-npm-eresolve` skill).
> This runbook remains the human reference; agents follow the workflow's `dep_update`
> system prompt, which explicitly supersedes the manual steps below.
```

- [ ] **Step 2: Close the design doc's open items**

In `docs/superpowers/specs/2026-07-13-dep-bump-workflow-design.md`, update the "Open items" section to record the resolved decisions: (a) consumer schemas are path-referenced from `.turbo-spec/schemas/`; (b) `network.allowed` starts empty and grows only from observed `[sandbox] egress denied` hosts; (c) the trigger is CLI `run` now, weekly schedule later; (d) the `resolving-npm-eresolve` skill is reached via the `.github/skills` -> `../skills` symlink, so no relocation is needed.

- [ ] **Step 3: Verify the runbook note renders and links resolve**

Run: `grep -n "turbo-spec/workflows/dep-bump.yml" docs/runbooks/dependency-updates-agent.md && test -f .turbo-spec/workflows/dep-bump.yml && echo ok`
Expected: the grep matches and prints `ok`.

- [ ] **Step 4: Commit**

```bash
git add docs/runbooks/dependency-updates-agent.md docs/superpowers/specs/2026-07-13-dep-bump-workflow-design.md
git commit -m "docs(dep-bump): cross-reference workflow from runbook and close design open items"
```

---

## Self-Review

**1. Spec coverage (S1-S6 + hard rules):**
- S1 Preflight -> Task 6 (`preflight.sh`): clean tree, `npm ci` reproducibility, baseline snapshots, retry-once, escalate-on-failure. Covered.
- S2 Bump + classify -> Task 7 (`bump.sh`) + Task 2 (`classify-bump.ts`): held-back unchanged assertion via git diff, old->new enumeration, MAJOR flags, NO_CHANGES. Covered.
- S3 Install & triage -> Task 7 (`install-check.sh`): clean vs ERESOLVE vs failure, log capture. Covered.
- S4 Resolve -> Task 10 (`dep_update.md`) + existing skill: evidence-first remedies, source==dist proof, clean lock regen, targeted rollback, fingerprint + 6-iteration cap ledger. Covered.
- S5 Verify (type-routed) -> Task 8 (`verify-checks.sh`, `run-impact.sh`, `finalize-verify.ts`) + Task 3 (`audit-compare.ts`) + Task 4 (`select-impact-tests.ts`) + Task 11 (three type-routed gates). Covered.
- S6 Terminal report (exactly one verdict) -> Task 5 (`report.ts`) + Task 11 (report stage always runs). Covered.
- Hard rules -> Global Constraints + Task 10 prompt (verbatim). Covered.

**2. Placeholder scan:** No "TBD"/"handle edge cases"/"similar to Task N". Every code step contains complete, runnable content. Shell exit-code contracts and gate `failure_verdict`/`environment_verdict` values are explicit. The `audit-current.json` snapshot is written by the first `verify-audit` gate step (Task 11), before `audit-compare.ts` reads it.

**3. Type consistency:** `DepMap`, `BumpChange`, `BumpClassification`, `AuditReport`, `ImpactPlan`, `UpdateVerdict`, `VerifyVerdict`, `Report` are each defined once and imported where used. `writeVerdict`/`OUT_DIR` (Task 1) are consumed unchanged by Tasks 2-5, 8. Verdict file names (`bump.json`, `update.json`, `verify.json`, `dep-bump-report.json`, `impact.json`, `audit-compare.json`, `audit-baseline.json`, `audit-current.json`) are consistent across scripts, schemas, blueprint, and prompt. `outcome`/`verdict` enum values match between schemas, `report.ts`, and the blueprint condition (`update.result.outcome == 'RESOLVED'`).
