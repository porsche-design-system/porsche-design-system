import { expect, type Locator, type Page, test } from '@playwright/test';
import type { Components } from '@porsche-design-system/components';
import {
  CSS_ANIMATION_DURATION,
  getAttribute,
  getElementStyle,
  getLifecycleStatus,
  getProperty,
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
    scrollToPosition ? `scroll-to-position="{ scrollPosition: ${scrollToPosition.scrollPosition} }"` : '',
    hasScrollbar ? `scrollbar="${hasScrollbar}"` : '',
  ].join(' ');

  const content = `<p-scroller ${attrs}>
  ${elements}
</p-scroller>${otherMarkup}`;

  return setContentWithDesignSystem(page, isWrapped ? `<div style="width: 200px">${content}</div>` : content);
};

const getHost = (page: Page) => page.locator('p-scroller');
const getAllButtons = (page: Page) => page.locator('button').all();
const getScrollArea = (page: Page) => page.locator('p-scroller .scroll-area');
const getActionContainers = async (page: Page) => {
  const actionPrev = page.locator('p-scroller .action-prev');
  const actionNext = page.locator('p-scroller .action-next');
  return { actionPrev, actionNext };
};
const getPrevNextButton = async (page: Page) => {
  const prevButton = page.locator('p-scroller .action-prev button');
  const nextButton = page.locator('p-scroller .action-next button');
  return { prevButton, nextButton };
};
const getScrollLeft = (element: Locator) => getProperty(element, 'scrollLeft');
const getOffsetWidth = (element: Locator) => getProperty(element, 'offsetWidth');

const getScrollDistance = (page: Page, scrollAreaWidth: number): number =>
  Math.round(scrollAreaWidth * SCROLL_PERCENTAGE);

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

test.describe('scrolling', () => {
  test('should have correct initial scroll position when scrollToPosition is set', async ({ page }) => {
    await initScroller(page, { isWrapped: true, scrollToPosition: { scrollPosition: 50 } });

    expect(await getScrollLeft(getScrollArea(page))).toBe(50);
  });
});

test.describe('slotted content changes', () => {
  test('should show next button after adding a button', async ({ page }) => {
    await initScroller(page, { amount: 3, isWrapped: true });
    const { actionNext } = await getActionContainers(page);

    await expect(actionNext).toBeHidden();

    await addNewButton(page);
    await waitForStencilLifecycle(page);

    await expect(actionNext).toBeVisible();
  });
});

