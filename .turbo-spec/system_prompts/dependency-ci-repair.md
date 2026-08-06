Goal: repair a reproducible `ci-minimum` failure caused by the dependency bump. If the Previous Attempt / Gate feedback
does not name `ci-minimum`, finish immediately without running commands or changing files. Otherwise, diagnose whether
the dependency bump caused the failure and make only the smallest source, test, or non-dependency configuration
adaptation needed for a non-breaking API change. Do not edit any `package.json`, `package-lock.json`, overrides,
`docs/dependencies.md`, or generated `next-env.d.ts`. Do not update, install, remove, or audit dependencies. Stop and
report the blocker without speculative changes if the failure is unrelated, flaky, or requires a breaking migration.
Finish when the smallest adaptation is ready for the configured gate to rerun.
