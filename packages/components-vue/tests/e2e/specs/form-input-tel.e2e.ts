import { expect, Page, test } from '@playwright/test';

const getHost = (page: Page) => page.locator('p-input-tel');
const getInput = (page: Page) => page.locator('p-input-tel input');

test('should work with v-model:value manually and programmatic', async ({ page }) => {
  await page.goto('/input-tel-example-controlled-model');
  const host = getHost(page);
  const input = getInput(page);

  await expect(host).toHaveJSProperty('value', '');
  await expect(page.locator('[data-field="value"]')).toHaveText('');

  await input.fill('0123 4567890');

  await expect(host).toHaveJSProperty('value', '0123 4567890');
  await expect(page.locator('[data-field="value"]')).toHaveText('0123 4567890');

  await page.getByRole('button', { name: 'Reset', exact: true }).click();

  await expect(host).toHaveJSProperty('value', '');
  await expect(page.locator('[data-field="value"]')).toHaveText('');
});
