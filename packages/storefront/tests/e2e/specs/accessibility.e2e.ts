import type { Page } from 'puppeteer';
import { baseURL } from '../helpers';
import { a11yAnalyze, a11yFinalize } from '../helpers/axe-helper';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

it('works', async () => {
  await page.goto(baseURL, { waitUntil: 'networkidle0' });

  await a11yAnalyze(page);

  await page.goto(baseURL + '/about/introduction', { waitUntil: 'networkidle0' });
  await a11yAnalyze(page);

  await a11yFinalize();
});
