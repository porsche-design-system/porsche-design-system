import { setCustomOptions } from '@porsche-design-system/shared/testing';

setCustomOptions({
  baseUrl: 'http://localhost:3000',
  fixturesDir: '../components-js/tests/vrt/puppeteer/fixtures',
  resultsDir: 'tests/vrt/results',
});
