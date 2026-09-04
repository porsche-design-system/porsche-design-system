# Slack notifications

Three workflows post to Slack. All use `slackapi/slack-github-action` with `method: chat.postMessage` and one shared bot
token, and all build their message as a Block Kit `markdown` block.

| Notification     | Workflow                                         | Fires on                                       | Channel secret             |
| ---------------- | ------------------------------------------------ | ---------------------------------------------- | -------------------------- |
| Release          | `.github/workflows/release.yml`                  | a release the pipeline created                 | `SLACK_RELEASE_CHANNEL_ID` |
| Release          | `.github/workflows/notify-release-published.yml` | a release a person published                   | `SLACK_RELEASE_CHANNEL_ID` |
| Pipeline failure | `.github/workflows/notify-pipeline-failure.yml`  | `Contribution` or `OSS Review Toolkit` failing | `SLACK_FAILURE_CHANNEL_ID` |

## Secrets

| Secret                     | What                                                      |
| -------------------------- | --------------------------------------------------------- |
| `SLACK_BOT_TOKEN`          | bot token with `chat:write`, shared by both notifications |
| `SLACK_RELEASE_CHANNEL_ID` | destination for the release announcement                  |
| `SLACK_FAILURE_CHANNEL_ID` | destination for the failure notification                  |

The app must be invited to each channel, otherwise Slack answers `not_in_channel`. Channels are secrets rather than
literals so either can move without a pull request.

A missing or revoked token fails the sending job rather than passing green, because both Send steps set `errors: true`
against the action's default of `false`.

## Release announcement

Two workflows announce a release, and they are complements rather than duplicates. Both delegate to
`.github/actions/notify-slack-release`, so there is one code path and the message cannot drift.

**The pipeline path.** On a push to `main` or `v4`, `release.yml` creates the release and the `notify-release` job
announces it. It only fires when a release consumers can see was really created, so a pre-release, a draft, and a re-run
of a job whose release already existed all post nothing.

**The manual path.** `notify-release-published.yml` covers a release a person published, most usefully a draft, which is
invisible until someone publishes it. Three documented GitHub behaviours keep the two from overlapping:

- "events triggered by the `GITHUB_TOKEN` will not create a new workflow run", so a pipeline release does not fire
  `release: published`
- "Workflows are not triggered for the `created`, `edited`, or `deleted` activity types for draft releases", so creating
  a draft announces nothing
- "The `prereleased` type will not trigger for pre-releases published from draft releases, but the `published` type will
  trigger", so publishing that draft does announce

**The `GITHUB_TOKEN` condition is load-bearing.** If `release.yml` ever creates releases with a PAT or a GitHub App
token, `published` starts firing for pipeline releases too and every release is announced twice.

Either way the release is read back from the GitHub API rather than the changelog, so the Slack message and the GitHub
Release cannot disagree. `scripts/build-slack-release-payload.ts` builds an intro, the release notes and a link to the
full notes.

The notes go across **almost untouched**, because the `markdown` block renders standard markdown. Three things the
script still has to do, all found by testing rather than documented by Slack:

- **Join the hard-wrapped lines.** A single newline is a hard line break, so Prettier's `proseWrap: 'always'` would
  otherwise show through as ragged 120-column breaks.
- **De-indent fenced code blocks to column 0.** There they render with syntax highlighting; indented under a bullet, as
  they are throughout the changelog, they come out as plain text.
- **Stay under 12,000 characters**, Slack's cumulative limit across every `markdown` block in one message. Past that the
  notes are cut on an entry boundary and a tail names the dropped sections. Only a major release has ever come close.

## Pipeline failure

`notify-pipeline-failure.yml` watches the `Contribution` and `OSS Review Toolkit` workflows and posts when one fails on
a monitored branch. It runs the default-branch copy of itself and checks the triggering run came from this repository,
so a fork cannot reach the token. There is also a `workflow_dispatch` path taking a run ID, for rehearsing against a
past failure.

`scripts/build-slack-payload.ts` reads run metadata from the API rather than the event payload, so both paths execute
identical code, and asks for one specific **attempt** — the API otherwise answers for the newest one, and a re-run
mid-flight once caused a passing run to be announced with "0 failed jobs".

Each failed job is one labelled link pointing at its own failing step. Because job and step names are repository data
landing in a markdown context, they are escaped: a step named `Run npm test -- --grep "*"` would otherwise garble the
message reporting it. The list is capped at 40 entries, which is above any run this repository produces.

## Why not a webhook

Neither notification can use one. The `markdown` block returns HTTP 500 over an incoming webhook
(`slackapi/slack-github-action#440`), and a Workflow Builder trigger accepts no blocks at all and renders its variables
as plain text — `**bold**`, `[label](url)` and backticks all print literally there. Both messages were built that way
originally and both lost their links to it.

## Changing things

Wording and layout live in the two scripts, so changing them is a pull request. Channels are secrets. Rotating the token
is done in the Slack app under **OAuth & Permissions**, then updating `SLACK_BOT_TOKEN`.

There are no unit tests for either script. After changing one, send a real message and read it.
