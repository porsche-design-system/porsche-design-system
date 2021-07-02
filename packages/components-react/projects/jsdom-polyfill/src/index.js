import { ResizeObserver } from '@juggle/resize-observer';
global.ResizeObserver = ResizeObserver;

// workaround for WebComponentManager not working in JSDOM
require('./lib/loader.cjs').defineCustomElements();
