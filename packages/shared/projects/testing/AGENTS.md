# AGENTS.md — Testing Helpers

> This file provides context for AI coding assistants working in `packages/shared/projects/testing/`. See the shared
> [`AGENTS.md`](../../AGENTS.md) and the root [`AGENTS.md`](../../../../AGENTS.md) for wider guidance.

## Overview

`@porsche-design-system/testing` holds what used to be `shared`'s `src/testing` (the Playwright base configs with their
viewport and theme constants, the W3C CSS validator, `assertDefined` and `normalizeCssNamespace`) and the test helpers
that more than one package uses: the Playwright helpers that `src/playwright/index.ts` exports and the axe fixture. It
is private, never published, and ships TypeScript source: there is no build and no `dist`. Playwright compiles it
because Node resolves the workspace link to its real path outside `node_modules`, and Vitest compiles every `.ts` file
whatever its path. Consumers declare it in `devDependencies` as `"@porsche-design-system/testing": "0.0.0"`.

```text
src/
├── index.ts                    # `.`: the Playwright base configs, viewport and theme constants, validateCssWithW3C
├── assertDefined.ts            # `./assert-defined`
├── normalizeCssNamespace.ts    # `./normalize-css-namespace`
├── axe.ts                      # `./axe`: createAxeTest
├── playwright/index.ts         # `./playwright`: the Playwright helpers more than one package uses
├── vitest.ts                   # `./vitest`: vitestConfig, the base every Vitest config merges
└── vitestConsoleGuard.ts       # `./vitest-console-guard`: the setup file vitestConfig adds
tests/unit/                     # the specs of the helpers, the base config and the console guard
```

## What belongs here

- A helper belongs here once two or more packages use it. A helper that only one package uses stays in that package's
  `tests/*/helpers/`, even if another framework could use it; move it here when a second package needs it.
- Import nothing that builds after `shared`, such as `@porsche-design-system/component-meta`: this package's `typecheck`
  runs inside `shared`'s `build`. A suite that needs such data computes it and passes it in, as the components-js axe
  helper does with its deprecated-component exclusion.

## Rules for the exports

- **`.` must not load `@playwright/test` at runtime.** Vitest suites import it for `validateCssWithW3C`, and the files
  it re-exports import only Playwright types. Runtime Playwright code goes under `./playwright` or `./axe`.
- **`.` must not load `vitest` at runtime either; runtime Vitest code goes under `./vitest`.** The Playwright configs
  import `.`, and `vitest/config` loads Vite.
- **`./vitest` has no relative imports**, only bare specifiers such as `vitest/config`. Vite's config bundler
  externalizes this package, so Node loads the file directly and cannot resolve extensionless relative imports. That
  is why the guard is its own export, referenced by bare specifier in `setupFiles`. Vitest loads the guard, so it may
  import relatively.
- **Every barrel names its re-exports; never write `export *`.** Node runs this source as CommonJS, and the ESM
  Playwright configs of `examples` and `react-router` only see the names Node detects statically.
- Keep relative imports extensionless: the components-js test scopes do not allow `.ts` extensions.
- `@playwright/test` and `@axe-core/playwright` are `peerDependencies` as well as `devDependencies`, never
  `dependencies`: a second copy of `@playwright/test` aborts every run.
- A new subpath needs an entry in `exports` in `package.json`.

## The Vitest base config

A Vitest config is written as `mergeConfig(vitestConfig, defineConfig({ test: { … } }))` and keeps only its own
settings. `mergeConfig` replaces a scalar, skips `null` and `undefined` (so neither unsets a base value) and
concatenates arrays (so a package can add to `exclude` and `setupFiles` but never drop the base's entries). Every
override of a base setting carries a comment saying why.

## Console guard

`vitestConfig` adds `vitest-console-guard` as the first setup file, so it runs before a package's own. It fails:

- a test that calls `console.warn` or `console.error`;
- a file that logs at import time, in `beforeAll` or `afterAll`, or from a timer that fires after the file's last test;
- a test that triggers a jsdom error, such as `Not implemented: HTMLFormElement's requestSubmit() method`.

The message names the method and the formatted text. Declare expected output in the test that causes it:

- **console:** `vi.spyOn(console, 'warn').mockImplementation(() => {})` plus an assertion on the spy. A spy without
  `mockImplementation` calls through and still fails.
- **jsdom:** stub the API jsdom does not implement. jsdom reports to its virtual console, not to `console`, so a console
  spy cannot declare it.

Output from a timer that fires after its test is blamed on the next test. The message names the text, so search for it.
`console.log` is not guarded.

## `normalizeCssNamespace` ships in a published bundle

The published `jsdom-polyfill` (`packages/components-js/dist/components-wrapper/jsdom-polyfill/index.cjs`) bundles
`src/normalizeCssNamespace.ts`, compiled by the TypeScript step in
`packages/components-js/projects/jsdom-polyfill/rollup.config.js`. After changing the file, rebuild with
`npm run build:components-js`, run `npm run test:unit:components-js:jsdom-polyfill` (`jsdom-build.spec.ts` asserts the
call survives in the bundle) and check the diff of `index.cjs` before calling the change internal.

## Commands

```bash
npm run typecheck --workspace=@porsche-design-system/testing     # also runs inside shared's typecheck and build
npm run test:unit --workspace=@porsche-design-system/testing     # also runs inside npm run test:unit:shared
```
