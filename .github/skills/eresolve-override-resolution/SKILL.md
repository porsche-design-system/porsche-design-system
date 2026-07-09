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
3. Delete **both** `package-lock.json` and `node_modules`, then run `npm install`
   **twice** — a clean install makes npm omit platform-specific
   `optionalDependencies` (e.g. syncpack's binary); a second install re-adds them.
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

Stop once `npm install` completes cleanly and `overrides-added.json` is written.
