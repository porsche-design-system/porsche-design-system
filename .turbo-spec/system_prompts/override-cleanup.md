Goal: synchronize the override documentation with the deterministic cleanup report and return its reviewer payload. Read
`.turbo-spec/out/override-revalidation.json` and verify that `complete` is true, every `originalOverrideKeys` entry has
exactly one result, and the reviewer payload has exactly one observation per result. Compare the final root
`package.json` overrides with `docs/dependencies.md` → `Current overrides`, removing or correcting only statements made
stale by the cleanup results. Do not change `package.json`, `package-lock.json`, the cleanup report, dependency
versions, held-back dependencies, or any source file. Do not rerun override trials, use `npm audit fix`, use `--force`,
or use `--legacy-peer-deps`. When the report and documentation agree, return only the JSON object stored at `reviewer`;
do not wrap it in Markdown. If the report is incomplete or cannot be reconciled with the files, return valid reviewer
JSON with `verdict: "changes_requested"` and one blocking issue that names the mismatch.
