import {
  getElementStyle,
  getLifecycleStatus,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';
import { Page } from 'puppeteer';

describe('text', () => {
  let page: Page;

  beforeEach(async () => (page = await browser.newPage()));
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

  describe('lifecycle', () => {
    it('should work without unnecessary round trips on init', async () => {
      await initText();
      const status = await getLifecycleStatus(page);

      expect(status.componentDidLoad['p-text'], 'componentDidLoad: p-text').toBe(1);

      expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
      expect(status.componentDidLoad.all, 'componentDidUpdate: all').toBe(1);
    });

    it('should work without unnecessary round trips after state change', async () => {
      await initText();
      const host = await getHost();

      await setProperty(host, 'weight', 'semibold');
      await waitForStencilLifecycle(page);

      const status = await getLifecycleStatus(page);

      expect(status.componentDidUpdate['p-text'], 'componentDidUpdate: p-text').toBe(1);
      expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
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
    const webkitTextSizeAdjustStyle = await getElementStyle(paragraph, 'webkitTextSizeAdjust' as any);

    // when webkitTextSizeAdjust is set to "none", it defaults to 100%
    expect(webkitTextSizeAdjustStyle).toBe('100%');
  });
});
