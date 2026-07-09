---
name: override-pruning
description: "Prune stale root package.json overrides (runbook step 7): keep held-back and open-advisory security pins; a candidate is obsolete only when removal is ERESOLVE-free AND npm audit does not regress."
version: "1.0"
---

# Override Pruning

Root `package.json` overrides accrete every week and silently freeze transitive
versions. Remove the ones that are no longer needed. Assumes `pds-facts`.

## Procedure

1. Read the current root `overrides` and `docs/dependencies.md` → _Current
   overrides_. Snapshot the baseline `npm audit --json`
   (`.turbo-spec/out/audit-baseline.json`).
2. Propose a **candidate** removal set to
   `.turbo-spec/out/override-candidates.json` (a JSON array of override keys,
   nested as `"parent > child"`). **Never** propose:
   - a held-back-related pin;
   - a security override whose advisory is still open in the baseline audit.
   When unsure, keep it — the gate is conservative by design.
3. Run `node .turbo-spec/scripts/deps/prune-overrides-run.mjs .` — it probes the
   candidates (batch-first, bounded bisect), removes only those whose removal is
   **ERESOLVE-free AND causes no `npm audit` regression**, applies the removals to
   `package.json`, and writes `overrides-removed.json` + `prune-result.json`.
4. For every removed entry, update `docs/dependencies.md` → _Current overrides_
   to match.

## Hard rules

- Edit only root `overrides` + `docs/dependencies.md`.
- A security pin is obsolete ONLY when the advisory is gone from the tree — never
  remove one on an ERESOLVE-free signal alone.
- Never `--legacy-peer-deps` / `--force` / `npm audit fix`.
