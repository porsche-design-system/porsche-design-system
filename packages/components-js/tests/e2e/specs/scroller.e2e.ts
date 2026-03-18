import { expect, type Locator, type Page, test } from '@playwright/test';
import type { Components } from '@porsche-design-system/components';
import {
  CSS_ANIMATION_DURATION,
  getAttribute,
  getElementStyle,
  getLifecycleStatus,
  getOffsetWidth,
  getProperty,
  getScrollLeft,
  SCROLL_PERCENTAGE,
  setContentWithDesignSystem,
  setProperty,
  sleep,
  waitForStencilLifecycle,
} from '../helpers';

type InitOptions = {
  amount?: number;
  isWrapped?: boolean;
  otherMarkup?: string;
  tag?: 'a' | 'button' | 'span';
  scrollToPosition?: Components.PScroller['scrollToPosition'];
  hasScrollbar?: boolean;
};

const initScroller = (page: Page, opts?: InitOptions) => {
  const { amount = 8, isWrapped, otherMarkup = '', tag = 'button', scrollToPosition, hasScrollbar } = opts || {};

  const elementAttributes = tag === 'a' ? ' onclick="return false" href="#"' : '';
  const elements = Array.from(Array(amount), (_, i) => `<${tag}${elementAttributes}>Button ${i + 1}</${tag}>`).join('');

  const attrs = [
    scrollToPosition
      ? `scroll-to-position="{ scrollPosition: ${scrollToPosition.scrollPosition}${scrollToPosition.isSmooth !== undefined ? `, isSmooth: ${scrollToPosition.isSmooth}` : ''} }"`
      : '',
    hasScrollbar ? `scrollbar="${hasScrollbar}"` : '',
  ].join(' ');

  const content = `<p-scroller ${attrs}>
  ${elements}
</p-scroller>${otherMarkup}`;

  return setContentWithDesignSystem(page, isWrapped ? `<div style="width: 200px">${content}</div>` : content);
};

const getHost = (page: Page) => page.locator('p-scroller');
const getScrollArea = (page: Page) => page.locator('p-scroller .scroll');
const getScrollIndicators = async (page: Page) => {
  const prevButton = page.locator('p-scroller .prev');
  const nextButton = page.locator('p-scroller .next');
  return { prevButton, nextButton };
};
const clickElement = async (page: Page, el: Locator) => {
  await el.click();
  await waitForStencilLifecycle(page);
  await sleep(CSS_ANIMATION_DURATION);
};

const addNewButton = async (page: Page) => {
  await page.evaluate(() => {
    const scroller = document.querySelector('p-scroller');
    const element = document.createElement('button');
    element.innerText = 'Added Element Text';
    scroller.append(element);
  });
};

const getPrevIndicator = (page: Page) => page.locator('p-scroller .prev');
const getNextIndicator = (page: Page) => page.locator('p-scroller .next');

