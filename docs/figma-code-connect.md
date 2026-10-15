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
   design can make in Figma and an accepted-gap cleanup for every accepted gap Figma made obsolete. The rules that pair
   a PDS prop or slot with the Figma property of the same name are in `figma/generate.ts`.
2. **Render.** A template reads each PDS prop and slot by name from `figma.selectedInstance.properties` when the snippet
   renders (`figma/helpers/read.ts`). **A property the Figma component lacks is left out of the snippet**, so every
   component publishes, and a property design adds or renames shows up once the library is published, with no new
   publish.
3. **Publish.** `npm run figma:publish` runs `figma:generate -- --check`, then per label has Figma render every template
   (preview) and validate every record's node (dry run), and uploads what passed with `--force`, which overwrites a
   mapping a designer made in Figma's UI. A record Figma refuses keeps its previous version and is listed.

Nothing here edits design: `figma connect publish` only attaches records to existing component nodes.

## The workflow

`.github/workflows/figma-code-connect.yml` has three jobs. Each is skipped unless the repository variable
`FIGMA_CODE_CONNECT_ENABLED` is `true`, and none gates a merge or the release: no job needs them. On `main`:

- `publish` republishes every record of the latest release, the highest stable tag. `.github/workflows/release.yml`
  calls it after a release it created on `main`, once the pinned docs every snippet links are up, and a dispatch runs it
  by hand. Nothing publishes between releases, so Dev Mode never shows a prop npm does not ship yet.
- `design-lines` runs as the last job of `Contribution` on a push to `main`, after the storefront and Algolia deploy,
  and daily at 06:00 UTC. It runs `figma:generate` and `.github/actions/notify-slack-figma-change`, which sends the
  design lines to Slack.

A pull request runs everything but the upload: `Contribution` calls the same workflow after the pull request's deploy,
and its `Dry run` job runs `figma:generate` and `figma:publish:dry` with the same token. The deploy skips forks and
bot-authored pull requests, so they get no dry run and see their lines after the merge; a pull request whose build,
tests or deploy failed gets none until they pass. The `figma:generate` step's log lists every design line and
accepted-gap cleanup, those already open on `main` included. The dry run is red when generation fails, a template does
not render, Figma refuses a record or `figma/accepted-gaps.json` accepts a gap Figma has closed, and only warns when
Figma cannot be read. For a closed gap it attaches the corrected file as the artifact `accepted-gaps.json`; no job needs
it, so it holds back neither a merge nor the preview. The package's typecheck and unit tests run in the
`Figma Code Connect` job of `.github/workflows/test.yml`, on every pull request.

Each `publish` run:

1. Checks out the latest release, whatever started it, so a re-run of an older release publishes the newest one.
2. Runs `figma:generate` and `figma:publish`, which uploads every record of every label. Every template links the docs
   of the PDS version it was generated from (`designsystem.porsche.com/v4.8.0/…`), so a release changes every record
   anyway. The artifact `code-connect-generated` carries everything generated.

Each `design-lines` run:

1. Runs `figma:generate`, unless the run is a re-run of a commit that is no longer the branch tip: that run does
   nothing.
