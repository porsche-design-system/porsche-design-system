---
name: dependency-update-decision
description: "Decide which outdated dependencies to bump this round, group them in lockstep, and emit a frozen update-plan.json."
version: "1.0"
---

# Dependency Update Decision

Turn the deterministic outdated report into a **frozen** update plan. You choose
*which* dependencies and *how to group* them — you never choose target versions.

## Inputs

- `.turbo-spec/out/outdated-report.json` — every outdated dependency with its
  `name`, `from`, frozen `to` specifier, `instances`, and `bump` (major/minor/patch).

## What to decide

1. **Group** each dependency into its lockstep family (see the shared context
   skill). Include every member of a family the report lists, or defer the whole
   family — never split a family. This is **gate-enforced**: the `families` gate
   (`check-families.mjs`) fails the plan if a family's reported members are only
   partially included, so you must add the whole family or defer it entirely.
2. **Exclude held-back deps** — they must never appear (they should already be
   absent from the report).
3. **Detect Angular** — set `angular_bumped: true` if any `angular` family member
   is in the report.
4. **TypeScript rule** — if `angular_bumped`, move `typescript` out of `updates`
   into `excluded` with a clear reason (its ceiling is only known after Angular
   installs). **Copy its frozen `from` and `to` from the report verbatim** into the
   excluded entry so the `angular-migrations` stage applies the exact target
   without re-choosing a version. Otherwise treat `typescript` as a normal update.
5. **Freeze versions** — copy each dependency's `to` value verbatim from the
   report. Do not invent, round, or "latest" a version.

## Default policy

- Apply all reported updates (patch, minor, and major) unless a hard rule or the
  TypeScript rule excludes them. Record every exclusion with a reason.

## Output — write `.turbo-spec/out/update-plan.json`

Write valid JSON matching `.turbo-spec/schemas/update-plan.schema.json`:

```json
{
  "generated_at": "2025-01-02T00:00:00Z",
  "angular_bumped": true,
  "updates": [
    { "name": "@angular/core", "from": "^22.0.4", "to": "^22.0.5", "group": "angular" },
    { "name": "vite", "from": "^8.1.0", "to": "^8.1.3", "group": "other" }
  ],
  "excluded": [
    { "name": "typescript", "from": "^5.9.2", "to": "^5.9.3", "reason": "deferred to angular-migrations: MAX_TS_VERSION ceiling unknown until Angular installs" }
  ]
}
```

Use the `file` tool to write the artifact. Emit nothing to stdout.
