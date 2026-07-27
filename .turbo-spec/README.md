# `.turbo-spec/`

Consumer-side [turbo-spec](https://github.com/porsche-code/turbo-spec) workflow
blueprints for this repository. turbo-spec resolves consumer-first: a blueprint at
`.turbo-spec/workflows/<name>.yml` takes precedence over the engine's packaged
builtins.

## Workflows

- [`workflows/weekly-dependency-bump.yml`](workflows/weekly-dependency-bump.yml) —
  a turbo-spec-native **proposal** for the weekly npm dependency bump. It expresses
  the deterministic dependency work (install, build, syncpack bump, retry-install,
  routing, PR/issue mechanics) as `kind: script` / `kind: decision` nodes and keeps
  a single LLM agent for the one judgement step: resolving the root cause of an
  `npm install` failure. It is a proposal **alongside**
  [`.github/workflows/weekly-dependency-agent.yml`](../.github/workflows/weekly-dependency-agent.yml),
  not a replacement — see that workflow and
  [`docs/runbooks/dependency-updates-agent.md`](../docs/runbooks/dependency-updates-agent.md).

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
  --repo porsche-design-system/porsche-design-system
```
