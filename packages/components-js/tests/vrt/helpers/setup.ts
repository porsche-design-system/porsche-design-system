import 'jasmine';
import { VisualRegressionTester, VisualRegressionTestOptions } from '@porsche-design-system/visual-regression-tester';
import { Browser, launch } from 'puppeteer';

let browser: Browser;
let visualRegressionTester: VisualRegressionTester;
let visualRegressionOverviewTester: VisualRegressionTester;
let visualRegressionGridTester: VisualRegressionTester;
let visualRegressionMarque2xTester: VisualRegressionTester;
let visualRegressionMarque3xTester: VisualRegressionTester;

const vrtTestOptions: VisualRegressionTestOptions = {
  viewports: [320, 480, 760, 1000, 1300, 1760],
  fixturesDir: 'tests/vrt/fixtures',
  resultsDir: 'tests/vrt/results',
  tolerance: 0,
  baseUrl: 'http://localhost:8575',
  timeout: 90000
};

jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000;

beforeAll(async () => {
  browser = await launch({
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
    visualRegressionTester = new VisualRegressionTester(browser, vrtTestOptions);
  }

  return visualRegressionTester;
};

export const getVisualRegressionOverviewTester = (): VisualRegressionTester => {
  if (!visualRegressionOverviewTester) {
    visualRegressionOverviewTester = new VisualRegressionTester(browser, {
      ...vrtTestOptions,
      viewports: [1920]
    });
  }

  return visualRegressionOverviewTester;
};

export const getVisualRegressionContentWrapperTester = (): VisualRegressionTester => {
  if (!visualRegressionGridTester) {
    visualRegressionGridTester = new VisualRegressionTester(browser, {
      ...vrtTestOptions,
      viewports: vrtTestOptions.viewports.concat([1920, 2560])
    });
  }

  return visualRegressionGridTester;
};

export const getVisualRegressionMarque2xTester = (): VisualRegressionTester => {
  if (!visualRegressionMarque2xTester) {
    visualRegressionMarque2xTester = new VisualRegressionTester(browser, {
      ...vrtTestOptions,
      viewports: [1299, 1300],
      deviceScaleFactor: 2
    });
  }

  return visualRegressionMarque2xTester;
};

export const getVisualRegressionMarque3xTester = (): VisualRegressionTester => {
  if (!visualRegressionMarque3xTester) {
    visualRegressionMarque3xTester = new VisualRegressionTester(browser, {
      ...vrtTestOptions,
      viewports: [1299, 1300],
      deviceScaleFactor: 3
    });
  }

  return visualRegressionMarque3xTester;
};

// TODO: export this interface from @porsche-design-system/visual-regression-tester
interface TestOptions {
  elementSelector?: string;
  maskSelectors?: string[];
  regressionSuffix?: string;
}

export const testOptions: TestOptions = { elementSelector: '#app' };
