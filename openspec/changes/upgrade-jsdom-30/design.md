## Context

`@porsche-design-system/jsdom-polyfill` is the shared entry point for jsdom-based testing across the monorepo. Its
Vitest setup files import it directly (`@porsche-design-system/components-js/jsdom-polyfill` in the polyfill's own
suite, `@porsche-design-system/components-react/jsdom-polyfill` in the storefront suite), and it is published for
consumers. `jsdom` itself is declared **once**, in `packages/components-js/package.json`, and every other workspace
relies on npm hoisting it to the repository root so that root-level `vitest` can resolve the `jsdom` environment.

Two coupled upstream changes currently block the upgrade (measured on the `jsdom-polyfill` suite, 62 files / 211 tests):

1. **`jsdom@30` brand-checks `CSS.escape`.** `jss@10` caches the operation unbound at module init:

   ```js
   var nativeEscape = typeof CSS !== 'undefined' && CSS.escape;
   var escape = (str) => (nativeEscape ? nativeEscape(str) : str.replace(escapeRegex, '\\$1'));
   ```

   On jsdom 29 there is no `CSS` global at all, so JSS silently uses its regex fallback. On jsdom 30 the global exists,
   JSS caches it, and every rule creation throws
   `TypeError: 'escape' called on an object that is not a valid instance of CSS.` → **79 of 211 tests fail**, with
   follow-up errors reading `validity`, `scrollTo` and `indeterminate` off components that never finished rendering. Per
   CSSOM, `CSS` is a WebIDL **namespace**, and namespace operations are not brand-checked — real browsers accept the
   detached call, so this is a jsdom-side deviation, not a JSS bug.

2. **`@oddbird/popover-polyfill@0.7` requires the `CSS` namespace.** It calls `.split('.').map(CSS.escape)` at apply
   time. On jsdom 29 (no `CSS` global) all 62 files fail to load with
   `TypeError: Cannot read properties of undefined (reading 'escape')`. It therefore cannot move before jsdom, and jsdom
   cannot move before JSS is unblocked.

Additionally, `jsdom@30` turned `canvas` from an optional dependency into an optional **peer** dependency. npm then
nests it under `packages/components-js/node_modules` instead of hoisting it, and root-level `vitest` fails with
`Cannot find package 'jsdom'` — this reproduces even after a clean `package-lock.json` regeneration.

## Goals / Non-Goals

**Goals:**

- Upgrade `jsdom` to `^30` and `@oddbird/popover-polyfill` to `^0.7` in one atomic change.
- Make the `CSS` namespace behave like a browser's inside the polyfill, so any consumer caching `CSS.escape` unbound
  keeps working — not just JSS.
- Guarantee a single hoisted `jsdom` for every Vitest `jsdom` environment in the monorepo.
- Remove both packages from the held-back lists so future weekly runs stop re-surfacing them.

**Non-Goals:**

- Upgrading or replacing `jss` (unmaintained at `v10`) — tracked separately.
- Patching `jsdom` or `jss` via `patch-package`.
- Changing component runtime behavior or any browser-targeted build output.
- Touching the other held-back dependencies (`@stencil/core`, `@playwright/test`, `typescript`).

## Decisions

### Decision 1: Normalize the `CSS` namespace inside `jsdom-polyfill`

Rebind the namespace operations onto the namespace object at the top of
`packages/components-js/projects/jsdom-polyfill/src/index.js`:

```js
// jsdom >= 30 exposes a `CSS` namespace whose operations brand-check their `this` receiver.
// Per CSSOM, `CSS` is a WebIDL namespace, so its operations must be callable detached, as they are in browsers.
// Consumers that cache them unbound (e.g. jss: `var nativeEscape = CSS.escape`) otherwise throw.
if (typeof globalThis.CSS?.escape === 'function') {
  globalThis.CSS.escape = globalThis.CSS.escape.bind(globalThis.CSS);
}
```

**Why here**: this package exists precisely to close jsdom-vs-browser gaps, it is already the single import shared by
every jsdom suite in the repo, and it ships to external consumers who hit the identical JSS failure. The fix is a
one-line, self-documenting no-op in real browsers.

**Alternatives considered**:

- _`patch-package` on `jss`_ — would also fix bundled output, but adds a patch against an unmaintained package that we
  intend to replace, and does nothing for other libraries caching `CSS.escape` unbound.
- _Per-package Vitest `setupFiles`_ — must be repeated in ~10 configs, is easy to forget in new packages, and does not
  help published consumers.
- _Shim only when `CSS` is absent_ — insufficient: on jsdom 30 the namespace exists but is brand-checked, which is the
  actual failure.

### Decision 2: Normalization must evaluate first

`src/index.js` requires the popover polyfill and then the Stencil loader (which pulls in JSS). Because the Rollup
CommonJS output evaluates those through lazy `require*()` wrappers, a statement at the top of `src/index.js` runs before
both. This ordering is load-bearing and must be asserted by a test, not assumed: verify against the **built**
`dist/components-wrapper/jsdom-polyfill/index.cjs`, and if bundling ever reorders it, fall back to extracting the
normalization into a dedicated module imported as the entry's first statement.

### Decision 3: Declare `jsdom` at the repository root

Move the declaration from `packages/components-js/package.json` to the root `package.json`, next to `vitest`. Root
dependencies are always installed at root `node_modules`, which defeats the peer-dependency-driven nesting. This also
makes an existing implicit assumption explicit: `jsdom` is shared test tooling, not a `components-js` concern — no
source file imports it directly anywhere in the repo.

**Alternative considered**: declaring `jsdom` in every workspace that uses `environment: 'jsdom'` — more churn, more
drift, and syncpack would have to keep ~10 copies aligned.

### Decision 4: Bump both packages in lockstep and unblock the policy files

