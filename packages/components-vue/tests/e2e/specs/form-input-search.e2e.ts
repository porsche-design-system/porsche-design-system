import { expect, Page, test } from '@playwright/test';

const getHost = (page: Page) => page.locator('p-input-search');
const getInput = (page: Page) => page.locator('p-input-search input');

test('should work with v-model:value manually and programmatic', async ({ page }) => {
  await page.goto('/input-search-example-controlled-model');
  const host = getHost(page);
  const input = getInput(page);

  await expect(host).toHaveJSProperty('value', '');
  await expect(page.locator('[data-field="value"]')).toHaveText('');

  await input.fill('Some search term');

  await expect(host).toHaveJSProperty('value', 'Some search term');
  await expect(page.locator('[data-field="value"]')).toHaveText('Some search term');

  await page.getByRole('button', { name: 'Reset', exact: true }).click();

  await expect(host).toHaveJSProperty('value', '');
  await expect(page.locator('[data-field="value"]')).toHaveText('');
});
