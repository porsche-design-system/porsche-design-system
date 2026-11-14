import { expect, type Page, test } from '@playwright/test';
import { collectPageErrors, getExampleUrl, setupExamplePage } from '../../helpers/index.ts';

/**
 * `src/patterns/tile/equipment` – one equipment option of a vehicle, with a photograph beside its description.
 *
 * What is asserted here is the arrangement, which is the only thing the tile does on its own: the photograph stands
 * beside the text from the medium breakpoint and above it below. Its single action is a button, so unlike the other
 * tiles nothing spans the tile.
 */

const url = getExampleUrl('patterns-tile-equipment');

/** Where the photograph and the text panel sit, in the order they are read. */
const getBoxes = (page: Page) =>
  page.locator('#main img, #main p-heading').evaluateAll((elements) =>
    elements.map((element) => {
      const box = element.getBoundingClientRect();

      return { left: Math.round(box.left), top: Math.round(box.top), bottom: Math.round(box.bottom) };
    })
  );

test('loads without reporting an error', async ({ page }) => {
  const errors = collectPageErrors(page);

  await setupExamplePage(page, url);

  // The site name is fixed; the part before it is what the page sets, and no page may ship without one.
  await expect(page).toHaveTitle(/^.+ \| Dummy Patterns$/);
  expect(errors).toEqual([]);
});

test('puts the photograph beside the text, or above it on a narrow viewport', async ({ page }) => {
  await setupExamplePage(page, url);

  const [photograph, heading] = await getBoxes(page);
  const isWide = (page.viewportSize()?.width ?? 0) >= 760;

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

test('offers the option through a single button, reachable by keyboard', async ({ page }) => {
  await setupExamplePage(page, url);

  // The tile is not a link, so the button is the only thing in it that takes focus.
  const button = page.getByRole('button', { name: 'Available as Update' });

  await expect(button).toBeVisible();
  await expect(page.locator('#main').getByRole('link')).toHaveCount(0);

  await button.focus();
  await expect(button).toBeFocused();
});
