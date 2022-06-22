import type { Page } from 'puppeteer';
import { a11yAnalyze, baseURL, getInternalUrls } from '../helpers';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

// filter out files from public/assets directory
const internalUrls = getInternalUrls().filter((url) => !url.match(/^\/assets\/.*\.\w{3,4}$/));

it.each(internalUrls.map<[string, number]>((url, i) => [url, i]))(
  'should have no accessibility issues at %s',
  async (url, index) => {
    process.stdout.write('\u001b[2K' + '\u001b[1G');
    process.stdout.write(`Checking url ${index + 1}/${internalUrls.length}: ${url}`);

    await page.goto(baseURL + url, { waitUntil: 'networkidle0' });
    await a11yAnalyze(page);
  }
);
