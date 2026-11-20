import { expect, test } from '@porsche-design-system/testing/playwright';
import { getDevice, getExampleUrl, setupExamplePage } from '../../../helpers/index.ts';
import { testInitialStates, waitForStableState } from '../../helpers/index.ts';

/**
 * `src/patterns/tile/disclosure` – a feature whose details an accordion reveals on demand.
 */

const id = 'patterns-tile-disclosure';
const url = getExampleUrl(id);

testInitialStates(id);

test('details revealed', async ({ page }) => {
  const device = getDevice();
  await setupExamplePage(page, url);

  const accordion = page.locator('#disclosure-accordion');
  await accordion.getByRole('heading', { name: 'Light design.' }).click();
  await expect(accordion.getByText('Distinctive light signatures')).toBeVisible();
  await waitForStableState(page);

  await expect(page).toHaveScreenshot(`${id}--expanded--${device}.png`, { fullPage: true });
});
