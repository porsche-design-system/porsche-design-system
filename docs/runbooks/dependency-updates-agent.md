# Dependency Updates — AI Cloud Agent Runbook

> **Audience**: An autonomous AI cloud agent (e.g. a scheduled Copilot coding agent) running the **recurring weekly npm
> dependency update** for this monorepo.
>
> This is a deterministic, step-by-step runbook. It restates the relevant parts of
> [`docs/dependencies.md`](../dependencies.md) as an executable workflow. When in doubt about _why_ a rule exists, read the
> linked sections there — but **follow this runbook's steps and order exactly**.

## Trigger & cadence

- **When**: Once per week (or when explicitly dispatched).
- **Goal**: Bump non-held-back npm dependencies to their newest compatible versions, keep the lockfile consistent, and
  open a **single reviewable pull request** with passing builds/tests.
- **Scope**: npm dependencies only. GitHub Actions are handled separately by Dependabot — do not touch them here.

### How this task is dispatched

This runbook is executed by the **Copilot coding agent**, scheduled via
[`.github/workflows/weekly-dependency-agent.yml`](../../.github/workflows/weekly-dependency-agent.yml). That workflow runs
weekly, checks `npm run npm:outdated`, and — only when updates exist — opens an issue assigned to `@copilot` linking back
to this file. The agent's environment is bootstrapped by
[`.github/workflows/copilot-setup-steps.yml`](../../.github/workflows/copilot-setup-steps.yml) (Node 24 + `npm ci`,
mirroring [`.github/actions/install`](../../.github/actions/install/action.yml)).

## Hard rules — never do these

| ❌ Never                                            | Why                                                                                          |
| --------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Run `npm audit fix` / `npm audit fix --force`       | Breaks the workspace hoisting contract and aborts with `ERESOLVE` (see `docs/dependencies.md`). |
| Use `--legacy-peer-deps` or `--force`               | We rely on **strict** peer resolution; conflicts must be fixed via `overrides`.              |
| Edit dependency versions in any `package.json` by hand | `syncpack` owns version ranges across all workspaces.                                      |
| Edit `package-lock.json` by hand                    | Regenerate it via `npm install` only.                                                        |
| Upgrade held-back dependencies (see below)          | These follow their own deliberate upgrade paths.                                             |
| Push directly to `main`                             | Always open a PR for human review.                                                           |

## Held-back dependencies (do NOT upgrade here)

These are intentionally excluded from this flow. They are ignored by `syncpack` via
[`.syncpackrc.json`](../../.syncpackrc.json) and by Dependabot via [`.github/dependabot.yml`](../../.github/dependabot.yml),
so the commands below already skip them. **Do not upgrade them manually in this task:**

- `@porsche-design-system/**` — internal workspace packages, versioned by the release process.
- `@angular/**`, `ng-packagr`, `zone.js` — upgrade only via `ng update` (separate task).
- `@playwright/test` — pinned to keep browser binaries in sync with committed VRT snapshots.
- `@stencil/core` — pinned because a `patch-package` patch targets the exact version.

If one of these is the _only_ remaining outdated package, **skip it** and note it in the PR description.

## Prerequisites

1. Work from the **repository root**.
2. Use **Node v24** and the npm version pinned in the root `package.json` `volta` field (use Volta if available).
3. Ensure a **clean working tree** (`git status` shows no changes) and the latest `main` is pulled.
4. Create a working branch, e.g. `chore/dependency-updates-<YYYY-MM-DD>`.

## Step-by-step workflow

### 1. Install the current baseline

```bash
npm install
```

### 2. Check what is outdated

```bash
npm run npm:outdated
```

This runs `syncpack update --check` and already excludes the held-back/internal packages.

### 3. Apply updates with syncpack

```bash
npm run npm:update
```

- `syncpack` writes consistent ranges into every workspace `package.json` in one go.
- **Group related upgrades** — do not bump everything blindly. If React types are updated, also check React itself; keep
  framework-related packages in lockstep.
- Do not select any held-back dependency even if it surfaces.

### 4. Refresh the lockfile and verify the install

```bash
npm install
```

### 5. Resolve peer-dependency conflicts the correct way

If `npm install` fails with `ERESOLVE` due to a third-party peer range conflicting with our pinned versions:

- Add a **pinned `overrides` entry** in the root `package.json` (follow the existing `madge > typescript` pattern and
  the per-major examples like `minimatch@9`).
