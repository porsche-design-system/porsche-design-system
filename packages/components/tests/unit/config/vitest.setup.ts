import { normalizeCssNamespace } from '@porsche-design-system/shared/testing';
import 'construct-style-sheets-polyfill';
import '../mocks/match-media.mock';

// jss caches `CSS.escape` unbound at module init, which jsdom >= 30 rejects. Must run before any
// stylesheet is created, i.e. before the specs import the `*-styles.ts` modules.
normalizeCssNamespace();

(document as any).porscheDesignSystem = {
  cdn: 'https://cdn.ui.porsche.com',
};
