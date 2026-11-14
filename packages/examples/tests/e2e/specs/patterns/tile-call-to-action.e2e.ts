import { expect, test } from '@playwright/test';
import { collectPageErrors, getExampleUrl, setupExamplePage } from '../../helpers/index.ts';

/**
 * `src/patterns/tile/call-to-action` – a service promoted with a mood image, clickable as a whole through a covering `p-link`. Static markup without behaviour of its own, so loading cleanly is all there is to
 * assert.
 */

const url = getExampleUrl('patterns-tile-call-to-action');

test('loads without reporting an error', async ({ page }) => {
  const errors = collectPageErrors(page);

  await setupExamplePage(page, url);

  // The site name is fixed; the part before it is what the page sets, and no page may ship without one.
  await expect(page).toHaveTitle(/^.+ \| Dummy Patterns$/);
  expect(errors).toEqual([]);
});
