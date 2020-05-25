// TODO: improve log in case test fails

import 'jasmine';
import { getBrowser, options } from '../helpers/setup';
import { ElementHandle, Page } from 'puppeteer';
import { config as STOREFRONT_CONFIG } from '../../../storefront.config';
import { paramCase } from 'change-case';

describe('storefront', () => {
  let PAGE: Page;

  beforeEach(async () => PAGE = await getBrowser().newPage());
  afterEach(async () => await PAGE.close());

  const isLinkActive = async (element: ElementHandle | null): Promise<boolean> => element ? await (await element.getProperty('active')).jsonValue() as boolean : false;
  const getInnerText = async (element: ElementHandle | null): Promise<string> => element ? await (await element.getProperty('textContent')).jsonValue() as string : '';
  const getClassNames = async (element: ElementHandle | null): Promise<string> => element ? await (await element.getProperty('className')).jsonValue() as string : '';

  // TODO: split test into multiple describe/it()-blocks
  it('should navigate through configured pages', async () => {

    await PAGE.goto(`${options.baseURL}`, {waitUntil: 'networkidle0'});
    let assertions = 0;
    // TODO: use string array which includes pages

    for (const [category, pages] of Object.entries(STOREFRONT_CONFIG)) {
      // TODO: pre-filter with .$()
      const [buttonElement] = await PAGE.$x(`//p-button-pure[contains(., '${category}')]`);
      await buttonElement.click();

      for (const [page, tabs] of Object.entries(pages)) {
        const [linkElement] = await PAGE.$x(`//p-link-pure[contains(., '${page}')][@href='#\/${paramCase(category)}\/${paramCase(page)}']`);
        expect(await isLinkActive(linkElement)).toBe(false);
        assertions++;
        await linkElement.click();
        expect(await isLinkActive(linkElement)).toBe(true);
        assertions++;

        const titleElement = await PAGE.$('#app main h1');
        expect(await getInnerText(titleElement)).toBe(page);
        assertions++;

        if (!Array.isArray(tabs)) {
          const tabElements = await PAGE.$$('#app main .tabs a');
          expect(tabElements.length).toBe(Object.keys(tabs).length);
          assertions++;

          for (const [index, tab] of Object.entries(Object.keys(tabs))) {

            const tabElement = tabElements[parseInt(index)];

            expect(await getInnerText(tabElement)).toBe(tab);
            assertions++;

            if (parseInt(index) === 0) {
              // TODO: add withContext() or use more it()-blocks
              (expect(await getClassNames(tabElement)) as any).withContext(`failed because something went wrong ${page} > ${tab}`).toContain('router-link-active');
              assertions++;
            } else {
              expect(await getClassNames(tabElement)).not.toContain('router-link-active');
              assertions++;
            }
            await tabElement.click();
            expect(await getClassNames(tabElement)).toContain('router-link-active');
            assertions++;
          }
        }
      }
    }

    expect(assertions).toBe(386);
  });
});
