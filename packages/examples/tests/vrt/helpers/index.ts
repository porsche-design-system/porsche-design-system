import type { Page } from '@playwright/test';
import { schemes } from '@porsche-design-system/testing';
import { expect, test, waitForComponentsHydrated } from '@porsche-design-system/testing/playwright';
import {
  getDevice,
  getExampleUrl,
  launchPageWithFontSize200,
  setupExamplePage,
  waitForStableLayout,
} from '../../helpers/index.ts';

/**
 * The captures every example gets, whatever it demonstrates.
 *
 * Both VRT projects capture the page as it loads, each on the device it emulates: `vrt-desktop-chrome` on Desktop
 * Chrome and `vrt-mobile-safari` on an iPhone. Everything else is chromium only – the 200% font size is a preference
 * of a chromium profile, forcing colors goes through CDP, and the responsive layout is already covered by the two
 * devices.
 *
 * The states a page reaches through interaction are written out in its own spec, next to this call.
 */

export type InitialStatesOptions = {
  /** Why this page has no 200% font size capture – leave it out unless the page genuinely cannot settle there. */
  skipFontSize200?: string;
};

// The 200% profile needs a context of its own. Handing it over as `context` keeps request routing and the console guard on it.
const testWithFontSize200 = test.extend({
  context: async ({ playwright }, use, testInfo) => {
    const { page, close } = await launchPageWithFontSize200(playwright, testInfo);
    await use(page.context());
    await close();
  },
});

export const testInitialStates = (id: string, { skipFontSize200 }: InitialStatesOptions = {}): void => {
  const url = getExampleUrl(id);

  // executed in Chrome + Safari
  test('initial state', async ({ page }) => {
    const device = getDevice();
    await setupExamplePage(page, url);
    await expect(page).toHaveScreenshot(`${id}--${device}.png`, { fullPage: true });
  });

  // executed in Chrome only
  test.describe(() => {
    test.skip(({ browserName }) => browserName !== 'chromium');

    test('prefers-color-scheme dark', async ({ page }) => {
      const device = getDevice();
      await setupExamplePage(page, url, { prefersColorScheme: 'dark' });
      await expect(page).toHaveScreenshot(`${id}--${device}-dark.png`, { fullPage: true });
    });

    for (const scheme of schemes) {
      test(`hcm ${scheme}`, async ({ page }) => {
        const device = getDevice();
        await setupExamplePage(page, url, { forcedColorsEnabled: true, prefersColorScheme: scheme });
        await expect(page).toHaveScreenshot(`${id}--${device}-hcm-${scheme}.png`, { fullPage: true });
      });
    }

    test.describe(() => {
      // skipped here and not in the test, so a skipped page launches no browser
      test.skip(!!skipFontSize200, skipFontSize200);

      testWithFontSize200('font-size 200%', async ({ page }) => {
        const device = getDevice();
        await setupExamplePage(page, url);
        // The full chromium the font size needs does not antialias text the same in every run – a few hundred pixels
        // at most, where a layout that breaks at 200% changes thousands.
        await expect(page).toHaveScreenshot(`${id}--${device}-fs200.png`, { fullPage: true, maxDiffPixels: 200 });
      });
    });

    test('rtl (right-to-left)', async ({ page }) => {
      const device = getDevice();
      await setupExamplePage(page, url, { rtl: true });
      await expect(page).toHaveScreenshot(`${id}--${device}-rtl.png`, { fullPage: true });
    });
  });
};

/**
 * Brings a page into a state a screenshot may be taken in **after** a test interacted with it.
 *
 * What opened has to have upgraded and laid out like the initial page did in `setupExamplePage()`. The pointer is
 * parked in the corner, since it stays wherever the last click landed – and a hover style on the trigger that opened
 * a state is not part of that state.
 */
export const waitForStableState = async (page: Page): Promise<void> => {
  await page.mouse.move(0, 0);
  await waitForComponentsHydrated(page);
  await waitForStableLayout(page);
};
