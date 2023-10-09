import type { Page } from 'puppeteer';
import { baseURL, getInternalUrls, getProperty } from '../helpers';
import { TAG_NAMES } from '@porsche-design-system/shared';
import { getComponentMeta } from '@porsche-design-system/component-meta';

const console = require('console'); // workaround for nicer logs

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

// filter out files from public/assets directory
const internalUrls = getInternalUrls().filter((url) => !url.match(/^\/assets\/.*\.\w{3,4}$/));

const themeableComponents = TAG_NAMES.filter((tagName) => getComponentMeta(tagName).isThemeable).join();
const componentsWithThemeAutoSelector = `:where(${themeableComponents}):not(.playground *)`; // everything inside playground is not based on color-scheme preferences

it.each(internalUrls.map<[string, number]>((url, i) => [url, i]))(
  'should have auto dark mode support at %s',
  async (url, index) => {
    console.log(`auto dark mode url ${index + 1}/${internalUrls.length}: ${url}`);

    await page.goto(baseURL + url, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('html.hydrated');
    await page.evaluate(() => (window as any).componentsReady());

    const components = await page.$$(componentsWithThemeAutoSelector);

    for (const component of components) {
      expect(
        await getProperty(component, `theme`),
        `"${await getProperty(component, 'tagName')}" didn't use theme="auto"`
      ).toBe('auto');
    }
  }
);
