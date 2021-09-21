global.ResizeObserver = require('@juggle/resize-observer').ResizeObserver;

// skip initial tracking pixel / stylesheet fetch
window.PDS_SKIP_FETCH = true;

// workaround for WebComponentManager not working in JSDOM
require('./lib/loader.cjs')
  .defineCustomElements()
  .then(() => {
    window.PDS_SKIP_FETCH = false;
  });
