# Slack notifications

Two workflows post to Slack, and they work differently.

| Notification     | Workflow                                        | Fires on                                       | How it posts                        |
| ---------------- | ----------------------------------------------- | ---------------------------------------------- | ----------------------------------- |
| Release          | `.github/workflows/release.yml`                 | a release the run actually created             | `chat.postMessage` with a bot token |
| Pipeline failure | `.github/workflows/notify-pipeline-failure.yml` | `Contribution` or `OSS Review Toolkit` failing | a Workflow Builder trigger          |

The difference is deliberate. The release announcement needs formatted release notes, which only a Block Kit `markdown`
block renders, and that needs a bot token. The failure notification is six short fields, which Workflow Builder handles
without an app install.

## Release announcement

On a push to `main` or `v4`, `release.yml` creates the GitHub Release and then the `notify-release` job announces it. It
only fires when a release was really created, so a pre-release and a re-run of a job whose release already existed both
post nothing.

The job reads the release back from the GitHub API rather than re-reading the changelog, so the Slack message and the
GitHub Release cannot disagree.

### Secrets

| Secret                     | What                                                        |
| -------------------------- | ----------------------------------------------------------- |
| `SLACK_BOT_TOKEN`          | bot token with the `chat:write` scope                       |
| `SLACK_RELEASE_CHANNEL_ID` | destination channel, a secret so it can change without a PR |

The app must be invited to the channel, otherwise Slack answers `not_in_channel`.

### The message

`scripts/build-slack-release-payload.ts` builds four blocks: an intro, a divider, the release notes, and a link to the
full notes. The notes go across **almost untouched**, because the `markdown` block renders standard markdown — links
keep their labels, headings are headings, nested lists stay nested, and hard-wrapped lines reflow on their own.

Two things the script still has to do, both found by testing rather than documented by Slack:

- **Fenced code blocks are de-indented to column 0.** At column 0 they render with syntax highlighting; indented under a
  bullet, as they are throughout the changelog, they come out as plain text.
- **The payload stays under 12,000 characters**, Slack's cumulative limit across every `markdown` block in one message,
  so the intro and footer count against the notes. Past that the notes are cut on an entry boundary and a tail names the
  sections that were dropped. Only a major release has ever come close.

There are no unit tests. After changing the script, send a real message and read it.

### Changing things

- **Wording and layout** live in `scripts/build-slack-release-payload.ts`, so changing them is a pull request.
- **The channel** is `SLACK_RELEASE_CHANNEL_ID`, changeable without one.
- **Rotating the token** is done in the Slack app under **OAuth & Permissions**, then updating the secret.

A missing or revoked token fails the sending job rather than passing green, because the Send step sets `errors: true`
against the action's default of `false`.

### If it ever has to go back to a webhook

The `markdown` block works on neither an incoming webhook, where it returns HTTP 500
(`slackapi/slack-github-action#440`), nor a Workflow Builder trigger, which accepts no blocks at all. A webhook version
has to strip the markdown to plain text instead: Workflow Builder renders variables literally, so `**bold**`,
`[label](url)` and backticks all print as written, though bare URLs are still auto-linked and nothing needs
HTML-escaping.

## Pipeline failure

`notify-pipeline-failure.yml` watches the `Contribution` and `OSS Review Toolkit` workflows and posts to the
`SLACK_WEBHOOK_URL` trigger when one fails on a monitored branch. It runs the default-branch copy of itself and checks
the triggering run came from this repository, so a fork cannot reach the webhook. There is also a `workflow_dispatch`
path taking a run ID, for rehearsing against a past failure. `scripts/build-slack-payload.ts` builds its seven
variables: `workflow`, `branch`, `event`, `run_url`, `author`, `failed_count` and `failed_jobs`. Their names must match
the Slack workflow's `input_parameters` exactly or the request is rejected.
