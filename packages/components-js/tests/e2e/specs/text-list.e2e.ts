import {
  expectA11yToMatchSnapshot,
  getLifecycleStatus,
  getProperty,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';
import { Page } from 'puppeteer';

describe('text-list', () => {
  let page: Page;

  beforeEach(async () => (page = await browser.newPage()));
  afterEach(async () => await page.close());

  const initTextList = (): Promise<void> => {
    return setContentWithDesignSystem(
      page,
      `
        <p-text-list>
          <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
          <p-text-list-item>The quick <a onclick="return false;" href="#">brown fox</a> jumps over the lazy dog</p-text-list-item>
          <p-text-list-item>
            The quick brown fox jumps over the lazy dog
            <p-text-list>
              <p-text-list-item>
                The quick brown fox jumps over the lazy dog
              </p-text-list-item>
            </p-text-list>
          </p-text-list-item>
        </p-text-list>`
    );
  };

  const getHost = () => selectNode(page, 'p-text-list');

  describe('lifecycle', () => {
    it('should have a theme prop defined at any time without any unnecessary round trips', async () => {
      await initTextList();
      const host = await getHost();

      expect(await getProperty(host, 'theme')).toBe('light');

      await setProperty(host, 'theme', 'dark');
      await waitForStencilLifecycle(page);
      const status = await getLifecycleStatus(page);
      expect(status.componentDidUpdate['p-text-list'], 'componentDidUpdate: p-text-list').toBe(1);
      expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
      expect(await getProperty(host, 'theme')).toBe('dark');

      await setProperty(host, 'theme', 'light');
      await waitForStencilLifecycle(page);
      const status2 = await getLifecycleStatus(page);
      expect(status2.componentDidUpdate['p-text-list'], 'componentDidUpdate: p-text-list').toBe(2);
      expect(status2.componentDidUpdate.all, 'componentDidUpdate: all').toBe(2);
      expect(await getProperty(host, 'theme')).toBe('light');
    });
  });

  describe('accessibility', () => {
    it('should expose correct initial accessibility tree', async () => {
      await initTextList();
      const getList = () => selectNode(page, 'p-text-list >>> [role="list"]');

      await expectA11yToMatchSnapshot(page, await getList(), { interestingOnly: false });
    });
  });
});
