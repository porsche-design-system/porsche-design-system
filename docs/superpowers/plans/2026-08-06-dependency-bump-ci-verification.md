# Dependency Bump CI Verification Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or
> superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add deterministic minimum CI checks to the TurboSpec dependency-bump workflow and invoke the existing agent
only when a reproducible check fails.

**Architecture:** Split deterministic dependency selection from the existing dependency agent so a CI retry cannot bump
versions again. Add one agentless, fail-fast verification stage after the existing cleanup and documentation stages;
validation failures loop back to the existing agent and re-run every downstream consistency stage.

**Tech Stack:** TurboSpec workflow YAML, TurboSpec `script_gate`, Markdown system prompts, npm scripts

## Global Constraints

- Always run `npm run lint`, `npm run build`, and `npm run test:unit:components` in that order.
- Keep the PR Gates responsible for the complete test matrix; add no package classifier, browser suite, helper script,
  or dependency.
- Invoke no additional agent when all three checks pass.
- Give `ci-minimum` validation failures two repair retries.
- Escalate environment, timeout, and command-invocation failures without an agent retry.
- CI repair may change only the smallest source, test, or configuration surface needed for a non-breaking dependency API
  change.
- CI repair must not change `package.json`, `package-lock.json`, dependency versions, overrides, or dependency
  documentation.
- Persist CI repair mode in declared stage output so later resolver-gate feedback and workflow resume cannot clear it.
- Compare all non-ignored package manifests, the lockfile, and dependency documentation with their post-cleanup Git
  object hashes before accepting a repair.
- TurboSpec may still open a pull request when the minimum gate remains red.

## File Map

- Modify `.turbo-spec/workflows/dependency-bump.yml`: split the update and resolution stages, then add the final
  verification gate.
- Modify `.turbo-spec/system_prompts/dependency-bump.md`: add the conditional, source-only CI repair contract.
- No production source, dependency manifest, lockfile, runbook, or helper script changes.

---

### Task 1: Isolate the Agent Retry Target

**Files:**

- Modify: `.turbo-spec/workflows/dependency-bump.yml:12-61`
- Modify: `.turbo-spec/system_prompts/dependency-bump.md:1-9`

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

- [ ] **Step 3: Add the conditional CI repair contract**

Replace `.turbo-spec/system_prompts/dependency-bump.md` with:

```markdown
Goal: leave the repository with all eligible npm dependency versions updated, a consistent lockfile, and passing
dependency checks. Before normal dependency resolution, inspect the Previous Attempt / Gate feedback. If that feedback
names `ci-minimum`, confirm the dependency bump caused the failure and make only the smallest source, test, or
configuration adaptation needed for a non-breaking dependency API change; do not edit `package.json`,
`package-lock.json`, dependency versions, overrides, or dependency documentation, and stop if the failure is unrelated,
flaky, or requires a breaking migration. Otherwise, Syncpack has already updated dependency versions before you start,
so run `npm install` once. If `npm install` succeeds without `ERESOLVE`, finish immediately without inspecting or
changing overrides or documentation. If `npm install` fails with `ERESOLVE` because a third-party peer range conflicts
with pinned versions, add the smallest scoped, pinned `overrides` entry in the root `package.json`, following existing
patterns such as `madge > typescript` and per-major keys such as `minimatch@9`. After changing an override, delete both
`package-lock.json` and `node_modules`, then rerun `npm install` so stale transitive entries cannot survive. Outside
`ci-minimum` repair, you may edit only the root `package.json` override needed for that `ERESOLVE`, the regenerated
`package-lock.json`, and documentation that describes that override. Do not run `npm audit`, `npm audit fix`, or any
security-advisory investigation; do not inspect, remove, revalidate, or update existing overrides. Never use `--force`
or `--legacy-peer-deps`, and never manually edit dependency versions or change held-back dependencies. Stop and report
the blocker if the conflict requires a major breaking upgrade, touches a held-back dependency, or cannot be resolved
with a scoped pinned override; otherwise, you are done when `npm install` succeeds and the repository is ready for the
configured format and lint gates.
```

- [ ] **Step 4: Re-run the structural check**

