import {
  getBrowser,
  getStyleOnFocus,
  selectNode, setAttribute,
  setContentWithDesignSystem, waitForStencilLifecycle
} from '../helpers';
import { Page } from 'puppeteer';
import { expectedStyleOnFocus } from '../constants';

describe('text', () => {
  let page: Page;

  beforeEach(async () => (page = await getBrowser().newPage()));
  afterEach(async () => await page.close());

  const getHost = () => selectNode(page, 'p-text');
  const getLink = () => selectNode(page, 'p-text a');

  describe('focus state', () => {
    it('should show outline of slotted <a> when it is focused', async () => {
      await setContentWithDesignSystem(
        page,
        `
        <p-text>
          <p>Some message with a <a href="#">link</a>.</p>
        </p-text>`
      );

      const host = await getHost();
      const link = await getLink();

      expect(await getStyleOnFocus(link)).toBe(expectedStyleOnFocus());

      await setAttribute(host, 'theme', 'dark');
      await waitForStencilLifecycle(page);

      await page.waitForTimeout(500); // we need to wait for inherited color transition

      expect(await getStyleOnFocus(link)).toBe(expectedStyleOnFocus({theme: 'dark'}));
    });
  });
});
