// jss caches `CSS.escape` unbound at module init, which jsdom >= 30 rejects with
// `TypeError: 'escape' called on an object that is not a valid instance of CSS.`
// This package is built before `@porsche-design-system/components-js`, so it cannot use its
// `jsdom-polyfill` sub-package and normalizes the namespace itself.
import { normalizeCssNamespace } from '../../../src/testing/normalizeCssNamespace';

normalizeCssNamespace();
