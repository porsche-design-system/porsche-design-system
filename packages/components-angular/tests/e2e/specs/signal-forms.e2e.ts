import { expect, type Page, test } from '@playwright/test';

const patternComponents = [
  { tag: 'p-input-email', modelKey: 'inputEmail', initialValue: 'example@mail.com', nextValue: 'other@mail.com' },
  { tag: 'p-input-tel', modelKey: 'inputTel', initialValue: '+4971191125', nextValue: '+4971100000' },
  { tag: 'p-input-url', modelKey: 'inputUrl', initialValue: 'https://example.com', nextValue: 'https://porsche.com' },
];

const isFormValid = (page: Page, formId: string): Promise<boolean> =>
  page.locator(`#${formId}`).evaluate((form: HTMLFormElement) => form.checkValidity());

test.describe('Angular Signal Forms integration', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/signal-forms-example');
  });

  for (const { tag, modelKey, initialValue, nextValue } of patternComponents) {
    test(`${tag} renders the model value without a native pattern`, async ({ page }) => {
      const host = page.locator(`#all-components ${tag}`);

      await expect(host).toHaveJSProperty('value', initialValue);
      expect(await host.locator('input').getAttribute('pattern')).toBeNull();
      await expect.poll(() => isFormValid(page, 'all-components')).toBe(true);
    });

    test(`${tag} writes a typed value to the model and stays valid`, async ({ page }) => {
      await page.locator(`#all-components ${tag} input`).fill(nextValue);

      await expect(page.locator('[data-field="model"]')).toContainText(`"${modelKey}": "${nextValue}"`);
      await expect.poll(() => isFormValid(page, 'all-components')).toBe(true);
    });
  }

  test('p-input-number receives the min and max rules of its field', async ({ page }) => {
    const input = page.locator('#all-components p-input-number').first().locator('input');

    await expect(input).toHaveAttribute('min', '1');
    await expect(input).toHaveAttribute('max', '10');

    await input.fill('11');

    await expect.poll(() => isFormValid(page, 'all-components')).toBe(false);
  });

  test('p-input-number writes typed and cleared values to the model as text', async ({ page }) => {
    const hosts = page.locator('#all-components p-input-number');
    const numberField = hosts.nth(0).locator('input');
    const textField = hosts.nth(1).locator('input');
    const model = page.locator('[data-field="model"]');

    await numberField.fill('5');
    await textField.fill('7');

    await expect(model).toContainText('"inputNumber": "5"');
    await expect(model).toContainText('"inputNumberText": "7"');

    await numberField.fill('');
    await textField.fill('');

    await expect(model).toContainText('"inputNumber": ""');
    await expect(model).toContainText('"inputNumberText": ""');
  });

  test('p-input-email keeps a [pattern] bound next to [formField]', async ({ page }) => {
    const host = page.locator('#pattern-binding p-input-email');

    await expect(host).toHaveJSProperty('value', 'example@porsche.de');
    expect(await host.locator('input').getAttribute('pattern')).toBe('.+@porsche[.]de');

    await host.locator('input').fill('example@mail.com');

    await expect.poll(() => isFormValid(page, 'pattern-binding')).toBe(false);
  });
});
