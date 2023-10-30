import type { ElementHandle, KeyInput, Page } from 'puppeteer';
import {
  addEventListener,
  CSS_ANIMATION_DURATION,
  expectA11yToMatchSnapshot,
  FOCUS_PADDING,
  getActiveElementId,
  getAttribute,
  getConsoleErrorsAmount,
  getElementPositions,
  getElementStyle,
  getEventSummary,
  getLifecycleStatus,
  getOffsetLeft,
  getOffsetWidth,
  getProperty,
  getScrollLeft,
  initConsoleObserver,
  isElementAtIndexFocused,
  reattachElementHandle,
  removeAttribute,
  SCROLL_PERCENTAGE,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';
import type { BreakpointCustomizable, TabSize } from '@porsche-design-system/components/dist/types/bundle';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

type InitOptions = {
  amount?: number;
  activeTabIndex?: number;
  size?: BreakpointCustomizable<TabSize>;
  isWrapped?: boolean;
  otherMarkup?: string;
  tag?: 'a' | 'button';
};

const initTabsBar = (opts?: InitOptions) => {
  const { amount = 8, activeTabIndex, size = 'small', isWrapped, otherMarkup = '', tag = 'button' } = opts || {};

  const tabAttributes = tag === 'a' ? ' onclick="return false" href="#"' : '';
  const tabs = Array.from(Array(amount))
    .map((_, i) => `<${tag}${tabAttributes}>Tab Button ${i + 1}</${tag}>`)
    .join('');

  const attributes = [`size="${size}"`, activeTabIndex !== undefined && `active-tab-index="${activeTabIndex}"`]
    .filter(Boolean)
    .join(' ');

  const content = `<p-tabs-bar ${attributes}>
  ${tabs}
</p-tabs-bar>
${otherMarkup}
<script>
  document.querySelector('p-tabs-bar').addEventListener('update', (e) => {
    e.target.activeTabIndex = e.detail.activeTabIndex;
  });
</script>`;

  return setContentWithDesignSystem(page, isWrapped ? `<div style="width: 300px">${content}</div>` : content);
};

const getHost = () => selectNode(page, 'p-tabs-bar');
const getAllButtons = () => page.$$('button');
const getScrollArea = () => selectNode(page, 'p-tabs-bar >>> p-scroller >>> .scroll-area');
const getBar = () => selectNode(page, 'p-tabs-bar >>> .bar');
const getGradientNext = () => selectNode(page, 'p-tabs-bar >>> p-scroller >>> .action-next');

const getPrevNextButton = async () => {
  const prevButton = await selectNode(page, 'p-tabs-bar >>> p-scroller >>> .action-prev button');
  const nextButton = await selectNode(page, 'p-tabs-bar >>> p-scroller >>> .action-next button');
  return { prevButton, nextButton };
};

const getScrollDistance = (scrollAreaWidth: number): number => Math.round(scrollAreaWidth * SCROLL_PERCENTAGE);
const getBarVisibility = async (): Promise<string> => getElementStyle(await getBar(), 'visibility');
const getBarWidth = async (): Promise<string> => getElementStyle(await getBar(), 'width');

const clickElement = async (el: ElementHandle) => {
  await el.click();
  await waitForStencilLifecycle(page);
  await waitForAnimation();
};

const waitForAnimation = () => new Promise((resolve) => setTimeout(resolve, CSS_ANIMATION_DURATION));

it('should work with nested or translated markup', async () => {
  const content = `
<p-tabs-bar active-tab-index="0">
  <button type="button">
    <font style="vertical-align: inherit;">
      <font style="vertical-align: inherit;">Tab Eins</font>
    </font>
  </button>
  <button type="button">
    <font style="vertical-align: inherit;">
      <font style="vertical-align: inherit;">Tab Zwei</font>
    </font>
  </button>
  <button type="button">
    <font style="vertical-align: inherit;">
      <font style="vertical-align: inherit;">Tab Drei</font>
    </font>
  </button>
</p-tabs-bar>

<script>
  document.querySelector('p-tabs-bar').addEventListener('update', (e) => {
    e.target.activeTabIndex = e.detail.activeTabIndex;
  });
</script>`;

  await setContentWithDesignSystem(page, content);

  const host = await getHost();
  const [innerTab1, innerTab2, innerTab3] = await page.$$('button > font > font');

  await addEventListener(host, 'update');
  expect(await getProperty(host, 'activeTabIndex')).toBe(0);
  expect((await getEventSummary(host, 'update')).counter).toBe(0);

  await innerTab2.click();
  await waitForStencilLifecycle(page);
  expect(await getProperty(host, 'activeTabIndex')).toBe(1);
  expect((await getEventSummary(host, 'update')).counter).toBe(1);

  await innerTab3.click();
  await waitForStencilLifecycle(page);
  expect(await getProperty(host, 'activeTabIndex')).toBe(2);
  expect((await getEventSummary(host, 'update')).counter).toBe(2);

  await innerTab1.click();
  await waitForStencilLifecycle(page);
  expect(await getProperty(host, 'activeTabIndex')).toBe(0);
  expect((await getEventSummary(host, 'update')).counter).toBe(3);
});

describe('slotted content changes', () => {
  it('should adjust bar style when new tab element is added and clicked', async () => {
    await initTabsBar({ amount: 1, activeTabIndex: 0 });
    const bar = await getBar();

    // add a new button
    await page.evaluate(() => {
      const tabsBar = document.querySelector('p-tabs-bar');
      const tab = document.createElement('button');
      tab.innerText = 'Added Tab Text';
      tabsBar.append(tab);
    });
    await waitForStencilLifecycle(page);

    expect(Math.floor((await getElementPositions(page, bar)).left), 'initial position').toEqual(0);

    const buttons = await getAllButtons();
    const [, secondButton] = buttons;
    await clickElement(secondButton);

    expect(buttons.length).toBe(2);
    expect(Math.floor((await getElementPositions(page, bar)).left), 'final position').toEqual(102);
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

    const buttons = await getAllButtons();

    expect(buttons.length).toBe(2);
    expect(await getBarWidth()).toBe('0px');
    expect(await getAttribute(firstButton, 'tabindex')).toBe('0');
    expect(await getAttribute(firstButton, 'aria-selected')).toBe('false');
    expect(Math.floor((await getElementPositions(page, bar)).left)).toEqual(0);
  });

  it('should reset tabindex when last tab is active and a tab is removed in the middle', async () => {
    await initTabsBar({ amount: 3, activeTabIndex: 2 });

    await page.evaluate(() => {
      const tabsBar = document.querySelector('p-tabs-bar');
      tabsBar.removeChild(tabsBar.children[1]);
    });
    await waitForStencilLifecycle(page);

    const buttons = await getAllButtons();
    const [firstButton, secondButton] = buttons;

    expect(buttons.length).toBe(2);
    expect(await getAttribute(firstButton, 'tabindex')).toBe('0');
    expect(await getAttribute(firstButton, 'aria-selected')).toBe('false');
    expect(await getAttribute(secondButton, 'tabindex')).toBe('-1');
    expect(await getAttribute(secondButton, 'aria-selected')).toBe('false');
  });

  it('should set tabindex and aria-selected on next tab when active tab in the middle is removed', async () => {
    await initTabsBar({ amount: 3, activeTabIndex: 1 });

    await page.evaluate(() => {
      const tabsBar = document.querySelector('p-tabs-bar');
      tabsBar.removeChild(tabsBar.children[1]);
    });
    await waitForStencilLifecycle(page);

    const buttons = await getAllButtons();
    const [, secondButton] = buttons;

    expect(buttons.length).toBe(2);
    expect(await getAttribute(secondButton, 'tabindex')).toBe('0');
    expect(await getAttribute(secondButton, 'aria-selected')).toBe('true');
  });
});

// TODO: should probably verify that the correct values are set for `p-scroller.scrollToPosition`
describe('active index position', () => {
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
    await initTabsBar({ isWrapped: true, activeTabIndex: 0 });
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

  // puppeteer ignores @media(hover: hover) styles, so scroller does not show buttons, but playwright can handle it
  xit('should have correct scroll position after tab click and prev button click', async () => {
    await initTabsBar({ amount: 8, isWrapped: true, activeTabIndex: 0 });
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
    expect(await getScrollLeft(scrollArea), 'scroll left active button after second prev click').toBe(41);
  });

  it('should have correct scroll position after tab click and next button click', async () => {
    await initTabsBar({ amount: 8, isWrapped: true, activeTabIndex: 7 });
    const { nextButton } = await getPrevNextButton();
    const allButtons = await getAllButtons();
    const button7 = allButtons[6];

    const scrollArea = await getScrollArea();
    const scrollAreaWidth: number = await getOffsetWidth(scrollArea);

    const gradient = await getGradientNext();
    const gradientWidth = await getOffsetWidth(gradient);

    await clickElement(button7);
    const button7offset = await getOffsetLeft(button7);
    const buttonWidth = await getOffsetWidth(button7);
    const scrollDistanceRight = +button7offset + +buttonWidth + +gradientWidth - +scrollAreaWidth;

    expect(await getScrollLeft(scrollArea), 'scroll left active button after click').toBe(scrollDistanceRight);

    await clickElement(nextButton);
    expect(await getScrollLeft(scrollArea), 'scroll left active button after prev click').toBe(502);
  });
});

describe('bar', () => {
  it('should have a hidden bar for activeTabIndex=0', async () => {
    await initTabsBar({ amount: 3, activeTabIndex: 0 });
    expect(await getBarVisibility()).toBe('hidden');
  });

  it('should have a hidden bar for activeTabIndex=1', async () => {
    await initTabsBar({ amount: 3, activeTabIndex: 1 });
    expect(await getBarVisibility()).toBe('hidden');
  });

  it('should have same offsetLeft on bar and active tab', async () => {
    await initTabsBar({ amount: 6, activeTabIndex: 0, isWrapped: true });
    const [firstButton, , thirdButton] = await getAllButtons();
    const bar = await getBar();

    await clickElement(thirdButton);
    const thirdButtonPosition = await getElementPositions(page, thirdButton);
    expect(Math.round(thirdButtonPosition.left)).toEqual(Math.floor((await getElementPositions(page, bar)).left));

    await clickElement(firstButton);
    const firstButtonPosition = await getElementPositions(page, firstButton);
    expect(firstButtonPosition.left, 'correct offsetLeft after click').toEqual(
      Math.floor((await getElementPositions(page, bar)).left)
    );
  });

  it('should have same offsetLeft on bar and active tab when size is responsive', async () => {
    await page.setViewport({
      width: 760,
      height: 600,
    });

    await initTabsBar({
      amount: 6,
      activeTabIndex: 0,
      isWrapped: true,
      size: "{ base: 'small', xs: 'medium', s: 'small', m: 'medium', l: 'small', xl: 'medium' }",
    });
    const [firstButton, , thirdButton] = await getAllButtons();
    const bar = await getBar();

    await clickElement(thirdButton);
    const thirdButtonPosition = await getElementPositions(page, thirdButton);
    expect(Math.round(thirdButtonPosition.left)).toEqual(Math.floor((await getElementPositions(page, bar)).left));

    await page.setViewport({
      width: 1000,
      height: 600,
    });

    await firstButton.click();
    await thirdButton.click();
    await waitForAnimation(); // 🤷‍

    const thirdButtonPositionAfter = await getElementPositions(page, thirdButton);
    expect(Math.round(thirdButtonPositionAfter.left), 'correct offsetLeft after page resize').toEqual(
      Math.floor((await getElementPositions(page, bar)).left)
    );
  });
});

describe('when not wrapped', () => {
  it('should set correct bar width when no activeTabIndex is set initially', async () => {
    await initTabsBar({ amount: 3 });
    const bar = await getBar();

    expect(await getOffsetWidth(bar)).toBe(0);
  });

  it('should set correct bar width for activeTabIndex=0', async () => {
    await initTabsBar({ amount: 3, activeTabIndex: 1 });
    const [firstButton] = await getAllButtons();
    const bar = await getBar();

    await firstButton.click();

    expect(await getOffsetWidth(bar)).toBe(await getOffsetWidth(firstButton));
  });

  it('should set correct bar width for activeTabIndex=last', async () => {
    await initTabsBar({ amount: 3, activeTabIndex: 1 });
    const [lastButton] = (await getAllButtons()).slice(-1);
    const bar = await getBar();

    await lastButton.click();

    expect(await getOffsetWidth(bar)).toBe(await getOffsetWidth(lastButton));
  });
});

describe('when wrapped', () => {
  it('should set correct bar width when no activeTabIndex is set initially', async () => {
    await initTabsBar({ isWrapped: true });
    const bar = await getBar();

    expect(await getOffsetWidth(bar)).toBe(0);
  });

  it('should set correct bar width for activeTabIndex=0', async () => {
    await initTabsBar({ isWrapped: true, activeTabIndex: 1 });
    const [firstButton] = await getAllButtons();
    const bar = await getBar();

    await firstButton.click();

    expect(await getOffsetWidth(bar)).toBe(await getOffsetWidth(firstButton));
  });

  it('should set correct bar width for activeTabIndex=last', async () => {
    await initTabsBar({ isWrapped: true, activeTabIndex: 1 });
    const [lastButton] = (await getAllButtons()).slice(-1);
    const bar = await getBar();

    await lastButton.click();

    expect(await getOffsetWidth(bar)).toBe(await getOffsetWidth(lastButton));
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
    const gradientNext = await selectNode(page, 'p-tabs >>> p-tabs-bar >>> p-scroller >>> .action-next');
    const gradientWidth = await getOffsetWidth(gradientNext);
    const scrollArea = await selectNode(page, 'p-tabs >>> p-tabs-bar >>> p-scroller >>> .scroll-area');
    const scrollAreaWidth = await getOffsetWidth(scrollArea);

    expect(await getScrollLeft(scrollArea)).toEqual(0);

    const pressKey = async (key: KeyInput) => {
      await page.keyboard.press(key);
      await waitForAnimation();
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

  it('should focus correct element on arrow and tab key press', async () => {
    await initTabsBar({
      amount: 3,
      otherMarkup: '<button id="focusableElement" type="button">Button</button>',
      activeTabIndex: 0,
    });
    expect(await getActiveElementId(page)).toBe('');

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('Tab');

    expect(await isElementAtIndexFocused(page, 0)).toBeFalsy();
    expect(await getActiveElementId(page)).toBe('focusableElement');
  });
});

describe('events', () => {
  it('should trigger event on button click', async () => {
    await initTabsBar({ amount: 3, activeTabIndex: 1 });
    const host = await getHost();
    const [firstButton, secondButton, thirdButton] = await getAllButtons();
    await addEventListener(host, 'tabChange');

    // Remove and re-attach component to check if events are duplicated / fire at all
    await reattachElementHandle(host);

    await firstButton.click();
    expect((await getEventSummary(host, 'tabChange')).counter).toBe(1);

    await secondButton.click();
    expect((await getEventSummary(host, 'tabChange')).counter).toBe(2);

    await thirdButton.click();
    expect((await getEventSummary(host, 'tabChange')).counter).toBe(3);
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

  it('should emit both tabChange and update event', async () => {
    await initTabsBar();
    const host = await getHost();

    await addEventListener(host, 'tabChange');
    await addEventListener(host, 'update');
    expect((await getEventSummary(host, 'tabChange')).counter).toBe(0);
    expect((await getEventSummary(host, 'update')).counter).toBe(0);

    const [, secondButton] = await getAllButtons();
    await secondButton.click();
    expect((await getEventSummary(host, 'tabChange')).counter).toBe(1);
    expect((await getEventSummary(host, 'update')).counter).toBe(1);
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

describe('lifecycle', () => {
  it('should work without unnecessary round trips on init without activeTabIndex', async () => {
    await initTabsBar({ amount: 3, tag: 'a' });
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-tabs-bar'], 'componentDidLoad: p-tabs-bar').toBe(1);
    expect(status.componentDidLoad['p-scroller'], 'componentDidLoad: p-scroller').toBe(1);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(2);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(4);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  it('should work without unnecessary round trips on init with activeTabIndex', async () => {
    await initTabsBar({ amount: 3, tag: 'a', activeTabIndex: 1 });
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-tabs-bar'], 'componentDidLoad: p-tabs-bar').toBe(1);
    expect(status.componentDidLoad['p-scroller'], 'componentDidLoad: p-scroller').toBe(1);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(2);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(4);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  it('should work without unnecessary round trips on prop change', async () => {
    await initTabsBar({ amount: 3, tag: 'button' });
    const host = await getHost();

    await setProperty(host, 'activeTabIndex', 2);
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-tabs-bar'], 'componentDidUpdate: p-tabs-bar').toBe(1);
    expect(status.componentDidUpdate['p-scroller'], 'componentDidUpdate: p-scroller').toBe(0);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(4);
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
    await initTabsBar({ amount: 3, activeTabIndex: 0 });

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
