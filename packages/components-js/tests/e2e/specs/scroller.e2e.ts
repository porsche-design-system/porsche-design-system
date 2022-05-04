import { ElementHandle, Page } from 'puppeteer';
import {
  expectA11yToMatchSnapshot,
  getConsoleErrorsAmount,
  getLifecycleStatus,
  getProperty,
  initConsoleObserver,
  removeAttribute,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';

export const CSS_ANIMATION_DURATION = 1000;
export const FOCUS_PADDING = 8;
const SCROLL_PERCENTAGE = 0.2;

describe('scroller', () => {
  let page: Page;
  beforeEach(async () => (page = await browser.newPage()));
  afterEach(async () => await page.close());

  const clickHandlerScript = `
    <script>
      const scroller = document.querySelector('p-scroller')
      scroller.addEventListener('activeElementChange', (e) => {
          e.target.activeElementIndex = e.detail.activeElementIndex;
      });
    </script>`;

  type InitOptions = {
    amount?: number;
    activeElementIndex?: number;
    isWrapped?: boolean;
    otherMarkup?: string;
    tag?: 'a' | 'button';
  };

  const initScroller = async (opts?: InitOptions) => {
    const { amount = 8, activeElementIndex, isWrapped, otherMarkup = '', tag = 'button' } = opts ?? {};

    const elementAttributes = tag === 'a' ? ' onclick="return false" href="#"' : '';
    const elements = Array.from(Array(amount))
      .map((_, i) => `<${tag}${elementAttributes}>Button ${i + 1}</${tag}>`)
      .join('');

    const attributes = [activeElementIndex !== undefined && `active-element-index="${activeElementIndex}"`]
      .filter((x) => x)
      .join(' ');

    const content = `<p-scroller ${attributes}>
  ${elements}
</p-scroller>${otherMarkup}`;

    await setContentWithDesignSystem(page, isWrapped ? `<div style="width: 200px">${content}</div>` : content);
  };

  const getHost = () => selectNode(page, 'p-scroller');
  const getAllButtons = () => page.$$('button');
  const getScrollArea = () => selectNode(page, 'p-scroller >>> .scroll-area');
  // const getBar = () => selectNode(page, 'p-scroller >>> .bar');
  const getGradientNext = () => selectNode(page, 'p-scroller >>> .action--next .gradient');
  const getActionContainers = async () => {
    const actionPrev = await selectNode(page, 'p-scroller >>> .action--prev');
    const actionNext = await selectNode(page, 'p-scroller >>> .action--next');
    return { actionPrev, actionNext };
  };
  const getPrevNextButton = async () => {
    const prevButton = await selectNode(page, 'p-scroller >>> .action--prev p-button-pure');
    const nextButton = await selectNode(page, 'p-scroller >>> .action--next p-button-pure');
    return { prevButton, nextButton };
  };
  const getScrollLeft = (element: ElementHandle) => getProperty(element, 'scrollLeft');
  const getOffsetLeft = (element: ElementHandle) => getProperty(element, 'offsetLeft');
  const getOffsetWidth = (element: ElementHandle) => getProperty(element, 'offsetWidth');
  const getClassList = async (element: ElementHandle): Promise<string[]> =>
    Object.values(await getProperty(element, 'classList'));

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

  const removeButtonAtIndex = async (index: number) => {
    await page.evaluate((index) => {
      const scroller = document.querySelector('p-scroller');
      scroller.children[index].remove();
    }, index);
  };

  const hiddenClass = 'action--hidden';

  describe('slotted content changes', () => {
    it('should adjust scroll position when name of element is changed', async () => {
      await initScroller({ activeElementIndex: 0, isWrapped: true, otherMarkup: clickHandlerScript });
      const [, secondButton, thirdButton] = await getAllButtons();
      const scrollArea = await getScrollArea();
      const gradientWidth = await getOffsetWidth(await getGradientNext());

      await secondButton.evaluate((el) => (el.innerHTML = 'New long button name on this button'));
      await waitForStencilLifecycle(page);

      await clickElement(thirdButton);
      const offsetThirdButton = await getOffsetLeft(thirdButton);
      const scrollDistance = +offsetThirdButton - +gradientWidth + FOCUS_PADDING;

      expect(await getScrollLeft(scrollArea)).toEqual(scrollDistance);
    });

    it('should have correct scroll position when element is removed', async () => {
      await initScroller({ activeElementIndex: 0, isWrapped: true, otherMarkup: clickHandlerScript });
      const [, , , fourthButton] = await getAllButtons();
      const scrollArea = await getScrollArea();
      const gradientWidth = await getOffsetWidth(await getGradientNext());

      await page.evaluate(() => {
        const tabsBar = document.querySelector('p-scroller');
        tabsBar.removeChild(tabsBar.children[2]);
      });

      await waitForStencilLifecycle(page);

      await clickElement(fourthButton);
      const offsetFourthButton = await getOffsetLeft(fourthButton);
      const scrollDistance = +offsetFourthButton - +gradientWidth + FOCUS_PADDING;

      expect(await getScrollLeft(scrollArea)).toEqual(scrollDistance);
    });

    it('should show next button after adding a button', async () => {
      await initScroller({ amount: 5, activeElementIndex: 4, otherMarkup: clickHandlerScript, isWrapped: true });
      const { actionNext } = await getActionContainers();

      expect(await getClassList(actionNext)).toContain(hiddenClass);

      await addNewButton();
      await waitForStencilLifecycle(page);

      expect(await getClassList(actionNext)).not.toContain(hiddenClass);
    });

    it('should stay selected when element after current active element is removed', async () => {
      await initScroller({ amount: 5, activeElementIndex: 3 });
      const host = await getHost();

      expect(await getProperty(host, 'activeElementIndex')).toBe(3);

      await removeButtonAtIndex(4);

      expect(await getProperty(host, 'activeElementIndex')).toBe(3);
    });

    it('should not reset activeElementIndex when element before current active element is removed', async () => {
      await initScroller({ amount: 5, activeElementIndex: 3 });
      const host = await getHost();

      expect(await getProperty(host, 'activeElementIndex')).toBe(3);

      await removeButtonAtIndex(2);

      expect(await getProperty(host, 'activeElementIndex')).toBe(3);
    });
  });

  describe('scroll-area', () => {
    it('should scroll by 20% on button prev/next click', async () => {
      await initScroller({ isWrapped: true, activeElementIndex: 0 });
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
      await initScroller({ amount: 6, isWrapped: true, activeElementIndex: 0 });
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

    it('should scroll to correct position initially', async () => {
      await initScroller({ activeElementIndex: 3, isWrapped: true });
      const allButtons = await getAllButtons();
      const selectedButtonOffset = await getOffsetLeft(allButtons[3]);
      const gradientWidth = await getOffsetWidth(await getGradientNext());
      const scrollArea = await getScrollArea();
      const scrollDistance = +selectedButtonOffset - +gradientWidth + FOCUS_PADDING;

      await waitForStencilLifecycle(page);

      expect(await getScrollLeft(scrollArea)).toEqual(scrollDistance);
    });

    it('should scroll to correct position on element click', async () => {
      await initScroller({ isWrapped: true, activeElementIndex: 0, otherMarkup: clickHandlerScript });
      const [, , , button4, button5] = await getAllButtons();
      const gradient = await getGradientNext();
      const gradientWidth = await getOffsetWidth(gradient);
      const scrollArea = await getScrollArea();
      const scrollAreaWidth = await getOffsetWidth(scrollArea);

      expect(await getScrollLeft(scrollArea)).toEqual(0);

      await clickElement(button5);
      const button5offset = await getOffsetLeft(button5);
      const scrollDistanceRight = +button5offset - +gradientWidth + FOCUS_PADDING;
      expect(await getScrollLeft(scrollArea)).toEqual(scrollDistanceRight);

      await clickElement(button4);
      const button4offset = await getOffsetLeft(button4);
      const buttonWidth = await getOffsetWidth(button4);
      const scrollDistanceLeft = +button4offset + +buttonWidth + +gradientWidth - +scrollAreaWidth;
      expect(await getScrollLeft(scrollArea)).toEqual(scrollDistanceLeft);
    });

    it('should have correct scroll position after element click and prev button', async () => {
      await initScroller({ amount: 8, isWrapped: true, activeElementIndex: 0, otherMarkup: clickHandlerScript });
      const { prevButton } = await getPrevNextButton();
      const allButtons = await getAllButtons();
      const button3 = allButtons[2];
      const scrollArea = await getScrollArea();
      const scrollAreaWidth = await getOffsetWidth(scrollArea);
      const scrollDistance = await getScrollDistance(+scrollAreaWidth);

      const gradient = await getGradientNext();
      const gradientWidth = await getOffsetWidth(gradient);

      await clickElement(button3);
      const button3offset = await getOffsetLeft(button3);
      const scrollDistanceLeft = +button3offset - +gradientWidth + FOCUS_PADDING;

      expect(await getScrollLeft(scrollArea), 'scroll left active button after click').toBe(scrollDistanceLeft);

      await clickElement(prevButton);
      expect(await getScrollLeft(scrollArea), 'scroll left active button after first prev click').toBe(
        scrollDistanceLeft - scrollDistance
      );

      await clickElement(prevButton);
      expect(await getScrollLeft(scrollArea), 'scroll left active button after second prev click').toBe(0);
    });

    it('should have correct scroll position after element click and next button', async () => {
      await initScroller({ amount: 8, isWrapped: true, activeElementIndex: 7, otherMarkup: clickHandlerScript });
      const { nextButton } = await getPrevNextButton();
      const allButtons = await getAllButtons();
      const button7 = allButtons[6];

      const scrollArea = await getScrollArea();
      const scrollAreaWidth = await getOffsetWidth(scrollArea);

      const gradient = await getGradientNext();
      const gradientWidth = await getOffsetWidth(gradient);

      const maxScrollDistance = await getScrollLeft(scrollArea);

      await clickElement(button7);
      const button7offset = await getOffsetLeft(button7);
      const buttonWidth = await getOffsetWidth(button7);
      const scrollDistanceRight = +button7offset + +buttonWidth + +gradientWidth - +scrollAreaWidth;

      expect(await getScrollLeft(scrollArea), 'scroll left active button after click').toBe(scrollDistanceRight);

      await clickElement(nextButton);
      expect(await getScrollLeft(scrollArea), 'scroll left active button after prev click').toBe(maxScrollDistance);
    });

    describe('next/prev buttons', () => {
      it('should have type="button" attribute', async () => {
        await initScroller();

        const { prevButton, nextButton } = await getPrevNextButton();

        expect(await getProperty(prevButton, 'type')).toBe('button');
        expect(await getProperty(nextButton, 'type')).toBe('button');
      });

      it('should not show prev/next buttons on vertical scroll', async () => {
        await initScroller({
          amount: 5,
          activeElementIndex: 1,
          otherMarkup: '<div style="height: 120vh"></div>',
        });
        const { actionPrev, actionNext } = await getActionContainers();

        await page.evaluate(() => window.scroll(0, 20));
        await waitForStencilLifecycle(page);

        expect(await getClassList(actionPrev)).toContain(hiddenClass);
        expect(await getClassList(actionNext)).toContain(hiddenClass);
      });

      it('should only show next button', async () => {
        await initScroller({ amount: 4, isWrapped: true, activeElementIndex: 0 });
        const { actionPrev, actionNext } = await getActionContainers();

        expect(await getClassList(actionNext)).not.toContain(hiddenClass);
        expect(await getClassList(actionPrev)).toContain(hiddenClass);
      });

      it('should only show prev button', async () => {
        await initScroller({ amount: 20, activeElementIndex: 19, isWrapped: true });
        const { actionPrev, actionNext } = await getActionContainers();

        expect(await getClassList(actionNext)).toContain(hiddenClass);
        expect(await getClassList(actionPrev)).not.toContain(hiddenClass);
      });

      it('should show prev and next button', async () => {
        await initScroller({ amount: 7, activeElementIndex: 1, isWrapped: true });
        const { actionPrev, actionNext } = await getActionContainers();

        expect(await getClassList(actionNext)).not.toContain(hiddenClass);
        expect(await getClassList(actionPrev)).not.toContain(hiddenClass);
      });

      it('should not show prev/next buttons without children', async () => {
        await setContentWithDesignSystem(page, `<p-scroller active-element-index="0"></p-scroller>`);
        const { actionPrev, actionNext } = await getActionContainers();

        expect(await getClassList(actionNext)).toContain(hiddenClass);
        expect(await getClassList(actionPrev)).toContain(hiddenClass);
      });

      it('should have label of prev/next buttons in dom', async () => {
        await initScroller({ activeElementIndex: 0 });

        const { nextButton, prevButton } = await getPrevNextButton();

        expect(await getProperty(prevButton, 'innerHTML')).toBe('prev');
        expect(await getProperty(nextButton, 'innerHTML')).toBe('next');
      });

      describe('gradient next rounding edge case', () => {
        // There seems to be an rounding issue that causes the <button> elements to exceed the scroll container,
        // therefore the trigger gets pushed outside and the gradient is always shown.
        // To ensure the buttons exceed the width of the wrapping div we need to assign static width values.
        const DECIMAL_FACTOR = 0.1;
        for (let i = 150; i <= 151; i = i + DECIMAL_FACTOR) {
          it(`should not show actionNext for second button with a width of ${i}px`, async () => {
            const style = `style="width:${i}px"`;

            await setContentWithDesignSystem(
              page,
              `
            <div style="width: 300px">
              <p-scroller size="medium" active-element-index="1">
                <button style="width: 150px" type="button">A</button>
                <button ${style} type="button">B</button>
              </p-scroller>
            </div>`
            );
            const { actionNext } = await getActionContainers();

            expect(await getClassList(actionNext), `On size ${i}`).toContain(hiddenClass);
          });
        }
      });
    });

    describe('errors', () => {
      it('should not cause TypeError within scrollActiveElementIntoView', async () => {
        initConsoleObserver(page);

        await setContentWithDesignSystem(page, ''); // empty page
        await page.evaluate(() => {
          const el = document.createElement('p-scroller');
          el['activeElementIndex'] = -1;

          Array.from(Array(2)).forEach((_, i) => {
            const child = document.createElement('button');
            child.innerText = `Content ${i + 1}`;
            el.appendChild(child);
          });
          document.body.appendChild(el);
        });

        await waitForStencilLifecycle(page);
        expect(getConsoleErrorsAmount()).toBe(0);

        await page.evaluate(() => console.error('test error'));
        expect(getConsoleErrorsAmount()).toBe(1);
      });

      it('should not crash without children', async () => {
        initConsoleObserver(page);

        await setContentWithDesignSystem(page, `<p-scroller active-element-index="0"></p-scroller>`);
        expect(getConsoleErrorsAmount()).toBe(0);

        await page.evaluate(() => console.error('test error'));
        expect(getConsoleErrorsAmount()).toBe(1);
      });
    });

    describe('lifecycle', () => {
      it('should work without unnecessary round trips on init', async () => {
        await initScroller({ amount: 3, tag: 'a', activeElementIndex: 0 });
        const status = await getLifecycleStatus(page);

        expect(status.componentDidLoad['p-scroller'], 'componentDidLoad: p-scroller').toBe(1);
        expect(status.componentDidLoad['p-button-pure'], 'componentDidLoad: p-button-pure').toBe(2);
        expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(2);
        expect(status.componentDidLoad['p-text'], 'componentDidLoad: p-text').toBe(2);

        expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(7);
        expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
      });

      it('should work without unnecessary round trips on prop change', async () => {
        await initScroller({ amount: 3, tag: 'button', activeElementIndex: 0 });
        const host = await getHost();

        await setProperty(host, 'activeElementIndex', 2);
        await waitForStencilLifecycle(page);

        const status = await getLifecycleStatus(page);

        expect(status.componentDidUpdate['p-scroller'], 'componentDidUpdate: p-scroller').toBe(1);

        expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(7);
        expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
      });
    });

    describe('accessibility', () => {
      const getTabList = () => selectNode(page, 'p-scroller >>> [role="tablist"]');
      it('should expose correct initial accessibility tree of tablist', async () => {
        await initScroller({ amount: 3 });

        await expectA11yToMatchSnapshot(page, await getTabList(), { interestingOnly: false });
      });

      it('should render correct accessibility tree if activeTabIndex is set ', async () => {
        await initScroller({ amount: 3, activeElementIndex: 1 });

        await expectA11yToMatchSnapshot(page, await getTabList(), { interestingOnly: false });
      });

      it('should render correct accessibility tree if activeTabIndex is removed ', async () => {
        await initScroller({ amount: 3, activeElementIndex: 1 });
        const host = await getHost();

        await removeAttribute(host, 'active-tab-index');
        await waitForStencilLifecycle(page);

        await expectA11yToMatchSnapshot(page, await getTabList(), { interestingOnly: false });
      });

      it('should render correct accessibility tree on scrollArea click', async () => {
        await initScroller({ amount: 4, activeElementIndex: 3 });
        const scrollArea = await getScrollArea();

        await expectA11yToMatchSnapshot(page, await getTabList(), {
          message: 'Before click',
          interestingOnly: false,
        });

        await clickElement(scrollArea);

        await expectA11yToMatchSnapshot(page, await getTabList(), {
          message: 'After click',
          interestingOnly: false,
        });
      });

      it('should render correct accessibility tree on focus change and enter press', async () => {
        await initScroller({ amount: 3, activeElementIndex: 0, otherMarkup: clickHandlerScript });

        await expectA11yToMatchSnapshot(page, await getTabList(), {
          message: 'Before change',
          interestingOnly: false,
        });

        await page.keyboard.press('Tab');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('Enter');
        await waitForStencilLifecycle(page);

        await expectA11yToMatchSnapshot(page, await getTabList(), {
          message: 'After change',
          interestingOnly: false,
        });
      });
    });
  });
});
