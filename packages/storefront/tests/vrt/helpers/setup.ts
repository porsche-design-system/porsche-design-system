import { VisualRegressionTester, VisualRegressionTestOptions } from '@porsche-design-system/visual-regression-tester';
import { Browser, launch } from 'puppeteer';
import { SpecReporter } from 'jasmine-spec-reporter';
import CustomReporter = jasmine.CustomReporter;

let browser: Browser;
let visualRegressionTester: VisualRegressionTester;

const testOptions: VisualRegressionTestOptions = {
  viewports: [320, 480, 760, 1000, 1300, 1760],
  fixturesDir: 'tests/vrt/fixtures',
  resultsDir: 'tests/vrt/results',
  tolerance: 0,
  baseUrl: 'http://localhost:8080',
  timeout: 90000,
  mode: 'square-auto',
};

jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000;

jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter((new SpecReporter() as unknown) as CustomReporter);

beforeAll(async () => {
  browser = await launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--single-process'],
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
