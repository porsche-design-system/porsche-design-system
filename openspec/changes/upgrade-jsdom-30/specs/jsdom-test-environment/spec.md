## ADDED Requirements

### Requirement: Supported jsdom version range

The `@porsche-design-system/jsdom-polyfill` sub-package SHALL support jsdom `v30` and SHALL declare `jsdom` in the
repository-root `package.json` so that a single hoisted copy backs every Vitest `jsdom` environment in the monorepo.

#### Scenario: jsdom resolves from the repository root

- **WHEN** `npm install` has completed at the repository root
- **THEN** `jsdom` is installed at `node_modules/jsdom` (not nested under a workspace)
- **AND** `require.resolve('jsdom')` succeeds from the root-level `vitest` installation

#### Scenario: Vitest jsdom suites start

- **WHEN** any workspace runs a Vitest config with `environment: 'jsdom'`
- **THEN** the environment is created without a `Cannot find package 'jsdom'` error

#### Scenario: Guard against non-jsdom environments

- **WHEN** the polyfill is imported in an environment whose `navigator.userAgent` contains neither `Node.js` nor `jsdom`
- **THEN** it throws an error stating the sub-package may only be used in node and jsdom environments

### Requirement: CSS namespace normalization

The polyfill SHALL normalize the host `CSS` namespace so its operations are callable detached, matching browser behavior
where `CSS` is a WebIDL **namespace** and its operations are not brand-checked against a `this` receiver.

#### Scenario: Detached CSS.escape is callable

- **WHEN** consumer code caches the operation unbound, e.g. `const escape = CSS.escape`, and later calls `escape('a.b')`
- **THEN** the call returns the escaped string
- **AND** it does not throw `TypeError: 'escape' called on an object that is not a valid instance of CSS.`

#### Scenario: JSS renders styles

- **WHEN** a Porsche Design System component is rendered in jsdom and its JSS stylesheet is created
- **THEN** the stylesheet is created without error
- **AND** the component's shadow DOM is queryable through the shadowed testing helpers

#### Scenario: Normalization precedes dependent polyfills

- **WHEN** the polyfill entry module is evaluated
- **THEN** the `CSS` namespace is normalized before `@oddbird/popover-polyfill` is applied and before the Stencil loader
  defines the custom elements

#### Scenario: No-op outside jsdom

- **WHEN** the host environment exposes no `CSS` namespace, or exposes one whose operations already work detached
- **THEN** the normalization performs no observable change and does not throw

### Requirement: CSS normalization for packages upstream of the polyfill

Packages that render JSS in a jsdom environment but are built **before** `@porsche-design-system/components-js` — and
therefore cannot import its `jsdom-polyfill` sub-package — SHALL normalize the `CSS` namespace themselves via the
equivalent helper exported from `@porsche-design-system/shared/testing`.

#### Scenario: Upstream suites render JSS

- **WHEN** the `shared`, `components` or `components-react/react-ssr-wrapper` unit suites create JSS stylesheets under
  jsdom
- **THEN** no `TypeError: 'escape' called on an object that is not a valid instance of CSS.` is raised
- **AND** their snapshots are written and matched rather than reported obsolete

#### Scenario: Build order is preserved

- **WHEN** an upstream package normalizes the `CSS` namespace
- **THEN** it does so without depending on `@porsche-design-system/components-js`

### Requirement: Popover polyfill support

The polyfill SHALL bundle `@oddbird/popover-polyfill` `v0.7` and SHALL provide the host globals that version requires,
so popover-based components are testable in jsdom.

#### Scenario: Popover polyfill applies cleanly

- **WHEN** `@porsche-design-system/components-js/jsdom-polyfill` is imported in a jsdom environment
- **THEN** the popover polyfill applies its styles without throwing
- **AND** no `TypeError: Cannot read properties of undefined (reading 'escape')` is raised

#### Scenario: Popover-based components render

- **WHEN** a component relying on the Popover API is rendered in jsdom
- **THEN** it renders and its unit tests pass

### Requirement: Form control and scrolling API coverage

The polyfill, together with the documented Vitest setup, SHALL provide the form-validation, scrolling and
indeterminate-state APIs that Porsche Design System components rely on and that jsdom does not implement.

#### Scenario: Form validation state is available

- **WHEN** a form-associated component reads `validity` on its internal control
- **THEN** the property is defined and the component's unit tests pass

#### Scenario: Scrolling APIs are available

- **WHEN** a component calls `scrollTo` on a scrollable element
- **THEN** the call succeeds and the component's unit tests pass

#### Scenario: Indeterminate state is settable

- **WHEN** a checkbox-like component sets `indeterminate` on its internal input
- **THEN** the assignment succeeds and the component's unit tests pass

### Requirement: Dependency policy for jsdom and the popover polyfill

`jsdom` and `@oddbird/popover-polyfill` SHALL no longer be held back from automated dependency updates, and SHALL be
upgraded together because the popover polyfill depends on the `CSS` namespace that jsdom provides.

#### Scenario: Held-back lists no longer contain them

- **WHEN** `.syncpackrc.json` and `.github/dependabot.yml` are inspected
- **THEN** neither lists `jsdom` nor `@oddbird/popover-polyfill` as held back
- **AND** `docs/dependencies.md` documents the resolved coupling instead of the hold-back rationale

#### Scenario: Outdated check offers the packages again

- **WHEN** `npm run npm:outdated` runs
- **THEN** `jsdom` and `@oddbird/popover-polyfill` are eligible for updates
- **AND** `docs/dependencies.md` instructs that they be bumped in lockstep
