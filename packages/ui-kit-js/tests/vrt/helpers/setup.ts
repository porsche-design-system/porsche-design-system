import 'jasmine';
import {VisualRegressionTester, VisualRegressionTestOptions} from '@porsche-ui/visual-regression-tester';
import * as puppeteer from 'puppeteer';
import {Browser} from 'puppeteer';

let browser: Browser;
let visualRegressionTester: VisualRegressionTester;

const testOptions: VisualRegressionTestOptions = {
  viewports: [320, 480, 760, 1000, 1300, 1760],
  fixturesDir: 'tests/vrt/fixtures',
  resultsDir: 'tests/vrt/results',
  tolerance: 0,
  baseUrl: 'http://localhost:61422',
  timeout: 90000
};

jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000;

afterAll(async () => {
  if (browser) {
    await browser.close();
  }
});

export async function getVisualRegressionTester(): Promise<VisualRegressionTester> {
  if (!visualRegressionTester) {
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });
    visualRegressionTester = new VisualRegressionTester(browser, testOptions);
  }

  return visualRegressionTester;
}
