import 'jasmine';
import { getBrowser, options } from '../helpers/setup';
import { ElementHandle, Page } from 'puppeteer';
import { config as STOREFRONT_CONFIG } from '../../../storefront.config';
import { paramCase } from 'change-case';

fdescribe('storefront', () => {
  let browserPage: Page;

  beforeEach(async () => browserPage = await getBrowser().newPage());
  afterEach(async () => await browserPage.close());

  const isLinkActive = async (element: ElementHandle | null): Promise<boolean> => element ? await (await element.getProperty('active')).jsonValue() as boolean : false;
  const getInnerText = async (element: ElementHandle | null): Promise<string> => element ? await (await element.getProperty('textContent')).jsonValue() as string : '';
  const getClassNames = async (element: ElementHandle | null): Promise<string> => element ? await (await element.getProperty('className')).jsonValue() as string : '';
  const getMainTitle = async (page: Page) => getInnerText(await page.$('#app main h1'));

  const visitedViews = [];

  for (const [category, pages] of Object.entries(STOREFRONT_CONFIG)) {
    for (const [page, tabs] of Object.entries(pages)) {
      ((category: string, page: string) => {

        it(`should navigate to "${category} > ${page}"`, async () => {

          await browserPage.goto(`${options.baseURL}`, {waitUntil: 'networkidle0'});

          const [buttonElement] = await browserPage.$x(`//p-button-pure[contains(., '${category}')]`);
          const [linkElement] = await browserPage.$x(`//p-link-pure[contains(., '${page}')][@href='#\/${paramCase(category)}\/${paramCase(page)}']`);

          await buttonElement.click();

          (expect(await isLinkActive(linkElement)) as any).withContext(`link "${category} > ${page}" should be inactive`).toBe(false);

          await linkElement.click();

          await browserPage.waitFor(element => element.getAttribute('active'), {}, linkElement);

          (expect(await isLinkActive(linkElement)) as any).withContext(`link "${category} > ${page}" should be active`).toBe(true);
          (expect(await getMainTitle(browserPage)) as any).withContext(`page view "${category} > ${page}" should contain correct main title`).toBe(page);

          if (!Array.isArray(tabs)) for (const [index, tab] of Object.entries(Object.keys(tabs))) {
            const tabElements = await browserPage.$$('#app main .tabs a');
            const tabElement = tabElements[parseInt(index)];

            (expect(tabElements.length) as any).withContext(`page view "${category} > ${page} > ${tab}" should show certain amount of tabs`).toBe(Object.keys(tabs).length);
            (expect(await getInnerText(tabElement)) as any).withContext(`page view "${category} > ${page} > ${tab}" should show correct tab name`).toBe(tab);

            if (parseInt(index) === 0) {
              (expect(await getClassNames(tabElement)) as any).withContext(`page view "${category} > ${page} > ${tab}" should have first tab active initially`).toContain('router-link-active');
            } else {
              (expect(await getClassNames(tabElement)) as any).withContext(`page view "${category} > ${page} > ${tab}" should have tab not active initially`).not.toContain('router-link-active');
            }

            await tabElement.click();
            (expect(await getClassNames(tabElement)) as any).withContext(`page view "${category} > ${page} > ${tab}" should have tab active after click`).toContain('router-link-active');
          }
        });

      })(category, page);
    }
  }
});
