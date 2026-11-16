import { expect, test } from '@porsche-design-system/testing/playwright';
import { getExampleUrl, setupExamplePage } from '../../helpers/index.ts';

/**
 * `src/patterns/footer/extended` – static markup without behaviour of its own, so loading cleanly is all there
 * is to assert.
 */

const url = getExampleUrl('patterns-footer-extended');

test('loads without reporting an error', async ({ page }) => {
  await setupExamplePage(page, url);

  // The site name is fixed; the part before it is what the page sets, and no page may ship without one.
  await expect(page).toHaveTitle(/^.+ \| Dummy Patterns$/);
});
