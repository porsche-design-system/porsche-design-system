import type { Page } from 'puppeteer';
import {
  expectA11yToMatchSnapshot,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const getHost = () => selectNode(page, 'p-wordmark');
const getLink = () => selectNode(page, 'p-wordmark >>> a');

const initWordmark = (opts?: {
  hasHref?: boolean;
  isWrapped?: boolean;
  hasFocusableElementBefore?: boolean;
  hasFocusableElementAfter?: boolean;
}): Promise<void> => {
  const {
    hasHref = false,
    isWrapped = false,
    hasFocusableElementBefore = false,
    hasFocusableElementAfter = false,
  } = opts || {};

  const focusableElementBefore = hasFocusableElementBefore ? `<a href="#" id="before">before</a>` : '';
  const focusableElementAfter = hasFocusableElementAfter ? `<a href="#" id="after">after</a>` : '';
  const markup = `<p-wordmark ${hasHref ? 'href="about:blank#" ' : ''} id="my-wordmark"></p-wordmark>`;

  return setContentWithDesignSystem(
    page,
    isWrapped ? `<div>${focusableElementBefore}${markup}${focusableElementAfter}</div>` : markup
  );
};

describe('accessibility', () => {
  it('should expose correct initial accessibility tree', async () => {
    await initWordmark();
    await expectA11yToMatchSnapshot(page, await getHost(), { interestingOnly: false });
  });

  it('should expose correct accessibility tree if accessibility properties are set', async () => {
    await initWordmark({ hasHref: true });
    const host = await getHost();
    const link = await getLink();

    await setProperty(host, 'aria', {
      'aria-label': 'Some more detailed label',
    });
    await waitForStencilLifecycle(page);
    await expectA11yToMatchSnapshot(page, link);
  });
});
