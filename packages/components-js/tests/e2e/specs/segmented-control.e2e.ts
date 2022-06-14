import {
  expectA11yToMatchSnapshot,
  getLifecycleStatus,
  initAddEventListener,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
  addEventListener,
  reattachElement,
  isElementAtIndexFocused,
  getProperty,
} from '../helpers';
import type { Page } from 'puppeteer';

let page: Page;

beforeEach(async () => {
  page = await browser.newPage();
  await initAddEventListener(page);
});
afterEach(async () => await page.close());

const getHost = () => selectNode(page, 'p-segmented-control');
const getItemHost = () => selectNode(page, 'p-segmented-control-item');
const getItemButton = () => selectNode(page, 'p-segmented-control-item >>> button');
const getAllItems = () => page.$$('p-segmented-control-item');
const getAllButtons = async () =>
  Promise.all(
    (await getAllItems()).map(async (x) =>
      (await x.evaluateHandle((x) => x.shadowRoot.querySelector('button'))).asElement()
    )
  );

const initSegmentedControl = (opts?: { amount?: number; value?: number }): Promise<void> => {
  const { amount = 1, value = 1 } = opts || {};
  const items = Array.from(Array(amount))
    .map((_, i) => `<p-segmented-control-item value="${i + 1}">Option ${i + 1}</p-segmented-control-item>`)
    .join('\n');

  return setContentWithDesignSystem(
    page,
    `
    <p-segmented-control value="${value}">
      ${items}
    </p-segmented-control>`
  );
};

xit('should correctly recalculate width on item add/remove', async () => {});
xit('should correctly recalculate width on item content change', async () => {});
xit('should correctly recalculate width on item prop change', async () => {});

describe('events', () => {
  it('should trigger event on item click which is not selected', async () => {
    await initSegmentedControl({ amount: 2 });
    const host = await getHost();
    const [button1, button2] = await getAllButtons();

    let eventCounter = 0;
    await addEventListener(host, 'segmentedControlChange', () => eventCounter++);

    // Remove and re-attach component to check if events are duplicated / fire at all
    await reattachElement(page, 'p-segmented-control');

    await button2.click();
    await waitForStencilLifecycle(page);

    expect(eventCounter).toBe(1);

    await button1.click();
    await waitForStencilLifecycle(page);

    expect(eventCounter).toBe(2);
  });

  it('should not trigger event if item is disabled', async () => {
    await initSegmentedControl({ amount: 2 });
    const host = await getHost();
    const [, item2] = await getAllItems();
    const [, button2] = await getAllButtons();

    let eventCounter = 0;
    await addEventListener(host, 'segmentedControlChange', (e) => {
      eventCounter++;
      console.log(e);
    });

    await setProperty(item2, 'disabled', true);
    await waitForStencilLifecycle(page);

    await button2.click();
    await waitForStencilLifecycle(page);

    expect(eventCounter).toBe(0);
  });

  it('should not trigger event if item is selected', async () => {
    await initSegmentedControl();
    const host = await getHost();
    const button = await getItemButton();

    let eventCounter = 0;
    await addEventListener(host, 'segmentedControlChange', () => eventCounter++);

    await button.click();
    await waitForStencilLifecycle(page);

    expect(eventCounter).toBe(0);
  });
});

