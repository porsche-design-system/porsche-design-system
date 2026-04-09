import { expect, type Page, test } from '@playwright/test';
import {
  addEventListener,
  getEventSummary,
  setProperty,
  sleep,
} from '../../../../components-js/tests/e2e/helpers';
import { goto, waitForComponentsReady } from '../helpers';

const getHost = (page: Page) => page.locator('p-multi-select');
const getButton = (page: Page) => page.locator('p-multi-select button[role="combobox"]');
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

test.describe('optgroups', () => {
  test('should correctly reflect value when options inside optgroup change dynamically', async ({ page }) => {
    await goto(page, 'multi-select-example-dynamic-optgroup');
    await waitForComponentsReady(page);

    // Let the interval run for a few ticks so options appear
    await sleep(1500);

    // Sample the state multiple times while the interval is still running.
    // Each check reads value and displayed text atomically and compares them.
    // Without the fix, they'll be out of sync on at least one check.
    for (let i = 0; i < 10; i++) {
      await sleep(500);

      const { value, displayedText } = await page.evaluate(() => {
        const host = document.querySelector('p-multi-select') as any;
        const button = host?.shadowRoot?.querySelector('button[role="combobox"]');
        const span = button?.querySelector('span');
        return {
          value: host?.value as string[] | undefined,
          displayedText: span?.textContent ?? '',
        };
      });

      if (value && value.length > 0) {
        const expectedText = value.map((v: string) => `Option ${v.toUpperCase()}`).join(', ');
        expect(displayedText, `Check ${i}: displayed "${displayedText}" should match value "${expectedText}"`).toBe(
          expectedText
        );
      }
    }
  });
});
