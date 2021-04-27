import {
  getBrowser,
  getStyleOnFocus,
  selectNode,
  setAttribute,
  expectedStyleOnFocus,
  setContentWithDesignSystem,
  waitForInheritedCSSTransition,
  waitForStencilLifecycle,
  getOutlineStyle,
  getLifecycleStatus,
} from '../helpers';
import { Page } from 'puppeteer';

describe('text', () => {
  let page: Page;

  beforeEach(async () => (page = await getBrowser().newPage()));
  afterEach(async () => await page.close());

  const initText = (): Promise<void> => {
    return setContentWithDesignSystem(
      page,
      `
      <p-text>
        <p>Some message with a <a onclick="return false;" href="#">link</a>.</p>
      </p-text>`
    );
  };

  const getHost = () => selectNode(page, 'p-text');
  const getLink = () => selectNode(page, 'p-text a');

  describe('focus state', () => {
    it('should be shown by keyboard navigation only for slotted <a>', async () => {
      await initText();

      const link = await getLink();
      const hidden = expectedStyleOnFocus({ color: 'transparent', offset: '1px' });
      const visible = expectedStyleOnFocus({ color: 'hover', offset: '1px' });

      expect(await getOutlineStyle(link)).toBe(hidden);

      await link.click();
      await waitForInheritedCSSTransition(page);

      expect(await getOutlineStyle(link)).toBe(hidden);

      await page.keyboard.down('ShiftLeft');
      await page.keyboard.press('Tab');
      await page.keyboard.up('ShiftLeft');
      await page.keyboard.press('Tab');

      expect(await getOutlineStyle(link)).toBe(visible);
    });

    it('should show outline of slotted <a> when it is focused', async () => {
      await initText();

      const host = await getHost();
      const link = await getLink();

      expect(await getStyleOnFocus(link)).toBe(expectedStyleOnFocus({ offset: '1px' }));

      await setAttribute(host, 'theme', 'dark');
      await waitForStencilLifecycle(page);
      await waitForInheritedCSSTransition(page);

      expect(await getStyleOnFocus(link)).toBe(expectedStyleOnFocus({ theme: 'dark', offset: '1px' }));
    });
  });

  describe('lifecycle', () => {
    it('should work without unnecessary round trips on init', async () => {
      await initText();
      const status = await getLifecycleStatus(page);

      expect(status.componentDidLoad['p-text']).toBe(1, 'componentDidLoad: p-text');

      expect(status.componentDidUpdate.all).toBe(0, 'componentDidUpdate: all');
      expect(status.componentDidLoad.all).toBe(1, 'componentDidUpdate: all');
    });

    it('should work without unnecessary round trips after state change', async () => {
      await initText();
      const host = await getHost();

      await setAttribute(host, 'weight', 'semibold');
      await waitForStencilLifecycle(page);

      const status = await getLifecycleStatus(page);

      expect(status.componentDidUpdate['p-text']).toBe(1, 'componentDidUpdate: p-text');
      expect(status.componentDidUpdate.all).toBe(1, 'componentDidUpdate: all');
    });
  });
});
