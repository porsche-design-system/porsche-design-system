import { baseURL } from '../helpers';
import type { ElementHandle, Page } from 'puppeteer';
import { config as STOREFRONT_CONFIG } from '../../../storefront.config';
import { paramCase } from 'change-case';
import * as path from 'path';
import * as fs from 'fs';
import { getConsoleErrorsAmount, initConsoleObserver } from '../helpers/puppeteer-helper';

let browserPage: Page;

beforeEach(async () => {
  browserPage = await browser.newPage();
  initConsoleObserver(browserPage);

  await browserPage.goto(baseURL, { waitUntil: 'networkidle0' });
  await page.keyboard.press('Escape'); // Close Banner
  await injectCSSOverrides();
  await browserPage.evaluate(() => (window as any).componentsReady());
});
afterEach(async () => await browserPage.close());

const isLinkActive = (element: ElementHandle | null): Promise<boolean> =>
  element.evaluate((el) => el.className.includes('router-link-active'));
const getMainTitle = (page: Page): Promise<string> => page.$eval('.vmark > h1', (x) => x.innerHTML);
const hasPageObjectObject = (page: Page): Promise<boolean> =>
  page.evaluate(() => document.body.innerText.includes('[object Object]'));

/**
 * to override transition duration of accordion
 */
const injectCSSOverrides = async () => {
  const stylesPath = path.resolve(require.resolve('@porsche-design-system/shared'), '../css/styles.css');
  const styles = fs.readFileSync(stylesPath, 'utf8');

  await browserPage.evaluate((cssStyles: string) => {
    const styleTag = document.createElement('style');
    styleTag.innerText = cssStyles;
    document.head.appendChild(styleTag);
  }, styles);
};

for (const [category, pages] of Object.entries(STOREFRONT_CONFIG)) {
  for (const [page, tabs] of Object.entries(pages).sort(([a], [b]) => a.localeCompare(b))) {
    ((category: string, page: string) => {
      it(`should navigate to "${category} > ${page}"`, async () => {
        // console.log(`${category} > ${page}`);
        const [accordionButton] = await browserPage.$x(
          `//div[@class='sidebar']/nav/p-accordion[@heading='${category}']`
        );
        const href = `\/${paramCase(category)}\/${paramCase(page)}`;
        const [linkElement] = await browserPage.$x(
          `//div[@class='sidebar']/nav//p-link-pure//a[contains(., '${page}')][@href='${href}']`
        );

        await accordionButton.click();

        expect(await isLinkActive(linkElement), 'sidebar link should not be active initially').toBe(false);

        await linkElement.click();
        await browserPage.waitForNetworkIdle();
        await browserPage.evaluate(() => (window as any).componentsReady());

        expect(await isLinkActive(linkElement), 'sidebar link should be active after click').toBe(true);
        expect(await getMainTitle(browserPage), 'should show correct main title for page').toBe(page);
        expect(await hasPageObjectObject(browserPage), 'should not contain [object Object] on page').toBe(false);
        expect(getConsoleErrorsAmount(), `Errors on ${category}/${page}`).toBe(0);

        if (!Array.isArray(tabs)) {
          for (const [index, tab] of Object.entries(Object.keys(tabs))) {
            // console.log(`${category} > ${page} > ${tab}`);
            const tabHref = `\/${paramCase(category)}\/${paramCase(page)}\/${paramCase(tab)}`;
            const [tabElement] = await browserPage.$x(`//p-tabs-bar//a[contains(., '${tab}')][@href='${tabHref}']`);

            const isTabElementActiveInitially = await isLinkActive(tabElement);
            if (parseInt(index) === 0) {
              expect(isTabElementActiveInitially, 'should have first tab active initially').toBe(true);
            } else {
              expect(isTabElementActiveInitially, 'should not have tab active initially').toBe(false);
            }

            await tabElement.click();
            await browserPage.waitForNetworkIdle();
            await browserPage.evaluate(() => (window as any).componentsReady());

            expect(await isLinkActive(tabElement), 'should have tab active after click').toBe(true);
            expect(await getMainTitle(browserPage), 'should show correct main title for tab page').toBe(page);
            expect(await hasPageObjectObject(browserPage), 'should not contain [object Object] on tab page').toBe(
              false
            );
            expect(getConsoleErrorsAmount(), `Errors on ${category}/${page} in tab ${tab}`).toBe(0);
          }
        }
      });
    })(category, page);
  }
}
