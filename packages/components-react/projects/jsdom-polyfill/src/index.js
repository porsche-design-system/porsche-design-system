import { ResizeObserver } from '@juggle/resize-observer';
global.ResizeObserver = ResizeObserver;
// workaround for WebComponentManager not working in JSDOM
window.PDS_SKIP_FETCH = true;

require('./lib/loader.cjs')
  .defineCustomElements()
  .then(() => {
    window.PDS_SKIP_FETCH = false;
  });
