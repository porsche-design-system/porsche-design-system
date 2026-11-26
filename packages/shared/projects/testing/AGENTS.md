# AGENTS.md — Testing Helpers

> This file provides context for AI coding assistants working in `packages/shared/projects/testing/`. See the shared
> [`AGENTS.md`](../../AGENTS.md) and the root [`AGENTS.md`](../../../../AGENTS.md) for wider guidance.

## Overview

`@porsche-design-system/testing` holds what used to be `shared`'s `src/testing` (the Playwright base configs with their
viewport and theme constants, the W3C CSS validator, `assertDefined` and `normalizeCssNamespace`) and the test helpers
that more than one package uses: the Playwright helpers that `src/playwright/index.ts` exports, the axe fixture and
`testCoverage`. It is private, never published, and ships TypeScript source: there is no build and no `dist`. Playwright
compiles it because Node resolves the workspace link to its real path outside `node_modules`, and Vitest compiles every
`.ts` file whatever its path. Consumers declare it in `devDependencies` as `"@porsche-design-system/testing": "0.0.0"`.

```text
src/
├── index.ts                    # `.`: the Playwright base configs, viewport and theme constants, validateCssWithW3C, testCoverage
├── assertDefined.ts            # `./assert-defined`
├── normalizeCssNamespace.ts    # `./normalize-css-namespace`
├── axe.ts                      # `./axe`: createAxeTest, built on the shared test
├── playwright/
│   ├── index.ts                # `./playwright`: the shared test, expect and the helpers more than one package uses
│   ├── test.ts                 # test: Playwright's test plus the request routing, console guard and motion switch fixtures
│   ├── externalRequests.ts     # resolveExternalRequest: the routing outcome of one request
│   ├── consoleGuard.ts         # which console messages and page errors fail a test
│   └── harnessPageConsole.ts   # messages the components-js harness pages log on purpose
├── vitest.ts                   # `./vitest`: vitestConfig, the base every Vitest config merges
└── vitestConsoleGuard.ts       # `./vitest-console-guard`: the setup file vitestConfig adds
tests/unit/                     # the specs of assertDefined, normalizeCssNamespace, testCoverage, consoleGuard and externalRequests, the Vitest base config and its console guard
biome-plugins/                  # the lint rules that require this package's Playwright test and vitestConfig
```

## What belongs here

- A helper belongs here once two or more packages use it. A helper that only one package uses stays in that package's
  `tests/*/helpers/`, even if another framework could use it; move it here when a second package needs it.
- Import nothing that builds after `shared`, such as `@porsche-design-system/component-meta`: this package's `typecheck`
  runs inside `shared`'s `build`. A suite that needs such data computes it and passes it in, as the components-js axe
  helper does with its deprecated-component exclusion.

## Rules for the exports

- **`.` must not load `@playwright/test` at runtime.** Vitest suites import it for `validateCssWithW3C` and
  `testCoverage`, and the files it re-exports import only Playwright types. Runtime Playwright code goes under
  `./playwright` or `./axe`.
- **`.` must not load `vitest` at runtime either; runtime Vitest code goes under `./vitest`.** The Playwright configs
  import `.`, and `vitest/config` loads Vite.
- **`./vitest` has no relative imports**, only bare specifiers such as `vitest/config`. Vite's config bundler
  externalizes this package, so Node loads the file directly and cannot resolve extensionless relative imports. That is
  why the guard is its own export, referenced by bare specifier in `setupFiles`. Vitest loads the guard, so it may
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

The Biome plugin `biome-plugins/use-shared-vitest-config.grit` fails `npm run lint` on a `*vitest*.config.*` file whose
default export is anything other than `mergeConfig(vitestConfig, …)`. `linter.includes` in `biome.json` ends with that
glob, so it also reaches the configs of packages excluded from linting. It reads the code, not the meaning: a config
that exports a `const`, wraps the call or renames the import fails too, so write it in the shape above.

## Console guard

`vitestConfig` adds `vitest-console-guard` as the first setup file, so it runs before a package's own. It fails:

- a test that calls `console.warn` or `console.error`;
- a file that logs at import time, in `beforeAll` or `afterAll`, in a cleanup `beforeAll` returns, in a file fixture's
  teardown, or from a timer that fires after the file's last test;
- a test that triggers a jsdom error, such as `Not implemented: HTMLFormElement's requestSubmit() method`.

The message names the method and the formatted text. Declare expected output in the test that causes it:

- **console:** `vi.spyOn(console, 'warn').mockImplementation(() => {})` plus an assertion on the spy. A spy without
  `mockImplementation` calls through and still fails.
- **jsdom:** stub the API jsdom does not implement. jsdom reports to its virtual console, not to `console`, so a console
  spy cannot declare it.

Output from a timer that fires after its test is blamed on the next test. The message names the text, so search for it.
Output outside a test is also printed, because Vitest runs no hooks in a file whose tests are all skipped, so the guard
cannot fail that file. `console.log` is not guarded.

## The shared Playwright `test`

Every Playwright spec and test helper imports `test` from `@porsche-design-system/testing/playwright`, never from
`@playwright/test`. It adds three automatic fixtures, all attached to the test's browser context: request routing, the
console guard and the motion switch. The Biome plugin `biome-plugins/use-shared-playwright-test.grit` fails
`npm run lint` on a named, default or namespace import of it from `@playwright/test`, on a re-export and on a `require`,
smoke suite included. `biome.json` attaches it to the spec and helper globs and to every storefront file.

