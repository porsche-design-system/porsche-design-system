import { VisualRegressionTester } from '@porsche-design-system/visual-regression-tester';
import type { TestOptions, VisualRegressionTestOptions } from '@porsche-design-system/visual-regression-tester';
import type { Page } from 'puppeteer';

export type {
  VisualRegressionTester,
  VisualRegressionTestOptions,
} from '@porsche-design-system/visual-regression-tester';

export const defaultViewports = [320, 480, 760, 1000, 1300, 1760] as const;
export const extendedViewports = [...defaultViewports, 1920, 2560] as const;
export const furtherExtendedViewports = [...extendedViewports, 3000] as const;
type Viewport = typeof furtherExtendedViewports[number];

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
  scalePageFontSize?: boolean;
  javaScriptEnabled?: boolean;
  forcedColorsEnabled?: boolean;
  prefersColorScheme?: 'light' | 'dark';
};

export const vrtTest = (
  vrt: VisualRegressionTester,
  snapshotId: string,
  url: string,
  options?: VRTestOptions
): Promise<boolean> => {
  const { scenario, scalePageFontSize, javaScriptEnabled, forcedColorsEnabled, prefersColorScheme, ...otherOptions } = {
    scenario: undefined,
    scalePageFontSize: false,
    javaScriptEnabled: true,
    forcedColorsEnabled: false,
    ...options,
  };
  const { baseUrl } = customOptions || defaultOptions;

  return vrt.test(
    snapshotId,
    async () => {
      const page = vrt.getPage();
      await page.setJavaScriptEnabled(javaScriptEnabled);

      const cdpSession = await page.target().createCDPSession();

      if (scalePageFontSize) {
        await cdpSession.send('Page.enable');
        await cdpSession.send('Page.setFontSizes', {
          fontSizes: {
            standard: 32,
            fixed: 48,
          },
        });
      }

      // NOTE: 'forced-colors' isn't supported by page.emulateMediaFeatures, yet https://pptr.dev/api/puppeteer.page.emulatemediafeatures
      // also it looks like cdpSession.send() can't be combined with page.emulateMediaFeatures since it affects each other
      // reset or fallback is needed since it is shared across pages, parallel tests are affected by this
      await cdpSession.send('Emulation.setEmulatedMedia', {
        features: [
          { name: 'forced-colors', value: forcedColorsEnabled ? 'active' : 'none' },
          { name: 'prefers-color-scheme', value: prefersColorScheme || 'light' },
        ],
      });

      await page.goto(baseUrl + url, { waitUntil: 'networkidle0' });

      // componentsReady is undefined in utilities package
      await page.evaluate(() => (window as any).componentsReady?.());

      if (scenario) {
        await scenario(page);
      }
    },
    { elementSelector: '#app', ...otherOptions }
  );
};
