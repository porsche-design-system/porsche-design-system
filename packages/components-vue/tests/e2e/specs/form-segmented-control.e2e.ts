import { expect, Page, test } from '@playwright/test';

const getHost = (page: Page) => page.locator('p-segmented-control');
const getOptions = (page: Page) => page.locator('p-segmented-control-item');

test('should work with v-model:checked manually and programmatic', async ({ page }) => {
  await page.goto('/segmented-control-example-controlled-model');
  const host = getHost(page);
  const options = getOptions(page);

  await expect(host).toHaveJSProperty('value', undefined);
  await expect(page.locator('[data-field="value"]')).toHaveText('');

  await options.nth(0).click();

  await expect(host).toHaveJSProperty('value', 1);
  await expect(page.locator('[data-field="value"]')).toHaveText('1');

  await page.getByRole('button', { name: 'Reset', exact: true }).click();

  await expect(host).toHaveJSProperty('value', undefined);
  await expect(page.locator('[data-field="value"]')).toHaveText('');
});
