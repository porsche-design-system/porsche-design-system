import { type Page, expect, test } from '@playwright/test';
import {
  addEventListener,
  getEventSummary,
  getFormDataValue,
  setProperty,
} from '../../../../components-js/tests/e2e/helpers';
import { goto, waitForComponentsReady } from '../helpers';

const getHost = (page: Page) => page.locator('p-input-password');
const getForm = (page: Page) => page.locator('form');
const getInputPassword = (page: Page) => page.locator('p-input-password input');

test.describe('form', () => {
  test('should reset input password value to its initial value on form reset', async ({ page }) => {
    await goto(page, 'input-password-example');
    expect(await waitForComponentsReady(page)).toBe(4); // p-input-password, p-text, 2 p-button

    const name = 'name';
    const newValue = 'New value';
    const host = getHost(page);
    const inputPassword = getInputPassword(page);
    const form = getForm(page);

    await addEventListener(form, 'submit');
    await expect.poll(async () => (await getEventSummary(form, 'submit')).counter).toBe(0);

    await inputPassword.fill(newValue);
    await inputPassword.press('Tab');

    await expect(host).toHaveJSProperty('value', newValue);
    await expect(inputPassword).toHaveValue(newValue);

    await page.locator('button[type="reset"]').click();

    await expect(host).toHaveJSProperty('value', '');
    await expect(inputPassword).toHaveValue('');

    await page.locator('button[type="submit"]').click(); // Check if ElementInternal value was reset as well

    await expect.poll(async () => (await getEventSummary(form, 'submit')).counter).toBe(1);
    expect(await getFormDataValue(form, name)).toBe(null);
  });

  test('should include name & value in FormData submit', async ({ page }) => {
    await goto(page, 'input-password-example');
    expect(await waitForComponentsReady(page)).toBe(4); // p-input-password, p-text, 2 p-button
    const host = getHost(page);
    const form = getForm(page);
    const testValue = 'test';
    await setProperty(host, 'value', testValue);
    await expect(host).toHaveJSProperty('value', testValue);

    await addEventListener(form, 'submit');
    await expect.poll(async () => (await getEventSummary(form, 'submit')).counter).toBe(0);

    await page.locator('button[type="submit"]').click();

    await expect.poll(async () => (await getEventSummary(form, 'submit')).counter).toBe(1);
    expect(await getFormDataValue(form, 'some-name')).toBe(testValue);
  });
});
