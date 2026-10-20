import { expect, test } from '@playwright/test';
import {
  collectPageErrors,
  getExampleUrl,
  getTriggerControl,
  setupExamplePage,
  waitForStablePosition,
} from '../../helpers/index.ts';

/**
 * `src/templates/admin-panel` – a canvas whose settings sidebar is controlled by the page, and a search dialog.
 */

const url = getExampleUrl('templates-admin-panel');

test('loads without reporting an error', async ({ page }) => {
  const errors = collectPageErrors(page);

  await setupExamplePage(page, url);

  // The site name is fixed; the part before it is what the page sets, and no page may ship without one.
  await expect(page).toHaveTitle(/^.+ \| Dummy Patterns$/);
  expect(errors).toEqual([]);
});

test('mirrors the settings sidebar onto its trigger', async ({ page }) => {
  await setupExamplePage(page, url);

  const settingsTrigger = getTriggerControl(page, 'settings-button');
  const canvas = page.locator('#admin-canvas');
  const isSidebarEndOpen = () =>
    canvas.evaluate((element: HTMLElement & { sidebarEndOpen?: boolean }) => element.sidebarEndOpen === true);

  await expect(settingsTrigger).toHaveAttribute('aria-expanded', 'false');

  await page.locator('#settings-button').click();

  await expect(settingsTrigger).toHaveAttribute('aria-expanded', 'true');
  await expect.poll(isSidebarEndOpen).toBe(true);

  await page.locator('#settings-button').click();

  await expect(settingsTrigger).toHaveAttribute('aria-expanded', 'false');
  await expect.poll(isSidebarEndOpen).toBe(false);
});

test('opens the search dialog from the toolbar', async ({ page }) => {
  await setupExamplePage(page, url);

  const searchDialog = page.locator('#search-dialog');
  await expect(searchDialog).toBeHidden();

  await page.locator('#search-button').click();

  await expect(searchDialog).toBeVisible();

  // `p-modal` moves focus into itself as it opens, and Escape only reaches it once that has happened – pressing too
  // early is a keystroke into the page behind, which under load is exactly what happens. The settled panel is the
  // `dialog` in its shadow root: the host is `display: contents` and has no box whose position could settle.
  await waitForStablePosition(page.locator('#search-dialog dialog'));
  await page.keyboard.press('Escape');

  await expect(searchDialog).toBeHidden();
});
