import type { Page } from 'puppeteer';
import {
  expectA11yToMatchSnapshot,
  getAttribute,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
} from '../helpers';
import type { ScrollToPosition } from '@porsche-design-system/components/dist/types/bundle';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

type InitOptions = {
  amount?: number;
  isWrapped?: boolean;
  otherMarkup?: string;
  tag?: 'a' | 'button' | 'span';
  scrollToPosition?: ScrollToPosition;
  hasScrollbar?: boolean;
};

const initScroller = (opts?: InitOptions) => {
  const { amount = 8, isWrapped, otherMarkup = '', tag = 'button', scrollToPosition, hasScrollbar } = opts || {};

  const elementAttributes = tag === 'a' ? ' onclick="return false" href="#"' : '';
  const elements = Array.from(Array(amount), (_, i) => `<${tag}${elementAttributes}>Button ${i + 1}</${tag}>`).join('');

  const attrs = [
    scrollToPosition ? `scroll-to-position="{ scrollPosition: ${scrollToPosition.scrollPosition} }"` : '',
    hasScrollbar ? `scrollbar="${hasScrollbar}"` : '',
  ].join(' ');

  const content = `<p-scroller ${attrs}>
  ${elements}
</p-scroller>${otherMarkup}`;

  return setContentWithDesignSystem(page, isWrapped ? `<div style="width: 200px">${content}</div>` : content);
};

const getHost = () => selectNode(page, 'p-scroller');
const getScrollWrapper = () => selectNode(page, 'p-scroller >>> .scroll-wrapper');

describe('accessibility', () => {
  it('should expose correct initial accessibility tree if aria prop is set', async () => {
    await initScroller({ amount: 3 });
    const host = await getHost();
    await setProperty(host, 'aria', {
      role: 'tablist',
    });

    await expectA11yToMatchSnapshot(page, host, { interestingOnly: false });
  });

  it('should have correct tabindex on scroll-wrapper if scroller is scrollable and has no focusable elements', async () => {
    await initScroller({ isWrapped: true, tag: 'span' });
    const scrollWrapper = await getScrollWrapper();

    expect(await getAttribute(scrollWrapper, 'tabindex')).toBe('0');
  });

  it('should have correct tabindex on scroll-wrapper if scroller is scrollable and has focusable elements', async () => {
    await initScroller({ isWrapped: true });
    const scrollWrapper = await getScrollWrapper();

    expect(await getAttribute(scrollWrapper, 'tabindex')).toBe('0');
  });
});
