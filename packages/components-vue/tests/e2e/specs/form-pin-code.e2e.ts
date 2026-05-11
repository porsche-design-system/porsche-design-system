
import { expect, Page, test } from '@playwright/test';

const getHost = (page: Page) => page.locator('p-pin-code');
const getInputs = (page: Page) => page.locator('p-pin-code input');

test('should work with v-model:checked manually and programmatic', async ({ page }) => {
  await page.goto('/pin-code-example-controlled-model');
  const host = getHost(page);
  const inputs = getInputs(page);

  await expect(host).toHaveJSProperty('value', '');
  await expect(page.locator('[data-field="value"]')).toHaveText('');

  await inputs.nth(0).fill("1");
  await inputs.nth(1).fill("2");
  await inputs.nth(2).fill("3");
  await inputs.nth(3).fill("4");

  await expect(host).toHaveJSProperty('value', '1234');
  await expect(page.locator('[data-field="value"]')).toHaveText('1234');

  await page.getByRole('button', { name: 'Reset', exact: true }).click();

  await expect(host).toHaveJSProperty('value', '');
  await expect(page.locator('[data-field="value"]')).toHaveText('');
});
