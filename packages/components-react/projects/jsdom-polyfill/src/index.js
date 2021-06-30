import ResizeObserver from 'resize-observer-polyfill';
// workaround for WebComponentManager not working in JSDOM
require('./lib/loader.cjs').defineCustomElements();
global.ResizeObserver = ResizeObserver;
