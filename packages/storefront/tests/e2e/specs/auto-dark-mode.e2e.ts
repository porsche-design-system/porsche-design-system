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
const componentsWithThemeAutoSelector = `:where(${themeableComponents})${[
  ':not(.playground > .example *)', // everything inside playground is not based on color-scheme preferences
  ':not(p-flyout):not(p-flyout *)', // flyout theme is defined by chosen playground theme as well as for its slotted content
  ':not(p-banner)', // banner theme is defined by chosen playground theme
  ':not(p-toast)', // toast theme is defined by chosen playground theme
  ':not(p-button.close-menu-button)', // theme dark is always used since button is placed on shading surface
].join('')}`;

it.each(internalUrls.map<[string, number]>((url, i) => [url, i]))(
  'should have auto dark mode support at %s',
  async (url, index) => {
    console.log(`auto dark mode url ${index + 1}/${internalUrls.length}: ${url}`);

    await page.goto(baseURL + url, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('html.hydrated');
    await page.evaluate(() => (window as any).componentsReady());

    const components = await page.$$(componentsWithThemeAutoSelector);

    expect(components.length).toBeGreaterThan(0);

    for (const component of components) {
      console.log(await getProperty(component, 'tagName'));
      expect(await getProperty(component, 'theme')).toBe('auto');
    }
  }
);
