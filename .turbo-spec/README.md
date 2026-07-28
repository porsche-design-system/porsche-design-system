# `.turbo-spec/`

Consumer-side [turbo-spec](https://github.com/porsche-code/turbo-spec) workflow
blueprints for this repository. turbo-spec resolves consumer-first: a blueprint at
`.turbo-spec/workflows/<name>.yml` takes precedence over the engine's packaged
builtins.

## Workflows

- [`workflows/dependency-bump.yml`](workflows/dependency-bump.yml) —
  a turbo-spec-native **proposal** for the weekly npm dependency bump. It expresses
  the deterministic dependency work (install, build, syncpack bump, verify) as
  `kind: script` nodes and keeps a single LLM agent for the one judgement step:
  resolving the root cause of an `npm install` failure.
  It is a proposal **alongside**
  [`.github/workflows/weekly-dependency-agent.yml`](../.github/workflows/weekly-dependency-agent.yml),
  not a replacement — see that workflow and
  [`docs/runbooks/dependency-updates-agent.md`](../docs/runbooks/dependency-updates-agent.md).

### PR lifecycle is engine-owned

The blueprint does **not** hand-roll git or `gh`. A `kind: script` step is denied
write-capable GitHub tokens by design (the executor scrubs `GITHUB_TOKEN` because
npm scripts can run arbitrary dependency code), and its command is never templated.
Instead the run is launched with the engine's `--create-pr`, which opens a draft PR
up front, auto-commits and pushes the worktree after every stage, and finalizes the
PR **ready on success / kept draft on failure**. The two terminal nodes therefore
do no git/gh work: the success terminal (`verify_bump`) runs `npm run npm:lint`
(syncpack lint) to assert dependency versions are **consistent across all workspaces**
after the bump — a different, non-redundant question from `try_install` (a monorepo can
install cleanly yet be internally inconsistent). It honours `.syncpackrc.json`, exits 0
on a consistent tree, and its success records `outcome: pr_opened` /
`outcomes.final = pr_opened`. It runs under `on_error: abort`, so the gate genuinely
gates (see the caveat below). The exhausted terminal re-runs the still-failing
`npm run npm:install` so the real ERESOLVE output lands in the trace and PR summary, and
the failing run leaves the PR as a draft.

**Conservative-outcome caveat:** if the agent pins a dependency back in the root manifest
but not in every workspace declaring it, `syncpack lint` fails, the stage aborts, the run
fails, and the engine keeps the PR **draft** — so an agent-repaired-but-inconsistent bump
lands as a draft. On that failure path `pr_opened` is recorded in `outcomes.reached` with
`success: false` and is **not** the final outcome (`outcomes.final` is null) — the
anti-laundering behaviour the trace is designed for. That is the correct
conservative result for an inconsistent bump.

**Deliberate narrowing of the original request:** the exhausted path opens a draft
PR only — it does **not** file a separate manual-resolution issue. Issue creation
cannot work in this model (`--create-issue` is mutually exclusive with
`--create-pr`, and a script step has no write token), and the draft PR by itself
signals "needs manual resolution". Notifying a human on a non-zero engine exit
belongs to the thin GitHub Actions cron that schedules the run, not to the pipeline.

## Engine prerequisite

`kind: script` and `outcome:` are **not** in a
released turbo-spec. They ship in open PR
[porsche-code/turbo-spec#1398](https://github.com/porsche-code/turbo-spec/pull/1398)
(`deterministic-script-node`). Until that lands, the blueprint validates and runs
only against that branch.

## Running

```bash
workflow-skeleton validate .turbo-spec/workflows/dependency-bump.yml
workflow-skeleton run      .turbo-spec/workflows/dependency-bump.yml \
  --repo porsche-design-system/porsche-design-system \
  --create-pr
```

`--create-pr` is required for real use: it is what opens the draft PR, commits and
pushes each stage's changes, and marks the PR ready (success) or leaves it draft
(failure). It needs `GITHUB_TOKEN` and is mutually exclusive with `--pr`,
`--branch` and `--create-issue`.

## CI wiring

Three thin consumer shims in [`.github/workflows/`](../.github/workflows/) drive the
blueprint in GitHub Actions (adapted from the turbo-spec onboarding example in
porsche-design-system#4589):

- [`weekly-dependency-bump-turbospec.yml`](../.github/workflows/weekly-dependency-bump-turbospec.yml) —
  the engine **driver**. `workflow_dispatch`-only; calls the reusable
  `engine.yml` with `blueprint: dependency-bump`. (The weekly cadence itself
  stays with the existing `weekly-dependency-agent.yml` cron — this shim is the manual
  and resume entry point, not a second scheduler.)
- [`ai-watch.yml`](../.github/workflows/ai-watch.yml) — watches the driver for
  failures and either LLM-explains them on the PR or auto-resumes the session.
- [`comment-router.yml`](../.github/workflows/comment-router.yml) — routes human PR
  feedback (`/agent …`, `/approve`, `/reject`, reviews) back into the saved session.

All three pin the reusable turbo-spec workflows to
**`@deterministic-script-node`** (PR #1398), and the driver additionally passes
`engine_ref: deterministic-script-node` so the engine *code* checkout matches the
pinned workflow ref. This is the CI counterpart of the prerequisite above: on a
released engine (or `@main`) the `kind: script` nodes do not
exist and the run fails. Swap all three pins — and `engine_ref` — to a release tag
once PR #1398 ships. (`actionlint` flags the `copilot-requests: write` permission as
unknown; it is a real, newer GitHub scope the engine needs, just newer than
actionlint's built-in list.)

## Timeouts

Every `kind: script` stage sets its own explicit `timeout:`, measured from a real
run (`install_baseline` 20m, `build` 45m, `bump_versions` 5m, `try_install` 20m,
`verify_bump` 5m). This is deliberate: the engine
resolves a script step's ceiling as `stage.timeout or settings.timeout_per_stage
or 300s`, so a stage without its own `timeout:` silently inherits the 60m global —
a 25-second `syncpack update` would then hang for an hour before being killed.
`settings.timeout_per_stage: 60m` is therefore only a backstop; it governs no stage
today and does **not** bound the agent stage. An agent stage *may* declare `timeout:`
(it validates), but nothing consumes it: the resolver that would apply it,
`WorkflowRunner._resolve_timeout`, has no production caller, so both `stage.timeout`
and this setting are inert on agent stages — an agent turn is bounded solely by the
engine's `WORKER_TIMEOUT_SECONDS` (3600s, env `TURBO_SPEC_WORKER_TIMEOUT`).

## Naming

The two files are deliberately named for their different jobs:

- **`.turbo-spec/workflows/dependency-bump.yml`** is the *blueprint* — the recipe for
  **how** to bump dependencies. It is cadence-agnostic and reusable, so it carries no
  "weekly" in its name.
- **`.github/workflows/weekly-dependency-bump-turbospec.yml`** is the *execution* — the
  **weekly** run of that recipe via turbo-spec, sitting alongside the existing
  `weekly-dependency-agent.yml`.

⚠️ `ai-watch.yml` matches the driver by its **display name** (`workflows: ["TurboSpec |
Weekly Dependency Bump"]`), not its filename. If the driver's `name:` is ever changed
without updating that list the watcher does not error — it silently never fires. Keep
the two strings identical.

## Verifying the agent's fix

The agent stage carries a `script_gate` quality gate that re-runs `npm run npm:install`
after the agent's turn and loops back — re-running the agent with the install output as
feedback — when it still fails. `max_retries: 2` gives exactly **three agent turns**,
each followed by a real install. This gate is the *only* retry loop: an earlier revision
nested it inside a `kind: decision` backward loop, which multiplied the two budgets (up
to 6 turns) and ran two installs per turn.

**Escalation needs no stage.** When the budget is spent the engine logs "Retry budget
exhausted", aborts, and — with no terminal report stage — ends the run. A failed run
means `finalize_pr(success=False)`, so the engine **keeps the PR as a draft**: exactly
the "open draft PR for manual resolution" terminal, without a stage to express it. The
gate's failure output is preserved in the trace (≤4000 chars in its `reason`, the full
output in `GateResult.details`).

`try_install` is kept deliberately, and not only for correctness: the agent's
`condition` reads its `success`, and a condition-false stage is skipped *before* it
executes, so its gate never runs either. Without that cheap (~14s) probe the agent would
run on every weekly bump — roughly 10 minutes and $0.70 of model time, and an LLM
mutating the repo, on weeks when nothing is broken. With the syncpack minor-cap in place
that green path is the expected weekly outcome.

Note the gate step is **unbounded** — `script_gate` runs its steps with `timeout=None`
and exposes no per-step timeout knob, unlike every `kind: script` stage above.

Measured in run #4633 (the gate-driven topology, end to end against a real checkout):
the gate added **~15s** to the agent stage (27:05 total vs 26:50 for the agent turn
itself), so verification is close to free relative to a model turn. That run's gate
passed on the first turn, so the loop-back path — a `script_gate` *failure* re-running
the stage — has not yet been observed in a real run.