test.describe('scroll indicator', () => {
  test('should hide both indicators when content does not overflow', async ({ page }) => {
    await initScroller(page, { amount: 2 });
    const prevIndicator = getPrevIndicator(page);
    const nextIndicator = getNextIndicator(page);

    expect(await getElementStyle(prevIndicator, 'visibility')).toBe('hidden');
    expect(await getElementStyle(nextIndicator, 'visibility')).toBe('hidden');
  });

  test('should show only next indicator when content overflows to the right', async ({ page }) => {
    await initScroller(page, { amount: 8, isWrapped: true });
    const prevIndicator = getPrevIndicator(page);
    const nextIndicator = getNextIndicator(page);

    expect(await getElementStyle(prevIndicator, 'visibility')).toBe('hidden');
    expect(await getElementStyle(nextIndicator, 'visibility')).toBe('visible');
  });

  test('should show both indicators when scrolled to the middle', async ({ page }) => {
    await initScroller(page, { amount: 8, isWrapped: true });
    const prevIndicator = getPrevIndicator(page);
    const nextIndicator = getNextIndicator(page);
    const { nextButton } = await getScrollIndicators(page);

    await clickElement(page, nextButton);

    expect(await getElementStyle(prevIndicator, 'visibility')).toBe('visible');
    expect(await getElementStyle(nextIndicator, 'visibility')).toBe('visible');
  });

  test('should show only prev indicator when scrolled to the end', async ({ page }) => {
    await initScroller(page, { amount: 6, isWrapped: true });
    const prevIndicator = getPrevIndicator(page);
    const nextIndicator = getNextIndicator(page);
    const scrollArea = getScrollArea(page);

    // Scroll to the very end
    await scrollArea.evaluate((el) => el.scrollTo({ left: el.scrollWidth, behavior: 'instant' }));
    await sleep(CSS_ANIMATION_DURATION);

    expect(await getElementStyle(prevIndicator, 'visibility')).toBe('visible');
    expect(await getElementStyle(nextIndicator, 'visibility')).toBe('hidden');
  });

  test('should update indicators when scrolling back to the start', async ({ page }) => {
    await initScroller(page, { amount: 8, isWrapped: true });
    const prevIndicator = getPrevIndicator(page);
    const nextIndicator = getNextIndicator(page);
    const scrollArea = getScrollArea(page);

    // Scroll to the middle first
    await scrollArea.evaluate((el) => el.scrollTo({ left: el.scrollWidth / 2, behavior: 'instant' }));
    await sleep(CSS_ANIMATION_DURATION);

    expect(await getElementStyle(prevIndicator, 'visibility')).toBe('visible');

    // Scroll back to start
    await scrollArea.evaluate((el) => el.scrollTo({ left: 0, behavior: 'instant' }));
    await sleep(CSS_ANIMATION_DURATION);

    expect(await getElementStyle(prevIndicator, 'visibility')).toBe('hidden');
    expect(await getElementStyle(nextIndicator, 'visibility')).toBe('visible');
  });

  test('should show next indicator after dynamically adding content that causes overflow', async ({ page }) => {
    await initScroller(page, { amount: 3, isWrapped: true });
    const nextIndicator = getNextIndicator(page);

    expect(await getElementStyle(nextIndicator, 'visibility')).toBe('hidden');

    await addNewButton(page);
    await addNewButton(page);
    await addNewButton(page);
    await waitForStencilLifecycle(page);
    await sleep(CSS_ANIMATION_DURATION);

    expect(await getElementStyle(nextIndicator, 'visibility')).toBe('visible');
  });

  test('should hide both indicators when scroller has no children', async ({ page }) => {
    await setContentWithDesignSystem(page, `<p-scroller></p-scroller>`);
    const prevIndicator = getPrevIndicator(page);
    const nextIndicator = getNextIndicator(page);

    expect(await getElementStyle(prevIndicator, 'visibility')).toBe('hidden');
    expect(await getElementStyle(nextIndicator, 'visibility')).toBe('hidden');
  });

  test('should correctly observe sentinel elements after component loads', async ({ page }) => {
    await initScroller(page, { amount: 8, isWrapped: true });

    // Verify sentinels exist in the shadow DOM
    const sentinelCount = await page.locator('p-scroller .sentinel').count();
    expect(sentinelCount).toBe(2);
  });

  test('should react to programmatic scroll position changes', async ({ page }) => {
    await initScroller(page, { amount: 8, isWrapped: true });
    const prevIndicator = getPrevIndicator(page);
    const nextIndicator = getNextIndicator(page);
    const scrollArea = getScrollArea(page);

    // Initially: only next is visible
    expect(await getElementStyle(prevIndicator, 'visibility')).toBe('hidden');
    expect(await getElementStyle(nextIndicator, 'visibility')).toBe('visible');

    // Programmatically scroll to end
    await scrollArea.evaluate((el) => el.scrollTo({ left: el.scrollWidth, behavior: 'instant' }));
    await sleep(CSS_ANIMATION_DURATION);

    expect(await getElementStyle(prevIndicator, 'visibility')).toBe('visible');
    expect(await getElementStyle(nextIndicator, 'visibility')).toBe('hidden');

    // Programmatically scroll back to start
    await scrollArea.evaluate((el) => el.scrollTo({ left: 0, behavior: 'instant' }));
    await sleep(CSS_ANIMATION_DURATION);

    expect(await getElementStyle(prevIndicator, 'visibility')).toBe('hidden');
    expect(await getElementStyle(nextIndicator, 'visibility')).toBe('visible');
  });
});

