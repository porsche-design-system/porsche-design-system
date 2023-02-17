import {
  buildDefaultComponentMarkup,
  expectShadowDomToMatchSnapshot,
  goto,
  selectNode,
  setProperty,
  waitForComponentsReady,
  waitForStencilLifecycle,
} from '../helpers';
import type { Page } from 'puppeteer';
import { getComponentMeta, INTERNAL_TAG_NAMES, TAG_NAMES } from '@porsche-design-system/shared';

const tagNamesWithSlotAndTheme = TAG_NAMES.filter(
  (tagName) => getComponentMeta(tagName).hasSlot && getComponentMeta(tagName).isThemeable
);

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

it.each(TAG_NAMES.filter((x) => !INTERNAL_TAG_NAMES.includes(x)))(
  'should have no basic DOM regression for %s',
  async (tagName) => {
    await goto(page, ''); // start page

    const markup = buildDefaultComponentMarkup(tagName);
    await page.evaluate((markup: string) => {
      document.getElementById('app').innerHTML = markup;
    }, markup);
    await waitForComponentsReady(page);

    if (tagName === 'p-icon') {
      // some buffer for the svg to load
      await new Promise((resolve) => setTimeout(resolve, 50));
    }

    const host = await selectNode(page, tagName);
    await expectShadowDomToMatchSnapshot(host);
  }
);

it.each(tagNamesWithSlotAndTheme)('should have property data-theme for %s', async (tagName) => {
  // the slot of p-popover is currently rendered on light background
  if (tagName !== 'p-popover') {
    await goto(page, ''); // start page

    const markup = buildDefaultComponentMarkup(tagName, 'dark');
    await page.evaluate((markup: string) => {
      document.getElementById('app').innerHTML = markup;
    }, markup);
    await waitForComponentsReady(page);

    const dataThemeAttribute = await page.$eval(tagName, (element) => element.getAttribute('data-theme'));

    expect(dataThemeAttribute).toBe('dark');
  }
});