Update `.syncpackrc.json`, `.github/dependabot.yml`, `docs/dependencies.md` and
`docs/runbooks/dependency-updates-agent.md` in the same change. `docs/dependencies.md` keeps a short note that the two
packages are **coupled** and that the polyfill is bundled (so a rebuild is required before testing a bump) — that
guidance stays useful after the hold-back is lifted.

### Decision 5: Re-verify the secondary jsdom 30 failures rather than assume

The `validity` / `scrollTo` / `indeterminate` errors appeared **after** the `CSS.escape` crash aborted rendering, so
they are probably cascading. They must be re-measured once the normalization is in place; any that survive get an
explicit polyfill or Vitest mock, consistent with the existing mocks for the Web Animations and Dialog APIs.

_Outcome:_ all three were purely cascading — with the normalization in place the `jsdom-polyfill` suite passes 63/63
files on jsdom 30 with no additional mocks. The same applies to the 72 "obsolete snapshot" failures in `components`: the
styles specs crashed before writing any snapshot, so every existing snapshot was reported obsolete.

### Decision 6: One implementation in `shared`, consumed through a dedicated deep export

_Added during implementation, revised in follow-up._ Decision 1 assumed the polyfill covers every jsdom suite. It does
not: `shared`, `components` and `components-react/react-ssr-wrapper` also render JSS under jsdom, and the first two are
built **before** `components-js`, so importing its `jsdom-polyfill` would invert the build order. Measured fallout on
jsdom 30 without a fix: `shared` 9 failed tests, `components` **72 failed files**, `react-ssr-wrapper` 1 failed file.

The first implementation duplicated the helper (once in `shared`, once in the polyfill) because the `shared/testing`
barrel re-exports Playwright configs and a W3C validator that must not end up in the shipped artifact. The follow-up
removes that duplication by giving the helper its **own export subpath** instead:

| Artifact                                                        | Role                                                                                         |
| --------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `shared/src/testing/normalizeCssNamespace.ts`                   | single implementation, first package of the build order                                      |
| `@porsche-design-system/shared/testing/normalize-css-namespace` | 3 KB standalone bundle (own rollup entry + `exports` entry), free of Playwright/`node:https` |
| `jsdom-polyfill/src/normalizeCssNamespace.js`                   | one-line re-export of the above, bundled into the published artifact                         |

It is deliberately **not** re-exported from the `testing` barrel, so the cheap path is the only path.

**Why the polyfill keeps a local one-line module**: requiring the helper directly from `index.js` lets Rollup treeshake
the call away — it proves the function body pure because it only uses `Object.*` operations, which Rollup treats as
side-effect free. The resulting bundle silently lost the normalization (caught by the bundle test from Decision 2).
Requiring a _local_ CommonJS module keeps the call on an opaque `require()` result that Rollup must retain. The bundle
test now asserts both the call order **and** that the implementation is present.

**Alternative considered**: a `patch-package` patch on `jss` binding `nativeEscape` once. It would cover every package
and both bundles with one line, but it re-introduces a version-pinned dependency — exactly the kind of hold-back this
change set out to remove — so it was rejected in favour of fixing the environment layer, consistent with Decision 1.

## Risks / Trade-offs

- **Bundler reorders the normalization after JSS initializes** → assert the ordering in a unit test that imports the
  built bundle; fall back to a dedicated first-imported module (Decision 2).
- **jsdom 30 has further behavioral changes beyond `CSS.escape`** → run every jsdom-based suite in the repo, not only
  `jsdom-polyfill`, before finalizing; add targeted mocks for genuine gaps (Decision 5).
- **Mutating a host global could mask a real upstream fix** → the rebind is idempotent and conditional; when jsdom stops
  brand-checking namespace operations it degrades to a harmless self-assignment.
- **`@oddbird/popover-polyfill@0.7` may change popover semantics beyond the `CSS` dependency** → it is bundled into the
  published artifact, so verify with a rebuild plus the component suites that use the Popover API.
- **Lockfile churn** → do **not** regenerate `package-lock.json` from scratch on macOS; a clean regeneration drops the
  platform-specific `@next/swc-*` optional dependencies. Install incrementally and confirm all eight entries survive.
- **Removing the hold-back re-exposes both packages to weekly bumps** → mitigated by the retained "bump in lockstep"
  note in `docs/dependencies.md`.

## Migration Plan

1. Land the normalization and its test first, still on `jsdom@29` (proves the no-op path).
2. Move the `jsdom` declaration to the root, then bump `jsdom` and `@oddbird/popover-polyfill` together.
3. Rebuild the polyfill bundle, then run every jsdom-based suite.
4. Only once green, remove the hold-back entries and update the docs.

**Rollback**: revert the two version bumps and restore the hold-back entries; the `CSS` normalization is safe to keep on
`jsdom@29` because it is a no-op there.

## Open Questions

- ~~Should the jsdom brand-check deviation be reported upstream to jsdom (namespace operations should not brand-check
  `this`), so the normalization can eventually be dropped?~~ **Resolved:** reported as
  [jsdom#4228](https://github.com/jsdom/jsdom/issues/4228) — jsdom generates `CSS` with the WebIDL _interface_ template
  (`lib/generated/idl/CSS.js`) although CSSOM defines it as a _namespace_. The issue is linked from the helper's doc
  comment so the workaround can be removed once it is fixed.
- ~~Do `components-vue/vue-wrapper` (no `setupFiles`) and the `styles` suites render JSS under jsdom?~~ **Resolved:**
  they do not — both pass unchanged. The affected suites are `shared`, `components` and
  `components-react/react-ssr-wrapper`; see Decision 6. `storefront` and `skill` are already covered because they import
  the polyfill via `@porsche-design-system/components-react/jsdom-polyfill`.
