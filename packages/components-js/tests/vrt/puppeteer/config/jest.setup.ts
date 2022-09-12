import { setCustomOptions } from '@porsche-design-system/shared/testing';

setCustomOptions({
  baseUrl: 'http://localhost:8575',
  fixturesDir: 'tests/vrt/puppeteer/fixtures',
  resultsDir: 'tests/vrt/puppeteer/results',
});
