import { expect, test } from '@playwright/test';
import { getDevice, getExampleUrl, setupExamplePage } from '../../../helpers/index.ts';
import { testInitialStates, waitForStableState } from '../../helpers/index.ts';

/**
 * `src/patterns/forms/search-combobox-option-list` – the field on its own, and the same field with matching options open below it.
 */

const id = 'patterns-forms-search-combobox-option-list';
const url = getExampleUrl(id);

testInitialStates(id);

test('results open', async ({ page }) => {
  const device = getDevice();
  await setupExamplePage(page, url);

  await page.locator('#dealer-search input').fill('stu');
  await expect(page.getByRole('option', { name: 'Stuttgart', exact: true })).toBeVisible();
  await waitForStableState(page);

  await expect(page).toHaveScreenshot(`${id}--results--${device}.png`);
});
