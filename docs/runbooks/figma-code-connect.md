# Figma Code Connect — pull, generate, publish

How this repository talks to Figma so that Dev Mode and the Figma MCP server show PDS snippets instead of generated
markup. Everything below lives in the sub-package `packages/components/projects/figma-code-connect`
(`@porsche-design-system/figma-code-connect`) and runs from that folder, or from the root with
`--workspace=@porsche-design-system/figma-code-connect`. The library it talks to is the one line
`codeConnect.interactiveSetupFigmaFileUrl` in `figma.config.json`. State as of 2026-09-30: that is the published copy
`Npno3dQGabvzWLFcAjNDw7`, duplicated from production that day and used for the end-to-end test; the production library
is `EkdP468u4ZVuIRwalKCscb`, and the switch is that one line, made last.

## What Code Connect does

When a designer selects a component instance in Figma's Dev Mode, Figma shows a code snippet. Without Code Connect it
invents one. With Code Connect, Figma runs a small JavaScript **template** that we publish per component and label and
shows its output, `<p-button icon="close" variant="primary" hide-label="true">Some Label</p-button>`, with the values
taken from the selected instance. The same snippet is what the Figma MCP server hands to an agent implementing a design.

A template reads the instance's Figma properties by name and prints PDS markup. It reads them through
`figma.selectedInstance.properties`, the runtime's list of every property the instance has (`figma/helpers/read.ts`),
when the snippet renders: **a property the Figma component lacks is absent from that list, so its attribute is left out
and nothing else happens.** A direct read of a missing property (`getEnum('variant', …)`) would return a truthy error
handle that prints as `[object Object]` in a template literal and shows an inline "Property not found" pill in Dev Mode
(measured 2026-09-28); a read through `properties` never creates one (checked in Dev Mode 2026-09-29). So the templates
are generated from component-meta alone, every component publishes, and a property design adds later appears in the
published snippet without a new publish.

## The pipeline

```
   GENERATE                                                             PREVIEW + VALIDATE               PUBLISH (per record)
 Figma ──► pull in memory ──► component-meta × pull ──► generated/templates/*.figma.ts ──► Figma renders each  ──► accepted → figma connect publish --force
 (REST, 5–6 requests)          rules                     generated/icons/*               template, checks       refused → listed, exit 0
                               design lines, baseline cleanups                          each record's node
```

Nothing Figma-related is committed except the rules, the baseline and the configs, and nothing pulled from Figma is
stored anywhere: `figma:generate` pulls the library into memory for one run, and what it generates lands in
`generated/`, which git ignores. `npm run clean` deletes `generated/` with every other ignored path; the next
`figma:generate` brings it back.

1. **Generate** — `npm run figma:generate` pulls the library into memory, the **pull**: the published component sets,
   their property definitions and the node ids of the published icon components, five or six REST requests with
   `FIGMA_ACCESS_TOKEN` from the environment (exit 2 when Figma cannot be read). Then it walks component-meta
   (`figma/generate.ts`). A **template** reads every PDS prop and slot by its own name, of the kind component-meta gives
   it, through `figma/helpers/read.ts`, by the library's conventions, the **rules**: a boolean prop is set by a BOOLEAN
   or a `false`/`true` VARIANT, `hideLabel` also by `showLabel` inverted, and is written only away from its PDS default
   (so `dismissButton`, on by default, only as `dismiss-button="false"`); an enum prop by a VARIANT option (or TEXT, for
   a tag) among the values PDS allows; a string by TEXT; a number by TEXT that is a number, written as a number
   attribute (`activePage={2}`); a prop that allows every PDS icon name by an INSTANCE_SWAP, whose swapped icon's own
   record gives the name, gated by its `fig<Prop>` toggle; a slot by `slot-<name>` (`slot-default`, a SLOT or a TEXT,
   for the default slot), rendered as children. Not read: props flagged `isAria`, anything deprecated, deprecated
   values. The Figma data a template carries is its node id and, for an icon swap, the name of the icon it starts with.
   The **coverage** walk looks the same kinds up in the pull: `fig*` properties are design-only and ignored; form
   participation (`form`, `name`, `value`) is optional, rendered when drawn and never asked for, required or not: a
   `value` TEXT property has no text layer to feed and Figma flags it as unused. Everything else is a **design line**,
   one change design makes in Figma: a rename `"old" → "new"` where a Figma property and a PDS name belong together (a
   property named like a PDS slot becomes `slot-<name>`, `<prop>Value` becomes that prop or `value`, the one loose SLOT
   becomes the one missing slot, the one option PDS lacks becomes the one option Figma lacks:
   `"none" → "auto" in "dropdownDirection"`); a rename to `fig<Name>` for a property no PDS name stands for
   (`"dense" → "figDense"`); a `delete` for a deprecated prop or option, so that snippets stop emitting deprecated API,
   and for a `showLabel` next to a drawn `hideLabel`; and an `add` for a PDS prop, slot, allowed value, component set or
   icon Figma lacks (`add a BOOLEAN property named "compact"`, `add the option "destructive" to "variant"`,
   `add a component set named "sheet"`, `add an icon component named "ai-chat"`), unless `figma/coverage-baseline.json`
   accepts it (`component-set` for a whole component, `name=<icon>` under `p-icon`). A prop drawn with a type the
   template does not read is deleted and added again, or renamed to `fig…` when a rename takes its name. An option PDS
   does not allow can be accepted by the baseline as `prop=value` too; it stays out of the template's value list, so a
   designer who picks it gets no attribute. Design lines print, never fail and hold nothing back: whatever a component
   lacks is left out of its snippet. A baseline entry Figma has since made obsolete is pruned and printed as a
   **baseline cleanup**
   (`baseline: p-button "iconSource" is no longer a gap — remove it from figma/coverage-baseline.json`), never a
   failure. The result is four templates per component (`Web Components`, `React`, `Angular`, `Vue`) in
   `generated/templates/<component>/`, plus the icon batches
   `generated/icons/p-icon{,.react,.angular,.vue}.figma.batch.{ts,json}`, one record per PDS icon and label. Every
   template's `// source=` and first `imports` entry are the component's docs API URL
   (`https://designsystem.porsche.com/v4/components/<root>/api`, root resolved through `requiredParent`), because that
   is what the MCP server hands to agents as the component's origin. `-- --check` fails only on a repository mistake: a
   stale or leftover generated file, or two properties feeding one template variable.
