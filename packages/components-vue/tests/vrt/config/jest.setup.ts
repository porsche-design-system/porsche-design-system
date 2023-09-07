import { setCustomOptions } from '@porsche-design-system/shared/testing';

setCustomOptions({
  baseUrl: 'http://localhost:5173',
  fixturesDir: '../components-js/tests/vrt/playwright/specs/__screenshots__',
  resultsDir: 'tests/vrt/results',
});
