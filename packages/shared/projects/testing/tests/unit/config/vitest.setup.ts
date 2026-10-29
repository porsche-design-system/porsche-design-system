// jss caches `CSS.escape` unbound at module init, which jsdom >= 30 rejects; `normalizeCssNamespace.spec.ts`
// asserts against the global namespace this setup normalizes.
import { normalizeCssNamespace } from '../../../src/normalizeCssNamespace';

normalizeCssNamespace();
