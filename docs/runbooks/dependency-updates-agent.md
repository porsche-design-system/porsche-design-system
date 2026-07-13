# Dependency Updates — AI Cloud Agent Runbook

> **Audience**: An autonomous AI cloud agent (e.g. a scheduled Copilot coding agent) running the **recurring weekly npm
> dependency update** for this monorepo.
>
> This is a deterministic, step-by-step runbook. It restates the relevant parts of
> [`docs/dependencies.md`](../dependencies.md) as an executable workflow. When in doubt about _why_ a rule exists, read
> the linked sections there — but **follow this runbook's steps and order exactly**.

## Trigger & cadence

- **When**: Once per week (or when explicitly dispatched).
- **Goal**: Bump non-held-back npm dependencies to their newest compatible versions, keep the lockfile consistent, and
  open a **single reviewable pull request** with passing builds/tests.
- **Scope**: npm dependencies only. GitHub Actions are handled separately by Dependabot — do not touch them here.

### How this task is dispatched

This runbook is executed by the **Copilot coding agent**, scheduled via
[`.github/workflows/weekly-dependency-agent.yml`](../../.github/workflows/weekly-dependency-agent.yml). That workflow
runs weekly, checks `npm run npm:outdated`, and — only when updates exist — opens an issue assigned to `@copilot`
linking back to this file. The agent's environment is bootstrapped by
[`.github/workflows/copilot-setup-steps.yml`](../../.github/workflows/copilot-setup-steps.yml) (Node 24 + `npm ci`,
mirroring [`.github/actions/install`](../../.github/actions/install/action.yml)).

## Hard rules — never do these

| ❌ Never                                                         | Why                                                                                                    |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Run `npm audit fix` / `npm audit fix --force`                    | Breaks the workspace hoisting contract and aborts with `ERESOLVE` (see `docs/dependencies.md`).        |
| Use `--legacy-peer-deps` or `--force`                            | We rely on **strict** peer resolution; diagnose each `ERESOLVE` with the `resolving-npm-eresolve` skill (overrides are one remedy, not the default — see step 6). |
| Edit dependency versions in any `package.json` by hand           | `syncpack` owns version ranges — including the Angular family (only its framework migrations are separate, step 3).  |
| Edit `package-lock.json` by hand                                 | Regenerate it via `npm install` only.                                                                  |
| Upgrade held-back deps by selecting them in `npm run npm:update` | Stencil/Playwright/internal stay pinned; Angular versions go through syncpack but apply migrations via step 3. |
| Push directly to `main`                                          | Always open a PR for human review.                                                                     |

## Held-back dependencies (special handling)

These are excluded from the `syncpack` flow — they are ignored by `syncpack` via
[`.syncpackrc.json`](../../.syncpackrc.json) and by Dependabot via
[`.github/dependabot.yml`](../../.github/dependabot.yml), so `npm run npm:update` already skips them. **Never bump them
by selecting them in `npm run npm:update`.** Handle them as noted:

