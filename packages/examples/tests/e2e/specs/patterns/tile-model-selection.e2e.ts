import { expect, test } from '@playwright/test';
import { collectPageErrors, getExampleUrl, setupExamplePage } from '../../helpers/index.ts';

/**
 * `src/patterns/tile/model-selection` – a model range as entry point, clickable as a whole through a link of its own. Static markup without behaviour of its own, so loading cleanly is all there is to
 * assert.
 */

const url = getExampleUrl('patterns-tile-model-selection');

test('loads without reporting an error', async ({ page }) => {
  const errors = collectPageErrors(page);

  await setupExamplePage(page, url);

  // The site name is fixed; the part before it is what the page sets, and no page may ship without one.
  await expect(page).toHaveTitle(/^.+ \| Dummy Patterns$/);
  expect(errors).toEqual([]);
});
