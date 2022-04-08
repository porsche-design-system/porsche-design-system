import type { Page } from 'puppeteer';
import {
  addEventListener,
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
  const { withLabel } = props || {};
  const attributes = withLabel ? ' label="Some label"' : '';

  const content = `<p-tag-dismissible${attributes}>Some Tag</p-tag-dismissible>`;

  await setContentWithDesignSystem(page, content);
};

const getHost = () => selectNode(page, 'p-tag-dismissible');
const getButton = () => selectNode(page, 'p-tag-dismissible >>> button');

it('should dispatch correct click events', async () => {
  await setContentWithDesignSystem(
    page,
    `<div><p-tag-dismissible id="hostElement">Some label</p-tag-dismissible></div>`
  );

  const wrapper = await selectNode(page, 'div');
  const host = await getHost();
  const button = await getButton();

  const events = [];
  await addEventListener(wrapper, 'click', (ev) => events.push(ev));

  await button.click();
  await host.click();
  await waitForStencilLifecycle(page);

  expect(events.length).toBe(2);
  for (const event of events) {
    expect(event.target.id).toBe('hostElement');
  }
});

describe('lifecycle', () => {
  it('should work without unnecessary round trips on init', async () => {
    await initTagDismissible();
    const status = await getLifecycleStatus(page);

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
});
