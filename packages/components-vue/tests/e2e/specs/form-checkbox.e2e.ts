import { expect, Page, test } from '@playwright/test';

const getHost = (page: Page) => page.locator('p-checkbox');
const getInput = (page: Page) => page.locator('p-checkbox input');

test('should work with v-model:checked manually and programmatic', async ({ page }) => {
  await page.goto('/checkbox-example-controlled-model');
  const host = getHost(page);
  const input = getInput(page);

  await expect(host).toHaveJSProperty('checked', false);
  await expect(page.locator('[data-field="value"]')).toHaveText('false');

  await input.click();

  await expect(host).toHaveJSProperty('checked', true);
  await expect(page.locator('[data-field="value"]')).toHaveText('true');

  await page.getByRole('button', { name: 'Reset', exact: true }).click();

  await expect(host).toHaveJSProperty('checked', false);
  await expect(page.locator('[data-field="value"]')).toHaveText('false');
});
