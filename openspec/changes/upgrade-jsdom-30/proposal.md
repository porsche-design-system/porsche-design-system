## Why

`jsdom` and `@oddbird/popover-polyfill` are currently held back (`^29` / `^0.6`) because they block each other: since
`v0.7` the popover polyfill calls `CSS.escape` at apply time, and jsdom only exposes a `CSS` namespace from `v30`
onwards — but jsdom `v30`'s `CSS.escape` brand-checks its `this` receiver, which breaks `jss` (it caches `CSS.escape`
unbound at module init) and takes down every Vitest `jsdom` suite in the monorepo. Each weekly dependency run
re-surfaces these two packages, and staying on jsdom `v29` keeps us on an increasingly stale test environment while the
hold-back list grows.

## What Changes

- Add a **`CSS` namespace normalization** to `@porsche-design-system/jsdom-polyfill` so that `CSS.escape` is callable
  detached, matching real browsers (per CSSOM, `CSS` is a **namespace**, whose operations are not brand-checked). This
  is exactly the class of environment gap the package already exists to close.
- **Move the `jsdom` declaration** from `packages/components-js/package.json` to the root `package.json` (next to
  `vitest`). `jsdom@30` turned `canvas` from an optional dependency into an optional **peer** dependency, so npm nests
  it instead of hoisting it — root-level `vitest` then cannot resolve the `jsdom` environment at all.
- **Bump `jsdom` to `^30` and `@oddbird/popover-polyfill` to `^0.7` together** — they cannot move independently.
- **Remove both from the held-back lists** in `.syncpackrc.json`, `.github/dependabot.yml`, `docs/dependencies.md` and
  `docs/runbooks/dependency-updates-agent.md`, replacing the entries with the resolved rationale.
- Re-validate the jsdom `v30` fallout observed around `validity`, `scrollTo` and `indeterminate`, and add explicit
  mocks/polyfills for any that are **not** merely cascading from the `CSS.escape` crash.

## Capabilities

### New Capabilities

- `jsdom-test-environment`: the guarantees `@porsche-design-system/jsdom-polyfill` provides so that Porsche Design
  System components render and behave correctly inside jsdom-based test environments — which browser APIs are
  polyfilled, which host globals are normalized, and the supported jsdom version range.

### Modified Capabilities

<!-- None: openspec/specs/ contains no existing specs yet. -->

## Impact

- **Source**: `packages/components-js/projects/jsdom-polyfill/src/index.js` (new normalization, must evaluate before the
  popover polyfill and the Stencil loader), plus its unit tests.
- **Dependencies**: root `package.json` (gains `jsdom`), `packages/components-js/package.json` (loses `jsdom`),
  `packages/components-js/projects/jsdom-polyfill/package.json` (`@oddbird/popover-polyfill`), `package-lock.json`.
- **Dependency policy**: `.syncpackrc.json`, `.github/dependabot.yml`, `docs/dependencies.md`,
  `docs/runbooks/dependency-updates-agent.md`.
- **Test suites at risk** — every suite running `environment: 'jsdom'`: `components-js/jsdom-polyfill`, `storefront`,
  `storefront/projects/skill`, `components-react` (react-wrapper, react-ssr-wrapper), `components-vue/vue-wrapper`,
  `components`, `component-meta`, `shared`, `styles` (scss, emotion, vanilla-extract).
- **Published artifact**: the polyfill is bundled into `dist/components-wrapper/jsdom-polyfill/index.cjs`, so the change
  ships to consumers and needs a rebuild before any verification run.
- **No runtime impact** on the components themselves — the normalization is a no-op in real browsers.
