require('dotenv').config();
import { CrossBrowserTester, CrossBrowserTestOptions } from '@porsche-ui/cross-browser-tester';

let crossBrowserTester: CrossBrowserTester;

const options: CrossBrowserTestOptions = {
  username: process.env.BROWSERSTACK_USER_NAME,
  accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
  browserList: [{ os: 'Windows', os_version: '10', browser: 'edge', browser_version: '18.0' }],
  local: true,
  orientation: 'portrait',
  winRes: '1024x768',
  quality: 'original',
  fixturesDir: '../components-js/tests/cbt/fixtures',
  resultsDir: 'tests/cbt/results',
  tolerance: 0,
  baseUrl: 'http://localhost:3000',
  timeout: 20
};

jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000;

export const getCrossBrowserTester = (): CrossBrowserTester => {
  if (!crossBrowserTester) {
    crossBrowserTester = new CrossBrowserTester(options);
  }

  return crossBrowserTester;
};
