import { expect, test } from '@playwright/test';
import { getDevice, getExampleUrl, setupExamplePage } from '../../../helpers/index.ts';
import { testInitialStates, waitForStableState } from '../../helpers/index.ts';

/**
 * `src/patterns/forms/search-combobox-link-list` – the field on its own, and the same field with matching links open below it.
 */

const id = 'patterns-forms-search-combobox-link-list';
const url = getExampleUrl(id);

testInitialStates(id);

test('results open', async ({ page }) => {
  const device = getDevice();
  await setupExamplePage(page, url);

  const stuttgart = page.getByRole('link', { name: 'Stuttgart', exact: true });
  await page.locator('#dealer-search input').fill('stu');
  await expect(stuttgart).toBeVisible();
  await page.keyboard.press('ArrowDown');
  await expect(stuttgart.locator('xpath=ancestor::p-link-pure[1]')).toHaveJSProperty('active', true);
  await waitForStableState(page);

  await expect(page).toHaveScreenshot(`${id}--results--${device}.png`);
});
