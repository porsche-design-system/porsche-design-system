import { expect, test } from '@playwright/test';
import { getDevice, getExampleUrl, setupExamplePage } from '../../../helpers/index.ts';
import { testInitialStates, waitForStableState } from '../../helpers/index.ts';

/**
 * `src/patterns/tile/feature-highlight` – a feature whose details an accordion reveals on demand.
 */

const id = 'patterns-tile-feature-highlight';
const url = getExampleUrl(id);

testInitialStates(id);

test('details revealed', async ({ page }) => {
  const device = getDevice();
  await setupExamplePage(page, url);

  const accordion = page.locator('#feature-highlight-accordion');
  await accordion.getByText('Show more').click();
  await expect(accordion.getByText('Distinctive light signatures')).toBeVisible();
  await waitForStableState(page);

  await expect(page).toHaveScreenshot(`${id}--expanded--${device}.png`, { fullPage: true });
});
