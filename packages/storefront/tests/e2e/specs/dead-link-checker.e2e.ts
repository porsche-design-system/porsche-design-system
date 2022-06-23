import type { Page } from 'puppeteer';
import { baseURL, getExternalUrls, getInternalUrls } from '../helpers';

const console = require('console'); // workaround for nicer logs

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const validateMarkdownLinks = async (): Promise<void> => {
  const markdownLinks = await page.$$('.markdown [href]');
  const markdownHrefs: string[] = await Promise.all(
    markdownLinks.map((link) => link.evaluate((el) => el.getAttribute('href')))
  );

  const markdownHrefsStartingWithSlash = markdownHrefs.filter((url) => url.startsWith('/'));
  if (markdownHrefsStartingWithSlash.length) {
    console.error('Link(s) starting with "/" were found:', markdownHrefsStartingWithSlash);
  }
  expect(markdownHrefsStartingWithSlash.length, 'markdownHrefsStartingWithSlash.length').toBe(0);
};

const getHeadline = async (): Promise<string> => {
  await page.waitForSelector('.vmark > h1'), { visible: true };
  return page.$eval('.vmark > h1', (x) => x.innerHTML);
};

const getPatternHeadline = async (): Promise<string> => {
  await page.waitForSelector('html.hydrated');
  await page.waitForSelector('p-headline[tag="h1"]', { visible: true });
  return page.$eval('p-headline[tag="h1"]', (x) => x.innerHTML);
};

const internalUrls = getInternalUrls();
const externalUrls = getExternalUrls();

it('should have no exponential increase in internal urls', () => {
  expect(internalUrls.length).toBeLessThanOrEqual(240);
});

it.each(internalUrls.map<[string, number]>((url, i) => [url, i]))(
  'should have valid headline at %s',
  async (url, index) => {
    console.log(`dead-link-checker url ${index + 1}/${internalUrls.length}: ${url}`);

    const response = await page.goto(baseURL + url, { waitUntil: 'domcontentloaded' });

    // match static files in public/assets directory
    if (url.match(/^\/assets\/.*\.\w{3,4}$/)) {
      expect(response.status()).toBe(200);
    } else {
      const headline =
        url === '/'
          ? 'first page'
          : url.startsWith('/patterns/forms/')
          ? await getPatternHeadline()
          : await getHeadline();

      expect(headline).not.toBe('404 - Page not found');

      await validateMarkdownLinks();
    }
  }
);

// TODO: disabled for now flaky execution
xit.each(externalUrls.map<[string, number]>((url, i) => [url, i]))(
  'should have valid status code at %s',
  async (url, index) => {
    console.log(`Checking url ${index + 1}/${externalUrls.length}: ${url}`);

    // TODO: why not use fetch api to retrieve response and status code?
    const response = await page.goto(url);

    expect(response.status()).toBeLessThan(400);
  }
);