// TODO: Include this test again
test.describe('next/prev buttons', () => {
  test.skip();
  test('should scroll by 20% on button prev/next click', async ({ page }) => {
    await initScroller(page, { isWrapped: true });
    const { prevButton, nextButton } = await getPrevNextButton(page);
    const scrollArea = getScrollArea(page);
    const scrollAreaWidth = await getOffsetWidth(scrollArea);
    const scrollDistance = getScrollDistance(page, +scrollAreaWidth);

    expect(await getScrollLeft(scrollArea)).toEqual(0);

    await clickElement(page, nextButton);
    expect(await getScrollLeft(scrollArea)).toEqual(scrollDistance);

    await clickElement(page, nextButton);
    expect(await getScrollLeft(scrollArea)).toEqual(scrollDistance * 2);

    await clickElement(page, prevButton);
    expect(await getScrollLeft(scrollArea)).toEqual(scrollDistance);

    await clickElement(page, prevButton);
    expect(await getScrollLeft(scrollArea)).toEqual(0);
  });

  test('should scroll to max scroll-position on multiple next clicks', async ({ page }) => {
    await initScroller(page, { amount: 6, isWrapped: true });
    const [firstButton] = await getAllButtons(page);
    const { nextButton } = await getPrevNextButton(page);
    const scrollArea = getScrollArea(page);

    expect(await getScrollLeft(scrollArea)).toEqual(0);

    await clickElement(page, nextButton);
    await clickElement(page, nextButton);
    await clickElement(page, nextButton);
    await clickElement(page, nextButton);
    await clickElement(page, nextButton);

    const scrollPosition = await getScrollLeft(scrollArea);

    await clickElement(page, firstButton);
    const scrollMax = await scrollArea.evaluate((el): number => {
      el.scrollTo({ left: el.scrollWidth });
      return el.scrollLeft;
    });

    expect(scrollPosition).toEqual(scrollMax);
  });

  test('should have type="button" attribute', async ({ page }) => {
    await initScroller(page);

    const { prevButton, nextButton } = await getPrevNextButton(page);

    expect(await getProperty(prevButton, 'type')).toBe('button');
    expect(await getProperty(nextButton, 'type')).toBe('button');
  });

  test('should not show prev/next buttons on vertical scroll', async ({ page }) => {
    await initScroller(page, {
      amount: 5,
      otherMarkup: '<div style="height: 120vh"></div>',
    });
    const { actionPrev, actionNext } = await getActionContainers(page);

    await page.evaluate(() => window.scroll(0, 20));
    await waitForStencilLifecycle(page);

    expect(await getElementStyle(actionNext, 'visibility')).toBe('hidden');
    expect(await getElementStyle(actionNext, 'visibility')).toBe('hidden');
  });

  test('should only show next button', async ({ page }) => {
    await initScroller(page, { amount: 4, isWrapped: true });
    const { actionPrev, actionNext } = await getActionContainers(page);

    expect(await getElementStyle(actionNext, 'visibility')).toBe('visible');
    expect(await getElementStyle(actionPrev, 'visibility')).toBe('hidden');
  });

  test('should only show prev button', async ({ page }) => {
    await initScroller(page, { amount: 6, isWrapped: true });
    const { actionPrev, actionNext } = await getActionContainers(page);
    const { nextButton } = await getPrevNextButton(page);

    await clickElement(page, nextButton);
    await clickElement(page, nextButton);
    await clickElement(page, nextButton);
    await clickElement(page, nextButton);
    await clickElement(page, nextButton);

    expect(await getElementStyle(actionNext, 'visibility')).toBe('hidden');
    expect(await getElementStyle(actionPrev, 'visibility')).toBe('visible');
  });

  test('should show prev and next button', async ({ page }) => {
    await initScroller(page, { amount: 7, isWrapped: true });
    const { actionPrev, actionNext } = await getActionContainers(page);
    const { nextButton } = await getPrevNextButton(page);

    await clickElement(page, nextButton);

    expect(await getElementStyle(actionPrev, 'visibility')).toBe('visible');
    expect(await getElementStyle(actionNext, 'visibility')).toBe('visible');
  });

  test('should not show prev/next buttons without children', async ({ page }) => {
    await setContentWithDesignSystem(page, `<p-scroller active-element-index="0"></p-scroller>`);
    const { actionPrev, actionNext } = await getActionContainers(page);

    expect(await getElementStyle(actionPrev, 'visibility')).toBe('hidden');
    expect(await getElementStyle(actionNext, 'visibility')).toBe('hidden');
  });

  test('should have aria-label in prev/next buttons in dom', async ({ page }) => {
    await initScroller(page);

    const { nextButton, prevButton } = await getPrevNextButton(page);

    expect(await getAttribute(prevButton, 'aria-label')).toBe('prev');
    expect(await getAttribute(nextButton, 'aria-label')).toBe('next');
  });

  test.describe('gradient next rounding edge case', () => {
    const setContentWithWidth = async (page: Page, width: number) => {
      const style = `style="background: deeppink; width:${width}px"`;

      await setContentWithDesignSystem(
        page,
        `
        <div style="width: 150px">
          <p-scroller>
            <div ${style}>A</div>
          </p-scroller>
        </div>`
      );
    };

    // There seems to be a rounding issue that causes the element inside scroller to exceed the scroll container,
    // therefore the trigger gets pushed outside and the gradient is always shown.
    // To ensure the element exceeds the width of the wrapping div we need to assign static width values.
    const steps = Array.from(Array(10)).map((_, index) => Number.parseFloat(`150.${index}`));

    for (const width of steps) {
      test(`should not show actionNext for element with a width of ${width}`, async ({ page }) => {
        await setContentWithWidth(page, width);
        const { actionNext } = await getActionContainers(page);

        expect(await getElementStyle(actionNext, 'visibility'), `On size ${width}`).toBe('hidden');
      });
    }

    test('should show actionNext when more than 0.9px of the trigger are hidden', async ({ page }) => {
      await setContentWithWidth(page, 150.91);
      const { actionNext } = await getActionContainers(page);

      expect(await getElementStyle(actionNext, 'visibility')).toBe('visible');
    });
  });
});

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initScroller(page, { amount: 3, tag: 'a' });
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-scroller'], 'componentDidLoad: p-scroller').toBe(1);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(2);
    expect(status.componentDidLoad['p-button'], 'componentDidLoad: p-button').toBe(2);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(5);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  test('should work without unnecessary round trips on init when scrollToPosition is set', async ({ page }) => {
    await initScroller(page, { isWrapped: true, tag: 'a', scrollToPosition: { scrollPosition: 100 } });
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-scroller'], 'componentDidUpdate: p-scroller').toBe(1);

    expect(status.componentDidLoad['p-scroller'], 'componentDidLoad: p-scroller').toBe(1);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(2);
    expect(status.componentDidLoad['p-button'], 'componentDidLoad: p-button').toBe(2);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(5);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });

  test('should work without unnecessary round trips on prop change', async ({ page }) => {
    await initScroller(page, { amount: 3, tag: 'button' });
    const host = getHost(page);

    await setProperty(host, 'scrollbar', true);
    await waitForStencilLifecycle(page);

    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-scroller'], 'componentDidUpdate: p-scroller').toBe(1);
    expect(status.componentDidUpdate['p-icon'], 'componentDidUpdate:  p-icon').toBe(0);
    expect(status.componentDidLoad['p-button'], 'componentDidLoad: p-button').toBe(2);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(5);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });
});
