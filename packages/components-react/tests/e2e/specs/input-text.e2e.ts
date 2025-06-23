import { Page, expect, test } from '@playwright/test';
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
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);

    await inputText.fill(newValue);
    await inputText.press('Tab');

    await expect(host).toHaveJSProperty('value', newValue);
    await expect(inputText).toHaveValue(newValue);

    await page.locator('button[type="reset"]').click();

    await expect(host).toHaveJSProperty('value', '');
    await expect(inputText).toHaveValue('');

    await page.locator('button[type="submit"]').click(); // Check if ElementInternal value was reset as well

    expect((await getEventSummary(form, 'submit')).counter).toBe(1);
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
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);

    await page.locator('button[type="submit"]').click();

    expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    expect(await getFormDataValue(form, 'some-name')).toBe(testValue);
  });

  test('should not decrement value on wheel down', async ({ page }) => {
    await goto(page, 'input-text-example');
    await waitForComponentsReady(page);
    const value = '42';

    const input = getInputText(page);
    await input.fill(value);
    await input.focus();

    const rect = await input.boundingBox();
    if (!rect) throw new Error('could not read input bounding box');
    await page.mouse.move(rect.x + rect.width / 2, rect.y + rect.height / 2);

    await page.mouse.wheel(0, 100);
    await page.waitForTimeout(40);

    await expect(input).toHaveValue(value);
  });
});
