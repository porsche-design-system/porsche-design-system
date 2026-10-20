import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import { schemes } from '@porsche-design-system/shared/testing';
import {
  getDevice,
  getExampleUrl,
  setupExamplePage,
  waitForComponentsReady,
  waitForStableLayout,
} from '../../helpers/index.ts';

/**
 * The captures every example gets, whatever it demonstrates.
 *
 * Both VRT projects capture the page as it loads, each on the device it emulates: `vrt-desktop-chrome` on Desktop
 * Chrome and `vrt-mobile-safari` on an iPhone. Everything else is chromium only – scaling the font size and forcing
 * colors go through CDP, and the responsive layout is already covered by the two devices.
 *
 * The states a page reaches through interaction are written out in its own spec, next to this call.
 */

export type InitialStatesOptions = {
  /** Why this page has no 200% font size capture – leave it out unless the page genuinely cannot settle there. */
  skipFontSize200?: string;
};

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

    test('font-size 200%', async ({ page }) => {
      test.skip(!!skipFontSize200, skipFontSize200);

      const device = getDevice();
      await setupExamplePage(page, url, { scalePageFontSize: true });
      await expect(page).toHaveScreenshot(`${id}--${device}-fs200.png`, { fullPage: true });
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
  await waitForComponentsReady(page);
  await waitForStableLayout(page);
};
