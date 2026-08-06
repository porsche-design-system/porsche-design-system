# Dependency Bump CI Verification Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or
> superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add deterministic minimum CI checks to the TurboSpec dependency-bump workflow and use a no-op-first,
same-stage repair agent for reproducible failures.

**Architecture:** Split deterministic dependency selection from the existing dependency agent so a CI retry cannot bump
versions again. Add one fail-fast verification stage after cleanup and documentation; its dedicated agent no-ops before
the first gate run, then receives same-stage gate feedback on a validation failure.

**Tech Stack:** TurboSpec workflow YAML, TurboSpec `script_gate`, Markdown system prompts, npm scripts

## Global Constraints

- Always run `npm run lint`, `npm run build`, and `npm run test:unit:components` in that order.
- Keep the PR Gates responsible for the complete test matrix; add no package classifier, browser suite, helper script,
  or dependency.
- Invoke one dedicated final agent on every run, but require it to make no changes or shell calls before gate feedback.
- Give `ci-minimum` validation failures two repair retries.
- Escalate environment, timeout, and command-invocation failures without an agent retry.
- CI repair may change only the smallest source, test, or configuration surface needed for a non-breaking dependency API
  change.
- CI repair must not change `package.json`, `package-lock.json`, dependency versions, overrides, or dependency
  documentation.
- Keep repairs within `verify_ci` so TurboSpec's native same-stage retry feedback needs no persisted consumer state.
- Reject any package manifest, lockfile, or dependency-documentation change relative to committed `HEAD`.
- TurboSpec may still open a pull request when the minimum gate remains red.

## File Map

- Modify `.turbo-spec/workflows/dependency-bump.yml`: split the update and resolution stages, then add the final
  verification gate.
- Modify `.turbo-spec/system_prompts/dependency-bump.md`: keep dependency resolution separate from CI repair.
- Create `.turbo-spec/system_prompts/dependency-ci-repair.md`: define no-op-first, source-only CI repair behavior.
- No production source, dependency manifest, lockfile, runbook, or helper script changes.

---

### Task 1: Isolate the Agent Retry Target

**Files:**

- Modify: `.turbo-spec/workflows/dependency-bump.yml:12-61`

**Interfaces:**

- Consumes: the existing `npm:update:all` script, `dependency_updater` agent, and install/Syncpack gates.
- Produces: agentless stage `update_dependencies` and retry-safe stage `resolve_dependencies` containing agent
  `dependency_updater`.

- [ ] **Step 1: Run a structural check that fails before the split**

```bash
uv run --project /Users/FNN57BH/Developer/turbo-spec python - <<'PY'
from pathlib import Path
import yaml

workflow = yaml.safe_load(Path(".turbo-spec/workflows/dependency-bump.yml").read_text())
stages = {stage["name"]: stage for stage in workflow["stages"]}
assert stages["update_dependencies"]["pre_command"] == "npm run npm:update:all"
assert stages["update_dependencies"].get("agents", []) == []
assert stages["resolve_dependencies"]["depends_on"] == ["update_dependencies"]
assert stages["resolve_dependencies"]["agents"][0]["id"] == "dependency_updater"
assert stages["revalidate_overrides"]["depends_on"] == ["resolve_dependencies"]
PY
```

Expected: FAIL because `update_dependencies` still contains the agent and `resolve_dependencies` does not exist.

- [ ] **Step 2: Split deterministic update from dependency resolution**

Replace the current opening stage with this structure. Move the existing three quality gates unchanged under
`resolve_dependencies`.

```yaml
- name: update_dependencies
  orchestrator: implementation
  pre_command: 'npm run npm:update:all'

- name: resolve_dependencies
  orchestrator: bumpy_mc_bumpface
  depends_on: [update_dependencies]
  agents:
    - id: dependency_updater
      type: dependency_updater
      skills: []
      tools: [file, shell]
      system_prompt: dependency-bump
  quality_gates:
    - evaluator: script_gate
      on_fail: loop_back
      max_retries: 2
      loop_back:
        target_agent: dependency_updater
      post_command: 'npm run npm:format:fix && npm run npm:lint:fix'
      config:
        gate_name: npm-install
        failure_verdict: loop_back
        steps:
          - name: npm-install
            command: [npm, install]
    - evaluator: script_gate
      on_fail: loop_back
      max_retries: 2
      loop_back:
        target_agent: dependency_updater
      config:
        gate_name: npm-format
        failure_verdict: loop_back
        steps:
          - name: npm-format
            command: [npm, run, 'npm:format']
    - evaluator: script_gate
      on_fail: loop_back
      max_retries: 2
      loop_back:
        target_agent: dependency_updater
      config:
        gate_name: npm-lint
        failure_verdict: loop_back
        steps:
          - name: npm-lint
            command: [npm, run, 'npm:lint']
```

