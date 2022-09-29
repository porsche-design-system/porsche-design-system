import {
  addEventListener,
  expectA11yToMatchSnapshot,
  getLifecycleStatus,
  getOffsetWidth,
  getProperty,
  hasFocus,
  initAddEventListener,
  reattachElementHandle,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForEventSerialization,
  waitForStencilLifecycle,
} from '../helpers';
import type { Page } from 'puppeteer';

let page: Page;

beforeEach(async () => {
  page = await browser.newPage();
  await initAddEventListener(page);
});
afterEach(async () => await page.close());

const getHost = () => selectNode(page, 'p-segmented-control');
const getFirstItemHost = () => selectNode(page, 'p-segmented-control-item');
const getSecondItemHost = () => selectNode(page, 'p-segmented-control-item:nth-child(2)');
const getFirstItemButton = () => selectNode(page, 'p-segmented-control-item >>> button');
const getAllItemHosts = () => page.$$('p-segmented-control-item');
const getAllItemButtons = async () =>
  Promise.all(
    (await getAllItemHosts()).map(async (x) =>
      (await x.evaluateHandle((x) => x.shadowRoot.querySelector('button'))).asElement()
    )
  );

const getFirstItemOffsetWidth = async (): Promise<number> => getOffsetWidth(await getFirstItemHost());

const initSegmentedControl = (opts?: { amount?: number; value?: number }): Promise<void> => {
  const { amount = 1, value } = opts || {};
  const items = Array.from(Array(amount))
    .map((_, i) => `<p-segmented-control-item value="${i + 1}">Option ${i + 1}</p-segmented-control-item>`)
    .join('\n');

  const content = `<p-segmented-control${value ? ` value="${value}"` : ''}>
  ${items}
</p-segmented-control>`;

  return setContentWithDesignSystem(page, content);
};

describe('width calculation', () => {
  it('should recalculate width on items when longest content is removed', async () => {
    await initSegmentedControl({ amount: 6 });
    const secondItemHost = await getSecondItemHost();

    // Extend content of second item
    await secondItemHost.evaluate((el) => (el.innerHTML = 'Option 2 longer'));
    await waitForStencilLifecycle(page);

    const initialItemWidth = await getFirstItemOffsetWidth();

    await secondItemHost.evaluate((el) => el.remove());
    await waitForStencilLifecycle(page);

    expect(await getFirstItemOffsetWidth()).toBeLessThan(initialItemWidth);
  });

  it('should recalculate width on items when new item with longer content is added', async () => {
    await initSegmentedControl({ amount: 6 });
    const host = await getHost();

    const initialItemWidth = await getFirstItemOffsetWidth();

    await host.evaluate((el) => {
      const segmentedControlItem = document.createElement('p-segmented-control-item');
      segmentedControlItem.innerHTML = 'Some Option with longer text';
      el.appendChild(segmentedControlItem);
    });
    await waitForStencilLifecycle(page);

    expect(await getFirstItemOffsetWidth()).toBeGreaterThan(initialItemWidth);
  });

  it('should recalculate width on items when content changes', async () => {
    await initSegmentedControl({ amount: 6 });
    const firstItemHost = await getFirstItemHost();

    const initialItemWidth = await getFirstItemOffsetWidth();

    await firstItemHost.evaluate((el) => {
      el.innerHTML = 'Some Option with longer text';
    });
    await waitForStencilLifecycle(page);

    expect(await getFirstItemOffsetWidth()).toBeGreaterThan(initialItemWidth);
  });

  it('should recalculate width on items on label change', async () => {
    await initSegmentedControl({ amount: 6 });
    const firstItemHost = await getFirstItemHost();

    await setProperty(firstItemHost, 'label', 'Some super long Label to extend the width');
    await waitForStencilLifecycle(page);

    const initialItemWidth = await getFirstItemOffsetWidth();

    await setProperty(firstItemHost, 'label', 'Some Label');
    await waitForStencilLifecycle(page);

    expect(await getFirstItemOffsetWidth()).toBeLessThan(initialItemWidth);
  });

  it('should recalculate width on items when icon is added', async () => {
    await initSegmentedControl({ amount: 6 });
    const secondItemHost = await getSecondItemHost();

    const initialItemWidth = await getFirstItemOffsetWidth();

    await setProperty(secondItemHost, 'icon', 'truck');
    await waitForStencilLifecycle(page);

    expect(await getFirstItemOffsetWidth()).toBeGreaterThan(initialItemWidth);
  });

  it('should recalculate width on items when icon is removed', async () => {
    await initSegmentedControl({ amount: 6 });
    const secondItemHost = await getSecondItemHost();

    await setProperty(secondItemHost, 'icon', 'truck');
    await waitForStencilLifecycle(page);

    const initialItemWidth = await getFirstItemOffsetWidth();

    await setProperty(secondItemHost, 'icon', undefined);
    await waitForStencilLifecycle(page);

    expect(await getFirstItemOffsetWidth()).toBeLessThan(initialItemWidth);
  });
});

