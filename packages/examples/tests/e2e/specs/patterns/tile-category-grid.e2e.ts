import { expect, type Page, test } from '@playwright/test';
import { collectPageErrors, getExampleUrl, setupExamplePage } from '../../helpers/index.ts';

/**
 * `src/patterns/tile/category-grid` – three category tiles under one heading.
 *
 * The tile itself is covered by the category pattern, so what is asserted here is the arrangement: on a wide viewport
 * the first tile is as tall as the other two together, and on a narrow one the three stand in a single column.
 */

const url = getExampleUrl('patterns-tile-category-grid');

const tiles = '#main li';

/** Where each tile sits and how large it is, in the order the tiles are read. */
const getBoxes = (page: Page) =>
  page.locator(tiles).evaluateAll((elements) =>
    elements.map((element) => {
      const box = element.getBoundingClientRect();

      return { left: Math.round(box.left), top: Math.round(box.top), height: Math.round(box.height) };
    })
  );

test('loads without reporting an error', async ({ page }) => {
  const errors = collectPageErrors(page);

  await setupExamplePage(page, url);

  // The site name is fixed; the part before it is what the page sets, and no page may ship without one.
  await expect(page).toHaveTitle(/^.+ \| Dummy Patterns$/);
  expect(errors).toEqual([]);
});

test('gives the first tile the height of the other two together, or a column to each', async ({ page }) => {
  await setupExamplePage(page, url);

  const [first, second, third] = await getBoxes(page);
  const isWide = (page.viewportSize()?.width ?? 0) >= 760;

  if (isWide) {
    // Two columns: the first tile beside the other two, and as tall as both of them and the gap between them.
    expect(first.left).toBeLessThan(second.left);
    expect(second.left).toBe(third.left);
    expect(first.height).toBeGreaterThan(second.height + third.height);
    expect(first.top).toBe(second.top);
  } else {
    // One column: all three start at the same edge and follow one another.
    expect(first.left).toBe(second.left);
    expect(second.left).toBe(third.left);
    expect(first.top).toBeLessThan(second.top);
    expect(second.top).toBeLessThan(third.top);
  }
});
