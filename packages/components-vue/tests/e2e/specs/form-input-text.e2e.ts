
import { expect, Page, test } from '@playwright/test';

const getHost = (page: Page) => page.locator('p-input-text');
const getInput = (page: Page) => page.locator('p-input-text input');

test('should work with v-model:value manually and programmatic', async ({ page }) => {
  await page.goto('/input-text-example-controlled-model');
  const host = getHost(page);
  const input = getInput(page);

  await expect(host).toHaveJSProperty('value', '');
  await expect(page.locator('[data-field="value"]')).toHaveText('');

  await input.fill('Some text');

  await expect(host).toHaveJSProperty('value', 'Some text');
  await expect(page.locator('[data-field="value"]')).toHaveText('Some text');

  await page.getByRole('button', { name: 'Reset', exact: true }).click();

  await expect(host).toHaveJSProperty('value', '');
  await expect(page.locator('[data-field="value"]')).toHaveText('');
});