Change `revalidate_overrides` to:

```yaml
depends_on: [resolve_dependencies]
```

- [ ] **Step 3: Re-run the structural check**

Run the command from Step 1.

Expected: PASS.

- [ ] **Step 4: Validate the intermediate blueprint**

```bash
uv run --project /Users/FNN57BH/Developer/turbo-spec \
  --directory "$PWD" \
  workflow-skeleton validate .turbo-spec/workflows/dependency-bump.yml
git --no-pager diff --check
```

Expected: all commands exit `0`.

- [ ] **Step 5: Commit the retry boundary**

```bash
git add .turbo-spec/workflows/dependency-bump.yml
git commit -m "refactor(turbospec): isolate dependency resolution" \
  -m "Co-authored-by: Copilot App <223556219+Copilot@users.noreply.github.com>"
```

### Task 2: Add the Minimum CI Gate

**Files:**

- Modify: `.turbo-spec/workflows/dependency-bump.yml:128-135`

**Interfaces:**

- Consumes: stage `document_overrides` and agent `resolve_dependencies/dependency_updater`.
- Produces: initial `verify_ci` gate; Task 3 adds its narrowly scoped repair agent.

- [ ] **Step 1: Run a structural check that fails before the gate exists**

```bash
uv run --project /Users/FNN57BH/Developer/turbo-spec python - <<'PY'
from pathlib import Path
import yaml

workflow = yaml.safe_load(Path(".turbo-spec/workflows/dependency-bump.yml").read_text())
stages = {stage["name"]: stage for stage in workflow["stages"]}
verify = stages["verify_ci"]
gate = verify["quality_gates"][0]
assert verify["depends_on"] == ["document_overrides"]
assert verify.get("agents", []) == []
assert gate["on_fail"] == "escalate"
assert gate["max_retries"] == 2
assert gate["loop_back"] == {
    "target_stage": "resolve_dependencies",
    "target_agent": "dependency_updater",
    "execute_strategy": "agent_and_everything_after_it",
}
assert gate["config"]["failure_verdict"] == "loop_back"
assert gate["config"]["environment_verdict"] == "escalate"
assert [step["command"] for step in gate["config"]["steps"]] == [
    ["npm", "run", "lint"],
    ["npm", "run", "build"],
    ["npm", "run", "test:unit:components"],
]
PY
```

Expected: FAIL with `KeyError: 'verify_ci'`.

- [ ] **Step 2: Add the initial verification stage**

Insert this stage after `document_overrides` and before `settings`:

```yaml
- name: verify_ci
  orchestrator: implementation
  depends_on: [document_overrides]
  quality_gates:
    - evaluator: script_gate
      on_fail: escalate
      max_retries: 2
      loop_back:
        target_stage: resolve_dependencies
        target_agent: dependency_updater
        execute_strategy: agent_and_everything_after_it
      config:
        gate_name: ci-minimum
        failure_verdict: loop_back
        environment_verdict: escalate
        steps:
          - name: lint
            command: [npm, run, lint]
          - name: build
            command: [npm, run, build]
          - name: components-unit
            command: [npm, run, 'test:unit:components']
```

- [ ] **Step 3: Re-run the structural check**

Run the command from Step 1.

Expected: PASS. Task 3 replaces this temporary cross-stage route with the final same-stage repair agent.

- [ ] **Step 4: Validate the complete blueprint**

```bash
uv run --project /Users/FNN57BH/Developer/turbo-spec \
  --directory "$PWD" \
  workflow-skeleton validate .turbo-spec/workflows/dependency-bump.yml
git --no-pager diff --check
```

Expected: both commands exit `0`.

- [ ] **Step 5: Run the exact minimum gate locally**

