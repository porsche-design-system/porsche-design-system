// `normalizeCssNamespace` is deliberately not re-exported here: it is consumed by Vitest setups and by the
// published jsdom-polyfill bundle, which must not pull in the Playwright configs and the W3C validator below.
// Import it via `@porsche-design-system/shared/testing/normalize-css-namespace` instead.
export * from './playwright.a11y';
export * from './playwright.e2e';
export * from './playwright.vrt';
export * from './validateCssWithW3C';
