import { expect, Page, test } from '@playwright/test';

const getHost = (page: Page) => page.locator('p-textarea');
const getTextarea = (page: Page) => page.locator('p-textarea textarea');

test('should work with v-model:value manually and programmatic', async ({ page }) => {
  await page.goto('/textarea-example-controlled-model');
  const host = getHost(page);
  const textarea = getTextarea(page);

  await expect(host).toHaveJSProperty('value', '');
  await expect(page.locator('[data-field="value"]')).toHaveText('');

  await textarea.click();
  await page.keyboard.type('Some value');

  await expect(host).toHaveJSProperty('value', 'Some value');
  await expect(page.locator('[data-field="value"]')).toHaveText('Some value');

  await page.getByRole('button', { name: 'Reset', exact: true }).click();

  await expect(host).toHaveJSProperty('value', '');
  await expect(page.locator('[data-field="value"]')).toHaveText('');
});
