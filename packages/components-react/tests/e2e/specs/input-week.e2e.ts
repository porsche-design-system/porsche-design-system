import { Page, expect, test } from '@playwright/test';
import {
  addEventListener,
  getEventSummary,
  getFormDataValue,
  setProperty,
} from '../../../../components-js/tests/e2e/helpers';
import { goto, waitForComponentsReady } from '../helpers';

const getHost = (page: Page) => page.locator('p-input-week');
const getForm = (page: Page) => page.locator('form');
const getInputWeek = (page: Page) => page.locator('p-input-week input');

test.describe('form', () => {
  test('should reset input date value to its initial value on form reset', async ({ page }) => {
    await goto(page, 'input-week-example');
    expect(await waitForComponentsReady(page)).toBe(4); // p-input-week, p-text, 2 p-button

    const name = 'name';
    const newValue = '2025-W26';
    const host = getHost(page);
    const inputWeek = getInputWeek(page);
    const form = getForm(page);

    await addEventListener(form, 'submit');
    await expect.poll(async () => (await getEventSummary(form, 'submit')).counter).toBe(0);

    await inputWeek.fill(newValue);
    await inputWeek.press('Tab');

    await expect(host).toHaveJSProperty('value', newValue);
    await expect(inputWeek).toHaveValue(newValue);

    await page.locator('button[type="reset"]').click();

    await expect(host).toHaveJSProperty('value', '');
    await expect(inputWeek).toHaveValue('');

    await page.locator('button[type="submit"]').click(); // Check if ElementInternal value was reset as well

    await expect.poll(async () => (await getEventSummary(form, 'submit')).counter).toBe(1);
    expect(await getFormDataValue(form, name)).toBe(null);
  });

  test('should include name & value in FormData submit', async ({ page }) => {
    await goto(page, 'input-week-example');
    expect(await waitForComponentsReady(page)).toBe(4); // p-input-week, p-text, 2 p-button
    const host = getHost(page);
    const form = getForm(page);
    const testValue = '2025-W26';
    await setProperty(host, 'value', testValue);
    await expect(host).toHaveJSProperty('value', testValue);

    await addEventListener(form, 'submit');
    await expect.poll(async () => (await getEventSummary(form, 'submit')).counter).toBe(0);

    await page.locator('button[type="submit"]').click();

    await expect.poll(async () => (await getEventSummary(form, 'submit')).counter).toBe(1);
    expect(await getFormDataValue(form, 'some-name')).toBe(testValue);
  });
});
