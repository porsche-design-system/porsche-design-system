// fetch polyfill for test-execution in node environment and not browser
import 'whatwg-fetch';
import 'construct-style-sheets-polyfill';
import { ResizeObserver } from '@juggle/resize-observer';
import '../mocks/match-media.mock';

global.ResizeObserver = ResizeObserver;
