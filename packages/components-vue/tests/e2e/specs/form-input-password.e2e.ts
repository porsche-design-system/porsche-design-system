import { expect, Page, test } from '@playwright/test';

const getHost = (page: Page) => page.locator('p-input-password');
const getInput = (page: Page) => page.locator('p-input-password input');

test('should work with v-model:value manually and programmatic', async ({ page }) => {
  await page.goto('/input-password-example-controlled-model');
  const host = getHost(page);
  const input = getInput(page);

  await expect(host).toHaveJSProperty('value', '');
  await expect(page.locator('[data-field="value"]')).toHaveText('');

  await input.fill('some-password');

  await expect(host).toHaveJSProperty('value', 'some-password');
  await expect(page.locator('[data-field="value"]')).toHaveText('some-password');

  await page.getByRole('button', { name: 'Reset', exact: true }).click();

  await expect(host).toHaveJSProperty('value', '');
  await expect(page.locator('[data-field="value"]')).toHaveText('');
});
