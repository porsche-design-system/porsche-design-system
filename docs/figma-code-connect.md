# Figma Code Connect — pull, generate, publish

How this repository makes Figma's Dev Mode and the Figma MCP server show PDS snippets instead of generated markup. The
code is the workspace `packages/components/projects/figma-code-connect` (`@porsche-design-system/figma-code-connect`);
run its commands from that folder or from the root with `--workspace=@porsche-design-system/figma-code-connect`. The
Figma library it reads and publishes to is the URL in `codeConnect.interactiveSetupFigmaFileUrl` of `figma.config.json`.

## How it works

1. **Generate.** `npm run figma:generate` pulls the library's component sets, their property definitions and the node
   ids of its published icon components into memory, walks component-meta and writes four templates per component, one
   per label, plus the icon batches into `generated/`, which git ignores. It prints a design line for every change only
   design can make in Figma and an accepted-gap cleanup for every accepted gap Figma made obsolete. A component set
   pairs with the PDS component whose tag is `p-` and the set's name, lowercased, so a `fig-` set, which only Figma
   needs, never pairs. The rules that pair a PDS prop or slot with the Figma property of the same name are in
   `figma/generate.ts`. For a property no rule places it reads the library's earlier versions (`figma/history.ts`): a
   key keeps its `#<id>` through a rename, and a VARIANT, which has none, is matched by its options, so the line says
   `Rename "compacta" back to "compact"` instead of asking for an add and reporting an unknown property.
2. **Render.** A template reads each PDS prop and slot by name from `figma.selectedInstance.properties` when the snippet
   renders (`figma/helpers/read.ts`). **A property the Figma component lacks is left out of the snippet**, so every
   component publishes, and a property design adds or renames shows up once the library is published, with no new
   publish. A required prop is the exception: it is written anyway (decision 12).
3. **Publish.** `npm run figma:publish` runs `figma:generate -- --check`, then per label has Figma render every template
   (preview, once more for each that failed) and validate every record's node (dry run), and uploads what passed with
   `--force`, which overwrites a mapping a designer made in Figma's UI. A record Figma refuses, or could not be reached
   for, keeps its previous version and is listed.

Nothing here edits design: `figma connect publish` only attaches records to existing component nodes.

## The workflow

`.github/workflows/figma-code-connect.yml` has three jobs. Each is skipped unless the repository variable
`FIGMA_CODE_CONNECT_ENABLED` is `true`, and none gates a merge or the release: only the release announcement waits for
them, whatever their result. On `main`:

- `publish` republishes every record of the latest release, the highest stable tag. `.github/workflows/release.yml`
  calls it after a release it created on `main`, once the pinned docs every snippet links are up, and a dispatch with
  `publish` ticked runs it by hand. Nothing publishes between releases, so Dev Mode never shows a prop npm does not ship
  yet.
- `design-lines` runs `figma:generate` on the latest release and `.github/actions/notify-slack-figma-change`, which
  sends the design lines to Slack. It runs next to `publish` when `release.yml` calls the workflow, every Monday at
  06:00 UTC and on every dispatch, and never in a merge's run. **Design follows what npm ships, never `main`**: a rename
  or delete design made for `main`'s code would drop the prop from every released record until the next release, and an
  add would offer a property npm does not ship yet.
- `accepted-gaps` runs `figma:generate` on `main` every Monday at 06:00 UTC and on a dispatch without `publish`. When
  Figma has closed a gap `figma/accepted-gaps.json` still accepts, it opens an issue carrying the corrected file and
  assigns the Copilot coding agent, which commits it with the snapshots and opens the pull request. One issue at a time;
  nothing happens while the file is current.

