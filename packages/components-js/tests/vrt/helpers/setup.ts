import 'jasmine';
import {VisualRegressionTester, VisualRegressionTestOptions} from '@porsche-ui/visual-regression-tester';
import * as puppeteer from 'puppeteer';
import {Browser} from 'puppeteer';

let browser: Browser;
let visualRegressionTester: VisualRegressionTester;
let visualRegressionOverviewTester: VisualRegressionTester;
let visualRegressionGridTester: VisualRegressionTester;

const testOptions: VisualRegressionTestOptions = {
  viewports: [320, 480, 760, 1000, 1300, 1760],
  fixturesDir: 'tests/vrt/fixtures',
  resultsDir: 'tests/vrt/results',
  tolerance: 0,
  baseUrl: 'http://localhost:61423',
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

export const getVisualRegressionGridTester = (): VisualRegressionTester => {
  if (!visualRegressionGridTester) {
    visualRegressionGridTester = new VisualRegressionTester(browser, {
      ...testOptions,
      viewports: testOptions.viewports.concat([1920, 2560])
    });
  }

  return visualRegressionGridTester;
}