2. Sends the design channel on Slack the design lines it has not got yet; the actions cache keeps the open lines it has
   ([`slack-notifications.md`](./slack-notifications.md#figma-change-needed)). Each line goes once, and again only when
   it is resolved and later comes back. Lines Slack did not get are sent by the next `design-lines` run.

**The run is red when it cannot do its job or Figma refused a record**: Figma could not be read, generation failed,
publish failed as a whole, from a token, network or CLI error, or Figma refused a record. A template Figma cannot render
and a record it refuses keep their previous record while everything else goes up, and the run turns red at the end, as
nothing retries them before the next release; every pull request's dry run is red until a developer fixes them. Design
lines never make it red. A red run reaches the engineering channel through the failure notifier
([`slack-notifications.md`](./slack-notifications.md#pipeline-failure)). Re-run the failed job: `publish` always
publishes the latest release, and `design-lines` does nothing once a newer commit has reached `main`, where the next
push or the daily run catches up. A dispatch republishes the latest release at any time.

| Problem                  | Cause                                                                                                                                       | Where it shows                                                             | What to do                                                                                                                               |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Figma could not be read  | `figma:generate` exited 2: a token, network or API error                                                                                    | A red run. Slack gets nothing, and the lines it got stay its memory        | Fix the token or re-run                                                                                                                  |
| Generation failed        | `figma:generate` exited 1, a repository mistake such as two properties feeding one template variable, or the CLI could not parse a template | A red run, and every pull request's dry run                                | Fix it in a pull request, whose `Figma Code Connect` job reproduces it. Nothing was published                                            |
| Records Figma refused    | A template Figma could not render in preview, a node that is gone or is no component set, or a generator bug                                | A red run once everything else is up, and every pull request's dry run too | A Figma hiccup: re-run. Otherwise fix the template, the node or the generator; the record keeps its previous version                     |
| Accepted-gap cleanup     | An accepted gap is no longer a gap                                                                                                          | Every pull request's dry run, which turns red, and every run's log         | Commit the dry run's artifact `accepted-gaps.json` in place of `figma/accepted-gaps.json`, or run `figma:generate` locally and commit    |
| Design must change Figma | The design lines                                                                                                                            | The design channel on Slack, once per line, and the `figma:generate` log   | Nothing, unless Figma will never carry it: see the package's [`AGENTS.md`](../packages/components/projects/figma-code-connect/AGENTS.md) |
| Publish failed           | `figma:publish` exited 1: an unreadable template, or a token, network or CLI error                                                          | A red run                                                                  | Read the log, then re-run or dispatch. Labels upload one after another, so the labels before the failure may be up                       |

## Setup

- The repository variable `FIGMA_CODE_CONNECT_ENABLED` set to `true`, and the secrets `FIGMA_ACCESS_TOKEN`,
  `SLACK_BOT_TOKEN` and `SLACK_DESIGN_CHANNEL_ID` ([`slack-notifications.md`](./slack-notifications.md#secrets)), set by
  a repository admin.
- The Figma token is a personal access token of an Organization member with a Dev or Full seat, with the scopes **File
  content: Read**, **Library content: Read** and **Code Connect: Write**; the token dialog shows the Code Connect scope
  only to organization members, not guests. Figma recommends a Plan Access Token for CI, but its scope set is fixed and
  the docs do not list Code Connect write in it, so check that a publish works with one before storing it.
- A local token is optional: pull requests run the dry run and a release publishes; only `figma:unpublish` and testing
  against another file need one. Locally the token goes in the package's git-ignored `.env`. The `figma connect` CLI
  loads that file itself; `figma:generate` reads the token from the environment, and so do `figma:publish` and
  `figma:publish:dry`, which start with `figma:generate -- --check`. Export it first: `set -a; . ./.env; set +a`.

## Commands

| Command                     | Talks to Figma | What it does                                                                                                                                                                                                                             |
| --------------------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run figma:generate`    | Yes            | Pulls and writes `generated/`, prints the design lines and the accepted-gap cleanups. Exit 2: Figma could not be read; exit 1: a repository mistake. `-- --check` compares instead of writing and also fails on a stale or leftover file |
| `npm run figma:parse`       | No             | Prints, per label, the JSON Figma would receive                                                                                                                                                                                          |
| `npm run figma:preview`     | Yes            | Figma renders every template at its default property values; exit 1 lists every template that did not render                                                                                                                             |
| `npm run figma:publish:dry` | Yes            | Everything `figma:publish` does except the upload, with the same exit codes                                                                                                                                                              |
| `npm run figma:publish`     | Yes            | Exit 0: every record is up. Exit 1: `--check` failed, the CLI failed as a whole, or Figma refused a record, which keeps its previous version while everything else goes up                                                               |
| `npm run figma:unpublish`   | Yes            | Removes the records; Dev Mode falls back to generated markup                                                                                                                                                                             |
| `npm run test:unit`         | No             | The reader, the generator and a snapshot of every generated file; `-- -u` updates the snapshots                                                                                                                                          |

The pull is `GET /files/:key/component_sets`, `GET /files/:key/nodes` per 25 component sets,
`GET /files/:key/components` and, when an INSTANCE_SWAP default is an unpublished component, one more
`GET /files/:key/nodes`. To render one component across its property combinations:
`npx figma connect preview <file> --config <label config> --unique --output json`.

## When something changes

- **A prop, slot, allowed value or component in code:** follow the package's
  [`AGENTS.md`](../packages/components/projects/figma-code-connect/AGENTS.md). The next release publishes the changed
  templates; whatever Figma lacks is left out of the snippet and reaches design as a design line after the merge.
- **A property in the library:** Dev Mode shows it once the library is published; nothing to do. A new or recreated
  component set or icon needs a record of its own, which the next release publishes, or a dispatch before it.
- **Records a designer edited in Figma's UI:** dispatch the workflow.
- **The snapshots** render from a pull built from component-meta, so a library change never moves them; a code change
  does, and so does a release (`docs/release.md`). Review the snapshot diff before committing it.

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

| Term                 | Meaning                                                                                                                        |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Pull                 | The library's component sets, property definitions and icon node ids, read into memory for one run. Stored nowhere             |
| Label                | A Dev Mode code tab: `Web Components`, `React`, `Angular`, `Vue`, one `figma*.config.json` each                                |
| Template             | A generated `*.figma.ts`, one per component and label. Never edited by hand, never committed                                   |
| Record               | What Figma stores after a publish, one per component node and label; Dev Mode and the MCP server show its output               |
| Design line          | A `design:` line from `figma:generate`: a rename `"old" → "new"`, an `add` or a `delete` only design can make in Figma         |
| Accepted gap         | `figma/accepted-gaps.json`: per PDS tag, the differences accepted as missing. It silences design lines and changes no template |
| Accepted-gap cleanup | An accepted gap Figma made obsolete. Generation prunes and prints it; a pull request's dry run is red until it is removed      |
| Refused              | A record Figma would not render or take, in the dry run or after the upload. Its previous version stays live                   |

## Decisions

1. **Code names win.** Figma carries each PDS prop, slot and allowed value under its PDS name, and the rules pair them
   with no human input. Rejected: a hand-written mapping per component, which every rename has to update.
2. **Templates read the Figma properties when the snippet renders.** Rejected: direct `getBoolean`/`getEnum` reads,
   which print `[object Object]` and show "Property not found" in Dev Mode for a property the component lacks;
   generating the reads from the pull, which needed a publish for every Figma change.
3. **Nothing pulled is stored and nothing generated is committed; a pull request runs everything but the upload, and
   only a release publishes.** The pull-request run needs the token, so it runs after the deploy, which takes only
   internal pull requests that are not bot-authored. Forks and bots get no dry run and see their lines after the merge.
   Rejected: committing the pull or the templates, which turned every Figma change into a developer pull request; a
   local token per developer, which needs a Figma seat each and leaves the check to whoever has one;
   `pull_request_target`, which would run a fork's code with the token.
4. **Publish every record of the latest release, after each release and on dispatch, and nothing between releases.** Dev
   Mode then shows what npm ships, and every snippet links docs that exist. A release changes every record anyway, since
   each links its version's docs, so nothing tracks what changed. The cost: a new component set or icon in the library,
   and a record Figma refused, wait for the next release or a dispatch; the v4 releases of 2026 came 2 to 47 days apart.
   Rejected: publishing every push to `main`, which put props npm does not ship yet into Dev Mode; publishing only what
   changed since the last publish, by one hash of the parse output or by its lines per record, which kept a state in the
   actions cache to save uploads a release repeats anyway; publishing daily, which overwrites UI records daily.
5. **A pull request is red for what its author can fix, a publish when it cannot do its job or Figma refused a record,
   and publish is per record.** A gap Figma has closed but `figma/accepted-gaps.json` still accepts turns a pull request
   red too: left in the file, it would accept that gap again, unseen. A refused record turns the publish red once
   everything else is up, because nothing retries it before the next release; a Figma preview hiccup costs a failure
   message and a re-run. Rejected: gating publish on Figma matching code, which let one moved component block all 57; a
   green publish that lists refused records in its log, where nobody saw them and nothing retried them; closed gaps in
   the log only, where nobody saw them.
6. **No issue, and Slack gets each design line once, when it appears; the actions cache keeps the open lines Slack
   has.** Everything else stays in the run's logs, and what a developer must fix turns a pull request's dry run red.
   Design is never reminded, so a postponed line lives on in the Slack channel only. Rejected: a message per run, which
   repeated an open item daily; the whole open list whenever it changed, which reminded design of every postponed line;
   one GitHub issue holding the design lines and every open problem, as clutter in the public repository's issues.
7. **Form props (`form`, `name`, `value`) stay optional, even where component-meta requires them** (Copilot's comment 3
   on #4747, declined). A `value` TEXT property has no text layer to feed, and Figma marks it "Not used within
   component".
8. **Every generated file is snapshotted, rendered from a pull built from component-meta with made-up node ids**, so a
   template change shows in review without committing Figma data; the snapshots differ from the published files in node
   ids and icon swap fallbacks. Rejected: a frozen pull of the library, which put its node ids and property definitions
   in the public repository.
9. **Triggers: the publish from a job of `release.yml` after a release it created and from `workflow_dispatch`; the
   design lines from the last job of `Contribution` on a push to `main` and from `schedule`; all on `main` only. On a
   pull request the last job of `Contribution` runs the dry run. The publish checks out the highest stable tag, never
   the commit that started it.** Rejected: the dry run inside `.github/workflows/test.yml`, whose failure skipped the
   pull request's preview deploy, since the deploy needs every test job; a job inside `.github/workflows/deploy.yml`,
   whose failure would skip the release; a standalone `push` trigger, which published commits whose build or tests
   failed; the `release` event, which a release created with `GITHUB_TOKEN`, as `release.yml` creates it, does not
   trigger; checking out the release commit, which let a re-run of an older release publish it over a newer one; a
   dispatch on any branch, which would run that branch's copy of the workflow.
10. **`@figma/code-connect` takes updates like any other dependency: the weekly update and Dependabot's security pull
    requests.** `scripts/figmaConnect.ts` reads the CLI's log lines and its `preview --output json` result, so an update
    that changes them shows in a pull request: the unit tests parse every generated file with the installed CLI on every
    pull request, the update's own included, and the dry run checks preview and validation on the next pull request that
    is not bot-authored. The cost: the update's own pull request gets no dry run, its author being a bot, and a change
    to the lines that report a refused upload shows in no pull request, since only a release uploads; refused records
    would then pass unseen. Rejected: holding it back from automated updates, which made every bump a deliberate chore.

## Until the pull request is approved

Every pull and publish goes to the test copy; production comes after the approval, never before. The
`FIGMA_ACCESS_TOKEN` secret must be a rotated token: the tokens used during the research were pasted into chat sessions.
Nothing publishes before the first release that contains this package: a dispatch checks out the latest release, which
until then lacks it, and fails.

### Open items for GitHub issues

They become GitHub issues on an explicit go, the repository being public; until then this is their only record.

1. Two Figma options PDS lacks, accepted as gaps: `p-model-signature` `color=contrast-higher` and `p-text-list`
   `type=mixed`; a designer who picks one gets no attribute. Design deleting both is the likely fix: `mixed` is a
   nested-list demo, not a list type, and PDS ships no `contrast-higher` colour.
2. Two PDS icons the library has no component for, `ai-chat` and `customer-support`, accepted as gaps under `p-icon`.
3. `p-tag`'s default icon swap points at an unpublished, childless local `globe` component instead of the published
   globe icon. The pull resolves it with one extra request; design re-pointing the default makes that unnecessary.
4. Slot content only design can fix. `optgroup` in select and multi-select is a standalone component, not a component
   set, so it gets no record and renders nothing (ruled 2026-09-29: left as it is for now). 3 segmented-control variants
   hold a local component instead of an instance of `segmented-control-item`, 12 carry a `scroller` instance in the
   default slot, which renders as `<p-scroller></p-scroller>`, and the 54 icons in `label-after` (pin-code,
   segmented-control, textarea) render as `p-icon`, although PDS documents that slot for external links or `p-popover`.
5. A transient preview failure turns a pull request's dry run red: on 2026-09-28, 50 records of one of three local
   publishes failed Figma's preview for no reason of their own. A release's publish keeps their previous records and
   turns red, so a re-run catches up. A retry, or a threshold below which a preview failure is reported but not red,
   would tell Figma's hiccup from a broken template.
6. No snippet is ever compiled. Figma's preview returns each rendered snippet (`figma connect preview --output json`,
   which posts to `/v1/code_connect/preview_snippets`, an endpoint Figma's REST docs do not list), and
   `scripts/figmaConnect.ts` keeps only `filePath`, `success` and `error` of it. The snapshots hold template source, and
   `snippets.spec.ts` compares 12 strings. Figma's preview would not have caught the bug 3a186334dc fixed: the Prettier
   the CLI runs accepts `[label]="'Don't say'"`, which Angular's `parseTemplate` and Vue's `compile` reject. Open: how
   deep a check goes (framework syntax, names against the wrappers' types, or a render), and which snippets it reads
   (the local stand-in, which can set a designer's text; Figma's preview, which keeps TEXT properties at their defaults;
   or both).

### Switch to production, after approval

In one pull request:

1. Point `interactiveSetupFigmaFileUrl` in `figma.config.json` at the production library.
2. Read the design lines in this pull request's `Figma Code Connect` job, which now pulls production. Design repeats the
   test copy's edits in production before the switch, so there should be none; on 2026-10-15 production still lacked
   them: 32 design lines on 18 components, 1 of which, the `slot-default` of select-option, the test copy lacks too.
   Every component publishes either way; a prop is left out of its snippet until design repeats the edit.
3. Delete this section.
