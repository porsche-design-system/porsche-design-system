import { expect, test } from '@playwright/test';
import { getDevice, getExampleUrl, setupExamplePage } from '../../../helpers/index.ts';
import { testInitialStates, waitForStableState } from '../../helpers/index.ts';

/**
 * `src/patterns/forms/contact` – the contact inquiry form in its initial and validation error states.
 */

const id = 'patterns-forms-contact';
const url = getExampleUrl(id);

testInitialStates(id);

test('validation errors', async ({ page }) => {
  const device = getDevice();
  await setupExamplePage(page, url);

  await page.getByRole('button', { name: 'Send non-binding request' }).click();
  await expect(page.locator('p-input-text[name="first-name"]')).toHaveJSProperty('state', 'error');
  await expect(page.locator('p-input-text[name="last-name"]')).toHaveJSProperty('state', 'error');
  await expect(page.locator('p-input-email[name="email"]')).toHaveJSProperty('state', 'error');
  await expect(page.locator('p-checkbox[name="terms"]')).toHaveJSProperty('state', 'error');
  await waitForStableState(page);

  await expect(page).toHaveScreenshot(`${id}--errors--${device}.png`, { fullPage: true });
});
