import { expect, test, type Page, Locator } from '@playwright/test';
import {
  addEventListener,
  CSS_ANIMATION_DURATION,
  FOCUS_PADDING,
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
  reattachElement,
  SCROLL_PERCENTAGE,
  setContentWithDesignSystem,
  setProperty,
  skipInBrowsers,
  sleep,
  waitForStencilLifecycle,
} from '../helpers';
import type { BreakpointCustomizable } from '@porsche-design-system/components';

type InitOptions = {
  amount?: number;
  activeTabIndex?: number;
  size?: BreakpointCustomizable<TabSize>;
  isWrapped?: boolean;
  otherMarkup?: string;
  tag?: 'a' | 'button';
};

const initTabsBar = (page: Page, opts?: InitOptions) => {
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

const getHost = (page: Page) => page.locator('p-tabs-bar');
const getAllButtons = (page: Page) => page.locator('button[role="tab"]').all();
const getScrollArea = (page: Page) => page.locator('p-tabs-bar p-scroller .scroll-area');
const getBar = (page: Page) => page.locator('p-tabs-bar .bar');
const getGradientNext = (page: Page) => page.locator('p-tabs-bar p-scroller .action-next');

const getPrevNextButton = async (page: Page) => {
  const prevButton = page.locator('p-tabs-bar p-scroller .action-prev button');
  const nextButton = page.locator('p-tabs-bar p-scroller .action-next button');
  return { prevButton, nextButton };
};

const getScrollDistance = (page: Page, scrollAreaWidth: number): number =>
  Math.round(scrollAreaWidth * SCROLL_PERCENTAGE);
const getBarVisibility = async (page: Page): Promise<string> => getElementStyle(getBar(page), 'visibility');
const getBarWidth = async (page: Page): Promise<string> => getElementStyle(getBar(page), 'width');

const clickElement = async (page: Page, el: Locator) => {
  await el.click();
  await waitForStencilLifecycle(page);
  await waitForAnimation();
};

const waitForAnimation = () => sleep(CSS_ANIMATION_DURATION);

test('should work with nested or translated markup', async ({ page }) => {
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

  const host = getHost(page);
  const [innerTab1, innerTab2, innerTab3] = await page.locator('button > font > font').all();

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

test('correct position of tabindex and aria-selected attributes if changed programmatically', async ({ page }) => {
  await initTabsBar(page, { amount: 3, activeTabIndex: 0 });
  const host = await getHost(page);
  const [firstButton, secondButton, thirdButton] = await getAllButtons(page);
  expect(await getAttribute(firstButton, 'tabindex')).toBe('0');
  expect(await getAttribute(firstButton, 'aria-selected')).toBe('true');
  expect(await getAttribute(secondButton, 'tabindex')).toBe('-1');
  expect(await getAttribute(secondButton, 'aria-selected')).toBe('false');
  expect(await getAttribute(thirdButton, 'tabindex')).toBe('-1');
  expect(await getAttribute(thirdButton, 'aria-selected')).toBe('false');

  // change active-tab-index prop
  await setProperty(host, 'activeTabIndex', 2);

  await waitForStencilLifecycle(page);

  expect(await getAttribute(firstButton, 'tabindex')).toBe('-1');
  expect(await getAttribute(firstButton, 'aria-selected')).toBe('false');
  expect(await getAttribute(secondButton, 'tabindex')).toBe('-1');
  expect(await getAttribute(secondButton, 'aria-selected')).toBe('false');
  expect(await getAttribute(thirdButton, 'tabindex')).toBe('0');
  expect(await getAttribute(thirdButton, 'aria-selected')).toBe('true');
});

test.describe('slotted content changes', () => {
  // TODO: Different values in pipeline than locally
  skipInBrowsers(['webkit', 'firefox'], () => {
    test('should adjust bar style when new tab element is added and clicked', async ({ page }) => {
      await initTabsBar(page, { amount: 1, activeTabIndex: 0 });
      const bar = getBar(page);

      // add a new button
      await page.evaluate(() => {
        const tabsBar = document.querySelector('p-tabs-bar');
        const tab = document.createElement('button');
        tab.innerText = 'Added Tab Text';
        tabsBar.append(tab);
      });
      await waitForStencilLifecycle(page);

      expect(Math.floor((await getElementPositions(page, bar)).left), 'initial position').toEqual(0);

      const buttons = await getAllButtons(page);
      const [, secondButton] = buttons;
      await clickElement(page, secondButton);

      expect(buttons.length).toBe(2);
      expect(Math.floor((await getElementPositions(page, bar)).left), 'final position').toEqual(103);
    });
  });

  test('should reset tabindex and bar styles when active tab on last position is removed', async ({ page }) => {
    await initTabsBar(page, { amount: 3, activeTabIndex: 2 });
    const bar = getBar(page);
    const [firstButton] = await getAllButtons(page);

    await page.evaluate(() => {
      const tabsBar = document.querySelector('p-tabs-bar');
      tabsBar.removeChild(tabsBar.children[2]);
    });
    await waitForStencilLifecycle(page);

    const buttons = await getAllButtons(page);

    expect(buttons.length).toBe(2);
    expect(await getBarWidth(page)).toBe('0px');
    expect(await getAttribute(firstButton, 'tabindex')).toBe('0');
    expect(await getAttribute(firstButton, 'aria-selected')).toBe('false');
    expect(Math.floor((await getElementPositions(page, bar)).left)).toEqual(0);
  });

  test('should reset tabindex when last tab is active and a tab is removed in the middle', async ({ page }) => {
    await initTabsBar(page, { amount: 3, activeTabIndex: 2 });

    await page.evaluate(() => {
      const tabsBar = document.querySelector('p-tabs-bar');
      tabsBar.removeChild(tabsBar.children[1]);
    });
    await waitForStencilLifecycle(page);

    const buttons = await getAllButtons(page);
    const [firstButton, secondButton] = buttons;

    expect(buttons.length).toBe(2);
    expect(await getAttribute(firstButton, 'tabindex')).toBe('0');
    expect(await getAttribute(firstButton, 'aria-selected')).toBe('false');
    expect(await getAttribute(secondButton, 'tabindex')).toBe('-1');
    expect(await getAttribute(secondButton, 'aria-selected')).toBe('false');
  });

  test('should set tabindex and aria-selected on next tab when active tab in the middle is removed', async ({
    page,
  }) => {
    await initTabsBar(page, { amount: 3, activeTabIndex: 1 });

    await page.evaluate(() => {
      const tabsBar = document.querySelector('p-tabs-bar');
      tabsBar.removeChild(tabsBar.children[1]);
    });
    await waitForStencilLifecycle(page);

    const buttons = await getAllButtons(page);
    const [, secondButton] = buttons;

    expect(buttons.length).toBe(2);
    expect(await getAttribute(secondButton, 'tabindex')).toBe('0');
    expect(await getAttribute(secondButton, 'aria-selected')).toBe('true');
  });
});

// TODO: should probably verify that the correct values are set for `p-scroller.scrollToPosition`
test.describe('active index position', () => {
  test('should scroll to correct position initially', async ({ page }) => {
    await initTabsBar(page, { activeTabIndex: 3, isWrapped: true });
    const allButtons = await getAllButtons(page);
    const selectedButtonOffset = await getOffsetLeft(allButtons[3]);
    const gradientWidth = await getOffsetWidth(getGradientNext(page));
    const scrollArea = getScrollArea(page);
    const scrollDistance = +selectedButtonOffset - +gradientWidth + FOCUS_PADDING;

    await waitForStencilLifecycle(page);

    expect(await getScrollLeft(scrollArea)).toEqual(scrollDistance);
  });

  test('should scroll to correct position on tab click', async ({ page }) => {
    await initTabsBar(page, { isWrapped: true, activeTabIndex: 0 });
    const [, , , button4, button5] = await getAllButtons(page);
    const gradient = getGradientNext(page);
    const gradientWidth = await getOffsetWidth(gradient);
    const scrollArea = getScrollArea(page);
    const scrollAreaWidth = await getOffsetWidth(scrollArea);

    expect(await getScrollLeft(scrollArea)).toEqual(0);

    await clickElement(page, button5);
    const button5offset = await getOffsetLeft(button5);
    const scrollDistanceRight = +button5offset - +gradientWidth + FOCUS_PADDING;
    expect(await getScrollLeft(scrollArea)).toEqual(scrollDistanceRight);

    await clickElement(page, button4);
    const button4offset = await getOffsetLeft(button4);
    const buttonWidth = await getOffsetWidth(button4);
    const scrollDistanceLeft = +button4offset + +buttonWidth + +gradientWidth - +scrollAreaWidth;
    expect(await getScrollLeft(scrollArea)).toEqual(scrollDistanceLeft);
  });

  skipInBrowsers(['firefox', 'webkit'], () => {
    // TODO: Different value in pipeline than locally
    test('should have correct scroll position after tab click and prev button click', async ({ page }) => {
      await initTabsBar(page, { amount: 8, isWrapped: true, activeTabIndex: 0 });
      const { prevButton } = await getPrevNextButton(page);
      const allButtons = await getAllButtons(page);
      const button3 = allButtons[2];
      const scrollArea = getScrollArea(page);
      const scrollAreaWidth = await getOffsetWidth(scrollArea);
      const scrollDistance = getScrollDistance(page, +scrollAreaWidth);

      const gradient = getGradientNext(page);
      const gradientWidth = await getOffsetWidth(gradient);

      await clickElement(page, button3);
      const button3offset = await getOffsetLeft(button3);
      const scrollDistanceLeft = +button3offset - +gradientWidth + FOCUS_PADDING;

      expect(await getScrollLeft(scrollArea), 'scroll left active button after click').toBe(scrollDistanceLeft);

      await clickElement(page, prevButton);
      expect(await getScrollLeft(scrollArea), 'scroll left active button after first prev click').toBe(
        scrollDistanceLeft - scrollDistance
      );

      await clickElement(page, prevButton);
      expect(await getScrollLeft(scrollArea), 'scroll left active button after second prev click').toBe(42);
    });
  });

  // TODO: Different value in pipeline than locally
  skipInBrowsers(['firefox', 'webkit'], () => {
    test('should have correct scroll position after tab click and next button click', async ({ page }) => {
      await initTabsBar(page, { amount: 8, isWrapped: true, activeTabIndex: 7 });
      const { nextButton } = await getPrevNextButton(page);
      const allButtons = await getAllButtons(page);
      const button7 = allButtons[6];

      const scrollArea = getScrollArea(page);
      const scrollAreaWidth: number = await getOffsetWidth(scrollArea);

      const gradient = getGradientNext(page);
      const gradientWidth = await getOffsetWidth(gradient);

      await clickElement(page, button7);
      const button7offset = await getOffsetLeft(button7);
      const buttonWidth = await getOffsetWidth(button7);
      const scrollDistanceRight = +button7offset + +buttonWidth + +gradientWidth - +scrollAreaWidth;

      expect(await getScrollLeft(scrollArea), 'scroll left active button after click').toBe(scrollDistanceRight);

      await clickElement(page, nextButton);
      expect(await getScrollLeft(scrollArea), 'scroll left active button after prev click').toBe(507);
    });
  });
});

test.describe('bar', () => {
  test('should have a hidden bar for activeTabIndex=0', async ({ page }) => {
    await initTabsBar(page, { amount: 3, activeTabIndex: 0 });
    expect(await getBarVisibility(page)).toBe('hidden');
  });

  test('should have a hidden bar for activeTabIndex=1', async ({ page }) => {
    await initTabsBar(page, { amount: 3, activeTabIndex: 1 });
    expect(await getBarVisibility(page)).toBe('hidden');
  });

  test('should have same offsetLeft on bar and active tab', async ({ page }) => {
    await initTabsBar(page, { amount: 6, activeTabIndex: 0, isWrapped: true });
    const [firstButton, , thirdButton] = await getAllButtons(page);
    const bar = getBar(page);

    await clickElement(page, thirdButton);
    const thirdButtonPosition = await getElementPositions(page, thirdButton);
    expect(Math.round(thirdButtonPosition.left)).toEqual(Math.floor((await getElementPositions(page, bar)).left));

    await clickElement(page, firstButton);
    const firstButtonPosition = await getElementPositions(page, firstButton);
    expect(firstButtonPosition.left, 'correct offsetLeft after click').toEqual(
      Math.floor((await getElementPositions(page, bar)).left)
    );
  });

  test('should have same offsetLeft on bar and active tab when size is responsive', async ({ page }) => {
    await page.setViewportSize({
      width: 760,
      height: 600,
    });

    await initTabsBar(page, {
      amount: 6,
      activeTabIndex: 0,
      isWrapped: true,
      size: "{ base: 'small', xs: 'medium', s: 'small', m: 'medium', l: 'small', xl: 'medium' }",
    });
    const [firstButton, , thirdButton] = await getAllButtons(page);
    const bar = getBar(page);

    await clickElement(page, thirdButton);
    const thirdButtonPosition = await getElementPositions(page, thirdButton);
    expect(Math.round(thirdButtonPosition.left)).toEqual(Math.floor((await getElementPositions(page, bar)).left));

    await page.setViewportSize({
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

test.describe('when not wrapped', () => {
  test('should set correct bar width when no activeTabIndex is set initially', async ({ page }) => {
    await initTabsBar(page, { amount: 3 });
    const bar = getBar(page);

    expect(await getOffsetWidth(bar)).toBe(0);
  });

  test('should set correct bar width for activeTabIndex=0', async ({ page }) => {
    await initTabsBar(page, { amount: 3, activeTabIndex: 1 });
    const [firstButton] = await getAllButtons(page);
    const bar = getBar(page);

    await firstButton.click();

    expect(await getOffsetWidth(bar)).toBe(await getOffsetWidth(firstButton));
  });

  test('should set correct bar width for activeTabIndex=last', async ({ page }) => {
    await initTabsBar(page, { amount: 3, activeTabIndex: 1 });
    const [lastButton] = (await getAllButtons(page)).slice(-1);
    const bar = getBar(page);

    await lastButton.click();

    expect(await getOffsetWidth(bar)).toBe(await getOffsetWidth(lastButton));
  });
});

test.describe('when wrapped', () => {
  test('should set correct bar width when no activeTabIndex is set initially', async ({ page }) => {
    await initTabsBar(page, { isWrapped: true });
    const bar = getBar(page);

    expect(await getOffsetWidth(bar)).toBe(0);
  });

  test('should set correct bar width for activeTabIndex=0', async ({ page }) => {
    await initTabsBar(page, { isWrapped: true, activeTabIndex: 1 });
    const [firstButton] = await getAllButtons(page);
    const bar = getBar(page);

    await firstButton.click();

    expect(await getOffsetWidth(bar)).toBe(await getOffsetWidth(firstButton));
  });

  test('should set correct bar width for activeTabIndex=last', async ({ page }) => {
    await initTabsBar(page, { isWrapped: true, activeTabIndex: 1 });
    const [lastButton] = (await getAllButtons(page)).slice(-1);
    const bar = getBar(page);

    await lastButton.click();

    expect(await getOffsetWidth(bar)).toBe(await getOffsetWidth(lastButton));
  });
});

test.describe('events', () => {
  test('should trigger update event on button click', async ({ page }) => {
    await initTabsBar(page, { amount: 3, activeTabIndex: 1 });
    const host = getHost(page);
    const [firstButton, secondButton, thirdButton] = await getAllButtons(page);
    await addEventListener(host, 'update');

    // Remove and re-attach component to check if events are duplicated / fire at all
    await reattachElement(host);

    await firstButton.click();
    expect((await getEventSummary(host, 'update')).counter).toBe(1);

    await secondButton.click();
    expect((await getEventSummary(host, 'update')).counter).toBe(2);

    await thirdButton.click();
    expect((await getEventSummary(host, 'update')).counter).toBe(3);
  });

  test('should not dispatch update event initially with valid activeTabIndex', async ({ page }) => {
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
      el.addEventListener('update', () => window[COUNTER_KEY]++);

      document.body.appendChild(el);
    }, COUNTER_KEY);

    await waitForStencilLifecycle(page);

    // retrieve counted events from browser
    const getCountedEvents = (): Promise<number> =>
      page.evaluate((COUNTER_KEY: string) => window[COUNTER_KEY], COUNTER_KEY);

    expect(await getCountedEvents()).toBe(0);

    const [, secondButton] = await getAllButtons(page);
    await secondButton.click();
    await waitForStencilLifecycle(page);

    expect(await getCountedEvents()).toBe(1);
  });
});

test.describe('errors', () => {
  test('should not cause TypeError within scrollActiveTabIntoView', async ({ page }) => {
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

  test('should not crash without children', async ({ page }) => {
    initConsoleObserver(page);

    await setContentWithDesignSystem(page, `<p-tabs-bar active-tab-index="0"></p-tabs-bar>`);
    expect(getConsoleErrorsAmount()).toBe(0);

    await page.evaluate(() => console.error('test error'));
    expect(getConsoleErrorsAmount()).toBe(1);
  });
});

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init without activeTabIndex', async ({ page }) => {
    await initTabsBar(page, { amount: 3, tag: 'a' });
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-tabs-bar'], 'componentDidLoad: p-tabs-bar').toBe(1);
    expect(status.componentDidLoad['p-scroller'], 'componentDidLoad: p-scroller').toBe(1);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(2);
    expect(status.componentDidLoad['p-button'], 'componentDidLoad: p-button').toBe(2);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(6);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  test('should work without unnecessary round trips on init with activeTabIndex', async ({ page }) => {
    await initTabsBar(page, { amount: 3, tag: 'a', activeTabIndex: 1 });
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-tabs-bar'], 'componentDidLoad: p-tabs-bar').toBe(1);
    expect(status.componentDidLoad['p-scroller'], 'componentDidLoad: p-scroller').toBe(1);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(2);
    expect(status.componentDidLoad['p-button'], 'componentDidLoad: p-button').toBe(2);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(6);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  test('should work without unnecessary round trips on prop change', async ({ page }) => {
    await initTabsBar(page, { amount: 3, tag: 'button' });
    const host = getHost(page);

    await setProperty(host, 'activeTabIndex', 2);
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-tabs-bar'], 'componentDidUpdate: p-tabs-bar').toBe(1);
    expect(status.componentDidUpdate['p-scroller'], 'componentDidUpdate: p-scroller').toBe(0);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(6);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });
});
