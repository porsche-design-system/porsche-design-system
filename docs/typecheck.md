# Typecheck

TypeScript is checked in two passes, and neither pass emits anything. This document explains where each
pass runs, how a package is assigned to one of them, and the conventions to follow when adding a package.
It deliberately names no counts, package lists or step numbers. Those change with every package, and the
commands at the end of each section derive them from the tree instead.

Only TypeScript is checked. `.js`, `.cjs` and `.mjs` files are never typechecked.

## Two passes

**Pass one runs before any build.** Root `typecheck` chains the packages whose sources all exist in a fresh
clone. CI runs it as the `Typecheck` job after `Lint`, and the build jobs depend on it, so a type error
stops a build from being attempted. Root `build` and `build-prod` begin with the same command, so a local
build gets the same gate.

**Pass two runs inside each package's own build.** A package whose sources only exist after code
generation or after another package has been built is checked where those sources are produced. The
build script is ordered `clean`, then generate, then `typecheck`, then bundle, so the check sees the
generated files and the bundle never runs on code that failed.

Root `typecheck:all` chains both passes in the order `build` uses. It needs a built tree, so nothing
automated calls it. Use it locally to check every package's source in one command.

## Which pass a package belongs to

The dividing line is whether the check needs build output. A package belongs to pass two if it imports
generated code, generated type declarations, or another package's `dist`. Everything else belongs to pass
one.

When a package's inputs are built later than the package itself, its check cannot run in its own build.
It runs instead from the earliest build script at which everything it imports exists.

## How pass two gates a build

One of three mechanisms stops the build on a type error.

- **A named `typecheck` step in the package's `build` script**, between its generator and its bundler.
- **`noEmitOnError` on the rollup TypeScript plugin.** Every rollup config that calls `typescript()` sets
  it, so the bundle step itself fails.
- **The framework compiler refusing to emit.** `ng build`, `vue-tsc` and `next build` fail on type errors
  on their own.

The wrapper demo apps are built by `build-app`, which the e2e test jobs call, so they are gated there rather
than in the `Typecheck` job. Scripts that a package runs through `tsx` are checked by their own `noEmit`
config, chained into the package's `typecheck` script.

To see which mechanism covers a package, read the tree rather than this document:

```bash
git grep -n '"build":.*typecheck' -- '*/package.json'     # named steps inside builds
git grep -l 'typescript(' -- '*rollup*' | xargs grep -L noEmitOnError   # ungated bundlers, expect no output
git grep -h '"extends"' -- '*.json' | sort | uniq -c        # who extends the shared base and path mappings
```

## How a fresh clone resolves internal packages

Internal packages resolve to their `dist` through the workspace, which does not exist before a build.
`packages/shared/tsconfig.paths.json` maps their names to source instead. Only the check configs extend it,
`tsconfig.typecheck.json` and `tsconfig.scripts.json`, never a `tsconfig.json` that a build reads, so
builds keep resolving from `dist`.

`packages/shared/tsconfig.base.json` is the shared compiler base. Configs reference both files by the
workspace name `shared`, which `npm install` links as `node_modules/shared`, so no build is needed and no
config encodes its own depth to reach them. This relies on `shared` having no `exports` map. If one is
added, it must expose both files.

## Root scripts

Root holds one `typecheck:{package}` entry per top-level package, and one `typecheck:{package}:tests` entry for
every top-level package that owns test code, plus `typecheck`, `typecheck:all`, `typecheck:all:tests` and
`typecheck:scripts` for the repo's own `scripts/` folder. A project below a top-level package has no root entry.
Its parent's `typecheck` fans out to it when both are in the same pass, and `typecheck:all` calls it with
`--workspace` otherwise. Its test scopes are called by the parent's `typecheck:{package}:tests` entry.

## Adding a package

1. Add a `typecheck` script to the package.
2. For a top-level package, add a root `typecheck:{package}` entry and chain it into `typecheck:all` at the
   position the package occupies in `build`. For a nested project, add no root entry and chain
   `npm run typecheck --workspace={name}` into `typecheck:all` instead.
