import { expect, type Page, test } from '@playwright/test';
import {
  addEventListener,
  getEventSummary,
  getFormDataValue,
  setProperty,
  sleep,
} from '../../../../components-js/tests/e2e/helpers';
import { goto, waitForComponentsReady } from '../helpers';

const getHost = (page: Page) => page.locator('p-select');
const getButton = (page: Page) => page.locator('p-select button[role="combobox"]');
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

test.describe('optgroups', () => {
  test('should correctly reflect value when options inside optgroup change dynamically', async ({ page }) => {
    await goto(page, 'select-example-dynamic-optgroup');
    await waitForComponentsReady(page);

    // Let the interval run for a few ticks so options appear
    await sleep(1500);

    // Sample the state multiple times while the interval is still running.
    // Each check reads value and displayed text atomically and compares them.
    // Without the fix, they'll be out of sync on at least one check.
    for (let i = 0; i < 10; i++) {
      await sleep(500);

      const { value, displayedText } = await page.evaluate(() => {
        const host = document.querySelector('p-select') as any;
        const button = host?.shadowRoot?.querySelector('button[role="combobox"]');
        const span = button?.querySelector('span');
        return {
          value: host?.value as string | undefined,
          displayedText: span?.textContent ?? '',
        };
      });

      if (value) {
        expect(displayedText, `Check ${i}: displayed "${displayedText}" should match value "${value}"`).toBe(value);
      }
    }
  });
});
