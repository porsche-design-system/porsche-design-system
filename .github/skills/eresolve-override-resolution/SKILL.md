---
name: eresolve-override-resolution
description: "Resolve an npm ERESOLVE peer conflict against a third-party dependency by adding a scoped, pinned root override."
version: "1.0"
---

# ERESOLVE Override Resolution

`npm install` failed with an `ERESOLVE` peer conflict against a third-party
dependency. Resolve it with a **minimal, scoped, pinned** root `overrides` entry.

## Inputs

- `.turbo-spec/out/install-failure.json` — `{ kind, packages, detail }`. You only
  run when `kind == "peer_conflict_thirdparty"`.
- The captured npm install log (`.turbo-spec/out/install.log`).

## Procedure

1. Read the ERESOLVE output and identify the single conflicting package and the
   version the tree needs.
2. Add an entry to the **root** `package.json` `overrides` only. Follow existing
   patterns in that file (e.g. scoped `"pkg > dep"` overrides, pinned versions).
   Prefer the **narrowest** override that resolves the conflict; avoid a blanket
   override that would cross a major version for unrelated consumers.
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

## Hard rules

- Change `overrides` in the **root** `package.json` only — nothing else.
- Never use `--legacy-peer-deps`, `--force`, or `npm audit fix`.
- Never touch a held-back dependency.
- One override per real conflict; do not speculatively add overrides.

Stop once `npm install` completes cleanly and `overrides-added.json` is written.
