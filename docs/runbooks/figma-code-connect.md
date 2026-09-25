# Figma Code Connect — pull, generate, preview, publish

How this repository talks to Figma so that Dev Mode and the Figma MCP server show PDS snippets instead of generated
markup. Everything below runs from `packages/components` against the library named by `fileUrl` in
`figma/components.json`. State as of 2026-09-24: that is the published copy `bEXOI0BAd6pXjvIG1mpWIN` used for the
end-to-end test; the production library is `EkdP468u4ZVuIRwalKCscb`, and the switch is a pull from production plus a
regeneration, made last.

## What Code Connect does

When a designer selects a component instance in Figma's Dev Mode, Figma shows a code snippet. Without Code Connect it
invents one. With Code Connect, Figma runs a small JavaScript **template** that we publish per component and label and
shows its output, `<p-button icon="close" variant="primary" hide-label="true">Some Label</p-button>`, with the values
taken from the selected instance. The same snippet is what the Figma MCP server hands to an agent implementing a design.

A template reads the instance's Figma properties by name (`getEnum('variant', …)`, `getInstanceSwap('icon')`,
`getSlot('slot-default')`) and prints PDS markup. **A template can only read a property the Figma component has.** A
read of a missing property does not fail: the runtime returns an object that prints as an empty string and is truthy, so
a renamed boolean property makes every instance emit `disabled="true"`, and Dev Mode shows an inline "Property not
found" pill. That is why the generator never writes such a read, and why the patched publish validation (below) refuses
a record that would.

## The workflow

```
   PULL                          GENERATE                              PREVIEW + VALIDATE               PUBLISH (per record)
 Figma ──► figma/components.json ──► component-meta × snapshot ──► *.figma.ts ──► Figma renders each template ──► accepted → figma connect publish --force
 (REST, 3–4 requests) what Figma looks like  rules + exceptions        4 labels each  and validates its property names   refused → held back, listed, exit 0
                                             design lines for the rest
```

1. **Pull** — `npm run figma:pull` writes the library's published component sets, their property definitions and the
   names of the published icon components into `figma/components.json`, the **snapshot**. That file is the developer's
   record of what Figma looked like when they last looked.
2. **Generate** — `npm run figma:generate` walks component-meta: every PDS prop and slot looks up the Figma property of
   its own name in the snapshot (`figma/derive.ts`) and is placed by the library's conventions, the **rules**: `fig*`
   properties are design-only and ignored, `slot-*` properties render as children, `showLabel` inverts onto `hideLabel`,
   INSTANCE_SWAP reads the swapped icon's own record gated by its `fig<Prop>` toggle, TEXT feeds a string attribute (a
   number attribute, `activePage={2}`, for a numeric prop), VARIANT `false`/`true` is a boolean attribute, any other
   VARIANT an identity enum over the options PDS allows. `figma/exceptions.ts` holds only the exceptions. Not expected
   in Figma: props flagged `isAria`, anything deprecated, deprecated values; form participation (`form`, `name`,
   `value`) is optional, mapped when drawn and never asked for, required or not: a `value` TEXT property has no text
   layer to feed and Figma flags it as unused. Everything else is a **design line**: a PDS prop, slot or allowed value
   Figma lacks, unless `figma/coverage-baseline.json` accepts it
   (`"compact" has no Figma BOOLEAN property — add it in Figma`, `"variant=destructive" has no Figma option`); a PDS
   component with no Figma component set at all, unless the baseline accepts it with the entry `component-set`
   (`p-sheet has no Figma component set — add it in Figma`); or a Figma property no rule places
   (`"dense" (VARIANT) has no PDS prop — fix it in Figma`, `"variant" has values PDS does not allow: ghost`,
   `"weight" is deprecated in PDS`, `"variant" has values deprecated in PDS: tertiary`, the last two so that snippets
   stop emitting deprecated API). Design lines print and never fail. The result is four templates per component
   (`Web Components`, `React`, `Angular`, `Vue`) next to the component source, plus the icon batches
   `figma/icons/p-icon{,.react,.angular,.vue}.figma.batch.{ts,json}`, one record per PDS icon and label. Every
   template's `// source=` and first `imports` entry are the component's docs API URL
   (`https://designsystem.porsche.com/v4/components/<root>/api`, root resolved through `requiredParent`), because that
   is what the MCP server hands to agents as the component's origin. `-- --check` fails only on a repository mistake: a
   stale template or baseline, an exception naming a prop or value component-meta rejects, two Figma properties feeding
   one variable.
