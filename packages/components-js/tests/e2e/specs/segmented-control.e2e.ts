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
const getFieldset = (page: Page) => page.locator('fieldset');
const getAllItemButtons = async (page: Page) =>
  Promise.all(
    (await getAllItemHosts(page)).map(async (x) =>
      (await x.evaluateHandle((x) => x.shadowRoot.querySelector('button'))).asElement()
    )
  );
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

test.describe('events', () => {
  test('should trigger event on item click which is not selected', async ({ page }) => {
    await initSegmentedControl(page, { amount: 2 });
    const host = getHost(page);
    const [button1, button2] = await getAllItemButtons(page);

    await addEventListener(host, 'segmentedControlChange');

    // Remove and re-attach component to check if events are duplicated / fire at all
    await reattachElement(host);

    await button2.click();
    expect((await getEventSummary(host, 'segmentedControlChange')).counter).toBe(1);

    await button1.click();
    expect((await getEventSummary(host, 'segmentedControlChange')).counter).toBe(2);
  });

  test('should not trigger event if item is disabled', async ({ page }) => {
    await initSegmentedControl(page, { amount: 2 });
    const host = getHost(page);
    const secondItemHost = getSecondItemHost(page);
    const [, button2] = await getAllItemButtons(page);

    await addEventListener(host, 'segmentedControlChange');

    await setProperty(secondItemHost, 'disabled', true);
    await waitForStencilLifecycle(page);

    await button2.click({ force: true });
    expect((await getEventSummary(host, 'segmentedControlChange')).counter).toBe(0);
  });

  test('should not trigger event if item is selected', async ({ page }) => {
    await initSegmentedControl(page, { props: { value: 1 } });
    const host = getHost(page);
    const firstItemHost = getFirstItemHost(page);
    const button = getFirstItemButton(page);

    await addEventListener(host, 'segmentedControlChange');

    expect(await getProperty<boolean>(firstItemHost, 'selected')).toBe(true);

    await button.click();
    expect((await getEventSummary(host, 'segmentedControlChange')).counter).toBe(0);
  });

  test('should emit both segmentedControlChange and update event', async ({ page }) => {
    await initSegmentedControl(page);
    const host = getHost(page);

    await addEventListener(host, 'segmentedControlChange');
    await addEventListener(host, 'update');
    expect((await getEventSummary(host, 'segmentedControlChange')).counter).toBe(0);
    expect((await getEventSummary(host, 'update')).counter).toBe(0);

    const firstItemHost = getFirstItemHost(page);
    await firstItemHost.click();
    expect((await getEventSummary(host, 'segmentedControlChange')).counter).toBe(1);
    expect((await getEventSummary(host, 'update')).counter).toBe(1);
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

    await setProperty(host, 'backgroundColor', 'background-surface');
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
    const fieldset = getFieldset(page);
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
    await addEventListener(host, 'segmentedControlChange');
    await expect(host).toHaveJSProperty('disabled', true);

    await setProperty(host, 'disabled', false);
    await waitForStencilLifecycle(page);

    await expect(host).toHaveJSProperty('disabled', false);
    await button1.click();
    expect((await getEventSummary(host, 'segmentedControlChange')).counter).toBe(1);

    await button2.click();
    expect((await getEventSummary(host, 'segmentedControlChange')).counter).toBe(2);
  });
});