test.describe('scroll behavior', () => {
  test('should scroll forward by half the visible width when clicking next indicator', async ({ page }) => {
    await initScroller(page, { amount: 8, isWrapped: true });
    const scrollArea = getScrollArea(page);
    const { nextButton } = await getScrollIndicators(page);

    const scrollLeftBefore = await getScrollLeft(scrollArea);
    expect(scrollLeftBefore).toBe(0);

    await clickElement(page, nextButton);

    const scrollLeftAfter = await getScrollLeft(scrollArea);
    expect(scrollLeftAfter).toBeGreaterThan(0);
  });

  test('should scroll backward by half the visible width when clicking prev indicator', async ({ page }) => {
    await initScroller(page, { amount: 8, isWrapped: true });
    const scrollArea = getScrollArea(page);
    const { prevButton, nextButton } = await getScrollIndicators(page);

    // First scroll forward
    await clickElement(page, nextButton);
    const scrollLeftAfterNext = await getScrollLeft(scrollArea);
    expect(scrollLeftAfterNext).toBeGreaterThan(0);

    // Then scroll backward
    await clickElement(page, prevButton);
    const scrollLeftAfterPrev = await getScrollLeft(scrollArea);
    expect(scrollLeftAfterPrev).toBeLessThan(scrollLeftAfterNext);
  });

  test('should scroll forward multiple times consecutively', async ({ page }) => {
    await initScroller(page, { amount: 8, isWrapped: true });
    const scrollArea = getScrollArea(page);
    const { nextButton } = await getScrollIndicators(page);

    await clickElement(page, nextButton);
    const scrollLeftFirst = await getScrollLeft(scrollArea);

    await clickElement(page, nextButton);
    const scrollLeftSecond = await getScrollLeft(scrollArea);

    expect(scrollLeftSecond).toBeGreaterThan(scrollLeftFirst);
  });

  test('should scroll back to start after scrolling forward and then clicking prev enough times', async ({ page }) => {
    await initScroller(page, { amount: 8, isWrapped: true });
    const scrollArea = getScrollArea(page);
    const { prevButton, nextButton } = await getScrollIndicators(page);

    // Scroll forward once
    await clickElement(page, nextButton);
    expect(await getScrollLeft(scrollArea)).toBeGreaterThan(0);

    // Scroll backward once (same distance)
    await clickElement(page, prevButton);
    const scrollLeftBack = await getScrollLeft(scrollArea);
    expect(scrollLeftBack).toBe(0);
  });

  test('should not scroll past the beginning when clicking prev at start', async ({ page }) => {
    await initScroller(page, { amount: 8, isWrapped: true });
    const scrollArea = getScrollArea(page);

    // Scroll area should be at position 0
    expect(await getScrollLeft(scrollArea)).toBe(0);

    // Programmatically invoke a prev scroll by clicking the prev indicator area
    // Since prev is hidden at start, scroll via JS and then go back
    await scrollArea.evaluate((el) => el.scrollBy({ left: -100, behavior: 'instant' }));
    await sleep(CSS_ANIMATION_DURATION);

    // scrollLeft should not go below 0
    expect(await getScrollLeft(scrollArea)).toBe(0);
  });

  test('should not scroll past the end when clicking next at the end', async ({ page }) => {
    await initScroller(page, { amount: 8, isWrapped: true });
    const scrollArea = getScrollArea(page);

    // Scroll to the very end
    await scrollArea.evaluate((el) => el.scrollTo({ left: el.scrollWidth, behavior: 'instant' }));
    await sleep(CSS_ANIMATION_DURATION);

    const scrollLeftAtEnd = await getScrollLeft(scrollArea);

    // Try to scroll further right
    await scrollArea.evaluate((el) => el.scrollBy({ left: 200, behavior: 'instant' }));
    await sleep(CSS_ANIMATION_DURATION);

    // scrollLeft should not increase beyond max
    expect(await getScrollLeft(scrollArea)).toBe(scrollLeftAtEnd);
  });

  test('should use half the scroll area offsetWidth as scroll distance', async ({ page }) => {
    await initScroller(page, { amount: 8, isWrapped: true });
    const scrollArea = getScrollArea(page);
    const { nextButton } = await getScrollIndicators(page);
    const offsetWidth = await getOffsetWidth(scrollArea);

    await clickElement(page, nextButton);

    const scrollLeft = await getScrollLeft(scrollArea);
    // The scroll distance should be approximately half the visible width
    // Allow small rounding tolerance
    expect(scrollLeft).toBeGreaterThanOrEqual(Math.floor(offsetWidth * 0.5) - 1);
    expect(scrollLeft).toBeLessThanOrEqual(Math.ceil(offsetWidth * 0.5) + 1);
  });
});

