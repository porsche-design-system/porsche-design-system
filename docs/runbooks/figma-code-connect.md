# Figma Code Connect — pull, generate, publish

How this repository makes Figma's Dev Mode and the Figma MCP server show PDS snippets instead of generated markup. The
code is the workspace `packages/components/projects/figma-code-connect` (`@porsche-design-system/figma-code-connect`);
run its commands from that folder or from the root with `--workspace=@porsche-design-system/figma-code-connect`. The
Figma library it reads and publishes to is the URL in `codeConnect.interactiveSetupFigmaFileUrl` of `figma.config.json`:
the test copy until the pull request is approved, then the production library.

## How it works

1. **Generate.** `npm run figma:generate` pulls the library's component sets, their property definitions and the node
   ids of its published icon components into memory, walks component-meta and writes four templates per component, one
   per label, plus the icon batches into `generated/`, which git ignores. It prints a design line for every change only
   design can make in Figma and a baseline cleanup for every baseline entry Figma made obsolete. The rules that pair a
   PDS prop or slot with the Figma property of the same name are in `figma/generate.ts`.
2. **Render.** A template reads each PDS prop and slot by name from `figma.selectedInstance.properties` when the snippet
   renders (`figma/helpers/read.ts`). **A property the Figma component lacks is left out of the snippet**, so every
   component publishes, and a property design adds or renames shows up once the library is published, with no new
   publish.
3. **Publish.** `npm run figma:publish` runs `figma:generate -- --check`, then per label has Figma render every template
   (preview) and validate every record's node (dry run), and uploads what passed with `--force`, which overwrites a
   mapping a designer made in Figma's UI. A record Figma refuses keeps its previous version and is listed.

Nothing here edits design: `figma connect publish` only attaches records to existing component nodes.

## The workflow

`.github/workflows/figma-code-connect.yml` runs on a push to `main` that touches component sources, the package, the
icon, flag or model-signature manifests, the Slack builder or the workflow itself; daily at 06:00 UTC; and on dispatch,
whose `force` input publishes regardless of the last publish. It is skipped unless the repository variable
`FIGMA_CODE_CONNECT_ENABLED` is `true`, and it never gates a merge. The pull-request build reads nothing from Figma: the
`Figma Code Connect` job in `.github/workflows/test.yml` runs the package's typecheck and unit tests.

Each run:

1. Runs `figma:generate`.
2. Hashes what publish would upload, the `figma connect parse` output of every label, and compares it with the record of
   the last publish, `<hash> clean|partial`, kept in the actions cache.
3. Publishes when the hash differs, the record is `partial` or `force` is set, but never on a re-run of a commit that is
   no longer the branch tip. Then records `clean`, or `partial` when publish failed or Figma refused a record.
4. Writes the logs and the records that differ from the last publish to the job summary; the artifacts
   `code-connect-changes` (the full diff) and `code-connect-generated` (everything generated) carry the rest.
