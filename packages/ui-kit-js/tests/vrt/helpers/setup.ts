require('dotenv').config();
import 'jasmine';
import {VisualRegressionTester, VisualRegressionTestOptions} from '@porsche-ui/visual-regression-tester';
import { VisualRegressionTesterBs, VisualRegressionTestBsOptions } from '@porsche-ui/visual-regression-tester-bs';
import * as puppeteer from 'puppeteer';
import {Browser} from 'puppeteer';

let browser: Browser;
let visualRegressionTester: VisualRegressionTester;
let visualRegressionOverviewTester: VisualRegressionTester;
let visualRegressionTesterBs: VisualRegressionTesterBs;

const testOptions: VisualRegressionTestOptions = {
  viewports: [320, 480, 760, 1000, 1300, 1760],
  fixturesDir: 'tests/vrt/fixtures',
  resultsDir: 'tests/vrt/results',
  tolerance: 0,
  baseUrl: 'http://localhost:61422',
  timeout: 90000
};

const optionsBs: VisualRegressionTestBsOptions = {
  username: process.env.BROWSERSTACK_USER_NAME,
  accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
  browserList: [
    {'os': 'Windows', 'os_version': '10', 'browser_version': '11.0', 'browser': 'ie'}
  ],
  local: true,
  orientation: 'portrait',
  winRes: '1024x768',
  quality: 'original',
  fixturesDir: 'tests/vrt/fixtures',
  resultsDir: 'tests/vrt/results',
  tolerance: 0,
  baseUrl: 'http://localhost:61422/',
  timeout: 10
};

jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000;

beforeAll(async () => {
  browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });
});

afterAll(async () => {
  if (browser) {
    await browser.close();
  }
});

export async function getVisualRegressionTester(): Promise<VisualRegressionTester> {
  if (!visualRegressionTester) {
    visualRegressionTester = new VisualRegressionTester(browser, testOptions);
  }

  return visualRegressionTester;
}

export async function getVisualRegressionOverviewTester(): Promise<VisualRegressionTester> {
  if (!visualRegressionOverviewTester) {
    visualRegressionOverviewTester = new VisualRegressionTester(browser, {
      ...testOptions,
      viewports: [1920]
    });
  }

  return visualRegressionOverviewTester;
}

export async function getVisualRegressionTesterBs(): Promise<VisualRegressionTesterBs> {
  if (!visualRegressionTesterBs) {
    visualRegressionTesterBs = new VisualRegressionTesterBs(optionsBs);
  }

  return visualRegressionTesterBs;
}
