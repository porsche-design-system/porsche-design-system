import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import { schemes, viewportWidthM } from '@porsche-design-system/shared/testing';
import { getExampleUrl, setupExamplePage, waitForComponentsReady, waitForStableLayout } from '../../helpers/index.ts';

/**
 * The captures every example gets, whatever it demonstrates.
 *
 * Both Playwright projects capture the page as it loads, each at its own viewport: `chrome` at 1000 (M) and `safari`
 * at 320 (XXS). Everything else is chromium only – scaling the font size and forcing colors go through CDP, and the
 * responsive layout is already covered by the two widths.
 *
 * The states a page reaches through interaction are written out in its own spec, next to this call.
 */

/** The width a project captures at, kept on the project so the specs have no second source of truth. */
export const getViewportWidth = (): number => (test.info().project.metadata.viewportWidth as number) ?? viewportWidthM;

export type InitialStatesOptions = {
  /** Why this page has no 200% font size capture – leave it out unless the page genuinely cannot settle there. */
  skipFontSize200?: string;
};

export const testInitialStates = (id: string, { skipFontSize200 }: InitialStatesOptions = {}): void => {
  const url = getExampleUrl(id);

  // executed in Chrome + Safari
  test('initial state', async ({ page }) => {
    const viewportWidth = getViewportWidth();
    await setupExamplePage(page, url, viewportWidth);
    await expect(page).toHaveScreenshot(`${id}--${viewportWidth}.png`, { fullPage: true });
  });

  // executed in Chrome only
  test.describe(() => {
    test.skip(({ browserName }) => browserName !== 'chromium');

    test('prefers-color-scheme dark', async ({ page }) => {
      const viewportWidth = getViewportWidth();
      await setupExamplePage(page, url, viewportWidth, { prefersColorScheme: 'dark' });
      await expect(page).toHaveScreenshot(`${id}--${viewportWidth}-dark.png`, { fullPage: true });
    });

    for (const scheme of schemes) {
      test(`hcm ${scheme}`, async ({ page }) => {
        const viewportWidth = getViewportWidth();
        await setupExamplePage(page, url, viewportWidth, { forcedColorsEnabled: true, prefersColorScheme: scheme });
        await expect(page).toHaveScreenshot(`${id}--${viewportWidth}-hcm-${scheme}.png`, { fullPage: true });
      });
    }

    test('font-size 200%', async ({ page }) => {
      test.skip(!!skipFontSize200, skipFontSize200);

      const viewportWidth = getViewportWidth();
      await setupExamplePage(page, url, viewportWidth, { scalePageFontSize: true });
      await expect(page).toHaveScreenshot(`${id}--${viewportWidth}-fs200.png`, { fullPage: true });
    });

    test('rtl (right-to-left)', async ({ page }) => {
      const viewportWidth = getViewportWidth();
      await setupExamplePage(page, url, viewportWidth, { rtl: true });
      await expect(page).toHaveScreenshot(`${id}--${viewportWidth}-rtl.png`, { fullPage: true });
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
