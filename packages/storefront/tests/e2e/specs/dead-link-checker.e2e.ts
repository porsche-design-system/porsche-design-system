import type { ElementHandle, Page } from 'puppeteer';
import { baseURL } from '../helpers';

const console = require('console'); // workaround for nicer logs
jest.setTimeout(2147483647);

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const getBodyLinks = () => page.$$('body [href]');
const getMarkdownLinks = () => page.$$('.markdown [href]');
const evaluateGetHref = (handle: ElementHandle<Element>): Promise<string> =>
  handle.evaluate((el) => el.getAttribute('href'));

const mapAsync = <T, U>(array: T[], callbackFn: (value: T, index: number, array: T[]) => Promise<U>): Promise<U[]> => {
  return Promise.all(array.map(callbackFn));
};

const filterAsync = async <T>(
  array: T[],
  callbackFn: (value: T, index: number, array: T[]) => Promise<boolean>
): Promise<T[]> => {
  const filterMap = await mapAsync(array, callbackFn);
  return array.filter((value, index) => filterMap[index]);
};

const scanForLinks = async (): Promise<string[]> => {
  const bodyLinks = await getBodyLinks();

  const bodyHrefs: string[] = await mapAsync(
    // get rid of toc links since anchor links lead to the same page they where found on
    await filterAsync(
      bodyLinks,
      async (link) => (await link.evaluate((x) => x.parentElement.parentElement.parentElement.className)) !== 'toc'
    ),
    evaluateGetHref
  );

  const markdownLinks = await getMarkdownLinks();
  const markdownHrefs: string[] = await mapAsync(markdownLinks, evaluateGetHref);

  const markdownHrefsStartingWithSlash = markdownHrefs.filter((url) => url.startsWith('/'));
  if (markdownHrefsStartingWithSlash.length) {
    console.error('Link(s) starting with "/" were found:', markdownHrefsStartingWithSlash);
  }
  expect(markdownHrefsStartingWithSlash.length, 'markdownHrefsStartingWithSlash.length').toBe(0);

  return bodyHrefs
    .map((x) => (!x.startsWith('http') && !x.startsWith('/') && !x.startsWith('sketch://') ? `/${x}` : x)) // add leading slash for anchor links within markdown
    .filter((x) => whitelistedUrls.indexOf(x) === -1);
};

const getHeadline = async () => {
  await page.waitForSelector('.vmark > h1'), { visible: true };
  return page.$eval('.vmark > h1', (x) => x.innerHTML);
};

const getPatternHeadline = async () => {
  await page.waitForSelector('html.hydrated');
  await page.waitForSelector('p-headline[tag="h1"]', { visible: true });
  return page.$eval('p-headline[tag="h1"]', (x) => x.innerHTML);
};

// exclude URLS which should not be checked -> include all links which lead to downloads because puppeteer cant handle that
const whitelistedUrls: string[] = [
  'https://github.com/porscheui/porsche-design-system',
  'https://designsystem.porsche.com/sketch/porsche-design-system-colors.sketchpalette',
  'https://designsystem.porsche.com/sketch/porsche-design-system-form-templates.sketch',
  'https://designsystem.porsche.com/sketch/porsche-design-system-layout-template.sketch',
  'https://cdn.ui.porsche.com/porsche-design-system/font/v1/Porsche_Next_WebOTF_Lat-Gr-Cyr.zip',
  'https://www.sitepoint.com/introduction-wai-aria/',
  'https://adabook.com/',
  'https://www.etsi.org/deliver/etsi_en/301500_301599/301549/02.01.02_60/en_301549v020102p.pdf',
  'sketch://add-library?url=https%3A%2F%2Fdesignsystem.porsche.com%2Fporsche-design-system-basic.sketch.xml',
  'sketch://add-library?url=https%3A%2F%2Fdesignsystem.porsche.com%2Fporsche-design-system-web.sketch.xml',
];

const linkCheckLoop = async (): Promise<{ amount: number; invalidUrls: string[] }> => {
  const invalidUrls: string[] = [];
  let links = await scanForLinks();

  for (let i = 0; i < links.length; i++) {
    const href = links[i];
    console.log(`Checking [${i + 1}/${links.length}]`, href);

    // Go to internal Url
    if (href.startsWith('/')) {
      const response = await page.goto(`${baseURL}${href}`, { waitUntil: 'domcontentloaded' });

      // match files in public/assets directory
      if (href.match(/^\/assets\/.*\.\w{3,4}$/)) {
        if (response.status() !== 200) {
          invalidUrls.push(href);
        }
      } else {
        const headline =
          href === '/'
            ? 'first page'
            : href.startsWith('/patterns/forms/')
            ? await getPatternHeadline()
            : await getHeadline();

        if (headline === '404 - Page not found') {
          invalidUrls.push(href);
        } else {
          const newLinks = await scanForLinks();
          links = links.concat(newLinks).filter((v, i, a) => a.indexOf(v) === i);
        }
      }
    } else if (href.startsWith('http') && !href.startsWith(`${baseURL}/#`)) {
      // Go to external Url
      // TODO: disabled for now flaky execution
      // const response = await page.goto(href);
      //
      // // Check response
      // if (response?.status() === 404) {
      //   invalidUrls.push(href);
      // }
    } else {
      invalidUrls.push(href);
    }
  }
  return { amount: links.length, invalidUrls };
};

it('should open all links and check headline', async () => {
  await page.goto(baseURL, { waitUntil: 'networkidle0' });
  const { amount, invalidUrls } = await linkCheckLoop();
  console.log('Whitelisted Urls', whitelistedUrls);
  console.log('Invalid Urls', invalidUrls);

  expect(invalidUrls.length, 'invalidUrls').toBe(0);
  expect(amount, 'amount').toBeLessThanOrEqual(420); // detect exponential increase of links, e.g. table of contents
});
