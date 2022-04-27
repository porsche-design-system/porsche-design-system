import type { Page } from 'puppeteer';
import {
  expectA11yToMatchSnapshot,
  getLifecycleStatus,
  initAddEventListener,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';

let page: Page;

beforeEach(async () => {
  page = await browser.newPage();
  await initAddEventListener(page);
});
afterEach(async () => await page.close());

type InitOpts = {
  withLabel?: boolean;
};

const initTagDismissible = async (props?: InitOpts) => {
  const { withLabel = false } = props || {};
  const attributes = withLabel ? ' label="Some label"' : '';

  const content = `<p-tag-dismissible${attributes}>Some Tag</p-tag-dismissible>`;

  await setContentWithDesignSystem(page, content);
};

const getHost = () => selectNode(page, 'p-tag-dismissible');
const getButton = () => selectNode(page, 'p-tag-dismissible >>> button');

describe('focus', () => {
  it('should provide functionality to focus & blur the custom element', async () => {
    await setContentWithDesignSystem(
      page,
      `
    <a href="#" id="before">before</a>
    <p-tag-dismissible>Some Tag</p-tag-dismissible>`
    );

    const host = await getHost();
    const hostHasFocus = () => host.evaluate((el) => document.activeElement === el);

    const before = await selectNode(page, '#before');
    await before.focus();
    expect(await hostHasFocus()).toBe(false);
    await host.focus();
    expect(await hostHasFocus()).toBe(true);
    await host.evaluate((el: HTMLElement) => el.blur());
    expect(await hostHasFocus()).toBe(false);
  });
});

describe('lifecycle', () => {
  it('should work without unnecessary round trips on init', async () => {
    await initTagDismissible();
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(1);
    expect(status.componentDidLoad['p-tag-dismissible'], 'componentDidLoad: p-tag-dismissible').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(2);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  it('should work without unnecessary round trips on prop change', async () => {
    await initTagDismissible({ withLabel: true });
    const host = await getHost();

    await setProperty(host, 'label', 'Another label');
    await waitForStencilLifecycle(page);

    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-tag-dismissible'], 'componentDidUpdate: p-tag-dismissible').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(2);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });
});

describe('accessibility', () => {
  it('should expose correct initial accessibility tree', async () => {
    await initTagDismissible();
    await expectA11yToMatchSnapshot(page, await getButton(), { interestingOnly: false });
  });

  it('should expose correct accessibility tree with label', async () => {
    await initTagDismissible({ withLabel: true });

    await expectA11yToMatchSnapshot(page, await getButton(), { interestingOnly: false });
  });

  it('should expose correct accessibility tree if accessibility properties are set', async () => {
    await initTagDismissible({ withLabel: true });
    const host = await getHost();
    await setProperty(host, 'aria', { 'aria-label': 'Some aria-label' });

    await expectA11yToMatchSnapshot(page, await getButton(), { interestingOnly: false });
  });
});
