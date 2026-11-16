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
└── playwright/
    ├── index.ts                # `./playwright`: the shared test, expect and the helpers more than one package uses
    ├── test.ts                 # test: Playwright's test plus the request routing and console guard fixtures
    ├── externalRequests.ts     # resolveExternalRequest: the routing outcome of one request
    ├── consoleGuard.ts         # which console messages and page errors fail a test
    └── harnessPageConsole.ts   # messages the components-js harness pages log on purpose
tests/unit/                     # the specs of assertDefined, normalizeCssNamespace, testCoverage, consoleGuard and externalRequests
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
- **Every barrel names its re-exports; never write `export *`.** Node runs this source as CommonJS, and the ESM
  Playwright configs of `examples` and `react-router` only see the names Node detects statically.
- Keep relative imports extensionless: the components-js test scopes do not allow `.ts` extensions.
- `@playwright/test` and `@axe-core/playwright` are `peerDependencies` as well as `devDependencies`, never
  `dependencies`: a second copy of `@playwright/test` aborts every run.
- A new subpath needs an entry in `exports` in `package.json`.

## The shared Playwright `test`

Every Playwright spec and test helper imports `test` from `@porsche-design-system/testing/playwright`, never from
`@playwright/test`. It adds two automatic fixtures, both attached to the test's browser context: request routing and the
console guard. A `noRestrictedImports` rule in `biome.json` fails `npm run lint` on the wrong import, smoke suite
included.

**A new directory of Playwright specs or test helpers in a package that `biome.json` `linter.includes` excludes
(`components-js`, `components-angular`, `components-react`, `components-vue`, `assets`) must be added to
`linter.includes` with each of its parent directories, or Biome never enters it and the rule never runs there.**

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

### The two options

Both are Playwright options, set in the suite config's `use` or with `test.use`:

```ts
// packages/components-js/tests/e2e/config/playwright.config.ts
use: {
  expectedConsole: [
    /parser-blocking, cross site .* is invoked via document\.write/,
    /was preloaded using link preload but not used within a few seconds/,
  ],
},

// packages/components-js/tests/vrt/specs/components.vrt.ts, inside the describe of the table page
test.use({ externalRequests: { allowedOrigins: ['https://nav.porsche.com'] } });
```

**Allow an origin on the tests that need it, not for the whole suite.** Every other test of the suite then still fails
on a request to that origin.

- `externalRequests` (`{ stubs, allowedOrigins, images }`, default `{}`) configures rows 3 to 5. `false` switches
  routing off. Only the smoke suite does that, so it runs with the guard on and no routing, against the live CDN. A
  `test.use({ externalRequests })` replaces the suite config's object and does not merge into it, so a spec that changes
  routing spreads the parts of the suite's value it wants to keep.
- `expectedConsole` (`RegExp[]`, default `[]`) lists what the test expects. A pattern is tested against the message text
  followed by a space and its source URL. Uncaught page errors can be declared too, and a pattern is then tested against
  the error message.

### Declaring expected console messages

- **Add to the suite's patterns, do not replace them.** A spec adds patterns with the function form. A plain
  `test.use({ expectedConsole: [...] })` replaces the suite config's patterns.

  ```ts
  test.use({
    expectedConsole: async ({ expectedConsole }, use) => use([...expectedConsole, /pattern/]),
  });
  ```

- **Declare a message where it is seen.** A message seen on one page goes on that page's test or describe. A message
  seen on more than one page of a suite goes in the suite config. The exception is a suite with a per-URL record: the
  storefront keeps its record for both suites in `packages/storefront/tests/helpers/expectedConsole.ts`.
- `harnessPageConsole` maps each components-js harness page to the messages it logs on purpose. A spec that renders one
  of those pages, in any wrapper's suite, takes the page's patterns from it instead of repeating them.
- **Nothing checks that a declared pattern ever matched.** A dead entry stays silent, so remove a declaration when its
  cause is fixed, as the `#4800` TODO entries in the storefront record must be.

### What the fixtures do not cover

- **A spec's own `page.route` or `context.route` wins over the fixture.** Inside a catch-all spec route, call
  `route.fallback()` for the requests the spec does not answer itself, which hands them to the fixture.
  `route.continue()` sends them straight to the network.
- **`browser.newContext()` bypasses both fixtures.** They are attached to the test's `context`, so a context a spec
  creates itself is neither routed nor guarded.

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
