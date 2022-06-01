import {
  expectA11yToMatchSnapshot,
  getLifecycleStatus,
  initAddEventListener,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
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
const getItemHost = () => selectNode(page, 'p-segmented-control-item');
const getItemButton = () => selectNode(page, 'p-segmented-control-item >>> button');

const initSegmentedControl = (opts?: {}): Promise<void> => {
  return setContentWithDesignSystem(
    page,
    `
    <p-segmented-control>
      <p-segmented-control-item>
        Some label
      </p-segmented-control-item>
    </p-segmented-control>`
  );
};

xit('should correctly recalculate width on item add/remove', async () => {});
xit('should correctly recalculate width on item content change', async () => {});
xit('should correctly recalculate width on item prop change', async () => {});

xdescribe('events', () => {});

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
