import {
  buildDefaultComponentMarkup,
  expectShadowDomToMatchSnapshot,
  goto,
  selectNode,
  setContentWithDesignSystem,
  waitForComponentsReady,
  waitForStencilLifecycle,
} from '../helpers';
import type { Page } from 'puppeteer';
import { INTERNAL_TAG_NAMES, TAG_NAMES } from '@porsche-design-system/shared';
import * as beautify from 'js-beautify';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

it.each(TAG_NAMES.filter((x) => !INTERNAL_TAG_NAMES.includes(x)))(
  'should have no basic DOM regression for %s',
  async (tagName) => {
    await page.setContent(
      `<!DOCTYPE html>
    <html>
      <head>
        <base href="http://localhost:8575"> <!-- NOTE: we need a base tag so that document.baseURI returns something else than "about:blank" -->
        <script type="text/javascript" src="http://localhost:8575/index.js"></script>
      </head>
      <body>
        <script type="text/javascript">porscheDesignSystem.load();</script>
        ${buildDefaultComponentMarkup(tagName)}
      </body>
    </html>`,
      { waitUntil: 'networkidle0' }
    );

    await waitForComponentsReady(page);
    if (tagName === 'p-icon') {
      // some buffer for the svg to load
      await new Promise((resolve) => setTimeout(resolve, 50));
    }

    const host = await selectNode(page, tagName);
    await expectShadowDomToMatchSnapshot(host);
  }
);