5. Opens, updates or closes the issue "Figma Code Connect: action needed", and sends its design section to the design
   channel on Slack when it changed ([`slack-notifications.md`](./slack-notifications.md#figma-change-needed)). A
   section Slack did not get is sent by the next run that reads Figma.

**The run is red only when a developer must act**: Figma could not be read, generation or its parse failed, or publish
failed. Design lines never make it red.

| Issue section            | Cause                                                                                                                                       | What to do                                                                                                                                  |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Figma could not be read  | `figma:generate` exited 2: a token, network or API error                                                                                    | Fix the token or re-run. The design section is carried forward, so Slack does not repeat it                                                 |
| Generation failed        | `figma:generate` exited 1, a repository mistake such as two properties feeding one template variable, or the CLI could not parse a template | Reproduce with `npm run figma:generate` and fix it in a pull request. Nothing was published                                                 |
| Records Figma refused    | A node that is gone or is no component set, or a generator bug                                                                              | Fix the node or the generator. The record keeps its previous version, and the next run retries                                              |
| Baseline cleanup         | A baseline entry is no longer a gap                                                                                                         | Remove it from `figma/coverage-baseline.json` in the next pull request that touches the component                                           |
| Design must change Figma | The design lines, sent to Slack                                                                                                             | Nothing, unless Figma will never carry it: see the package's [`AGENTS.md`](../../packages/components/projects/figma-code-connect/AGENTS.md) |
| Publish failed           | `figma:publish` exited 1: an unreadable template, a template Figma could not render in preview, or a token, network or CLI error            | Read the log. Labels upload one after another, so the labels before the failure may be up                                                   |

The issue closes on the first run with nothing pending.

## Setup

- The repository variable `FIGMA_CODE_CONNECT_ENABLED` set to `true`, and the secrets `FIGMA_ACCESS_TOKEN`,
  `SLACK_BOT_TOKEN` and `SLACK_DESIGN_CHANNEL_ID` ([`slack-notifications.md`](./slack-notifications.md#secrets)), set by
  a repository admin.
- The Figma token is a personal access token of an Organization member with a Dev or Full seat, with the scopes **File
  content: Read**, **Library content: Read** and **Code Connect: Write**; the token dialog shows the Code Connect scope
  only to organization members, not guests. Figma recommends a Plan Access Token for CI, but its scope set is fixed and
  the docs do not list Code Connect write in it, so check that a publish works with one before storing it.
- Locally the token goes in the package's git-ignored `.env`. The `figma connect` CLI loads that file itself;
  `figma:generate` and `figma:freeze` read the token from the environment, and so do `figma:publish` and
  `figma:publish:dry`, which start with `figma:generate -- --check`. Export it first: `set -a; . ./.env; set +a`.

## Commands

| Command                     | Talks to Figma | What it does                                                                                                                                                                                                                         |
| --------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `npm run figma:generate`    | Yes            | Pulls and writes `generated/`, prints the design lines and the baseline cleanups. Exit 2: Figma could not be read; exit 1: a repository mistake. `-- --check` compares instead of writing and also fails on a stale or leftover file |
| `npm run figma:freeze`      | Yes            | Writes the pull to `tests/unit/fixtures/library.json`, which the template snapshots render from                                                                                                                                      |
| `npm run figma:parse`       | No             | Prints, per label, the JSON Figma would receive                                                                                                                                                                                      |
| `npm run figma:preview`     | Yes            | Figma renders every template at its default property values; exit 1 lists every template that did not render                                                                                                                         |
| `npm run figma:publish:dry` | Yes            | Everything `figma:publish` does except the upload                                                                                                                                                                                    |
| `npm run figma:publish`     | Yes            | Exit 0: every record Figma accepted is up. Exit 1: a developer must act                                                                                                                                                              |
| `npm run figma:unpublish`   | Yes            | Removes the records; Dev Mode falls back to generated markup                                                                                                                                                                         |
| `npm run test:unit`         | No             | The reader, the generator and a snapshot of every generated file; `-- -u` updates the snapshots                                                                                                                                      |

The pull is `GET /files/:key/component_sets`, `GET /files/:key/nodes` per 25 component sets,
`GET /files/:key/components` and, when an INSTANCE_SWAP default is an unpublished component, one more
`GET /files/:key/nodes`. To render one component across its property combinations:
`npx figma connect preview <file> --config <label config> --unique --output json`.

## When something changes

- **A prop, slot, allowed value or component in code:** follow the package's
  [`AGENTS.md`](../../packages/components/projects/figma-code-connect/AGENTS.md). After the merge the workflow publishes
  the changed templates; whatever Figma lacks is left out of the snippet and reaches design as a design line.
- **A property in the library:** Dev Mode shows it once the library is published; nothing to do. A new or recreated
  component set or icon needs a record of its own, which the next run publishes: a push, the daily run or a dispatch.
- **Records a designer edited in Figma's UI:** dispatch the workflow with `force`.
- **The snapshots** render from the frozen pull, so a library change reaches them only after `npm run figma:freeze` and
  `npm run test:unit -- -u`. Review the snapshot diff before committing it.

## Testing against another file

Dev Mode shows Code Connect only on components published to a library, and a Figma branch cannot publish, so a branch
tests only the MCP server. Testing in Dev Mode before a merge needs a published duplicate of the library in a private
team, which keeps every node id; the test copy is one. To point one generation at another file with the same node ids:

```
FIGMA_PUBLISH_FILE_URL=https://www.figma.com/design/<key>/<name> npm run figma:generate
```

It rewrites the `// url=` line of every template and the icon manifest; the pull still reads the configured library.
Records live per file key, so nothing published under another key touches the library.

## Vocabulary

| Term             | Meaning                                                                                                                                        |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Pull             | The library's component sets, property definitions and icon node ids, read into memory for one run. Stored nowhere but the frozen test fixture |
| Label            | A Dev Mode code tab: `Web Components`, `React`, `Angular`, `Vue`, one `figma*.config.json` each                                                |
| Template         | A generated `*.figma.ts`, one per component and label. Never edited by hand, never committed                                                   |
| Record           | What Figma stores after a publish, one per component node and label; Dev Mode and the MCP server show its output                               |
| Design line      | A `design:` line from `figma:generate`: a rename `"old" → "new"`, an `add` or a `delete` only design can make in Figma                         |
| Baseline         | `figma/coverage-baseline.json`: per PDS tag, the differences accepted as missing. It silences design lines and changes no template             |
| Baseline cleanup | A baseline entry Figma made obsolete. Generation prunes and prints it for a developer to remove, and never fails on it                         |
| Refused          | A record Figma would not take, in the dry run or after the upload. Its previous version stays live                                             |

## Decisions

1. **Code names win.** Figma carries each PDS prop, slot and allowed value under its PDS name, and the rules pair them
   with no human input. Rejected: a hand-written mapping per component, which every rename has to update.
2. **Templates read the Figma properties when the snippet renders.** Rejected: direct `getBoolean`/`getEnum` reads,
   which print `[object Object]` and show "Property not found" in Dev Mode for a property the component lacks;
   generating the reads from the pull, which needed a publish for every Figma change.
3. **Nothing pulled is stored, nothing generated is committed, and the pull-request build reads nothing from Figma.**
   Rejected: committing the pull or the templates, which turned every Figma change into a developer pull request; a pull
   in the pull-request build, which forks and Dependabot cannot run.
4. **Publish only when the hash of the parse output changed or the last publish was partial; the record lives in the
   actions cache.** Rejected: publishing on every run, which re-uploads every record and overwrites UI records daily;
   hashing the template files, which misses a helper edit and a CLI upgrade; a repository variable, which `GITHUB_TOKEN`
   cannot write.
5. **Red only when a developer must act, and publish is per record.** Rejected: gating publish on Figma matching code,
   which let one moved component block all 57.
6. **One issue, and Slack only when its design section changed.** Rejected: a message per run, which repeated an open
   item daily.
7. **Form props (`form`, `name`, `value`) stay optional, even where component-meta requires them** (Copilot's comment 3
   on #4747, declined). A `value` TEXT property has no text layer to feed, and Figma marks it "Not used within
   component".
8. **Every generated file is snapshotted, rendered from a frozen pull of the library**, so a template change shows in
   review. Rejected: a fixture derived from component-meta, whose node ids and icon swap defaults the published
   templates do not have.
9. **Triggers: `push` with `paths`, `schedule` and `workflow_dispatch`.** Rejected: `workflow_run` on `Build`, a
   reusable workflow with no run of its own.
10. **`@figma/code-connect` is pinned exactly**: `scripts/figmaConnect.ts` reads the CLI's log lines and the workflow
    hashes its parse output. Bump it per [`docs/dependencies.md`](../dependencies.md).

## Until the pull request is approved

Pushes to `issue/4745` trigger the workflow, and every pull and publish goes to the test copy; production comes after
the approval, never before. The `FIGMA_ACCESS_TOKEN` secret must be a rotated token: the tokens used during the research
were pasted into chat sessions.

### Open items for GitHub issues

They become GitHub issues on an explicit go, the repository being public; until then this is their only record.

1. Two Figma options PDS lacks, accepted in the baseline: `p-model-signature` `color=contrast-higher` and `p-text-list`
   `type=mixed`; a designer who picks one gets no attribute. Design deleting both is the likely fix: `mixed` is a
   nested-list demo, not a list type, and PDS ships no `contrast-higher` colour.
2. Two PDS icons the library has no component for, `ai-chat` and `customer-support`, accepted in the baseline under
   `p-icon`.
3. `p-tag`'s default icon swap points at an unpublished, childless local `globe` component instead of the published
   globe icon. The pull resolves it with one extra request; design re-pointing the default makes that unnecessary.
4. Slot content only design can fix. `optgroup` in select and multi-select is a standalone component, not a component
   set, so it gets no record and renders nothing (ruled 2026-09-29: left as it is for now). 3 segmented-control variants
   hold a local component instead of an instance of `segmented-control-item`, 12 carry a `scroller` instance in the
   default slot, which renders as `<p-scroller></p-scroller>`, and the 54 icons in `label-after` (pin-code,
   segmented-control, textarea) render as `p-icon`, although PDS documents that slot for external links or `p-popover`.
5. A transient preview failure turns the run red: on 2026-09-28, 50 records of one of three local publishes failed
   Figma's preview for no reason of their own. A retry, or a threshold below which a preview failure is reported but not
   red, would tell Figma's hiccup from a broken template.

### Switch to production, after approval

In one pull request:

1. Point `interactiveSetupFigmaFileUrl` in `figma.config.json` at the production library.
2. Run `npm run figma:generate` and read the design lines. Production lacks what design changed only on the test copy;
   on 2026-09-29 that was 37 design lines on 19 components: 27 property renames, the `dropdownDirection` option `none`
   renamed to `auto` on `select` and `multi-select`, `showLabel` removed from `input-email`, and the `destructive`
   button variant. Every component still publishes; each prop is left out of its snippet until design repeats the edit
   in production.
3. Run `npm run figma:freeze` and `npm run test:unit -- -u`, so the snapshots render from production.
4. Remove `issue/4745` from `push.branches` in `.github/workflows/figma-code-connect.yml`.
5. Delete this section.
