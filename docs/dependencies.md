# Dependencies

## Dependency updates

Every week, we update our NPM packages. Updates are driven by [`syncpack`](#syncpack-helper-scripts) via the root
scripts — do **not** edit versions in each `package.json` by hand, as syncpack keeps the version ranges consistent
across all workspaces.

1. Switch to the **project root directory** and make sure you pulled the latest version.
2. Run `npm run npm:outdated` to see which dependencies have newer versions available (held-back deps are excluded
   automatically, see [Held-back dependencies](#held-back-dependencies)).
3. Run `npm run npm:update` to interactively pick and apply updates. syncpack writes the new ranges into every
   `package.json` across the workspaces in one go. Don't upgrade too many dependencies at once — keep related upgrades
   grouped (e.g. if React types can be upgraded, also check whether React itself can be upgraded).
4. Run `npm install` to update `package-lock.json`, then execute the automated tests to make sure the application still
   works.
5. Once everything is updated, delete `package-lock.json` and recreate it by running `npm install` again, so the
   transitive dependencies of our dependencies are refreshed too.

Some dependencies (Angular, Playwright, Stencil, internal packages) are intentionally excluded from this flow and
updated manually — see [Held-back dependencies](#held-back-dependencies). If you update them in the same session, start
with Angular (`ng update`) to avoid corrupting `package-lock.json`.

### Syncpack helper scripts

[`syncpack`](https://syncpack.dev) is pinned as a root `devDependency` (do **not** rely on an unpinned `npx syncpack`,
as its CLI changed across major versions). Its behavior is configured centrally in
[`.syncpackrc.json`](../.syncpackrc.json) (JSON with `$schema` for editor validation, matching our `biome.json`
convention). The following root scripts help keep dependency versions consistent across the workspaces:

| Script                   | Purpose                                                                         |
| ------------------------ | ------------------------------------------------------------------------------- |
| `npm run npm:lint`       | Lint `prod` + `dev` dependency versions for mismatches across workspaces.       |
| `npm run npm:lint:fix`   | Fix mismatched versions so all workspaces use the same version.                 |
| `npm run npm:list`       | List every dependency and its version usage across workspaces.                  |
| `npm run npm:format`     | Check that each `package.json` is formatted (field order, sorting).             |
| `npm run npm:format:fix` | Apply `package.json` formatting.                                                |
| `npm run npm:outdated`   | Check the npm registry for newer versions (excludes held-back deps, see below). |
| `npm run npm:update`     | Interactively pick updates to apply (excludes held-back deps, see below).       |

The intentionally held-back dependencies listed under [Held-back dependencies](#held-back-dependencies) are excluded
from automated update checks via an `isIgnored` [`updateGroups`](https://syncpack.dev/update-groups/ignored/) entry in
`.syncpackrc.json` (`@porsche-design-system/**`, `@angular/**`, `ng-packagr`, `zone.js`, `@playwright/test`,
`@stencil/core`). The `npm:outdated` and `npm:update` scripts additionally pass
`--dependencies '!@porsche-design-system/**'` so the unpublished internal workspace packages are not even looked up
against the npm registry (which would otherwise emit `Failed to fetch` warnings). When you add a new held-back
dependency, also add it to the `updateGroups` entry in `.syncpackrc.json` and to the ignore list in
`.github/dependabot.yml`.

## Strict peer dependency resolution

`npm install` runs with **strict** peer dependency resolution (npm 7+ default). We intentionally do **not** use
`--legacy-peer-deps` or `--force`, and these are not enabled in `.npmrc`.

When a third-party package declares a peer dependency range that conflicts with the versions we pin, resolve it
explicitly via the `overrides` field in the root `package.json` instead of disabling peer-dependency checks globally.

Current overrides:

- `madge > typescript` is pinned to our root `typescript` version (`$typescript`). `madge` declares an optional peer on
  `typescript@^5.4.4`, which conflicts with our newer TypeScript. The override is safe because `madge` only uses
  TypeScript optionally for analyzing TS sources.

## Auditing dependencies (`npm audit`)

Use `npm run npm:audit` (plain `npm audit`) to review advisories. **Do not run `npm audit fix` /
`npm audit fix --force`** on this monorepo. `npm audit fix` does not understand our workspace setup and will try to
"repair" a transitive advisory by **downgrading a hoisted dev tool** to an old version, which then violates our pinned
tooling and aborts with `ERESOLVE` under [strict peer resolution](#strict-peer-dependency-resolution).

### Why `npm audit fix` aborts with `ERESOLVE`

The private asset sub-projects (`packages/assets/projects/*`) declare their shared dev tooling (`tsup`, `tsx`,
`typescript`, `change-case`, …) as `peerDependencies: "*"`. This is **intentional**: it lets each private workspace
consume the single version pinned once in the root [`package.json`](../package.json) instead of re-pinning (and
drifting) per project. `syncpack` keeps that single root version consistent.

When `npm audit fix` encounters the `esbuild` advisory (no fixed version is reachable from `tsup`, see below), it
proposes downgrading `tsup` to `6.5.0`. That old `tsup` pulls in `typescript@^4.1.0`, which conflicts with the root
`typescript`. Because the `"*"` peers accept whatever the root pins, the conflict surfaces as an `ERESOLVE` against the
workspace tree.

**The `"*"` peers are not the bug** — removing them would only hide the conflict, break the single-version hoisting
contract, and allow duplicate tool versions across workspaces. Keep them.

### Remediation policy

- For a **genuinely fixable** advisory, add a pinned [`overrides`](#strict-peer-dependency-resolution) entry in the root
  `package.json` (same pattern as `madge > typescript`) and run `npm install`.
- For an advisory in a **held-back** dependency (Angular, Stencil, Playwright — see
  [Held-back dependencies](#held-back-dependencies)), wait for the upstream-sanctioned upgrade path.
- Never reach for `--legacy-peer-deps` or `--force`.

### Known unfixable advisory: `esbuild` via `tsup`

The `esbuild` advisory covers `0.17.0 - 0.28.0`; the first non-vulnerable release is `0.28.1`. However `tsup@8.5.1`
constrains `esbuild` to `^0.27.0` (`>=0.27.0 <0.28.0`), so **no non-vulnerable `esbuild` satisfies `tsup`** — hence
`npm audit` reports "No fix available". An `overrides` bump to `esbuild@0.28.1` is **not** applied because it would
break `tsup`'s expected esbuild API (a minor esbuild bump can be breaking) while `@angular/build` (held-back) still pins
`0.28.0`. This advisory is therefore tracked and cleared once `tsup` ships a release that widens its `esbuild` range.
The vulnerability only affects local build tooling, not shipped artifacts.

## Explicit `@next/swc-*` optional dependencies (storefront)

The storefront's [`package.json`](../packages/storefront/package.json) declares all eight `@next/swc-*` platform
binaries as `optionalDependencies` (pinned to the same range as `next`). **Do not remove them.** The same block is
declared in every workspace that runs `next build`
([`packages/components-react/projects/nextjs`](../packages/components-react/projects/nextjs/package.json)), so each one
is self-sufficient.

`next` lists these native SWC binaries as its own `optionalDependencies`, but npm only persists the binary matching the
current platform (e.g. `@next/swc-darwin-arm64`) into `package-lock.json` and prunes the other seven. On `next build`,
Next.js detects the "missing" platforms, tries to patch the lockfile, and fails with
`Found lockfile missing swc dependencies, patching...` → `Failed to get registry from "yarn"` (it mis-detects the
package manager when yarn is not installed).

Declaring the binaries explicitly forces npm to record all eight entries in `package-lock.json` with their `resolved`
and `integrity` fields, so the lockfile stays complete even after the regenerate step
([Dependency updates](#dependency-updates) step 5: delete `package-lock.json` and run `npm install`). On any given
machine npm still installs only the matching binary; the rest are recorded but skipped. Because the range mirrors
`next`, `syncpack` (`npm run npm:update`) keeps them in lockstep when `next` is upgraded.

## Held-back dependencies

These dependencies are intentionally excluded from the automated `syncpack` / `npm run npm:update` flow and from
Dependabot. The exclusion is configured in two places that must be kept in sync when adding a new entry:

- the `isIgnored` `updateGroups` entry in [`.syncpackrc.json`](../.syncpackrc.json), and
- the `ignore` list in `.github/dependabot.yml`.

### Why they are held back

- `@porsche-design-system/*` – internal workspace packages, versioned via the release process.
- `@playwright/test` – pinned to keep browser binaries and committed VRT snapshots in sync; upgrade deliberately.
- `@stencil/core` – pinned because a `patch-package` patch (`patches/@stencil+core+4.43.3.patch`) targets this exact
  version. Bumping it breaks `patch-package` on `postinstall`.
- `@angular/*` (incl. `ng-packagr`, `zone.js`) – must be upgraded with `ng update` rather than syncpack, and
  `typescript` must stay within Angular's `MAX_TS_VERSION`.

### How to update them

**`@angular/*` (incl. `ng-packagr`, `zone.js`)** — upgrade with Angular's own tooling:

1. `cd packages/components-angular`
2. `./node_modules/.bin/ng update`
3. `./node_modules/.bin/ng update @angular/cli @angular/core`
4. Check `MAX_TS_VERSION` in `packages/components-angular/node_modules/@angular/compiler-cli/src/typescript_support.js`,
   which indicates whether `typescript` can be updated for Angular packages or not.
5. Run `npm install` again from the project root.

**`@playwright/test`** — bump the version deliberately, then regenerate and verify the committed VRT snapshots so the
browser binaries and screenshots stay in sync.

**`@stencil/core`** — first regenerate `patches/@stencil+core+<version>.patch` for the new version, then bump the
dependency; otherwise `patch-package` fails on `postinstall`.

**`@porsche-design-system/*`** — do not bump manually; these are versioned and published by the release process.
