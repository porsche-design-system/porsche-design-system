import type { Page } from 'playwright';
import { expect, test } from '@playwright/test';
import {
  addEventListener,
  getEventSummary,
  getLifecycleStatus,
  getOffsetWidth,
  getProperty,
  hasFocus,
  reattachElementHandle,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';

const getHost = (page: Page) => page.$('p-segmented-control');
const getFirstItemHost = (page: Page) => page.$('p-segmented-control-item');
const getSecondItemHost = (page: Page) => page.$('p-segmented-control-item:nth-child(2)');
const getFirstItemButton = (page: Page) => page.$('p-segmented-control-item button');
const getAllItemHosts = (page: Page) => page.$$('p-segmented-control-item');
const getAllItemButtons = async (page: Page) =>
  Promise.all(
    (await getAllItemHosts(page)).map(async (x) =>
      (await x.evaluateHandle((x) => x.shadowRoot.querySelector('button'))).asElement()
    )
  );

const getFirstItemOffsetWidth = async (page: Page): Promise<number> => getOffsetWidth(await getFirstItemHost(page));

const initSegmentedControl = (page: Page, opts?: { amount?: number; value?: number }): Promise<void> => {
  const { amount = 1, value } = opts || {};
  const items = Array.from(Array(amount))
    .map((_, i) => `<p-segmented-control-item value="${i + 1}">Option ${i + 1}</p-segmented-control-item>`)
    .join('\n');

  const content = `<p-segmented-control${value ? ` value="${value}"` : ''}>
  ${items}
</p-segmented-control>`;

  return setContentWithDesignSystem(page, content);
};

test.describe('width calculation', () => {
  test('should recalculate width on items when longest content is removed', async ({ page }) => {
    await initSegmentedControl(page, { amount: 6 });
    const secondItemHost = await getSecondItemHost(page);

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
    const host = await getHost(page);

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
    const firstItemHost = await getFirstItemHost(page);

    const initialItemWidth = await getFirstItemOffsetWidth(page);

    await firstItemHost.evaluate((el) => {
      el.innerHTML = 'Some Option with longer text';
    });
    await waitForStencilLifecycle(page);

    expect(await getFirstItemOffsetWidth(page)).toBeGreaterThan(initialItemWidth);
  });

  test('should recalculate width on items on label change', async ({ page }) => {
    await initSegmentedControl(page, { amount: 6 });
    const firstItemHost = await getFirstItemHost(page);

    await setProperty(firstItemHost, 'label', 'Some super long Label to extend the width');
    await waitForStencilLifecycle(page);

    const initialItemWidth = await getFirstItemOffsetWidth(page);

    await setProperty(firstItemHost, 'label', 'Some Label');
    await waitForStencilLifecycle(page);

    expect(await getFirstItemOffsetWidth(page)).toBeLessThan(initialItemWidth);
  });

  test('should recalculate width on items when icon is added', async ({ page }) => {
    await initSegmentedControl(page, { amount: 6 });
    const secondItemHost = await getSecondItemHost(page);

    const initialItemWidth = await getFirstItemOffsetWidth(page);

    await setProperty(secondItemHost, 'icon', 'truck');
    await waitForStencilLifecycle(page);

    expect(await getFirstItemOffsetWidth(page)).toBeGreaterThan(initialItemWidth);
  });

  test('should recalculate width on items when icon is removed', async ({ page }) => {
    await initSegmentedControl(page, { amount: 6 });
    const secondItemHost = await getSecondItemHost(page);

    await setProperty(secondItemHost, 'icon', 'truck');
    await waitForStencilLifecycle(page);

    const initialItemWidth = await getFirstItemOffsetWidth(page);

    await setProperty(secondItemHost, 'icon', undefined);
    await waitForStencilLifecycle(page);

    expect(await getFirstItemOffsetWidth(page)).toBeLessThan(initialItemWidth);
  });
});

test.describe('events', () => {
  test('should trigger event on item click which is not selected', async ({ page }) => {
    await initSegmentedControl(page, { amount: 2 });
    const host = await getHost(page);
    const [button1, button2] = await getAllItemButtons(page);

    await addEventListener(host, 'segmentedControlChange');

    // Remove and re-attach component to check if events are duplicated / fire at all
    await reattachElementHandle(host);

    await button2.click();
    expect((await getEventSummary(host, 'segmentedControlChange')).counter).toBe(1);

    await button1.click();
    expect((await getEventSummary(host, 'segmentedControlChange')).counter).toBe(2);
  });

  test('should not trigger event if item is disabled', async ({ page }) => {
    await initSegmentedControl(page, { amount: 2 });
    const host = await getHost(page);
    const secondItemHost = await getSecondItemHost(page);
    const [, button2] = await getAllItemButtons(page);

    await addEventListener(host, 'segmentedControlChange');

    await setProperty(secondItemHost, 'disabled', true);
    await waitForStencilLifecycle(page);

    await button2.click({ force: true });
    expect((await getEventSummary(host, 'segmentedControlChange')).counter).toBe(0);
  });

  test('should not trigger event if item is selected', async ({ page }) => {
    await initSegmentedControl(page, { value: 1 });
    const host = await getHost(page);
    const firstItemHost = await getFirstItemHost(page);
    const button = await getFirstItemButton(page);

    await addEventListener(host, 'segmentedControlChange');

    expect(await getProperty(firstItemHost, 'selected')).toBe(true);

    await button.click();
    expect((await getEventSummary(host, 'segmentedControlChange')).counter).toBe(0);
  });

  test('should emit both segmentedControlChange and update event', async ({ page }) => {
    await initSegmentedControl(page);
    const host = await getHost(page);

    await addEventListener(host, 'segmentedControlChange');
    await addEventListener(host, 'update');
    expect((await getEventSummary(host, 'segmentedControlChange')).counter).toBe(0);
    expect((await getEventSummary(host, 'update')).counter).toBe(0);

    const firstItemHost = await getFirstItemHost(page);
    await firstItemHost.click();
    expect((await getEventSummary(host, 'segmentedControlChange')).counter).toBe(1);
    expect((await getEventSummary(host, 'update')).counter).toBe(1);
  });
});

test.describe('keyboard', () => {
  test('should focus items when keyboard "tab" is pressed', async ({ page }) => {
    await setContentWithDesignSystem(
      page,
      `<a href="#">Some Link</a>
<p-segmented-control>
   <p-segmented-control-item value="1">Option 1</p-segmented-control-item>
   <p-segmented-control-item value="2" disabled="true">Option 1</p-segmented-control-item>
</p-segmented-control>
<a href="#">Some Link</a>`
    );
    const firstItemHost = await getFirstItemHost(page);
    const secondItemHost = await getSecondItemHost(page);
    const [firstAnchor, secondAnchor] = await page.$$('a');

    expect(await hasFocus(await page.$('body'))).toBe(true);

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
    const host = await getHost(page);

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
