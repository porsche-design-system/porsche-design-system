import type { Page, ElementHandle } from '@playwright/test';
import { expect, test } from '@playwright/test';

export const baseThemes = ['light', 'dark'] as const;
export const baseSchemes = ['light', 'dark'] as const;
export const baseViewportWidth = 1000;
export const baseViewportWidths = [320, 480, 760, 1300, 1760] as const;

type Options = {
  javaScriptDisabled?: boolean;
  forcedColorsEnabled?: boolean;
  prefersColorScheme?: 'light' | 'dark';
  scalePageFontSize?: boolean;
  forceComponentTheme?: 'light' | 'dark' | 'auto';
};

export const setupScenario = async (
  page: Page,
  url: string,
  viewportWidth: number,
  options?: Options
): Promise<void> => {
  const {
    javaScriptDisabled,
    forcedColorsEnabled,
    prefersColorScheme,
    scalePageFontSize,
    forceComponentTheme,
  }: Options = {
    javaScriptDisabled: false,
    forcedColorsEnabled: false,
    prefersColorScheme: undefined,
    scalePageFontSize: false,
    forceComponentTheme: undefined,
    ...options,
  };

  if (javaScriptDisabled || forcedColorsEnabled || prefersColorScheme) {
    const cdpSession = await page.context().newCDPSession(page);

    if (javaScriptDisabled) {
      await cdpSession.send('Emulation.setScriptExecutionDisabled', {
        value: javaScriptDisabled,
      });
    }

    // NOTE: 'forced-colors' isn't supported by page.emulateMediaFeatures, yet https://pptr.dev/api/puppeteer.page.emulatemediafeatures
    // also it looks like cdpSession.send() can't be combined with page.emulateMediaFeatures since it affects each other
    // reset or fallback is needed since it is shared across pages, parallel tests are affected by this
    if (forcedColorsEnabled || prefersColorScheme) {
      await cdpSession.send('Emulation.setEmulatedMedia', {
        features: [
          { name: 'forced-colors', value: forcedColorsEnabled ? 'active' : 'none' },
          { name: 'prefers-color-scheme', value: prefersColorScheme || 'light' },
        ],
      });
    }
  }

  await page.setViewportSize({ width: viewportWidth, height: 600 });
  await page.goto(url);
  await page.evaluate(() => (window as unknown as Window & { componentsReady: Function }).componentsReady());

  if (forceComponentTheme) {
    await page.evaluate((theme) => {
      document.querySelectorAll('*').forEach((el) => el.setAttribute('theme', theme));
      document.querySelectorAll('.playground').forEach((el) => {
        el.classList.remove('light', 'dark', 'auto');
        el.classList.add(theme);
      });
      return (window as unknown as Window & { componentsReady: Function }).componentsReady();
    }, forceComponentTheme);
  }

  if (scalePageFontSize) {
    await page.evaluate(() => {
      document.querySelector('html').style.fontSize = '200%';
    });
  }
};

