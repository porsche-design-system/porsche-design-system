# Dependency Bump CI Verification Design

## Goal

Add Step 11's minimum CI-equivalent checks to the TurboSpec dependency-bump workflow. Run the checks deterministically,
repair dependency-caused source failures with the existing agent, and avoid an extra agent invocation when all checks
pass.

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
  lint, build, components unit
```

`update_dependencies` is agentless. `resolve_dependencies` contains the existing `dependency_updater` and existing
gates. This preserves the current initial execution order.

The split prevents a CI retry from re-running `npm run npm:update:all`. TurboSpec runs a target stage's `pre_command` on
cross-stage re-entry; targeting the current combined stage could therefore change dependency versions after cleanup.

## Deterministic Verification

Add an agentless `verify_ci` stage after `document_overrides`. Use one `script_gate` named `ci-minimum` with the three
commands as ordered steps.

The gate fails fast. Every run therefore executes the same commands in the same order, stopping at the first failure.
Avoid conditional package detection: transitive dependency impact makes such a classifier brittle, and the PR Gates
already run the complete matrix.

Set the gate's fallback `on_fail` to `escalate`, then use `failure_verdict: loop_back` and
`environment_verdict: escalate`. Exit code `1` represents a reproducible validation failure that the agent may repair.
Invocation, timeout, evaluator, and environment failures must stop without spending an agent retry.

## Agentic Repair

On a `ci-minimum` failure, loop back to `resolve_dependencies/dependency_updater` with
`execute_strategy: agent_and_everything_after_it` and `max_retries: 2`.

The existing agent receives the failed command and the bounded `script_gate` diagnostic through TurboSpec's previous
attempt context. Extend its prompt with a conditional CI-repair contract:

- Enter repair mode when the gate feedback names `ci-minimum` or persisted `document_overrides.ci_repair.active` context
  is true.
- Confirm that the dependency bump caused the failure.
- Make the smallest source, test, or configuration adaptation needed for a non-breaking dependency API change.
- Do not edit `package.json`, `package-lock.json`, dependency versions, overrides, dependency documentation, or captured
  CI metadata evidence.
- Stop without speculative changes when the failure is unrelated, flaky, or requires a breaking migration.

`document_overrides` writes the compact repair-mode output only after the normal dependency and documentation stages
finish. TurboSpec persists declared outputs in session context, so a later resolver-gate retry cannot erase CI repair
mode by replacing the latest gate feedback. The normal dependency-resolution contract remains unchanged before that
output exists.

TurboSpec re-runs `resolve_dependencies` and all later stages after a repair. This repeats the expensive override sweep
only on a failing run, but it guarantees that install state, override evidence, documentation, and final checks describe
the repaired tree. A green run invokes no additional repair agent.

## Dependency-State Boundary

Dependency metadata is complete before `verify_ci`:

- `npm-install` validates the bumped manifest and lockfile.
- `npm-install-final` validates the state after override cleanup.
- Syncpack format and lint gates validate dependency declarations.

CI repair therefore adapts source only. The workflow must not reopen dependency selection after cleanup.

After documentation succeeds, capture the ordered paths and Git object hashes for every tracked or non-ignored
`package.json`, `package-lock.json`, and `docs/dependencies.md`. After the minimum checks pass, recompute and compare
both lists. A mismatch fails the stage instead of accepting dependency metadata changed during repair. The next fresh
`update_dependencies` run clears stale CI evidence before selecting versions.

## Failure Outcome

After two unsuccessful repair passes, `verify_ci` remains failed and TurboSpec reports the failure on the pull request.
The workflow does not suppress PR creation; the repository's PR Gates provide the full final signal.

## Validation Basis

The design was checked against TurboSpec engine commit `050a00fe`:

- `LoopBackConfig` supports a target stage, target agent, and `agent_and_everything_after_it`.
- Cross-stage retries attach gate feedback to the target stage's agent.
- `script_gate` runs steps sequentially, stops at the first non-zero exit, and includes up to 4,000 diagnostic
  characters in retry feedback.
- A cross-stage retry invalidates and re-runs the target stage and every later stage.
- Stage `pre_command` runs on re-entry, which requires the `update_dependencies`/`resolve_dependencies` split.
- An evaluator's explicit `loop_back` or `escalate` verdict overrides `on_fail`; a generic evaluator failure falls back
  to `on_fail`.
- Declared stage outputs survive resume in task context, while only the latest stage-scoped gate feedback reaches an
  agent.

The selected commands match Step 11 of `docs/runbooks/dependency-updates-agent.md`; `contribution.yml` delegates the
corresponding full CI work to `build.yml` and `test.yml`.

## Acceptance Criteria

- A green run executes the three minimum checks without another model invocation.
- A validation failure invokes the existing agent with the failing command's diagnostic.
- CI repair mode survives later resolver-gate feedback and workflow resume.
- A repair that changes dependency metadata fails deterministic post-verification hashes.
- The deterministic update command does not run again during CI repair.
- A successful repair re-runs all downstream consistency stages and the complete minimum gate.
- Environment failures escalate without agent retries.
- The updated blueprint passes `workflow-skeleton validate`.
