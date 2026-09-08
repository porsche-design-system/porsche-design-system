/**
 * Thin adapter around the single implementation in `@porsche-design-system/shared/testing/normalize-css-namespace`.
 *
 * This indirection is load-bearing for the Rollup build: importing the helper directly in `index.js` lets Rollup
 * treeshake the call away, because it proves the function body pure (it only uses `Object.*` operations, which
 * Rollup treats as side-effect free). Requiring a *local* CommonJS module instead keeps the call on an opaque
 * `require()` result that Rollup has to retain.
 *
 * `tests/unit/specs/jsdom-build.spec.ts` asserts that the normalization really survives in the built bundle.
 */
module.exports = require('@porsche-design-system/shared/testing/normalize-css-namespace');
