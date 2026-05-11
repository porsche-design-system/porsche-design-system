import { expect, Page, test } from '@playwright/test';

const getHost = (page: Page) => page.locator('p-input-email');
const getInput = (page: Page) => page.locator('p-input-email input');

test('should work with v-model:value manually and programmatic', async ({ page }) => {
  await page.goto('/input-email-example-controlled-model');
  const host = getHost(page);
  const input = getInput(page);

  await expect(host).toHaveJSProperty('value', '');
  await expect(page.locator('[data-field="value"]')).toHaveText('');

  await input.fill('example@mail.com');

  await expect(host).toHaveJSProperty('value', 'example@mail.com');
  await expect(page.locator('[data-field="value"]')).toHaveText('example@mail.com');

  await page.getByRole('button', { name: 'Reset', exact: true }).click();

  await expect(host).toHaveJSProperty('value', '');
  await expect(page.locator('[data-field="value"]')).toHaveText('');
});
