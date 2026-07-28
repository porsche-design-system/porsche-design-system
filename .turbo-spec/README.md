# `.turbo-spec/`

Consumer-side [turbo-spec](https://github.com/porsche-code/turbo-spec) workflow
blueprints for this repository. turbo-spec resolves consumer-first: a blueprint at
`.turbo-spec/workflows/<name>.yml` takes precedence over the engine's packaged
builtins.

## Workflows

- [`workflows/weekly-dependency-bump.yml`](workflows/weekly-dependency-bump.yml) —
  a turbo-spec-native **proposal** for the weekly npm dependency bump. It expresses
  the deterministic dependency work (install, build, syncpack bump, retry-install,
  routing) as `kind: script` / `kind: decision` nodes and keeps a single LLM agent
  for the one judgement step: resolving the root cause of an `npm install` failure.
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
carry only a minimal, honest signal: the success terminal is a zero-exit **marker**
step (`echo …`) whose sole job is to tag the terminal so the trace records
`outcome: pr_opened` / `outcomes.final = pr_opened` — the engine already did the PR
work, so the terminal only names the outcome; the exhausted terminal re-runs the
still-failing `npm run npm:install` so the real ERESOLVE output lands in the trace
and PR summary, and the failing run leaves the PR as a draft.

**Deliberate narrowing of the original request:** the exhausted path opens a draft
PR only — it does **not** file a separate manual-resolution issue. Issue creation
cannot work in this model (`--create-issue` is mutually exclusive with
`--create-pr`, and a script step has no write token), and the draft PR by itself
signals "needs manual resolution". Notifying a human on a non-zero engine exit
belongs to the thin GitHub Actions cron that schedules the run, not to the pipeline.

## Engine prerequisite

`kind: script`, `kind: decision`, backward routing and `outcome:` are **not** in a
released turbo-spec. They ship in open PR
[porsche-code/turbo-spec#1398](https://github.com/porsche-code/turbo-spec/pull/1398)
(`deterministic-script-node`). Until that lands, the blueprint validates and runs
only against that branch.

## Running

```bash
workflow-skeleton validate .turbo-spec/workflows/weekly-dependency-bump.yml
workflow-skeleton run      .turbo-spec/workflows/weekly-dependency-bump.yml \
  --repo porsche-design-system/porsche-design-system \
  --create-pr
```

`--create-pr` is required for real use: it is what opens the draft PR, commits and
pushes each stage's changes, and marks the PR ready (success) or leaves it draft
(failure). It needs `GITHUB_TOKEN` and is mutually exclusive with `--pr`,
`--branch` and `--create-issue`.
