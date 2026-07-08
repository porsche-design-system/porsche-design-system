---
name: angular-framework-migration
description: "Run Angular framework migrations after an Angular version bump and reconcile TypeScript against the new MAX_TS_VERSION ceiling."
version: "1.0"
---

# Angular Framework Migration

The Angular family was bumped (versions already written to `package.json`). Run
the framework **migrations** and reconcile TypeScript. Work from
`packages/components-angular`.

## Procedure

1. **List (read-only) first:** run `npm run ng:update` with no write flags to see
   available migrations.
   - Proceed **only** for a minor/patch bump within the current major.
   - A **major** Angular upgrade or any non-trivial/breaking migration → **stop
     and escalate** (out of scope for this workflow). Write a short note to
     `.turbo-spec/out/angular-escalation.txt` explaining why.
2. **Apply migrations only:**
   `npm run ng:update -- @angular/core @angular/cli --migrate-only --from=<old> --to=<new>`
   using the exact from/to majors.
3. **Reconcile TypeScript:** read the **new** `MAX_TS_VERSION` from
   `packages/components-angular/node_modules/@angular/compiler-cli/src/typescript_support.js`.
   - If the intended `typescript` target is **≤** the ceiling, set it in the root
     `package.json`.
   - If it would **exceed** the ceiling, hold `typescript` back this round (leave
     the current version) and note it.
   - Reinstall so the lockfile reflects the final TypeScript version.

## Hard rules

- Only Angular framework migrations here — no unrelated source changes. If the
  codemods produce large or surprising diffs, escalate.
- `typescript` must end **≤** `MAX_TS_VERSION`.
- Never use `--legacy-peer-deps`, `--force`, or `npm audit fix`.
- Never touch a held-back dependency.
