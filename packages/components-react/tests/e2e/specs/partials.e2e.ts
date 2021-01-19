import { browser } from '../config';
import { Page } from 'puppeteer';
import { getFontFaceStylesheet, getInitialStyles } from '@porsche-design-system/components-js/partials';

describe('partials', () => {
  let page: Page;
  beforeEach(async () => (page = await browser.newPage()));
  afterEach(async () => await page.close());

  describe('getFontFaceStylesheet()', () => {
    it('should be a function', () => {
      expect(typeof getFontFaceStylesheet).toBe('function');
    });
  });

  describe('getInitialStyles()', () => {
    it('should be a function', () => {
      expect(typeof getInitialStyles).toBe('function');
    });
  });
});
