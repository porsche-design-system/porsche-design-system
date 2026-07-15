# Dependency-Bump PR Tables — Data Scripts Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **On exit from plan mode:** first copy this plan to `docs/superpowers/plans/2026-07-15-dep-bump-pr-tables.md` (repo convention, next to `2026-07-13-dep-bump-workflow.md`), then implement.

**Goal:** Produce two machine-readable JSON datasets — packages we **updated** and packages we **held back** (an update is available but was not applied) — and render them into two Markdown tables for the dependency-bump PR comment.

**Architecture:** "Approach B" — after syncpack applies the capped bump, the installed tree already encodes every policy decision. `classify-bump.ts` (already run in the update stage) is the *updated* dataset; a new data-only `held-back.ts` runs `npm outdated` on the post-bump tree and reports every **declared** dependency where `latest > current` (whatever gap syncpack's cap left behind), tagged by semver level, with a policy-derived *reason label only* (never used for detection). A thin renderer turns the two JSON datasets into Markdown. No syncpack text parsing, no glob re-implementation for detection, no prose.

**Tech Stack:** TypeScript + `tsx`, Node `node:test`, `semver` (already a dep), syncpack v15 / `npm outdated --json`, turbo-spec workflow (`.turbo-spec/workflows/dep-bump.yml`), `gh` CLI.

## Global Constraints

- Node v24; run scripts with `node --import tsx …`. Tests: `npm run test:dep-bump` (`node --import tsx --test scripts/dep-bump/*.test.ts`).
- **Detection is version-driven, never policy-glob-driven.** Held back iff `latest > current` on the post-bump tree AND the package is declared in a workspace `package.json`. `.syncpackrc.json` policy is read **only** to label *why* (`family` / `held` / `other`) — a wrong label must never drop or add a package.
- **Data-only script outputs.** `held-back.ts` and `classify-bump.ts` emit JSON (via `writeVerdict`) + JSON to stdout. No Markdown, no prose. Only `render-pr-tables.ts` emits Markdown, and that is tables + headings + at most a one-line status note.
- **Git-independent in-sandbox (F6).** Enumerate declared deps from `.turbo-spec/out/package-json-files.json` when present; fall back to `git ls-files` only outside the sandbox.
- **Tri-state, never fail-open.** `held-back.json.status` ∈ `UNAVAILABLE` (tree not installed / npm outdated unparseable), `INCOMPLETE` (a declared candidate lacked current/latest), else `COMPLETE`. `UNAVAILABLE`/`INCOMPLETE` never render as "nothing held back".
- `npm outdated --json` is the single availability source (syncpack v15 has no machine-readable `update` output — confirmed).
- `@porsche-design-system/**` (unpublished internals) excluded from held-back output.
- Commit after every task; keep the tree compiling and `npm run test:dep-bump` green at each boundary.

---

## File Structure

- `scripts/dep-bump/semver-level.ts` **(new)** — shared `classifyLevel(from,to)` + `isNewer(from,to)` + `SemverLevel` type.
- `scripts/dep-bump/classify-bump.ts` **(modify)** — add `level` to each `BumpChange`. `bump.json.changes` = updated dataset.
- `scripts/dep-bump/held-back.ts` **(new, replaces `major-hint.ts`)** — data-only held-back detector → `held-back.json`.
- `scripts/dep-bump/major-hint.ts` + `major-hint.test.ts` **(delete)**.
- `scripts/dep-bump/report.ts` + `.turbo-spec/schemas/dep-bump-report.schema.json` **(modify)** — drop `majorHints`/`majorHintStatus` coupling (PR comment is the surface now).
- `scripts/dep-bump/render-pr-tables.ts` **(new)** — reads `bump.json` + `held-back.json`, writes `pr-tables.md`.
- `scripts/dep-bump/post-pr-tables.sh` **(new)** — upsert PR comment via `$TURBO_SPEC_PR_NUMBER`.
- `package.json` **(modify)** — `deps:major-hint` → `deps:held-back`; add `deps:pr-tables`.
- `.turbo-spec/workflows/dep-bump.yml` **(modify)** — report stage: swap step + add `post_command`.
- Tests: `semver-level.test.ts`, `held-back.test.ts`, `render-pr-tables.test.ts` **(new)**; `classify-bump.test.ts`, `report.test.ts` **(modify)**.

**Datasets:**
- `bump.json` → `{ schemaVersion, outcome, changes: [{ name, from, to, major, level }], heldViolations }`.
- `held-back.json` → `{ schemaVersion, status, packages: [{ name, current, latest, level, reason }], note? }`.

---

### Task 1: Shared semver-level helper
- Create `scripts/dep-bump/semver-level.ts`: `SemverLevel`, `classifyLevel(from,to)` (coerce ranges; normalise pre* → base; null → 'unknown'), `isNewer(from,to)` (coerce + `gt`).
- TDD via `semver-level.test.ts` (major/minor/patch, range coercion, premajor→major, unknown, isNewer truth table).
- Commit.

### Task 2: `level` on the updated dataset (`classify-bump.ts`)
- Import `classifyLevel`/`SemverLevel`; add `level` to `BumpChange`; replace the semverDiff/boolean block with `const level = classifyLevel(from,to); const major = level==='major';`; delete `MAJOR_LEVELS`.
- Update `classify-bump.test.ts` expectation to include `level: 'patch'` / `level: 'major'`.
- `npm run test:dep-bump`; commit.

### Task 3: Data-only held-back detector; retire `major-hint.ts`
- New `held-back.ts` with `buildHeldBack(ok, treeInstalled, outdated, declared:Set, policy)`: skip non-declared (transitive) and `@porsche-design-system/` internals; `!current||!latest`→INCOMPLETE; `isNewer(current,latest)` gate; `level`+`reason` (`family` if minorOnly, else `held` if ignored, else `other`); tri-state. CLI reads `npm outdated --json`, `existsSync(node_modules)`, declared from preflight snapshot (fallback `trackedPackageJsonFiles`), writes `held-back.json` + stdout JSON.
- TDD `held-back.test.ts` (family major, ignored patch, other major, transitive excluded, internal excluded, not-newer skipped, UNAVAILABLE ×2, COMPLETE-empty, INCOMPLETE).
- `git rm major-hint.ts major-hint.test.ts`; in `report.ts` remove the major-hint import + `majorHints`/`majorHintStatus` fields + `NO_HINT` + the third `buildReport` arg + the `major-hint.json` read (buildReport → two args); delete the `report.test.ts` "threads major hints" test; remove the two schema properties.
- Grep clean for `major-hint|majorHint|MajorHint`; `npm run test:dep-bump`; commit.

### Task 4: Render two Markdown tables (`render-pr-tables.ts`)
- `renderTables(updated: BumpChange[], held: HeldBackResult)`: leading `MARKER='<!-- dep-bump-tables -->'`; "Updated dependencies (N)" table (Package|From|To|Bump) or `_No dependencies were updated._`; "Available updates held back (M)" table (Package|Current|Latest|Bump|Reason); UNAVAILABLE → `> ⚠️ Held-back data unavailable …`; COMPLETE-empty → `_No held-back updates: everything updatable is up to date._`; INCOMPLETE → append `> ⚠️ note`. `TAG` maps SemverLevel→MAJOR/MINOR/PATCH; `REASON` maps family/held/other→labels. CLI reads `bump.json`.changes + `held-back.json`, writes `pr-tables.md` + stdout.
- TDD `render-pr-tables.test.ts` (both tables + marker + level/reason cols, empty updated, complete-empty held, UNAVAILABLE warns, INCOMPLETE partial note).
- `npm run test:dep-bump`; commit.

### Task 5: Wire scripts + post PR comment
- `package.json`: replace `deps:major-hint` with `deps:held-back` + `deps:pr-tables`.
- New `scripts/dep-bump/post-pr-tables.sh` (executable): no-op if `$TURBO_SPEC_PR_NUMBER` unset or body missing; else `gh pr comment "$pr" --edit-last --body-file … || gh pr comment "$pr" --body-file …`.
- `dep-bump.yml` report stage: replace the `major-hint` step with a `held-back` step (`npm run --silent deps:held-back || true`), then add best-effort `pr-tables` step running `deps:pr-tables && post-pr-tables.sh` (steps, not a `post_command`, to reuse the proven script-gate mechanism).
- Validate YAML + grep wiring; `npm run test:dep-bump`; manual smoke (`deps:held-back` + `deps:pr-tables`); commit.

---

## Notes & known boundaries (document, don't fix here)
- `latest` = latest stable dist-tag → staged-rollout majors not yet on `latest` won't show (intended; no RC noise).
- Multi-location packages collapse to `npm outdated`'s `value[0]`; different majors across workspaces show only one `current`.
- Comment idempotency uses `--edit-last`; if interleaved bot comments cause mis-edits, upgrade `post-pr-tables.sh` to find by `MARKER`.
- Reason is a label only; a non-policy hold (e.g. ERESOLVE rollback) still shows as `reason: other`.

## Self-Review
- Approach B only ✓; data-only outputs ✓; two tables ✓; detector prose deleted ✓; usable to write PR comment ✓.
- Types thread: `SemverLevel` → `BumpChange.level`/`HeldPackage.level`/`TAG`; `HeldBackResult`/`buildHeldBack` consistent Tasks 3–4; `renderTables`/`MARKER` consistent impl/test/`post-pr-tables.sh`; `buildReport` two-arg in impl + test.
