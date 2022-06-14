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

const initSegmentedControl = (opts?: { amount: number }): Promise<void> => {
  const { amount = 1 } = opts || {};
  const items = Array.from(Array(amount))
    .map((_, i) => `<p-segmented-control-item value="${i + 1}">Option ${i + 1}</p-segmented-control-item>`)
    .join('\n');

  return setContentWithDesignSystem(
    page,
    `
    <p-segmented-control value="1">
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

xdescribe('keyboard', () => {});

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
