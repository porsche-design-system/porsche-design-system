// `normalizeCssNamespace` is deliberately not re-exported here: it is consumed by Vitest setups and by the
// published jsdom-polyfill bundle, which must not pull in the Playwright configs and the W3C validator below.
// Import it via `@porsche-design-system/testing/normalize-css-namespace` instead.
// Named re-exports, not `export *`: Node runs this source as CommonJS, and an ESM importer (examples, react-router)
// only sees the names Node detects statically, which excludes `export *`.
export { playwrightConfigA11y } from './playwright.a11y';
export { playwrightConfigE2E } from './playwright.e2e';
export {
  playwrightConfigVRT,
  schemes,
  themes,
  viewportWidth3XL,
  viewportWidth4XL,
  viewportWidthL,
  viewportWidthM,
  viewportWidthS,
  viewportWidths,
  viewportWidthXL,
  viewportWidthXS,
  viewportWidthXXL,
  viewportWidthXXS,
} from './playwright.vrt';
export type { W3CValidationMessage, W3CValidationOptions, W3CValidationResult } from './validateCssWithW3C';
export { formatW3CMessages, validateCssWithW3C } from './validateCssWithW3C';
