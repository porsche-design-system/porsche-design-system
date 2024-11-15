// polyfills for features used by our components but unsupported within jest (jsdom)
require('construct-style-sheets-polyfill');
require('intersection-observer');
require('matchmedia-polyfill');
require('matchmedia-polyfill/matchMedia.addListener');
require('scroll-behavior-polyfill');
require('@oddbird/popover-polyfill');
const ro = require('resize-observer-polyfill');

global.ResizeObserver = ro;

if (!navigator.userAgent.includes('Node.js') && !navigator.userAgent.includes('jsdom')) {
  throw new Error(
    '[Porsche Design System] the jsdom-polyfill sub package should only be used in node and jsdom environments'
  );
}

// skip initial stylesheet fetch
window.PDS_SKIP_FETCH = true;

// Since DSR conversion does not work in jsdom render client side markup instead
process.browser = true;

// jsdom polyfill build does not load anything from CDN and also does not use our web components manager
// therefore, we have to setup the document.porscheDesignSystem ourselves here
// 'ROLLUP_REPLACE_VERSION' is replaced during build
document.porscheDesignSystem = {
  cdn: {
    url: 'https://cdn.ui.porsche.com', // needs to be set because we're not initializing via components-js load() method which would normally set this
    prefixes: [],
  },
  // biome-ignore lint/complexity/useLiteralKeys: will be modified by rollup and replace with a version, e.g. "3.21.0" and therefore needs to be quoted
  ['ROLLUP_REPLACE_VERSION']: {
    // biome-ignore lint/suspicious/noEmptyBlockStatements: ok
    readyResolve: () => {},
    isReady: () => Promise.resolve(),
  },
};

// workaround for WebComponentManager not working in jsdom because of missing <script type="module"> support
// see: https://github.com/jsdom/jsdom/issues/2475
require('./lib/loader.cjs').defineCustomElements(); // this is executed synchronous since stencil v4

window.PDS_SKIP_FETCH = false;
