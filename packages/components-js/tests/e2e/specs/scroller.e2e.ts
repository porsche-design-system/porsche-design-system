import { ElementHandle, Page } from 'puppeteer';
import {
  CSS_ANIMATION_DURATION,
  expectA11yToMatchSnapshot,
  getAttribute,
  getElementStyle,
  getLifecycleStatus,
  getProperty,
  SCROLL_PERCENTAGE,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';
import type { ScrollToPosition } from '../../../../components-angular/dist/components-wrapper/lib/types';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

type InitOptions = {
  amount?: number;
  isWrapped?: boolean;
  otherMarkup?: string;
  tag?: 'a' | 'button';
  isFocusable?: boolean;
  scrollToPosition?: ScrollToPosition;
};

const initScroller = async (opts?: InitOptions) => {
  const { amount = 8, isWrapped, otherMarkup = '', tag = 'button', isFocusable = false, scrollToPosition } = opts ?? {};

  const elementAttributes = tag === 'a' ? ' onclick="return false" href="#"' : '';
  const elements = Array.from(Array(amount))
    .map((_, i) => `<${tag}${elementAttributes}>Button ${i + 1}</${tag}>`)
    .join('');

  const content = `<p-scroller${isFocusable ? ' is-focusable' : ''}${
    scrollToPosition ? ` scroll-to-position="{ scrollPosition: ${scrollToPosition.scrollPosition} }"` : ''
  }>
  ${elements}
</p-scroller>${otherMarkup}`;

  await setContentWithDesignSystem(page, isWrapped ? `<div style="width: 200px">${content}</div>` : content);
};

const getHost = () => selectNode(page, 'p-scroller');
const getAllButtons = () => page.$$('button');
const getScrollArea = () => selectNode(page, 'p-scroller >>> .scroll-area');
const getScrollWrapper = () => selectNode(page, 'p-scroller >>> .scroll-wrapper');
const getActionContainers = async () => {
  const actionPrev = await selectNode(page, 'p-scroller >>> .action-prev');
  const actionNext = await selectNode(page, 'p-scroller >>> .action-next');
  return { actionPrev, actionNext };
};
const getPrevNextButton = async () => {
  const prevButton = await selectNode(page, 'p-scroller >>> .action-prev p-button-pure');
  const nextButton = await selectNode(page, 'p-scroller >>> .action-next p-button-pure');
  return { prevButton, nextButton };
};
const getScrollLeft = (element: ElementHandle) => getProperty(element, 'scrollLeft');
const getOffsetWidth = (element: ElementHandle) => getProperty(element, 'offsetWidth');

const getScrollDistance = (scrollAreaWidth: number): number => Math.round(scrollAreaWidth * SCROLL_PERCENTAGE);

const clickElement = async (el: ElementHandle) => {
  await el.click();
  await waitForStencilLifecycle(page);
  await page.waitForTimeout(CSS_ANIMATION_DURATION);
};

const addNewButton = async () => {
  await page.evaluate(() => {
    const scroller = document.querySelector('p-scroller');
    const element = document.createElement('button');
    element.innerText = 'Added Element Text';
    scroller.append(element);
  });
};

describe('scrolling', () => {
  it('should have correct initial scroll position when scrollToPosition is set', async () => {
    await initScroller({ isWrapped: true, scrollToPosition: { scrollPosition: 50 } });

    expect(await getScrollLeft(await getScrollArea())).toBe(50);
  });
});

describe('slotted content changes', () => {
  it('should show next button after adding a button', async () => {
    await initScroller({ amount: 3, isWrapped: true });
    const { actionNext } = await getActionContainers();

    expect(await getElementStyle(actionNext, 'visibility')).toBe('hidden');

    await addNewButton();
    await waitForStencilLifecycle(page);

    expect(await getElementStyle(actionNext, 'visibility')).toBe('visible');
  });
});

describe('next/prev buttons', () => {
  it('should scroll by 20% on button prev/next click', async () => {
    await initScroller({ isWrapped: true });
    const { prevButton, nextButton } = await getPrevNextButton();
    const scrollArea = await getScrollArea();
    const scrollAreaWidth = await getOffsetWidth(scrollArea);
    const scrollDistance = await getScrollDistance(+scrollAreaWidth);

    expect(await getScrollLeft(scrollArea)).toEqual(0);

    await clickElement(nextButton);
    expect(await getScrollLeft(scrollArea)).toEqual(scrollDistance);

    await clickElement(nextButton);
    expect(await getScrollLeft(scrollArea)).toEqual(scrollDistance * 2);

    await clickElement(prevButton);
    expect(await getScrollLeft(scrollArea)).toEqual(scrollDistance);

    await clickElement(prevButton);
    expect(await getScrollLeft(scrollArea)).toEqual(0);
  });

  it('should scroll to max scroll-position on multiple next clicks', async () => {
    await initScroller({ amount: 6, isWrapped: true });
    const [firstButton] = await getAllButtons();
    const { nextButton } = await getPrevNextButton();
    const scrollArea = await getScrollArea();

    expect(await getScrollLeft(scrollArea)).toEqual(0);

    await clickElement(nextButton);
    await clickElement(nextButton);
    await clickElement(nextButton);
    await clickElement(nextButton);
    await clickElement(nextButton);

    const scrollPosition = await getScrollLeft(scrollArea);

    await clickElement(firstButton);
    const scrollMax = await scrollArea.evaluate((el): number => {
      el.scrollTo({ left: el.scrollWidth });
      return el.scrollLeft;
    });

    expect(scrollPosition).toEqual(scrollMax);
  });

  it('should have type="button" attribute', async () => {
    await initScroller();

    const { prevButton, nextButton } = await getPrevNextButton();

    expect(await getProperty(prevButton, 'type')).toBe('button');
    expect(await getProperty(nextButton, 'type')).toBe('button');
  });

  it('should not show prev/next buttons on vertical scroll', async () => {
    await initScroller({
      amount: 5,
      otherMarkup: '<div style="height: 120vh"></div>',
    });
    const { actionPrev, actionNext } = await getActionContainers();

    await page.evaluate(() => window.scroll(0, 20));
    await waitForStencilLifecycle(page);

    expect(await getElementStyle(actionNext, 'visibility')).toBe('hidden');
    expect(await getElementStyle(actionNext, 'visibility')).toBe('hidden');
  });

  it('should only show next button', async () => {
    await initScroller({ amount: 4, isWrapped: true });
    const { actionPrev, actionNext } = await getActionContainers();

    expect(await getElementStyle(actionNext, 'visibility')).toBe('visible');
    expect(await getElementStyle(actionPrev, 'visibility')).toBe('hidden');
  });

  it('should only show prev button', async () => {
    await initScroller({ amount: 6, isWrapped: true });
    const { actionPrev, actionNext } = await getActionContainers();
    const { nextButton } = await getPrevNextButton();

    await clickElement(nextButton);
    await clickElement(nextButton);
    await clickElement(nextButton);
    await clickElement(nextButton);
    await clickElement(nextButton);

    expect(await getElementStyle(actionNext, 'visibility')).toBe('hidden');
    expect(await getElementStyle(actionPrev, 'visibility')).toBe('visible');
  });

  it('should show prev and next button', async () => {
    await initScroller({ amount: 7, isWrapped: true });
    const { actionPrev, actionNext } = await getActionContainers();
    const { nextButton } = await getPrevNextButton();

    await clickElement(nextButton);

    expect(await getElementStyle(actionPrev, 'visibility')).toBe('visible');
    expect(await getElementStyle(actionNext, 'visibility')).toBe('visible');
  });

  it('should not show prev/next buttons without children', async () => {
    await setContentWithDesignSystem(page, `<p-scroller active-element-index="0"></p-scroller>`);
    const { actionPrev, actionNext } = await getActionContainers();

    expect(await getElementStyle(actionPrev, 'visibility')).toBe('hidden');
    expect(await getElementStyle(actionNext, 'visibility')).toBe('hidden');
  });

  it('should have label of prev/next buttons in dom', async () => {
    await initScroller();

    const { nextButton, prevButton } = await getPrevNextButton();

    expect(await getProperty(prevButton, 'innerHTML')).toBe('prev');
    expect(await getProperty(nextButton, 'innerHTML')).toBe('next');
  });

  describe('gradient next rounding edge case', () => {
    const setContentWithWidth = async (width: number) => {
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

    // There seems to be an rounding issue that causes the element inside scroller to exceed the scroll container,
    // therefore the trigger gets pushed outside and the gradient is always shown.
    // To ensure the element exceeds the width of the wrapping div we need to assign static width values.
    const steps = Array.from(Array(10)).map((_, index) => parseFloat(`150.${index}`));

    it.each(steps)(`should not show actionNext for element with a width of %spx`, async (width) => {
      await setContentWithWidth(width);
      const { actionNext } = await getActionContainers();

      expect(await getElementStyle(actionNext, 'visibility'), `On size ${width}`).toBe('hidden');
    });

    it('should show actionNext when more than 0.9px of the trigger are hidden', async () => {
      await setContentWithWidth(150.91);
      const { actionNext } = await getActionContainers();

      expect(await getElementStyle(actionNext, 'visibility')).toBe('visible');
    });
  });
});

describe('lifecycle', () => {
  it('should work without unnecessary round trips on init', async () => {
    await initScroller({ amount: 3, tag: 'a' });
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-scroller'], 'componentDidLoad: p-scroller').toBe(1);
    expect(status.componentDidLoad['p-button-pure'], 'componentDidLoad: p-button-pure').toBe(2);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(2);
    expect(status.componentDidLoad['p-text'], 'componentDidLoad: p-text').toBe(2);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(7);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  it('should work without unnecessary round trips on init when scrollToPosition is set', async () => {
    await initScroller({ isWrapped: true, tag: 'a', scrollToPosition: { scrollPosition: 100 } });
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-scroller'], 'componentDidUpdate: p-scroller').toBe(1);

    expect(status.componentDidLoad['p-scroller'], 'componentDidLoad: p-scroller').toBe(1);
    expect(status.componentDidLoad['p-button-pure'], 'componentDidLoad: p-button-pure').toBe(2);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(2);
    expect(status.componentDidLoad['p-text'], 'componentDidLoad: p-text').toBe(2);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(7);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });

  it('should work without unnecessary round trips on prop change', async () => {
    await initScroller({ amount: 3, tag: 'button' });
    const host = await getHost();

    await setProperty(host, 'theme', 'dark');
    await waitForStencilLifecycle(page);

    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-scroller'], 'componentDidUpdate: p-scroller').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(7);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(5);
  });
});

describe('accessibility', () => {
  const getElementList = () => selectNode(page, 'p-scroller >>> [role="tablist"]');
  it('should expose correct initial accessibility tree of tablist', async () => {
    await initScroller({ amount: 3 });

    await expectA11yToMatchSnapshot(page, await getElementList(), { interestingOnly: false });
  });

  it('should render correct accessibility tree on scrollArea click', async () => {
    await initScroller({ amount: 4 });
    const scrollArea = await getScrollArea();

    await expectA11yToMatchSnapshot(page, await getElementList(), {
      message: 'Before click',
      interestingOnly: false,
    });

    await clickElement(scrollArea);

    await expectA11yToMatchSnapshot(page, await getElementList(), {
      message: 'After click',
      interestingOnly: false,
    });
  });

  it('should render correct accessibility tree on focus change and enter press', async () => {
    await initScroller({ amount: 3 });

    await expectA11yToMatchSnapshot(page, await getElementList(), {
      message: 'Before change',
      interestingOnly: false,
    });

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('Enter');
    await waitForStencilLifecycle(page);

    await expectA11yToMatchSnapshot(page, await getElementList(), {
      message: 'After change',
      interestingOnly: false,
    });
  });

  it('should have correct tabindex on scroll-wrapper if isScrollable() and isFocusable are true', async () => {
    await initScroller({ isWrapped: true, isFocusable: true });
    const scrollWrapper = await getScrollWrapper();

    expect(await getAttribute(scrollWrapper, 'tabindex')).toBe('1');
  });

  it('should have correct tabindex on scroll-wrapper if isScrollable() is false and isFocusable is true', async () => {
    await initScroller({ isFocusable: true });
    const scrollWrapper = await getScrollWrapper();

    expect(await getAttribute(scrollWrapper, 'tabindex')).toBeNull();
  });

  it('should have correct tabindex on scroll-wrapper if isScrollable() is true and isFocusable is not set', async () => {
    await initScroller({ isWrapped: true });
    const scrollWrapper = await getScrollWrapper();

    expect(await getAttribute(scrollWrapper, 'tabindex')).toBeNull();
  });
});