3. Decide the pass. If the package compiles in a fresh clone, chain it into root `typecheck`. If not, call
   the script from inside its `build`, after whatever generates its sources and before its bundle step.
4. Add a `tsconfig.typecheck.json` only if the check needs a different scope from the config the bundler
   reads. Extend `shared/tsconfig.paths.json` from it when the check runs before the build.
5. Give scripts the package runs through `tsx` their own `tsconfig.scripts.json` with `noEmit`, chained into
   the package's `typecheck`. Never add them to a `tsconfig` that a bundler reads.
6. Give unit specs a `tsconfig.test.json` and a `typecheck:tests` script, and each `tests/{e2e,vrt,a11y,smoke}`
   folder a `tsconfig.{scope}.json` and a `typecheck:tests:{scope}` script. Make the script the first command of
   the test script that runs those files, and add it to the `typecheck:{package}:tests` entry of the top-level
   package that owns it. A new top-level package also needs that entry, chained into `typecheck:all:tests`.

## Traps

- **`exclude` replaces, it does not merge.** A child's `exclude` discards the parent's and TypeScript's
  defaults, which include `node_modules` and `outDir`. If you set `exclude`, restate everything you need.
- **`noEmitOnError` on the rollup plugin grades the whole `tsconfig` program**, not only the modules the
  bundler pulls in, and the plugin's own `include` and `exclude` cannot narrow it. Before gating a bundler,
  check what its `tsconfig` covers, and narrow the `tsconfig` itself if it reaches files that cannot resolve
  at that point in the build.
- **Declaration emit covers the whole program too.** A bundler with `declaration: true` writes a `.d.ts` for
  every file its `tsconfig` includes. Widening that `tsconfig` publishes declarations for the new files.
- **Nothing gets `@types/node` implicitly.** TypeScript 6 defaults `types` to `[]`, and a child's `types` replaces
  the parent's rather than merging. Every config that touches Node APIs declares `"types": ["node"]`.
- **TypeScript 6 defaults `strict` to `true`.** A config that never sets it is strict. The Angular package's
  configs and every test scope are subject to this.
- **Relative paths resolve against the file that declares them**, not the file that extends it. A shared
  base cannot carry a relative `extends` on behalf of its children, and mappings in `tsconfig.paths.json`
  are relative to that file.
- **TypeScript 6 reports `TS5011` when `rootDir` is unset** and the common source directory differs from the
  directory holding the `tsconfig`. A gated bundler fails on it. Set `rootDir` to the directory that keeps
  the existing output layout.

## Test code

Test code is checked in a scope of its own, at the start of the script that runs it. A workspace with
unit specs has a `tsconfig.test.json` and a `typecheck:tests` script; a `tests/{e2e,vrt,a11y,smoke}`
folder has a `tsconfig.{e2e,vrt,a11y,smoke}.json` and a matching `typecheck:tests:{scope}` script. Each
script runs `tsc --noEmit` (`vue-tsc` in the Vue package) and is the first command of the test script
that executes those files, so a type error fails the test job before the runner starts. Specs import
built packages and test utilities, so these scopes belong to pass two. Root `typecheck:all:tests` chains one
`typecheck:{package}:tests` entry per top-level package, and each entry calls its own scopes by workspace.
`typecheck` and `typecheck:all` cover source only.

A test scope extends the config its workspace already compiles with and adds the `types` the runner
provides. Nothing a bundler reads extends a test scope.

Angular's karma spec is compiled by `@angular/build:karma`, which type checks on its own. Only the
Angular vitest specs need `typecheck:tests`.

```bash
git ls-files '*tsconfig.test.json' '*tsconfig.e2e.json' '*tsconfig.vrt.json' '*tsconfig.a11y.json' '*tsconfig.smoke.json'   # every test scope
git grep -n '"test:[a-z:-]*": "npm run typecheck:tests' -- '*/package.json'   # where each scope is chained
git grep -n 'typecheck:tests' -- package.json   # what typecheck:all:tests reaches
```
