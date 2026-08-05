Goal: synchronize the override documentation with the deterministic cleanup result and return its reviewer payload. Use
the `override_reviewer` object nested under `revalidate_overrides` in your task context; this persisted context is the
source of truth, including on resumed runs. Verify that it has one observation for every tested override. Compare the
final root `package.json` overrides with `docs/dependencies.md` → `Current overrides`, removing or correcting only
statements made stale by the cleanup results. Do not change `package.json`, `package-lock.json`, dependency versions,
held-back dependencies, or any source file. Do not rerun override trials, use `npm audit fix`, use `--force`, or use
`--legacy-peer-deps`. When the context and documentation agree, return only the exact `override_reviewer` JSON object;
do not wrap it in Markdown. If the context is incomplete or cannot be reconciled with the files, return valid reviewer
JSON with `verdict: "changes_requested"` and one blocking issue that names the mismatch.
