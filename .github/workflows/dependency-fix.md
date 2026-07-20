---
# GitHub Agentic Workflow (gh-aw) -- self-healing dependency build FIXER.
#
# ============================================================================
#  This markdown file is the SOURCE. Compile it to a runnable
#  `dependency-fix.lock.yml` (which GitHub Actions actually runs):
#      gh extension install githubnext/gh-aw
#      gh aw compile dependency-fix
#  Commit BOTH the `.md` and the generated `.lock.yml`.
# ============================================================================
#
# This is the AGENT half of the loop driven by weekly-dependency-agent.yml.
# That orchestrator builds in GitHub Actions; when the build fails it dispatches
# THIS workflow (via workflow_dispatch) with the failing branch and the build run
# id that holds the `build.log` artifact.
#
#   weekly-dependency-agent.yml  (build fails)
#        |  workflow_dispatch: branch, build_run_id
#        v
#   THIS agent (fully READ-ONLY):
#        1. download build.log from build_run_id
#        2. make the MINIMAL scoped fix (do NOT run a full `npm run build` --
#           the orchestrator rebuilds; reproducing the whole build here is the
#           wasteful double-work we explicitly avoid)
#        3. leave the edits in the working tree; trusted `post-steps` package them
#           into a "fix-patch" artifact (the agent job is read-only, so it can
#           neither push nor dispatch)
#        v
#   weekly-dependency-agent.yml re-enters via `on: workflow_run` when this agent
#   completes, downloads the fix-patch, applies it with a PAT, and rebuilds.
#
# The retry cap lives in the orchestrator (MAX_ATTEMPTS, enforced by counting
# agent runs per branch); this agent just proposes a fix and hands back.

on:
  workflow_dispatch:
    inputs:
      branch:
        description: 'Working branch that failed to build.'
        required: true
      attempt:
        description: 'Fix cycle number (informational; the orchestrator owns the cap).'
        required: false
      build_run_id:
        description: 'Actions run id whose build.log artifact holds the failure.'
        required: true

# The AI agent is fully READ-ONLY (gh-aw strict mode requires it). It only reads
# the failing build log and edits files. The trusted `post-steps` (plain YAML,
# not the LLM) package those edits into a patch and upload it as an artifact —
# uploading an artifact needs no write permission. The orchestrator then re-enters
# via a `workflow_run` trigger, applies the patch with its PAT, and rebuilds.
permissions:
  contents: read
  actions: read

engine: copilot

# Cap wall-clock so a stuck run can't burn budget.
timeout-minutes: 25

# Serialize fix attempts per branch.
concurrency:
  group: dependency-fix-${{ github.event.inputs.branch }}
  cancel-in-progress: false

network: defaults

# Check out the dispatched ref (= the failing branch) with full history so the
# agent edits the exact tree that failed.
checkout:
  fetch: ['*']
  fetch-depth: 0

tools:
  bash:
    # Read the failed build log (artifact) + inspect the tree. NO full build.
    - 'gh run download *'
    - 'gh run view *'
    - 'git *'
    - 'cat *'
    - 'ls *'
    - 'grep *'
    # syncpack helpers + a lockfile refresh are allowed (cheap, deterministic);
    # a full `npm run build` is intentionally NOT in this allowlist.
    - 'npm run npm:*'
    - 'npm install'
    - 'rm -rf package-lock.json node_modules'
  # Allow editing dependency manifests / lockfile / limited source.
  edit:

# Trusted finalization (runs AFTER the LLM, in the same read-only job — plain YAML
# authored by us, not agent-generated). It packages the agent's edits into a patch
# and uploads it as an artifact. It never pushes or dispatches (strict mode keeps
# the agent job read-only); the orchestrator re-enters via its `workflow_run`
# trigger, downloads this artifact, applies it with a PAT, and rebuilds. The patch
# is uploaded even when empty (give-up path) so the orchestrator can tell the
# difference and let its MAX_ATTEMPTS cap escalate — the loop can't dead-end.
post-steps:
  - name: 'Package agent fix as a patch'
    if: always()
    run: |
      set -euo pipefail
      mkdir -p "${RUNNER_TEMP}/gh-aw/agent"
      # Capture every change (including new/deleted files) as one patch.
      git add -A
      git diff --cached --binary > "${RUNNER_TEMP}/gh-aw/agent/fix.patch" || true
      if [ -s "${RUNNER_TEMP}/gh-aw/agent/fix.patch" ]; then
        echo "Agent produced a fix patch ($(wc -l < "${RUNNER_TEMP}/gh-aw/agent/fix.patch") lines)."
      else
        echo "Agent produced no changes (give-up path); uploading an empty patch."
        : > "${RUNNER_TEMP}/gh-aw/agent/fix.patch"
      fi
  - name: 'Upload fix patch'
    if: always()
    uses: actions/upload-artifact@v7
    with:
      name: fix-patch
      path: ${{ runner.temp }}/gh-aw/agent/fix.patch
      if-no-files-found: warn