A pull request runs everything but the upload: `Contribution` calls the same workflow after the pull request's deploy,
and its `Dry Run` job runs `figma:generate` and `figma:publish:dry` with the same token. The deploy skips forks and
bot-authored pull requests, so they get no dry run and see their lines in a later pull request's; a pull request whose
build, tests or deploy failed gets none until they pass. The `figma:generate` step's log lists every design line and
accepted-gap cleanup, those already open on `main` included. The dry run is red when generation fails, a template does
not render twice in a row, Figma refuses a record or `figma/accepted-gaps.json` accepts a gap Figma has closed, and only
warns when Figma cannot be read or reached. For a closed gap it attaches the corrected file as the artifact
`accepted-gaps.json`; no job needs it, so it holds back neither a merge nor the preview. The package's typecheck and
unit tests run in the `Figma Code Connect` job of `.github/workflows/test.yml`, on every pull request.

Each `publish` run:

1. Checks out the latest release, whatever started it, so a re-run of an older release publishes the newest one.
2. Runs `figma:generate` and `figma:publish`, which uploads every record of every label. Every template links the docs
   of the PDS version it was generated from (`designsystem.porsche.com/v4.8.0/…`), so a release changes every record
   anyway. The artifact `code-connect-generated` carries everything generated.

Each `design-lines` run:

