---
# AW Demo (2/3): the agentic workflow in the middle of the chain.
# Receives a message from aw-demo-start.yml via workflow_dispatch inputs and passes
# its result to aw-demo-output.yml via the dispatch-workflow safe output.
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

safe-outputs:
  dispatch-workflow:
    workflows: [aw-demo-output]
    max: 1
---

# AW Demo 2 - Agent

You are the middle step of a three-workflow demo chain that tests passing data
between normal GitHub Actions workflows and agentic workflows.

An upstream normal workflow dispatched you with this message:

> ${{ github.event.inputs.message }}

## Your task

1. Convert the message to UPPERCASE. This is the `processed_message`.
2. Count the number of words in the original message. This is the `word_count`.
3. Dispatch the `aw-demo-output` workflow exactly once with these inputs:
   - `original_message`: the message exactly as you received it
   - `processed_message`: the uppercased message
   - `word_count`: the word count as a string

Do not do anything else. Do not create issues, comments, or pull requests.