- `@porsche-design-system/**` — internal workspace packages, versioned by the release process. **Never touch here.**
- `@angular/**`, `ng-packagr`, `zone.js` — **versions** go through syncpack (`npm run npm:update`) like everything else;
  only Angular's framework **migrations** are applied separately in
  [step 3](#3-apply-angular-framework-migrations-after-the-syncpack-version-bump).
- `typescript` — may move only **within** the range Angular supports (see step 3); otherwise keep it held back this
  round. `npm run npm:update:non-interactive` enforces this automatically.
- `@playwright/test` — held back from the weekly run; update deliberately via
  [Updating Playwright](#updating-playwright-npm-pin-docker-image-vrt) (npm pin + Docker image + VRT).
- `@stencil/core` — pinned because a `patch-package` patch targets the exact version. **Never touch here.**

If the only remaining outdated packages are the _never-touch_ ones above, **skip them** and note it in the PR
description.

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

### 3. Apply Angular framework migrations (after the syncpack version bump)

Angular splits into two concerns:

- **Versions** (`@angular/*`, `ng-packagr`, `zone.js`) are bumped by syncpack like everything else, in
  [step 4](#4-apply-updates-with-syncpack). Select the `@angular/*` family together so they move in lockstep.
- **Framework migrations** (code transforms) are applied here, by the
  [`ng-update.sh`](../../packages/components-angular/scripts/ng-update.sh) wrapper (`npm run ng:update`).

Only proceed for a **minor/patch** Angular update within the current major (or a major you have explicitly been asked to
do). For a major upgrade with framework migrations, prefer handing off — see
[Stop conditions](#stop-conditions-hand-back-to-a-human).

> `ng update` cannot be invoked directly here: dependencies are **hoisted** (no local `node_modules` in
> `packages/components-angular` → `Found 0 dependencies`) and the package depends on **unpublished** private workspace
> packages (registry `404`). The wrapper runs `ng update` in an isolated throwaway install of the public Angular tooling
> and (in `--migrate-only` mode) copies the migrated source back, leaving versions to syncpack.

```bash
cd packages/components-angular
npm run ng:update                                                     # list available updates/migrations (read-only)
# after the syncpack bump + `npm install` (step 4/5), apply migrations only:
npm run ng:update -- @angular/core @angular/cli --migrate-only --from=<old> --to=<new>
cd ../..
git diff packages/components-angular                                  # review migration changes
```

Reconcile TypeScript: Angular caps the supported version. The stable source is `peerDependencies.typescript` in
`@angular/compiler-cli`'s `package.json`; the same ceiling is compiled into the `MAX_TS_VERSION` constant, findable via
`grep -rn "MAX_TS_VERSION =" node_modules/@angular/compiler-cli/`. In step 4, do **not** let syncpack bump
`typescript` past that ceiling. The automated `npm run npm:update:non-interactive` enforces this for you (it holds
`typescript` back when the latest release would exceed the range); with the interactive `npm run npm:update`, keep
`typescript` held back this round yourself if a bump would exceed it.

If the migrations require non-trivial source changes, **stop** and hand off rather than forcing it into the weekly
dependency PR.

### 4. Apply updates with syncpack

```bash
npm run npm:update:non-interactive        # automated agent run: applies every available update at once
# or, to curate interactively:
npm run npm:update
```

- `npm run npm:update:non-interactive` is the automated path: it applies all available updates non-interactively,
  excludes the Angular ecosystem (`@angular/**`, `ng-packagr`, `zone.js`) and the internal `@porsche-design-system/**`
  packages, and holds `typescript` back automatically when the latest release would exceed Angular's supported range
  (see step 3). Forward flags after `--`, e.g. `npm run npm:update:non-interactive -- --dry-run`.
- `npm run npm:update` is the interactive path for hand-picking upgrades. It does **not** auto-hold `typescript`, so
  apply the step-3 ceiling yourself.
- `syncpack` writes consistent ranges into every workspace `package.json` in one go.
- **Group related upgrades** — do not bump everything blindly. If React types are updated, also check React itself; keep
  framework-related packages in lockstep.
- Do not select any held-back dependency even if it surfaces.

### 5. Refresh the lockfile and verify the install

```bash
npm install
```

### 6. Resolve peer-dependency conflicts the correct way

When `npm install` fails with `ERESOLVE`, **diagnose before remedying** — follow the
[`resolving-npm-eresolve`](../../.github/skills/resolving-npm-eresolve/SKILL.md) skill. A root `overrides` entry is only
one of several remedies, and the right one depends on **who declares the unsatisfiable peer** and whether compatibility
is established:

- **A third party** declares the conflicting peer and the new version is compatible → add a **pinned, scoped `overrides`
  entry** in the root `package.json` (follow the existing `madge > typescript` pattern and per-major examples like
  `minimatch@9`), then delete `package-lock.json` **and** `node_modules` and re-run `npm install`.
- **We** declare it — a hand-maintained wrapper peer range in
  `packages/components-<fw>/projects/<fw>-wrapper/package.json` went stale after a bump (e.g. `ag-grid-angular`) → **fix
  the range at source** (if the new version is compatible), then **materialize** the generated
  `dist/<fw>-wrapper/package.json` (`npm run preinstall:components-<fw>`) and confirm source==generated before
  reinstalling. An override here is the wrong tool. If the bump is a breaking major we can't yet support, **hold it
  back** (syncpack) or hand it off.
- Never work around any `ERESOLVE` with `--legacy-peer-deps` / `--force`.

### 7. Re-validate the existing `overrides`

Every `overrides` entry in the root [`package.json`](../../package.json) is a workaround for a peer-dependency conflict
or a security advisory (see `docs/dependencies.md` → _Strict peer dependency resolution_). As the tree moves each week,
some of these become unnecessary — the upstream/transitive dependency may now satisfy our pins natively. Stale overrides
silently freeze transitive versions and hide real upgrades, so prune the ones that are no longer needed.

For each override (e.g. `madge > typescript`, the per-major security pins like `minimatch@*` / `brace-expansion@*`, and
the scoped ones like `js-beautify > glob`, `next > postcss`):

- **Keep** entries that are still required: held-back-related pins, and security overrides whose advisory is not yet
  fixed upstream (cross-check `npm run npm:audit`).
- **Test for staleness** by temporarily removing (or relaxing) the candidate entry, then deleting `package-lock.json`
  **and** `node_modules` and re-running `npm install`:

  ```bash
  rm -rf package-lock.json node_modules
  npm install
  ```

  If `npm install` succeeds with no `ERESOLVE` **and** `npm run npm:audit` reports no regression for that package, the
  override is obsolete — **remove it**. If either fails, restore the entry as-is.

- Record every removed (or relaxed) override in the PR description, and keep `docs/dependencies.md` →
  _Current overrides_ in sync with the result.

### 8. Keep version ranges consistent

```bash
npm run npm:lint
npm run npm:format
```

If either reports issues, fix them with `npm run npm:lint:fix` / `npm run npm:format:fix`, then re-run the check.

### 9. Regenerate the lockfile cleanly

To refresh transitive dependencies, delete `package-lock.json` and recreate it:

```bash
rm package-lock.json
npm install
```

Confirm all eight `@next/swc-*` optional dependencies are still recorded in `package-lock.json` (see
`docs/dependencies.md` → _Explicit `@next/swc-*` optional dependencies_).

### 10. Sync the StackBlitz starter templates (npm workspace members)

The four StackBlitz starter templates under
`packages/storefront/projects/stackblitz/src/{vanilla-js,angular,react,vue}/package.json` are **standalone, runnable
projects** read verbatim by
[`generateStackblitzBundle.ts`](../../packages/storefront/projects/stackblitz/scripts/generateStackblitzBundle.ts). They
are now **npm workspace members** (listed in the root [`package.json`](../../package.json) `workspaces` array), so
`syncpack` sees them by default — `.syncpackrc.json` no longer needs a `source` array.

Although each starter pins the **published** `@porsche-design-system/components-*` version, `npm install` works because
the local wrapper packages (`packages/components-*/dist/*-wrapper`) carry that same release version, so npm satisfies the
pin by symlinking to the local workspace; off the monorepo the same pin resolves from the registry.

This means `npm run npm:update` / `npm run npm:lint:fix` will already align the **shared tooling** versions in these four
files with the rest of the monorepo — typically `vite`, `tailwindcss`, `@tailwindcss/postcss`, `postcss`, `react`,
`react-dom`, `@types/react`, `@types/react-dom`, `@vitejs/plugin-react`, `vue`, `vue-tsc`, `globals`. After running the
syncpack steps, just verify these files look correct (don't hand-edit versions syncpack owns).

**Leave these untouched** (same rules as the rest of this runbook):

- `@porsche-design-system/components-*` — the **published** PDS version; bumped by the release process (see
  `docs/release.md` → _Deploy_), not here.
- `@playwright/test`, `@stencil/core` — fully held back.

**If syncpack bumped Angular**, also align the Angular template
(`packages/storefront/projects/stackblitz/src/angular/package.json`) to the new versions: `@angular/*`,
`@angular/build`, `@angular/cli`, `@angular/compiler-cli`, `zone.js`, and `typescript` (respecting `MAX_TS_VERSION`).
Otherwise leave them as-is.

Verify the bundle still generates (this writes the git-ignored `generated/bundle.ts`; **do not commit** it):

```bash
npm run build:generateStackblitzBundle --workspace=@porsche-design-system/stackblitz
```

### 11. Verify against CI-equivalent checks (do not finalize on failure)

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

### 12. Review security advisories (report only)

```bash
npm run npm:audit
```

Summarize advisories in the PR. **Do not** run `npm audit fix`. For a genuinely fixable advisory, add a pinned
`overrides` entry (as in step 6) and regenerate the lockfile. Conversely, drop any override an advisory no longer needs
(see [step 7](#7-re-validate-the-existing-overrides)).

## Updating Playwright (npm pin, Docker image, VRT)

`@playwright/test` is held back and is **not** part of the routine weekly run (`syncpack` skips it). Update it only
deliberately, because the version is mirrored by the **Docker image** used for tests/VRT and by the **committed VRT
snapshots**. Regenerating snapshots requires Docker, so **only proceed if you can run `./docker.sh`** — otherwise
**stop and hand off** ([Stop conditions](#stop-conditions-hand-back-to-a-human)).

Keep all of these on the **same** version (npm `X.Y.Z` ↔ image `vX.Y.Z-jammy`):

1. The exact npm pin in the root [`package.json`](../../package.json): `"@playwright/test": "X.Y.Z"`.
2. Every Docker image reference `mcr.microsoft.com/playwright:vX.Y.Z-jammy` in
   [`docker-compose.yml`](../../docker-compose.yml) and the workflows under `.github/workflows/` (the `image:` inputs in
   [`contribution.yml`](../../.github/workflows/contribution.yml); there is also a commented example in
   `code-scanning.yml`). A mismatch between the installed Playwright and the Docker image makes CI fail, so keep them
   aligned.

```bash
# 1. Bump the exact npm pin in root package.json ("@playwright/test": "X.Y.Z"), then:
npm install

# 2. Update every Docker image reference to mcr.microsoft.com/playwright:vX.Y.Z-jammy
#    (docker-compose.yml + the workflows under .github/workflows/).

# 3. Regenerate and verify the committed VRT snapshots in Docker:
./docker.sh npm run test:vrt:components-js
```

Commit the bumped `package.json`, `package-lock.json`, the Docker image changes, and any regenerated VRT snapshots
**together**. If snapshots change beyond what the browser bump explains, **stop** and hand off.

## Output contract

Deliver the result as a **single pull request** the maintainers can review and merge:

- **One PR** containing all dependency changes from this run (no direct pushes to `main`).
- **Target the default branch** (`main`) — closing keywords only auto-close issues when the PR merges into the default
  branch.
- **Close the dispatching issue automatically.** Put a
  [closing keyword](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword)
  in the **PR description** (not a commit message or a plain `#123` mention):

  ```text
  Closes #<issue-number>
  ```

  Use the number of the issue you were assigned — the dispatcher
  ([`weekly-dependency-agent.yml`](../../.github/workflows/weekly-dependency-agent.yml)) pre-fills it as
  `Closes #<number>` in the issue body. The keyword must stay in the **PR description**; without it, merging the PR will
  **not** close the issue, leaving stale dependency tasks open.
- **PR description** must summarize: which dependencies were bumped (grouped), any `overrides` added or removed, any
  advisories from `npm run npm:audit`, and which builds/tests you ran — explicitly calling out any you could **not**
  reproduce here (e.g. VRT in Docker, cross-browser e2e), so the reviewer knows what still needs to pass on CI.

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
