import { expect, type Page, test } from '@playwright/test';
import {
  addEventListener,
  getEventSummary,
  getFormDataValue,
  setProperty,
} from '../../../../components-js/tests/e2e/helpers';
import { goto, waitForComponentsReady } from '../helpers';

const getHost = (page: Page) => page.locator('p-select');
const getForm = (page: Page) => page.locator('form');

test.describe('form', () => {
  test('should reset select value to its initial value on form reset', async ({ page }) => {
    await goto(page, 'select-example');
    await waitForComponentsReady(page);
    const host = getHost(page);
    const newValue = 'b';
    await setProperty(host, 'value', newValue);
    await expect(host).toHaveJSProperty('value', newValue);

    await page.locator('button[type="reset"]').click();
    await expect(host).toHaveJSProperty('value', 'a');
  });

  test('should include name & value in FormData submit if updated programmatically', async ({ page }) => {
    await goto(page, 'select-example');
    await waitForComponentsReady(page);
    const host = getHost(page);
    const newValue = 'b';
    const form = getForm(page);

    await setProperty(host, 'value', newValue);

    await addEventListener(form, 'submit');
    await expect.poll(async () => (await getEventSummary(form, 'submit')).counter).toBe(0);

    await page.locator('button[type="submit"]').click();

    await expect.poll(async () => (await getEventSummary(form, 'submit')).counter).toBe(1);
    expect(await getFormDataValue(form, 'options')).toBe(newValue);
  });
});
