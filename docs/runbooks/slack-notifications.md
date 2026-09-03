# Slack notifications

Two workflows post to Slack. Both use `slackapi/slack-github-action` with `webhook-type: webhook-trigger`, which starts
a **Slack Workflow Builder** workflow. The message layout lives in Slack. The repository only delivers variables.

| Notification     | Workflow                                        | Fires on                                       | Secret                      |
| ---------------- | ----------------------------------------------- | ---------------------------------------------- | --------------------------- |
| Release          | `.github/workflows/release.yml`                 | a release the run actually created             | `SLACK_RELEASE_WEBHOOK_URL` |
| Pipeline failure | `.github/workflows/notify-pipeline-failure.yml` | `Contribution` or `OSS Review Toolkit` failing | `SLACK_WEBHOOK_URL`         |

## Release announcement

On a push to `main` or `v4`, `release.yml` creates the GitHub Release and then the `notify-release` job announces it. It
only fires when a release was really created, so a pre-release and a re-run of a job whose release already existed both
post nothing.

The job reads the release back from the GitHub API rather than re-reading the changelog, so the Slack message and the
GitHub Release cannot disagree. `scripts/build-slack-release-payload.ts` turns those release notes into three variables:

| Variable      | Contents                                  |
| ------------- | ----------------------------------------- |
| `version`     | `v4.7.0`                                  |
| `body`        | the release notes, stripped to plain text |
| `release_url` | the GitHub Release link                   |

The names must match the Slack workflow's `input_parameters` exactly or the request is rejected. `release_url` is
separate from `body` so truncation can never eat it.

## Why the notes are stripped rather than formatted

Workflow Builder renders variable values as **plain text**. Markdown and Slack mrkdwn both print literally, so the
script removes them instead of converting: headings become `*** ADDED ***`, `**Breaking Change**` becomes
`:warning: Breaking Change`, pull request links are reduced to the bare URL, and Prettier's hard wrapping is undone.
Backticks stay, because in a message where nothing renders they are the only sign that a word is an API name.

Two consequences that are easy to trip over:

- **Bare URLs are the only clickable form.** Slack auto-links them, but there is no way to give one a label, which is
  why pull request numbers are gone.
- **Nothing needs HTML-escaping**, unlike everywhere else in Slack, because `&`, `<` and `>` are only special where
  mrkdwn is parsed.

There are no unit tests. The transform order inside the script matters and is commented there; after changing it, send a
real message and read it.

## Size limit

Slack documents none, so it was measured: **12,153 characters is delivered, 19,990 is rejected** with _"The message
content exceeded the size limit"_. The script caps the body at 12,000 and cuts on an entry boundary, adding a tail
naming the sections it dropped. Only a major release has ever come close.

## Changing things

- **Wording, layout or channel** are edited in Workflow Builder and republished. The trigger URL and the repository
  secret do not change.
- **What the message says about a release** is `scripts/build-slack-release-payload.ts`.
- **A new variable** must be declared on the Slack workflow first. A key Slack does not know about fails the whole
  request.
- **Rotating a webhook** means deleting the trigger in Workflow Builder, creating a new one, and updating the secret
  under **Settings → Secrets and variables → Actions**.

A revoked or missing webhook fails the sending job rather than passing green, because both Send steps set `errors: true`
against the action's default of `false`.

## Pipeline failure

`notify-pipeline-failure.yml` watches the `Contribution` and `OSS Review Toolkit` workflows and posts when one fails on
a monitored branch. It runs the default-branch copy of itself and checks the triggering run came from this repository,
so a fork cannot reach the webhook. There is also a `workflow_dispatch` path taking a run ID, for rehearsing against a
past failure. `scripts/build-slack-payload.ts` builds its seven variables: `workflow`, `branch`, `event`, `run_url`,
`author`, `failed_count` and `failed_jobs`.

> **Slack side to be filled in.** The app manifest and the trigger definition behind `SLACK_WEBHOOK_URL` were never
> recorded anywhere. Still missing: the Slack app name, the destination channel, and the name of the Workflow Builder
> workflow.
