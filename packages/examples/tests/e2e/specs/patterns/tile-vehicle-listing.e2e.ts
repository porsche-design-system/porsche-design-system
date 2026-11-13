import { expect, test } from '@playwright/test';
import { collectPageErrors, getExampleUrl, setupExamplePage } from '../../helpers/index.ts';

/**
 * `src/patterns/tile/vehicle-listing` – a vehicle of a search result, with a popover, a link to its technical data and
 * two actions, none of them under a link covering the tile.
 */

const url = getExampleUrl('patterns-tile-vehicle-listing');

test('loads without reporting an error', async ({ page }) => {
  const errors = collectPageErrors(page);

  await setupExamplePage(page, url);

  // The site name is fixed; the part before it is what the page sets, and no page may ship without one.
  await expect(page).toHaveTitle(/^.+ \| Dummy Patterns$/);
  expect(errors).toEqual([]);
});

test('reaches every control of the tile, none of them covered by another', async ({ page }) => {
  await setupExamplePage(page, url);

  const controls = [
    'More information about the price',
    'Technical data and standard equipment of the 718 Cayman GTS 4.0',
    'Discover the 718 Cayman GTS 4.0',
    'Configure the 718 Cayman GTS 4.0',
  ];

  // A link covering the tile would lie over all four of them, which is why this tile has none. Hit testing is what
  // proves it: `click` fails when another element receives the event.
  for (const name of controls) {
    await expect(page.getByLabel(name)).toBeVisible();
    await page.getByLabel(name).click({ trial: true });
  }
});

test('explains the price in a popover that the tile neither covers nor clips', async ({ page }) => {
  await setupExamplePage(page, url);

  const trigger = page.getByLabel('More information about the price');
  const panel = page.getByText('The price includes VAT');
  await expect(panel).toBeHidden();

  await trigger.click();
  await expect(panel).toBeVisible();

  // The panel is placed in the top layer, so no ancestor of the trigger can cover or clip it – asserted by its own
  // position, which reaches beyond the tile the trigger sits in.
  const tile = await page.locator('main > div').boundingBox();
  const box = await page.locator('p-popover div[popover]').boundingBox();
  expect(box?.x).toBeLessThan(tile?.x as number);

  await page.keyboard.press('Escape');
  await expect(panel).toBeHidden();
  await expect(trigger).toBeFocused();
});