describe('keyboard', () => {
  it('should render focus on first item when it is selected on keyboard "tab" press', async () => {
    await initSegmentedControl({ amount: 2 });
    expect(await isElementAtIndexFocused(page, 0)).toBeUndefined();
    expect(await isElementAtIndexFocused(page, 1)).toBeUndefined();

    await page.keyboard.press('Tab');

    expect(await isElementAtIndexFocused(page, 0)).toBe(true);
    expect(await isElementAtIndexFocused(page, 1)).toBeUndefined();

    await page.keyboard.press('Tab');

    expect(await isElementAtIndexFocused(page, 0)).toBeUndefined();
    expect(await isElementAtIndexFocused(page, 1)).toBeUndefined();
  });

  it('should render correct focus and value of item on arrow-key press', async () => {
    await initSegmentedControl({ amount: 2 });
    const [item1, item2] = await getAllItems();
    expect(await isElementAtIndexFocused(page, 0)).toBeUndefined();

    await page.keyboard.press('Tab');
    await waitForStencilLifecycle(page);

    expect(await isElementAtIndexFocused(page, 0)).toBe(true);
    expect(await getProperty(item1, 'selected')).toBe(true);
    expect(await getProperty(item2, 'selected')).toBe(false);

    await page.keyboard.press('ArrowRight');
    await waitForStencilLifecycle(page);

    expect(await isElementAtIndexFocused(page, 0), 'on ArrowRight').toBeUndefined();
    expect(await isElementAtIndexFocused(page, 1), 'on ArrowRight').toBe(true);

    expect(await getProperty(item1, 'selected'), 'on ArrowRight').toBe(false);
    expect(await getProperty(item2, 'selected'), 'on ArrowRight').toBe(true);

    await page.keyboard.press('ArrowLeft');
    await waitForStencilLifecycle(page);

    expect(await isElementAtIndexFocused(page, 0), 'on ArrowLeft').toBe(true);
    expect(await isElementAtIndexFocused(page, 1), 'on ArrowLeft').toBeUndefined();

    expect(await getProperty(item1, 'selected'), 'on ArrowLeft').toBe(true);
    expect(await getProperty(item2, 'selected'), 'on ArrowLeft').toBe(false);
  });

  it('should render select/focus first item on ArrowRight when last item is selected', async () => {
    await initSegmentedControl({ amount: 3, value: 3 });
    const [item1, item2, item3] = await getAllItems();

    await page.keyboard.press('Tab');
    await waitForStencilLifecycle(page);

    expect(await isElementAtIndexFocused(page, 2)).toBe(true);
    expect(await getProperty(item1, 'selected')).toBe(false);
    expect(await getProperty(item2, 'selected')).toBe(false);
    expect(await getProperty(item3, 'selected')).toBe(true);

    await page.keyboard.press('ArrowRight');
    await waitForStencilLifecycle(page);

    expect(await isElementAtIndexFocused(page, 0)).toBe(true);
    expect(await isElementAtIndexFocused(page, 1)).toBeUndefined();
    expect(await isElementAtIndexFocused(page, 2)).toBeUndefined();

    expect(await getProperty(item1, 'selected')).toBe(true);
    expect(await getProperty(item2, 'selected')).toBe(false);
    expect(await getProperty(item2, 'selected')).toBe(false);
  });

  it('should render select/focus first item on ArrowRight when last item is selected', async () => {
    await initSegmentedControl({ amount: 3 });
    const [item1, item2, item3] = await getAllItems();

    await page.keyboard.press('Tab');
    await waitForStencilLifecycle(page);

    expect(await isElementAtIndexFocused(page, 0)).toBe(true);
    expect(await getProperty(item1, 'selected')).toBe(true);
    expect(await getProperty(item2, 'selected')).toBe(false);
    expect(await getProperty(item3, 'selected')).toBe(false);

    await page.keyboard.press('ArrowLeft');
    await waitForStencilLifecycle(page);

    expect(await isElementAtIndexFocused(page, 0)).toBeUndefined();
    expect(await isElementAtIndexFocused(page, 1)).toBeUndefined();
    expect(await isElementAtIndexFocused(page, 2)).toBe(true);

    expect(await getProperty(item1, 'selected')).toBe(false);
    expect(await getProperty(item2, 'selected')).toBe(false);
    expect(await getProperty(item3, 'selected')).toBe(true);
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
    await initSegmentedControl();
    const itemButton = await getItemButton();

    await expectA11yToMatchSnapshot(page, itemButton);
  });
});
