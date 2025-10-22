import { expect, Page, test } from '@playwright/test';

const getHost = (page: Page) => page.locator('p-input-date');
const getInput = (page: Page) => page.locator('p-input-date input');

test('should work with v-model:value manually and programmatic', async ({ page }) => {
  await page.goto('/input-date-example-controlled-model');
  const host = getHost(page);
  const input = getInput(page);

  await expect(host).toHaveJSProperty('value', '');
  await expect(page.locator('[data-field="value"]')).toHaveText('');

  await input.fill('2025-10-24');

  await expect(host).toHaveJSProperty('value', '2025-10-24');
  await expect(page.locator('[data-field="value"]')).toHaveText('2025-10-24');

  await page.getByRole('button', { name: 'Reset', exact: true }).click();

  await expect(host).toHaveJSProperty('value', '');
  await expect(page.locator('[data-field="value"]')).toHaveText('');
});
