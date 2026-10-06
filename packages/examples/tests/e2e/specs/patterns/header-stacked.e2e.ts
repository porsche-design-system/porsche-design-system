import { expect, test } from '@playwright/test';
import { collectPageErrors, getExampleUrl, setupExamplePage } from '../../helpers/index.ts';

/**
 * `src/patterns/header/stacked` – the navigation drilldown, wired up by the script of `MainNav`.
 */

const url = getExampleUrl('patterns-header-stacked');

test('loads without reporting an error', async ({ page }) => {
  const errors = collectPageErrors(page);

  await setupExamplePage(page, url);

  // The site name is fixed; the part before it is what the page sets, and no page may ship without one.
  await expect(page).toHaveTitle(/^.+ \| Dummy Patterns$/);
  expect(errors).toEqual([]);
});

test('opens and closes the navigation drilldown', async ({ page }) => {
  await setupExamplePage(page, url);

  // The host stays a zero-height anchor in the header, so what becomes visible is the `dialog` in its shadow root.
  const drilldown = page.locator('#nav-drilldown dialog');
  await expect(drilldown).toBeHidden();

  await page.locator('#nav-button').click();
  await expect(drilldown).toBeVisible();

  // Closing is requested by the component and written back by the page – the one half of controlled mode that an
  // example gets wrong by forgetting, which leaves a drilldown that can be opened but never closed.
  await page.keyboard.press('Escape');
  await expect(drilldown).toBeHidden();
});
