import { ElementHandle, KeyInput, Page } from 'puppeteer';
import {
  addEventListener,
  expectedStyleOnFocus,
  expectA11yToMatchSnapshot,
  getAttribute,
  getConsoleErrorsAmount,
  getElementPositions,
  getElementStyle,
  getLifecycleStatus,
  getOutlineStyle,
  getProperty,
  initAddEventListener,
  initConsoleObserver,
  isElementAtIndexFocused,
  reattachElement,
  removeAttribute,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForComponentsReady,
  waitForInheritedCSSTransition,
  waitForStencilLifecycle,
} from '../helpers';
import type { TabSize } from '@porsche-design-system/components/src/components/navigation/tabs-bar/tabs-bar-utils';

export const CSS_ANIMATION_DURATION = 1000;
export const FOCUS_PADDING = 8;
const TABS_SCROLL_PERCENTAGE = 0.2;

describe('tabs-bar', () => {
  let page: Page;
  beforeEach(async () => (page = await browser.newPage()));
  afterEach(async () => await page.close());

  const clickHandlerScript = `
    <script>
      const tabsBar = document.querySelector('p-tabs-bar')
      tabsBar.addEventListener('tabChange', (e) => {
          e.target.activeTabIndex = e.detail.activeTabIndex;
      });
    </script>`;

  type InitOptions = {
    amount?: number;
    activeTabIndex?: number;
    size?: TabSize;
    isWrapped?: boolean;
    otherMarkup?: string;
    tag?: 'a' | 'button';
  };

  const initTabsBar = async (opts?: InitOptions) => {
    const { amount = 8, activeTabIndex, size = 'small', isWrapped, otherMarkup = '', tag = 'button' } = opts ?? {};

    const tabAttributes = tag === 'a' ? ' onclick="return false" href="#"' : '';
    const tabs = Array.from(Array(amount))
      .map((_, i) => `<${tag}${tabAttributes}>Tab Button ${i + 1}</${tag}>`)
      .join('');

    const attributes = [`size="${size}"`, activeTabIndex !== undefined && `active-tab-index="${activeTabIndex}"`]
      .filter((x) => x)
      .join(' ');

    const content = `<p-tabs-bar ${attributes}>
  ${tabs}
</p-tabs-bar>${otherMarkup}`;

    await setContentWithDesignSystem(page, isWrapped ? `<div style="width: 300px">${content}</div>` : content);
  };

  const getHost = () => selectNode(page, 'p-tabs-bar');
  const getAllButtons = () => page.$$('button');
  const getAllLinks = () => page.$$('a');
  const getScrollArea = () => selectNode(page, 'p-tabs-bar >>> .scroll-area');
  const getBar = () => selectNode(page, 'p-tabs-bar >>> .bar');
  const getGradientNext = () => selectNode(page, 'p-tabs-bar >>> .action--next .gradient');
  const getActionContainers = async () => {
    const actionPrev = await selectNode(page, 'p-tabs-bar >>> .action--prev');
    const actionNext = await selectNode(page, 'p-tabs-bar >>> .action--next');
    return { actionPrev, actionNext };
  };
  const getPrevNextButton = async () => {
    const prevButton = await selectNode(page, 'p-tabs-bar >>> .action--prev p-button-pure');
    const nextButton = await selectNode(page, 'p-tabs-bar >>> .action--next p-button-pure');
    return { prevButton, nextButton };
  };
  const getScrollLeft = (element: ElementHandle) => getProperty(element, 'scrollLeft');
  const getOffsetLeft = (element: ElementHandle) => getProperty(element, 'offsetLeft');
  const getOffsetWidth = (element: ElementHandle) => getProperty(element, 'offsetWidth');
  const getClassList = async (element: ElementHandle): Promise<string[]> =>
    Object.values(await getProperty(element, 'classList'));

  const getScrollDistance = (scrollAreaWidth: number): number => Math.round(scrollAreaWidth * TABS_SCROLL_PERCENTAGE);
  const getBarWidth = async (bar: ElementHandle) => await getElementStyle(bar, 'width');

  const clickElement = async (el: ElementHandle) => {
    await el.click();
    await waitForStencilLifecycle(page);
    await page.waitForTimeout(CSS_ANIMATION_DURATION);
  };

  describe('activeTabIndex', () => {
    it('should have a bar width of 0 when no activeTabIndex is set', async () => {
      await setContentWithDesignSystem(page, '');

      // initialize tabs bar to be able to see the state right after initialization
      await page.evaluate(() => {
        const tabsBar = document.createElement('p-tabs-bar');
        const newTabsButton = document.createElement('button');
        tabsBar.appendChild(newTabsButton);
        document.body.appendChild(tabsBar);
      });
      await waitForComponentsReady(page);

      expect(await getBarWidth(await getBar())).toBe('0px');
    });
  });

  describe('slotted content changes', () => {
    it('should adjust bar style when name of tab is changed', async () => {
      await initTabsBar({ amount: 3, activeTabIndex: 0 });
      const [firstButton] = await getAllButtons();
      const bar = await getBar();
      await page.waitForTimeout(CSS_ANIMATION_DURATION);

      expect(Math.floor((await getElementPositions(page, bar)).right), 'initial position').toEqual(87);

      await firstButton.evaluate((el) => (el.innerHTML = 'New long button mame on this button'));
      await waitForStencilLifecycle(page);
      await page.waitForTimeout(CSS_ANIMATION_DURATION);

      expect(Math.floor((await getElementPositions(page, bar)).right), 'final position').toEqual(257);
    });

    it('should adjust bar style when new tab element is added and clicked', async () => {
      await initTabsBar({ amount: 1, activeTabIndex: 0, otherMarkup: clickHandlerScript });
      const bar = await getBar();

      //add a new button
      await page.evaluate(() => {
        const tabsBar = document.querySelector('p-tabs-bar');
        const tab = document.createElement('button');
        tab.innerText = 'Added Tab Text';
        tabsBar.append(tab);
      });
      await waitForStencilLifecycle(page);
      await page.waitForTimeout(CSS_ANIMATION_DURATION);

      expect(Math.floor((await getElementPositions(page, bar)).left), 'initial position').toEqual(0);

      const [, secondButton] = await getAllButtons();
      await clickElement(secondButton);

      expect(Math.floor((await getElementPositions(page, bar)).left), 'final position').toEqual(107);
    });

    it('should stay selected and have same bar style when tab after current active tab is removed', async () => {
      await initTabsBar({ amount: 3, activeTabIndex: 1 });
      const bar = await getBar();

      expect(Math.floor((await getElementPositions(page, bar)).left), 'initial position').toEqual(103);

      await page.evaluate(() => {
        const tabsBar = document.querySelector('p-tabs-bar');
        tabsBar.removeChild(tabsBar.children[2]);
      });

      await waitForStencilLifecycle(page);
      await page.waitForTimeout(CSS_ANIMATION_DURATION);
      const [, secondButton] = await getAllButtons();

      expect(await getAttribute(secondButton, 'tabindex')).toBe('0');
      expect(await getAttribute(secondButton, 'aria-selected')).toBe('true');
      expect(Math.floor((await getElementPositions(page, bar)).left), 'final position').toEqual(103);
    });

    it('should reset tabindex and bar styles when active tab on last position is removed', async () => {
      await initTabsBar({ amount: 3, activeTabIndex: 2 });
      const bar = await getBar();
      const [firstButton] = await getAllButtons();

      await page.evaluate(() => {
        const tabsBar = document.querySelector('p-tabs-bar');
        tabsBar.removeChild(tabsBar.children[2]);
      });

      await waitForStencilLifecycle(page);
      await page.waitForTimeout(CSS_ANIMATION_DURATION);

      expect(await getBarWidth(bar)).toBe('0px');
      expect(await getAttribute(firstButton, 'tabindex')).toBe('0');
      expect(await getAttribute(firstButton, 'aria-selected')).toBe('false');
      expect(Math.floor((await getElementPositions(page, bar)).left), 'final position').toEqual(0);
    });

    it('should reset tabindex when last tab is active and a tab is removed in the middle', async () => {
      await initTabsBar({ amount: 3, activeTabIndex: 2 });
      const bar = await getBar();

      await page.evaluate(() => {
        const tabsBar = document.querySelector('p-tabs-bar');
        tabsBar.removeChild(tabsBar.children[1]);
      });

      await waitForStencilLifecycle(page);
      await page.waitForTimeout(CSS_ANIMATION_DURATION);

      const [firstButton, secondButton] = await getAllButtons();

      expect(await getAttribute(firstButton, 'tabindex')).toBe('0');
      expect(await getAttribute(firstButton, 'aria-selected')).toBe('false');
      expect(await getAttribute(secondButton, 'tabindex')).toBe('-1');
      expect(await getAttribute(secondButton, 'aria-selected')).toBe('false');
      expect(Math.floor((await getElementPositions(page, bar)).left), 'final position').toEqual(0);
      expect(await getBarWidth(bar), 'final width').toBe('0px');
    });

    it('should set tabindex and aria-selected on next tab when active tab in the middle is removed', async () => {
      await initTabsBar({ amount: 3, activeTabIndex: 1 });
      const bar = await getBar();

      await page.evaluate(() => {
        const tabsBar = document.querySelector('p-tabs-bar');
        tabsBar.removeChild(tabsBar.children[1]);
      });

      await waitForStencilLifecycle(page);
      await page.waitForTimeout(CSS_ANIMATION_DURATION);

      const [, secondButton] = await getAllButtons();

      expect(await getAttribute(secondButton, 'tabindex')).toBe('0');
      expect(Math.floor((await getElementPositions(page, bar)).left), 'final position').toEqual(103);
      expect(await getBarWidth(bar), 'final width').toBe('87px');
    });
  });

  describe('scroll-area', () => {
    it('should have transition and will-change css property applied on bar', async () => {
      await initTabsBar({ activeTabIndex: 0 });
      const host = await getHost();
      await setProperty(host, 'activeTabIndex', 1); // class with transition property will applied on first change
      await waitForStencilLifecycle(page);

      const bar = await getBar();
      const barStyleTransition = await getElementStyle(bar, 'transition');
      const barStyleWillChange = await getElementStyle(bar, 'willChange');

      expect(barStyleTransition).toContain('transform');
      expect(barStyleTransition).toContain('width');
      expect(barStyleWillChange).toBe('width');
    });

    it('should scroll by 20% on button prev/next click', async () => {
      await initTabsBar({ isWrapped: true, activeTabIndex: 0 });
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
      await initTabsBar({ amount: 6, isWrapped: true, activeTabIndex: 0 });
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
      await initTabsBar({ activeTabIndex: 3, isWrapped: true });
      const allButtons = await getAllButtons();
      const selectedButtonOffset = await getOffsetLeft(allButtons[3]);
      const gradientWidth = await getOffsetWidth(await getGradientNext());
      const scrollArea = await getScrollArea();
      const scrollDistance = +selectedButtonOffset - +gradientWidth + FOCUS_PADDING;

      await waitForStencilLifecycle(page);

      expect(await getScrollLeft(scrollArea)).toEqual(scrollDistance);
    });

    it('should scroll to correct position on tab click', async () => {
      await initTabsBar({ isWrapped: true, activeTabIndex: 0, otherMarkup: clickHandlerScript });
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

    it('should have same offsetLeft on bar and active tab', async () => {
      await initTabsBar({ amount: 6, activeTabIndex: 2, isWrapped: true, otherMarkup: clickHandlerScript });
      const [firstButton, , thirdButton] = await getAllButtons();
      const bar = await getBar();
      const thirdButtonPosition = (await getElementPositions(page, thirdButton)).left;

      expect(Math.round(thirdButtonPosition)).toEqual(Math.floor((await getElementPositions(page, bar)).left));

      await clickElement(firstButton);

      expect((await getElementPositions(page, firstButton)).left, 'correct offsetLeft after click').toEqual(
        Math.floor((await getElementPositions(page, bar)).left)
      );
    });

    it('should have offsetLeft on bar as the center of unset tab', async () => {
      await initTabsBar({ amount: 6, activeTabIndex: 0, isWrapped: true, otherMarkup: clickHandlerScript });
      const [firstButton, , thirdButton] = await getAllButtons();
      const bar = await getBar();
      const firstButtonPosition = (await getElementPositions(page, firstButton)).left;
      const buttonWidth = await getOffsetWidth(thirdButton);
      const buttonCenter = +buttonWidth / 2;
      const host = await getHost();
      await removeAttribute(host, 'active-tab-index');
      await waitForStencilLifecycle(page);
      await page.waitForTimeout(CSS_ANIMATION_DURATION);

      expect(Math.floor(firstButtonPosition + buttonCenter)).toEqual(
        Math.floor((await getElementPositions(page, bar)).left)
      );

      await clickElement(thirdButton);
      await page.waitForTimeout(CSS_ANIMATION_DURATION);

      expect(
        Math.floor((await getElementPositions(page, thirdButton)).left),
        'correct offset width after click on third button'
      ).toEqual(Math.floor((await getElementPositions(page, bar)).left));
    });

    it('should have correct scroll position after tab click and arrow left', async () => {
      await initTabsBar({ amount: 8, isWrapped: true, activeTabIndex: 0, otherMarkup: clickHandlerScript });
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

    it('should have correct scroll position after tab click and arrow right', async () => {
      await initTabsBar({ amount: 8, isWrapped: true, activeTabIndex: 7, otherMarkup: clickHandlerScript });
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

    describe('when not wrapped', () => {
      it('should set correct bar style when no activeTabIndex is set initially', async () => {
        await initTabsBar({ amount: 3 });
        const bar = await getBar();

        expect(await getOffsetWidth(bar)).toBe(0);
      });

      it('should set correct bar style for activeTabIndex 0', async () => {
        await initTabsBar({ amount: 3, activeTabIndex: 0 });
        const [firstButton] = await getAllButtons();
        const bar = await getBar();

        expect(await getOffsetWidth(bar)).toBe(await getOffsetWidth(firstButton));
      });

      it('should set correct bar style initially with last index', async () => {
        await initTabsBar({ amount: 3, activeTabIndex: 2 });
        const [lastButton] = (await getAllButtons()).slice(-1);
        const bar = await getBar();

        expect(await getOffsetWidth(bar)).toBe(await getOffsetWidth(lastButton));
      });
    });

    describe('when wrapped', () => {
      it('should set correct bar style when no activeTabIndex is set initially', async () => {
        await initTabsBar({ isWrapped: true });
        const bar = await getBar();

        expect(await getOffsetWidth(bar)).toBe(0);
      });

      it('should set correct bar style for activeTabIndex 0', async () => {
        await initTabsBar({ isWrapped: true, activeTabIndex: 0 });
        const [firstButton] = await getAllButtons();
        const bar = await getBar();

        expect(await getOffsetWidth(bar)).toBe(await getOffsetWidth(firstButton));
      });

      it('should set correct bar style initially with last index', async () => {
        await initTabsBar({ isWrapped: true, activeTabIndex: 7 });
        const [lastButton] = (await getAllButtons()).slice(-1);
        const bar = await getBar();

        expect(await getOffsetWidth(bar)).toBe(await getOffsetWidth(lastButton));
      });
    });
  });

  describe('keyboard', () => {
    it('should render focus on first tab when no tab is selected on keyboard "tab" press', async () => {
      await initTabsBar({ amount: 3 });
      const getButtonFocus = async () => {
        const snapshot = await page.accessibility.snapshot();
        const button = snapshot.children[0];
        return button.focused;
      };
      expect(await getButtonFocus()).toBeUndefined();

      await page.keyboard.press('Tab');

      expect(await getButtonFocus()).toBe(true);
    });

    it('should render focus on selected tab on keyboard "tab" press', async () => {
      await initTabsBar({ amount: 3, activeTabIndex: 0 });
      const getButtonFocus = async () => {
        const snapshot = await page.accessibility.snapshot();
        const button = snapshot.children[0];
        return button.focused;
      };
      expect(await getButtonFocus()).toBeUndefined();

      await page.keyboard.press('Tab');

      expect(await getButtonFocus()).toBe(true);
    });

    it('should render focus on content on keyboard "tab" press', async () => {
      await initTabsBar({ amount: 3, otherMarkup: '<p-text>Hallo <a href="#">Link</a></p-text>', activeTabIndex: 0 });
      expect(await isElementAtIndexFocused(page, 4)).toBeFalsy();

      await page.keyboard.press('Tab');
      expect(await isElementAtIndexFocused(page, 4)).toBeFalsy();
      await page.keyboard.press('Tab');

      expect(await isElementAtIndexFocused(page, 4)).toBe(true);
    });

    it('should render correct focusedTab on arrow-key press', async () => {
      await initTabsBar({ amount: 3, activeTabIndex: 0 });
      expect(await isElementAtIndexFocused(page, 0)).toBeFalsy();

      await page.keyboard.press('Tab');
      await waitForStencilLifecycle(page);

      expect(await isElementAtIndexFocused(page, 0)).toBeTruthy();

      await page.keyboard.press('ArrowRight');
      await waitForStencilLifecycle(page);

      expect(await isElementAtIndexFocused(page, 0)).toBeFalsy();
      expect(await isElementAtIndexFocused(page, 1)).toBeTruthy();

      await page.keyboard.press('ArrowLeft');
      await waitForStencilLifecycle(page);

      expect(await isElementAtIndexFocused(page, 0)).toBeTruthy();
      expect(await isElementAtIndexFocused(page, 1)).toBeFalsy();
    });

    it('should render correct active tab on first/last or home/end press', async () => {
      await initTabsBar({ amount: 3, activeTabIndex: 1 });
      expect(await isElementAtIndexFocused(page, 2)).toBeFalsy();

      await page.keyboard.press('Tab');
      await page.keyboard.press('End');
      await waitForStencilLifecycle(page);

      expect(await isElementAtIndexFocused(page, 2)).toBeTruthy();

      await page.keyboard.press('Home');
      await waitForStencilLifecycle(page);

      expect(await isElementAtIndexFocused(page, 0)).toBeTruthy();
      expect(await isElementAtIndexFocused(page, 2)).toBeFalsy();
    });

    it('should have correct scroll-position on keyboard arrow press when wrapped by p-tabs', async () => {
      await setContentWithDesignSystem(
        page,
        `
        <div style="width: 300px">
          <p-tabs>
            <p-tabs-item label="Tab Button 1">Content 1</p-tabs-item>
            <p-tabs-item label="Tab Button 2">Content 2</p-tabs-item>
            <p-tabs-item label="Tab Button 3">Content 3</p-tabs-item>
            <p-tabs-item label="Tab Button 4">Content 4</p-tabs-item>
            <p-tabs-item label="Tab Button 5">Content 5</p-tabs-item>
            <p-tabs-item label="Tab Button 6">Content 6</p-tabs-item>
            <p-tabs-item label="Tab Button 7">Content 7</p-tabs-item>
            <p-tabs-item label="Tab Button 8">Content 8</p-tabs-item>
          </p-tabs>
        </div>`
      );
      const allButtons = await (await selectNode(page, 'p-tabs >>> p-tabs-bar')).$$('button');
      const gradientNext = await selectNode(page, 'p-tabs >>> p-tabs-bar >>> .action--next .gradient');
      const gradientWidth = await getOffsetWidth(gradientNext);
      const scrollArea = await selectNode(page, 'p-tabs >>> p-tabs-bar >>> .scroll-area');
      const scrollAreaWidth = await getOffsetWidth(scrollArea);

      expect(await getScrollLeft(scrollArea)).toEqual(0);

      const pressKey = async (key: KeyInput) => {
        await page.keyboard.press(key);
        await page.waitForTimeout(CSS_ANIMATION_DURATION);
      };

      await pressKey('Tab');
      await pressKey('ArrowRight');
      await pressKey('ArrowRight');
      await pressKey('ArrowRight');
      await pressKey('ArrowRight');

      const button5offset = await getOffsetLeft(allButtons[4]);
      const scrollDistanceRight = +button5offset - +gradientWidth + FOCUS_PADDING;
      expect(await getScrollLeft(scrollArea)).toEqual(scrollDistanceRight);

      await pressKey('ArrowLeft');

      const button4offset = await getOffsetLeft(allButtons[3]);
      const button4width = await getOffsetWidth(allButtons[3]);
      const scrollDistanceLeft = +button4offset + +button4width + +gradientWidth - +scrollAreaWidth;
      expect(await getScrollLeft(scrollArea)).toEqual(scrollDistanceLeft);
    });
  });

  describe('events', () => {
    beforeEach(async () => await initAddEventListener(page));

    it('should trigger event on button click', async () => {
      await initTabsBar({ amount: 3, activeTabIndex: 1 });
      const host = await getHost();
      const [firstButton, secondButton, thirdButton] = await getAllButtons();
      let eventCounter = 0;
      await addEventListener(host, 'tabChange', () => eventCounter++);

      // Remove and re-attach component to check if events are duplicated / fire at all
      await reattachElement(page, 'p-tabs-bar');

      await firstButton.click();
      await waitForStencilLifecycle(page);

      expect(eventCounter).toBe(1);

      await secondButton.click();
      await waitForStencilLifecycle(page);

      expect(eventCounter).toBe(2);

      await thirdButton.click();
      await waitForStencilLifecycle(page);

      expect(eventCounter).toBe(3);
    });

    it('should not dispatch event initially with valid activeTabIndex', async () => {
      const COUNTER_KEY = 'pdsEventCounter';
      await setContentWithDesignSystem(page, ''); // empty page

      // render p-tabs with attached event listener at once
      await page.evaluate((COUNTER_KEY: string) => {
        const el = document.createElement('p-tabs-bar');

        Array.from(Array(2)).forEach((_, i) => {
          const child = document.createElement('button');
          child.innerText = `Tab ${i + 1}`;
          el.appendChild(child);
        });

        // count events in browser
        window[COUNTER_KEY] = 0;
        el.addEventListener('tabChange', () => window[COUNTER_KEY]++);

        document.body.appendChild(el);
      }, COUNTER_KEY);

      await waitForStencilLifecycle(page);

      // retrieve counted events from browser
      const getCountedEvents = (): Promise<number> =>
        page.evaluate((COUNTER_KEY: string) => window[COUNTER_KEY], COUNTER_KEY);

      expect(await getCountedEvents()).toBe(0);

      const [, secondButton] = await getAllButtons();
      await secondButton.click();
      await waitForStencilLifecycle(page);

      expect(await getCountedEvents()).toBe(1);
    });
  });

  describe('next/prev buttons', () => {
    it('should have type="button" attribute', async () => {
      await initTabsBar();

      const { prevButton, nextButton } = await getPrevNextButton();

      expect(await getProperty(prevButton, 'type')).toBe('button');
      expect(await getProperty(nextButton, 'type')).toBe('button');
    });

    const hiddenClass = 'action--hidden';
    const tabSizes: TabSize[] = ['small', 'medium'];

    tabSizes.forEach((size) => {
      describe(`size = ${size} `, () => {
        it('should not show prev/next buttons only on vertical scroll', async () => {
          await initTabsBar({ amount: 5, activeTabIndex: 1, size, otherMarkup: '<div style="height: 120vh"></div>' });
          const { actionPrev, actionNext } = await getActionContainers();

          await page.evaluate(() => window.scroll(0, 20));
          await waitForStencilLifecycle(page);

          expect(await getClassList(actionPrev)).toContain(hiddenClass);
          expect(await getClassList(actionNext)).toContain(hiddenClass);
        });

        it('should only show next button', async () => {
          await initTabsBar({ amount: 4, size, isWrapped: true, activeTabIndex: 0 });
          const { actionPrev, actionNext } = await getActionContainers();

          expect(await getClassList(actionNext)).not.toContain(hiddenClass);
          expect(await getClassList(actionPrev)).toContain(hiddenClass);
        });

        it('should only show prev button', async () => {
          await initTabsBar({ amount: 20, activeTabIndex: 19, size, isWrapped: true });
          const { actionPrev, actionNext } = await getActionContainers();

          expect(await getClassList(actionNext)).toContain(hiddenClass);
          expect(await getClassList(actionPrev)).not.toContain(hiddenClass);
        });

        it('should show prev and next button', async () => {
          await initTabsBar({ amount: 7, activeTabIndex: 1, size, isWrapped: true });
          const { actionPrev, actionNext } = await getActionContainers();

          expect(await getClassList(actionNext)).not.toContain(hiddenClass);
          expect(await getClassList(actionPrev)).not.toContain(hiddenClass);
        });

        it('should not show prev/next buttons without children', async () => {
          await setContentWithDesignSystem(page, `<p-tabs-bar active-tab-index="0" size="${size}"></p-tabs-bar>`);
          const { actionPrev, actionNext } = await getActionContainers();

          expect(await getClassList(actionNext)).toContain(hiddenClass);
          expect(await getClassList(actionPrev)).toContain(hiddenClass);
        });

        it('should have label of prev/next buttons in dom', async () => {
          await initTabsBar({ size, activeTabIndex: 0 });

          const { nextButton, prevButton } = await getPrevNextButton();

          expect(await getProperty(prevButton, 'innerHTML')).toBe('prev');
          expect(await getProperty(nextButton, 'innerHTML')).toBe('next');
        });

        it('should not show prev/next buttons only on vertical scroll', async () => {
          await initTabsBar({ amount: 5, activeTabIndex: 1, size, otherMarkup: '<div style="height: 120vh"></div>' });
          const { actionPrev, actionNext } = await getActionContainers();

          await page.evaluate(() => window.scroll(0, 20));
          await waitForStencilLifecycle(page);

          expect(await getClassList(actionPrev)).toContain(hiddenClass);
          expect(await getClassList(actionNext)).toContain(hiddenClass);
        });
      });
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
              <p-tabs-bar size="medium" active-tab-index="1">
                <button style="width: 150px" type="button">A</button>
                <button ${style} type="button">B</button>
              </p-tabs-bar>
            </div>`
          );
          const { actionNext } = await getActionContainers();

          expect(await getClassList(actionNext), `On size ${i}`).toContain(hiddenClass);
        });
      }
    });
  });

  describe('errors', () => {
    it('should not cause TypeError within scrollActiveTabIntoView', async () => {
      initConsoleObserver(page);

      await setContentWithDesignSystem(page, ''); // empty page
      await page.evaluate(() => {
        const el = document.createElement('p-tabs-bar');
        el['activeTabIndex'] = -1;

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

      await setContentWithDesignSystem(page, `<p-tabs-bar active-tab-index="0"></p-tabs-bar>`);
      expect(getConsoleErrorsAmount()).toBe(0);

      await page.evaluate(() => console.error('test error'));
      expect(getConsoleErrorsAmount()).toBe(1);
    });
  });

  describe('focus state', () => {
    it('should be shown by keyboard navigation only with buttons', async () => {
      await initTabsBar({ amount: 3, activeTabIndex: 0, otherMarkup: clickHandlerScript });

      const [, secondButton] = await getAllButtons();
      const hidden = expectedStyleOnFocus({ color: 'transparent', offset: '1px' });
      const visible = expectedStyleOnFocus({ color: 'hover', offset: '1px' });

      expect(await getOutlineStyle(secondButton)).toBe(hidden);

      await secondButton.click();
      await waitForInheritedCSSTransition(page);

      expect(await getOutlineStyle(secondButton)).toBe(hidden);

      await page.keyboard.down('ShiftLeft');
      await page.keyboard.press('Tab');
      await page.keyboard.up('ShiftLeft');
      await page.keyboard.press('Tab');

      expect(await getOutlineStyle(secondButton)).toBe(visible);
    });

    it('should be shown by keyboard navigation only with anchors', async () => {
      await initTabsBar({ amount: 3, tag: 'a', activeTabIndex: 0, otherMarkup: clickHandlerScript });

      const [, secondLink] = await getAllLinks();
      const hidden = expectedStyleOnFocus({ color: 'transparent', offset: '1px' });
      const visible = expectedStyleOnFocus({ color: 'hover', offset: '1px' });

      expect(await getOutlineStyle(secondLink)).toBe(hidden);

      await secondLink.click();
      await waitForInheritedCSSTransition(page);

      expect(await getOutlineStyle(secondLink)).toBe(hidden);

      await page.keyboard.down('ShiftLeft');
      await page.keyboard.press('Tab');
      await page.keyboard.up('ShiftLeft');
      await page.keyboard.press('Tab');

      expect(await getOutlineStyle(secondLink)).toBe(visible);
    });
  });

  describe('lifecycle', () => {
    it('should work without unnecessary round trips on init', async () => {
      await initTabsBar({ amount: 3, tag: 'a', activeTabIndex: 0 });
      const status = await getLifecycleStatus(page);

      expect(status.componentDidLoad['p-tabs-bar'], 'componentDidLoad: p-tabs-bar').toBe(1);
      expect(status.componentDidLoad['p-button-pure'], 'componentDidLoad: p-button-pure').toBe(2);
      expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(2);
      expect(status.componentDidLoad['p-text'], 'componentDidLoad: p-text').toBe(2);

      expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(7);
      expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
    });

    it('should work without unnecessary round trips on prop change', async () => {
      await initTabsBar({ amount: 3, tag: 'button', activeTabIndex: 0 });
      const host = await getHost();

      await setProperty(host, 'activeTabIndex', 2);
      await waitForStencilLifecycle(page);

      const status = await getLifecycleStatus(page);

      expect(status.componentDidUpdate['p-tabs-bar'], 'componentDidUpdate: p-tabs-bar').toBe(1);

      expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(7);
      expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
    });
  });

  describe('accessibility', () => {
    const getTabList = () => selectNode(page, 'p-tabs-bar >>> [role="tablist"]');
    it('should expose correct initial accessibility tree of tablist', async () => {
      await initTabsBar({ amount: 3 });

      await expectA11yToMatchSnapshot(page, await getTabList(), { interestingOnly: false });
    });

    it('should render correct accessibility tree if activeTabIndex is set ', async () => {
      await initTabsBar({ amount: 3, activeTabIndex: 1 });

      await expectA11yToMatchSnapshot(page, await getTabList(), { interestingOnly: false });
    });

    it('should render correct accessibility tree if activeTabIndex is removed ', async () => {
      await initTabsBar({ amount: 3, activeTabIndex: 1 });
      const host = await getHost();

      await removeAttribute(host, 'active-tab-index');
      await waitForStencilLifecycle(page);

      await expectA11yToMatchSnapshot(page, await getTabList(), { interestingOnly: false });
    });

    it('should render correct accessibility tree on scrollArea click', async () => {
      await initTabsBar({ amount: 4, activeTabIndex: 3 });
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
      await initTabsBar({ amount: 3, activeTabIndex: 0, otherMarkup: clickHandlerScript });

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
