// fetch polyfill for test-execution in node environment and not browser
import 'whatwg-fetch';
import 'construct-style-sheets-polyfill';
import '../mocks/match-media.mock';

declare global {
  interface Window {
    PORSCHE_DESIGN_SYSTEM_CDN_URL: string;
  }
}

window.PORSCHE_DESIGN_SYSTEM_CDN_URL = 'https://cdn.ui.porsche.com';
