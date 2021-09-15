import { ResizeObserver } from '@juggle/resize-observer';
global.ResizeObserver = ResizeObserver;
// workaround for WebComponentManager not working in JSDOM
window.SKIP_FETCH = true;

require('./lib/loader.cjs')
  .defineCustomElements()
  .then(() => {
    window.SKIP_FETCH = false;
  });
