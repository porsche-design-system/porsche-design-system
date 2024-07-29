import { type Page, test, expect } from '@playwright/test';
import { getAttribute, setContentWithDesignSystem, setProperty } from '../../helpers';
import type { ScrollToPosition } from '@porsche-design-system/components/dist/types/bundle';

type InitOptions = {
  amount?: number;
  isWrapped?: boolean;
  otherMarkup?: string;
  tag?: 'a' | 'button' | 'span';
  scrollToPosition?: ScrollToPosition;
  hasScrollbar?: boolean;
};

const initScroller = (page: Page, opts?: InitOptions) => {
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

const getHost = (page: Page) => page.locator('p-scroller');
const getScrollWrapper = (page: Page) => page.locator('p-scroller .scroll-wrapper');

test.fixme('should expose correct initial accessibility tree if aria prop is set', async ({ page }) => {
  await initScroller(page, { amount: 3 });
  const host = getHost(page);
  await setProperty(host, 'aria', {
    role: 'tablist',
  });

  // await expectA11yToMatchSnapshot(page, host, { interestingOnly: false });
});

test('should have correct tabindex on scroll-wrapper if scroller is scrollable and has no focusable elements', async ({
  page,
}) => {
  await initScroller(page, { isWrapped: true, tag: 'span' });
  const scrollWrapper = await getScrollWrapper(page);

  expect(await getAttribute(scrollWrapper, 'tabindex')).toBe('0');
});

test('should have correct tabindex on scroll-wrapper if scroller is scrollable and has focusable elements', async ({
  page,
}) => {
  await initScroller(page, { isWrapped: true });
  const scrollWrapper = await getScrollWrapper(page);

  expect(await getAttribute(scrollWrapper, 'tabindex')).toBe('0');
});
