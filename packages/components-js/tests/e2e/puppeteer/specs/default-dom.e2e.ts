import {
  buildDefaultComponentMarkup,
  expectShadowDomToMatchSnapshot,
  goto,
  selectNode,
  waitForComponentsReady,
} from '../helpers';
import type { Page } from 'puppeteer';
import { INTERNAL_TAG_NAMES, TAG_NAMES, type TagName } from '@porsche-design-system/shared';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

it.each<TagName>(TAG_NAMES.filter((x) => !INTERNAL_TAG_NAMES.includes(x)))(
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
