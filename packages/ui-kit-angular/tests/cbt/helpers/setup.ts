require('dotenv').config();
import 'jasmine';
import { CrossBrowserTester, CrossBrowserTestOptions } from '@porsche-ui/cross-browser-tester';

let crossBrowserTester: CrossBrowserTester;

const options: CrossBrowserTestOptions = {
  username: process.env.BROWSERSTACK_USER_NAME,
  accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
  browserList: [
    {'os': 'Windows', 'os_version': '10', 'browser_version': '11.0', 'browser': 'ie'}
  ],
  local: true,
  orientation: 'portrait',
  winRes: '1024x768',
  quality: 'original',
  fixturesDir: '../ui-kit-js/tests/cbt/fixtures',
  resultsDir: 'tests/cbt/results',
  tolerance: 0,
  baseUrl: 'http://localhost:4200',
  timeout: 10
};

jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000;

export async function getCrossBrowserTester(): Promise<CrossBrowserTester> {
  if (!crossBrowserTester) {
    crossBrowserTester = new CrossBrowserTester(options);
  }

  return crossBrowserTester;
}
