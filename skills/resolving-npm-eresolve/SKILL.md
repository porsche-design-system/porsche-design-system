---
name: resolving-npm-eresolve
description: Diagnose and resolve npm ERESOLVE peer-dependency conflicts in this monorepo. Use when `npm install` fails with ERESOLVE, "could not resolve dependency", "conflicting peer dependency", after a syncpack/dependency bump, or when tempted to reach for overrides, --force, or --legacy-peer-deps.
license: MIT
compatibility: npm 7+ workspaces (this repo: npm 11, Node 24). Assumes the PDS wrapper/dist manifest layout.
metadata:
  author: porsche-design-system
  version: "1.0"
---

Resolve an npm `ERESOLVE` correctly by identifying **who declares the unsatisfiable peer** and **whether compatibility
is established** — then applying the one remedy that fits. `--force` and `--legacy-peer-deps` are never the answer; a
root `override` is a last resort, not a default.

> This repo's older docs say "fix every ERESOLVE with root overrides." That is wrong for the common case where **we**
> own the failing constraint. Follow this skill over that guidance.

## The one non-obvious trap (read first)

> In the dep-bump workflow this skill is activated only on a **persistent** ERESOLVE: `scripts/dep-bump/install-check.sh` has already retried a clean `npm run npm:reinstall`. Do not treat "try a clean reinstall" as an untried remedy here.

The wrapper `package.json` that npm actually consumes is **generated**, not the one you edit. For each framework
wrapper:

- **Source (you edit):** `packages/components-<fw>/projects/<fw>-wrapper/package.json`
- **Consumed (npm reads):** `packages/components-<fw>/dist/<fw>-wrapper/package.json` — gitignored,
  workspace-registered, produced by `cp` in the root `preinstall:components-<fw>` script.

`npm install` throws ERESOLVE **during tree resolution, before `preinstall` runs**, so it will **not** pick up a
source-only edit. After editing a wrapper range you MUST materialize the generated manifest and confirm they match
**before** reinstalling:

```bash
npm run preinstall:components-<fw>   # cp source -> dist
git --no-pager diff --no-index \
  packages/components-<fw>/projects/<fw>-wrapper/package.json \
  packages/components-<fw>/dist/<fw>-wrapper/package.json   # must be identical
```

A stale generated manifest is itself a frequent ERESOLVE cause even with a correct source range → then the remedy is
"materialize only" (no source edit).

## Decision contract (evidence → remedy)

### 1. Gather evidence (read the ERESOLVE report; do not guess)

- Rejecting edge + **type**: `peer`, `peerOptional`, or hard `dep`.
- Demanded package + range; the current/candidate node + installed version.
- Every incoming path/constraint and the `whileInstalling` context.
- Is each party **direct / workspace (ours) / transitive**?
- **Who DECLARES the unsatisfiable constraint?** (ownership = who can edit it, NOT the remedy.)

Notes:

- Hard-`dep` rejecting edge → out of scope here (hard deps normally nest); diagnose separately.
- `peerOptional`: **absent** → no obligation, the peer isn't installed; **present** → treat as a normal peer.

### 2. Establish compatibility (this drives the remedy, not ownership)

- Can the **declarer** be upgraded to a release that supports the provider? Prefer that (via syncpack; respect held-back
  deps: `@porsche-design-system/**`, `@playwright/test`, `@stencil/core`).
- Is compatibility **independently established** — release notes / support matrix, companion packages aligned, wrapper
  builds and tests pass on the new version?
- If the provider bump is a **breaking major** we can't yet satisfy → do not establish compatibility by wishful
  thinking.

### 3. Choose the remedy

| Who declares the unsatisfiable peer       | Compatibility                                         | Remedy                                                                                                                                                                                      |
| ----------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **We** (wrapper range)                    | Established                                           | **Source fix + regenerate**: widen the range in every relevant `projects/<fw>-wrapper/package.json`, then materialize each `dist/<fw>-wrapper` and confirm source==generated, then install. |
| **We**                                    | NOT established (breaking major, needs migration)     | **Hold back** the provider bump via syncpack, or **hand off** as a separate migration task. Do not widen to a version we don't support.                                                     |
| Source already correct, only `dist` stale | —                                                     | **Materialize only** (`npm run preinstall:components-<fw>`); no source edit.                                                                                                                |
| **Third party**                           | Established + no declarer upgrade path                | **Scoped `overrides`** on the exact edge (see patterns).                                                                                                                                    |
| **Third party**                           | NOT established                                       | **Hold back / stop.** An override would mask a real incompatibility.                                                                                                                        |
| Security advisory (orthogonal)            | patched version must satisfy the **consumer's major** | Parent upgrade, per-major override, documented acceptance, or wait on a held-back dep. **Never** auto-jump to the globally-first patched version.                                           |

### Scoped override patterns (last resort, third-party declarer only)

Target the **narrowest correct edge** — never a blanket top-level pin:

```jsonc
"overrides": {
  "madge": { "typescript": "$typescript" },  // scope to one parent; reuse root version
  "next": { "postcss": "^8.5.10" },          // scoped parent
  "minimatch@9": "9.0.7"                       // pin one major only
}
```

Overriding a **direct** dependency errors with `EOVERRIDE` — override the parent edge instead. Re-read the override
after: does it target only the intended path?

## Verify (run conditionally — not one destructive script)

1. **Manifests in sync:** for each wrapper you touched, source==generated (diff above).
2. **Resolves cleanly:** `npm install` completes with no ERESOLVE.
3. **Lockfile is honest (gate):** `npm ci` succeeds from the new lockfile (ideally in a clean worktree / CI — it deletes
   `node_modules`).
4. **Edge is satisfied:** `npm ls <peer> --all` / `npm explain <peer>` shows the intended resolution.
5. **Nothing masked:** `npm audit` compared to the **baseline** (pre-existing accepted advisories mean nonzero is
   acceptable — compare, don't gate on zero).
6. **Behavior holds:** build + tests for the affected wrapper(s).

## Stop conditions (hand off instead of forcing)

- No clean scoped override exists for a third-party conflict.
- Compatibility requires a breaking-major source migration.
- A security advisory is only fixable via a held-back dependency.
- A neither-side-ours transitive conflict has no upgrade path.

## Never

- `--force` or `--legacy-peer-deps` — they write an invalid tree.
- A blanket top-level override to silence a peer you haven't proven compatible.
- Editing only `dist/<fw>-wrapper/package.json`, or editing source without materializing — both leave source and
  consumed manifests out of sync.
