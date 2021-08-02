import {
  expectedStyleOnFocus,
  getBrowser,
  getElementStyle,
  getLifecycleStatus,
  getOutlineStyle,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
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
  const getParagraph = () => selectNode(page, 'p-text >>> p');

  describe('focus state', () => {
    it('should be shown by keyboard navigation only for slotted <a>', async () => {
      await initText();

      const link = await getLink();
      const hidden = expectedStyleOnFocus({ color: 'transparent', offset: '1px' });
      const visible = expectedStyleOnFocus({ color: 'hover', offset: '1px' });

      expect(await getOutlineStyle(link)).toBe(hidden);

      await link.click();

      expect(await getOutlineStyle(link)).toBe(hidden);

      await page.keyboard.down('ShiftLeft');
      await page.keyboard.press('Tab');
      await page.keyboard.up('ShiftLeft');
      await page.keyboard.press('Tab');

      expect(await getOutlineStyle(link)).toBe(visible);
    });
  });

  describe('lifecycle', () => {
    it('should work without unnecessary round trips on init', async () => {
      await initText();
      const status = await getLifecycleStatus(page);

      expect(status.componentDidLoad['p-text']).withContext('componentDidLoad: p-text').toBe(1);

      expect(status.componentDidUpdate.all).withContext('componentDidUpdate: all').toBe(0);
      expect(status.componentDidLoad.all).withContext('componentDidUpdate: all').toBe(1);
    });

    it('should work without unnecessary round trips after state change', async () => {
      await initText();
      const host = await getHost();

      await setProperty(host, 'weight', 'semibold');
      await waitForStencilLifecycle(page);

      const status = await getLifecycleStatus(page);

      expect(status.componentDidUpdate['p-text']).withContext('componentDidUpdate: p-text').toBe(1);
      expect(status.componentDidUpdate.all).withContext('componentDidUpdate: all').toBe(1);
    });
  });

  it('should have "text-size-adjust: none" set', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-text>
        Some message
      </p-text>`
    );
    const paragraph = await getParagraph();
    const webkitTextSizeAdjustStyle = await getElementStyle(paragraph, 'webkitTextSizeAdjust');

    // when webkitTextSizeAdjust is set to "none", it defaults to 100%
    expect(webkitTextSizeAdjustStyle).toBe('100%');
  });
});
