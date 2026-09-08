import { Page, expect, test } from '@playwright/test';
import {
  addEventListener,
  getEventSummary,
  getFormDataValue,
  setProperty,
} from '../../../../components-js/tests/e2e/helpers';
import { goto, waitForComponentsReady } from '../helpers';

const getForm = (page: Page) => page.locator('form');
const getTextarea = (page: Page) => page.locator('p-textarea textarea');

test.describe('form', () => {
  test('should reset value to its initial value on form reset', async ({ page }) => {
    await goto(page, 'button-example-form-attribute');
    expect(await waitForComponentsReady(page)).toBe(4);

    const name = 'name';
    const newValue = 'New value';
    const textarea = getTextarea(page);
    const form = getForm(page);

    await addEventListener(form, 'submit');
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);

    await textarea.fill(newValue);
    await textarea.press('Tab');

    await expect(textarea).toHaveValue(newValue);

    await page.locator('button[type="reset"]').click();

    await expect(textarea).toHaveValue('');

    await page.locator('button[type="submit"]').click(); // Check if ElementInternal value was reset as well

    expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    expect(await getFormDataValue(form, name)).toBe(null);
  });

  test('should include name & value in FormData submit', async ({ page }) => {
    await goto(page, 'button-example-form-attribute');
    expect(await waitForComponentsReady(page)).toBe(4);

    const form = getForm(page);
    const textarea = getTextarea(page);
    const newValue = 'New value';

    await textarea.fill(newValue);
    await textarea.press('Tab');

    await addEventListener(form, 'submit');
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);

    await page.locator('button[type="submit"]').click();

    expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    expect(await getFormDataValue(form, 'some-name')).toBe(newValue);
  });
});
