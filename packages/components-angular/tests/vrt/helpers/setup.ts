import 'jasmine';
import { VisualRegressionTester, VisualRegressionTestOptions } from '@porsche-design-system/visual-regression-tester';
import * as puppeteer from 'puppeteer';
import { Browser } from 'puppeteer';

let browser: Browser;
let visualRegressionTester: VisualRegressionTester;

const testOptions: VisualRegressionTestOptions = {
  viewports: [1920],
  fixturesDir: '../components-js/tests/vrt/fixtures',
  resultsDir: 'tests/vrt/results',
  tolerance: 0,
  baseUrl: 'http://localhost:4200',
  timeout: 90000
};

jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000;

beforeAll(async () => {
  browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--single-process']
  });
});

afterAll(async () => {
  if (browser) {
    await browser.close();
  }
});

export const getVisualRegressionTester = (): VisualRegressionTester => {
  if (!visualRegressionTester) {
    visualRegressionTester = new VisualRegressionTester(browser, testOptions);
  }

  return visualRegressionTester;
};
