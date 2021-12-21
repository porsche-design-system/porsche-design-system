import { baseURL } from '../helpers';
import { ElementHandle, Page } from 'puppeteer';
import { config as STOREFRONT_CONFIG } from '../../../storefront.config';
import { paramCase } from 'change-case';
import * as path from 'path';
import * as fs from 'fs';
import { getConsoleErrorsAmount, initConsoleObserver } from '../helpers/puppeteer-helper';

let browserPage: Page;
// const logPages: string[] = [];
// const logTabs: string[] = [];

beforeEach(async () => {
  browserPage = await browser.newPage();
  initConsoleObserver(browserPage);
});
afterEach(async () => await browserPage.close());

const isLinkActive = async (element: ElementHandle | null): Promise<boolean> =>
  element ? ((await (await element.getProperty('active')).jsonValue()) as boolean) : false;
const getClassNames = async (element: ElementHandle | null): Promise<string> =>
  element ? ((await (await element.getProperty('className')).jsonValue()) as string) : '';
const getMainTitle = async (page: Page): Promise<string> => page.$eval('.vmark > h1', (x) => x.innerHTML);
const hasPageObjectObject = async (page: Page): Promise<boolean> =>
  page.evaluate(() => document.body.innerText.includes('[object Object]'));

const injectCSSOverrides = async () => {
  const pathToShared = require.resolve('@porsche-design-system/shared');
  const pathToOverrides = path.resolve(pathToShared, '../css/styles.css');
  const overrides = fs.readFileSync(pathToOverrides, 'utf8');

  await browserPage.evaluate((overrides) => {
    const styleTag = document.createElement('style');
    styleTag.innerText = overrides;
    document.getElementsByTagName('head')[0].appendChild(styleTag);
  }, overrides);
};

for (const [category, pages] of Object.entries(STOREFRONT_CONFIG)) {
  for (const [page, tabs] of Object.entries(pages).sort(([a], [b]) => a.localeCompare(b))) {
    ((category: string, page: string) => {
      it(`should navigate to "${category} > ${page}"`, async () => {
        await browserPage.goto(baseURL, { waitUntil: 'networkidle0' });
        await injectCSSOverrides();
        await browserPage.evaluate(() => (window as any).componentsReady());

        const [accordionButton] = await browserPage.$x(
          `//div[@class='sidebar']/nav/p-accordion[@heading='${category}']`
        );
        const href = `\/${paramCase(category)}\/${paramCase(page)}`;
        const [linkElement] = await browserPage.$x(
          `//div[@class='sidebar']/nav//p-link-pure[contains(., '${page}')][@href='${href}']`
        );

        await accordionButton.click();

        expect(await isLinkActive(linkElement), 'link should be inactive initially').toBe(false);

        await linkElement.click();
        await browserPage.waitForSelector('.vmark');
        await browserPage.evaluate(() => (window as any).componentsReady());

        expect(await isLinkActive(linkElement), 'link should be active after click').toBe(true);
        expect(await getMainTitle(browserPage), 'should show correct main title for page view').toBe(page);
        expect(getConsoleErrorsAmount(), `Errors on ${category}/${page}`).toBe(0);

        if (!Array.isArray(tabs)) {
          for (const [index, tab] of Object.entries(Object.keys(tabs))) {
            const [tabElement] = await browserPage.$x(
              `//p-tabs-bar//a[contains(., '${tab}')][@href='\/${paramCase(category)}\/${paramCase(page)}\/${paramCase(
                tab
              )}']`
            );

            if (parseInt(index) === 0) {
              expect(await getClassNames(tabElement), 'should have first tab active initially').toContain(
                'router-link-active'
              );
            } else {
              expect(await getClassNames(tabElement), 'should have tab not active initially').not.toContain(
                'router-link-active'
              );
            }

            await tabElement.click();
            await browserPage.waitForSelector('.vmark');
            await browserPage.evaluate(() => (window as any).componentsReady());

            expect(await getClassNames(tabElement), 'should have tab active after click').toContain(
              'router-link-active'
            );
            expect(await getMainTitle(browserPage), 'should show correct main title for tab view').toBe(page);
            expect(await hasPageObjectObject(browserPage), 'should not contain [object Object]').toBe(false);
            expect(getConsoleErrorsAmount(), `Errors on ${category}/${page} in tag ${tab}`).toBe(0);

            // logTabs.push(`${category} > ${page} > ${tab}`);
          }
        }

        // logPages.push(`${category} > ${page}`);
      });
    })(category, page);
  }
}
