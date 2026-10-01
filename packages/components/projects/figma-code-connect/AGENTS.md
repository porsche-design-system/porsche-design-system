# AGENTS.md — Figma Code Connect

> This file provides context for AI coding assistants working in `packages/components/projects/figma-code-connect/`. See
> the components [`AGENTS.md`](../../AGENTS.md) and the root [`AGENTS.md`](../../../../AGENTS.md) for wider guidance.

## Overview

`@porsche-design-system/figma-code-connect` keeps Figma's Dev Mode snippets (Code Connect records) in step with the
components. It generates one template per component and label from component-meta (`figma:generate`, which pulls the
Figma library into memory and needs `FIGMA_ACCESS_TOKEN` in the environment) and publishes them (`figma:publish`). A
template reads each prop and slot by its PDS name when the snippet renders, so a property the Figma component lacks is
left out of the snippet and shows up once design adds it. Everything generated lands in `generated/`, which git ignores;
nothing pulled from Figma is written anywhere but the test fixture `tests/unit/fixtures/library.json`
(`npm run figma:freeze`). Run every command from this folder or with
`--workspace=@porsche-design-system/figma-code-connect`.

```
figma/                  # the rules and the render (generate.ts), the messages, the baseline, the helpers
scripts/                # figmaPull.ts (the pull, in memory), figmaGenerate.ts, figmaConnect.ts (the CLI wrapper)
tests/unit/             # the reader, the generator, a snapshot of every generated file: `npm run test:unit`
figma*.config.json      # one Code Connect config per label; figma.config.json also names the library
generated/              # templates/, icons/ — ignored by git
```

## Figma Code Connect coverage

`npm run figma:generate` reports every PDS prop, slot and allowed value the Figma component has no property or option
for, and every PDS component with no Figma component set at all, unless `figma/coverage-baseline.json` lists it. A pull
request never fails on it, and nothing is held back for it: every component publishes, and after the merge the Figma
Code Connect workflow sends each such gap to design on Slack. Background:
[`docs/runbooks/figma-code-connect.md`](../../../../docs/runbooks/figma-code-connect.md).

When you add or rename a prop, a slot, an allowed value or a component:

1. Run `npm run figma:generate` (needs `FIGMA_ACCESS_TOKEN` in the environment) and read the lines starting with
   `design:`. Without a token, they reach you after the merge, in the workflow's issue "Figma Code Connect: action
   needed".
2. If the prop changes what the component looks like, leave the line alone. Design adds the property after the merge.
   The same goes for a new component (`design: p-foo: add a component set named "foo"`): design adds the set.
3. If Figma will never carry it, ask the user before accepting it. Typical cases are native HTML attributes (`href`,
   `target`, `autoComplete`, `maxLength`), behaviour (`open`, `disableBackdropClick`), i18n objects (`intl`), and a
   component drawn inside its parent's set or not drawable at all (table parts, items, `p-icon`). Once agreed, add the
   printed name to the component's array in `figma/coverage-baseline.json`, creating the tag's key if needed, run
   `npm run figma:generate` so the file is sorted, and name the added line in the PR description.
4. Names are the Figma property the gap needs: a prop by its own name (`iconSource`), a slot as `slot-<name>`
   (`slot-footer`), the default slot as `slot-default`, an allowed value Figma has no option for as `prop=value`
   (`variant=destructive`), a Figma option PDS does not allow as `prop=value` too (`type=mixed`; the option stays out of
   the snippet), a PDS icon the library lacks as `name=<icon>` under `p-icon`, and a component with no set as
   `component-set`.
5. Run `npm run test:unit -- -u` and commit what changed in `tests/unit/specs/__snapshots__/`: CI fails on a generated
   file that differs from its snapshot, and the diff is the template change the next publish uploads. After the library
   itself changes, run `npm run figma:freeze` first.

Never add a line to silence a gap design is expected to fix, and never re-seed the file from the current gaps. The
generator deletes an entry once Figma has the property or the prop is gone; delete one by hand only to ask design for
that property after all.
