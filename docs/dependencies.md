# Dependencies

> **AI cloud agents**: For the recurring automated update task, follow the deterministic runbook in
> [`docs/runbooks/dependency-updates-agent.md`](runbooks/dependency-updates-agent.md). The sections below provide the full rationale.

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
   transitive dependencies of our dependencies are refreshed too. If a version bump still fails with `ERESOLVE`, run
   `npm run npm:reinstall`: npm reuses stale packages left in `node_modules`, so a version change needs a full wipe of
   `node_modules` and the lockfile, not just the lockfile.

Some dependencies (Playwright, Stencil, internal packages) are intentionally excluded from this flow and updated
manually — see [Held-back dependencies](#held-back-dependencies). Eight framework/styling families (Angular, React, Vue,
ag-grid, Tailwind, Emotion, Vanilla-Extract and `sass`) are automatically capped to **minor/patch**; their **major**
upgrades are done by hand — see [Minor/patch-only families](#minorpatch-only-families). Everything else is bumped to the
latest version, including majors. Only Angular's framework **migrations** are applied separately — see
[Updating Angular (versions vs. migrations)](#updating-angular-versions-vs-migrations).

After updating, run `npm run deps:major-hint` to list the major upgrades that were held back (families capped to
minor/patch, permanently held-back deps, and `typescript` under Angular's ceiling) so you can schedule them as
deliberate manual upgrades. Run it against an **installed** tree: the hint reads `npm outdated` and reports
`COMPLETE`, `INCOMPLETE`, or `UNAVAILABLE`. An `UNAVAILABLE` result (tree not installed or registry unreachable)
means the held set is **unknown** — it is never a claim that nothing was held back.

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
| `npm run deps:major-hint` | List the major upgrades held back by policy (families, held-back deps, TS ceiling). |

The intentionally held-back dependencies listed under [Held-back dependencies](#held-back-dependencies) are excluded
from automated update checks via an `isIgnored` [`updateGroups`](https://syncpack.dev/update-groups/ignored/) entry in
`.syncpackrc.json` (`@porsche-design-system/**`, `@playwright/test`, `@stencil/core`). A second, `target: "minor"`
[`updateGroups`](https://syncpack.dev/update-groups/targeted/) entry caps the framework/styling families to minor/patch
so their majors are never auto-applied — see [Minor/patch-only families](#minorpatch-only-families). The `npm:outdated`
and `npm:update` scripts additionally pass
`--dependencies '!@porsche-design-system/**'` so the unpublished internal workspace packages are not even looked up
against the npm registry (which would otherwise emit `Failed to fetch` warnings). When you add a new held-back
dependency, also add it to the `updateGroups` entry in `.syncpackrc.json` and to the ignore list in
`.github/dependabot.yml`.

### StackBlitz starter templates (npm workspace members)

The four StackBlitz starter templates under
`packages/storefront/projects/stackblitz/src/{vanilla-js,angular,react,vue}/package.json` are **npm workspace members**
(listed in the root [`package.json`](../package.json) `workspaces` array). `.syncpackrc.json` therefore no longer needs
an explicit `source` array — `syncpack` scans the npm `workspaces` by default, so it keeps the starters' shared tooling
(`vite`, `tailwindcss`, `react`, `vue`, …) in lockstep with the rest of the monorepo automatically.

Even though each starter pins the **published** `@porsche-design-system/components-*` version (e.g. `4.2.0-rc.5`),
`npm install` works as a workspace member because the local wrapper packages
(`packages/components-*/dist/*-wrapper`) carry that **same** release version, so npm satisfies the pin by symlinking to
the local workspace. Off the monorepo (on StackBlitz), the identical pin resolves the published package from the
registry instead. The pin stays in sync with the release version via the release process (see `docs/release.md`), and
`@porsche-design-system/**` is shielded from automated bumps by the held-back `updateGroups` entry, alongside
`@playwright/test` and `@stencil/core`.

When you add or remove a workspace, update only the `workspaces` array in the root `package.json` — there is no separate
syncpack `source` list to keep in sync anymore.

### Dependabot (security-only for npm)

Routine npm **version** updates are handled by `syncpack` (above) and, for the recurring automated task, by the AI agent
runbook ([`docs/runbooks/dependency-updates-agent.md`](runbooks/dependency-updates-agent.md)) — **not** by Dependabot.
The npm entry in `.github/dependabot.yml` sets `open-pull-requests-limit: 0`, which disables Dependabot version-update
PRs while still allowing **security** PRs (grouped via `applies-to: security-updates`). The `ignore` list there keeps the
held-back deps out of those security PRs too, so they are never auto-bumped. The minor/patch-only families are
deliberately **not** in that `ignore` list, so Dependabot may still raise **security** PRs for them (including a
security-driven major) for deliberate review. GitHub Actions are still updated by
Dependabot on a monthly schedule.

## Strict peer dependency resolution

`npm install` runs with **strict** peer dependency resolution (npm 7+ default). We intentionally do **not** use
`--legacy-peer-deps` or `--force`, and these are not enabled in `.npmrc`.

When a third-party package declares a peer dependency range that conflicts with the versions we pin, resolve it
explicitly via the `overrides` field in the root `package.json` instead of disabling peer-dependency checks globally.

> **Overrides are not the answer to every `ERESOLVE`.** They apply when a **third party** declares the unsatisfiable
> peer. When the failing constraint is **ours** — a hand-maintained wrapper peer range in
> `packages/components-<fw>/projects/<fw>-wrapper/package.json` — the fix is at source plus regenerating the
> `dist/<fw>-wrapper` manifest, not an override. Use the
> [`resolving-npm-eresolve`](../.github/skills/resolving-npm-eresolve/SKILL.md) skill to diagnose which case applies
> before acting.

Current overrides:

- `madge > typescript` is pinned to our root `typescript` version (`$typescript`). `madge` declares an optional peer on
  `typescript@^5.4.4`, which conflicts with our newer TypeScript. The override is safe because `madge` only uses
  TypeScript optionally for analyzing TS sources.
- **Security overrides** force vulnerable transitive dependencies up to their first patched release (see
  [Remediation policy](#remediation-policy)). For libraries whose newer majors are not API-compatible with older
  consumers (`minimatch`, `brace-expansion`), per-major version-selector keys (e.g. `"minimatch@3": "3.1.4"`,
  `"minimatch@9": "9.0.7"`) keep each major on its own backported patch. `minimatch@10`/`brace-expansion@5` export
  non-callable objects, so a blanket override would break `^3.x`/`^1.x` consumers (e.g. `glob@7`) that call the default
  export directly. Overrides that would collide with a different major required elsewhere are scoped to a single parent
  (e.g. `"js-beautify": { "glob": "^10.5.0" }`, `"@react-router/serve": { "express": "^4.22.2" }`,
  `"next": { "postcss": "^8.5.10" }`).

## Auditing dependencies (`npm audit`)

Use `npm run npm:audit` (plain `npm audit`) to review advisories. **Do not run `npm audit fix` /
`npm audit fix --force`** on this monorepo. `npm audit fix` does not understand our workspace setup and will try to
"repair" a transitive advisory by **downgrading a hoisted dev tool** to an old version, which then violates our pinned
tooling and aborts with `ERESOLVE` under [strict peer resolution](#strict-peer-dependency-resolution).

### Why `npm audit fix` aborts with `ERESOLVE`

The private workspace sub-projects (e.g. `packages/assets/projects/*`) declare their shared dev tooling
(`@rollup/plugin-typescript`, `rollup`, `rollup-plugin-dts`, `tsx`, `typescript`, `change-case`, …) as
`peerDependencies: "*"`. This is **intentional**: it lets each private workspace consume the single version pinned once
in the root [`package.json`](../package.json) instead of re-pinning (and drifting) per project. `syncpack` keeps that
single root version consistent.

`npm audit fix` does not understand this hoisting contract. When it finds a transitive advisory whose only "fix" is to
**downgrade a hoisted build tool**, it picks an old version that pulls in an incompatible `typescript` peer, and the
conflict surfaces as an `ERESOLVE` against the workspace tree.

> **Historical example:** before the build tooling was consolidated onto rollup, the private libs used `tsup`. The
> `esbuild` advisory had no fixed version reachable from `tsup@8.5.1` (it caps `esbuild` at `^0.27.0`), so
> `npm audit fix` proposed downgrading `tsup` to `6.5.0`, which pulls `typescript@^4.1.0` and collided with the root
> `typescript`. Migrating the `--dts` libs to `rollup` + `rollup-plugin-dts` removed `tsup` (and that downgrade path)
> entirely.

**The `"*"` peers are not the bug** — removing them would only hide the conflict, break the single-version hoisting
contract, and allow duplicate tool versions across workspaces. Keep them.

### Remediation policy

- For a **genuinely fixable** advisory, add a pinned [`overrides`](#strict-peer-dependency-resolution) entry in the root
  `package.json` (same pattern as `madge > typescript`) and run `npm install`.
- For an advisory in a **held-back** dependency (Angular, Stencil, Playwright — see
  [Held-back dependencies](#held-back-dependencies)), wait for the upstream-sanctioned upgrade path.
- Never reach for `--legacy-peer-deps` or `--force`.
- After adding/changing overrides, delete `package-lock.json` and `node_modules` and re-run `npm install`
  ([Dependency updates](#dependency-updates) step 5). A plain `npm install` only re-resolves changed nodes, so stale
  transitive entries keep their old (vulnerable) versions and the override appears to have no effect.

### Known unfixable advisory: `html-minifier`

`html-minifier@4` (used only by the build-time partials generator in
[`packages/components-js/projects/partials`](../packages/components-js/projects/partials)) has an unpatched ReDoS
advisory with **no fixed release**. It was replaced with the maintained drop-in fork
[`html-minifier-terser`](https://www.npmjs.com/package/html-minifier-terser), whose `minify()` is async — the partial
generators and `minifyHTML()` were made `async` accordingly. Output is byte-for-byte identical, so the generated
`partials.tsx` is unchanged.

### Accepted advisories (held-back build tooling)

The remaining advisories all originate from **dev-only** build tooling we hold back, are not reachable from shipped
package output, and several are Windows-dev-server-only:

- `@angular/build`, `@angular/compiler-cli`, `@babel/core` (pulled by Angular) — Angular **versions** are bumped via
  syncpack, but only as upstream ships fixes; framework migrations are applied via the `ng:update` wrapper (see
  [Updating Angular (versions vs. migrations)](#updating-angular-versions-vs-migrations)).
- `vite@7` / `esbuild@<0.28.1` — required by `@angular/build` (held back) and the React Router dev server
  (`@react-router/dev` → `vite-node`), which pins `vite@7`. Our root `vite` is already on a non-vulnerable `8.x`. These
  clear once Angular and `@react-router/dev` ship on `vite@8` / `esbuild@>=0.28.1`.

## Build tooling for `--dts` libraries

The private workspace libraries that ship `index.js`/`index.mjs` plus bundled `.d.ts`/`.d.mts` (the
`packages/assets/projects/*` manifests and the storefront `stackblitz` helper) are bundled with **rollup**, the same
bundler used everywhere else in the monorepo, via the shared factory
[`packages/assets/projects/rollup.config.base.mjs`](../packages/assets/projects/rollup.config.base.mjs). It uses
`@rollup/plugin-typescript` for the JS bundles and `rollup-plugin-dts` for the bundled declaration (the same library
`tsup --dts` used internally). Each project's `build:lib` runs `rollup -c` against a tiny `rollup.config.mjs` that calls
the factory. This replaced the previous `tsup` setup, removing `tsup` (and its vulnerable transitive `esbuild`) from the
dependency tree.

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

These dependencies are intentionally excluded from the automated `syncpack` / `npm run npm:update` flow. They are also
listed in Dependabot's `ignore` list so they stay out of Dependabot's **security** PRs (npm version updates are already
off — see [Dependabot (security-only for npm)](#dependabot-security-only-for-npm)). The exclusion is configured in two
places that must be kept in sync when adding a new entry:

- the `isIgnored` `updateGroups` entry in [`.syncpackrc.json`](../.syncpackrc.json), and
- the `ignore` list in `.github/dependabot.yml`.

### Why they are held back

- `@porsche-design-system/*` – internal workspace packages, versioned via the release process.
- `@playwright/test` – pinned to keep browser binaries and committed VRT snapshots in sync; upgrade deliberately.
- `@stencil/core` – pinned because a `patch-package` patch (`patches/@stencil+core+4.43.3.patch`) targets this exact
  version. Bumping it breaks `patch-package` on `postinstall`.

> **Angular versions are capped to minor/patch, not fully held back.** `@angular/*`, `ng-packagr` and `zone.js` are
> bumped by `syncpack` within their current major (`npm run npm:update`); Angular **major** upgrades are done by hand.
> Only Angular's **framework migration schematics** need extra handling — see
> [Updating Angular (versions vs. migrations)](#updating-angular-versions-vs-migrations). `typescript` must still stay
> within Angular's `MAX_TS_VERSION`. See [Minor/patch-only families](#minorpatch-only-families) for the full list of
> capped families.

### Minor/patch-only families

Eight framework/styling families are capped to **minor/patch** by a `target: "minor"`
[`updateGroups`](https://syncpack.dev/update-groups/targeted/) entry in [`.syncpackrc.json`](../.syncpackrc.json). Their
majors coordinate with framework/tooling migrations, so they are upgraded **by hand**, never by the automated flow. The
cap applies to `npm:outdated`, `npm:update` (interactive), and `npm:update:non-interactive` alike, because all read the
same config.

| Family          | Patterns                                                                                                             |
| --------------- | -------------------------------------------------------------------------------------------------------------------- |
| Angular         | `@angular/**`, `ng-packagr`, `zone.js`                                                                                |
| ag-grid         | `ag-grid-*`, `@ag-grid-community/**`                                                                                  |
| React           | `react`, `react-dom`, `react-router`, `react-router-dom`, `@react-router/**`, `@types/react`, `@types/react-dom`, `@testing-library/react`, `@vitejs/plugin-react`, `react-syntax-highlighter`, `@types/react-syntax-highlighter` |
| Vue             | `vue`, `vue-router`, `vue-tsc`, `@vue/**`, `@vitejs/plugin-vue`                                                       |
| Tailwind        | `tailwindcss`, `@tailwindcss/**`                                                                                      |
| SCSS            | `sass`                                                                                                                |
| Emotion         | `@emotion/**`                                                                                                         |
| Vanilla-Extract | `@vanilla-extract/**`                                                                                                 |

Notes:

- The React family covers the runtime, router, types, its test/build tooling (`@testing-library/react`,
  `@vitejs/plugin-react`), and the syntax-highlighter pair (`react-syntax-highlighter`,
  `@types/react-syntax-highlighter`) — their majors need the same manual migration and the verify gate does not exercise
  their consumers. Third-party libraries that merely use React (`react-instantsearch`, `@mdx-js/react`) still take majors
  automatically. `@types/react` is an **exact** name, not `@types/react*`, so the type packages are listed explicitly.
- Unlike the permanent holds, these families are **not** added to the `.github/dependabot.yml` `ignore` list, so
  security PRs (including a security-driven major) still surface for deliberate review.
- Available majors held back by this cap are surfaced by `npm run deps:major-hint` and injected into the automated PR
  body.

### How to update them

### Updating Angular (versions vs. migrations)

Angular splits into two concerns that are handled separately:

- **Version ranges** (`@angular/*`, `ng-packagr`, `zone.js`) — owned by `syncpack`, but capped to **minor/patch** by the
  `target: "minor"` group (see [Minor/patch-only families](#minorpatch-only-families)). Bump them via
  `npm run npm:update` (pick the `@angular/*` family together so they move in lockstep), then `npm install` from the repo
  root. A **major** Angular upgrade is deliberate: temporarily remove the Angular patterns from the `target: "minor"`
  group in `.syncpackrc.json` (a group target always beats a looser CLI `--target`, so the cap cannot be bypassed from
  the command line), run the update, restore the config, coordinate with the framework migration below, and land it in
  its own PR. Keep
  `typescript` within the range Angular supports, declared as `peerDependencies.typescript` in `@angular/compiler-cli`'s
  `package.json` (the same ceiling is compiled into the `MAX_TS_VERSION` constant, findable via
  `grep -rn "MAX_TS_VERSION =" node_modules/@angular/compiler-cli/`). The automated `npm run npm:update:non-interactive`
  reads that range and holds `typescript` back automatically when the latest release would exceed it; the interactive
  `npm run npm:update` does not, so hold `typescript` back yourself for the round if a bump would exceed the ceiling.
- **Framework migrations** (code transforms) — owned by the
  [`packages/components-angular/scripts/ng-update.sh`](../packages/components-angular/scripts/ng-update.sh) wrapper
  (`npm run ng:update`).

> **Why a wrapper script?** Running `ng update` directly fails in this monorepo. Because dependencies are **hoisted**
> to the repo-root `node_modules`, `packages/components-angular` has no local `node_modules`, so `ng update` reports
> `Found 0 dependencies`. It also queries the npm registry for every dependency, including the **unpublished** private
> workspace packages (`@porsche-design-system/shared@0.0.0`, `@porsche-design-system/assets`,
> `@porsche-design-system/components-angular`), which aborts the run with a `404 Not Found`. The wrapper works around
> both by running `ng update` in an isolated, throwaway install that contains only the public Angular tooling.

1. `cd packages/components-angular`
2. `npm run ng:update` — lists available Angular updates/migrations (informational; no changes are written).
3. Bump the versions with `syncpack`: from the repo root run `npm run npm:update`, select the `@angular/*` family (and
   `ng-packagr` / `zone.js`), then `npm install`.
4. Apply the framework migrations only (the wrapper runs the schematics in the isolated install and copies the changed
   source back into this package, leaving `package.json` and the lockfile to syncpack):
   `npm run ng:update -- @angular/core @angular/cli --migrate-only --from=<old> --to=<new>`.
5. Review the migration diff (`git diff packages/components-angular`) and run `npm install` again from the project root.

**`@playwright/test`** — bump the exact pin deliberately, then update the Docker image tag
(`mcr.microsoft.com/playwright:vX.Y.Z-jammy`) in `docker-compose.yml` (×2) and `.github/workflows/contribution.yml` (×4)
to match, and regenerate/verify the committed VRT snapshots so browser binaries and screenshots stay in sync. A mismatch
between the installed Playwright and the Docker image makes CI fail.

**`@stencil/core`** — first regenerate `patches/@stencil+core+<version>.patch` for the new version, then bump the
dependency; otherwise `patch-package` fails on `postinstall`.

**`@porsche-design-system/*`** — do not bump manually; these are versioned and published by the release process.
