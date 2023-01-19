// polyfills for features used by our components but unsupported within Jest (jsdom)
require('construct-style-sheets-polyfill');
require('intersection-observer');
require('matchmedia-polyfill');
require('matchmedia-polyfill/matchMedia.addListener');
require('scroll-behavior-polyfill');
require('whatwg-fetch');
global.ResizeObserver = require('@juggle/resize-observer').ResizeObserver;

if (!navigator.userAgent.includes('Node.js') && !navigator.userAgent.includes('jsdom')) {
  throw new Error('This package should only be used in node and jsdom environments');
}

// skip initial stylesheet fetch
window.PDS_SKIP_FETCH = true;

// workaround for WebComponentManager not working in JSDOM
require('./lib/loader.cjs')
  .defineCustomElements()
  .then(() => {
    window.PDS_SKIP_FETCH = false;

    // jsdom polyfill build does not load anything from CDN and also does not use our web components manager
    // therefore, we have to setup the document.porscheDesignSystem ourselves here
    // 'ROLLUP_REPLACE_VERSION' is replaced during build
    document.porscheDesignSystem = {
      ['ROLLUP_REPLACE_VERSION']: {
        readyResolve: () => {},
        isReady: () => Promise.resolve(),
      },
    };
  });