- Then delete `package-lock.json` **and** `node_modules` and re-run `npm install` (a plain reinstall keeps stale
  transitive entries).
- Never work around it with `--legacy-peer-deps` / `--force`.

### 6. Keep version ranges consistent

```bash
npm run npm:lint
npm run npm:format
```

If either reports issues, fix them with `npm run npm:lint:fix` / `npm run npm:format:fix`, then re-run the check.

### 7. Regenerate the lockfile cleanly

To refresh transitive dependencies, delete `package-lock.json` and recreate it:

```bash
rm package-lock.json
npm install
```

Confirm all eight `@next/swc-*` optional dependencies are still recorded in `package-lock.json` (see
`docs/dependencies.md` → _Explicit `@next/swc-*` optional dependencies_).

### 8. Verify against CI-equivalent checks (do not finalize on failure)

CI runs automatically on the PR you open (`build` + `test` jobs in
[`.github/workflows/contribution.yml`](../../.github/workflows/contribution.yml)). A failing CI run will **not**
re-engage you automatically — so you must reproduce the relevant checks **now**, while you can still fix them, and only
open the PR once they pass.

Run, at minimum, the same gates CI enforces:

```bash
npm run lint          # Biome — CI's "Lint" job
npm run build         # full build in the required order — CI's build jobs
npm run test:unit:components
```

Then run the **additional suites relevant to the changed packages** (mirror what CI would exercise):

- A bumped wrapper dep → run that wrapper's unit tests (e.g. `npm run test:unit:components-react`).
- A build-tool bump (`vite`, `rollup`, `typescript`, `tailwindcss`, `webpack`) → prefer a **full** build + broad unit
  run, since these can break any package.
- Where feasible, run the relevant `test:e2e:*` / `test:a11y:*` suites for the affected area.

**If any check fails:**

1. Diagnose whether the failure is caused by the dependency bump.
2. Fix it within this task when the fix is in scope — e.g. adjust an `overrides` entry, pin a compatible version, or
   adapt source code to a non-breaking API change.
3. Re-run the checks until they pass.
4. **Do not open (or finalize) the PR while a reproduced check is still failing.** If the failure cannot be resolved
   here, follow the [Stop conditions](#stop-conditions-hand-back-to-a-human) instead of shipping a red PR.

> Note: some CI checks are **not** fully reproducible in your environment (e.g. VRT runs in Docker against committed
> snapshots, cross-browser e2e). Run what you can; for the rest, call them out explicitly in the PR description so the
> reviewer knows what still needs to pass on CI.

### 9. Review security advisories (report only)

```bash
npm run npm:audit
```

Summarize advisories in the PR. **Do not** run `npm audit fix`. For a genuinely fixable advisory, add a pinned
`overrides` entry (as in step 5) and regenerate the lockfile.

## Output contract (what the agent must deliver)

Open a **single pull request** from the working branch with:

- [ ] A title like `chore(deps): weekly npm dependency updates (<YYYY-MM-DD>)`.
- [ ] A description listing each upgraded package with old → new version, grouped logically.
- [ ] Any **held-back** packages that were intentionally skipped.
- [ ] Any new/changed `overrides` entries and the reason.
- [ ] The `npm run npm:audit` summary.
- [ ] Build/test results (commands run + pass/fail), confirming the CI-equivalent gates from step 8 (`lint`, `build`,
      relevant unit/e2e/a11y) passed locally — plus any checks left for CI (e.g. VRT) called out explicitly.
- [ ] Only these files changed: workspace `package.json` files, root `package.json` (ranges/overrides), and
      `package-lock.json`.

## Stop conditions (hand back to a human)

Stop and request review instead of forcing a change when:

- An `ERESOLVE` conflict cannot be resolved with a clean, scoped `overrides` entry.
- A dependency requires a **major** upgrade with breaking changes affecting source code.
- Builds or tests fail in a way not trivially caused by the version bump.
- An advisory only resolves by touching a held-back dependency.

## Reference

- [`docs/dependencies.md`](../dependencies.md) — full rationale, remediation policy, and held-back-dependency details.
- [`.syncpackrc.json`](../../.syncpackrc.json) — syncpack config and ignored update groups.
- [`.github/dependabot.yml`](../../.github/dependabot.yml) — Dependabot ignore list (keep in sync with the above).

