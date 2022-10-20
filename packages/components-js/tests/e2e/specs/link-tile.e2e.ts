import {
  expectA11yToMatchSnapshot,
  getLifecycleStatus,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';
import { Page } from 'puppeteer';

let page: Page;

beforeEach(async () => {
  page = await browser.newPage();
});
afterEach(async () => await page.close());

const getHost = () => selectNode(page, 'p-link-tile');
const getRoot = () => selectNode(page, 'p-link-tile >>> .root');
const getLink = () => selectNode(page, 'p-link-tile >>> a');

const initLinkTile = (opts?: { compact?: boolean }): Promise<void> => {
  const { compact = false } = opts || {};

  return setContentWithDesignSystem(
    page,
    `<p-link-tile href="#" label="Some label" description="Some description" compact="${compact}" >
  <img src="./assets/porsche_beach.jpg"/>
</p-link-tile>`
  );
};

describe('lifecycle', () => {
  it('should work without unnecessary round trips on init', async () => {
    await initLinkTile();
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-link-tile'], 'componentDidLoad: p-link-tile').toBe(1);
    expect(status.componentDidLoad['p-link'], 'componentDidLoad: p-link').toBe(1);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(3);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  it('should work without unnecessary round trips on init for compact="true"', async () => {
    await initLinkTile({ compact: true });
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-link-tile'], 'componentDidLoad: p-link-tile').toBe(1);
    expect(status.componentDidLoad['p-link-pure'], 'componentDidLoad: p-link-pure').toBe(1);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(3);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  it('should work without unnecessary round trips on prop change', async () => {
    await initLinkTile();
    const host = await getHost();

    await setProperty(host, 'compact', 'true');
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-link-tile'], 'componentDidUpdate: p-link-tile').toBe(1);
    expect(status.componentDidLoad['p-link-pure'], 'componentDidLoad: p-link-pure').toBe(1); // p-link should be changed to p-link-pure when compact="true"
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });
});

describe('accessibility', () => {
  it('should expose correct initial accessibility tree properties', async () => {
    await initLinkTile();
    const root = await getRoot();

    await expectA11yToMatchSnapshot(page, root, { interestingOnly: false });
  });

  it('should expose correct accessibility tree if accessibility properties are set', async () => {
    await initLinkTile();
    const host = await getHost();
    const link = await getLink();

    await setProperty(host, 'aria', {
      'aria-label': 'Some more detailed label',
    });
    await waitForStencilLifecycle(page);

    await expectA11yToMatchSnapshot(page, link);
  });
});
