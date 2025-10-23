
import { expect, Page, test } from '@playwright/test';


const getHost = (page: Page) => page.locator('p-radio-group');
const getInputs = (page: Page) => page.locator('p-radio-group input');

test('should work with v-model:checked manually and programmatic', async ({ page }) => {
  await page.goto('/radio-group-example-controlled-model');
  const host = getHost(page);
  const inputs = getInputs(page);

  await expect(host).toHaveJSProperty('value', '');
  await expect(page.locator('[data-field="value"]')).toHaveText('');

  await inputs.nth(0).click();

  await expect(host).toHaveJSProperty('value', 'a');
  await expect(page.locator('[data-field="value"]')).toHaveText('a');

  await page.getByRole('button', { name: 'Reset', exact: true }).click();

  await expect(host).toHaveJSProperty('value', '');
  await expect(page.locator('[data-field="value"]')).toHaveText('');
});
