import { expect, test } from '@playwright/test';
import { getExampleUrl, setupExamplePage, waitForStablePosition } from '../../../helpers/index.ts';
import { getDevice, testInitialStates, waitForStableState } from '../../helpers/index.ts';

/**
 * `src/templates/admin-panel` – an application canvas, captured with its settings sidebar and its search dialog open.
 */

const id = 'templates-admin-panel';
const url = getExampleUrl(id);

testInitialStates(id);

test('settings sidebar open', async ({ page }) => {
  const device = getDevice();
  await setupExamplePage(page, url);

  await page.locator('#settings-button').click();
  await expect(page.locator('#settings-button button')).toHaveAttribute('aria-expanded', 'true');
  await expect
    .poll(() =>
      page
        .locator('#admin-canvas')
        .evaluate((element: HTMLElement & { sidebarEndOpen?: boolean }) => element.sidebarEndOpen === true)
    )
    .toBe(true);
  await waitForStableState(page);

  await expect(page).toHaveScreenshot(`${id}--settings-open--${device}.png`);
});

test('search dialog open', async ({ page }) => {
  const device = getDevice();
  await setupExamplePage(page, url);

  await page.locator('#search-button').click();
  await expect(page.locator('#search-dialog')).toBeVisible();
  // The panel of `p-modal` is the `dialog` in its shadow root – the host is `display: contents` and has no box.
  await waitForStablePosition(page.locator('#search-dialog dialog'));
  await waitForStableState(page);

  await expect(page).toHaveScreenshot(`${id}--search-open--${device}.png`);
});
