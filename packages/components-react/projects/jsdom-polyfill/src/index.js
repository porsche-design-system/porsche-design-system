import { ResizeObserver } from '@juggle/resize-observer';

// workaround for WebComponentManager not working in JSDOM
require('./lib/loader.cjs').defineCustomElements();

global.ResizeObserver = ResizeObserver;