export const executeBasicVisualComparisonTest = (component: string): void => {
  test.beforeEach(async ({}, testInfo) => {
    testInfo.snapshotSuffix = '';
  });

  // executed in Chrome + Safari
  test.describe(component, async () => {
    baseThemes.forEach((theme) => {
      test(`should have no visual regression for viewport ${baseViewportWidth} and theme ${theme}`, async ({
        page,
      }) => {
        await setupScenario(page, `/${component}`, baseViewportWidth, {
          forceComponentTheme: theme,
        });
        await expect(page.locator('#app')).toHaveScreenshot(`${component}-${baseViewportWidth}-theme-${theme}.png`);
      });
    });
  });

  // executed in Chrome only
  test.describe(component, async () => {
    test.skip(({ browserName }) => browserName !== 'chromium');

    baseViewportWidths.forEach((viewportWidth) => {
      test(`should have no visual regression for viewport ${viewportWidth}`, async ({ page }) => {
        await setupScenario(page, `/${component}`, viewportWidth);
        await expect(page.locator('#app')).toHaveScreenshot(`${component}-${viewportWidth}.png`);
      });
    });

    baseThemes.forEach((theme) => {
      test(`should have no visual regression for viewport ${baseViewportWidth} and theme auto with prefers-color-scheme ${theme}`, async ({
        page,
      }) => {
        await setupScenario(page, `/${component}`, baseViewportWidth, {
          forceComponentTheme: 'auto',
          prefersColorScheme: theme,
        });
        await expect(page.locator('#app')).toHaveScreenshot(`${component}-${baseViewportWidth}-theme-${theme}.png`);
      });

      test(`should have no visual regression for viewport ${baseViewportWidth} and high contrast mode with prefers-color-scheme ${theme}`, async ({
        page,
      }) => {
        await setupScenario(page, `/${component}`, baseViewportWidth, {
          forcedColorsEnabled: true,
          prefersColorScheme: theme,
        });
        await expect(page.locator('#app')).toHaveScreenshot(
          `${component}.${baseViewportWidth}-high-contrast-${theme}.png`
        );
      });
    });

    test(`should have no visual regression for viewport ${baseViewportWidth} in scale mode`, async ({ page }) => {
      await setupScenario(page, `/${component}`, baseViewportWidth, {
        scalePageFontSize: true,
      });
      await expect(page.locator('#app')).toHaveScreenshot(`${component}-${baseViewportWidth}-scale-mode.png`);
    });
  });
};

// TODO: should be removed asap
type VRTOptions = {
  baseUrl?: string;
  viewportWidths?: number[];
  scenario?: (page: Page) => Promise<void>;
};

const defaultOptions: VRTOptions = {
  baseUrl: 'http://localhost:8575',
  viewportWidths: [320, 480, 760, 1000, 1300, 1760],
  scenario: undefined,
};

export const executeVisualRegressionTest = async (
  snapshotId: string,
  url: string,
  options?: VRTOptions
): Promise<void> => {
  const { baseUrl, viewportWidths, scenario } = { ...defaultOptions, ...options };

  viewportWidths.forEach((viewportWidth) => {
    test(
      'should have no visual regression for viewport ' + viewportWidth,
      async ({ page }, testInfo): Promise<void> => {
        testInfo.snapshotSuffix = ''; // removes system OS names in snapshot

        await page.setViewportSize({ width: viewportWidth, height: 1 });
        await page.goto(baseUrl + url);
        await page.evaluate(() => (window as any).componentsReady());
        await page.setViewportSize({
          width: viewportWidth,
          height: await page.evaluate(() => document.body.clientHeight),
        });

        if (scenario) {
          await scenario(page);
        }

        await expect(page.locator('#app')).toHaveScreenshot(`${snapshotId}.${viewportWidth}.png`);
      }
    );
  });
};

// TODO: should be in local test file
export const openPopovers = async (page: Page): Promise<void> => {
  const bodyHeightWidth = await page.evaluate(() => {
    return {
      height: document.body.clientHeight,
      width: document.body.clientWidth,
    };
  });

  await page.setViewportSize(bodyHeightWidth);

  await page.evaluate(() => {
    // Enable multiple open popovers
    document.addEventListener('mousedown', (e) => e.stopPropagation(), true);

    document.querySelectorAll('p-popover, my-prefix-p-popover').forEach((popover) => {
      const button = popover.shadowRoot.querySelector('button');
      button.click();
    });
  });
};

// TODO: should be in local test file
export const selectNode = async (page: Page, selector: string): Promise<ElementHandle> => {
  const selectorParts = selector.split('>>>');
  const shadowRootSelectors =
    selectorParts.length > 1
      ? selectorParts
          .slice(1)
          .map((x) => `.shadowRoot.querySelector('${x.trim()}')`)
          .join('')
      : '';
  return (
    await page.evaluateHandle(`document.querySelector('${selectorParts[0].trim()}')${shadowRootSelectors}`)
  ).asElement() as ElementHandle;
};
