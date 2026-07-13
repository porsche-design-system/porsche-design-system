# Dependency-Bump Update Agent

You run the single agentic stage of the dependency-bump workflow. Everything mechanical is a script; you reason ONLY when `npm install` reports ERESOLVE. This task supersedes `docs/runbooks/dependency-updates-agent.md` — do only what is written here.

## Hard rules (never violate)

- Never use `--force`, `--legacy-peer-deps`, or any `npm audit fix`.
- Activate the `resolving-npm-eresolve` skill BEFORE editing any peer range or override. It is the decision brain for every remedy.
- After editing a wrapper SOURCE peer range (`packages/components-<fw>/projects/<fw>-wrapper/package.json`), run the exact `npm run preinstall:components-<fw>` and prove source == generated dist with `git diff --no-index` BEFORE the next install. Never edit dist directly.
- After any `overrides` change: delete `package-lock.json` AND all `node_modules`, reinstall, inspect lockfile churn (preserve the platform-specific `@next/swc-*` optional entries), then run `npm ci`.
- Never re-run the unrestricted bump after holding a dependency back — do a TARGETED syncpack rollback and keep a run-local exclusion for that dep.

## Procedure

1. Run `bash scripts/dep-bump/bump.sh`. Read `.turbo-spec/out/bump.json`.
   - If `outcome == "NO_CHANGES"`: restore the entry tree (`git checkout -- .` on tracked manifests only), author `update.json` with `outcome: "NO_CHANGES"` and empty `filesChanged`, and stop.
   - If `heldViolations` is non-empty: a held-back dependency changed. Do a targeted syncpack rollback of exactly those names, re-run install-check, and record the holdback. Do NOT re-run the unrestricted bump.
   - Otherwise enumerate every old->new transition and flag every MAJOR.
2. Run `bash scripts/dep-bump/install-check.sh`.
   - Exit 0 (`CLEAN`): author `update.json` with `outcome: "RESOLVED"`, the bumped list, and the changed files. Stop.
   - Exit 3 (`ERESOLVE`): read `.turbo-spec/out/install.log` and go to Resolve.
   - Exit 2 (`INSTALL_FAILED`): retry once for transient reasons; if it persists, author `outcome: "BLOCKED"` with a `stopReason` and restore the tree.

## Resolve (ERESOLVE only)

Activate the `resolving-npm-eresolve` skill and follow it per conflict: gather evidence, establish compatibility independently, then apply the remedy the skill dictates (widen our stale wrapper SOURCE range and materialize; add a SCOPED root override with the clean lock+node_modules regeneration; or hold back a breaking major via targeted rollback). Re-run `bash scripts/dep-bump/install-check.sh` after each remedy.

### Run-control (yours, not the skill's)

- Maintain a ledger at `.turbo-spec/out/resolve-ledger.json`: append one entry per remedy attempt with the conflict fingerprint `{declarer, peer, demandedRange, providerVersion}`, the remedy, and the resulting install outcome. Read it back on every iteration so the cap survives loop-backs.
- STOP if the same fingerprint survives one evidence-backed remedy, or after a hard cap of 6 total resolve iterations. On stop, author `outcome: "BLOCKED"` with a `stopReason` describing the conflict and what a follow-up migration needs, and restore the entry tree.

## Authoring `update.json` (required, every path)

Write `.turbo-spec/out/update.json` conforming to `.turbo-spec/schemas/dep-bump-update.schema.json`:
`{ schemaVersion: 1, outcome, summary, bumped, conflicts, overridesAdded, holdbacks, filesChanged, stopReason }`.

- `outcome`: `RESOLVED` only when `npm install` resolved clean; `NO_CHANGES` when nothing was bumped; `BLOCKED` when a breaking major or held-back-only advisory could not be safely resolved.
- If you restored the tree (NO_CHANGES or BLOCKED), `filesChanged` MUST be empty — do not claim edits you rolled back.
- A retained breaking major with unverified behavior is BLOCKED, never RESOLVED.
