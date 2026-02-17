import { expect, test } from '@playwright/test';
import { Components } from '@porsche-design-system/components';
import type { Page } from 'playwright';
import {
  addEventListener,
  getEventSummary,
  getFormDataValue,
  getHTMLAttributes,
  getLifecycleStatus,
  getOffsetWidth,
  getProperty,
  hasFocus,
  reattachElement,
  setContentWithDesignSystem,
  setProperty,
  skipInBrowsers,
  waitForStencilLifecycle,
} from '../helpers';

const getHost = (page: Page) => page.locator('p-segmented-control');
const getFirstItemHost = (page: Page) => page.locator('p-segmented-control-item').first();
const getSecondItemHost = (page: Page) => page.locator('p-segmented-control-item:nth-child(2)');
const getFirstItemButton = (page: Page) => page.locator('p-segmented-control-item button').first();
const getAllItemHosts = (page: Page) => page.locator('p-segmented-control-item').all();
const getOuterFieldset = (page: Page) => page.locator('fieldset').first();
const getAllItemButtons = async (page: Page) =>
  Promise.all(
    (await getAllItemHosts(page)).map(async (x) =>
      (await x.evaluateHandle((x) => x.shadowRoot.querySelector('button'))).asElement()
    )
  );
const getSegmentedControlItems = (page: Page) => page.locator('p-segmented-control-item');
const getForm = (page: Page) => page.locator('form');

const getFirstItemOffsetWidth = async (page: Page): Promise<number> => getOffsetWidth(getFirstItemHost(page));

type InitOptions = {
  props?: Components.PSegmentedControl;
  isWithinForm?: boolean;
  markupBefore?: string;
  markupAfter?: string;
  amount?: number;
};

const initSegmentedControl = (page: Page, opts?: InitOptions): Promise<void> => {
  const { props = {}, isWithinForm = false, markupBefore = '', markupAfter = '', amount = 1 } = opts || {};

  const items = Array.from(Array(amount))
    .map((_, i) => `<p-segmented-control-item value="${i + 1}">Option ${i + 1}</p-segmented-control-item>`)
    .join('\n');

  const content = `<p-segmented-control ${getHTMLAttributes(props)}>
  ${items}
</p-segmented-control>`;

  const markup = `${markupBefore}${content}${markupAfter}`;

  return setContentWithDesignSystem(page, isWithinForm ? `<form onsubmit="return false;">${markup}</form>` : markup);
};

test.describe('width calculation', () => {
  test('should recalculate width on items when longest content is removed', async ({ page }) => {
    await initSegmentedControl(page, { amount: 6 });
    const secondItemHost = getSecondItemHost(page);

    // Extend content of second item
    await secondItemHost.evaluate((el) => (el.innerHTML = 'Option 2 longer'));
    await waitForStencilLifecycle(page);

    const initialItemWidth = await getFirstItemOffsetWidth(page);

    await secondItemHost.evaluate((el) => el.remove());
    await waitForStencilLifecycle(page);

    expect(await getFirstItemOffsetWidth(page)).toBeLessThan(initialItemWidth);
  });

  test('should recalculate width on items when new item with longer content is added', async ({ page }) => {
    await initSegmentedControl(page, { amount: 6 });
    const host = getHost(page);

    const initialItemWidth = await getFirstItemOffsetWidth(page);

    await host.evaluate((el) => {
      const segmentedControlItem = document.createElement('p-segmented-control-item');
      segmentedControlItem.innerHTML = 'Some Option with longer text';
      el.appendChild(segmentedControlItem);
    });
    await waitForStencilLifecycle(page);

    expect(await getFirstItemOffsetWidth(page)).toBeGreaterThan(initialItemWidth);
  });

  test('should recalculate width on items when content changes', async ({ page }) => {
    await initSegmentedControl(page, { amount: 6 });
    const firstItemHost = getFirstItemHost(page);

    const initialItemWidth = await getFirstItemOffsetWidth(page);

    await firstItemHost.evaluate((el) => {
      el.innerHTML = 'Some Option with longer text';
    });
    await waitForStencilLifecycle(page);

    expect(await getFirstItemOffsetWidth(page)).toBeGreaterThan(initialItemWidth);
  });

  test('should recalculate width on items on label change', async ({ page }) => {
    await initSegmentedControl(page, { amount: 6 });
    const firstItemHost = getFirstItemHost(page);

    await setProperty(firstItemHost, 'label', 'Some super long Label to extend the width');
    await waitForStencilLifecycle(page);

    const initialItemWidth = await getFirstItemOffsetWidth(page);

    await setProperty(firstItemHost, 'label', 'Some Label');
    await waitForStencilLifecycle(page);

    expect(await getFirstItemOffsetWidth(page)).toBeLessThan(initialItemWidth);
  });

  test('should recalculate width on items when icon is added', async ({ page }) => {
    await initSegmentedControl(page, { amount: 6 });
    const secondItemHost = getSecondItemHost(page);

    const initialItemWidth = await getFirstItemOffsetWidth(page);

    await setProperty(secondItemHost, 'icon', 'truck');
    await waitForStencilLifecycle(page);

    expect(await getFirstItemOffsetWidth(page)).toBeGreaterThan(initialItemWidth);
  });

  test('should recalculate width on items when icon is removed', async ({ page }) => {
    await initSegmentedControl(page, { amount: 6 });
    const secondItemHost = getSecondItemHost(page);

    await setProperty(secondItemHost, 'icon', 'truck');
    await waitForStencilLifecycle(page);

    const initialItemWidth = await getFirstItemOffsetWidth(page);

    await setProperty(secondItemHost, 'icon', undefined);
    await waitForStencilLifecycle(page);

    await expect
      .poll(async () => {
        const el = getFirstItemHost(page);
        return await el.evaluate((el: HTMLElement) => el.offsetWidth);
      })
      .toBeLessThan(initialItemWidth);
  });
});