describe('events', () => {
  it('should trigger event on item click which is not selected', async () => {
    await initSegmentedControl({ amount: 2 });
    const host = await getHost();
    const [button1, button2] = await getAllItemButtons();

    let eventCounter = 0;
    await addEventListener(host, 'segmentedControlChange', () => eventCounter++);

    // Remove and re-attach component to check if events are duplicated / fire at all
    await reattachElementHandle(host);

    await button2.click();
    await waitForEventSerialization();

    expect(eventCounter).toBe(1);

    await button1.click();
    await waitForEventSerialization();

    expect(eventCounter).toBe(2);
  });

  it('should not trigger event if item is disabled', async () => {
    await initSegmentedControl({ amount: 2 });
    const host = await getHost();
    const secondItemHost = await getSecondItemHost();
    const [, button2] = await getAllItemButtons();

    let eventCounter = 0;
    await addEventListener(host, 'segmentedControlChange', () => eventCounter++);

    await setProperty(secondItemHost, 'disabled', true);
    await waitForStencilLifecycle(page);

    await button2.click();
    await waitForEventSerialization();

    expect(eventCounter).toBe(0);
  });

  it('should not trigger event if item is selected', async () => {
    await initSegmentedControl({ value: 1 });
    const host = await getHost();
    const firstItemHost = await getFirstItemHost();
    const button = await getFirstItemButton();

    let eventCounter = 0;
    await addEventListener(host, 'segmentedControlChange', () => eventCounter++);

    expect(await getProperty(firstItemHost, 'selected')).toBe(true);

    await button.click();
    await waitForEventSerialization();

    expect(eventCounter).toBe(0);
  });
});

describe('keyboard', () => {
  it('should focus items when keyboard "tab" is pressed', async () => {
    await setContentWithDesignSystem(
      page,
      `<a href="#">Some Link</a>
<p-segmented-control>
   <p-segmented-control-item value="1">Option 1</p-segmented-control-item>
   <p-segmented-control-item value="2" disabled="true">Option 1</p-segmented-control-item>
</p-segmented-control>
<a href="#">Some Link</a>`
    );
    const firstItemHost = await getFirstItemHost();
    const secondItemHost = await getSecondItemHost();
    const [firstAnchor, secondAnchor] = await page.$$('a');

    expect(await hasFocus(await selectNode(page, 'body'))).toBe(true);

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

describe('lifecycle', () => {
  it('should work without unnecessary round trips on init', async () => {
    await initSegmentedControl();
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-segmented-control'], 'componentDidLoad: p-segmented-control').toBe(1);
    expect(status.componentDidLoad['p-segmented-control-item'], 'componentDidLoad: p-segmented-control-item').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(2);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  it('should work without unnecessary round trips on prop change', async () => {
    await initSegmentedControl();
    const host = await getHost();

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

describe('accessibility', () => {
  it('should expose correct initial accessibility tree properties', async () => {
    await initSegmentedControl({ amount: 2, value: 1 });
    const host = await getHost();

    await expectA11yToMatchSnapshot(page, host, { message: 'segmented-control', interestingOnly: false });
  });
});
