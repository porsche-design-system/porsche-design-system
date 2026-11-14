import { expect, test } from '@playwright/test';
import { collectPageErrors, getExampleUrl, setupExamplePage } from '../../helpers/index.ts';

/**
 * `src/patterns/tile/equipment-stacked` – the equipment tile with its panels stacked, without anything interactive.
 * Static markup without behaviour of its own, so loading cleanly is all there is to assert.
 */

const url = getExampleUrl('patterns-tile-equipment-stacked');

test('loads without reporting an error', async ({ page }) => {
  const errors = collectPageErrors(page);

  await setupExamplePage(page, url);

  // The site name is fixed; the part before it is what the page sets, and no page may ship without one.
  await expect(page).toHaveTitle(/^.+ \| Dummy Patterns$/);
  expect(errors).toEqual([]);
});

test('stacks the photograph above the text, at every viewport', async ({ page }) => {
  await setupExamplePage(page, url);

  const photograph = await page.locator('#main img').boundingBox();
  const heading = await page.locator('#main p-heading').boundingBox();

  // What tells this version from the one beside it: the two panels never share a row.
  expect(photograph?.y ?? 0).toBeLessThan(heading?.y ?? 0);
  expect((photograph?.y ?? 0) + (photograph?.height ?? 0)).toBeLessThanOrEqual(heading?.y ?? 0);
  await expect(page.locator('#main').getByRole('link')).toHaveCount(0);
});
