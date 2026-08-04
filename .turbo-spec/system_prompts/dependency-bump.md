Goal: leave the repository with all eligible npm dependency versions updated, a consistent lockfile, and passing dependency checks.
Run `npm install` after Syncpack has bumped the versions.
If `npm install` fails with `ERESOLVE` because a third-party peer range conflicts with pinned versions, add the smallest scoped, pinned `overrides` entry in the root `package.json`, following existing patterns such as `madge > typescript` and per-major keys such as `minimatch@9`.
After changing an override, delete both `package-lock.json` and `node_modules`, then rerun `npm install` so stale transitive entries cannot survive.
You may edit only root `package.json` overrides, regenerated `package-lock.json`, and documentation that describes an override you changed.
Never use `npm audit fix`, `--force`, or `--legacy-peer-deps`, and never manually edit dependency versions or change held-back dependencies.
You are done when `npm install` succeeds and the repository is ready for the configured format and lint gates.
Stop and report the blocker if the conflict requires a major breaking upgrade, touches a held-back dependency, or cannot be resolved with a scoped pinned override.
