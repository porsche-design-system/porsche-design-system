import { ConsoleMessage, ElementHandle, Page } from 'puppeteer';
import {
  addEventListener,
  getAttribute,
  getBrowser,
  getElementPositions,
  getProperty,
  getStyleOnFocus,
  initAddEventListener,
  reattachElement,
  selectNode,
  setAttribute,
  setContentWithDesignSystem,
  waitForInheritedCSSTransition,
  expectedStyleOnFocus,
  waitForStencilLifecycle,
  getOutlineStyle,
  getLifecycleStatus,
} from '../helpers';

export const CSS_ANIMATION_DURATION = 1000;
export const FOCUS_PADDING = 8;
const TABS_SCROLL_PERCENTAGE = 0.2;

describe('tabs-bar', () => {
  let page: Page;
  beforeEach(async () => {
    page = await getBrowser().newPage();
    await initAddEventListener(page);
  });
  afterEach(async () => await page.close());

  const initTabsBar = async (opts?: {
    amount?: number;
    activeTabIndex?: number;
    isWrapped?: boolean;
    otherMarkup?: string;
    tag?: 'a' | 'button';
  }) => {
    const { amount = 8, activeTabIndex, isWrapped, otherMarkup, tag } = opts ?? {};

    const content = `<p-tabs-bar ${activeTabIndex ? `active-tab-index="${activeTabIndex}"` : ''}>
  ${Array.from(Array(amount))
    .map(
      (_, i) =>
        `<${tag === 'a' ? 'a onclick="return false" href="#"' : 'button'}>Tab Button ${i + 1}</${
          tag === 'a' ? 'a' : 'button'
        }>`
    )
    .join('')}
</p-tabs-bar>${otherMarkup ?? ''}`;

    await setContentWithDesignSystem(page, isWrapped ? `<div style="width: 300px">${content}</div>` : content, {
      enableLogging: true,
    });
  };

  const getHost = () => selectNode(page, 'p-tabs-bar');
  const getAllButtons = () => page.$$('button');
  const getAllLinks = () => page.$$('a');
  const getScrollArea = () => selectNode(page, 'p-tabs-bar >>> .p-tabs-bar__scroll-area');
  const getStatusBar = () => selectNode(page, 'p-tabs-bar >>> .p-tabs-bar__status-bar');
  const getGradientNext = () => selectNode(page, 'p-tabs-bar >>> .p-tabs-bar__gradient--next');
  const getActionContainers = async () => {
    const actionPrev = await selectNode(page, 'p-tabs-bar >>> .p-tabs-bar__action--prev');
    const actionNext = await selectNode(page, 'p-tabs-bar >>> .p-tabs-bar__action--next');
    return { actionPrev, actionNext };
  };
  const getPrevNextButton = async () => {
    const prevButton = await selectNode(page, 'p-tabs-bar >>> .p-tabs-bar__action--prev > p-button-pure');
    const nextButton = await selectNode(page, 'p-tabs-bar >>> .p-tabs-bar__action--next > p-button-pure');
    return { prevButton, nextButton };
  };
  const getScrollLeft = (element: ElementHandle) => getProperty(element, 'scrollLeft');
  const getOffsetLeft = (element: ElementHandle) => getProperty(element, 'offsetLeft');
  const getOffsetWidth = (element: ElementHandle) => getProperty(element, 'offsetWidth');
  const getClassList = async (element: ElementHandle): Promise<string[]> =>
    Object.values(await getProperty(element, 'classList'));

  const isElementAtIndexFocused = async (elementIndex: number): Promise<boolean> => {
    const snapshot = await page.accessibility.snapshot();
    const element = snapshot.children[elementIndex];
    return element.focused;
  };

  it('should render correct active tab if activeTabIndex is set ', async () => {
    await initTabsBar({ amount: 3, activeTabIndex: 1 });
    const allButtons = await getAllButtons();
    await page.waitForTimeout(40); // class gets set through js, this takes a little time

    expect(await getAttribute(allButtons[0], 'aria-selected')).toBe('false');
    expect(await getAttribute(allButtons[1], 'aria-selected')).toBe('true');
    expect(await getAttribute(allButtons[2], 'aria-selected')).toBe('false');
  });

  describe('scrollArea', () => {
    const clickElement = async (el: ElementHandle) => {
      await el.click();
      await waitForStencilLifecycle(page);
      await page.waitForTimeout(CSS_ANIMATION_DURATION);
    };

    it('should scroll by 20% on button prev/next click', async () => {
      await initTabsBar({ isWrapped: true });
      const { prevButton, nextButton } = await getPrevNextButton();
      const scrollArea = await getScrollArea();
      const scrollAreaWidth = await getOffsetWidth(scrollArea);
      const scrollDistance = Math.round(+scrollAreaWidth * TABS_SCROLL_PERCENTAGE);

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
      await initTabsBar({ amount: 6, isWrapped: true });
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
      const selectedTabOffset = await getOffsetLeft(allButtons[3]);
      const gradientWidth = await getOffsetWidth(await getGradientNext());
      const scrollArea = await getScrollArea();
      const scrollDistance = +selectedTabOffset - +gradientWidth + FOCUS_PADDING;

      await waitForStencilLifecycle(page);

      expect(await getScrollLeft(scrollArea)).toEqual(scrollDistance);
    });

    it('should scroll to correct position on tab click', async () => {
      await initTabsBar({ isWrapped: true });
      const [, , , fourthButton, fifthButton] = await getAllButtons();
      const gradient = await getGradientNext();
      const gradientWidth = await getOffsetWidth(gradient);
      const scrollArea = await getScrollArea();
      const scrollAreaWidth = await getOffsetWidth(scrollArea);

      expect(await getScrollLeft(scrollArea)).toEqual(0);

      await clickElement(fifthButton);
      const tab5offset = await getOffsetLeft(fifthButton);
      const scrollDistanceRight = +tab5offset - +gradientWidth + FOCUS_PADDING;
      expect(await getScrollLeft(scrollArea)).toEqual(scrollDistanceRight);

      await clickElement(fourthButton);
      const tab4offset = await getOffsetLeft(fourthButton);
      const tabWidth = await getOffsetWidth(fourthButton);
      const scrollDistanceLeft = +tab4offset + +tabWidth + +gradientWidth - +scrollAreaWidth;
      expect(await getScrollLeft(scrollArea)).toEqual(scrollDistanceLeft);
    });

    it('should keep old selected tab on scrollArea click', async () => {
      await initTabsBar({ amount: 4, activeTabIndex: 3 });
      const allButtons = await getAllButtons();
      const scrollArea = await getScrollArea();

      await page.waitForTimeout(40); // class gets set through js, this takes a little time
      expect(await getAttribute(allButtons[0], 'aria-selected')).toBe('false');
      expect(await getAttribute(allButtons[3], 'aria-selected')).toBe('true');

      await clickElement(scrollArea);
      expect(await getAttribute(allButtons[0], 'aria-selected')).toBe('false');
      expect(await getAttribute(allButtons[3], 'aria-selected')).toBe('true');
    });

    it('should have same offsetLeft on statusbar and active tab', async () => {
      await initTabsBar({ amount: 6, activeTabIndex: 2, isWrapped: true });
      const [firstButton, , thirdButton] = await getAllButtons();
      const statusBar = await getStatusBar();
      const thirdButtonPosition = (await getElementPositions(page, thirdButton)).left;

      expect(Math.round(thirdButtonPosition)).toEqual(Math.floor((await getElementPositions(page, statusBar)).left));

      await clickElement(firstButton);

      expect((await getElementPositions(page, firstButton)).left).toEqual(
        Math.floor((await getElementPositions(page, statusBar)).left)
      );
    });

    describe('when not wrapped', () => {
      it('should set correct statusBarStyle initially', async () => {
        await initTabsBar({ amount: 3 });
        const [firstButton] = await getAllButtons();
        const statusBar = await getStatusBar();

        expect(await getOffsetWidth(statusBar)).toBe(await getOffsetWidth(firstButton));
      });

      it('should set correct statusBarStyle initially with last index', async () => {
        await initTabsBar({ amount: 3, activeTabIndex: 2 });
        const [lastButton] = (await getAllButtons()).slice(-1);
        const statusBar = await getStatusBar();

        expect(await getOffsetWidth(statusBar)).toBe(await getOffsetWidth(lastButton));
      });
    });

    describe('when wrapped', () => {
      it('should set correct statusBarStyle initially', async () => {
        await initTabsBar({ isWrapped: true });
        const [firstButton] = await getAllButtons();
        const statusBar = await getStatusBar();

        expect(await getOffsetWidth(statusBar)).toBe(await getOffsetWidth(firstButton));
      });

      it('should set correct statusBarStyle initially with last index', async () => {
        await initTabsBar({ isWrapped: true, activeTabIndex: 7 });
        const [lastButton] = (await getAllButtons()).slice(-1);
        const statusBar = await getStatusBar();

        expect(await getOffsetWidth(statusBar)).toBe(await getOffsetWidth(lastButton));
      });
    });
  });

  describe('keyboard', () => {
    it('should render focus on selected tab on keyboard "tab" press', async () => {
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

    it('should render focus on content on keyboard "tab" press', async () => {
      await initTabsBar({ amount: 3, otherMarkup: '<p-text>Hallo <a href="#">Link</a></p-text>' });
      expect(await isElementAtIndexFocused(4)).toBeFalsy();

      await page.keyboard.press('Tab');
      expect(await isElementAtIndexFocused(4)).toBeFalsy();
      await page.keyboard.press('Tab');

      expect(await isElementAtIndexFocused(4)).toBe(true);
    });

    it('should render correct focusedTab on arrow-key press', async () => {
      await initTabsBar({ amount: 3 });
      expect(await isElementAtIndexFocused(0)).toBeFalsy();

      await page.keyboard.press('Tab');
      await waitForStencilLifecycle(page);

      expect(await isElementAtIndexFocused(0)).toBeTrue();

      await page.keyboard.press('ArrowRight');
      await waitForStencilLifecycle(page);

      expect(await isElementAtIndexFocused(0)).toBeFalsy();
      expect(await isElementAtIndexFocused(1)).toBeTrue();

      await page.keyboard.press('ArrowLeft');
      await waitForStencilLifecycle(page);

      expect(await isElementAtIndexFocused(0)).toBeTrue();
      expect(await isElementAtIndexFocused(1)).toBeFalsy();
    });

    it('should render correct active tab on first/last or home/end press', async () => {
      await initTabsBar({ amount: 3, activeTabIndex: 1 });
      expect(await isElementAtIndexFocused(2)).toBeFalsy();

      await page.keyboard.press('Tab');
      await page.keyboard.press('End');
      await waitForStencilLifecycle(page);

      expect(await isElementAtIndexFocused(2)).toBeTrue();

      await page.keyboard.press('Home');
      await waitForStencilLifecycle(page);

      expect(await isElementAtIndexFocused(0)).toBeTrue();
      expect(await isElementAtIndexFocused(2)).toBeFalsy();
    });

    it('should render correct active tab on focus change and enter press', async () => {
      await initTabsBar({ amount: 3, activeTabIndex: 0 });
      const [firstButton, secondButton] = await getAllButtons();

      expect(await getAttribute(firstButton, 'aria-selected')).toBe('true');
      expect(await getAttribute(secondButton, 'aria-selected')).toBe('false');

      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);

      expect(await getAttribute(firstButton, 'aria-selected')).toBe('false');
      expect(await getAttribute(secondButton, 'aria-selected')).toBe('true');
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
      const gradientNext = await selectNode(page, 'p-tabs >>> p-tabs-bar >>> .p-tabs-bar__gradient--next');
      const gradientWidth = await getOffsetWidth(gradientNext);
      const scrollArea = await selectNode(page, 'p-tabs >>> p-tabs-bar >>> .p-tabs-bar__scroll-area');
      const scrollAreaWidth = await getOffsetWidth(scrollArea);

      expect(await getScrollLeft(scrollArea)).toEqual(0);

      const pressKey = async (key: string) => {
        await page.keyboard.press(key);
        await page.waitForTimeout(CSS_ANIMATION_DURATION);
      };

      await pressKey('Tab');
      await pressKey('ArrowRight');
      await pressKey('ArrowRight');
      await pressKey('ArrowRight');
      await pressKey('ArrowRight');

      const tab5offset = await getOffsetLeft(allButtons[4]);
      const scrollDistanceRight = +tab5offset - +gradientWidth + FOCUS_PADDING;
      expect(await getScrollLeft(scrollArea)).toEqual(scrollDistanceRight);

      await pressKey('ArrowLeft');

      const tab4offset = await getOffsetLeft(allButtons[3]);
      const tab4width = await getOffsetWidth(allButtons[3]);
      const scrollDistanceLeft = +tab4offset + +tab4width + +gradientWidth - +scrollAreaWidth;
      expect(await getScrollLeft(scrollArea)).toEqual(scrollDistanceLeft);
    });
  });

  describe('events', () => {
    it('should trigger event on button click', async () => {
      await initTabsBar({ amount: 3, activeTabIndex: 1 });
      const host = await selectNode(page, 'p-tabs-bar');
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
    const hiddenClass = 'p-tabs-bar__action--hidden';

    it('should not show prev/next buttons only on vertical scroll', async () => {
      await initTabsBar({ amount: 5, activeTabIndex: 1, otherMarkup: '<div style="height: 120vh"></div>' });
      const { actionPrev, actionNext } = await getActionContainers();

      await page.evaluate(() => window.scroll(0, 20));
      await waitForStencilLifecycle(page);

      expect(await getClassList(actionPrev)).toContain(hiddenClass);
      expect(await getClassList(actionNext)).toContain(hiddenClass);
    });

    it('should only show next button', async () => {
      await initTabsBar({ amount: 4, isWrapped: true });
      const { actionPrev, actionNext } = await getActionContainers();

      expect(await getClassList(actionNext)).not.toContain(hiddenClass);
      expect(await getClassList(actionPrev)).toContain(hiddenClass);
    });

    it('should only show prev button', async () => {
      await initTabsBar({ amount: 4, activeTabIndex: 3, isWrapped: true });
      const { actionPrev, actionNext } = await getActionContainers();

      expect(await getClassList(actionNext)).toContain(hiddenClass);
      expect(await getClassList(actionPrev)).not.toContain(hiddenClass);
    });

    it('should show prev and next button', async () => {
      await initTabsBar({ amount: 7, activeTabIndex: 1, isWrapped: true });
      const { actionPrev, actionNext } = await getActionContainers();

      expect(await getClassList(actionNext)).not.toContain(hiddenClass);
      expect(await getClassList(actionPrev)).not.toContain(hiddenClass);
    });

    it('should not show prev/next buttons without children', async () => {
      await setContentWithDesignSystem(page, `<p-tabs-bar></p-tabs-bar>`);
      const { actionPrev, actionNext } = await getActionContainers();

      expect(await getClassList(actionNext)).toContain(hiddenClass);
      expect(await getClassList(actionPrev)).toContain(hiddenClass);
    });
  });

  describe('errors', () => {
    const getErrorsAmount = (messages: ConsoleMessage[]) => messages.filter((x) => x.type() === 'error').length;

    it('should not cause TypeError within scrollActiveTabIntoView', async () => {
      const consoleMessages: ConsoleMessage[] = [];
      page.on('console', (msg) => {
        consoleMessages.push(msg);
        if (msg.type() === 'error') {
          const { description } = msg.args()[0]['_remoteObject'];
          if (description) {
            console.log(description);
          }
        }
      });

      await setContentWithDesignSystem(page, ''); // empty page
      await page.evaluate(() => {
        const el = document.createElement('p-tabs-bar');
        el.setAttribute('active-tab-index', '-1');

        Array.from(Array(2)).forEach((_, i) => {
          const child = document.createElement('button');
          child.innerText = `Content ${i + 1}`;
          el.appendChild(child);
        });
        document.body.appendChild(el);
      });

      await waitForStencilLifecycle(page);
      expect(getErrorsAmount(consoleMessages)).toBe(0);

      await page.evaluate(() => console.error('test error'));
      expect(getErrorsAmount(consoleMessages)).toBe(1);
    });

    it('should not crash without children', async () => {
      const consoleMessages: ConsoleMessage[] = [];
      page.on('console', (msg) => {
        consoleMessages.push(msg);
        if (msg.type() === 'error') {
          const { description } = msg.args()[0]['_remoteObject'];
          if (description) {
            console.log(description);
          }
        }
      });

      await setContentWithDesignSystem(page, `<p-tabs-bar></p-tabs-bar>`);
      expect(getErrorsAmount(consoleMessages)).toBe(0);

      await page.evaluate(() => console.error('test error'));
      expect(getErrorsAmount(consoleMessages)).toBe(1);
    });
  });

  describe('focus state', () => {
    it('should be shown by keyboard navigation only with buttons', async () => {
      await initTabsBar({ amount: 3 });

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
      await initTabsBar({ amount: 3, tag: 'a' });

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

    it('should show outline of slotted <button> when it is focused', async () => {
      await initTabsBar({ amount: 3 });

      const host = await getHost();
      const buttons = await getAllButtons();

      expect(await getStyleOnFocus(buttons[0])).toBe(expectedStyleOnFocus({ color: 'active', offset: '1px' }));
      expect(await getStyleOnFocus(buttons[1])).toBe(expectedStyleOnFocus({ offset: '1px' }));
      expect(await getStyleOnFocus(buttons[2])).toBe(expectedStyleOnFocus({ offset: '1px' }));

      await setAttribute(host, 'theme', 'dark');
      await waitForStencilLifecycle(page);
      await waitForInheritedCSSTransition(page);

      expect(await getStyleOnFocus(buttons[0])).toBe(
        expectedStyleOnFocus({ color: 'active', theme: 'dark', offset: '1px' })
      );
      expect(await getStyleOnFocus(buttons[1])).toBe(expectedStyleOnFocus({ theme: 'dark', offset: '1px' }));
      expect(await getStyleOnFocus(buttons[2])).toBe(expectedStyleOnFocus({ theme: 'dark', offset: '1px' }));
    });

    it('should show outline of slotted <a> when it is focused', async () => {
      await initTabsBar({ amount: 3, tag: 'a' });

      const host = await getHost();
      const links = await getAllLinks();

      expect(await getStyleOnFocus(links[0])).toBe(expectedStyleOnFocus({ color: 'active', offset: '1px' }));
      expect(await getStyleOnFocus(links[1])).toBe(expectedStyleOnFocus({ offset: '1px' }));
      expect(await getStyleOnFocus(links[2])).toBe(expectedStyleOnFocus({ offset: '1px' }));

      await setAttribute(host, 'theme', 'dark');
      await waitForStencilLifecycle(page);
      await waitForInheritedCSSTransition(page);

      expect(await getStyleOnFocus(links[0])).toBe(
        expectedStyleOnFocus({ color: 'active', theme: 'dark', offset: '1px' })
      );
      expect(await getStyleOnFocus(links[1])).toBe(expectedStyleOnFocus({ theme: 'dark', offset: '1px' }));
      expect(await getStyleOnFocus(links[2])).toBe(expectedStyleOnFocus({ theme: 'dark', offset: '1px' }));
    });
  });

  describe('lifecycle', () => {
    it('should work without unnecessary round trips', async () => {
      await initTabsBar({ amount: 3, tag: 'a' });

      expect(await getLifecycleStatus(page, 'componentWillLoad')).toBe(5, 'componentWillLoad:all');
    });
  });
});
