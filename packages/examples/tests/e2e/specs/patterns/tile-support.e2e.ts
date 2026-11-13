import { expect, type Page, test } from '@playwright/test';
import { collectPageErrors, getExampleUrl, setupExamplePage } from '../../helpers/index.ts';

/**
 * `src/patterns/tile/support` – a tile holding three smaller ones, each opening one way to reach a person.
 *
 * What is asserted here is what the nesting has to get right: the outer tile is no link itself, the three inside it
 * are, and they stand side by side on a wide viewport and in a single column on a narrow one.
 */

const url = getExampleUrl('patterns-tile-support');

const tiles = '#main li';

/** Where each of the held tiles sits, in the order they are read. */
const getBoxes = (page: Page) =>
  page.locator(tiles).evaluateAll((elements) =>
    elements.map((element) => {
      const box = element.getBoundingClientRect();

      return { left: Math.round(box.left), top: Math.round(box.top) };
    })
  );

test('loads without reporting an error', async ({ page }) => {
  const errors = collectPageErrors(page);

  await setupExamplePage(page, url);

  // The site name is fixed; the part before it is what the page sets, and no page may ship without one.
  await expect(page).toHaveTitle(/^.+ \| Dummy Patterns$/);
  expect(errors).toEqual([]);
});

test('opens three pages from inside one tile that opens none', async ({ page }) => {
  await setupExamplePage(page, url);

  // A link may not contain another, so the tile holding them carries none – the three it holds are the only ones.
  await expect(page.locator('#main a')).toHaveCount(3);
  await expect(page.locator('#main li a')).toHaveCount(3);
});

test('stands the held tiles side by side, or one below the other', async ({ page }) => {
  await setupExamplePage(page, url);

  const [first, second, third] = await getBoxes(page);
  const isWide = (page.viewportSize()?.width ?? 0) >= 760;

  if (isWide) {
    expect(first.top).toBe(second.top);
    expect(second.top).toBe(third.top);
    expect(first.left).toBeLessThan(second.left);
    expect(second.left).toBeLessThan(third.left);
  } else {
    expect(first.left).toBe(second.left);
    expect(second.left).toBe(third.left);
    expect(first.top).toBeLessThan(second.top);
    expect(second.top).toBeLessThan(third.top);
  }
});
