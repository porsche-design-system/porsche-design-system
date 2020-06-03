import { Page } from 'puppeteer';
import { getBrowser, options } from '../helpers/setup';

fdescribe('check for dead links in storefront', () => {
  let page: Page;

  let originalJasminTimeout: number;

  beforeEach(function() {
    originalJasminTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 2147483647;
  });

  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalJasminTimeout;
  });

  beforeEach(async () => (page = await getBrowser().newPage()));
  afterEach(async () => await page.close());

  // internal functions
  const getATags = async () =>
    await page.$$('a[href]').then((x) => x.map(async (el) => await el.evaluate((y) => y.getAttribute('href'))));
  const getPureLinks = async () =>
    await page
      .$$('p-link-pure[href]')
      .then((x) => x.map(async (el) => await el.evaluate((y) => y.getAttribute('href'))));
  const getLinks = async () =>
    await page.$$('p-link[href]').then((x) => x.map(async (el) => await el.evaluate((y) => y.getAttribute('href'))));
  const getHeadline = async () => await page.$eval('.vmark > h1', (x) => x.getAttribute('innerHtml'));

  // exclude URLS which should not be checked -> include all links which lead to downloads because puppeteer cant handle that
  const urlArray: string[] = [
    'http://designsystem.porsche.com/latest/porsche-design-system-layout-template.sketch',
    'https://cdn.ui.porsche.com/porsche-design-system/font/v1/Porsche_Next_WebOTF_Lat-Gr-Cyr.zip',
    'https://designsystem.porsche.com/latest/porsche-design-system-colors.sketchpalette'
  ];

  const checkForRef: string[] = [];

  fit('should check all a tags for correct response', async () => {
    await page.goto(`${options.baseURL}`, { waitUntil: 'networkidle0' });
    const linkCheckLoop = async () => {
      const aTags = await getATags();
      const pureLinks = await getPureLinks();
      const pLinks = await getLinks();
      const links = [...aTags, ...pureLinks, ...pLinks];

      let i;
      for (i = 0; i < links.length; i++) {
        const href = await links[i];
        //Check if already been here
        if (!urlArray.includes(`${options.baseURL}/${href}`) && !urlArray.includes(`${href}`) && href !== null) {
          console.log('Href which is checked', href);
          // Go to internal Url
          if (href.startsWith('#')) {
            await page.goto(`${options.baseURL}${href}`, { waitUntil: 'networkidle0' });
            // Push url which is checked
            urlArray.push(`${options.baseURL}/${href}`);
            let headline;
            if (href === '#/' || '#') {
              headline = 'first page';
            } else {
              headline = await getHeadline();
            }
            if (headline === '404 - Page not found') {
              checkForRef.push(href);
            } else {
              await linkCheckLoop();
            }
            // Go to external Url
          } else if (href.startsWith('http')) {
            const response = await page.goto(href, { timeout: 0 });
            urlArray.push(href);
            // Check response
            if (response?.status() === 404) {
              checkForRef.push(href);
            } else await page.goBack({ waitUntil: 'networkidle0' });
          } else {
            checkForRef.push(href);
          }
        }
      }
    };
    await linkCheckLoop();
    console.log('Check Url if valid', checkForRef);
  });
});
