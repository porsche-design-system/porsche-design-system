import { Page } from 'puppeteer';
import { getBrowser, options } from '../helpers/setup';

describe('check for dead links in storefront', () => {
  let page: Page;

  let originalJasminTimeout: number;

  beforeEach(() => {
    originalJasminTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 2147483647;
  });

  afterEach(() => jasmine.DEFAULT_TIMEOUT_INTERVAL = originalJasminTimeout);

  beforeEach(async () => (page = await getBrowser().newPage()));
  afterEach(async () => await page.close());

  // internal functions
  const getHref = (el: Element): string => el.getAttribute('href') as string;
  const getLinks = () => page.$$('a[href],p-link[href],p-link-pure[href]');

  const scanForLinks = async (): Promise<string[]> =>
    (await Promise.all((await getLinks()).map((x) => x.evaluate(getHref))))
      .map((x) => (x!.startsWith('#') ? `${options.baseURL}/${x}` : x))
      .filter((x) => whitelistedUrls.indexOf(x) === -1);

  const getHeadline = async () =>
    (await page.waitForSelector('.vmark > h1')) && page.$eval('.vmark > h1', (x) => x.innerHTML);

  const getPatternHeadline = async () =>
    (await page.waitForSelector('p-headline[tag="h1"]')) && page.$eval('p-headline[tag="h1"]', (x) => x.innerHTML);

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
    'sketch://add-library?url=https%3A%2F%2Fdesignsystem.porsche.com%2Fporsche-design-system-web.sketch.xml'
  ];

  const linkCheckLoop = async () => {
    const invalidUrls: string[] = [];
    let links = await scanForLinks();

    for (let i = 0; i < links.length; i++) {
      const href = links[i];
      console.log('Checking', `[${i + 1}/${links.length}]`, href);

      // Go to internal Url
      if (href.includes(options.baseURL)) {
        await page.goto(href, { waitUntil: 'domcontentloaded' });

        const headline =
          href.endsWith('#/') || href.endsWith('#')
            ? 'first page'
            : href.includes('patterns/forms/')
            ? await getPatternHeadline()
            : await getHeadline();

        if (headline === '404 - Page not found') {
          invalidUrls.push(href);
        } else {
          const newLinks = await scanForLinks();
          links = links.concat(newLinks).filter((v, i, a) => a.indexOf(v) === i);
        }
        // Go to external Url
      } else if (href.startsWith('http')) {
        // const response = await page.goto(href);
        //
        // // Check response
        // if (response?.status() === 404) {
        //   invalidUrls.push(href);
        // } TODO: flaky execution
      } else {
        invalidUrls.push(href);
      }
    }
    return invalidUrls;
  };

  it('should check all a tags for correct response', async () => {
    await page.goto(`${options.baseURL}`, { waitUntil: 'networkidle0' });
    const invalidUrls = await linkCheckLoop();
    console.log('Whitelisted Urls', whitelistedUrls);
    console.log('Invalid Urls', invalidUrls);
    expect(invalidUrls.length).toBe(0);
  });
});
