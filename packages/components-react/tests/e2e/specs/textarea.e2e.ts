import { expect, Page, test } from '@playwright/test';
import {
  addEventListener,
  getEventSummary,
  getFormDataValue,
  setProperty,
} from '../../../../components-js/tests/e2e/helpers';
import { goto, waitForComponentsReady } from '../helpers';

const getHost = (page: Page) => page.locator('p-textarea');
const getForm = (page: Page) => page.locator('form');
const getTextarea = (page: Page) => page.locator('p-textarea textarea');

test.describe('form', () => {
  test('should reset textarea value to its initial value on form reset', async ({ page }) => {
    await goto(page, 'textarea-example');
    expect(await waitForComponentsReady(page)).toBe(2); // p-textarea and p-text

    const name = 'name';
    const newValue = 'New value';
    const host = getHost(page);
    const textarea = getTextarea(page);
    const form = getForm(page);

    await addEventListener(form, 'submit');
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);

    await textarea.fill(newValue);
    await textarea.press('Tab');

    await expect(host).toHaveJSProperty('value', newValue);
    await expect(textarea).toHaveValue(newValue);

    await page.locator('button[type="reset"]').click();

    await expect(host).toHaveJSProperty('value', '');
    await expect(textarea).toHaveValue('');

    await page.locator('button[type="submit"]').click(); // Check if ElementInternal value was reset as well

    expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    expect(await getFormDataValue(form, name)).toBe(null);
  });

  test('should include name & value in FormData submit', async ({ page }) => {
    await goto(page, 'textarea-example');
    expect(await waitForComponentsReady(page)).toBe(2); // p-textarea and p-text
    const host = getHost(page);
    const form = getForm(page);
    const testValue = 'test';
    await setProperty(host, 'value', testValue);
    await expect(host).toHaveJSProperty('value', testValue);

    await addEventListener(form, 'submit');
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);

    await page.locator('button[type="submit"]').click();

    expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    expect(await getFormDataValue(form, 'some-name')).toBe(testValue);
  });
});