---

# Self-healing dependency build fixer

You are an autonomous maintenance agent for the **Porsche Design System** monorepo.
The deterministic workflow `weekly-dependency-agent.yml` bumped npm dependencies with
`syncpack`, then ran `npm run build` in GitHub Actions and it **failed**. It dispatched
you with the failing branch and the build log. Your job: make the **smallest, safest
change** that will let the next build pass -- then hand control back to the orchestrator.

Follow **`docs/runbooks/dependency-updates-agent.md`** as the source of truth.

## Inputs

- Branch: `${{ github.event.inputs.branch }}` (already checked out).
- Build run id with the log artifact: `${{ github.event.inputs.build_run_id }}`.

## 1. Read the failure — do NOT rebuild

1. Download and read the build log (do not run a full `npm run build` yourself — the
   orchestrator will rebuild; reproducing the whole build here is wasted work):

   ```bash
   gh run download ${{ github.event.inputs.build_run_id }} -n build-log -D "${RUNNER_TEMP}/gh-aw/agent/build-log"
   cat "${RUNNER_TEMP}/gh-aw/agent/build-log/build.log"
   ```

2. Identify the **root error** and decide whether it is **caused by the dependency
   bump** (it almost always is). If it is clearly unrelated (flaky infra, network,
   Docker-only VRT), do not patch source -- go straight to the *Give up* step.

## 2. Apply the minimal, scoped fix

Preference order (see the runbook for detail):

1. **Peer-dependency (`ERESOLVE`) conflicts** -> add a pinned `overrides` entry in the
   root `package.json` (follow the existing `madge > typescript` / `minimatch@9`
   patterns), then `rm -rf package-lock.json node_modules && npm install` to confirm
   the conflict is resolved. Never use `--legacy-peer-deps` or `--force`.
2. **A too-new transitive/direct version** -> pin a compatible version via `overrides`,
   or relax an obsolete override.
3. **Non-breaking API changes** in a bumped package -> adapt the affected source
   minimally, keeping PDS conventions (see `AGENTS.md` / the package `AGENTS.md`).
4. Keep ranges consistent: `npm run npm:lint:fix && npm run npm:format:fix`.

You MAY run `npm install` to validate the lockfile resolves. You MUST NOT run the full
`npm run build`, e2e, or VRT suites -- the orchestrator revalidates by rebuilding.

### Hard rules -- never do these (from the runbook)

- Never run `npm audit fix` / `npm audit fix --force`.
- Never use `--legacy-peer-deps` or `--force`.
- Never hand-edit dependency versions syncpack owns, or hand-edit `package-lock.json`.
- Never bump held-back deps: `@stencil/core`, `@playwright/test`, `@angular/*`
  migrations, `typescript` past Angular's `MAX_TS_VERSION`, `@porsche-design-system/**`.
- Never push to `main`. You only ever push to the dispatched working branch.

## 3. Hand back to the build (automatic — just leave your edits)

Do **not** commit, push, or dispatch anything yourself — the agent job is read-only.
Simply leave your fix as edits in the working tree. A trusted finalization step then
packages your edits into a patch artifact; the orchestrator picks it up (via its
`workflow_run` trigger), applies it, and rebuilds. If it still fails it dispatches you
again (up to the `MAX_ATTEMPTS` cap) or escalates to a human. When you have made your
minimal edits (or decided none are safe — see below), **stop**.

## Give up (out of scope / not fixable here)

If the failure is not plausibly caused by the bump, needs a **major** upgrade with
breaking source changes, requires changing a held-back dependency, or needs Docker-only
VRT regeneration, do **not** force a change: **make no edits** and stop. An empty patch
is uploaded, the orchestrator rebuilds the unchanged branch, and its cap escalates to a
human via an issue.












