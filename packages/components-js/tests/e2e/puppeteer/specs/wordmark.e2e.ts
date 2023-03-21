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

const getHost = () => selectNode(page, 'p-wordmark');
const getLink = () => selectNode(page, 'p-wordmark >>> a');
const getImage = () => selectNode(page, 'p-wordmark >>> img');

const initWordmark = (opts?: { href?: boolean }): Promise<void> => {
  const { href = false } = opts || {};
  return setContentWithDesignSystem(page, `<p-wordmark ${href ? 'href="#" ' : ''}></p-wordmark>`);
};

describe('lifecycle', () => {
  it('should work without unnecessary round trips on init', async () => {
    await initWordmark();
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-wordmark'], 'componentDidLoad: p-wordmark').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });
});

describe('accessibility', () => {
  it('should expose correct initial accessibility tree', async () => {
    await initWordmark();
    const image = await getImage();

    await expectA11yToMatchSnapshot(page, image);
  });

  it('should expose correct accessibility tree if accessibility properties are set', async () => {
    await initWordmark({ href: true });
    const host = await getHost();
    const link = await getLink();

    await setProperty(host, 'aria', {
      'aria-label': 'Some more detailed label',
    });
    await waitForStencilLifecycle(page);
    await expectA11yToMatchSnapshot(page, link);
  });
});