2. **Preview** — `npm run figma:preview` has Figma execute every template server-side at each component's default
   property values and fails on any template that does not render.
3. **Publish** — `npm run figma:publish` runs `figma:generate --check` on a fresh pull: a stale file stops it before any
   label uploads. Then, per label, it has Figma render every template (preview) and check that each record's node exists
   and is a component set (the dry run). Every template that passes both is published with `--force`, which overwrites
   UI records a designer created for the same node and label, and with `--skip-validation`, because the dry run just
   checked the same records. A template Figma refuses, in the dry run or by the server after the upload, is **refused**:
   it keeps its previous record and is listed. Exit 0 means every record Figma accepted is up; exit 1 means a developer
   must act: a stale file, Figma could not be read, an unreadable template, a template Figma could not render in
   preview, or a token, network or CLI error. Labels upload one after another, so on 1 the labels before the failure may
   already be up. `npm run figma:publish:dry` does all of it except the upload.

**Publish never touches design.** The only write to Figma in this repository is `figma connect publish`, which attaches
Code Connect records to existing component nodes. No script creates, renames or restyles Figma components. Nothing
outside a Figma editing session can change a component's properties; Figma-side changes are a designer's job.

## Vocabulary

| Term                    | Meaning                                                                                                                                                                                                                                                                                                                                                                                                               |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Pull**                | The library's component sets, property definitions and published icon node ids, read by `figma:generate` into memory for one run. Stored nowhere.                                                                                                                                                                                                                                                                     |
| **Template**            | A generated `*.figma.ts` under `generated/templates/`, one per component per label. Reads every PDS prop and slot by name when the snippet renders. Never edited by hand, never committed.                                                                                                                                                                                                                            |
| **Record**              | What Figma stores after a publish: one per component node and label. Dev Mode and the MCP show the record's output. The last publish per label wins.                                                                                                                                                                                                                                                                  |
| **Label**               | A Dev Mode code tab: `Web Components`, `React`, `Angular`, `Vue`. One template per component per label.                                                                                                                                                                                                                                                                                                               |
| **Rule**                | A library convention in `figma/generate.ts` and `figma/helpers/read.ts`: how a template reads a PDS prop or slot from the Figma property of its name, without human input. There are no hand-written exceptions.                                                                                                                                                                                                      |
| **Design line**         | A generator line starting with `design:`: one change only design can make in Figma, a rename `"old" → "new"`, an add or a delete. The Slack message and the issue's design section are built from these and nothing else.                                                                                                                                                                                             |
| **Coverage gap**        | A PDS prop, slot, allowed value or icon with no Figma counterpart of that name, or a PDS component with no Figma component set at all, outside the baseline: an `add` design line, or one half of a rename.                                                                                                                                                                                                           |
| **Baseline**            | `figma/coverage-baseline.json`: accepted differences per PDS tag: coverage gaps, `prop=value` also for a Figma option PDS lacks, `name=<icon>` for an icon, `component-set` for a whole component. It silences design lines and changes no template. Generation only removes entries; lines are added by hand, rules in [the package's `AGENTS.md`](../../packages/components/projects/figma-code-connect/AGENTS.md). |
| **Refused**             | A record Figma would not take: the dry run's validation (a node that is gone or is no component set) or the server after the upload. The previous record stays live.                                                                                                                                                                                                                                                  |
| **Baseline cleanup**    | A baseline entry that is no longer a gap because Figma now has what it accepted as missing. Pruned from the generated baseline and listed for a developer to remove; never red.                                                                                                                                                                                                                                       |
| **Last publish record** | `<hash> clean\|partial` in the actions cache: the hash of what the last publishing run uploaded (the parse output of every label) and whether every record went up. The workflow publishes only when the hash changed or the record is partial.                                                                                                                                                                       |
| **UI record**           | A Code Connect mapping a designer created in Figma's UI, not from this repository. Publish overwrites it.                                                                                                                                                                                                                                                                                                             |
| **The issue**           | The one GitHub issue "Figma Code Connect: action needed" the workflow keeps: open while anything is pending, closed when clear. Its design section is the memory for Slack.                                                                                                                                                                                                                                           |

## Files

Paths are relative to `packages/components/projects/figma-code-connect` unless noted.

| Path                                                                                                 | Role                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `figma.config.json`, `figma.react.config.json`, `figma.angular.config.json`, `figma.vue.config.json` | One Code Connect config per label: `include` glob, `label`, `language`. The base config also names the library in `interactiveSetupFigmaFileUrl`, the CLI's own key for "the Figma file of this project" (`figma/library.ts` explains)                                                                                                                                                                                                                                             |
| `generated/`                                                                                         | Ignored by git: `templates/<component>/<component>{,.react,.angular,.vue}.figma.ts`, `icons/p-icon{,.react,.angular,.vue}.figma.batch.{ts,json}`. Written by `figma:generate`; never edit                                                                                                                                                                                                                                                                                          |
| `figma/generate.ts`                                                                                  | The rules (what a template reads for each PDS prop and slot, of the kind component-meta gives it, and the walk that looks the same kinds up in the pull: the Figma properties no rule places and the coverage gaps), the coverage side (components with no set, what design must add, the baseline) and the render: one pull and one baseline in, every generated file out (templates, icon batches, the baseline) plus the design lines and the baseline cleanups. No file system |
| `figma/coverage-baseline.json`                                                                       | Per PDS tag, the Figma property names accepted as missing, `component-set` for a component with no set, `name=<icon>` under `p-icon`: the backlog seeded 2026-09-23 (properties) and 2026-09-24 (16 components) and lines added by hand. `figma:generate` prunes an entry once it is no longer a gap, reports the pruning, and never adds one                                                                                                                                      |
| `figma/messages.ts`                                                                                  | Every line shape the generator prints for the workflow and the Slack builder to read (design lines, baseline cleanups) with its pattern                                                                                                                                                                                                                                                                                                                                            |
| `figma/snapshot.ts`, `figma/library.ts`                                                              | The pull's shape; the library URL from the config key                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `figma/helpers/read.ts`, `figma/helpers/slotted.ts`, `figma/helpers/iconOf.ts`                       | Hand-written helpers the templates import, bundled into each record by the CLI at publish time. `read` finds a property by its PDS name in the instance's `properties` when the snippet renders and reads nothing for one the component lacks; `slotted` renders a slot's code-connected instances through their own templates, then its text layers; `iconOf` reads a swapped icon's name from its record, with the default icon's name as fallback                               |
| `scripts/figmaPull.ts`                                                                               | REST pull into memory, for `scripts/figmaGenerate.ts`; the library from `figma/library.ts`, the token from the environment                                                                                                                                                                                                                                                                                                                                                         |
| `scripts/figmaGenerate.ts`                                                                           | The file system side of `figma/generate.ts`: pulls the library, reads the baseline, writes the files, deletes the templates of a component set that left the library, prints the design lines and the baseline cleanups; exit 2 when Figma cannot be read, 1 on a repository mistake; `--check` fails on a stale or leftover file, the baseline excepted                                                                                                                           |
| `scripts/figmaConnect.ts`                                                                            | Runs one `figma connect <command>` per config, always with `--exit-on-unreadable-files`. `preview` fails on any result that is not a success. `publish` is the per-record publish described above; `--dry-run` skips only the upload; exit 0 or 1. Reads the dry run's validation failures and the server's refusals out of the CLI's own log                                                                                                                                      |
| `tests/unit/`                                                                                        | The reader and the generator against real component-meta and hand-written Figma sets, no pull: `npm run test:unit`                                                                                                                                                                                                                                                                                                                                                                 |
| `AGENTS.md`                                                                                          | What an agent or developer does after changing a prop, slot, allowed value or component, and the baseline rules                                                                                                                                                                                                                                                                                                                                                                    |
| `scripts/build-slack-figma-payload.ts` (repository root)                                             | Turns the design lines into the Slack message for design; see [`slack-notifications.md`](./slack-notifications.md#figma-change-needed)                                                                                                                                                                                                                                                                                                                                             |
| `.github/workflows/figma-code-connect.yml` (repository root)                                         | The workflow: on push to `main` (component sources, the package, asset manifests, its own file), daily at 06:00 UTC, and on dispatch with an optional `force`. Never gates a merge. Skipped until `vars.FIGMA_CODE_CONNECT_ENABLED == 'true'`. Details in the loop below                                                                                                                                                                                                           |
| `.github/workflows/test.yml` (repository root)                                                       | The job `Figma Code Connect` runs the package's typecheck and unit tests                                                                                                                                                                                                                                                                                                                                                                                                           |

## Commands

The CLI commands (`preview`, `publish`, `unpublish`, `parse`) load `FIGMA_ACCESS_TOKEN` from the package's `.env`
themselves; `figma:generate`, and `figma:publish` through it, read it from the environment, so export it or
`set -a; . ./.env; set +a` first. The token is a personal access token from an Organization member with a Dev or Full
seat, scopes **File content: Read**, **Library content: Read** and **Code Connect: Write**; the Code Connect scope is
shown in the token dialog only to organization members, not guests. For the workflow, Figma recommends a Plan Access
Token; its scope set is fixed and the docs do not list Code Connect write in it, so check that a publish works with it
before storing it as the secret.

| Command                                                                                               | Talks to Figma                                                                                                                               | What it does                                                                                                                                                                                                                                        |
| ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run figma:generate`                                                                              | **Yes** (`GET /component_sets`, `GET /nodes?ids=…&depth=1`, `GET /components`, plus one `GET /nodes` for unpublished INSTANCE_SWAP defaults) | Pulls the library into memory, writes templates, icon batches and the baseline, prints the design lines and the baseline cleanups; exit 2 when Figma cannot be read. `-- --check` verifies the files instead and fails only on a repository mistake |
| `npm run figma:parse`                                                                                 | No                                                                                                                                           | Compiles each template and prints the exact JSON Figma would receive                                                                                                                                                                                |
| `npm run figma:preview`                                                                               | **Yes** (`POST /v1/code_connect/preview_snippets`)                                                                                           | Figma renders every template at its default property values; exits 1 and lists every template whose result is not a success. For all combinations of one component: `npx figma connect preview <file> --config <config> --unique --output json`     |
| `npm run figma:publish:dry`                                                                           | **Yes** (the pull, preview, validation reads every record's node)                                                                            | Everything publish does except the upload: lists what would be published per label                                                                                                                                                                  |
| `npm run figma:publish`                                                                               | **Yes** (the pull, preview, dry run, `POST /v1/code_connect`)                                                                                | The per-record publish: every template that renders and whose node validates goes up with `--force`, the rest is refused and listed. Exit 0 or 1                                                                                                    |
| `npm run test:unit`                                                                                   | No                                                                                                                                           | The unit tests of the reader and the generator                                                                                                                                                                                                      |
| `npm run figma:unpublish`                                                                             | **Yes**                                                                                                                                      | Removes the mappings; Dev Mode falls back to generated markup                                                                                                                                                                                       |
| `npx figma connect publish --config <label config> --file generated/templates/<c>/<template> --force` | **Yes**                                                                                                                                      | Publishes one component under one label; run once per label config. `--dry-run` first lists exactly what would go                                                                                                                                   |

## Testing against a copy instead of the library

Dev Mode shows Code Connect only on components published to a library, and a Figma **branch** cannot publish, so a
branch is a test surface for the MCP server only. The test surface where Dev Mode shows a template before a merge is a
**published duplicate** of the library in a private team; the duplicate keeps every node id. `Npno3dQGabvzWLFcAjNDw7` is
that duplicate, and while it is the working library `interactiveSetupFigmaFileUrl` in `figma.config.json` points at it.

To point one generation at another file with the same node ids without touching the config:

```
FIGMA_PUBLISH_FILE_URL=https://www.figma.com/design/<key>/<name> npm run figma:generate
```

It rewrites the `// url=` line of every template and the icon manifest. Code Connect records live per file key, so
nothing published under another key touches the library.

## The loop in practice

The `Figma Code Connect` workflow runs after a merge (a push to `main` touching component sources, the package, the
asset manifests, the Slack builder or its own file), daily at 06:00 UTC, and on dispatch. **Nothing design-side ever
gates a pull request, a publish or a run; no Figma change needs a developer; the run is red only when a developer has
work.**

Each run: `figma:generate`, which pulls the library into memory, then the hash of what publish would upload (the parse
output of every label) is compared with the **last publish record** restored from the cache. Publish runs when the hash
differs, when the last record is partial, on dispatch with `force`, and never on a re-run of a commit that is no longer
the branch tip. After a publish the record is saved: `clean` when every record went up, `partial` when publish failed or
Figma refused records. The job summary shows the records that differ from the last publish, and the artifact
`code-connect-changes` carries the full diff. Then the issue is opened, updated or closed with up to six sections (Figma
could not be read, generation failed, records Figma refused, baseline cleanup, design must change Figma, publish
failed), Slack gets the design section when it changed since the last run, and the run is red when Figma could not be
read or the generation, its parse or the publish failed. When Figma could not be read or generation failed, the design
section is carried forward unchanged, so an outage never repeats a Slack message. The issue is written after Slack on
every run; a design section Slack did not get is stored as unsent, is not carried through an outage, and goes out with
the next run that reads Figma.

**When a developer changes a component** (a prop, slot or allowed value; a new or removed component):

1. A developer with a token runs `figma:generate` and reads the design lines the change produces. If Figma will never
   carry the prop or the component, the developer adds it to the baseline in the same PR (rules in the package's
   `AGENTS.md`). The PR build runs the package's typecheck and unit tests and reads nothing from Figma.
2. The merge runs the workflow. The changed templates publish; the new prop is left out of the snippet while Figma lacks
   it. The design line opens the issue's design section and Slack posts once.
3. Design adds the property in Figma, publishes the library, replies on Slack.
4. Dev Mode shows the prop as soon as the library is published: the record already reads it. The next daily run finds no
   design line and closes the issue if nothing else is pending. No developer, no PR, no publish.

A code change can also change a template without Figma moving: a prop Figma has is removed or renamed in code, an
allowed value is removed, a `requiredParent` changes. Then the push publishes the regenerated template.

**When a designer changes the library:**

1. A property change reaches Dev Mode as soon as the library is published: every record reads the properties when the
   snippet renders. A new or recreated component set, or a new icon, needs a record of its own, which the next run
   publishes: a push, or the daily run.
2. The run pulls the changed library. A component design moved away from code (a renamed property, an option code does
   not allow) gets design lines; its snippet leaves the moved property out until design fixes it.
3. The issue shows the design lines and the baseline cleanups; Slack posts only if the design section changed. The run
   stays green.
4. Design fixes Figma and replies; the snippet follows as soon as the library is published. A baseline cleanup is
   removed by a developer in the next pull request that touches the component; until then it is only a line in the
   issue.

Who does what: the designer keeps each Figma component carrying every drawn PDS prop, slot and allowed value under the
PDS name and nothing code does not have, and learns which from Slack; the developer keeps the rules, the baseline and
the configs, and learns when from the issue. The command is `npm run figma:generate` to see the state locally, and
nothing else.

## Decisions

One line each, with what was rejected. Dated by when they were ruled.

1. **The contract lives in the repo as rules and is checked in both directions** (2026-09-18, 2026-09-23; the exceptions
   left on 2026-09-28, decision 27). Rejected: a hand-written mapping table per component.
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
7. **Verification is Figma's renderer and Figma's node validation, per record; publish is partial** (2026-09-23,
   2026-09-24, 2026-09-28; the validation of property names left with the patch on 2026-09-29, decision 31). Rejected:
   an offline fake runtime, shown wrong twice; gating publish on a pull check, which made one moved component block
   all 57.
8. **Repository mistakes fail the pull request; Figma problems never do; the workflow after the merge gates nothing**
   (2026-09-22, 2026-09-28, 2026-09-29: the pull-request build reads nothing from Figma; the package's typecheck and
   unit tests, which render every PDS component, fail on a repository mistake in the rules).
9. **A slot renders its code-connected instances then its text layers, through `figma/helpers/slotted.ts`**
   (2026-09-23). Rejected: interpolating `getSlot()`, which reached the MCP as a React and Tailwind reference.
10. **The coverage backlog is a baseline that only shrinks, and an entry Figma made obsolete is a cleanup, never a
    failure** (2026-09-23, 2026-09-28). Rejected: a JSDoc tag, which would become public API; placeholder Figma
    properties; diffing component-meta against the previous commit; failing `--check` on the pruned file, which Figma
    can cause at any time.
11. **Every component publishes; what differs from Figma is a design line and holds nothing** (2026-09-29, reversing the
    2026-09-28 hold, which had reversed the 2026-09-24 ruling that Figma's validation was the only gate). A template
    reads each property when the snippet renders and leaves out one the component lacks, so a held record could only
    ever show less. Rejected: holding a component until Figma matches in both directions, which kept every snippet of it
    at its last state for a gap in one property; unpublishing held components, which removes working snippets for a gap
    only design can close.
12. **One issue, and Slack only when its design section changed** (2026-09-24, 2026-09-29: the issue is written after
    the send on every run, and a design section Slack did not get is stored as unsent, so the next run that reads Figma
    sends it again; a send followed by a failed issue write goes out twice). Rejected: one Slack message per run, which
    repeated an open item daily; two issues per cause; skipping the issue write when the send failed, which left the
    issue unwritten for as long as Slack failed; a hash of the sent section, kept current by a step of its own.
13. **No developer step after a Figma change, and no publish after a property change: the published record reads it**
    (2026-09-28, reversing 2026-09-24; 2026-09-29). A new component set or icon needs a record, which the next daily run
    publishes, dispatch sooner. Rejected: the re-pull pull request, which existed only because the pull was committed.
14. **Publish when what publish would upload changed since the last publish, recorded in the actions cache**
    (2026-09-28, replacing the 2026-09-24 path gate; 2026-09-29). The hash covers the parse output of every label and
    nothing else, because that is the upload: the templates with their helpers bundled and the CLI version. A component
    set or icon design adds, removes or recreates changes it; a Figma property change does not, because the templates
    read it when the snippet renders. Figma answers every upload with `published_nodes`, changed or not, and offers no
    read-back of records, so the comparison is ours. Rejected: gating on the push's changed paths, which lost a
    superseded push's templates and could not see Figma; publishing on every run, which re-uploads 1,396 records and
    overwrites UI records daily; hashing the template files alone, which misses a helper edit and a CLI upgrade; also
    hashing the pulled definitions and the verdict, which republished everything on any library edit; a committed
    record, decision 19.
15. **The run is red only when a developer must act: Figma could not be read, generation or its parse failed, or publish
    failed** (2026-09-24, 2026-09-28). Rejected: red on design lines or held components, which no developer can fix.
16. **`figma:publish` exits 0 or 1; `--strict` is gone** (2026-09-24). Rejected: exit 2 for design-side hold-backs,
    which no longer exist.
17. **The generator walks component-meta: the template reads each prop and slot by name, the coverage walk looks the
    same kinds up in the pull** (2026-09-24, 2026-09-29). One function gives each prop its kind for both, so they cannot
    disagree about what a template renders; a Figma property of a type the kind does not read is a design line. Proven
    on the copy to derive the same mappings and design lines for all 57 components as the Figma-property walk it
    replaced, with two rules made explicit: form participation is optional in Figma, and the allowed-values check runs
    for every placed property. Rejected: two walks in two modules, which could disagree.
18. **Trigger shape: `push` with `paths`, daily `schedule`, `workflow_dispatch` with a `force` input** (2026-09-22,
    2026-09-28). `workflow_run` on `Build` is impossible: `build.yml` is a reusable workflow and produces no run of its
    own.
19. **The workflow commits nothing and opens no pull request** (2026-09-22, settled 2026-09-28): with nothing generated
    in git there is nothing to commit. The record of the last publish lives in the actions cache. Rejected: a committed
    record; a repository variable, which `GITHUB_TOKEN` cannot write; the issue body, which closes.
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
24. **An outage gets its own issue section, "Figma could not be read", and carries the design section forward**
    (2026-09-25, 2026-09-28, 2026-09-29: the outage is `figma:generate`'s exit 2, the workflow keeps the exit code).
    Rejected: reading the outage from the log text; dropping the design section, which made the next good run post the
    same lines to Slack again.
25. **Nothing pulled is stored, nothing generated is committed** (2026-09-28, 2026-09-29): `figma:generate` pulls the
    library into memory; the templates and the icon batches live in the package's ignored `generated/` folder; the
    library is the one line `interactiveSetupFigmaFileUrl` in `figma.config.json`. Rejected: committing them, which made
    every Figma change a developer pull request; a pull in the pull-request build, which forks and Dependabot cannot
    run; a pull cached for the pull-request build's design lines (2026-09-28 to 2026-09-29), which kept a copy of the
    library in the actions cache for lines a developer with a token sees locally.
26. **No golden render test for now** (2026-09-29): the frozen pull under `tests/unit/fixtures/` and the goldens it
    rendered into were removed, pending a team decision between a frozen pull and a hand-written fixture. The unit tests
    render every PDS component from real component-meta and hand-written Figma sets and check reads and design lines,
    not whole files.
27. **`figma/exceptions.ts` is deleted with nothing moved; the baseline accepts a Figma option PDS lacks as
    `prop=value`** (2026-09-28, 2026-09-29): the two folds (`p-text-list` `type=mixed`, `p-model-signature`
    `color=contrast-higher`) became baseline entries and the option stays out of the value list. A designer who picks
    the option gets no attribute. Rejected: holding the two components until design deletes the options, which nobody
    will do for now.
28. **Every PDS icon name needs a published Figma component of that name; a missing one is a design line** (2026-09-28).
    The other direction is not checkable: the pull keeps only components with a PDS icon name, because nothing tells an
    icon component from the library's other 1,300 published components. Rejected: holding the batch on a set equality
    that cannot be computed.
29. **Every read goes through the instance's `properties`** (2026-09-28, 2026-09-29): a property is read only when the
    instance has it. Measured on the copy: a direct read of a property design removed returns a truthy error handle that
    renders `[object Object]`, so a live record would show `disabled="true"` on every snippet, and Dev Mode marks the
    read "Property not found"; through `properties` neither happens. Rejected: guarding direct reads with `=== true` and
    `typeof`, which kept the pill.
30. **The pipeline is its own workspace, `packages/components/projects/figma-code-connect`** (2026-09-28), the
    `projects/<name>` form 24 of 34 workspace entries use, strict TypeScript, templates inside the package because the
    CLI refuses to bundle a helper import from outside its project directory. Rejected: a sibling `packages/…`, which
    the workflow's paths and the CLI's project directory both argue against; templates beside the components, which
    needs `--dir` against the CLI's documented behaviour.
31. **Templates read the Figma properties when the snippet renders; the patch is gone** (2026-09-29).
    `figma.selectedInstance.properties`, in Figma's template API, lists every property the instance has, so a template
    reads each PDS prop by name through `figma/helpers/read.ts` and leaves out one the component lacks. Measured on the
    copy: across every boolean and variant combination of all 57 components, the runtime-read templates render the
    snippets the pull-generated ones did (10,497 of 10,497), and all four labels match at default values; in Dev Mode a
    template reading 5 props the button lacks shows no pill. A template carries two things from Figma: its node id and
    an icon swap's start icon. The patch made the dry run refuse a record reading a property the component lacks, which
    can no longer happen, and added `templateData.props` to every upload; `@figma/code-connect` stays pinned because the
    wrapper parses its output. Rejected: generating the reads from the pull, which needed a regenerate and a publish for
    every Figma change and a held state while it lagged; reading with `getBoolean` and `getEnum` by Figma type, which
    needs that type at generation.
32. **A boolean prop is written only when Figma sets it away from its PDS default** (2026-09-29): a prop on by default
    prints `dismiss-button="false"` when Figma turns it off and nothing when on, as a prop off by default prints only
    `="true"`. Of the seven props on by default, three are drawn on the copy (`dismissButton` on `p-banner` and
    `p-inline-notification`, `showLastPage` on `p-pagination`). Seen in Dev Mode: a banner with its dismiss button off
    showed `<p-banner …>`, which renders the close button; Figma's preview now renders `dismiss-button="false"`.
    Rejected: printing `="true"` for the default too, which changes nothing rendered.
33. **A design line names the change: `"old" → "new"`, `add …` or `delete …`, grouped by component in Slack**
    (2026-09-30). Renames pair a Figma property with a PDS name from names and types alone, no hand-written table
    (decision 1). Measured on the production pull of 2026-09-29: its 37 lines become 31 changes on 19 components.
    Rejected: one line per problem with its reason
    (`"summary" (SLOT) has no PDS prop — rename it to the PDS prop it stands for`), which left design to find the target
    and split one rename into two lines; a note on the order of dependent renames, which design works out.

## Until the pull request is approved (recorded 2026-09-25, updated 2026-09-28)

Ruled 2026-09-25: the branch is still under test, so the flow stays as it is until the pull request is approved: pushes
go to `issue/4745`, the workflow triggers from there, and every pull and publish goes to the copy
`Npno3dQGabvzWLFcAjNDw7`. The switch to production comes after approval, never before. The three lists below are parked
here until each has its own home.

### Open items for GitHub issues

Decision 21 moved these out of the repository with the research notes; they become GitHub issues on an explicit go, the
repository being public. Until then this is their only record. Measured on the copy between 2026-09-18 and 2026-09-28.

1. **Two Figma variant values PDS has no counterpart for**, once folded by `figma/exceptions.ts`, accepted in the
   baseline since 2026-09-29 (`p-model-signature` `color=contrast-higher`, `p-text-list` `type=mixed`): a designer who
   picks one gets no attribute in the snippet. Per value: (a) design deletes the variant, so Figma matches PDS; (b) PDS
   adds the value, so code matches Figma. `mixed` is a nested-list demo rather than a list type and `contrast-higher` is
   a colour PDS does not ship, so (a) is the likely answer for both. Until then the entries stay.
2. **Two PDS icons the copy has no component for**, `ai-chat` and `customer-support`, accepted in the baseline as
   `name=ai-chat`, `name=customer-support` under `p-icon` since 2026-09-29; once design adds them, the entries are
   cleanups.
3. **`p-tag`'s default icon swap points at an orphan.** Node `112:726` is an unpublished, childless local component
   named `globe`; the published globe icon is `5211:35743`. The other six INSTANCE_SWAP defaults in the library are
   published. Handled in code: the pull resolves an unpublished INSTANCE_SWAP default through one extra
   `GET /files/:key/nodes` request and the template's fallback uses that name, so a tag on its default renders
   `icon="globe"`. Design re-pointing the default at `5211:35743` makes the extra request unnecessary.
4. **Slot content only design can fix.** Content with no Code Connect record renders nothing: `optgroup` (8 variants
   each of select and multi-select) is published as a standalone component (`58240:100195`, checked 2026-09-29), not a
   component set, so the pull does not see it and it gets no record (ruled 2026-09-29: design leaves it as it is for
   now), and 3 segmented-control variants hold a local variant component instead of an instance of the published
   `segmented-control-item` (`1029:5922`). 12 segmented-control variants carry a `scroller` instance in the default
   slot, rendered as `<p-scroller></p-scroller>` inside `p-segmented-control`. The 54 icons in `label-after` (pin-code,
   segmented-control, textarea) render as `p-icon` markup, although PDS documents that slot for external links or
   `p-popover`.
5. **A transient preview failure turns the run red.** On 2026-09-28 one of three local publishes saw 50 records fail
   Figma's preview for no reason of their own; the wrapper reports them as templates a developer must look at and the
   run goes red. A retry of the preview call, or a threshold below which a preview failure is reported but not red,
   would distinguish Figma's hiccup from a broken template.

### First run of the workflow, from the test branch

The workflow was rewritten on 2026-09-28 and 2026-09-29 and has not run on GitHub Actions since. Checked locally on
2026-09-28: the YAML parses, the hash, decide and record steps were executed with simulated inputs (no record, clean,
partial, other hash, `force`, re-run off the tip, re-run at the tip), and `scripts/build-slack-figma-payload.ts` was run
on real generate logs. Checked on 2026-09-29: the YAML parses, the generate step's exit-code capture ran under
`bash -eo pipefail` for exits 0, 1 and 2, the hash was stable across runs and changed with a helper code change, and
`figma:publish:dry` ran against the copy (every label: 58 files, preview and node validation passed). Since the switch
to runtime reads, the only upload was one throwaway record under the label `PoC` for the Dev Mode check, deleted after.
What it needs, and what to expect:

- The working tree committed and pushed to `issue/4745`. With no record in the cache, the first run publishes every
  record to the copy.
- The repository variable `FIGMA_CODE_CONNECT_ENABLED` set to `true`; the job is skipped without it. The secrets
  `FIGMA_ACCESS_TOKEN`, `SLACK_BOT_TOKEN` and `SLACK_DESIGN_CHANNEL_ID` (the last two per
  [`slack-notifications.md`](./slack-notifications.md)). Variables and secrets are set by a repository admin. The Figma
  token stored there must be a rotated one: the tokens used during research were pasted into chat sessions.
- With no design line, no issue opens and Slack stays quiet; the first Figma-side difference opens "Figma Code Connect:
  action needed" on the public repository, and the Slack steps run only when its design section changed.
- A failure is read from the run's job summary, which carries the generate and publish logs and the records that differ
  from the last publish.

### Switch to production, after approval

Nothing in this repository writes to production before the switch; every publish until then goes to the copy. In this
order, in one pull request after the approval:

1. `interactiveSetupFigmaFileUrl` in `figma.config.json` → the production library `EkdP468u4ZVuIRwalKCscb`.
2. `npm run figma:generate`, and read the design lines. Production still carries what design changed only on the copy
   (decision 3): a read-only pull of production on 2026-09-29 gave 37 design lines on 19 components, all from 30
   property-panel edits (27 property renames, `dropdownDirection` option `none` renamed to `auto` on `select` and
   `multi-select`, the redundant `showLabel` removed from `input-email`) and the `destructive` button variant added on
   the copy; no other property name, type or option, component set or icon name differs between the two files. Every
   component publishes; each prop is left out of its snippet until design repeats the edit in production, and shows up
   then without a publish.
3. Remove `issue/4745` from `push.branches` in `.github/workflows/figma-code-connect.yml`.
4. Delete this section.
