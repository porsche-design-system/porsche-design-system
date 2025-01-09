# Contribution

If you want to contribute solutions or fixes, you can create pull requests in the
[Porsche Design System repository](https://github.com/porsche-design-system/porsche-design-system).

Besides our [Definition of Done](must-know/definition-of-done), there are several things to keep in mind.

To keep the quality high we rely on extensive testing and test automation.  
Our CI pipeline will report back most issues for already existing features and it is possible to work by trial and
error. Since this isn't ideal you can use the following high-level checklist to get a better understanding of how, where
and in which context a single component is tested.

## Checklist to keep in mind per package when modifying components

### `components`

- unit tests for component itself, e.g. `button.spec.ts`
- unit tests for component styles, e.g. `button-styles.spec.ts`
- unit tests for component utils, e.g. `button-utils.spec.ts`
- generic unit tests for all components, e.g. `lifecycleValidtion.spec.ts` or `a11y.spec.ts`

### `components-js`

- e2e tests for component, e.g. `e2e/specs/button.e2e.ts`
- generic e2e tests for all components, e.g. `e2e/specs/default-dom.e2e.ts` and
  `e2e/specs/lifecycle-after-disconnect.e2e.ts`
- vrt tests of `button.html` page for component, e.g. `vrt/specs/button.vrt.ts`
- vrt tests of `button.html` with playwright for component, e.g. `vrt/specs/button.vrt.ts`
- vrt tests of hover and focus states for component, e.g. `vrt/specs/button.vrt.ts`
- vrt tests of `overview.html` for all components including prefixing, e.g. `vrt/specs/overview.vrt.ts`
- generic vrt tests for all components, e.g. `vrt/specs/component-high-contrast-mode.vrt.ts` and
  `vrt/specs/component-scaling.vrt.ts`

### `components-angular`

- vrt pages are generated via `generateVRTPages.ts` but tests are maintained manually and have to match shared fixtures
  of components-js, e.g. `vrt/specs/button.vrt.ts`

### `components-react`

- vrt pages are generated via `generateVRTPages.ts` but tests are maintained manually and have to match shared fixtures
  of components-js, e.g. `vrt/specs/button.vrt.ts`

### `components-vue`

- vrt pages and tests are maintained manually and `OverviewPage.vue` need to be kept in sync, e.g.
  `vrt/specs/overview.vrt.ts`

### `components-react/projects/react-ssr-wrapper`

- unit tests for component edge cases, e.g. `react-ssr-wrapper.spec.tsx`
- generic unit tests for all components, e.g. `react-ssr-wrapper.spec.tsx`

### `components-react/projects/next-js`

- vrt pages are generated automatically via `generateVRTPages.ts` but fixtures are separate because we are
  screenshotting the server side rendered pages with disabled javascript, e.g. `vrt/specs/button.vrt.ts`

### `components-react/projects/remix`

- vrt pages are generated automatically via `generateVRTPages.ts` but only `overview.tsx` and fixtures are shared with
  projects/next-js and have to match, e.g. `vrt/specs/overview.vrt.ts`