3. **Preview** — `npm run figma:preview` has Figma execute every template server-side at each component's default
   property values and fails on any template that does not render.
4. **Publish** — `npm run figma:publish` runs `figma:generate --check`: a stale file or an invalid exception stops it
   before any label uploads. Then, per label, it has Figma render every template (preview) and validate every property
   name and every option list against the live component (the patched dry run). Every template that passes both is
   published with `--force`, which overwrites UI records a designer created for the same node and label. A template
   Figma refuses is **held back**: it keeps its previous record and is listed. **Figma's validation is the only gate per
   record.** Exit 0 means every record Figma accepted is up; exit 1 means a developer must act: a stale file, an invalid
   exception, an unreadable template, a template Figma could not render in preview, or a token, network or CLI error.
   Labels upload one after another, so on 1 the labels before the failure may already be up.

**Publish never touches design.** The only write to Figma in this repository is `figma connect publish`, which attaches
Code Connect records to existing component nodes. No script creates, renames or restyles Figma components. Nothing
outside a Figma editing session can change a component's properties; Figma-side changes are a designer's job.

## Vocabulary

| Term               | Meaning                                                                                                                                                                                                                                                                           |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Snapshot**       | `figma/components.json`: the library's component sets, property definitions and published icon names as of the last pull.                                                                                                                                                         |
| **Template**       | A generated `*.figma.ts`, one per component per label. Never edited by hand.                                                                                                                                                                                                      |
| **Record**         | What Figma stores after a publish: one per component node and label. Dev Mode and the MCP show the record's output. The last publish per label wins.                                                                                                                              |
| **Label**          | A Dev Mode code tab: `Web Components`, `React`, `Angular`, `Vue`. One template per component per label.                                                                                                                                                                           |
| **Rule**           | A library convention in `figma/derive.ts` that places a Figma property for a PDS prop or slot without human input.                                                                                                                                                                |
| **Exception**      | A hand-written entry in `figma/exceptions.ts` that overrides the rule for one (PDS tag, Figma property).                                                                                                                                                                          |
| **Design line**    | A generator line ending in `fix it in Figma` or `add it in Figma`: a problem only design can fix. The Slack message and the issue's design section are built from these and nothing else.                                                                                         |
| **Coverage gap**   | A design line of the `add it in Figma` kind: a PDS prop, slot or allowed value with no Figma property or option of that name, or a PDS component with no Figma component set at all, outside the baseline.                                                                        |
| **Baseline**       | `figma/coverage-baseline.json`: accepted coverage gaps per PDS tag, `component-set` for a whole component. Generation only removes entries; lines are added by hand, rules in [`packages/components/AGENTS.md`](../../packages/components/AGENTS.md#figma-code-connect-coverage). |
| **Figma drift**    | The live library differs from the snapshot. Detected by `figma:pull --check`. Publish runs anyway; the drifted components' records are held back.                                                                                                                                 |
| **Template drift** | The committed templates differ from what generation would write now. Detected by `figma:generate --check`; the only check that blocks a pull request.                                                                                                                             |
| **Held back**      | A record Figma refused at publish because a property name or option list does not match the live component. The previous record stays live. The only meaning.                                                                                                                     |
| **UI record**      | A Code Connect mapping a designer created in Figma's UI, not from this repository. Publish overwrites it.                                                                                                                                                                         |
| **The issue**      | The one GitHub issue "Figma Code Connect: action needed" the workflow keeps: open while anything is pending, closed when clear. Its design section is the memory for Slack.                                                                                                       |

## Files

| Path                                                                                                 | Role                                                                                                                                                                                                                                                                                                                                                                                 |
| ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `src/components/**/<name>/figma/<name>{,.react,.angular,.vue}.figma.ts`                              | Generated templates, four per component in a `figma/` folder beside the component. Do not edit; change `figma/exceptions.ts` or the rules                                                                                                                                                                                                                                            |
| `figma.config.json`, `figma.react.config.json`, `figma.angular.config.json`, `figma.vue.config.json` | One Code Connect config per label: `include` glob, `label`, `language`                                                                                                                                                                                                                                                                                                               |
| `figma/components.json`                                                                              | The snapshot: component sets with property definitions (keys carry `#id` suffixes; only `type`, `defaultValue`, `variantOptions` are kept) and `icons` (node id → name of every published component whose name is a PDS icon name, plus unpublished INSTANCE_SWAP defaults)                                                                                                          |
| `figma/derive.ts`                                                                                    | The rules: one walk over component-meta that returns the mappings, the Figma properties no rule places, and the coverage gaps. Unit test `tests/unit/specs/figma-derive.spec.ts`                                                                                                                                                                                                     |
| `figma/exceptions.ts`                                                                                | `PropertyMapping` types and the exception list, keyed by PDS tag then Figma property. Today: two value folds (`p-model-signature` `color=contrast-higher` → `contrast-high`, `p-text-list` `type=mixed` → `unordered`)                                                                                                                                                               |
| `figma/coverage.ts`                                                                                  | The baseline side of the coverage rule: `missingComponentSets` lists the PDS components with no Figma set, `expectedProperty` says what design must add for a gap, `applyBaseline` which gaps the baseline accepts. Unit test `tests/unit/specs/figma-coverage.spec.ts`                                                                                                              |
| `figma/coverage-baseline.json`                                                                       | Per PDS tag, the Figma property names accepted as missing, or `component-set` for a component with no set: the backlog seeded 2026-09-23 (properties) and 2026-09-24 (16 components) and lines added by hand. `figma:generate` removes an entry once it is no longer a gap and never adds one; `--check` flags the file stale like a template                                        |
| `figma/messages.ts`                                                                                  | The design lines the generator prints and the patterns `scripts/build-slack-figma-payload.ts` reads them with. Unit test `tests/unit/specs/figma-messages.spec.ts`                                                                                                                                                                                                                   |
| `figma/naming.ts`, `figma/snapshot.ts`, `figma/diff.ts`                                              | The slot and `showLabel` naming conventions; the snapshot's shape; the drift diff, one readable line per difference, unit test `tests/unit/specs/figma-diff.spec.ts`                                                                                                                                                                                                                 |
| `figma/icons/p-icon{,.react,.angular,.vue}.figma.batch.{ts,json}`                                    | Generated icon batches: per label one template and one manifest entry per PDS icon node. A parent resolves its icons when it is viewed, not when it is published, so publish order does not matter                                                                                                                                                                                   |
| `figma/helpers/slotted.ts`, `figma/helpers/iconOf.ts`                                                | Hand-written helpers the templates import, bundled into each record by the CLI at publish time. `slotted` renders a slot's code-connected instances through their own templates, then its text layers; `iconOf` reads a swapped icon's name from its record, with the default icon's name as fallback                                                                                |
| `scripts/figmaPull.ts`                                                                               | REST pull → snapshot; `-- --check` compares instead and exits 2 on any difference, 1 on an error                                                                                                                                                                                                                                                                                     |
| `scripts/figmaGenerate.ts`                                                                           | Renders the mappings from `figma/derive.ts` into templates, icon batches and the baseline; deletes the templates of a component set that left the snapshot; prints the design lines; `--check` fails on a stale or leftover file                                                                                                                                                     |
| `scripts/figmaConnect.ts`                                                                            | Runs one `figma connect <command>` per config, always with `--exit-on-unreadable-files`. `preview` fails on any result that is not a success. `publish` (without `--dry-run`) is the per-record publish described above; exit 0 or 1                                                                                                                                                 |
| `scripts/build-slack-figma-payload.ts` (repository root)                                             | Turns the design lines into the Slack message for design; see [`slack-notifications.md`](./slack-notifications.md#figma-change-needed)                                                                                                                                                                                                                                               |
| `tsconfig.json` / `tsconfig.typecheck.json`                                                          | Templates excluded from the Stencil build; each carries a `/// <reference types="@figma/code-connect/figma-types-no-require" />` line, so editors and `typecheck` resolve `figma` without a project entry                                                                                                                                                                            |
| `.github/workflows/figma-code-connect.yml`                                                           | The workflow: on push to `main` (component sources, snapshot, configs, generator, asset manifests, patch, its own file), daily at 06:00 UTC, and on dispatch. Never gates a merge. Skipped until `vars.FIGMA_CODE_CONNECT_ENABLED == 'true'`. Details in the loop below                                                                                                              |
| `patches/@figma+code-connect+2.0.0.patch`                                                            | `patch-package` patch, applied on `postinstall`: the CLI reads each template's `getString`/`getBoolean`/`getEnum`/`getSlot`/`getInstanceSwap` names and each `getEnum` value list, so `publish` and `--dry-run` refuse a record that reads a property the live component lacks or whose option list differs from the variant's options in either direction. The dependency is pinned |
| `.github/workflows/build.yml`                                                                        | Runs `figma:generate --check` on every pull request, right after `component-meta` is built: the only Figma step that blocks a PR, and it never talks to Figma                                                                                                                                                                                                                        |
| `figma/derive-flip.prototype.ts`, `scripts/figmaFlip.prototype.ts`                                   | Throwaway, kept as the record of the walk-direction decision of 2026-09-24 (decision 17): the runner compares the pre-flip Figma-property walk with `figma/derive.ts` over the snapshot. Not part of the pipeline                                                                                                                                                                    |

## Commands

The CLI commands (`preview`, `publish`, `unpublish`, `parse`) load `FIGMA_ACCESS_TOKEN` from `packages/components/.env`
themselves; `figma:pull` reads it from the environment, so export it or `set -a; . ./.env; set +a` first. The token is a
personal access token from an Organization member with a Dev or Full seat, scopes **File content: Read**, **Library
content: Read** and **Code Connect: Write**; the Code Connect scope is shown in the token dialog only to organization
members, not guests. For the workflow, Figma recommends a Plan Access Token; its scope set is fixed and the docs do not
list Code Connect write in it, so check that a publish works with it before storing it as the secret.

| Command                                                                                                | Talks to Figma                                                                                                                               | What it does                                                                                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run figma:pull`                                                                                   | **Yes** (`GET /component_sets`, `GET /nodes?ids=…&depth=1`, `GET /components`, plus one `GET /nodes` for unpublished INSTANCE_SWAP defaults) | Rewrites the snapshot. `-- --check` compares instead of writing and exits 2 on any difference, 1 on an error                                                                                                                                    |
| `npm run figma:generate`                                                                               | No                                                                                                                                           | Writes templates, icon batches and the baseline, prints the design lines. `-- --check` verifies the files instead and fails only on a repository mistake                                                                                        |
| `npm run figma:parse`                                                                                  | No                                                                                                                                           | Compiles each template and prints the exact JSON Figma would receive                                                                                                                                                                            |
| `npm run figma:preview`                                                                                | **Yes** (`POST /v1/code_connect/preview_snippets`)                                                                                           | Figma renders every template at its default property values; exits 1 and lists every template whose result is not a success. For all combinations of one component: `npx figma connect preview <file> --config <config> --unique --output json` |
| `npm run figma:publish:dry`                                                                            | **Yes** (validation reads every record's node)                                                                                               | Lists what would be published per label and validates every record against the live component; uploads nothing                                                                                                                                  |
| `npm run figma:publish`                                                                                | **Yes** (preview, dry run, `POST /v1/code_connect`)                                                                                          | The per-record publish: every template that renders and validates goes up with `--force`, the rest is held back and listed. Exit 0 or 1                                                                                                         |
| `npm run figma:unpublish`                                                                              | **Yes**                                                                                                                                      | Removes the mappings; Dev Mode falls back to generated markup                                                                                                                                                                                   |
| `npx figma connect publish --config <label config> --file src/components/<c>/figma/<template> --force` | **Yes**                                                                                                                                      | Publishes one component under one label; run once per label config. `--dry-run` first lists exactly what would go                                                                                                                               |

## Testing against a copy instead of the library

Dev Mode shows Code Connect only on components published to a library, and a Figma **branch** cannot publish, so a
branch is a test surface for the MCP server only. The test surface where Dev Mode shows a template before a merge is a
**published duplicate** of the library in a private team; the duplicate keeps every node id. `bEXOI0BAd6pXjvIG1mpWIN` is
that duplicate, and while it is the working library `fileUrl` in `figma/components.json` points at it. Before the switch
to production, pull from production and regenerate.

To point one generation at another file with the same node ids without touching the snapshot:

```
FIGMA_PUBLISH_FILE_URL=https://www.figma.com/design/<key>/<name> npm run figma:generate
```

It rewrites the `// url=` line of every template and the icon manifest; templates generated this way must not be merged.
Code Connect records live per file key, so nothing published under another key touches the library.

## The loop in practice

The `Figma Code Connect` workflow runs after a merge (a push to `main` touching component sources, the snapshot, the
configs, the generator, the asset manifests or the patch), daily at 06:00 UTC, and on dispatch. **Every Figma change
ends in a developer re-pull PR; nothing design-side ever gates a pull request, a publish or a run; the run is red only
when a developer has work.**

Each run: `figma:pull --check`; on dispatch, or on a push that touched what gets published (templates, snapshot,
configs, generator, patch, the workflow), `figma:publish`; on drift, a re-pull and regeneration in the runner, never
committed, whose design lines are the ones for design and whose diff becomes the artifact `code-connect-regenerated`;
without drift, `figma:generate --check` on the committed snapshot for the design lines. Then the issue is opened,
updated or closed with up to five sections (the library changed, Figma could not be read, records Figma refused, design
must change Figma, publish failed), Slack gets the design section when it changed since the last run, and the run is red
when the pull check failed or publish exited 1.

**When a developer changes a component** (a prop, slot or allowed value; a new or removed component):

1. The PR runs `figma:generate --check` in `build.yml`. It fails only on repository mistakes. Design lines print and
   pass: for a prop, what to add; for a new component, `p-foo has no Figma component set`. If Figma will never carry the
   prop or the component, the developer adds it to the baseline in the same PR.
2. The merge runs the workflow. The pull check passes. Publish runs only if the push touched what gets published; a
   plain prop change does not, because a prop reaches a template only once Figma has the property. The design line opens
   the issue's design section; Slack posts once.
3. Design adds the property in Figma, publishes the library, replies on Slack.
4. A developer runs `npm run figma:pull`, then `npm run figma:generate`, reviews the diff, opens a PR, merges. The push
   touches templates, so publish uploads them. The design line is gone, the section empties, the issue closes if nothing
   else is pending. No Slack.

A code change can also change a template without Figma moving: a prop Figma has is removed or renamed in code, an
allowed value is removed, a `requiredParent` changes. Then the PR carries the regenerated template and the push
publishes it.

**When a designer changes the library:**

1. Nothing happens until the next run: a push, or the daily check.
2. The pull check fails. If the run publishes, Figma refuses the records of the components whose template no longer
   matches (a renamed property, an option the template does not list) and the rest uploads; a component where design
   only added a property passes and uploads unchanged.
3. The classify step re-pulls and regenerates in the runner: design lines for the fresh snapshot, and the regenerated
   diff.
4. The issue opens with what changed in Figma, the refused records, the design lines and the diff. Slack posts only if
   the design section changed. The run is red.
5. A developer re-pulls, PRs, merges. The push uploads the previously refused records. The issue closes if nothing else
   is pending.
6. If there were design lines, design fixes Figma and replies; the developer re-pulls again, or in the same PR if it was
   quick.

Who does what: the designer keeps each Figma component carrying every drawn PDS prop, slot and allowed value under the
PDS name, and learns which from Slack; the developer keeps the snapshot equal to the library and the templates equal to
the snapshot, and learns when from the issue. The commands are always `npm run figma:pull`, `npm run figma:generate`,
review, merge.

## Decisions

One line each, with what was rejected. Dated by when they were ruled.

1. **The contract lives in the repo as rules plus exceptions and is checked in both directions** (2026-09-18,
   2026-09-23). Rejected: a hand-written mapping table per component.
2. **Code is the source of truth for names; Figma follows** (2026-09-22). component-meta decides which props, slots and
   values exist and what they are called; the Figma component carries each under that name (`slot-<name>`,
   `slot-default`, `showLabel` for `hideLabel`). Rejected: an exception per rename.
3. **Design renames Figma properties to the code name; `fig*` and `slot-*` prefixes stay** (2026-09-22). Measured on the
   copy: 30 property-panel edits took the exception list from 32 entries to 2.
4. **Full templates only, one owner per label, published with `--force`** (2026-09-21). Rejected: UI-created mappings,
   which show no snippet.
5. **`source` and the first import are the component's docs API URL** (2026-09-21). Rejected: a repository path, which
   exists in no consumer project.
6. **Icons are records of their own; parents read the swapped icon's record** (2026-09-21). Rejected: a node-id map,
   which only worked inside the library file.
7. **Verification is Figma's renderer and Figma's validation, per record; publish is partial and runs during drift**
   (2026-09-23, 2026-09-24). Rejected: an offline fake runtime, shown wrong twice; gating publish on the pull check,
   which made one moved component block all 57.
8. **Repository mistakes fail the pull request; Figma problems never do; the workflow after the merge gates nothing**
   (2026-09-22).
9. **A slot renders its code-connected instances then its text layers, through `figma/helpers/slotted.ts`**
   (2026-09-23). Rejected: interpolating `getSlot()`, which reached the MCP as a React and Tailwind reference.
10. **The coverage backlog is a baseline that only shrinks** (2026-09-23). Rejected: a JSDoc tag, which would become
    public API; placeholder Figma properties; diffing component-meta against the previous commit.
11. **Figma's validation is the only per-record gate.** The generator's own refusal of components with design lines was
    removed (2026-09-24): it was keyed to the committed snapshot, so a developer's re-pull switched publishing off for a
    component Figma had accepted; and for a PDS prop Figma lacks or a Figma property PDS lacks the held-back template
    was identical to or better than the live record. A VARIANT option PDS does not allow is left out of the value list
    and reported; Figma then refuses that record until design removes the option or an exception folds it. Rejected:
    keeping the hold-back.
12. **One issue, and Slack only when its design section changed** (2026-09-24). Rejected: one Slack message per run,
    which repeated an open item daily; two issues per cause.
13. **No maintainer-dispatch step; a developer re-pulls** (2026-09-24). Rejected: design tells the team, a maintainer
    dispatches, then a developer re-pulls anyway.
14. **Publish only when the push touched what gets published, or on dispatch** (2026-09-24). Rejected: publishing 57
    components and 292 icons under four labels after every component change.
15. **The run is red only when a developer must act: drift, or a failed publish** (2026-09-24). Rejected: red on design
    lines, which no developer can fix.
16. **`figma:publish` exits 0 or 1; `--strict` is gone** (2026-09-24). Rejected: exit 2 for design-side hold-backs,
    which no longer exist.
17. **The generator walks component-meta and looks each prop and slot up in the snapshot** (2026-09-24). Proven on the
    copy to derive the same mappings and design lines for all 57 components as the Figma-property walk it replaced, with
    two rules made explicit: form participation is optional in Figma, and the allowed-values check runs whether or not
    an exception places the property. Rejected: two walks in two modules, which could disagree.
18. **Trigger shape: `push` with `paths`, daily `schedule`, `workflow_dispatch`** (2026-09-22). `workflow_run` on
    `Build` is impossible: `build.yml` is a reusable workflow and produces no run of its own.
19. **No auto-commit of regenerated files** (2026-09-22): unsigned, unreviewed, and a `GITHUB_TOKEN` push starts no
    checks. An auto-PR is a different question; see below.
20. **Slack goes to a design channel through its own payload builder** (2026-09-22). Rejected: adding the workflow to
    the engineering failure allowlist.
21. **Only this runbook is committed; research notes live outside the repository** (2026-09-24). Rejected: seven
    research documents that contradicted the current design in 14 places.
22. **Form props stay optional even where component-meta requires them; Copilot's comment 3 on #4747 is declined**
    (2026-09-25). A Figma TEXT property must feed a text layer, and an option's `value` is never displayed: added to
    `multi-select-option` on the copy, Figma marked it "Not used within component". The developer supplies `value`
    (`p-multi-select-option`, `p-radio-group-option`, `p-segmented-control-item` throw without it). Rejected: reporting
    a required `value` as a gap, tried and reverted the same day on that evidence; reporting every required form prop,
    which asks for `name` on 15 form components for nothing visible.
23. **A numeric prop drawn as TEXT is a number attribute, emitted as an expression** (2026-09-25): `activePage={2}`,
    `[activePage]="2"`, `:activePage="2"`; text that is not a number is left out. Rejected: quoting the text, which does
    not type-check in React or in a strict Angular template.
24. **`figma:pull --check` exits 2 on drift and 1 on an error, and the workflow tells them apart** (2026-09-25). An
    expired token or an outage gets its own issue section, "Figma could not be read", instead of "the library changed".
    Rejected: reading the drift from the log text, which a reworded line would silently break.

### Decision needed: the workflow opening the re-pull PR itself

Every loop ends in a developer PR that is purely mechanical: `figma:pull`, `figma:generate`, review, merge. The classify
step already produces those files in the runner. Decision 19's three objections were against committing to `main`; for a
pull request they resolve, with one prerequisite the team has to obtain:

- **Untested commit:** GitHub's docs, page "Automatic token authentication": when a workflow using `GITHUB_TOKEN`
  creates or updates a pull request, "the resulting `pull_request` event creates workflow runs in an approval-required
  state. The pull request displays a banner in the merge box, and a user with write access to the repository can start
  the runs by selecting Approve workflows to run." The reviewer clicks once.
- **Review:** a PR is the review. `main`'s ruleset requires one approving code-owner review and approval of the last
  push.
- **Signing:** commits created through the GraphQL mutation `createCommitOnBranch` "are automatically GPG signed and are
  marked as verified" (GitHub changelog, 2021-09-13); with `GITHUB_TOKEN` they are signed as `github-actions[bot]`,
  which satisfies the ruleset's `required_signatures`. A personal access token does not sign. A GitHub App would avoid
  the approval click, and is not obtainable.
- **Prerequisite:** the repository setting "Allow GitHub Actions to create and approve pull requests" (Settings →
  Actions → General → Workflow permissions; `can_approve_pull_request_reviews` on
  `GET /repos/{owner}/{repo}/actions/permissions/workflow`) must be on. It is off and cannot be turned on for now, and
  reading or changing it needs repository admin.
- **Shape when it lands:** about 40 lines of `gh api graphql` in the classify step, no third-party action: reset a bot
  branch `figma/follow-library` to `main`, one `createCommitOnBranch` with the regenerated files, `gh pr create` or
  `gh pr edit`; the workflow gains `contents: write` and `pull-requests: write`; `contribution.yml` adds
  `github-actions[bot]` to the deploy job's author exclusion; the artifact goes; the issue drops its drift section to
  the PR body; the run is red only on a failed publish or a PR the workflow could not open.

Until then: the artifact and the two commands.

## Until the pull request is approved (recorded 2026-09-25)

Ruled 2026-09-25: the branch is still under test, so the flow stays as it is until the pull request is approved: pushes
go to `issue/4745`, the workflow triggers from there, and every pull and publish goes to the copy
`bEXOI0BAd6pXjvIG1mpWIN`. The switch to production comes after approval, never before. The three lists below are parked
here until each has its own home.

### Open items for GitHub issues

Decision 21 moved these out of the repository with the research notes; they become GitHub issues on an explicit go, the
repository being public. Until then this is their only record. Measured on the copy between 2026-09-18 and 2026-09-23.

1. **Two Figma variant values PDS has no counterpart for**, the two entries in `figma/exceptions.ts`. A rename cannot
   remove them: each is a real variant a designer can select.

   | Component                   | Figma value       | PDS allows                                                               | Fold today      |
   | --------------------------- | ----------------- | ------------------------------------------------------------------------ | --------------- |
   | `p-model-signature` `color` | `contrast-higher` | `primary`, `contrast-low`, `contrast-medium`, `contrast-high`, `inherit` | `contrast-high` |
   | `p-text-list` `type`        | `mixed`           | `unordered`, `numbered`, `alphabetically`                                | `unordered`     |

   Per value: (a) design deletes the variant, so Figma matches PDS; (b) PDS adds the value, so code matches Figma; (c)
   the fold stays, and a designer who picks the value gets the folded snippet with no warning. `mixed` is a nested-list
   demo rather than a list type and `contrast-higher` is a colour PDS does not ship, so (a) is the likely answer for
   both. The fold stays until design rules.

2. **`p-tag`'s default icon swap points at an orphan.** Node `112:726` is an unpublished, childless local component
   named `globe`; the published globe icon is `5211:35743`. The other six INSTANCE_SWAP defaults in the library are
   published. Handled in code: `figma:pull` resolves an unpublished INSTANCE_SWAP default through one extra
   `GET /files/:key/nodes` request and the template's fallback uses that name, so a tag on its default renders
   `icon="globe"`. Design re-pointing the default at `5211:35743` makes the extra request unnecessary.
3. **Slot content only design can fix.** Content with no Code Connect record renders nothing: `optgroup` is not a
   published component (8 variants each of select and multi-select), and 3 segmented-control variants hold a local
   variant component instead of an instance of the published `segmented-control-item` (`1029:5922`). 12
   segmented-control variants carry a `scroller` instance in the default slot, rendered as `<p-scroller></p-scroller>`
   inside `p-segmented-control`. The 54 icons in `label-after` (pin-code, segmented-control, textarea) render as
   `p-icon` markup, although PDS documents that slot for external links or `p-popover`.

### First run of the workflow, from the test branch

The workflow was rewritten on 2026-09-24 and has not run on GitHub Actions since. Checked locally only: the YAML parses,
every `run` block passes `bash -n`, and `scripts/build-slack-figma-payload.ts` was run on synthetic logs. The
`push.branches` entry `issue/4745` exists for this run. What it needs, and what to expect:

- The working tree committed and pushed to `issue/4745`. The push touches templates, the generator and the workflow
  file, so the `changed` step says publish: every record goes to the copy.
- The repository variable `FIGMA_CODE_CONNECT_ENABLED` set to `true`; the job is skipped without it. The secrets
  `FIGMA_ACCESS_TOKEN`, `SLACK_BOT_TOKEN` and `SLACK_DESIGN_CHANNEL_ID` (the last two per
  [`slack-notifications.md`](./slack-notifications.md)). Variables and secrets are set by a repository admin. The Figma
  token stored there must be a rotated one: the tokens used during research were pasted into chat sessions.
- With the copy's baseline complete and the snapshot equal to the copy, a clean run publishes, opens no issue and posts
  nothing. A drifted copy, a refused record, a design line or a failed publish opens "Figma Code Connect: action needed"
  on the public repository; the Slack steps run only when the issue's design section changed.
- A failure is read from the run's job summary, which carries the pull, publish and generate logs.

### Switch to production, after approval

Nothing in this repository writes to production before the switch; every publish until then goes to the copy. In this
order, in one pull request after the approval:

1. `fileUrl` in `figma/components.json` → the production library `EkdP468u4ZVuIRwalKCscb`.
2. `npm run figma:pull`, then `npm run figma:generate`, and read the design lines. Production still carries the property
   names design renamed only on the copy (decision 3: 30 property-panel edits), so each comes back twice: the old name
   as a Figma property no rule places, the PDS name as a coverage gap. The templates are valid against production and
   emit less. Either design repeats the renames in production first, or the exceptions those renames removed (32 entries
   down to 2) are restored for the interim.
3. Remove `issue/4745` from `push.branches` in `.github/workflows/figma-code-connect.yml`.
4. Delete this section.
