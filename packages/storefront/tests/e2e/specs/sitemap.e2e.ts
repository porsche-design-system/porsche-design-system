import type { Page } from 'puppeteer';
import { buildSitemap, getSitemap } from '../helpers';

jest.setTimeout(2147483647);

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

it('should have complete sitemap.json', async () => {
  const newUrls = await buildSitemap();
  const oldUrls = getSitemap();

  expect(newUrls).toEqual(oldUrls);
});
