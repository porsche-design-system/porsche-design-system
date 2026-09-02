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
entries, so a package is added to either chain by name. Scopes below a top-level package, such as
`tokens-meta`, `stylesheets`, `partials`, `assets` `typecheck:self` and `components-js` `typecheck:scripts`,
have no root entry. `typecheck:all` calls them through `--workspace` directly, so root keeps one
`typecheck:{package}` per top-level package.

**Pass two, inside each package's own build.** Anything whose sources only exist after code generation or
compilation is checked where it is produced, positioned `clean` then `build` then `typecheck` then
`bundle`. They are kept out of root `typecheck`, because that chain must run on a fresh checkout and they
cannot. Their root `typecheck:{package}` entries exist so `typecheck:all` can chain them and so one package
can be checked by name on a built tree.

## Why a package is on one side

The dividing line is whether the check needs build output. A package belongs to pass two if it imports
generated code, generated type declarations, or another package's `dist`.

Root `typecheck` covers the root `scripts/`, `tokens`, `assets`, `styles`, `utilities` and `components-js`,
which is 22 compiler runs, because several of those fan out to their own projects. `typecheck:all` is
52. Both figures count each compiler invocation.

Everything else is gated in its own build by one of three mechanisms.

| Mechanism | Packages |
|---|---|
| A named `typecheck` step inside `build` | `shared`, `components`, `component-meta`, `tokens-meta`, `partials`, `stackblitz`, plus `assets` `typecheck:self` and `components-js` `typecheck:scripts`, which cover post-build scopes their pre-build umbrella skips, and `skills`, run from the storefront `build` (see below) |
| `noEmitOnError` on the bundler | all 23 rollup configs that call `typescript()` |
| The framework compiler refusing to emit | `components-angular` via `ng build`, `components-vue` via `vue-tsc --emitDeclarationOnly`, `storefront` via `next build` |

The three wrapper demo apps are checked by `build-app`, which `test:e2e` calls, so CI reaches them
through the e2e jobs rather than the `Typecheck` job. `build-app` also checks the two build scripts
those packages run through `tsx`, `components-vue/scripts` through `tsconfig.node.json` and
`components-angular/scripts` through `tsconfig.scripts.json`.

`stylesheets` also has a `typecheck` script for checking by name. It is not a step in its `build`, because
its gated bundler grades the identical program. `typecheck:all` calls it by workspace.

`component-meta` takes Stencil's `PropOptions` from `@stencil/core` rather than from `components/dist/types`,
so its program resolves at its own build position, before `components` exists.

`skills` cannot be checked inside its own `build:skills`, CI step 9. Its knowledge generators import
storefront source by relative path, and the storefront component meta files import
`@porsche-design-system/components-react/ssr` and `components-js`, built at steps 12 and 10. So the
storefront `build`, step 14, starts with `typecheck:skills`, when everything the program needs exists.
`build:skills` itself still runs the generator through `tsx` unchecked, so a type error there fails the
pipeline five steps later rather than at once.

## How a fresh clone resolves internal packages

`tsconfig.paths.json` at the repo root maps internal specifiers to sibling **source**, so pass one works
before anything is compiled. It is extended only from a package's `tsconfig.typecheck.json`, never from
its `tsconfig.json`, so the build keeps resolving from published declarations and a declaration-bundling
fault is still caught.

For the same reason, configs read at build time extend `shared/src/tsconfig.json`, the tracked source
copy, rather than the built one.

## Adding a package

1. Add a `typecheck` script to the package.
2. For a top-level package, add a root `typecheck:{package}` entry and chain it into `typecheck:all` at
   the position the package occupies in `build`. For a project below a top-level package, add no root
   entry and chain `npm run typecheck --workspace={name}` into `typecheck:all` directly.
3. Decide the side. If it compiles in a fresh clone, also chain it into root `typecheck`. If not, call the
   script from inside the package's `build`, after whatever generates its sources and before its bundle
   step, and leave it out of root `typecheck`.
4. Add a `tsconfig.typecheck.json` only if the scope differs from the config the bundler reads. Extend
   `tsconfig.paths.json` from it when the check runs before the build.
5. Give scripts the package runs through `tsx` their own `tsconfig.scripts.json` with `noEmit`, and chain it
   into the package `typecheck`. Never add them to the `tsconfig` a bundler reads, see the sixth trap.

## Six traps

- **`exclude` replaces, it does not merge.** A child's `exclude` discards the parent's *and* TypeScript's
  defaults, which include `node_modules` and `outDir`. If you set `exclude`, restate everything you need.
- **`noEmitOnError` on `@rollup/plugin-typescript` grades the whole `tsconfig` program**, not just the
  modules the bundler pulls in, and the plugin's own `include`/`exclude` are rollup module filters that
  cannot narrow it. So the gate fails on any file in the `tsconfig` scope that cannot resolve at that
  point in the build, even when nothing imports it. Before adding the gate to a bundler, check what its
  `tsconfig` actually covers. Narrow the `tsconfig` itself instead, as `packages/shared/tsconfig.json` does
  by excluding the generated `src/examples`.
- **`types` replaces the auto-include.** This repo never gets `@types/node` implicitly. Configs that need
  it declare `"types": ["node"]` explicitly.
- **Relative paths resolve against the file that declares them**, not the file that extends it. This is
  why a shared `tsconfig` base cannot carry `extends: "./tsconfig.json"` for its children.
- **TypeScript 6 reports `TS5011` when `rootDir` is unset** and the common source directory differs from the
  directory holding the `tsconfig`. A gated bundler fails on it. Set `rootDir` explicitly to the directory
  that keeps the current output layout. For the `components` style and util bundles that is `.`, because
  their declarations are published under `dist/*/src/`.
- **Declaration emit covers the whole program too.** A bundler with `declaration: true` writes a `.d.ts` for
  every file its `tsconfig` includes, not only the modules it bundles. Adding `scripts` to that `tsconfig`
  published `meta/esm/scripts/*.d.ts` from `emotion` and `vanilla-extract` before it was caught. Scripts get
  a separate `noEmit` config instead.

## Known gaps

- Test code is outside every scope, by design. Every typecheck config excludes `**/*.spec.ts`, except the
  `stylesheets` project whose config has no `exclude`, and the e2e, VRT and a11y suites under `tests/` are in
  no program. Vitest and Playwright compile them with esbuild, which strips types without checking them.