**The rule reaches a new directory of Playwright specs or test helpers without an edit to `biome.json`.**
`linter.includes` excludes five packages from linting (`assets`, `components-angular`, `components-js`,
`components-react`, `components-vue`), re-includes all their directories with one glob, and excludes every path with a
dot in its last segment, so only the spec and helper files named after it are linted there. A directory with a dot in
its name is not entered, and a sixth package excluded from linting has to be added to that glob.

### Request routing

Each request gets exactly one outcome, checked in this order (`resolveExternalRequest` in
`src/playwright/externalRequests.ts`):

| #   | Request goes to                                                                      | Outcome                                                                                        |
| --- | ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| 1   | the host `localhost` or `127.0.0.1`, on any port                                     | not intercepted                                                                                |
| 2   | the PDS CDN, `cdn.ui.porsche.com` or `cdn.ui.porsche.cn`, `/porsche-design-system/…` | answered with the same path from `serve-cdn` on `http://localhost:3001`, aborted if that fails |
| 3   | an origin in `externalRequests.stubs`                                                | answered with that fixed reply                                                                 |
| 4   | an origin in `externalRequests.allowedOrigins`                                       | goes to the network                                                                            |
| 5   | anything else                                                                        | an image gets a placeholder SVG (`images: 'abort'` aborts it), every other request is aborted  |

**An aborted request fails the test.** The fixture collects the URLs it aborts and throws `Aborted external requests`
with that list when the test ends. It does not go through the console guard, because each browser logs an abort
differently. A request the test needs gets an entry in `stubs` or `allowedOrigins`.

### The three options

All three are Playwright options, set in the suite config's `use` or with `test.use`:

```ts
// packages/components-js/tests/e2e/config/playwright.config.ts
use: {
  expectedConsole: [
    /parser-blocking, cross site .* is invoked via document\.write/,
    /was preloaded using link preload but not used within a few seconds/,
  ],
},

// packages/examples/projects/pages/tests/vrt/specs/templates/personalized-mailing-video.vrt.ts, inside the describe of the video modal
test.use({ externalRequests: youtubePlayerStub });
```

**Stub or allow an origin on the tests that need it, not for the whole suite.** Every other test of the suite then still
fails on a request to that origin.

- `externalRequests` (`{ stubs, allowedOrigins, images }`, default `{}`) configures rows 3 to 5. `false` switches
  routing off. Only the smoke suite does that, so it runs with the guard on and no routing, against the live CDN. A
  `test.use({ externalRequests })` replaces the suite config's object and does not merge into it, so a spec that changes
  routing spreads the parts of the suite's value it wants to keep.
- `expectedConsole` (`RegExp[]`, default `[]`) lists what the test expects. A pattern is tested against the message text
  followed by a space and its source URL. Uncaught page errors can be declared too, and a pattern is then tested against
  the error message.
- `motion` (`'off' | 'on'`, default `'off'`) decides whether components animate. `'off'` sets `--p-transition-duration`
  and `--p-animation-duration` to `0s` on `:root`. `'on'` leaves the components' own durations in place. Both set
  `--p-temporary-spinner-stroke-dasharray: 40` and `--p-temporary-toast-skip-timeout: true`. The rule is a stylesheet
  the fixture adopts on every document of the context through an init script, not markup in the page's HTML. Adopted
  stylesheets come after the document's own, so it beats a page's own `:root` rule of the same specificity and
  importance. It loses to an inline `style` on `<html>`, to an `!important` declaration, and to a declaration on an
  element below `:root`, which overrides the inherited value for that element's subtree, as `toast.e2e.ts` does on
  `p-toast`. Switch motion on with the `motion` option, in `test.use` or in a suite config's `use`. The smoke suite
  config sets `'on'`. The Biome plugin `biome-plugins/use-motion-option.grit` fails `npm run lint` when a spec or test
  helper names either variable in a string or template literal. `biome.json` exempts `shared-test.e2e.ts`, whose tests
  read the variables, and `toast.e2e.ts`.

### Declaring expected console messages

- **Add to the suite's patterns, do not replace them.** A spec adds patterns with the function form. A plain
  `test.use({ expectedConsole: [...] })` replaces the suite config's patterns.

  ```ts
  test.use({
    expectedConsole: async ({ expectedConsole }, use) => use([...expectedConsole, /pattern/]),
  });
  ```

- **Declare a message once.** A message that one test or one spec file expects goes on that test or describe. A message
  that more than one file expects goes in a shared file: the suite config, or a shared map the specs can read. The
  storefront keeps such a map by URL for both suites in `packages/storefront/tests/helpers/expectedConsole.ts`.
- `harnessPageConsole` is the shared map of the component suites. It maps each components-js harness page to the
  messages it logs on purpose. A spec that expects one of those messages, in any wrapper's suite, takes the patterns
  from it instead of repeating them, whether it renders the page or not.
- **Nothing checks that a declared pattern ever matched.** A dead entry stays silent, so remove a declaration when its
  cause is fixed, as the `#4800` TODO entries in the storefront record must be.

### What the fixtures do not cover

- **A spec's own `page.route` or `context.route` wins over the fixture.** Inside a catch-all spec route, call
  `route.fallback()` for the requests the spec does not answer itself, which hands them to the fixture.
  `route.continue()` sends them straight to the network.
- **`browser.newContext()` bypasses all three fixtures.** They are attached to the test's `context`, so a context a spec
  creates itself is not routed, not guarded and keeps its motion.

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
