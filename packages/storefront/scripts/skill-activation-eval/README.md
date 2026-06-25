# Skill activation eval (offline)

Offline tuning harness for the auto-activation `description` of the
`porsche-design-system-docs` skill. It replays a fixed set of positive and negative
prompts against a throwaway fixture project with the committed `js` skill installed, runs
headless Claude Code per prompt, and reports whether the skill activated.

It exists to **tune** `ACTIVATION_DESCRIPTION` in
[`../../src/lib/skill/skillMd.ts`](../../src/lib/skill/skillMd.ts) so the skill fires
broadly on UI/frontend work without over-firing on backend/non-UI, tooling, prose,
foreign-library, or opt-out prompts.

> **Not a CI gate.** Model output is stochastic, so a single mismatch must never fail a
> release build. This harness is run **manually/offline only** and is deliberately not
> wired into any CI workflow or `test:unit` script. The drift, completeness, reference-link
> and installation gates are the blocking checks; activation tuning is not.

## Prerequisites

- The [`claude`](https://docs.claude.com/claude-code) CLI on `PATH` (the harness shells out
  to headless Claude Code). The harness fails fast with guidance if it is missing.
- The committed `js` skill tree (`npm run build:skill` if it is absent).

## Run

```bash
# from packages/storefront
node --import tsx scripts/skill-activation-eval/run-eval.ts            # full set, 1 run each
node --import tsx scripts/skill-activation-eval/run-eval.ts --runs 3   # repeat to gauge stochasticity
node --import tsx scripts/skill-activation-eval/run-eval.ts pos        # positive set only (neg = negative)
node --import tsx scripts/skill-activation-eval/run-eval.ts --model claude-haiku-4-5 --debug
```

The report lists, per prompt, the expected outcome (`fire`/`dormant`), how many runs
activated the skill, and `OK`/`MISMATCH`. With `--runs N` a prompt counts as matching when
its **majority** outcome equals the expectation. The process exits non-zero on any mismatch
purely to make manual runs easy to scan — that exit code is not consumed by CI.

## Prompt sets

The fixed sets live in [`prompts.ts`](./prompts.ts):

- **Positive** — explicit PDS work plus implicit UI work where PDS should be preferred:
  add a Porsche button, style a card, upgrade PDS, build a settings form, data tables,
  dialogs, tokens, page scaffolding, review/fix, fonts/icons.
- **Negative** — backend/non-UI, unrelated tests/tooling, pure content/docs, a foreign UI
  library (Material UI), and an explicit opt-out.

Tuning loop: run the harness → adjust `ACTIVATION_DESCRIPTION` → regenerate the committed
trees (`npm run build:skill`) and re-bless the drift snapshot (`vitest -u`) → re-run.

## How activation is detected

Each prompt is sent with `--output-format stream-json`; the harness scans the event log for
an assistant `Skill` tool call referencing `porsche-design-system-docs`. Runs use
`--permission-mode plan` so no files are modified, and `--max-turns 4` to bound cost.
