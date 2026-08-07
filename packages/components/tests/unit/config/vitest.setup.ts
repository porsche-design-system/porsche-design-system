import 'construct-style-sheets-polyfill';
import '../mocks/match-media.mock';

// jsdom's CSS.escape is a spec-compliant method that requires `this` to be the CSS
// interface object. Libraries like `jss` capture it as an unbound function reference
// (`CSS.escape` without a receiver), which throws `TypeError: 'escape' called on an
// object that is not a valid instance of CSS.` Rebinding it here makes the captured
// reference work standalone, matching the pre-jsdom-30 behavior other libs rely on.
if (typeof CSS !== 'undefined' && typeof CSS.escape === 'function') {
  CSS.escape = CSS.escape.bind(CSS);
}

(document as any).porscheDesignSystem = {
  cdn: 'https://cdn.ui.porsche.com',
};
