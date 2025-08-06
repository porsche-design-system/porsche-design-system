import { expect, type Page, test } from '@playwright/test';
import { addEventListener, getEventSummary, setProperty } from '../../../../components-js/tests/e2e/helpers';
import { goto, waitForComponentsReady } from '../helpers';

const getHost = (page: Page) => page.locator('p-multi-select');
const getForm = (page: Page) => page.locator('form');

test.describe('form', () => {
  test('should reset multi-select value to its initial value on form reset', async ({ page }) => {
    await goto(page, 'multi-select-example');
    await waitForComponentsReady(page);
    const host = getHost(page);
    const newValue = ['b'];
    await setProperty(host, 'value', newValue);
    await expect(host).toHaveJSProperty('value', newValue);

    await page.locator('button[type="reset"]').click();
    await expect(host).toHaveJSProperty('value', ['a']);
  });

  test('should include name & value in FormData submit if updated programmatically', async ({ page }) => {
    await goto(page, 'multi-select-example');
    await waitForComponentsReady(page);

    const value = ['a', 'b'];

    const host = getHost(page);
    const form = getForm(page);
    await setProperty(host, 'value', value);

    await addEventListener(form, 'submit');
    await expect.poll(async () => (await getEventSummary(form, 'submit')).counter).toBe(0);

    await page.locator('button[type="submit"]').click();

    await expect.poll(async () => (await getEventSummary(form, 'submit')).counter).toBe(1);
    await expect
      .poll(async () => {
        const lastSubmittedData = await page.locator('p-text').innerText();
        return lastSubmittedData.includes('a, b');
      })
      .toBe(true);
  });
});
