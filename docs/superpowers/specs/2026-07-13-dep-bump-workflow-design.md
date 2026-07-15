# Dependency-bump workflow design

Date: 2026-07-13
Status: Approved for implementation

## Goal

Automate the recurring npm dependency bump as a turbo-spec workflow. Bump third-party
dependencies, resolve any resulting ERESOLVE peer conflicts with the correct remedy, and
leave a reproducible, verified tree. Every run ends in exactly one verdict: `SUCCESS`,
`NO_CHANGES`, `BLOCKED`, or `BLOCKED_PREEXISTING` (valid bumps retained, but a pre-existing or
out-of-scope edge blocks the gate — escalate without discarding work).

This workflow supersedes `docs/runbooks/dependency-updates-agent.md` for the bump task.

## Principle: deterministic by default, agentic only where reasoning is required

Most of the task is computation over well-defined inputs, so scripts do it. One part —
resolving an ERESOLVE conflict — needs evidence gathering and judgment, so an agent does it.

| Work | Kind | Runner |
| --- | --- | --- |
| `npm ci`, snapshot lock/audit/`npm ls`, classify ci-failure, retry once | deterministic | `preflight.sh` |
| `npm run npm:update:non-interactive` | deterministic | `bump.sh` |
| Classify the diff: held-back set unchanged, old→new, MAJOR flags, `NO_CHANGES` | deterministic | `classify-bump.ts` |
| `npm install`: clean or ERESOLVE | deterministic | `install-check.sh` |
| Read ERESOLVE, gather evidence, judge compatibility, choose and apply the remedy, loop | **agentic** | `dependency_updater` agent |
| `npm ci`, tree baseline-diff, `npm run npm:lint` | deterministic | `verify-checks.sh`, `tree-compare.ts` |
| Audit compare (advisory-identity set-diff: new-in-both = drift, new-in-updated-only = regression) | deterministic | `audit-compare.ts` |
| Impact-based build/test selection | deterministic (rule-based) | `select-impact-tests.ts` |
| Aggregate outcomes into one terminal verdict | deterministic | `report.ts` |

Only the resolve step needs an agent. The agent calls the deterministic scripts and reasons
only when a script reports an ERESOLVE.

## Ownership

The porsche-design-system repo is the turbo-spec instantiation. All project-specific
artifacts live here; turbo-spec provides only the shared foundation.

```
scripts/dep-bump/                          # deterministic, reproducible scripts
  preflight.sh  bump.sh  classify-bump.ts
  install-check.sh  verify-checks.sh
  audit-compare.ts  select-impact-tests.ts  report.ts
.turbo-spec/workflows/dep-bump.yml         # the blueprint
.turbo-spec/system_prompts/dep_update.md   # the one agent's prompt
.turbo-spec/schemas/dep-bump-*.schema.json # outcome-contract schemas
.github/skills/resolving-npm-eresolve/     # already exists — the S4 decision brain
```

Each script writes a verdict document to the gitignored `.turbo-spec/out/` run-output
directory, so baselines and ledgers never reach a commit.

## Pipeline: three stages, one agent

```
preflight (agentless) → update (one agent) → verify (agentless)
```

### preflight

Read-only. A `script_gate` runs `preflight.sh`. The script asserts a clean tree, runs
`npm ci`, snapshots the pristine lockfile plus `npm audit --json` and `npm ls --all`, and
classifies a `npm ci` failure by exit code: repo-resolution → BLOCKED, network → retry once.
It writes `preflight.verdict {outcome: CONTINUE | BLOCKED}`, loaded into context via
`outputs:`.

### update

The single agent stage. Runs only when `preflight.verdict.outcome == 'CONTINUE'`.

The agent's prompt keeps it thin: run `bump.sh` and `install-check.sh`; if the tree is clean
or nothing changed, record the outcome and stop; if a script reports ERESOLVE, resolve it.
The blueprint does not list `skills:`. An omitted list makes every project-scope skill
discoverable, and the agent activates `resolving-npm-eresolve` through the skills tool when
it hits an ERESOLVE, driven by that skill's own trigger description.

The prompt owns run-control that the skill leaves out: a fingerprint per conflict, a global
six-iteration cap, a resolver ledger in `.turbo-spec/out/resolve-ledger.yml`, and the rule
never to re-run the unrestricted bump after holding a dependency back.

Bump, install, and resolve share this one stage on purpose. The engine commits per stage, so
splitting the bump into its own stage would push an unresolved tree before the agent runs.
On `BLOCKED` or `NO_CHANGES` the agent restores the entry tree, so no half-resolved tree is
ever committed. The stage writes `update.result {outcome: RESOLVED | NO_CHANGES | BLOCKED,
deps_bumped, conflicts, overrides, holdbacks}`, guarded by an `outcome_contract` gate.

### verify

Read-only. Runs only when `update.result.outcome == 'RESOLVED'`.

A `script_gate` runs `verify-checks.sh` (`npm ci` → tree baseline-diff → `npm run npm:lint`):
a step exit of `1` loops back to `update`; an exit of `2` or more escalates. The tree check
runs `tree-compare.ts`, which diffs the current `npm ls --all` problems against the S1
`ls-baseline.json` and fails ONLY on edges introduced by this run — pre-existing invalid or
extraneous edges on the untouched base tree are tolerated, so the gate is satisfiable.
`audit-compare.ts` compares the new tree's advisories against the preflight snapshot and
escalates a genuine regression. `select-impact-tests.ts` chooses the build and tests to run
from the changed dependencies. `report.ts` then aggregates every `out/*.yml` outcome into one
terminal verdict; a retained major without verification evidence yields `BLOCKED`, and a run
that made valid bumps but hit a pre-existing/out-of-scope blocker yields `BLOCKED_PREEXISTING`
(the bumps are retained for a human to land, not discarded).

