import { expect, test } from '@playwright/test';
import { collectPageErrors, getExampleUrl, setupExamplePage } from '../../helpers/index.ts';

/**
 * `src/patterns/tile/model-teaser` – a model range with its starting price, with a configure link above its covering `p-link`. Static markup without behaviour of its own, so loading cleanly is all there is to
 * assert.
 */

const url = getExampleUrl('patterns-tile-model-teaser');

test('loads without reporting an error', async ({ page }) => {
  const errors = collectPageErrors(page);

  await setupExamplePage(page, url);

  // The site name is fixed; the part before it is what the page sets, and no page may ship without one.
  await expect(page).toHaveTitle(/^.+ \| Dummy Patterns$/);
  expect(errors).toEqual([]);
});