```bash
npm run lint &&
  npm run build &&
  npm run test:unit:components
```

Expected: all three commands exit `0` in order. If a command exposes a pre-existing failure, do not change unrelated
source; record the failure and let the PR Gates provide the full repository signal.

- [ ] **Step 6: Confirm the build created no unplanned tracked changes**

```bash
git --no-pager status --short
git --no-pager diff -- .turbo-spec/workflows/dependency-bump.yml
```

Expected: only `.turbo-spec/workflows/dependency-bump.yml` is modified.

- [ ] **Step 7: Commit the minimum gate**

```bash
git add .turbo-spec/workflows/dependency-bump.yml
git commit -m "ci(turbospec): verify dependency bumps" \
  -m "Co-authored-by: Copilot App <223556219+Copilot@users.noreply.github.com>"
```

### Task 3: Add a Same-Stage CI Repair Agent

**Files:**

- Modify: `.turbo-spec/workflows/dependency-bump.yml`
- Modify: `.turbo-spec/system_prompts/dependency-bump.md`
- Create: `.turbo-spec/system_prompts/dependency-ci-repair.md`
- Modify: `packages/components-react/projects/nextjs/next-env.d.ts`
- Modify: `docs/superpowers/specs/2026-08-06-dependency-bump-ci-verification-design.md`
- Modify: `docs/superpowers/plans/2026-08-06-dependency-bump-ci-verification.md`

**Interfaces:**

- Consumes: TurboSpec's same-stage `loop_back.target_agent` feedback and per-stage PR commits.
- Produces: no-op-first agent `ci_repairer` and a native Git metadata write-scope check.

- [ ] **Step 1: Run a structural check that fails before the dedicated agent exists**

```bash
uv run --project /Users/FNN57BH/Developer/turbo-spec python - <<'PY'
from pathlib import Path
import yaml

workflow = yaml.safe_load(Path(".turbo-spec/workflows/dependency-bump.yml").read_text())
stages = {stage["name"]: stage for stage in workflow["stages"]}
document = stages["document_overrides"]
verify = stages["verify_ci"]
gate = verify["quality_gates"][0]
assert "ci_repair" not in document.get("outputs", {})
assert "post_command" not in document
assert verify["agents"][0]["id"] == "ci_repairer"
assert verify["agents"][0]["type"] == "implementer"
assert verify["agents"][0]["system_prompt"] == "dependency-ci-repair"
assert gate["on_fail"] == "escalate"
assert gate["loop_back"] == {"target_agent": "ci_repairer"}
assert gate["config"]["steps"][2]["command"][:2] == ["sh", "-c"]
assert "git restore --" in gate["config"]["steps"][2]["command"][2]
assert gate["config"]["steps"][0]["name"] == "dependency-metadata-before"
assert gate["config"]["steps"][-1]["name"] == "dependency-metadata-after"
assert "git clean -f --" in gate["config"]["steps"][0]["command"][2]
assert Path(".turbo-spec/system_prompts/dependency-ci-repair.md").exists()
PY
```

Expected: FAIL because `verify_ci` has no agent and still targets `resolve_dependencies`.

- [ ] **Step 2: Add the dedicated no-op-first agent**

Add this agent to `verify_ci`:

```yaml
agents:
  - id: ci_repairer
    type: implementer
    skills: []
    tools: [file, shell]
    system_prompt: dependency-ci-repair
```

Replace the gate's cross-stage loop-back with:

```yaml
loop_back:
  target_agent: ci_repairer
```

Keep `on_fail: escalate`, `failure_verdict: loop_back`, `environment_verdict: escalate`, and `max_retries: 2`.

- [ ] **Step 3: Add the CI repair prompt**

Create `.turbo-spec/system_prompts/dependency-ci-repair.md`:

```markdown
Goal: repair a reproducible `ci-minimum` failure caused by the dependency bump. If the Previous Attempt / Gate feedback
does not name `ci-minimum`, finish immediately without running commands or changing files. Otherwise, diagnose whether
the dependency bump caused the failure and make only the smallest source, test, or non-dependency configuration
adaptation needed for a non-breaking API change. Do not edit any `package.json`, `package-lock.json`, overrides,
`docs/dependencies.md`, or generated `next-env.d.ts`. Do not update, install, remove, or audit dependencies. Stop and
report the blocker without speculative changes if the failure is unrelated, flaky, or requires a breaking migration.
Finish when the smallest adaptation is ready for the configured gate to rerun.
```

