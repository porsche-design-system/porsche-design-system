# Dependency Bump CI Verification Design

## Goal

Add Step 11's minimum CI-equivalent checks to the TurboSpec dependency-bump workflow. Run the checks deterministically,
repair dependency-caused source failures with the existing agent, and avoid an extra agent invocation when all checks pass.

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

`update_dependencies` is agentless. `resolve_dependencies` contains the existing `dependency_updater` and existing gates.
This preserves the current initial execution order.

The split prevents a CI retry from re-running `npm run npm:update:all`. TurboSpec runs a target stage's `pre_command` on
cross-stage re-entry; targeting the current combined stage could therefore change dependency versions after cleanup.

## Deterministic Verification

Add an agentless `verify_ci` stage after `document_overrides`. Use one `script_gate` named `ci-minimum` with the three
commands as ordered steps.

The gate fails fast. Every run therefore executes the same commands in the same order, stopping at the first failure.
Avoid conditional package detection: transitive dependency impact makes such a classifier brittle, and the PR Gates
already run the complete matrix.

Use `failure_verdict: loop_back` and `environment_verdict: escalate`. Exit code `1` represents a reproducible validation
failure that the agent may repair. Invocation, timeout, and environment failures must stop without spending an agent
retry.

## Agentic Repair

On a `ci-minimum` failure, loop back to `resolve_dependencies/dependency_updater` with
`execute_strategy: agent_and_everything_after_it` and `max_retries: 2`.

The existing agent receives the failed command and the bounded `script_gate` diagnostic through TurboSpec's previous
attempt context. Extend its prompt with a conditional CI-repair contract:

- Enter repair mode only when the gate feedback names `ci-minimum`.
- Confirm that the dependency bump caused the failure.
- Make the smallest source, test, or configuration adaptation needed for a non-breaking dependency API change.
- Do not edit `package.json`, `package-lock.json`, dependency versions, overrides, or dependency documentation.
- Stop without speculative changes when the failure is unrelated, flaky, or requires a breaking migration.

The normal dependency-resolution contract remains unchanged when no CI gate feedback exists.

TurboSpec re-runs `resolve_dependencies` and all later stages after a repair. This repeats the expensive override sweep
only on a failing run, but it guarantees that install state, override evidence, documentation, and final checks describe
the repaired tree. A green run invokes no additional repair agent.

## Dependency-State Boundary

Dependency metadata is complete before `verify_ci`:

- `npm-install` validates the bumped manifest and lockfile.
- `npm-install-final` validates the state after override cleanup.
- Syncpack format and lint gates validate dependency declarations.

CI repair therefore adapts source only. The workflow must not reopen dependency selection after cleanup.

## Failure Outcome

After two unsuccessful repair passes, `verify_ci` remains failed and TurboSpec reports the failure on the pull request.
The workflow does not suppress PR creation; the repository's PR Gates provide the full final signal.

## Validation Basis

The design was checked against TurboSpec engine commit `050a00fe`:

- `LoopBackConfig` supports a target stage, target agent, and `agent_and_everything_after_it`.
- Cross-stage retries attach gate feedback to the target stage's agent.
- `script_gate` runs steps sequentially, stops at the first non-zero exit, and includes up to 4,000 diagnostic characters
  in retry feedback.
- A cross-stage retry invalidates and re-runs the target stage and every later stage.
- Stage `pre_command` runs on re-entry, which requires the `update_dependencies`/`resolve_dependencies` split.

The selected commands match Step 11 of `docs/runbooks/dependency-updates-agent.md`; `contribution.yml` delegates the
corresponding full CI work to `build.yml` and `test.yml`.

## Acceptance Criteria

- A green run executes the three minimum checks without another model invocation.
- A validation failure invokes the existing agent with the failing command's diagnostic.
- A repair cannot intentionally change dependency metadata.
- The deterministic update command does not run again during CI repair.
- A successful repair re-runs all downstream consistency stages and the complete minimum gate.
- Environment failures escalate without agent retries.
- The updated blueprint passes `workflow-skeleton validate`.
