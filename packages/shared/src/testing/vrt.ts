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
  fixturesDir: 'tests/vrt/puppeteer/fixtures',
  resultsDir: 'tests/vrt/puppeteer/results',
  tolerance: 0,
  baseUrl: 'http://localhost:8575',
  timeout: 90000,
};

// is overridden for components-react, components-angular, storefront and utilities
let customOptions: VisualRegressionTestOptions;

export const setCustomOptions = (opts: VisualRegressionTestOptions): void => {
  customOptions = opts;
};

export const getVisualRegressionTester = (viewport: Viewport): VisualRegressionTester => {
  return new VisualRegressionTester(browser, {
    ...defaultOptions,
    ...customOptions,
    viewports: [viewport],
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
  javaScriptEnabled?: boolean;
  disableMotion?: boolean;
};

export const vrtTest = (
  vrt: VisualRegressionTester,
  snapshotId: string,
  url: string,
  options?: VRTestOptions
): Promise<boolean> => {
  const { scenario, javaScriptEnabled, disableMotion, ...otherOptions } = {
    scenario: undefined,
    javaScriptEnabled: true,
    disableMotion: true,
    ...options,
  };
  const { baseUrl } = customOptions || defaultOptions;

  return vrt.test(
    snapshotId,
    async () => {
      const page = vrt.getPage();
      await page.setJavaScriptEnabled(javaScriptEnabled);
      await page.goto(baseUrl + url, { waitUntil: 'networkidle0' });

      if (disableMotion) {
        await page.evaluate(() => {
          const style = document.createElement('style');
          style.innerHTML = `
            :root {
              --p-transition-duration: 0s;
              --p-animation-duration__spinner: 0s;
              --p-animation-duration__banner: 0s;
              --p-override-popover-animation-duration: 0s;
              --p-override-toast-skip-timeout: true;
              --p-override-toast-animation-duration: 0s;
            }
          `;
          document.head.appendChild(style);
        });
      }

      // componentsReady is undefined in utilities package
      await page.evaluate(() => (window as any).componentsReady?.());

      if (scenario) {
        await scenario(page);
      }
    },
    { elementSelector: '#app', ...otherOptions }
  );
};