Restore `.turbo-spec/system_prompts/dependency-bump.md` to dependency resolution only.

- [ ] **Step 4: Replace persisted metadata state with self-cleaning gate steps**

Remove the CI output and post-command from `document_overrides`. Add the same metadata scope command before lint and
after components unit:

```yaml
- name: dependency-metadata-before
  command: &dependency-metadata-check
    - sh
    - -c
    - >-
      metadata_status="$(git status --porcelain --untracked-files=all -- ':(glob)**/package.json' package-lock.json
      docs/dependencies.md)" || exit 2; if test -n "$metadata_status"; then git restore --source=HEAD --staged
      --worktree -- ':(glob)**/package.json' package-lock.json docs/dependencies.md || exit 2; git clean -f --
      ':(glob)**/package.json' package-lock.json docs/dependencies.md || exit 2; printf '%s\n' "$metadata_status" >&2;
      exit 1; fi

# lint, build, components unit

- name: dependency-metadata-after
  command: *dependency-metadata-check
```

The command restores forbidden changes before returning failure, so WorktreeCommitter cannot commit them and make them
look clean on resume.

Wrap `npm run build` in `sh`, preserve its exit code, and always restore
`packages/components-react/projects/nextjs/next-env.d.ts` before exiting. Return exit `2` if restoration fails. Commit
the generated `root-params` reference that the current Next.js build expects in that file.

- [ ] **Step 5: Re-run the structural check**

Run the command from Step 1.

Expected: PASS.

- [ ] **Step 6: Test routing and metadata scope**

```bash
uv run --project /Users/FNN57BH/Developer/turbo-spec pytest -q \
  /Users/FNN57BH/Developer/turbo-spec/tests/unit/executor/test_gate_failure_routing.py::test_stage_gate_bare_target_agent_stays_in_executor
```

Run the metadata command in a temporary Git repository. It must pass when clean; after changing tracked `package.json`
and creating an untracked nested `package.json`, it must restore/remove both and return exit `1`.

- [ ] **Step 7: Validate and format**

```bash
uv run --project /Users/FNN57BH/Developer/turbo-spec \
  --directory "$PWD" \
  workflow-skeleton validate .turbo-spec/workflows/dependency-bump.yml
npx prettier --check \
  .turbo-spec/system_prompts/dependency-bump.md \
  .turbo-spec/system_prompts/dependency-ci-repair.md \
  docs/superpowers/specs/2026-08-06-dependency-bump-ci-verification-design.md \
  docs/superpowers/plans/2026-08-06-dependency-bump-ci-verification.md
git --no-pager diff --check
```

Expected: all commands exit `0`.

- [ ] **Step 8: Commit the final repair design**

```bash
git add \
  .turbo-spec/workflows/dependency-bump.yml \
  .turbo-spec/system_prompts/dependency-bump.md \
  .turbo-spec/system_prompts/dependency-ci-repair.md \
  packages/components-react/projects/nextjs/next-env.d.ts \
  docs/superpowers/specs/2026-08-06-dependency-bump-ci-verification-design.md \
  docs/superpowers/plans/2026-08-06-dependency-bump-ci-verification.md
git commit -m "fix(turbospec): keep CI repair in verification" \
  -m "Co-authored-by: Copilot App <223556219+Copilot@users.noreply.github.com>"
```

## Final Verification

```bash
uv run --project /Users/FNN57BH/Developer/turbo-spec \
  --directory "$PWD" \
  workflow-skeleton validate .turbo-spec/workflows/dependency-bump.yml
npx prettier --check \
  .turbo-spec/system_prompts/dependency-bump.md \
  .turbo-spec/system_prompts/dependency-ci-repair.md \
  docs/superpowers/specs/2026-08-06-dependency-bump-ci-verification-design.md \
  docs/superpowers/plans/2026-08-06-dependency-bump-ci-verification.md
git --no-pager diff --check
git --no-pager status --short
```

Expected: blueprint validation and formatting pass, `git diff --check` reports nothing, and the worktree is clean.
