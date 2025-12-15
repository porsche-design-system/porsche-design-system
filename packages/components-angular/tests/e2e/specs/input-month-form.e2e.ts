import { expect, Page, test } from '@playwright/test';

const getHost = (page: Page) => page.locator('p-input-month');
const getInput = (page: Page) => page.locator('p-input-month input');

const setValue = async (page) => {
  const host = getHost(page);
  const input = getInput(page);

  await input.fill('2025-05');

  await expect(host).toHaveJSProperty('value', '2025-05');
};

test.describe('Angular forms integration', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/input-month-example-reactive-form');
    const host = getHost(page);

    await expect(page.locator('[data-field="touched"]')).toHaveText('false');
    await expect(page.locator('[data-field="dirty"]')).toHaveText('false');
    await expect(page.locator('[data-field="disabled"]')).toHaveText('false');
    await expect(page.locator('[data-field="value"]')).toHaveText('');
    await expect(page.locator('[data-field="valid"]')).toHaveText('false');

    await expect(host).toHaveJSProperty('value', '');
  });

  test('setting value manually updates form state correctly', async ({ page }) => {
    await setValue(page);

    await expect(page.locator('[data-field="touched"]')).toHaveText('false');
    await expect(page.locator('[data-field="dirty"]')).toHaveText('true');
    await expect(page.locator('[data-field="disabled"]')).toHaveText('false');
    await expect(page.locator('[data-field="value"]')).toHaveText('2025-05');
    await expect(page.locator('[data-field="valid"]')).toHaveText('true');

    await page.locator('[data-field="touched"]').click();

    await expect(page.locator('[data-field="touched"]')).toHaveText(/true/);
  });

  test('setting value programmatically updates form state correctly', async ({ page }) => {
    const host = getHost(page);

    await page.getByRole('button', { name: 'Set Value' }).click();

    await expect(host).toHaveJSProperty('value', '2025-10-24');

    await expect(page.locator('[data-field="touched"]')).toHaveText('false');
    await expect(page.locator('[data-field="dirty"]')).toHaveText('false');
    await expect(page.locator('[data-field="disabled"]')).toHaveText('false');
    await expect(page.locator('[data-field="value"]')).toHaveText('2025-10-24');
    await expect(page.locator('[data-field="valid"]')).toHaveText('true');
  });

  test('resetting form updates web component correctly', async ({ page }) => {
    const host = getHost(page);
    await setValue(page);

    await page.getByRole('button', { name: 'Reset', exact: true }).click();

    await expect(host).toHaveJSProperty('value', '');

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

    await expect(page.locator('[data-field="submitted"]')).toHaveText('{"myInputMonth":"2025-05"}');
  });
});
