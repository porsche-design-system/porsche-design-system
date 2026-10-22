import { expect, test } from '@playwright/test';
import { collectPageErrors, getExampleUrl, isOpen, setupExamplePage } from '../../helpers/index.ts';

/**
 * `src/patterns/tile/feature-highlight` – a feature whose details an accordion reveals on demand.
 */

const url = getExampleUrl('patterns-tile-feature-highlight');

test('loads without reporting an error', async ({ page }) => {
  const errors = collectPageErrors(page);

  await setupExamplePage(page, url);

  // The site name is fixed; the part before it is what the page sets, and no page may ship without one.
  await expect(page).toHaveTitle(/^.+ \| Dummy Patterns$/);
  expect(errors).toEqual([]);
});

test('reveals and hides the details from the summary of the accordion', async ({ page }) => {
  await setupExamplePage(page, url);

  const accordion = page.locator('#feature-highlight-accordion');
  const details = accordion.getByText('Distinctive light signatures');
  await expect(details).toBeHidden();

  // The accordion is controlled: it only asks to change its state, and the page writes the state back – forgetting
  // that half leaves an accordion that never opens.
  await accordion.getByText('Show more').click();
  await expect(details).toBeVisible();
  expect(await isOpen(accordion)).toBe(true);

  await accordion.getByText('Show more').click();
  await expect(details).toBeHidden();
  expect(await isOpen(accordion)).toBe(false);
});
