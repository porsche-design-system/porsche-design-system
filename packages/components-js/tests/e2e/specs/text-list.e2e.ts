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

  const getTextListLink = () => selectNode(page, 'p-text-list a');

  describe('hover state', () => {
    it('should change color of slotted <a> when it is hovered', async () => {
      await setContentWithDesignSystem(
        page,
        `
        <p-text-list list-type="ordered" order-type="alphabetically">
          <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
          <p-text-list-item>The quick <a href="#">brown fox</a> jumps over the lazy dog</p-text-list-item>
        </p-text-list>`
      );

      const link = await getTextListLink();
      const linkColorInitial = await getElementStyle(link, 'color');

      expect(await getElementStyleOnHover(link, 'color')).not.toBe(linkColorInitial, 'link should get hover style');
    });
  });

  describe('focus state', () => {
    it('should show outline of slotted <a> when it is focused', async () => {
      await setContentWithDesignSystem(
        page,
        `
        <p-text-list list-type="ordered" order-type="alphabetically">
          <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
          <p-text-list-item>The quick <a href="#">brown fox</a> jumps over the lazy dog</p-text-list-item>
        </p-text-list>`
      );

      const link = await getTextListLink();
      const linkOutlineInitial = await getElementStyle(link, 'outline');

      expect(await getElementStyleOnFocus(link, 'outline')).not.toBe(linkOutlineInitial, 'link should get focus style');
    });
  });
});
