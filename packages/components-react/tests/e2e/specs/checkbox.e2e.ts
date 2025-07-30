import { type Page, expect, test } from '@playwright/test';
import {
  addEventListener,
  getEventSummary,
  getFormDataValue,
  setProperty,
} from '../../../../components-js/tests/e2e/helpers';
import { goto, waitForComponentsReady } from '../helpers';

const getHost = (page: Page) => page.locator('p-checkbox');
const getForm = (page: Page) => page.locator('form');

test.describe('form', () => {
  test('should include name & value in FormData submit', async ({ page }) => {
    await goto(page, 'checkbox-example');
    expect(await waitForComponentsReady(page)).toBe(4); // p-checkbox and p-text + two p-buttons
    const host = getHost(page);
    const form = getForm(page);
    const testValue = 'test';
    await setProperty(host, 'value', testValue);
    await setProperty(host, 'checked', true);
    await expect(host).toHaveJSProperty('value', testValue);

    await addEventListener(form, 'submit');
    await expect.poll(async () => (await getEventSummary(form, 'submit')).counter).toBe(0);

    await page.locator('button[type="submit"]').click();

    await expect.poll(async () => (await getEventSummary(form, 'submit')).counter).toBe(1);
    expect(await getFormDataValue(form, 'some-name')).toBe(testValue);
  });

  test('should reset checkbox to its initial state on form reset', async ({ page }) => {
    await goto(page, 'checkbox-example');
    expect(await waitForComponentsReady(page)).toBe(4); // p-checkbox and p-text + two p-buttons
    const host = getHost(page);
    const form = getForm(page);
    const testValue = 'test';

    await expect(host).toHaveJSProperty('checked', false);

    await setProperty(host, 'value', testValue);
    await setProperty(host, 'checked', true);
    await expect(host).toHaveJSProperty('value', testValue);
    await expect(host).toHaveJSProperty('checked', true);

    await addEventListener(form, 'reset');
    await expect.poll(async () => (await getEventSummary(form, 'reset')).counter).toBe(0);

    await page.locator('button[type="reset"]').click();

    await expect.poll(async () => (await getEventSummary(form, 'reset')).counter).toBe(1);
    await expect(host).toHaveJSProperty('checked', false);
  });
});
