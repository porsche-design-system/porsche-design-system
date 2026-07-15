# Dependency-Bump Update Agent

You run the single agentic stage of the dependency-bump workflow. Everything mechanical is a script; you reason ONLY when `npm install` reports ERESOLVE. This task supersedes `docs/runbooks/dependency-updates-agent.md` — do only what is written here.

## Policy (what the automated bump may change)

The single source of truth is `.syncpackrc.json` `updateGroups`:

- **Permanently held** (`@porsche-design-system/**`, `@playwright/test`, `@stencil/core`): never updated.
- **Minor/patch-only families** (`@angular/**`, `ng-packagr`, `zone.js`, `ag-grid-*`, React core, `@react-router/**`, Vue, `@vitejs/plugin-vue`, `tailwindcss`, `@tailwindcss/**`, `sass`, `@emotion/**`, `@vanilla-extract/**`): capped to minor/patch by `target: "minor"`; majors are upgraded by hand.
- **Everything else**: updated to latest, INCLUDING majors — these are expected; resolve conflicts and let the verify gate prove them.

`typescript` is not a family but is held under Angular's `@angular/compiler-cli` peer ceiling by `scripts/update-dependencies.ts`. Every available upgrade the flow did not apply (families, permanent holds, other majors) is surfaced informationally via `npm run deps:held-back` and rendered into the PR's held-back table; it needs no action from you.

## Hard rules (never violate)

- Never use `--force`, `--legacy-peer-deps`, or any `npm audit fix`.
- Activate the `resolving-npm-eresolve` skill BEFORE editing any peer range or override. It is the decision brain for every remedy.
- After editing a wrapper SOURCE peer range (`packages/components-<fw>/projects/<fw>-wrapper/package.json`), run the exact `npm run preinstall:components-<fw>` and prove source == generated dist with `git diff --no-index` BEFORE the next install. Never edit dist directly.
- After any `overrides` change: delete `package-lock.json` AND all `node_modules`, reinstall, inspect lockfile churn (preserve the platform-specific `@next/swc-*` optional entries), then run `npm ci`.
- Never re-run the unrestricted bump after holding a dependency back — do a TARGETED syncpack rollback and keep a run-local exclusion for that dep.
- Git may be unavailable in-sandbox (the `.git` file can point to an unmounted host path). Do not investigate the mount — classification reads the host-snapshotted baseline (`.turbo-spec/out/deps-baseline.json` + `package-json-files.json`, written by preflight) and the current tree from disk, so `classify-bump.ts` never needs git.
- Platform-specific native binaries are reconciled deterministically by `scripts/dep-bump/bump.sh` (via `ensure-platform-binaries.sh`) before the first `tsx`/`syncpack` call. NEVER hand-patch `node_modules`, fetch platform tarballs, or manually install `@esbuild/*`/`syncpack-*` binaries — if a script reports a platform-binary error, that is a bug to surface, not to work around.
- Override pruning, syncpack lint/format fixes, and the "nothing left to update" gate run deterministically in the normalize stage (`scripts/dep-bump/normalize.sh`) AFTER you finish. Do not run `npm run npm:lint:fix`, `npm run npm:format:fix`, or prune overrides yourself.

## Procedure

1. Run `bash scripts/dep-bump/bump.sh`. Read `.turbo-spec/out/bump.json`.
   - If `outcome == "NO_CHANGES"`: restore the entry tree (`git checkout -- .` on tracked manifests only), author `update.json` with `outcome: "NO_CHANGES"` and empty `filesChanged`, and stop.
   - If `heldViolations` is non-empty: a permanently-held dependency changed, or a minor/patch-capped family took a MAJOR that slipped past the syncpack `target: "minor"` cap. Do a targeted syncpack rollback of exactly those names, re-run install-check, and record the holdback. Do NOT re-run the unrestricted bump.
   - Otherwise enumerate every old->new transition and flag every MAJOR. Majors on non-family deps are in-scope and expected; carry them into install and verify.
2. Run `bash scripts/dep-bump/install-check.sh`.
   - Exit 0 (`CLEAN`): converge on the verify gate's exact criterion before stopping. Run
     `npm ls --all --json > .turbo-spec/out/ls-current.json 2>/dev/null || true` then
     `node --import tsx scripts/dep-bump/tree-compare.ts` (the SAME baseline-diff `verify` runs).
     - Exit 0 (no NEW edges vs the S1 baseline): author `update.json` with `outcome: "RESOLVED"`, the bumped list, and the changed files. Stop.
     - Exit 1 (NEW invalid/extraneous edges introduced by this run — see `.turbo-spec/out/tree-compare.json`): treat each `introduced` edge as a conflict and go to Resolve. If, after the skill's remedies, the only remaining blocker is a pre-existing or out-of-scope third-party edge you cannot fix, author `outcome: "BLOCKED_PREEXISTING"` with a `stopReason` and KEEP the valid bumps in `filesChanged` — do NOT discard safe minor bumps to signal a block.
   - Exit 3 (`ERESOLVE`): the deterministic reinstall-first retry in `install-check.sh` has ALREADY run and still hit ERESOLVE — this is a PERSISTENT conflict. Read `.turbo-spec/out/install.log` and go to Resolve. Do not run `npm run npm:reinstall` yourself as a first response; it has been tried.
   - Exit 2 (`INSTALL_FAILED`): retry once for transient reasons; if it persists, author `outcome: "BLOCKED"` with a `stopReason` and restore the tree.

