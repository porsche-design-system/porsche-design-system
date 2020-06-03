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
  const getHref = (el: Element): string => el.getAttribute('href') as string;
  const getLinks = () => page.$$('a[href],p-link[href],p-link-pure[href]');

  const scanForLinks = async (): Promise<string[]> =>
    (await Promise.all((await getLinks()).map((x) => x.evaluate(getHref)))).map((x) =>
      x!.startsWith('#') ? `${options.baseURL}/${x}` : x
    );

  const getHeadline = async () =>
    (await page.waitForSelector('.vmark > h1')) && page.$eval('.vmark > h1', (x) => x.innerHTML);

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
      const links = await scanForLinks();

      for (let i = 0; i < links.length; i++) {
        const href = links[i];
        //Check if already been here
        if (!urlArray.includes(href)) {
          console.log('Href which is checked', href);
          // Go to internal Url
          if (href.includes(options.baseURL)) {
            await page.goto(href, { waitUntil: 'networkidle0' });
            urlArray.push(href); // Push url which is checked

            const headline = href.endsWith('#/') ? 'first page' : await getHeadline();

            if (headline === '404 - Page not found') {
              checkForRef.push(href);
            } else {
              await linkCheckLoop();
            }
            // Go to external Url
          } else if (href.startsWith('http')) {
            const response = await page.goto(href, { timeout: 0 });
            urlArray.push(href); // Push url which is checked

            // Check response
            if (response?.status() === 404) {
              checkForRef.push(href);
            } else {
              await page.goBack({ waitUntil: 'networkidle0' });
            }
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
