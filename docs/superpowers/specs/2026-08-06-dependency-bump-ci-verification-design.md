# Dependency Bump CI Verification Design

## Goal

Add Step 11's minimum CI-equivalent checks to the TurboSpec dependency-bump workflow. Run the checks deterministically
and let a narrowly scoped final agent repair dependency-caused source failures.

## Scope

Run these commands on every dependency-bump workflow:

1. `npm run lint`
2. `npm run build`
3. `npm run test:unit:components`

The PR Gates remain responsible for the full build and test matrix. This first version does not infer affected packages,
run browser suites, or maintain a dependency-to-test mapping.

## Stage Architecture

Split the current `update_dependencies` stage so deterministic version mutation and agent work have separate retry
boundaries:

```text
update_dependencies
  npm run npm:update:all
        |
        v
resolve_dependencies
  dependency_updater
  npm install, Syncpack format, Syncpack lint
        |
        v
revalidate_overrides
        |
        v
document_overrides
        |
        v
verify_ci
  ci_repairer (no-op before the first gate run)
  lint, build, components unit
```

`update_dependencies` is agentless. `resolve_dependencies` contains the existing `dependency_updater` and existing
gates. This preserves the current initial execution order.

The split prevents a CI retry from re-running `npm run npm:update:all`. TurboSpec runs a target stage's `pre_command` on
cross-stage re-entry; targeting the current combined stage could therefore change dependency versions after cleanup.

Disable Syncpack's `exports` sorting with `sortExports: []`. Conditional export order is semantic: sorting moved the
`sass` and `style` conditions behind JavaScript conditions and broke Sass package resolution during the full build.

## Deterministic Verification

Add `verify_ci` after `document_overrides`. It contains one narrowly scoped `ci_repairer` followed by one `script_gate`
named `ci-minimum` with the three commands as ordered steps.

The gate fails fast. Every run therefore executes the same commands in the same order, stopping at the first failure.
Avoid conditional package detection: transitive dependency impact makes such a classifier brittle, and the PR Gates
already run the complete matrix.

The Next.js build expects tracked `packages/components-react/projects/nextjs/next-env.d.ts` to include its generated
`root-params` type reference, so commit that one-line generated update. Also wrap `npm run build` in `sh` and restore
the file before returning. Normalize every completed build failure to exit `1` so TurboSpec routes compiler diagnostics
to `ci_repairer`; reserve exit `2` for wrapper setup or cleanup failures that require escalation.

Capture build output in a temporary file. On failure, replay the output and append a bounded summary beginning at
`error during build:` to stderr. `script_gate` prefers stderr for retry feedback, so the repair agent receives the
actual error instead of only the final stack-trace tail.

Set the gate's fallback `on_fail` to `escalate`, then use `failure_verdict: loop_back` and
`environment_verdict: escalate`. Exit code `1` represents a reproducible validation failure that the agent may repair.
Invocation, timeout, evaluator, and environment failures must stop without spending an agent retry.

## Agentic Repair

The dedicated `ci_repairer` always runs once before the first gate evaluation. Its prompt requires an immediate no-op
when no Previous Attempt / Gate feedback names `ci-minimum`. This costs one model invocation on a green run but avoids
consumer-side state that TurboSpec's sandbox and fresh-runner resume cannot preserve reliably.

On a validation failure, the stage-level gate loops back to `ci_repairer` within the same `verify_ci` stage, with
`max_retries: 2`. TurboSpec's native same-stage retry channel supplies the latest failed command and bounded diagnostic
to the agent. The repair contract is:

- Make no changes before gate feedback names `ci-minimum`.
- Confirm that the dependency bump caused the failure.
- Make the smallest source, test, or configuration adaptation needed for a non-breaking dependency API change.
- Do not edit `package.json`, `package-lock.json`, dependency versions, overrides, or dependency documentation.
- Do not update, install, remove, or audit dependencies.
- Stop without speculative changes when the failure is unrelated, flaky, or requires a breaking migration.

Because the retry remains inside `verify_ci`, it neither re-runs dependency selection nor repeats the expensive override
sweep. It re-runs the complete minimum gate after each repair.

## Dependency-State Boundary

Dependency metadata is complete before `verify_ci`:

- `npm-install` validates the bumped manifest and lockfile.
- `npm-install-final` validates the state after override cleanup.
- Syncpack format and lint gates validate dependency declarations.

CI repair therefore adapts source only. The workflow must not reopen dependency selection after cleanup.

Production TurboSpec runs always open a PR. Its `WorktreeCommitter` commits every completed stage, including failed
stages, so `verify_ci` checks dependency metadata both before and after the minimum commands. Each scope step runs
`git status --porcelain` for every `package.json`, `package-lock.json`, and `docs/dependencies.md`. On a violation it
restores tracked metadata from `HEAD`, removes matching non-ignored untracked files, reports the paths, and exits `1`.
The cleanup happens before TurboSpec can commit the failed stage, so a fresh-runner resume cannot turn a forbidden edit
into a clean baseline.

## Failure Outcome

After two unsuccessful repair passes, `verify_ci` remains failed and TurboSpec reports the failure on the pull request.
The workflow does not suppress PR creation; the repository's PR Gates provide the full final signal.

## Validation Basis

The design was checked against TurboSpec engine commit `050a00fe`:

- A stage-level `loop_back.target_agent` without `target_stage` retries inside the current stage and re-runs from that
  agent.
- `script_gate` runs steps sequentially, stops at the first non-zero exit, and includes up to 4,000 diagnostic
  characters in retry feedback.
- An evaluator's explicit `loop_back` or `escalate` verdict overrides `on_fail`; a generic evaluator failure falls back
  to `on_fail`.
- Only the latest same-stage gate feedback reaches the retried agent.
- PR runs commit each successful stage before executing the next one.
- The override helper's process-group runner flushes buffered stdout and stderr before setting its exit code; its
  self-test sends 1 MiB through the real runner to protect workspace hashing from 64 KiB truncation.

The selected commands match Step 11 of `docs/runbooks/dependency-updates-agent.md`; `contribution.yml` delegates the
corresponding full CI work to `build.yml` and `test.yml`.

## Acceptance Criteria

- The first `ci_repairer` invocation makes no changes or shell calls before a gate failure exists.
- A validation failure invokes the same-stage repair agent with the failing command's diagnostic.
- A repair that changes dependency metadata is restored and fails the metadata scope step before stage commit.
- The build step never leaves the generated `next-env.d.ts` change for TurboSpec to commit.
- Syncpack formatting preserves semantic `sass` and `style` export conditions.
- Failed builds provide an actionable bounded diagnostic to `ci_repairer`.
- The deterministic update command does not run again during CI repair.
- A successful repair re-runs the complete minimum gate.
- Environment failures escalate without agent retries.
- The updated blueprint passes `workflow-skeleton validate`.
