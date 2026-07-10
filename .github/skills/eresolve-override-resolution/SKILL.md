---
name: eresolve-override-resolution
description: "Resolve an npm ERESOLVE peer conflict against a third-party dependency by adding an equality-safe, scoped, pinned root override."
version: "1.1"
---

# ERESOLVE Override Resolution

`npm install` failed with an `ERESOLVE` peer conflict against a third-party
dependency. Resolve it with a **scoped, pinned** root `overrides` entry.

## Objective

Produce an install that is **both** ERESOLVE-free **and** survives the downstream
`consistency` gate. A resolution that installs cleanly but drifts a declared
version away from the frozen plan is a **failure** — it is rejected two stages
later (and now at this stage's no-drift check). "Fewest overrides" is not the
goal; a plan-consistent clean install is.

## Inputs

- `.turbo-spec/out/install-failure.json` — `{ kind, packages, detail }`. You only
  run when `kind == "peer_conflict_thirdparty"`.
- `.turbo-spec/out/install.log` — the captured npm install log for THIS stage.
- `.turbo-spec/out/update-plan.json` — the **frozen targets**. Every declared
  dependency must keep exactly the specifier the plan froze; this is what you must
  not drift.

## The equality-safety rule (read before editing anything)

The `consistency` gate compares every **declared** dependency string
(`dependencies` / `devDependencies` / `peerDependencies` /
`optionalDependencies`) against the frozen plan, and it runs `syncpack fix`, which
propagates any cross-workspace version **highest-wins into the declared ranges**.
The `overrides` block itself is invisible to that comparison. Consequences,
verified empirically:

- **A blanket top-level override on a dep that is ALSO declared anywhere is
  UNSAFE.** Example: `overrides["@angular/core"] = "22.0.6"` while a workspace
  declares `@angular/core: ^22.0.4` → `syncpack fix` rewrites the declared
  `^22.0.4` → `22.0.6` → the no-drift gate fails.
- **A scoped nested override is SAFE.** `overrides["@angular/build"] =
  {"@angular/core": "22.0.6"}` creates no declared mismatch; declared ranges are
  untouched.
- **A blanket override on a pure transitive dep (declared in no workspace) is
  SAFE** — this is the existing security-pin pattern (`ejs`, `braces`,
  `minimatch@*`, …).

**Therefore:** if the conflicting package is itself a declared/plan dependency,
use a **scoped `"consumer > dep"` override** — never a blanket top-level pin on
it. A blanket pin is allowed only for a pure transitive dep declared in no
workspace. Never edit a declared range directly.

## Procedure

1. Read the ERESOLVE output and identify the conflicting package and the version
   the tree needs. npm reports only the **first** conflict; resolving it may
   reveal the next. Completion is a **fully clean** `npm install`, not "the named
   conflict is gone" — anything blocking a clean install is in scope.
2. Add an entry to the **root** `package.json` `overrides` only, choosing the
   equality-safe form per the rule above (scoped when the package is declared;
   blanket only for pure transitives). Follow existing patterns in that file.
   Among equality-safe options, prefer the narrowest scope as a tiebreaker.
3. To test a candidate quickly, you may run `npm install`. You do **not** need to
   run the clean `rm package-lock.json node_modules` + double install, nor
   `run-install.mjs`, to "finalize" — the resolve **gate** performs the single
   authoritative clean install (twice, to re-add platform `optionalDependencies`
   such as syncpack's binary) and writes `install.log` + `apply-result.json`. Get
   the overrides right, record them, and end your turn; the gate verifies and, on
   any remaining conflict, loops back with a fresh `install.log` /
   `install-failure.json`.
4. Record what you added by **appending** to
   `.turbo-spec/out/overrides-added.json` (read the existing array first if the
   file exists, so a second steward run after Angular keeps the first run's
   record), as an array:
   ```json
   [{ "package": "eslint", "specifier": "9.0.0", "reason": "peer conflict from some-plugin" }]
   ```

## Iteration budget & escape protocol

- When more than one override may be needed, **binary-search** the candidate set
  (start broad, bisect) rather than re-theorizing. Prefer one empirical
  `npm install` over repeated speculation. Cap total attempts at ~6–8.
- **No placement archaeology.** Do NOT hand-trace npm `--debug` / `placeDep`
  output or crawl other workspaces' `node_modules` to explain *why* npm placed a
  version — that is the thrash this budget exists to prevent. One clean install is
  the authoritative signal. You MAY read a specific package's `package.json`
  `peerDependencies` when you need the exact peer range and no better source
  exists; otherwise cap root-cause hypotheses at 2, then apply the smallest scoped
  override and re-run.
- The **gate owns the authoritative install.** Do not run `run-install.mjs`
  yourself, or do a final clean double-install just to "confirm" — the gate does
  that once per evaluation. Don't reinstall while you are still theorizing.
- The captured `install-failure.json` / `install.log` are fresh and authoritative
  for THIS stage. Reproduce at most once if genuinely needed, then trust your own
  runs; do not reinstall repeatedly just to "see the real error."
- **Escape:** if you hit the attempt cap, or the only clean install would require
  changing a declared range the plan froze (equality-unsafe), STOP. Preserve
  artifacts and write a concise diagnostic to
  `.turbo-spec/out/resolve-diagnostic.json`
  (`{ "kind": "unsatisfiable-conflict", "detail": "…", "attempts": N }`) for
  escalation. Never force an equality-unsafe fix.

## Hard rules

- Change `overrides` in the **root** `package.json` only — nothing else. Never
  edit a declared dependency range in any package.json.
- Never use `--legacy-peer-deps`, `--force`, or `npm audit fix`.
- Never touch a held-back dependency.
- One override per real conflict; do not speculatively add overrides.

Stop once your overrides are correct and `overrides-added.json` is written; the
gate runs the authoritative clean install and verifies the result.