## Resolve (ERESOLVE only)

Activate the `resolving-npm-eresolve` skill and follow it per conflict: gather evidence, establish compatibility independently, then apply the remedy the skill dictates (widen our stale wrapper SOURCE range and materialize; add a SCOPED root override with the clean lock+node_modules regeneration; or hold back a breaking major via targeted rollback). Re-run `bash scripts/dep-bump/install-check.sh` after each remedy.

### Run-control (yours, not the skill's)

- **Load the ledger FIRST, every iteration.** Before any remedy, check `.turbo-spec/out/resolve-ledger.json` (seeded by the stage and persisted across loop-backs) with `node --import tsx scripts/dep-bump/ledger.ts check '<fingerprintJson>'` where the fingerprint is `{declarer, peer, demandedRange, providerVersion}`. A non-zero exit means this exact conflict already has a FAILED evidence-backed remedy — do NOT re-attempt it; immediately author the terminal outcome (`BLOCKED` if you restored the tree, `BLOCKED_PREEXISTING` if valid bumps remain) with a `stopReason`, and stop.
- **Record every remedy immediately, before the next install.** After choosing and applying a remedy, append it with `node --import tsx scripts/dep-bump/ledger.ts record '{"fingerprint":<fp>,"remedy":"…","outcome":"FAILED|RESOLVED|NON_ACTIONABLE","evidence":"…"}'` BEFORE you re-run `npm install`. Recording after the install (or only at the end) is why the ledger was empty on prior loop-backs — write it first so a re-entry sees it.
- **Optional peers are non-actionable.** npm `overrides` cannot force-install an OPTIONAL peer (`peerDependenciesMeta.<name>.optional === true`) that has no real install edge. Do not attempt an override remedy for such an edge — record it in the ledger as a non-actionable third-party conflict and stop. Do not theorize; this is a fixed rule.
- STOP if the same fingerprint survives one evidence-backed remedy, or after a hard cap of 6 total resolve iterations. On stop, author `outcome: "BLOCKED"` (tree restored) or `outcome: "BLOCKED_PREEXISTING"` (valid bumps retained) with a `stopReason` describing the conflict and what a follow-up migration needs.

## Fixable advisories (only when Resolve surfaces one)

The `npm audit` summary is report-only and rendered into the PR by a script — you never run `npm audit fix`. Act ONLY on an advisory that is *fixable via a scoped override* and that blocks a bump you are resolving:

- Activate the `resolving-npm-eresolve` skill's "Security advisory" row: choose the narrowest pinned `overrides` entry whose patched version satisfies the consumer's major. Never auto-jump to the globally-first patched version.
- After adding the override, follow the same regeneration rule as any override change (delete lock + node_modules, reinstall), then re-run `bash scripts/dep-bump/install-check.sh`.
- Record the override you added under `overridesAdded` in `update.json`. Override *pruning* is the normalize stage's job — do not remove overrides yourself.

## Authoring `update.json` (required, every path)

Write `.turbo-spec/out/update.json` conforming to `.turbo-spec/schemas/dep-bump-update.schema.json`:
`{ schemaVersion: 1, outcome, summary, bumped, conflicts, overridesAdded, holdbacks, filesChanged, stopReason }`.

- `outcome`: `RESOLVED` only when `npm install` resolved clean AND the tree baseline-diff reports no NEW edges; `NO_CHANGES` when nothing was bumped; `BLOCKED` when a breaking major or held-back-only advisory could not be safely resolved and you restored the tree; `BLOCKED_PREEXISTING` when valid bumps were applied and RETAINED but a pre-existing/out-of-scope edge blocks the gate (escalate without discarding work).
- If you restored the tree (NO_CHANGES or BLOCKED), `filesChanged` MUST be empty — do not claim edits you rolled back. For `BLOCKED_PREEXISTING`, keep the retained bumps in `filesChanged` and set a non-null `stopReason`.
- A retained breaking major with unverified behavior is BLOCKED, never RESOLVED.
