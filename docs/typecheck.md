# Typecheck

TypeScript is compiled twice in this repo, and neither pass emits anything. This document explains
where each pass lives and why a package sits on one side rather than the other.

Only TypeScript is checked. No `.js`, `.cjs` or `.mjs` file is typechecked anywhere, deliberately.

## Two passes

**Pass one, before any build.** Root `typecheck` (`package.json`) runs the packages whose sources all
exist in a fresh clone. CI runs it as the `Typecheck` job after `Lint`, and both build jobs depend on it
(`.github/workflows/build.yml`). Root `build` and `build-prod` also begin with it, so a local build gets
the same gate. That duplicates nothing, because CI runs the individual `build:*` steps rather than root
`build`.

Root also has `typecheck:all`, which chains every package in the order `build` uses. It reaches the pass
two scopes as well, so it needs a built tree and nothing automated calls it. Use it locally to check the
whole repo in one command. Both chains are composed from the same per-package `typecheck:{package}`
entries, so a package is added to either chain by name.

**Pass two, inside each package's own build.** Anything whose sources only exist after code generation or
compilation is checked where it is produced, positioned `clean` then `build` then `typecheck` then
`bundle`. These have no root entry on purpose, because a root entry would imply they can run on a fresh
checkout, and they cannot.

## Why a package is on one side

The dividing line is whether the check needs build output. A package belongs to pass two if it imports
generated code, generated type declarations, or another package's `dist`.

Root `typecheck` covers `tokens`, `assets`, `styles`, `utilities` and `components-js`, which is 18
compiler runs, because several of those fan out to their own projects.

Everything else is gated in its own build by one of three mechanisms.

| Mechanism | Packages |
|---|---|
| A named `typecheck` step inside `build` | `shared`, `components`, `tokens-meta`, plus `assets` `typecheck:self` and `components-js` `typecheck:scripts`, which cover post-build scopes their pre-build umbrella skips |
| `noEmitOnError` on the bundler | `component-meta`, `components-react`, and the gated rollup configs elsewhere |
| The framework compiler refusing to emit | `components-angular` via `ng build`, `components-vue` via `vue-tsc`, `storefront` via `next build` |

The three wrapper demo apps are checked by `build-app`, which `test:e2e` calls, so CI reaches them
through the e2e jobs rather than the `Typecheck` job.

## How a fresh clone resolves internal packages

`tsconfig.paths.json` at the repo root maps internal specifiers to sibling **source**, so pass one works
before anything is compiled. It is extended only from a package's `tsconfig.typecheck.json`, never from
its `tsconfig.json`, so the build keeps resolving from published declarations and a declaration-bundling
fault is still caught.

For the same reason, configs read at build time extend `shared/src/tsconfig.json`, the tracked source
copy, rather than the built one.

## Adding a package

1. Add a `typecheck` script to the package.
2. Add a root `typecheck:{package}` entry for it, and chain that into `typecheck:all` at the position the
   package occupies in `build`.
3. Decide the side. If it compiles in a fresh clone, also chain it into root `typecheck`. If not, call the
   script from inside the package's `build`, after whatever generates its sources and before its bundle
   step, and leave it out of root `typecheck`.
4. Add a `tsconfig.typecheck.json` only if the scope differs from the config the bundler reads. Extend
   `tsconfig.paths.json` from it when the check runs before the build.

## Three traps

- **`exclude` replaces, it does not merge.** A child's `exclude` discards the parent's *and* TypeScript's
  defaults, which include `node_modules` and `outDir`. If you set `exclude`, restate everything you need.
- **`noEmitOnError` on `@rollup/plugin-typescript` grades the whole `tsconfig` program**, not just the
  modules the bundler pulls in, and the plugin's own `include`/`exclude` are rollup module filters that
  cannot narrow it. So the gate fails on any file in the `tsconfig` scope that cannot resolve at that
  point in the build, even when nothing imports it. Before adding the gate to a bundler, check what its
  `tsconfig` actually covers.
- **`types` replaces the auto-include.** This repo never gets `@types/node` implicitly. Configs that need
  it declare `"types": ["node"]` explicitly.
- **Relative paths resolve against the file that declares them**, not the file that extends it. This is
  why a shared `tsconfig` base cannot carry `extends: "./tsconfig.json"` for its children.

## Known gaps

- `packages/components/scripts` is not covered, so the wrapper generators and `generateDSRComponents.ts`
  are typechecked by nothing. See the `TODO` in `packages/components/tsconfig.typecheck.json`.
- Four rollup configs deliberately call `typescript()` without `noEmitOnError`, because their `tsconfig`
  scope contains something that cannot resolve when the bundler runs. See the third trap above for why
  the plugin's `exclude` cannot fix this.

  `packages/shared/rollup.config.js` — `tsconfig.json` covers `src/examples`, which ships as raw `.tsx`
  and imports the framework wrappers, built about ten steps later. `tsconfig.typecheck.json`, used by the
  named `typecheck` step in the same build, already excludes it for this reason.

  `packages/component-meta/rollup.config.mjs` — `tsconfig.json` sets no `include`, so its scope is the
  whole package, and both `src/lib/componentMeta.ts` and `scripts/generateComponentMeta.ts` type-import
  `@porsche-design-system/components/dist/types`. This package is built *before* `components`, so those
  can never resolve here. `scripts/generateComponentMeta.ts:23` documents the same constraint.

  `packages/components/rollup-styles.config.mjs` and `rollup-utils.config.mjs` — a pre-existing `TS5011`
  about an unset `rootDir`. The gate promotes it to an error, and setting `rootDir: 'src'` as the
  diagnostic suggests makes rollup unable to resolve the `src/styles-entry.ts` imports.

  In each case the package is still covered: `shared` and `components` by a named `typecheck` step inside
  their own `build`, and `component-meta` by `typecheck:component-meta` in `typecheck:all`, which runs on
  a built tree where those imports resolve.
- The three `scripts/*.ts` at the repo root are typechecked by nothing. There is no root `tsconfig.json`.
