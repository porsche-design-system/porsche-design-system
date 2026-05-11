
import { expect, Page, test } from '@playwright/test';

const getHost = (page: Page) => page.locator('p-multi-select');
const getCombobox = (page: Page) => page.locator('p-multi-select [role="combobox"]');
const getDialog = (page: Page) => page.locator('p-multi-select [role="dialog"]');
const getOptions = (page: Page) => page.locator('p-multi-select-option');

test('should work with v-model:value manually and programmatic', async ({ page }) => {
  await page.goto('/multi-select-example-controlled-model');
  const host = getHost(page);
  const combobox = getCombobox(page);
  const dialog = getDialog(page);
  const options = getOptions(page);

  await expect(host).toHaveJSProperty('value', []);
  await expect(page.locator('[data-field="value"]')).toHaveText('[]');

  await combobox.click();
  await expect(dialog).toBeVisible();
  await options.nth(0).click();
  await options.nth(1).click();
  await combobox.click(); // Close the dropdown
  await expect(dialog).toBeHidden();

  await expect(host).toHaveJSProperty('value', ['a', 'b']);
  await expect(page.locator('[data-field="value"]')).toHaveText(`[
    "a",
    "b"
  ]`);

  await page.getByRole('button', { name: 'Reset', exact: true }).click();

  await expect(host).toHaveJSProperty('value', []);
  await expect(page.locator('[data-field="value"]')).toHaveText('[]');
});
