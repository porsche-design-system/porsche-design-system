import {
  buildDefaultComponentMarkup,
  expectShadowDomToMatchSnapshot,
  goto,
  selectNode,
  waitForComponentsReady,
} from '../helpers';
import { Page } from 'puppeteer';
import { INTERNAL_TAG_NAMES, TAG_NAMES, TagName } from '@porsche-design-system/shared';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

it.each(TAG_NAMES.filter((x) => !INTERNAL_TAG_NAMES.includes(x)))(
  'should have no basic DOM regression for %s',
  async (tagName) => {
    await goto(page, ''); // start page

    const markup = buildDefaultComponentMarkup(tagName);
    await page.evaluate(
      (tag: TagName, markup: string) => {
        document.getElementById('app').innerHTML = markup;
      },
      tagName,
      markup
    );
    await waitForComponentsReady(page);

    const host = await selectNode(page, tagName);
    await expectShadowDomToMatchSnapshot(host);
  }
);
