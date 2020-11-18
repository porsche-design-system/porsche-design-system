import { getBrowser, options } from '../helpers';
import { ElementHandle, Page } from 'puppeteer';

const getStyleOnFocus = async (element: ElementHandle): Promise<string> => {
  await element.focus();
  return await element.evaluate((el: Element): string => {
    return `${getComputedStyle(el).outline} ${getComputedStyle(el).outlineOffset}`;
  });
};

describe('Accessibility', () => {
  let page: Page;
  beforeEach(async () => (page = await getBrowser().newPage()));
  afterEach(async () => await page.close());

  describe('focus', () => {
    it(`should style marque link on focus`, async () => {
      await page.goto(`${options.baseURL}`, {waitUntil: 'networkidle0'});

      const linkElement = await page.$(`header.header a`);

      expect(await getStyleOnFocus(linkElement)).toBe('rgb(0, 0, 0) solid 1px 1px');
    });

    it(`should style markdown links on focus`, async () => {
      await page.goto(`${options.baseURL}/#/markdown`, {waitUntil: 'networkidle0'});

      const linkElement = await page.$(`.vmark a`);

      expect(await getStyleOnFocus(linkElement)).toBe('rgb(0, 0, 0) solid 1px 1px');
    });
  });
});