## How this holds up

- **Satisfiable verify gate.** The tree check tolerates pre-existing invalid/extraneous edges
  and fails only on edges the run introduces, so a repo whose base tree already has a
  third-party peer defect can still pass. Update and verify apply the identical baseline-diff,
  so the agent never stops on a criterion the gate will later reject.
- **Host/sandbox tree parity.** The gate scripts run on the host today, so `npm ls` there
  surfaces host-only native/optional entries (`@emnapi`, `postcss`, `koa`) that the Linux
  sandbox agent cannot reproduce. The baseline-diff neutralizes this: both `ls-baseline.json`
  (preflight) and `ls-current.json` (verify) are captured host-side, so a host-only entry
  appears in both and cancels; the gate fails only on genuine new dependency edges, which the
  agent reproduces in-sandbox. Full parity (running the gate inside the same sandbox image) is
  an engine change tracked upstream, not a prerequisite for a correct verdict here.
- **Platform-binary reconcile (native optional deps).** Distinct from the `npm ls` baseline-diff
  above: preflight's `npm ci` runs on the macOS host, so npm materializes only the host's
  platform-gated `optionalDependencies` (`@esbuild/darwin-*`, `syncpack-darwin-*`). The update
  agent runs in a linux sandbox against that mounted `node_modules`, where the linux binaries are
  absent, so every `tsx` (tsx → esbuild) and `syncpack` call would throw "installed for another
  platform". `bump.sh` reconciles this deterministically via `ensure-platform-binaries.sh` before
  its first native call: a functional probe no-ops on a healthy tree, otherwise a `--no-save`
  `npm install` materializes this platform's already-locked optional packages. It is lock-neutral
  by construction — `package-lock.json` (v3) already enumerates every platform's optional packages
  with `os`/`cpu` + integrity — and the helper snapshot-restores the lock as a defensive guarantee.
  The reconcile is safe against the shared mount because host-side verify and report both run `tsx`
  after the sandbox update stage and succeed today, so the host's darwin binaries are not pruned by
  the sandbox's install; the probe-guard additionally ensures a healthy host/native-linux tree is
  never mutated.
- **Git-independent classification.** The sandbox worktree's `.git` can point to an unmounted
  host gitdir, so git fails in the update stage. Classification therefore reads a
  host-snapshotted baseline (`deps-baseline.json` + `package-json-files.json`, written by
  preflight where git works) and the current tree from disk, never invoking git in-sandbox.
- **ERESOLVE termination survives loop-backs.** The fingerprint set and iteration count live
  in the gitignored ledger on the persistent host mount, seeded idempotently by the update
  stage `pre_command`, so a loop back into `update` respects the six-iteration cap and the
  one-remedy-per-fingerprint rule.
- **No half-resolved commit.** One transactional mutation stage; entry-tree restore on any
  non-`RESOLVED` outcome.
- **Sound audit compare.** Preflight snapshots the pristine lock; verify audits both locks
  and compares advisory identities, so advisory-feed drift never reads as a regression.
- **Exactly one verdict.** `report.ts` derives the single terminal verdict; no looped agent
  can emit a second one.
- **Reproducible.** A human or CI can run the same scripts and get the same tree.

## Out of scope

- Resolving a breaking major that needs a source migration. The workflow reports `BLOCKED`
  and hands off.
- Changing the held-back set or the `npm:update:non-interactive` script.

## Upstream engine dependencies (turbo-spec, not fixable in this repo)

These harden the run but require turbo-spec changes; the consumer-side mitigations above keep
the workflow correct without them:

- **Sandbox gate parity.** `script_gate` runs steps via a host subprocess and ignores the
  `sandbox_command_runner` that `build_pass`/`tests_pass` already use; running gate steps in
  the same sandbox image would give byte-identical `npm ls` across stages.
- **Git-worktree mount.** The engine mounts only the worktree, not a git-worktree's external
  gitdir; auto-detecting a `.git` file and mounting its gitdir (or an `extra_container_mounts`
  knob) would make git work in-sandbox.
- **Model-override DX.** A lone agent `model_kwargs` is silently ignored unless `model` is also
  set; the engine should warn (we set `model: copilot` to work around it).

## Resolved decisions

- Consumer `outcome_contract` schemas are path-referenced from `.turbo-spec/schemas/`
  (bare names resolve to built-ins; a path with a slash resolves against the repo root).
- `network.allowed` starts empty; add hosts only when the sandbox log prints
  `[sandbox] egress denied` for a release-note evidence host the resolver needs.
- Trigger is manual for now: locally via the turbo-spec CLI `run`, or in CI by
  dispatching the dedicated `ai.yml` driver shim (`gh workflow run ai.yml`). That shim
  is hard-wired to `blueprint: dep-bump` and runs on `workflow_dispatch` only (no
  issue-label trigger); the engine resolves the bare name consumer-first to
  `.turbo-spec/workflows/dep-bump.yml`, and an empty `pr-number` makes it pass
  `--create-pr`, so the run opens its own PR. The `ai-watch.yml` and `comment-router.yml`
  shims provide failure triage/auto-resume and PR-feedback resume for those runs. A weekly
  cron dispatcher can wrap this later.
- The `resolving-npm-eresolve` skill is reached via the `.github/skills` -> `../skills`
  symlink, so it auto-advertises to the update agent with no relocation needed.
