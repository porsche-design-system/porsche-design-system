import { expect, type Page, test } from '@playwright/test';
import {
  addEventListener,
  getEventSummary,
  getFormDataValue,
  setProperty,
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
  test('should reflect option appended into an already-mounted optgroup in the displayed value', async ({ page }) => {
    await goto(page, 'select-example');
    await waitForComponentsReady(page);

    const host = getHost(page);

    // Step 1: mount an empty optgroup as a direct child of the select.
    // The select learns about the optgroup via slotchange on its own default slot.
    await page.evaluate(() => {
      const select = document.querySelector('p-select')!;
      const optgroup = document.createElement('p-optgroup') as any;
      optgroup.label = 'Dynamic Group';
      select.appendChild(optgroup);
    });
    await waitForComponentsReady(page);

    // Step 2: append a new option INSIDE the already-mounted optgroup.
    // This mutation does not reach the select's own slot — it only fires slotchange on the
    // optgroup's internal shadow slot. The select therefore depends on the optgroup forwarding
    // its inner slotchange via the bubbling `internalOptgroupUpdate` event to learn about
    // the new option. Without that wiring its cached `selectOptions` stays stale.
    await page.evaluate(() => {
      const optgroup = document.querySelector('p-select p-optgroup')!;
      const newOption = document.createElement('p-select-option') as any;
      newOption.value = 'new';
      newOption.textContent = 'Option NEW';
      optgroup.appendChild(newOption);
    });

    // Programmatically select the dynamically added option.
    await setProperty(host, 'value', 'new');

    // Verify the displayed text reflects the selected value.
    // Without the fix, "new" is not in the cached options, so `selectedOption` becomes null
    // and the displayed span is empty.
    await expect
      .poll(async () =>
        page.evaluate(() => {
          const el = document.querySelector('p-select') as any;
          const button = el?.shadowRoot?.querySelector('button[role="combobox"]');
          return button?.querySelector('span')?.textContent ?? '';
        })
      )
      .toBe('Option NEW');
  });
});
