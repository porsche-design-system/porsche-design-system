
import { expect, Page, test } from '@playwright/test';

const getHost = (page: Page) => page.locator('p-select');
const getCombobox = (page: Page) => page.locator('p-select [role="combobox"]');
const getDialog = (page: Page) => page.locator('p-select [role="dialog"]');
const getOptions = (page: Page) => page.locator('p-select-option');

test('should work with v-model:checked manually and programmatic', async ({ page }) => {
  await page.goto('/select-example-controlled-model');
  const host = getHost(page);
  const combobox = getCombobox(page);
  const dialog = getDialog(page);
  const options = getOptions(page);

  await expect(host).toHaveJSProperty('value', 'a');
  await expect(page.locator('[data-field="value"]')).toHaveText('a');

  await combobox.click();
  await expect(dialog).toBeVisible();
  await options.nth(1).click();

  await expect(host).toHaveJSProperty('value', 'b');
  await expect(page.locator('[data-field="value"]')).toHaveText('b');

  await page.getByRole('button', { name: 'Reset', exact: true }).click();

  await expect(host).toHaveJSProperty('value', '');
  await expect(page.locator('[data-field="value"]')).toHaveText('');
});
