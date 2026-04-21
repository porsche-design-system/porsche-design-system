import { expect, type Page, test } from '@playwright/test';
import {
  addEventListener,
  getEventSummary,
  setProperty,
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
  test('should reflect option appended into an already-mounted optgroup in the displayed value', async ({ page }) => {
    await goto(page, 'multi-select-example');
    await waitForComponentsReady(page);

    const host = getHost(page);

    // Step 1: mount an empty optgroup as a direct child of the multi-select.
    // The multi-select learns about the optgroup via slotchange on its own default slot.
    await page.evaluate(() => {
      const multiSelect = document.querySelector('p-multi-select')!;
      const optgroup = document.createElement('p-optgroup') as any;
      optgroup.label = 'Dynamic Group';
      multiSelect.appendChild(optgroup);
    });
    await waitForComponentsReady(page);

    // Step 2: append a new option INSIDE the already-mounted optgroup.
    // This mutation does not reach the multi-select's own slot — it only fires slotchange on
    // the optgroup's internal shadow slot. The multi-select therefore depends on the optgroup
    // forwarding its inner slotchange via the bubbling `internalOptgroupUpdate` event to learn
    // about the new option. Without that wiring its cached `multiSelectOptions` stays stale.
    await page.evaluate(() => {
      const optgroup = document.querySelector('p-multi-select p-optgroup')!;
      const newOption = document.createElement('p-multi-select-option') as any;
      newOption.value = 'new';
      newOption.textContent = 'Option NEW';
      optgroup.appendChild(newOption);
    });

    // Programmatically select the dynamically added option together with an existing one.
    await setProperty(host, 'value', ['a', 'new']);

    // Verify the displayed text reflects both selected values.
    // Without the fix, "new" is not in the cached options, so the displayed label stays as
    // "Option A" only.
    await expect
      .poll(async () =>
        page.evaluate(() => {
          const el = document.querySelector('p-multi-select') as any;
          const button = el?.shadowRoot?.querySelector('button[role="combobox"]');
          return button?.querySelector('span')?.textContent ?? '';
        })
      )
      .toBe('Option A, Option NEW');
  });
});
