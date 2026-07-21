---
# AW Demo (2/3): the agentic workflow in the middle of the chain.
# Receives a message from aw-demo-start.yml via workflow_dispatch inputs. The agent
# writes its result to /tmp/gh-aw/aw-demo-result.json; a deterministic post-step
# uploads it as the 'aw-demo-result' artifact. aw-demo-output.yml triggers itself
# on completion of this workflow (workflow_run) and downloads that artifact.
# (The agent job is strictly read-only in gh-aw — it cannot dispatch workflows
# itself outside of safe-outputs, hence the event-driven hand-off.)
# Chain: aw-demo-start.yml → aw-demo-agent.md (agentic) → aw-demo-output.yml
# Compile with: gh aw compile (generates aw-demo-agent.lock.yml)
on:
  workflow_dispatch:
    inputs:
      message:
        description: 'Message passed in from the upstream normal workflow'
        required: true
        type: string
  # TEMP: registers this workflow so it can be dispatched from a non-default branch.
  # The push-triggered run is a no-op (see `if` below). Remove once merged to main.
  push:
    branches: [housekeeping/aw-demo]
  # Allow dispatches from aw-demo-start.yml, whose GITHUB_TOKEN acts as github-actions[bot].
  bots: ["github-actions[bot]"]

if: github.event_name == 'workflow_dispatch'

engine: copilot

# copilot-requests lets the Copilot engine bill inference via the Actions token
# (needs centralized Copilot billing in the org). Fallback: set a COPILOT_GITHUB_TOKEN
# repo secret (fine-grained PAT with Copilot API access) and remove that permission.
permissions:
  contents: read
  copilot-requests: write

timeout-minutes: 10

# Configuring only upload-artifact opts out of the otherwise auto-enabled
# create-issue safe output; the result leaves this workflow via the post-step
# artifact below, so the agent needs no GitHub write capability at all.
safe-outputs:
  upload-artifact:
    max-uploads: 1

post-steps:
  - name: 'Upload agent result as artifact'
    uses: actions/upload-artifact@v7
    with:
      name: aw-demo-result
      path: /tmp/gh-aw/aw-demo-result.json
      if-no-files-found: error
      retention-days: 1
---

# AW Demo 2 - Agent

You are the middle step of a three-workflow demo chain that tests passing data
between normal GitHub Actions workflows and agentic workflows.

An upstream normal workflow dispatched you with this message:

> ${{ github.event.inputs.message }}

## Your task

1. Convert the message to UPPERCASE. This is the `processed_message`.
2. Count the number of words in the original message. This is the `word_count`.
3. Write the result to the file `/tmp/gh-aw/aw-demo-result.json` as a single JSON
   object with exactly these string fields:
   - `original_message`: the message exactly as you received it
   - `processed_message`: the uppercased message
   - `word_count`: the word count as a string

A deterministic step after you finish will upload this file and pass it on.
Do not do anything else. Do not create issues, comments, or pull requests.
