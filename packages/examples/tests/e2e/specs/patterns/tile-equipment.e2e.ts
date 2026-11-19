import type { Page } from '@playwright/test';
import { expect, test } from '@porsche-design-system/testing/playwright';
import { getExampleUrl, setupExamplePage } from '../../helpers/index.ts';

/**
 * `src/patterns/tile/equipment` – the equipment options of a vehicle, one in each variant of the tile.
 *
 * What is asserted here is the arrangement, which is the only thing the tile does on its own. In the first tile the
 * photograph stands beside the text once the tile is 32rem wide and above it while it is narrower; in the stacked ones
 * it stays above the text however wide they are. The single action of the list is a button, so unlike the other tiles
 * nothing spans a tile.
 */

const url = getExampleUrl('patterns-tile-equipment');

/** Where the photograph and the heading of a tile sit, in the order they are read. */
const getBoxes = (page: Page, tile: number) =>
  page.locator(`#main li:nth-child(${tile}) :is(img, p-heading)`).evaluateAll((elements) =>
    elements.map((element) => {
      const box = element.getBoundingClientRect();

      return { left: Math.round(box.left), top: Math.round(box.top), bottom: Math.round(box.bottom) };
    })
  );

test('loads without reporting an error', async ({ page }) => {
  await setupExamplePage(page, url);

  // The site name is fixed; the part before it is what the page sets, and no page may ship without one.
  await expect(page).toHaveTitle(/^.+ \| Dummy Patterns$/);
});

/** The width of the tile from which the photograph stands beside the text – 32rem, a container query of the tile. */
const rowWidth = 512;

test('puts the photograph beside the text, or above it in a narrow tile', async ({ page }) => {
  await setupExamplePage(page, url);

  const [photograph, heading] = await getBoxes(page, 1);
  // What decides is the width of the tile rather than the one of the viewport, so the tile is what is measured.
  const tileWidth = (await page.locator('#main li').first().boundingBox())?.width ?? 0;
  const isWide = tileWidth >= rowWidth;

  if (isWide) {
    // Side by side. The padding of the text panel moves the heading right in either arrangement, so what tells the
    // two apart is whether the photograph still spans the rows the text occupies.
    expect(photograph.left).toBeLessThan(heading.left);
    expect(photograph.top).toBeLessThan(heading.bottom);
    expect(photograph.bottom).toBeGreaterThan(heading.top);
  } else {
    // Stacked: the photograph ends above the heading.
    expect(photograph.bottom).toBeLessThanOrEqual(heading.top);
  }
});

test('keeps the photograph of a stacked tile above its text, however wide the tile is', async ({ page }) => {
  await setupExamplePage(page, url);

  // What tells the stacked variant from the first tile: its two panels never share a row. Asserted for a wide
  // viewport too, where the tiles are wide enough for the first one to put its photograph beside its text.
  for (const width of [page.viewportSize()?.width ?? 0, 1920]) {
    await page.setViewportSize({ width, height: 900 });

    for (const tile of [2, 3]) {
      const [photograph, heading] = await getBoxes(page, tile);

      expect(photograph.bottom).toBeLessThanOrEqual(heading.top);
    }
  }
});

test('offers the option through a single button, reachable by keyboard', async ({ page }) => {
  await setupExamplePage(page, url);

  // No tile is a link, so the button of the first one is the only thing in the list that takes focus.
  const button = page.getByRole('button', { name: 'Available as Update' });

  await expect(button).toBeVisible();
  await expect(page.locator('#main').getByRole('link')).toHaveCount(0);

  await button.focus();
  await expect(button).toBeFocused();
});
