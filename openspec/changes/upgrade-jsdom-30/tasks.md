## 1. CSS namespace normalization (still on jsdom 29)

- [x] 1.1 Add the conditional `CSS.escape` rebind as the first statement of
      `packages/components-js/projects/jsdom-polyfill/src/index.js`, with a comment explaining that `CSS` is a WebIDL
      namespace whose operations must be callable detached.
- [x] 1.2 Add a unit test under `packages/components-js/projects/jsdom-polyfill/tests/unit/specs/` asserting that a
      detached `const escape = CSS.escape; escape('a.b')` returns the escaped string and does not throw.
- [x] 1.3 Add a unit test asserting the normalization is a no-op when the host exposes no `CSS` namespace and when its
      operations already work detached (idempotent re-application).
- [x] 1.4 Rebuild the bundle (`npm run build:jsdom-polyfill --workspace=@porsche-design-system/js`) and confirm in
      `dist/components-wrapper/jsdom-polyfill/index.cjs` that the normalization is emitted before the popover polyfill
      and the Stencil loader are required.
- [x] 1.5 Run `npm run test:unit:components-js:jsdom-polyfill` on jsdom 29 and confirm it still passes (62 files / 211
      tests) — proving the no-op path.

## 2. Hoisting: move the jsdom declaration to the root

- [x] 2.1 Remove `jsdom` from `devDependencies` in `packages/components-js/package.json`.
- [x] 2.2 Add `jsdom` to `devDependencies` in the root `package.json`, next to `vitest`.
- [x] 2.3 Run `npm install` (incrementally — do **not** delete `package-lock.json`) and verify `node_modules/jsdom`
      exists at the root and no nested copy remains under `packages/*/node_modules`.
- [x] 2.4 Confirm `package-lock.json` still records all eight `@next/swc-*` optional dependencies.

## 3. Upgrade jsdom and the popover polyfill in lockstep

- [x] 3.1 Bump `jsdom` to `^30` in the root `package.json` via `npx syncpack update --dependencies 'jsdom'`.
- [x] 3.2 Bump `@oddbird/popover-polyfill` to `^0.7` via
      `npx syncpack update --dependencies '@oddbird/popover-polyfill'`.
- [x] 3.3 Run `npm install` and confirm it completes without `ERESOLVE`; add a scoped root `overrides` entry only if a
      genuine peer conflict appears.
- [x] 3.4 Rebuild the polyfill bundle so the new popover polyfill is actually exercised.
- [x] 3.5 Run `npm run test:unit:components-js:jsdom-polyfill` and confirm 62 files / 211 tests pass.

## 4. Resolve remaining jsdom 30 fallout

- [x] 4.1 Re-measure the `validity`, `scrollTo` and `indeterminate` errors; record which are cascading from the former
      `CSS.escape` crash and which are genuine jsdom 30 gaps.
- [x] 4.2 For each genuine gap, add a polyfill in `src/index.js` or a mock in the Vitest setup, matching the style of
      the existing Web Animations and Dialog API mocks.
- [x] 4.3 Answer the design's open question: check whether `components-vue/vue-wrapper` (no `setupFiles`) and the
      `styles` suites render JSS under jsdom, and wire in the polyfill import if they do.

## 5. Verify every jsdom-based suite

- [x] 5.1 `npm run build` (full build in dependency order).
- [x] 5.2 Run the jsdom-based unit suites: `components-js`, `storefront`, `skill`, `components-react`, `components-vue`,
      `components`, `component-meta`, `shared`, `styles`.
- [x] 5.3 Run `npm run lint` and `npm run npm:lint` (syncpack) and fix any reported issues.
- [x] 5.4 Record which CI checks could not be reproduced locally (VRT in Docker, cross-browser e2e) for the PR
      description.

## 6. Lift the hold-back and update documentation

- [x] 6.1 Remove `jsdom` and `@oddbird/popover-polyfill` from the `updateGroups` entry in `.syncpackrc.json`.
- [x] 6.2 Remove both `ignore` entries from `.github/dependabot.yml`.
- [x] 6.3 Replace the hold-back rationale in `docs/dependencies.md` with a short note that the two packages are coupled
      and must be bumped in lockstep, and that the polyfill is bundled (rebuild before testing a bump).
- [x] 6.4 Remove both entries from the held-back table in `docs/runbooks/dependency-updates-agent.md`.
- [x] 6.5 Run `npm run npm:outdated` and confirm both packages are eligible again and up to date.
- [x] 6.6 Format the touched Markdown with Prettier and the touched JSON with Biome.

## 7. Upstream follow-up

- [x] 7.1 File (or find) a jsdom issue arguing that `CSS` namespace operations must not brand-check `this`, and link it
      from the code comment so the normalization can be dropped later. → filed as
      [jsdom#4228](https://github.com/jsdom/jsdom/issues/4228), linked from
      `packages/shared/src/testing/normalizeCssNamespace.ts` and `docs/dependencies.md`.

## 8. Follow-up hardening

- [x] 8.1 De-duplicate `normalizeCssNamespace()`: keep the single implementation in `shared` and expose it via a
      dedicated `./testing/normalize-css-namespace` export (own rollup entry) so neither a Vitest setup nor the
      published bundle pulls in the Playwright configs and the W3C validator of the `testing` barrel.
- [x] 8.2 Reduce `jsdom-polyfill/src/normalizeCssNamespace.js` to a one-line re-export of that subpath and document why
      the local module has to stay (Rollup treeshakes a direct import because it proves the body pure).
- [x] 8.3 Switch the `components` and `react-ssr-wrapper` Vitest setups from the barrel to the deep import, and drop the
      re-export from `shared/src/testing/index.ts` so the cheap path is the only path.
- [x] 8.4 Move the helper's unit tests next to its implementation (`packages/shared/tests/unit/specs/`) and keep only
      the "global namespace is normalized" integration test in the polyfill package.
- [x] 8.5 Extend the bundle test to assert that the implementation — not just its call site — survives in
      `dist/components-wrapper/jsdom-polyfill/index.cjs`.
- [x] 8.6 Guard the jsdom version requirement of `@oddbird/popover-polyfill` with an actionable error, declare `jsdom`
      as an optional peer dependency of the four published wrappers, and document the floor in `CHANGELOG.md` and the
      storefront testing pages.
