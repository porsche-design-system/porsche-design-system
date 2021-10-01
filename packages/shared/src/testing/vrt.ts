import { VisualRegressionTester } from '@porsche-design-system/visual-regression-tester';
import type { TestOptions, VisualRegressionTestOptions } from '@porsche-design-system/visual-regression-tester';
import type { Page } from 'puppeteer';

export type {
  VisualRegressionTester,
  VisualRegressionTestOptions,
} from '@porsche-design-system/visual-regression-tester';

const defaultOptions: VisualRegressionTestOptions = {
  viewports: [320, 480, 760, 1000, 1300, 1760],
  fixturesDir: 'tests/vrt/fixtures',
  resultsDir: 'tests/vrt/results',
  tolerance: 0.1,
  baseUrl: 'http://localhost:8575',
  timeout: 90000,
};

let customOptions: VisualRegressionTestOptions = {};

export const setCustomOptions = (opts: VisualRegressionTestOptions): void => {
  customOptions = opts;
};

let visualRegressionTester: VisualRegressionTester;
let visualRegressionOverviewTester: VisualRegressionTester;
let visualRegressionContentWrapperTester: VisualRegressionTester;
let visualRegressionMarque2xTester: VisualRegressionTester;
let visualRegressionMarque3xTester: VisualRegressionTester;
let visualRegressionStatesTester: VisualRegressionTester;
let visualRegressionTesterPropTable: VisualRegressionTester;

export const getVisualRegressionTester = (): VisualRegressionTester => {
  if (!visualRegressionTester) {
    visualRegressionTester = new VisualRegressionTester(browser, {
      ...defaultOptions,
      ...customOptions,
    });
  }

  return visualRegressionTester;
};

export const getVisualRegressionStatesTester = (): VisualRegressionTester => {
  if (!visualRegressionStatesTester) {
    visualRegressionStatesTester = new VisualRegressionTester(browser, {
      ...defaultOptions,
      ...customOptions,
      viewports: [1000],
    });
  }

  return visualRegressionStatesTester;
};

export const getVisualRegressionOverviewTester = (): VisualRegressionTester => {
  if (!visualRegressionOverviewTester) {
    visualRegressionOverviewTester = new VisualRegressionTester(browser, {
      ...defaultOptions,
      ...customOptions,
      viewports: [1920],
    });
  }

  return visualRegressionOverviewTester;
};

export const getVisualRegressionContentWrapperTester = (): VisualRegressionTester => {
  if (!visualRegressionContentWrapperTester) {
    visualRegressionContentWrapperTester = new VisualRegressionTester(browser, {
      ...defaultOptions,
      ...customOptions,
      viewports: defaultOptions.viewports.concat([1920, 2560]),
    });
  }

  return visualRegressionContentWrapperTester;
};

export const getVisualRegressionMarque2xTester = (): VisualRegressionTester => {
  if (!visualRegressionMarque2xTester) {
    visualRegressionMarque2xTester = new VisualRegressionTester(browser, {
      ...defaultOptions,
      ...customOptions,
      viewports: [1299, 1300],
      deviceScaleFactor: 2,
    });
  }

  return visualRegressionMarque2xTester;
};

export const getVisualRegressionMarque3xTester = (): VisualRegressionTester => {
  if (!visualRegressionMarque3xTester) {
    visualRegressionMarque3xTester = new VisualRegressionTester(browser, {
      ...defaultOptions,
      ...customOptions,
      viewports: [1299, 1300],
      deviceScaleFactor: 3,
    });
  }

  return visualRegressionMarque3xTester;
};

export const getVisualRegressionTesterPropTable = (): VisualRegressionTester => {
  if (!visualRegressionTesterPropTable) {
    visualRegressionTesterPropTable = new VisualRegressionTester(browser, {
      ...defaultOptions,
      ...customOptions,
      viewports: [1760],
    });
  }

  return visualRegressionTesterPropTable;
};

type VRTestOptions = TestOptions & {
  scenario?: (page: Page) => Promise<void>;
};

export const vrtTest = (vrt: VisualRegressionTester, snapshotId: string, url: string, options?: VRTestOptions) => {
  const { scenario, ...otherOptions } = options || {};
  return vrt.test(
    snapshotId,
    async () => {
      await vrt.goTo(url);
      const page = vrt.getPage();

      // componentsReady is undefined in utilities package
      await page.evaluate(() => (window as any).componentsReady?.());

      if (scenario) {
        await scenario(page);
      }
    },
    { elementSelector: '#app', ...otherOptions }
  );
};
