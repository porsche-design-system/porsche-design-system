import 'jasmine';
import { getBrowser, options } from '../helpers/setup';
import { ElementHandle, Page } from 'puppeteer';
import { config as STOREFRONT_CONFIG } from '../../../storefront.config';
import { paramCase } from 'change-case';

describe('storefront', () => {
  let browserPage: Page;
  const logPages: string[] = [];
  const logTabs: string[] = [];

  beforeEach(async () => browserPage = await getBrowser().newPage());
  afterEach(async () => await browserPage.close());

  const isLinkActive = async (element: ElementHandle | null): Promise<boolean> => element ? await (await element.getProperty('active')).jsonValue() as boolean : false;
  const getClassNames = async (element: ElementHandle | null): Promise<string> => element ? await (await element.getProperty('className')).jsonValue() as string : '';
  const getMainTitle = async (page: Page): Promise<string> => page.$eval('.vmark > h1', (x) => x.innerHTML);

  for (const [category, pages] of Object.entries(STOREFRONT_CONFIG)) {
    for (const [page, tabs] of Object.entries(pages)) {
      ((category: string, page: string) => {

        it(`should navigate to "${category} > ${page}"`, async () => {

          await browserPage.goto(`${options.baseURL}`, {waitUntil: 'networkidle0'});
          await browserPage.waitForSelector('html.hydrated');

          const [buttonElement] = await browserPage.$x(`//div[@class='sidebar']//nav//p-button-pure[contains(., '${category}')]`);
          const [linkElement] = await browserPage.$x(`//div[@class='sidebar']//nav//p-link-pure[contains(., '${page}')][@href='#\/${paramCase(category)}\/${paramCase(page)}']`);

          await buttonElement.click();

          (expect(await isLinkActive(linkElement)) as any).withContext(`link should be inactive initially`).toBe(false);

          await linkElement.click();
          await browserPage.waitForSelector('.vmark');

          (expect(await isLinkActive(linkElement)) as any).withContext(`link should be active after click`).toBe(true);
          (expect(await getMainTitle(browserPage)) as any).withContext(`should show correct main title for page view`).toBe(page);

          if (!Array.isArray(tabs)) for (const [index, tab] of Object.entries(Object.keys(tabs))) {

            const [tabElement] = await browserPage.$x(`//nav[@class='tabs']//a[contains(., '${tab}')][@href='#\/${paramCase(category)}\/${paramCase(page)}#${paramCase(tab)}']`);

            if (parseInt(index) === 0) {
              (expect(await getClassNames(tabElement)) as any).withContext(`should have first tab active initially`).toContain('router-link-active');
            } else {
              (expect(await getClassNames(tabElement)) as any).withContext(`should have tab not active initially`).not.toContain('router-link-active');
            }

            await tabElement.click();
            await browserPage.waitForSelector('.vmark');

            (expect(await getClassNames(tabElement)) as any).withContext(`should have tab active after click`).toContain('router-link-active');
            (expect(await getMainTitle(browserPage)) as any).withContext(`should show correct main title for tab view`).toBe(page);

            logTabs.push(`${category} > ${page} > ${tab}`);
          }

          logPages.push(`${category} > ${page}`);
        });

      })(category, page);
    }
  }

  it('log', async () => {
    console.log('Visited Pages', logPages);
    console.log('Visited Tabs', logTabs);
  });
});
