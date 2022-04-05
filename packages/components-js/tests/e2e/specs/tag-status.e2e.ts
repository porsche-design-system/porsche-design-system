import { Page } from 'puppeteer';
import {
  expectA11yToMatchSnapshot,
  getLifecycleStatus,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';

describe('tag-status', () => {
  let page: Page;
  beforeEach(async () => (page = await browser.newPage()));
  afterEach(async () => await page.close());

  type InitOpts = {
    withIcon?: boolean;
  };

  const initTagStatus = async (props?: InitOpts) => {
    const { withIcon } = props ?? {};
    const content = `<p-tag-status${withIcon ? ' icon="car"' : ''}>Some Tag</p-tag-status>`;

    await setContentWithDesignSystem(page, content);
  };

  const getHost = () => selectNode(page, 'p-tag-status');
  const getSpan = () => selectNode(page, 'p-tag-status >>> span');

  describe('lifecycle', () => {
    it('should work without unnecessary round trips on init', async () => {
      await initTagStatus();
      const status = await getLifecycleStatus(page);

      expect(status.componentDidLoad['p-tag-status'], 'componentDidLoad: p-tag-status').toBe(1);

      expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
      expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
    });

    it('should work without unnecessary round trips on prop change', async () => {
      await initTagStatus({ withIcon: true });
      const host = await getHost();

      await setProperty(host, 'icon', 'highway');
      await waitForStencilLifecycle(page);

      const status = await getLifecycleStatus(page);

      expect(status.componentDidUpdate['p-tag-status'], 'componentDidUpdate: p-tag-status').toBe(1);
      expect(status.componentDidUpdate['p-icon'], 'componentDidUpdate: p-icon').toBe(1);

      expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(2);
      expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(2);
    });
  });

  describe('accessibility', () => {
    it('should expose correct initial accessibility tree', async () => {
      await initTagStatus();
      await expectA11yToMatchSnapshot(page, await getSpan(), { interestingOnly: false });
    });

    it('should expose correct accessibility tree with icon', async () => {
      await initTagStatus({ withIcon: true });

      await expectA11yToMatchSnapshot(page, await getSpan(), { interestingOnly: false });
    });
  });
});
