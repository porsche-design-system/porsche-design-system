import {
  getBrowser,
  getElementStyle,
  getElementStyleOnFocus,
  getElementStyleOnHover,
  selectNode,
  setContentWithDesignSystem
} from '../helpers';
import { Page } from 'puppeteer';

describe('text', () => {
  let page: Page;

  beforeEach(async () => (page = await getBrowser().newPage()));
  afterEach(async () => await page.close());

  const getTextLink = () => selectNode(page, 'p-text a');

  describe('hover state', () => {
    it('should change color of slotted <a> when it is hovered', async () => {
      await setContentWithDesignSystem(
        page,
        `
        <p-text>
          <p>Some message with a <a href="#">link</a>.</p>
        </p-text>`
      );

      const link = await getTextLink();
      const linkColorInitial = await getElementStyle(link, 'color');

      expect(await getElementStyleOnHover(link, 'color')).not.toBe(linkColorInitial, 'link should get hover style');
    });
  });

  describe('focus state', () => {
    it('should show outline of slotted <a> when it is focused', async () => {
      await setContentWithDesignSystem(
        page,
        `
        <p-text>
          <p>Some message with a <a href="#">link</a>.</p>
        </p-text>`
      );

      const link = await getTextLink();
      const linkOutlineInitial = await getElementStyle(link, 'outline');

      expect(await getElementStyleOnFocus(link, 'outline')).not.toBe(linkOutlineInitial, 'link should get focus style');
    });
  });
});