Run the command from Step 1.

Expected: PASS.

- [ ] **Step 5: Validate the intermediate blueprint and prompt**

```bash
uv run --project /Users/FNN57BH/Developer/turbo-spec \
  --directory "$PWD" \
  workflow-skeleton validate .turbo-spec/workflows/dependency-bump.yml
npx prettier --check .turbo-spec/system_prompts/dependency-bump.md
git --no-pager diff --check
```

Expected: all commands exit `0`.

- [ ] **Step 6: Commit the retry boundary**

```bash
git add .turbo-spec/workflows/dependency-bump.yml .turbo-spec/system_prompts/dependency-bump.md
git commit -m "refactor(turbospec): isolate dependency resolution" \
  -m "Co-authored-by: Copilot App <223556219+Copilot@users.noreply.github.com>"
```

### Task 2: Add the Agentless Minimum CI Gate

**Files:**

- Modify: `.turbo-spec/workflows/dependency-bump.yml:128-135`

**Interfaces:**

- Consumes: stage `document_overrides` and agent `resolve_dependencies/dependency_updater`.
- Produces: final agentless stage `verify_ci` and gate `ci-minimum`.

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

- [ ] **Step 2: Add the final verification stage**

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

Expected: PASS. The empty `agents` assertion proves a green `verify_ci` stage cannot invoke a model.

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

### Task 3: Harden CI Repair Boundaries

**Files:**

- Modify: `.turbo-spec/workflows/dependency-bump.yml`
- Modify: `.turbo-spec/system_prompts/dependency-bump.md`
- Modify: `docs/superpowers/specs/2026-08-06-dependency-bump-ci-verification-design.md`
- Modify: `docs/superpowers/plans/2026-08-06-dependency-bump-ci-verification.md`

**Interfaces:**

- Consumes: `document_overrides` stage output persistence and Git's native `ls-files` and `hash-object` commands.
- Produces: persisted `document_overrides.ci_repair.active` context and deterministic metadata write-scope evidence.

- [ ] **Step 1: Run a structural check that fails before hardening**

```bash
uv run --project /Users/FNN57BH/Developer/turbo-spec python - <<'PY'
from pathlib import Path
import yaml

workflow = yaml.safe_load(Path(".turbo-spec/workflows/dependency-bump.yml").read_text())
stages = {stage["name"]: stage for stage in workflow["stages"]}
update = stages["update_dependencies"]
document = stages["document_overrides"]
verify = stages["verify_ci"]
gate = verify["quality_gates"][0]
prompt = Path(".turbo-spec/system_prompts/dependency-bump.md").read_text()
assert gate["on_fail"] == "escalate"
assert document["outputs"]["ci_repair"] == ".turbo-spec/out/ci-repair.json"
assert "git hash-object --stdin-paths" in document["post_command"]
assert "cmp .turbo-spec/out/ci-metadata.hashes" in verify["post_command"]
assert "ci-repair.json" in update["pre_command"]
assert "document_overrides.ci_repair.active" in prompt
PY
```

Expected: FAIL because no persisted repair state or metadata scope exists.

- [ ] **Step 2: Persist repair mode and the post-cleanup metadata baseline**

Change `update_dependencies.pre_command` so every fresh run clears prior CI state before updating:

```yaml
pre_command: >-
  rm -f .turbo-spec/out/ci-repair.json .turbo-spec/out/ci-metadata.paths .turbo-spec/out/ci-metadata.hashes
  .turbo-spec/out/ci-metadata-current.paths .turbo-spec/out/ci-metadata-current.hashes && npm run npm:update:all
```

Add this stage-level state capture to `document_overrides`:

```yaml
post_command: >-
  mkdir -p .turbo-spec/out && if test ! -f .turbo-spec/out/ci-metadata.paths || test ! -f
  .turbo-spec/out/ci-metadata.hashes; then git ls-files --cached --others --exclude-standard ':(glob)**/package.json'
  package-lock.json docs/dependencies.md | LC_ALL=C sort -u > .turbo-spec/out/ci-metadata.paths && git hash-object
  --stdin-paths < .turbo-spec/out/ci-metadata.paths > .turbo-spec/out/ci-metadata.hashes; fi && printf '%s\n'
  '{"active":true}' > .turbo-spec/out/ci-repair.json
outputs:
  ci_repair: .turbo-spec/out/ci-repair.json
```