test.describe('change event', () => {
  test('should emit change event when a valid selection is made by click', async ({ page }) => {
    await initSegmentedControl(page, { amount: 2 });
    const host = getHost(page);
    await addEventListener(host, 'change');
    const items = getSegmentedControlItems(page);

    await expect(host).toHaveJSProperty('value', undefined);

    expect((await getEventSummary(host, 'change')).counter, 'before item was selected').toBe(0);

    await items.nth(0).click();
    await expect(items.nth(0)).toBeFocused();
    await expect(host).toHaveJSProperty('value', '1');

    expect((await getEventSummary(host, 'change')).counter, 'after first item was selected').toBe(1);
    expect((await getEventSummary(host, 'change')).details, 'after first item was selected').toEqual([
      {
        value: '1',
      },
    ]);

    await items.nth(1).click();
    await expect(items.nth(1)).toBeFocused();
    await expect(host).toHaveJSProperty('value', '2');

    expect((await getEventSummary(host, 'change')).counter, 'after second item was selected').toBe(2);
    expect((await getEventSummary(host, 'change')).details, 'after second item was selected').toEqual([
      {
        value: '1',
      },
      {
        value: '2',
      },
    ]);
  });

  test('should emit change event when a valid selection is made by keyboard', async ({ page }) => {
    await initSegmentedControl(page, { amount: 2 });
    const host = getHost(page);
    await addEventListener(host, 'change');
    const items = getSegmentedControlItems(page);

    await expect(host).toHaveJSProperty('value', undefined);

    expect((await getEventSummary(host, 'change')).counter, 'before item was selected').toBe(0);

    await page.keyboard.press('Tab');
    await expect(items.nth(0)).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(host).toHaveJSProperty('value', '1');

    expect((await getEventSummary(host, 'change')).counter, 'after first item was selected').toBe(1);
    expect((await getEventSummary(host, 'change')).details, 'after first item was selected').toEqual([
      {
        value: '1',
      },
    ]);

    await page.keyboard.press('Tab');
    await expect(items.nth(1)).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(host).toHaveJSProperty('value', '2');

    expect((await getEventSummary(host, 'change')).counter, 'after second item was selected').toBe(2);
    expect((await getEventSummary(host, 'change')).details, 'after second item was selected').toEqual([
      {
        value: '1',
      },
      {
        value: '2',
      },
    ]);
  });

  test('should not emit change event when a disabled item is selected by click', async ({ page }) => {
    await initSegmentedControl(page, { amount: 2 });
    const host = getHost(page);
    await addEventListener(host, 'change');
    const items = getSegmentedControlItems(page);
    await setProperty(items.nth(0), 'disabled', true);
    await expect(items.nth(0)).toHaveJSProperty('disabled', true);

    await expect(host).toHaveJSProperty('value', undefined);

    expect((await getEventSummary(host, 'change')).counter, 'before item was selected').toBe(0);

    await items.nth(0).click();
    await expect(host).toHaveJSProperty('value', undefined);

    expect((await getEventSummary(host, 'change')).counter, 'after disabled item was clicked').toBe(0);
  });
});

