import { VisualRegressionTester } from '@porsche-design-system/visual-regression-tester';
import type { TestOptions, VisualRegressionTestOptions } from '@porsche-design-system/visual-regression-tester';
import type { Page } from 'puppeteer';

export type {
  VisualRegressionTester,
  VisualRegressionTestOptions,
} from '@porsche-design-system/visual-regression-tester';

export const defaultViewports = [320, 480, 760, 1000, 1300, 1760] as const;
export const extendedViewports = [...defaultViewports, 1920, 2560] as const;
type Viewport = typeof extendedViewports[number];

export const marqueViewports = [1299, 1300] as const;
type MarqueViewport = typeof marqueViewports[number];

const defaultOptions: VisualRegressionTestOptions = {
  viewports: defaultViewports as unknown as number[],
  fixturesDir: 'tests/vrt/fixtures',
  resultsDir: 'tests/vrt/results',
  tolerance: 0.1,
  baseUrl: 'http://localhost:8575',
  timeout: 90000,
};

// is overridden for components-react, components-angular, storefront and utilities
let customOptions: VisualRegressionTestOptions = {};

export const setCustomOptions = (opts: VisualRegressionTestOptions): void => {
  customOptions = opts;
};

export const getVisualRegressionTester = (viewport: Viewport): VisualRegressionTester => {
  return new VisualRegressionTester(browser, {
    ...defaultOptions,
    ...customOptions,
    ...(viewport && { viewports: [viewport] }),
  });
};

export const getVisualRegressionStatesTester = (): VisualRegressionTester => {
  return new VisualRegressionTester(browser, {
    ...defaultOptions,
    ...customOptions,
    viewports: [1000],
  });
};

export const getVisualRegressionOverviewTester = (): VisualRegressionTester => {
  return new VisualRegressionTester(browser, {
    ...defaultOptions,
    ...customOptions,
    viewports: [1920],
  });
};

export const getVisualRegressionMarque2xTester = (viewport: MarqueViewport): VisualRegressionTester => {
  return new VisualRegressionTester(browser, {
    ...defaultOptions,
    ...customOptions,
    viewports: [1299, 1300],
    deviceScaleFactor: 2,
    ...(viewport && { viewports: [viewport] }),
  });
};

export const getVisualRegressionMarque3xTester = (viewport: MarqueViewport): VisualRegressionTester => {
  return new VisualRegressionTester(browser, {
    ...defaultOptions,
    ...customOptions,
    viewports: [1299, 1300],
    deviceScaleFactor: 3,
    ...(viewport && { viewports: [viewport] }),
  });
};

export const getVisualRegressionPropTableTester = (): VisualRegressionTester => {
  return new VisualRegressionTester(browser, {
    ...defaultOptions,
    ...customOptions,
    viewports: [1760],
  });
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