- [ ] **Step 3: Escalate fallback failures and enforce metadata scope**

Set `verify_ci.quality_gates[0].on_fail` to `escalate`. Keep `failure_verdict: loop_back`, which lets an exit-code-1
validation result override the fallback.

Add this stage-level post-command to `verify_ci`:

```yaml
post_command: >-
  git ls-files --cached --others --exclude-standard ':(glob)**/package.json' package-lock.json docs/dependencies.md |
  LC_ALL=C sort -u > .turbo-spec/out/ci-metadata-current.paths && git hash-object --stdin-paths <
  .turbo-spec/out/ci-metadata-current.paths > .turbo-spec/out/ci-metadata-current.hashes && cmp
  .turbo-spec/out/ci-metadata.paths .turbo-spec/out/ci-metadata-current.paths && cmp .turbo-spec/out/ci-metadata.hashes
  .turbo-spec/out/ci-metadata-current.hashes
```

- [ ] **Step 4: Make CI repair mode persistent in the agent contract**

Change the prompt's mode selection to this exact contract:

```markdown
Before normal dependency resolution, inspect the Previous Attempt / Gate feedback. Treat the task as CI repair when that
feedback names `ci-minimum` or task context contains `document_overrides.ci_repair.active: true`. During CI repair,
confirm the dependency bump caused the failure and make only the smallest source, test, or configuration adaptation
needed for a non-breaking dependency API change; do not edit `package.json`, `package-lock.json`, dependency versions,
overrides, dependency documentation, or `.turbo-spec/out/ci-*` evidence, and stop if the failure is unrelated, flaky, or
requires a breaking migration.
```

- [ ] **Step 5: Re-run the structural check**

Run the command from Step 1.

Expected: PASS.

- [ ] **Step 6: Execute the YAML metadata hooks and fault-inject a mismatch**

Run `document_overrides.post_command` from the parsed YAML, confirm it writes one active JSON output plus 47 matching
path/hash entries, then run `verify_ci.post_command`.

Append one test line to the ignored baseline hash file and run `verify_ci.post_command` again.

Expected: unchanged metadata passes; the tampered hash fails at `cmp`. Remove only the five
`.turbo-spec/out/ci-{repair,metadata}*` test files afterward.

- [ ] **Step 7: Validate and format the hardened workflow**

```bash
uv run --project /Users/FNN57BH/Developer/turbo-spec \
  --directory "$PWD" \
  workflow-skeleton validate .turbo-spec/workflows/dependency-bump.yml
npx prettier --check \
  .turbo-spec/system_prompts/dependency-bump.md \
  docs/superpowers/specs/2026-08-06-dependency-bump-ci-verification-design.md \
  docs/superpowers/plans/2026-08-06-dependency-bump-ci-verification.md
git --no-pager diff --check
```

Expected: all commands exit `0`.

- [ ] **Step 8: Commit the hardened boundaries**

```bash
git add \
  .turbo-spec/workflows/dependency-bump.yml \
  .turbo-spec/system_prompts/dependency-bump.md \
  docs/superpowers/specs/2026-08-06-dependency-bump-ci-verification-design.md \
  docs/superpowers/plans/2026-08-06-dependency-bump-ci-verification.md
git commit -m "fix(turbospec): harden CI repair boundaries" \
  -m "Co-authored-by: Copilot App <223556219+Copilot@users.noreply.github.com>"
```

## Final Verification

```bash
uv run --project /Users/FNN57BH/Developer/turbo-spec \
  --directory "$PWD" \
  workflow-skeleton validate .turbo-spec/workflows/dependency-bump.yml
npx prettier --check .turbo-spec/system_prompts/dependency-bump.md
git --no-pager diff --check
git --no-pager status --short
```

Expected: blueprint validation and formatting pass, `git diff --check` reports nothing, and the worktree is clean.
