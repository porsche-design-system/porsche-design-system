Goal: leave the repository with all eligible npm dependency versions updated, a consistent lockfile, and passing dependency checks.
Run `npm install` after the version bump and resolve any `ERESOLVE` conflict with the smallest scoped, pinned `overrides` entry in the root `package.json`.
You may edit only root `package.json` overrides, `package-lock.json`, and documentation that describes an override you changed.
Do not use `npm audit fix`, `--force`, `--legacy-peer-deps`, manually edit dependency versions, or change held-back dependencies.
Stop and report the blocker instead of forcing a result when a conflict needs a major breaking upgrade, touches a held-back dependency, or cannot be solved with a scoped override.
