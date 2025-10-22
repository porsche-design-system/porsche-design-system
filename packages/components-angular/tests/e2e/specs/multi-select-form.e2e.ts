import { expect, Page, test } from '@playwright/test';

const getHost = (page: Page) => page.locator('p-multi-select');
const getCombobox = (page: Page) => page.locator('p-multi-select [role="combobox"]');
const getDialog = (page: Page) => page.locator('p-multi-select [role="dialog"]');
const getOptions = (page: Page) => page.locator('p-multi-select-option');

const setValue = async (page) => {
  const host = getHost(page);
  const combobox = getCombobox(page);
  const dialog = getDialog(page);
  const options = getOptions(page);

  await combobox.click();
  await expect(dialog).toBeVisible();
  await options.nth(0).click();
  await options.nth(1).click();
  await combobox.click(); // Close the dropdown
  await expect(dialog).toBeHidden();

  await expect(host).toHaveJSProperty('value', ['a', 'b']);
};

test.describe('Angular forms integration', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/multi-select-example-form');
    const host = getHost(page);

    await expect(page.locator('[data-field="touched"]')).toHaveText('false');
    await expect(page.locator('[data-field="dirty"]')).toHaveText('false');
    await expect(page.locator('[data-field="disabled"]')).toHaveText('false');
    await expect(page.locator('[data-field="value"]')).toHaveText('');
    await expect(page.locator('[data-field="valid"]')).toHaveText('false');

    await expect(host).toHaveJSProperty('value', []);
  });

  test('setting value manually updates form state correctly', async ({ page }) => {
    await setValue(page);

    await expect(page.locator('[data-field="touched"]')).toHaveText('false');
    await expect(page.locator('[data-field="dirty"]')).toHaveText('true');
    await expect(page.locator('[data-field="disabled"]')).toHaveText('false');
    await expect(page.locator('[data-field="value"]')).toHaveText("a,b");
    await expect(page.locator('[data-field="valid"]')).toHaveText('true');

    await page.locator('[data-field="touched"]').click();

    await expect(page.locator('[data-field="touched"]')).toHaveText(/true/);
  });

  test('setting value programmatically updates form state correctly', async ({ page }) => {
    const host = getHost(page);

    await page.getByRole('button', { name: 'Set Value' }).click();

    await expect(host).toHaveJSProperty('value', ['a']);

    await expect(page.locator('[data-field="touched"]')).toHaveText('false');
    await expect(page.locator('[data-field="dirty"]')).toHaveText('false');
    await expect(page.locator('[data-field="disabled"]')).toHaveText('false');
    await expect(page.locator('[data-field="value"]')).toHaveText(['a']);
    await expect(page.locator('[data-field="valid"]')).toHaveText('true');
  });

  test('resetting form updates web component correctly', async ({ page }) => {
    const host = getHost(page);
    await setValue(page);

    await page.getByRole('button', { name: 'Reset', exact: true }).click();

    await expect(host).toHaveJSProperty('value', []);

    await expect(page.locator('[data-field="touched"]')).toHaveText('false');
    await expect(page.locator('[data-field="dirty"]')).toHaveText('false');
    await expect(page.locator('[data-field="disabled"]')).toHaveText('false');
    await expect(page.locator('[data-field="value"]')).toHaveText('');
    await expect(page.locator('[data-field="valid"]')).toHaveText('false');
  });

  test('disabling form updates web component correctly', async ({ page }) => {
    const host = getHost(page);
    await expect(host).toHaveJSProperty('disabled', false);

    await page.getByRole('button', { name: 'Disable' }).click();

    await expect(host).toHaveJSProperty('disabled', true);

    await expect(page.locator('[data-field="touched"]')).toHaveText('false');
    await expect(page.locator('[data-field="dirty"]')).toHaveText('false');
    await expect(page.locator('[data-field="disabled"]')).toHaveText('true');
    await expect(page.locator('[data-field="value"]')).toHaveText('');
    await expect(page.locator('[data-field="valid"]')).toHaveText('false');
  });

  test('submitted form contains correct information', async ({ page }) => {
    await setValue(page);

    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page.locator('[data-field="submitted"]')).toHaveText('{"myMultiSelect":["a","b"]}');
  });
});