test.describe('blur event', () => {
  test('should emit blur event when focus of an item is lost by mouse click', async ({ page }) => {
    await initSegmentedControl(page, { amount: 2, markupAfter: '<button id="test-button">Some button</button>' });
    const host = getHost(page);
    await addEventListener(host, 'blur');
    const item = getFirstItemHost(page);
    const button = page.locator('#test-button');

    await item.click();
    await expect(item).toBeFocused();

    expect((await getEventSummary(host, 'blur')).counter, 'before item lost focus').toBe(0);

    await button.click();
    await expect(button).toBeFocused();

    expect((await getEventSummary(host, 'blur')).counter, 'after input lost focus').toBe(1);
  });

  test('should not emit blur event when focus is moved to next item by click', async ({ page }) => {
    await initSegmentedControl(page, { amount: 2, markupAfter: '<button id="test-button">Some button</button>' });
    const host = getHost(page);
    await addEventListener(host, 'blur');
    const items = getSegmentedControlItems(page);
    const button = page.locator('#test-button');

    await items.nth(0).click();
    await expect(items.nth(0)).toBeFocused();

    expect((await getEventSummary(host, 'blur')).counter, 'after 1st item got focus').toBe(0);

    await items.nth(1).click();
    await expect(items.nth(1)).toBeFocused();

    expect((await getEventSummary(host, 'blur')).counter, 'after 2nd item got focus').toBe(0);

    await button.click();
    await expect(button).toBeFocused();

    expect((await getEventSummary(host, 'blur')).counter, 'after 2nd item lost focus').toBe(1);
  });

  test('should emit blur event when focus of an input is lost by keyboard', async ({ page }) => {
    await initSegmentedControl(page, { amount: 2, markupAfter: '<button id="test-button">Some button</button>' });
    const host = getHost(page);
    await addEventListener(host, 'blur');
    const items = getSegmentedControlItems(page);
    const button = page.locator('#test-button');

    await page.keyboard.press('Tab');
    await expect(items.nth(0)).toBeFocused();

    expect((await getEventSummary(host, 'blur')).counter, 'after 1st item got focus').toBe(0);

    await page.keyboard.press('Tab');
    await expect(items.nth(1)).toBeFocused();

    expect((await getEventSummary(host, 'blur')).counter, 'after 2nd item got focus').toBe(0);

    await page.keyboard.press('Tab');
    await expect(button).toBeFocused();
    expect((await getEventSummary(host, 'blur')).counter, 'after 2nd item lost focus').toBe(1);
  });
});

test.describe('keyboard', () => {
  skipInBrowsers(['firefox', 'webkit']);
  test('should focus items when keyboard "tab" is pressed', async ({ page }) => {
    await setContentWithDesignSystem(
      page,
      `<a href="#">Some Link</a>
<p-segmented-control>
   <p-segmented-control-item value="1">Option 1</p-segmented-control-item>
   <p-segmented-control-item value="2" disabled="true">Option 2</p-segmented-control-item>
</p-segmented-control>
<a href="#">Some Link</a>`
    );
    const firstItemHost = getFirstItemHost(page);
    const secondItemHost = getSecondItemHost(page);
    const [firstAnchor, secondAnchor] = await page.locator('a').all();

    expect(await hasFocus(page.locator('body'))).toBe(true);

    await page.keyboard.press('Tab');
    expect(await hasFocus(firstAnchor)).toBe(true);

    await page.keyboard.press('Tab');
    expect(await hasFocus(firstItemHost)).toBe(true);

    await page.keyboard.press('Tab');
    expect(await hasFocus(secondItemHost)).toBe(true);

    await page.keyboard.press('Tab');
    expect(await hasFocus(secondAnchor)).toBe(true);
  });
});

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initSegmentedControl(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-segmented-control'], 'componentDidLoad: p-segmented-control').toBe(1);
    expect(status.componentDidLoad['p-segmented-control-item'], 'componentDidLoad: p-segmented-control-item').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(2);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  test('should work without unnecessary round trips on prop change', async ({ page }) => {
    await initSegmentedControl(page);
    const host = getHost(page);

    await setProperty(host, 'compact', true);
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-segmented-control'], 'componentDidUpdate: p-segmented-control').toBe(1);
    expect(status.componentDidUpdate['p-segmented-control-item'], 'componentDidUpdate: p-segmented-control-item').toBe(
      1
    );

    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(2);
  });
});