1. Checks out the latest release, as `publish` does, and runs `figma:generate`.
2. Sends the design channel on Slack every open design line
   ([`slack-notifications.md`](./slack-notifications.md#figma-change-needed)), and nothing when there is none. A line
   comes again with each release and each week until design makes the change. A change a designer makes in Figma after a
   release, such as renaming a property the released code reads, reaches design within the week, and is in every pull
   request's dry-run log before that. An accepted gap Figma has closed sends nothing: the run never checks
   `figma/accepted-gaps.json`, and the next pull request's dry run turns red for it.

**The run is red when it cannot do its job or Figma refused a record**: Figma could not be read or reached, generation
failed, publish failed as a whole, from a token, network or CLI error, or Figma refused a record. A template Figma
cannot render twice in a row and a record it refuses keep their previous record while everything else goes up, and the
run turns red at the end, as nothing retries them before the next release; every pull request's dry run is red until a
developer fixes them. A template whose preview did not reach Figma keeps its previous record too; the run ends with exit
2, red, where a pull request's dry run only warns. Design lines never make it red. A red run reaches the engineering
channel through the failure notifier ([`slack-notifications.md`](./slack-notifications.md#pipeline-failure)). Re-run the
failed job: both jobs always read the latest release, and a re-run of `design-lines` sends the whole list again. A
dispatch sends the design lines at any time and, with `publish` ticked, also republishes the latest release, as a
release does.

| Problem                  | Cause                                                                                                                                       | Where it shows                                                                       | What to do                                                                                                                                                                                                                                                                                 |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Figma could not be read  | `figma:generate` exited 2, or `figma:publish` in its pull, a preview or the validation: a token, network or API error                       | A red run. Slack gets nothing                                                        | Fix the token or re-run                                                                                                                                                                                                                                                                    |
| Generation failed        | `figma:generate` exited 1, a repository mistake such as two properties feeding one template variable, or the CLI could not parse a template | A red run, and every pull request's dry run                                          | Fix it in a pull request, whose `Figma Code Connect` job reproduces it. Nothing was published                                                                                                                                                                                              |
| Records Figma refused    | A template Figma could not render in preview twice in a row, a node that is gone or is no component set, or a generator bug                 | A red run once everything else is up, and every pull request's dry run too           | A Figma hiccup: re-run. Otherwise fix the template, the node or the generator; the record keeps its previous version                                                                                                                                                                       |
| Accepted-gap cleanup     | An accepted gap is no longer a gap                                                                                                          | Every pull request's dry run, which turns red, and every run's log                   | Commit the dry run's artifact `accepted-gaps.json` in place of `figma/accepted-gaps.json`, or run `figma:generate` locally and commit; then `npm run test:unit -- -u` in the package and commit the snapshots it rewrote. Or merge `main` once Monday's `accepted-gaps` pull request is in |
| Design must change Figma | The design lines                                                                                                                            | The design channel on Slack after each release and every Monday, and every run's log | Nothing, unless Figma will never carry it: see the package's [`AGENTS.md`](../packages/components/projects/figma-code-connect/AGENTS.md)                                                                                                                                                   |
| Publish failed           | `figma:publish` exited 1: an unreadable template, or a token, network or CLI error                                                          | A red run                                                                            | Read the log, then re-run or dispatch. Labels upload one after another, so the labels before the failure may be up                                                                                                                                                                         |

## Setup

- The repository variable `FIGMA_CODE_CONNECT_ENABLED` set to `true`, and the secrets `FIGMA_ACCESS_TOKEN`,
  `SLACK_BOT_TOKEN` and `SLACK_DESIGN_CHANNEL_ID` ([`slack-notifications.md`](./slack-notifications.md#secrets)), set by
  a repository admin. The `accepted-gaps` job reads `GH_COPILOT_AGENT_TOKEN`, the user token
  `.github/workflows/weekly-dependency-agent.yml` describes; it only opens and assigns an issue.
- The Figma token is a personal access token of an Organization member with a Dev or Full seat, with the scopes **File
  content: Read**, **Library content: Read**, **File versions: Read** (`file_versions:read`, for the history; without it
  history is a notice, never a failure) and **Code Connect: Write**; the token dialog shows the Code Connect scope only
  to organization members, not guests. Figma recommends a Plan Access Token for CI, but its scope set is fixed and the
  docs do not list Code Connect write in it, so check that a publish works with one before storing it.
- A local token is optional: pull requests run the dry run and a release publishes; only `figma:unpublish` and testing
  against another file need one. Locally the token goes in the package's git-ignored `.env`. The `figma connect` CLI
  loads that file itself; `figma:generate` reads the token from the environment, and so do `figma:publish` and
  `figma:publish:dry`, which start with `figma:generate -- --check`. Export it first: `set -a; . ./.env; set +a`.

## Commands

| Command                     | Talks to Figma | What it does                                                                                                                                                                                                                                                                                                         |
| --------------------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run figma:generate`    | Yes            | Pulls and writes `generated/`, prints the design lines and the accepted-gap cleanups. Exit 2: Figma could not be read; exit 1: a repository mistake. `-- --check` compares instead of writing and also fails on a stale or leftover file                                                                             |
| `npm run figma:parse`       | No             | Prints, per label, the JSON Figma would receive                                                                                                                                                                                                                                                                      |
| `npm run figma:preview`     | Yes            | Figma renders every template at its default property values; exit 1 lists every template that did not render                                                                                                                                                                                                         |
| `npm run figma:publish:dry` | Yes            | Everything `figma:publish` does except the upload, with the same exit codes                                                                                                                                                                                                                                          |
| `npm run figma:publish`     | Yes            | Exit 0: every record is up. Exit 1: `--check` failed, the CLI failed as a whole, or Figma refused a record, which keeps its previous version while everything else goes up. Exit 2: Figma could not be read or reached, in the pull, a preview or the validation; what it could not check keeps its previous version |
| `npm run figma:unpublish`   | Yes            | Removes the records; Dev Mode falls back to generated markup                                                                                                                                                                                                                                                         |
| `npm run test:unit`         | No             | The reader, the generator, the CLI's output against a stand-in for Figma's API and a snapshot of every generated file; `-- -u` updates the snapshots                                                                                                                                                                 |

The pull is `GET /files/:key/component_sets`, `GET /files/:key/nodes` per 25 component sets and
`GET /files/:key/components`. A property no rule places adds `GET /files/:key/versions` once and
`GET /files/:key/nodes?version=…` per version read and 25 sets with such a property, at most 40 versions and 90 days
back and one every 3 s: the oldest reachable version first, which settles a key whose id carried a PDS name there and
drops a property that already carries its name there, then newest first until each remaining property has appeared. Only
history waits out a rate limit, once and for up to a minute; a longer one, a second one or history that cannot be read
is a notice, and the lines come without it. `-- --check` and `-- --no-history` read no history: a check follows the run
that printed the lines, and the publish job passes `--no-history` because the design-lines job sends them. To render one
component across its property combinations:
`npx figma connect preview <file> --config <label config> --unique --output json`.

## When something changes

- **A prop, slot, allowed value or component in code:** follow the package's
  [`AGENTS.md`](../packages/components/projects/figma-code-connect/AGENTS.md). The next release publishes the changed
  templates; whatever Figma lacks is left out of the snippet and reaches design as a design line with that release.
- **A property in the library:** Dev Mode shows it once the library is published; nothing to do. A new or recreated
  component set or icon needs a record of its own, which the next release publishes, or a dispatch with `publish` before
  it.
- **Records a designer edited in Figma's UI:** dispatch the workflow with `publish`.
- **The snapshots** render from a pull built from component-meta and a fixed version, so neither a library change nor a
  release moves them; a code change does. Review the snapshot diff before committing it.

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
| Design line          | A `design:` line from `figma:generate`: an instruction only design can carry out in Figma, naming the property and its type    |
| Accepted gap         | `figma/accepted-gaps.json`: per PDS tag, the differences accepted as missing. It silences design lines and changes no template |
| Accepted-gap cleanup | An accepted gap Figma made obsolete. Generation prunes and prints it; a pull request's dry run is red until it is removed      |
| Refused              | A record Figma would not render or take, in the dry run or after the upload. Its previous version stays live                   |

## Decisions

1. **Code names win.** Figma carries each PDS prop, slot and allowed value under its PDS name, so the rules pair them
   with no mapping to maintain. Rejected: a hand-written mapping per component, which every rename has to update.
2. **Templates read the Figma properties when the snippet renders.** Rejected: direct `getBoolean`/`getEnum` reads,
   which show "Property not found" in Dev Mode for a property the component lacks; reads generated from the pull, which
   needed a publish for every Figma change.
3. **Nothing pulled is stored and nothing generated is committed; a pull request runs everything but the upload, and
   only a release publishes.** The dry run needs the token, so it runs after the deploy, which skips forks and bot
   authors. Rejected: committing the pull or the templates, which turned every Figma change into a developer pull
   request; a local token per developer, which needs a Figma seat each; `pull_request_target`, which would run a fork's
   code with the token.
4. **Publish every record of the latest release, after each release and on dispatch, and nothing between releases; the
   design lines are the latest release's too, never `main`'s.** Dev Mode then shows what npm ships and design follows
   npm. The cost: a new component set, a new icon or a refused record waits for the next release or a dispatch.
   Rejected: publishing every push to `main`, which put unshipped props into Dev Mode; publishing only what changed,
   which kept state in the actions cache; publishing daily; design lines for `main`, which put design ahead of npm.
5. **A pull request is red for what its author can fix, a publish when it cannot do its job or Figma refused a record,
   and publish is per record.** A closed gap still in `figma/accepted-gaps.json` turns a pull request red: left there,
   it would accept that gap again, unseen. A failed preview is retried once; a preview or pull that does not reach Figma
   warns in a pull request and turns a publish red. A snippet that fails only the CLI's Prettier check
   (`syntaxCheckOnly`) publishes with a warning
   ([figma/code-connect#418](https://github.com/figma/code-connect/issues/418), still open); the unit tests run that
   check on every snippet instead. Rejected: gating publish on Figma matching code, which let one moved component block
   all 57; refused records or closed gaps in the log only, where nobody saw them; a tolerated number of preview
   failures, which lets a broken template through; `metadata: { nestable: false }`, which shows every nested component
   as a pill.
6. **No issue; Slack gets every open design line after each release and every Monday, with nothing remembered between
   runs.** Code is the source of truth, so every line is a change design makes; code follows Figma only by deleting a
   closed accepted gap. The cost: a line repeats until design acts, and a designer's change waits up to 7 days to be
   reported. Rejected: lines after a release only, which left a designer's later change unreported until the next
   release; a daily run; remembering sent lines in the actions cache or an artifact, machinery to spare design a repeat;
   one GitHub issue, clutter in the public repository.
7. **Form props (`form`, `name`, `value`) stay optional, even where component-meta requires them** (Copilot's comment 3
   on #4747, declined). A `value` TEXT property has no text layer to feed, and Figma marks it "Not used within
   component".
8. **Every generated file is snapshotted, rendered from a pull built from component-meta with made-up node ids and a
   fixed version**, so a template change shows in review without committing Figma data and a release changes no
   snapshot. Rejected: a frozen pull of the library, which put its node ids and property definitions in the public
   repository; the release's version, which rewrote every snapshot at each release.
9. **Triggers: the publish from `release.yml` after a release it created and from a `workflow_dispatch` with `publish`;
   the design lines from the same, from a weekly `schedule` and from every dispatch; all on `main`, checking out the
   highest stable tag. On a pull request the last job of `Contribution` runs the dry run.** Rejected: the dry run in
   `test.yml`, whose failure skipped the preview deploy; a job in `deploy.yml`, whose failure would skip the release; a
   `push` trigger, which published untested commits; the `release` event, which a release created with `GITHUB_TOKEN`
   does not fire; checking out the release commit, which let a re-run of an older release publish over a newer one.
10. **`@figma/code-connect` takes updates like any other dependency: the weekly update and Dependabot.**
    `scripts/figmaConnect.ts` reads the CLI's log lines and its `preview --output json` result, so the unit tests parse
    every generated file with the installed CLI against a local stand-in for Figma's API, and an update that changes the
    output fails its own pull request. Rejected: holding it back, which made every bump a chore; testing against sample
    output kept in the repository, which an update leaves as it is.
11. **A property no rule places is placed by the library's history, read on every run that prints lines and stored
    nowhere; what history cannot place is reported as unknown, with a question when exactly one PDS prop of its type is
    missing.** A BOOLEAN, TEXT, INSTANCE_SWAP or SLOT key keeps its `#<id>` through a rename; a VARIANT is paired by its
    options with the PDS name that vanished when it appeared. The cost: up to 41 requests and about 2 minutes on every
    run with such a property; a rename older than 40 versions or 90 days stays unplaced; the token needs
    `file_versions:read`. Rejected: pairing by type on the current pull, which renames a design-only property into the
    wrong PDS prop silently; a committed id-to-name map, decision 3's rejected pull in a smaller coat; the
    `LIBRARY_PUBLISH` webhook, which carries no property names; a fixed reference version, whose answer changes at each
    release.
12. **A required prop the Figma component lacks is written anyway: a required boolean (`open`) as on, and a required
    text prop (`name`, `value`, `label`) as `""` unless Figma has the text.** Without them a snippet does not compile in
    React, where the props are required; an empty value invents no data and tells the developer to supply it. The cost:
    `""` passes `validateProps`, so a snippet pasted unchanged gives a field with an empty name. Rejected: leaving them
    out, which gave every variant of those components a snippet that does not compile; `name="name"`, which reads like a
    chosen value; bare `name`, which JSX reads as `name={true}`; `name={name}`, a variable the snippet does not define;
    `name="TODO"`, which can ship unnoticed; asking design for properties a frame has nothing to show for.
13. **A closed accepted gap is deleted by a weekly job on `main`, through an issue the Copilot coding agent turns into
    the pull request; any pull request may still commit the dry run's artifact first.** The deletion had no owner and
    landed on whichever pull request ran next. Weekly is enough: nothing publishes between releases. The agent commits
    because `main` requires signed commits, which GitHub gives the agent's and not a job's; it has no Figma token, so
    the file travels in the issue. Rejected: committing through GitHub's API, which needs write scopes on the token; a
    pull request from the dry run, which runs with a read-only token; a daily run; a standing issue (decision 6).
