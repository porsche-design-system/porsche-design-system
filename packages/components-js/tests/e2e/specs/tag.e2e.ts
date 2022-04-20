import type { Page } from 'puppeteer';
import {
  expectA11yToMatchSnapshot,
  getLifecycleStatus,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

type InitOpts = {
  withIcon?: boolean;
};

const initTag = async (props?: InitOpts) => {
  const { withIcon = false } = props || {};
  const attributes = withIcon ? ' icon="car"' : '';

  const content = `<p-tag${attributes}>Some Tag</p-tag>`;

  await setContentWithDesignSystem(page, content);
};

const getHost = () => selectNode(page, 'p-tag');
const getSpan = () => selectNode(page, 'p-tag >>> span');

describe('lifecycle', () => {
  it('should work without unnecessary round trips on init', async () => {
    await initTag();
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-tag'], 'componentDidLoad: p-tag').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  it('should work without unnecessary round trips on prop change', async () => {
    await initTag({ withIcon: true });
    const host = await getHost();

    await setProperty(host, 'icon', 'highway');
    await waitForStencilLifecycle(page);

    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-tag'], 'componentDidUpdate: p-tag').toBe(1);
    expect(status.componentDidUpdate['p-icon'], 'componentDidUpdate: p-icon').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(2);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(2);
  });
});

describe('accessibility', () => {
  it('should expose correct initial accessibility tree', async () => {
    await initTag();
    await expectA11yToMatchSnapshot(page, await getSpan(), { interestingOnly: false });
  });

  it('should expose correct accessibility tree with icon', async () => {
    await initTag({ withIcon: true });

    await expectA11yToMatchSnapshot(page, await getSpan(), { interestingOnly: false });
  });
});
