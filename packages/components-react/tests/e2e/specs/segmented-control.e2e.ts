import { Page, expect, test } from '@playwright/test';
import {
  addEventListener,
  getEventSummary,
  getFormDataValue,
  setProperty,
} from '../../../../components-js/tests/e2e/helpers';
import { goto, waitForComponentsReady } from '../helpers';

const getHost = (page: Page) => page.locator('p-segmented-control');
const getForm = (page: Page) => page.locator('form');
const getFirstItemButton = (page: Page) => page.locator('p-segmented-control-item button').nth(1);

test.describe('form', () => {
  test('should reset segmented-control value to its initial value on form reset', async ({ page }) => {
    await goto(page, 'segmented-control-example');
    await waitForComponentsReady(page);

    const newValue = 2;
    const host = getHost(page);

    const button = getFirstItemButton(page);
    await button.click();
    await expect(host).toHaveJSProperty('value', newValue);

    await page.locator('button[type="reset"]').click();
    await expect(host).toHaveJSProperty('value', 1);
  });

  test('should include name & value in FormData submit if updated programmatically', async ({ page }) => {
    await goto(page, 'segmented-control-example');
    await waitForComponentsReady(page);

    const host = getHost(page);
    const newValue = 2;
    const form = getForm(page);

    await setProperty(host, 'value', newValue);

    await addEventListener(form, 'submit');
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);

    await page.locator('button[type="submit"]').click();

    expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    expect(await getFormDataValue(form, 'options')).toBe(newValue.toString());
  });
});