test.describe('form', () => {
  test('should include name & value in FormData submit', async ({ page }) => {
    const name = 'name';
    const value = '2';
    await initSegmentedControl(page, {
      props: { name, value },
      isWithinForm: true,
      markupAfter: '<button type="submit">Submit</button>',
    });
    const form = getForm(page);

    await addEventListener(form, 'submit');
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);

    await page.locator('button[type="submit"]').click();

    expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    expect(await getFormDataValue(form, name)).toBe(value);
  });

  test('should have correct form value when changing value dynamically', async ({ page }) => {
    const name = 'name';
    const value = '2';
    const newValue = '1';
    await initSegmentedControl(page, {
      props: { name, value },
      isWithinForm: true,
      markupAfter: '<button type="submit">Submit</button>',
    });
    const form = getForm(page);
    const host = getHost(page);

    await addEventListener(form, 'submit');
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);

    await setProperty(host, 'value', newValue);
    await waitForStencilLifecycle(page);

    await page.locator('button[type="submit"]').click();

    await expect(host).toHaveJSProperty('value', newValue);
    expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    expect(await getFormDataValue(form, name)).toBe(newValue);
  });

  test('should include name & value in FormData submit if outside of form', async ({ page }) => {
    const name = 'name';
    const value = 'Hallo';
    const formId = 'myForm';
    await initSegmentedControl(page, {
      props: { name, value, form: formId },
      markupBefore: `<form id="myForm" onsubmit="return false;"><button type="submit">Submit</button></form>`,
    });
    const form = getForm(page);

    await addEventListener(form, 'submit');
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);

    await page.locator('button[type="submit"]').click();

    expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    expect(await getFormDataValue(form, name)).toBe(value);
  });

  test('should reset segmented-control value to its initial value on form reset', async ({ page }) => {
    const name = 'name';
    const value = '2';
    const newValue = '1';
    const host = getHost(page);
    await initSegmentedControl(page, {
      props: { name, value },
      amount: 3,
      isWithinForm: true,
      markupAfter: `
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      `,
    });
    const form = getForm(page);
    const button = getFirstItemButton(page);

    await addEventListener(form, 'submit');
    expect((await getEventSummary(form, 'submit')).counter).toBe(0);

    await button.click();
    await waitForStencilLifecycle(page);

    await expect(host).toHaveJSProperty('value', newValue);

    await page.locator('button[type="reset"]').click();

    await expect(host).toHaveJSProperty('value', value);

    await page.locator('button[type="submit"]').click(); // Check if ElementInternal value was reset as well

    expect((await getEventSummary(form, 'submit')).counter).toBe(1);
    expect(await getFormDataValue(form, name)).toBe(value);
  });

  test('should disable segmented-control if within disabled fieldset', async ({ page }) => {
    const name = 'name';
    const value = 'Hallo';
    const host = getHost(page);
    await initSegmentedControl(page, {
      props: { name, value },
      isWithinForm: true,
      markupBefore: `<fieldset disabled>`,
      markupAfter: `</fieldset>`,
    });

    await expect(host).toHaveJSProperty('disabled', true);
  });

  test('should sync disabled state with fieldset when updated programmatically', async ({ page }) => {
    await initSegmentedControl(page, {
      isWithinForm: true,
      markupBefore: `<fieldset disabled>`,
      markupAfter: `</fieldset>`,
    });
    const host = getHost(page);
    const fieldset = getOuterFieldset(page);
    await expect(fieldset).toHaveJSProperty('disabled', true);
    await expect(host).toHaveJSProperty('disabled', true);

    await setProperty(fieldset, 'disabled', false);
    await waitForStencilLifecycle(page);

    await expect(fieldset).toHaveJSProperty('disabled', false);
    await expect(host).toHaveJSProperty('disabled', false);
  });

  test('should allow item clicks when the control is programmatically re-enabled after being disabled', async ({
    page,
  }) => {
    await initSegmentedControl(page, { amount: 2, props: { disabled: true } });
    const host = getHost(page);
    const [button1, button2] = await getAllItemButtons(page);
    await addEventListener(host, 'change');
    await expect(host).toHaveJSProperty('disabled', true);

    await setProperty(host, 'disabled', false);
    await waitForStencilLifecycle(page);

    await expect(host).toHaveJSProperty('disabled', false);
    await button1.click();
    expect((await getEventSummary(host, 'change')).counter).toBe(1);

    await button2.click();
    expect((await getEventSummary(host, 'change')).counter).toBe(2);
  });
});
