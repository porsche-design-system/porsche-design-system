import { expect, test } from '@playwright/test';
import { getDevice, getExampleUrl, setupExamplePage } from '../../../helpers/index.ts';
import { testInitialStates, waitForStableState } from '../../helpers/index.ts';

/**
 * `src/patterns/forms/personal-details` – the personal details form in its initial and validation error states.
 */

const id = 'patterns-forms-personal-details';
const url = getExampleUrl(id);

testInitialStates(id);

test('validation errors', async ({ page }) => {
  const device = getDevice();
  await setupExamplePage(page, url);

  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.locator('p-input-text[name="first-name"]')).toHaveJSProperty('state', 'error');
  await expect(page.locator('p-input-text[name="last-name"]')).toHaveJSProperty('state', 'error');
  await expect(page.locator('p-input-email[name="email"]')).toHaveJSProperty('state', 'error');
  await expect(page.locator('p-input-tel[name="phone"]')).toHaveJSProperty('state', 'error');
  await expect(page.locator('p-input-text[name="street"]')).toHaveJSProperty('state', 'error');
  await expect(page.locator('p-input-text[name="house-number"]')).toHaveJSProperty('state', 'error');
  await expect(page.locator('p-input-text[name="postal-code"]')).toHaveJSProperty('state', 'error');
  await expect(page.locator('p-input-text[name="city"]')).toHaveJSProperty('state', 'error');
  await waitForStableState(page);

  await expect(page).toHaveScreenshot(`${id}--errors--${device}.png`, { fullPage: true });
});
