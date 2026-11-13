import { expect, test } from '@playwright/test';
import { collectPageErrors, getExampleUrl, isOpen, setupExamplePage } from '../../helpers/index.ts';

/**
 * `src/patterns/tile/disclosure` – a feature whose details an accordion reveals on demand.
 */

const url = getExampleUrl('patterns-tile-disclosure');

test('loads without reporting an error', async ({ page }) => {
  const errors = collectPageErrors(page);

  await setupExamplePage(page, url);

  // The site name is fixed; the part before it is what the page sets, and no page may ship without one.
  await expect(page).toHaveTitle(/^.+ \| Dummy Patterns$/);
  expect(errors).toEqual([]);
});

test('reveals and hides the details from the summary of the accordion', async ({ page }) => {
  await setupExamplePage(page, url);

  const accordion = page.locator('#disclosure-accordion');
  const summary = accordion.getByRole('heading', { name: 'Light design.' });
  const details = accordion.getByText('Distinctive light signatures');
  await expect(details).toBeHidden();

  // The accordion is controlled: it only asks to change its state, and the page writes the state back – forgetting
  // that half leaves an accordion that never opens.
  await summary.click();
  await expect(details).toBeVisible();
  expect(await isOpen(accordion)).toBe(true);

  await summary.click();
  await expect(details).toBeHidden();
  expect(await isOpen(accordion)).toBe(false);
});
