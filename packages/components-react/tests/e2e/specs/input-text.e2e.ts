import { expect, type Page, test } from '@playwright/test';
import {
  addEventListener,
  getEventSummary,
  getFormDataValue,
  setProperty,
} from '../../../../components-js/tests/e2e/helpers';
import { goto, waitForComponentsReady } from '../helpers';

const getHost = (page: Page) => page.locator('p-input-text');
const getForm = (page: Page) => page.locator('form');
const getInputText = (page: Page) => page.locator('p-input-text input');

test.describe('form', () => {
  test('should reset input text value to its initial value on form reset', async ({ page }) => {
    await goto(page, 'input-text-example');
    expect(await waitForComponentsReady(page)).toBe(4); // p-input-text, p-text, 2 p-button

    const name = 'name';
    const newValue = '10';
    const host = getHost(page);
    const inputText = getInputText(page);
    const form = getForm(page);

    await addEventListener(form, 'submit');
    await expect.poll(async () => (await getEventSummary(form, 'submit')).counter).toBe(0);

    await inputText.fill(newValue);
    await inputText.press('Tab');

    await expect(host).toHaveJSProperty('value', newValue);
    await expect(inputText).toHaveValue(newValue);

    await page.locator('button[type="reset"]').click();

    await expect(host).toHaveJSProperty('value', '');
    await expect(inputText).toHaveValue('');

    await page.locator('button[type="submit"]').click(); // Check if ElementInternal value was reset as well

    await expect.poll(async () => (await getEventSummary(form, 'submit')).counter).toBe(1);
    expect(await getFormDataValue(form, name)).toBe(null);
  });

  test('should include name & value in FormData submit', async ({ page }) => {
    await goto(page, 'input-text-example');
    expect(await waitForComponentsReady(page)).toBe(4); // p-input-text, p-text, 2 p-button
    const host = getHost(page);
    const form = getForm(page);
    const testValue = '10';
    await setProperty(host, 'value', testValue);
    await expect(host).toHaveJSProperty('value', testValue);

    await addEventListener(form, 'submit');
    await expect.poll(async () => (await getEventSummary(form, 'submit')).counter).toBe(0);

    await page.locator('button[type="submit"]').click();

    await expect.poll(async () => (await getEventSummary(form, 'submit')).counter).toBe(1);
    expect(await getFormDataValue(form, 'some-name')).toBe(testValue);
  });
});

test.describe('controlled input', () => {
  test('should be possible to prevent user input by setting host value', async ({ page }) => {
    await goto(page, 'input-text-example-controlled');
    const host = getHost(page);
    const input = getInputText(page);

    await expect(host).toHaveJSProperty('value', '');
    await expect(input).toHaveValue('');

    await input.fill('abcde');

    // Input is limited to three characters in example
    await expect(host).toHaveJSProperty('value', 'abc');
    await expect(input).toHaveValue('abc');

    await page.keyboard.press('d');

    await expect(host).toHaveJSProperty('value', 'abc');
    await expect(input).toHaveValue('abc');
  });
});