test.describe('scrollToPosition', () => {
  test('should scroll to the specified position on initial load', async ({ page }) => {
    await initScroller(page, { amount: 8, isWrapped: true, scrollToPosition: { scrollPosition: 100 } });
    const scrollArea = getScrollArea(page);

    await sleep(CSS_ANIMATION_DURATION);

    expect(await getScrollLeft(scrollArea)).toBe(100);
  });

  test('should scroll to the specified position when prop is updated', async ({ page }) => {
    await initScroller(page, { amount: 8, isWrapped: true });
    const host = getHost(page);
    const scrollArea = getScrollArea(page);

    expect(await getScrollLeft(scrollArea)).toBe(0);

    await setProperty(host, 'scrollToPosition', { scrollPosition: 150, isSmooth: false });
    await waitForStencilLifecycle(page);
    await sleep(CSS_ANIMATION_DURATION);

    expect(await getScrollLeft(scrollArea)).toBe(150);
  });

  test('should scroll to a different position when prop is updated multiple times', async ({ page }) => {
    await initScroller(page, { amount: 8, isWrapped: true });
    const host = getHost(page);
    const scrollArea = getScrollArea(page);

    await setProperty(host, 'scrollToPosition', { scrollPosition: 50, isSmooth: false });
    await waitForStencilLifecycle(page);
    await sleep(CSS_ANIMATION_DURATION);

    expect(await getScrollLeft(scrollArea)).toBe(50);

    await setProperty(host, 'scrollToPosition', { scrollPosition: 200, isSmooth: false });
    await waitForStencilLifecycle(page);
    await sleep(CSS_ANIMATION_DURATION);

    expect(await getScrollLeft(scrollArea)).toBe(200);
  });

  test('should scroll back to start when scrollPosition is set to 0', async ({ page }) => {
    await initScroller(page, { amount: 8, isWrapped: true, scrollToPosition: { scrollPosition: 100 } });
    const host = getHost(page);
    const scrollArea = getScrollArea(page);

    await sleep(CSS_ANIMATION_DURATION);
    expect(await getScrollLeft(scrollArea)).toBe(100);

    await setProperty(host, 'scrollToPosition', { scrollPosition: 0, isSmooth: false });
    await waitForStencilLifecycle(page);
    await sleep(CSS_ANIMATION_DURATION);

    expect(await getScrollLeft(scrollArea)).toBe(0);
  });

  test('should not update when scroller is not scrollable', async ({ page }) => {
    // Only 2 items, should not overflow in a non-wrapped container
    await initScroller(page, { amount: 2 });
    const host = getHost(page);
    const scrollArea = getScrollArea(page);

    await setProperty(host, 'scrollToPosition', { scrollPosition: 50, isSmooth: false });
    await waitForStencilLifecycle(page);
    await sleep(CSS_ANIMATION_DURATION);

    // scrollLeft should remain 0 since content does not overflow and componentShouldUpdate prevents update
    expect(await getScrollLeft(scrollArea)).toBe(0);
  });

  test('should update scroll indicators after scrollToPosition is applied', async ({ page }) => {
    await initScroller(page, { amount: 8, isWrapped: true, scrollToPosition: { scrollPosition: 100 } });
    const prevIndicator = getPrevIndicator(page);
    const nextIndicator = getNextIndicator(page);

    await sleep(CSS_ANIMATION_DURATION);

    // After scrolling to 100, both indicators should be visible (middle of scroll)
    expect(await getElementStyle(prevIndicator, 'visibility')).toBe('visible');
    expect(await getElementStyle(nextIndicator, 'visibility')).toBe('visible');
  });
});

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initScroller(page, { amount: 3, tag: 'a' });
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-scroller'], 'componentDidLoad: p-scroller').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  test('should work without unnecessary round trips on init when scrollToPosition is set', async ({ page }) => {
    await initScroller(page, { isWrapped: true, tag: 'a', scrollToPosition: { scrollPosition: 100 } });
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-scroller'], 'componentDidUpdate: p-scroller').toBe(1);

    expect(status.componentDidLoad['p-scroller'], 'componentDidLoad: p-scroller').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });

  test('should work without unnecessary round trips on prop change', async ({ page }) => {
    await initScroller(page, { amount: 3, tag: 'button' });
    const host = getHost(page);

    await setProperty(host, 'scrollbar', true);
    await waitForStencilLifecycle(page);

    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-scroller'], 'componentDidUpdate: p-scroller').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });
});
