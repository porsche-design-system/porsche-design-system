import { setCustomOptions } from '@porsche-design-system/shared/testing';

setCustomOptions({
  baseUrl: 'http://localhost:5173',
  fixturesDir: '../components-js/tests/vrt/puppeteer/fixtures',
  resultsDir: 'tests/vrt/results',
});
