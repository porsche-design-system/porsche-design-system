// #####################################################################################################################
// #####################################################################################################################
// #####################################################################################################################
// TODO: should be removed asap

import { ElementHandle, expect, Page, test } from '@playwright/test';
import { baseThemes, baseViewportWidth, baseViewportWidths, setupScenario } from '../helpers';

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
