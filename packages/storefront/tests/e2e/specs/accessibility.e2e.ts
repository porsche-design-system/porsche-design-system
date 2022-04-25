import { baseURL } from '../helpers';
import type { ElementHandle, Page } from 'puppeteer';

const getStyleOnFocus = async (element: ElementHandle): Promise<string> => {
  await element.focus();
  return await element.evaluate((el: Element): string => {
    return `${getComputedStyle(el).outline} ${getComputedStyle(el).outlineOffset}`;
  });
};

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

describe('focus', () => {
  it(`should style markdown links on focus`, async () => {
    await page.goto(`${baseURL}/markdown`, { waitUntil: 'networkidle0' });

    const linkElement = await page.$(`.vmark a`);

    expect(await getStyleOnFocus(linkElement)).toBe('rgb(0, 0, 0) solid 1px 1px');
  });
});
