import { VisualRegressionTester, VisualRegressionTestOptions } from '@porsche-design-system/visual-regression-tester';
import { Browser, launch } from 'puppeteer';
import { SpecReporter } from 'jasmine-spec-reporter';

let browser: Browser;
let visualRegressionTester: VisualRegressionTester;
let visualRegressionFocusTester: VisualRegressionTester;

const testOptions: VisualRegressionTestOptions = {
  viewports: [320, 480, 760, 1000, 1300, 1760, 1920],
  fixturesDir: 'tests/vrt/fixtures',
  resultsDir: 'tests/vrt/results',
  tolerance: 0,
  baseUrl: 'http://localhost:3000',
  timeout: 90000,
  mode: 'square-auto',
};

jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000;

jasmine.getEnv().clearReporters();
//@ts-ignore till https://github.com/bcaudan/jasmine-spec-reporter/issues/588 is fixed
jasmine.getEnv().addReporter(new SpecReporter());

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

export const getVisualRegressionFocusTester = (): VisualRegressionTester => {
  if (!visualRegressionFocusTester) {
    visualRegressionFocusTester = new VisualRegressionTester(browser, { ...testOptions, viewports: [1000] });
  }

  return visualRegressionFocusTester;
};
