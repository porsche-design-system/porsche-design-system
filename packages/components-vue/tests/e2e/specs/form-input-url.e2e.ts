import { expect, Page, test } from '@playwright/test';

const getHost = (page: Page) => page.locator('p-input-url');
const getInput = (page: Page) => page.locator('p-input-url input');

test('should work with v-model:value manually and programmatic', async ({ page }) => {
  await page.goto('/input-url-example-controlled-model');
  const host = getHost(page);
  const input = getInput(page);

  await expect(host).toHaveJSProperty('value', '');
  await expect(page.locator('[data-field="value"]')).toHaveText('');

  await input.fill('https://www.porsche.com');

  await expect(host).toHaveJSProperty('value', 'https://www.porsche.com');
  await expect(page.locator('[data-field="value"]')).toHaveText('https://www.porsche.com');

  await page.getByRole('button', { name: 'Reset', exact: true }).click();

  await expect(host).toHaveJSProperty('value', '');
  await expect(page.locator('[data-field="value"]')).toHaveText('');
});
