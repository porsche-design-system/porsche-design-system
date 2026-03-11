import { expect, Locator, type Page, test } from '@playwright/test';
import type { BreakpointCustomizable } from '@porsche-design-system/components';
import {
  addEventListener,
  CSS_ANIMATION_DURATION,
  getAttribute,
  getConsoleErrorsAmount,
  getElementPositions,
  getElementStyle,
  getEventSummary,
  getLifecycleStatus,
  getOffsetWidth,
  getProperty,
  getScrollLeft,
  initConsoleObserver,
  reattachElement,
  setContentWithDesignSystem,
  setProperty,
  skipInBrowsers,
  sleep,
  waitForStencilLifecycle,
} from '../helpers';

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
const getButton = (page: Page, index: number) => page.locator('button[role="tab"]').nth(index);
const getAllButtons = (page: Page) => page.locator('button[role="tab"]').all();
const getScrollArea = (page: Page) => page.locator('p-tabs-bar p-scroller .scroll');
const getBar = (page: Page) => page.locator('p-tabs-bar .bar');
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
  test('should set tabindex="0" on first tab when active tab on last position is removed', async ({ page }) => {
    await initTabsBar(page, { amount: 3, activeTabIndex: 2 });

    await page.evaluate(() => {
      const tabsBar = document.querySelector('p-tabs-bar');
      tabsBar.removeChild(tabsBar.children[2]);
    });
    await waitForStencilLifecycle(page);

    const buttons = await getAllButtons(page);
    const [firstButton, secondButton] = buttons;

    // activeTabIndex=2 is now out of range, so no tab is active
    expect(buttons.length).toBe(2);
    expect(await getBarWidth(page)).toBe('0px');
    expect(await getAttribute(firstButton, 'tabindex')).toBe('0');
    expect(await getAttribute(firstButton, 'aria-selected')).toBe('false');
    expect(await getAttribute(secondButton, 'tabindex')).toBe('-1');
    expect(await getAttribute(secondButton, 'aria-selected')).toBe('false');
  });

  test('should set tabindex="0" on first tab when active tab becomes out of range after middle tab removal', async ({
    page,
  }) => {
    await initTabsBar(page, { amount: 3, activeTabIndex: 2 });

    await page.evaluate(() => {
      const tabsBar = document.querySelector('p-tabs-bar');
      tabsBar.removeChild(tabsBar.children[1]);
    });
    await waitForStencilLifecycle(page);

    const buttons = await getAllButtons(page);
    const [firstButton, secondButton] = buttons;

    // activeTabIndex=2 is now out of range, so no tab is active
    expect(buttons.length).toBe(2);
    expect(await getAttribute(firstButton, 'tabindex')).toBe('0');
    expect(await getAttribute(firstButton, 'aria-selected')).toBe('false');
    expect(await getAttribute(secondButton, 'tabindex')).toBe('-1');
    expect(await getAttribute(secondButton, 'aria-selected')).toBe('false');
  });

  test('should activate the tab that shifts into the active index when active tab in the middle is removed', async ({
    page,
  }) => {
    await initTabsBar(page, { amount: 3, activeTabIndex: 1 });

    await page.evaluate(() => {
      const tabsBar = document.querySelector('p-tabs-bar');
      tabsBar.removeChild(tabsBar.children[1]);
    });
    await waitForStencilLifecycle(page);

    const buttons = await getAllButtons(page);
    const [firstButton, secondButton] = buttons;

    // activeTabIndex=1 still valid, the tab that shifted into index 1 inherits the active state
    expect(buttons.length).toBe(2);
    expect(await getAttribute(firstButton, 'tabindex')).toBe('-1');
    expect(await getAttribute(firstButton, 'aria-selected')).toBe('false');
    expect(await getAttribute(secondButton, 'tabindex')).toBe('0');
    expect(await getAttribute(secondButton, 'aria-selected')).toBe('true');
  });

  test('should keep active tab and set new tab as inactive when a tab is added', async ({ page }) => {
    await initTabsBar(page, { amount: 3, activeTabIndex: 1 });

    await page.evaluate(() => {
      const tabsBar = document.querySelector('p-tabs-bar');
      const tab = document.createElement('button');
      tab.innerText = 'New Tab';
      tabsBar.append(tab);
    });
    await waitForStencilLifecycle(page);

    const buttons = await getAllButtons(page);

    // activeTabIndex=1 is still valid, new tab at index 3 should be inactive
    expect(buttons.length).toBe(4);
    expect(await getAttribute(buttons[0], 'tabindex')).toBe('-1');
    expect(await getAttribute(buttons[0], 'aria-selected')).toBe('false');
    expect(await getAttribute(buttons[1], 'tabindex')).toBe('0');
    expect(await getAttribute(buttons[1], 'aria-selected')).toBe('true');
    expect(await getAttribute(buttons[2], 'tabindex')).toBe('-1');
    expect(await getAttribute(buttons[2], 'aria-selected')).toBe('false');
    expect(await getAttribute(buttons[3], 'tabindex')).toBe('-1');
    expect(await getAttribute(buttons[3], 'aria-selected')).toBe('false');
  });
});

const parseTranslateX = (transform: string): number => {
  const match = transform.match(/translate3d\(([^,]+)/);
  return parseFloat(match[1]);
};

const getKeyframeWidth = (keyframe: Keyframe): number => parseFloat(keyframe.width as string);
const getKeyframeTranslateX = (keyframe: Keyframe): number => parseTranslateX(keyframe.transform as string);

const getBarAnimationInfo = (page: Page, buttonIndices: number[]) =>
  page.evaluate((indices) => {
    const host = document.querySelector('p-tabs-bar');
    const bar = host.shadowRoot.querySelector('.bar');
    const scroller = host.shadowRoot.querySelector('p-scroller') as HTMLElement;
    const buttons = Array.from(host.querySelectorAll('button[role="tab"]'));
    const scrollerRect = scroller.getBoundingClientRect();

    // simplified replication of getTabMetrics() from tabs-bar-utils.ts
    const getStart = (button: Element) => button.getBoundingClientRect().left - scrollerRect.left;

    const [animation] = bar.getAnimations();
    const effect = animation.effect as KeyframeEffect;
    const animationInfo = {
      playState: animation.playState,
      keyframes: effect.getKeyframes(),
      duration: effect.getTiming().duration as number,
    };

    const buttonStarts: Record<number, number> = {};
    const buttonWidths: Record<number, number> = {};
    for (const i of indices) {
      buttonStarts[i] = getStart(buttons[i]);
      buttonWidths[i] = (buttons[i] as HTMLElement).offsetWidth;
    }

    return { animationInfo, buttonStarts, buttonWidths };
  }, buttonIndices);

const waitForBarAnimationFinished = (page: Page) =>
  page.evaluate(() => {
    const bar = document.querySelector('p-tabs-bar').shadowRoot.querySelector('.bar');
    return Promise.all(bar.getAnimations().map((a) => a.finished));
  });

test.describe('bar animation', () => {
  test('should animate bar between tabs on tab click', async ({ page }) => {
    await initTabsBar(page, { amount: 3, activeTabIndex: 0 });

    await getButton(page, 1).click();

    const { animationInfo, buttonStarts, buttonWidths } = await getBarAnimationInfo(page, [0, 1]);

    expect(animationInfo.playState).toBe('running');

    const { keyframes, duration } = animationInfo;
    expect(keyframes).toHaveLength(2);
    // start keyframe should match position and width of the first (source) tab
    expect(Math.round(getKeyframeWidth(keyframes[0]))).toBe(buttonWidths[0]);
    expect(Math.round(getKeyframeTranslateX(keyframes[0]))).toBe(Math.round(buttonStarts[0]));
    // end keyframe should match position and width of the second (target) tab
    expect(Math.round(getKeyframeWidth(keyframes[1]))).toBe(buttonWidths[1]);
    expect(Math.round(getKeyframeTranslateX(keyframes[1]))).toBe(Math.round(buttonStarts[1]));
    // duration = BAR_ANIMATION_DURATION(400) + BAR_ANIMATION_BUFFER(20)
    expect(duration).toBe(420);
  });

  test('should animate bar growing from center when activeTabIndex changes from undefined to 1', async ({ page }) => {
    await initTabsBar(page, { amount: 3 });
    const host = getHost(page);

    await setProperty(host, 'activeTabIndex', 1);
    await waitForStencilLifecycle(page);

    const { animationInfo, buttonStarts, buttonWidths } = await getBarAnimationInfo(page, [1]);

    const { keyframes, duration } = animationInfo;
    expect(keyframes).toHaveLength(2);
    // start keyframe: bar grows from center of the target tab (width=0, translateX=center)
    expect(getKeyframeWidth(keyframes[0])).toBe(0);
    const expectedCenter = buttonStarts[1] + buttonWidths[1] / 2;
    expect(Math.round(getKeyframeTranslateX(keyframes[0]))).toBe(Math.round(expectedCenter));
    // end keyframe: bar reaches full width and position of the target tab
    expect(Math.round(getKeyframeWidth(keyframes[1]))).toBe(buttonWidths[1]);
    expect(Math.round(getKeyframeTranslateX(keyframes[1]))).toBe(Math.round(buttonStarts[1]));
    expect(duration).toBe(420);
  });

  test('should animate bar shrinking to center when activeTabIndex changes from 1 to undefined', async ({ page }) => {
    await initTabsBar(page, { amount: 3, activeTabIndex: 1 });
    const host = getHost(page);

    await setProperty(host, 'activeTabIndex', undefined);
    await waitForStencilLifecycle(page);

    const { animationInfo, buttonStarts, buttonWidths } = await getBarAnimationInfo(page, [1]);

    const { keyframes, duration } = animationInfo;
    expect(keyframes).toHaveLength(2);
    // start keyframe: bar starts at full width and position of the old tab
    expect(Math.round(getKeyframeWidth(keyframes[0]))).toBe(buttonWidths[1]);
    expect(Math.round(getKeyframeTranslateX(keyframes[0]))).toBe(Math.round(buttonStarts[1]));
    // end keyframe: bar shrinks to center of the old tab (width=0, translateX=center)
    expect(getKeyframeWidth(keyframes[1])).toBe(0);
    const expectedCenter = buttonStarts[1] + buttonWidths[1] / 2;
    expect(Math.round(getKeyframeTranslateX(keyframes[1]))).toBe(Math.round(expectedCenter));
    expect(duration).toBe(420);
  });

  test('should have bar hidden with width 0px after animation has finished', async ({ page }) => {
    await initTabsBar(page, { amount: 3, activeTabIndex: 0 });
    const bar = getBar(page);

    await getButton(page, 1).click();
    await waitForBarAnimationFinished(page);

    // after animation finishes, bar reverts to its CSS-defined width: 0px (no fill: 'forwards')
    expect(await getBarWidth(page)).toBe('0px');
    await expect(bar).toBeHidden();
  });

  test('should animate bar from previous tab to newly added tab on click', async ({ page }) => {
    await initTabsBar(page, { amount: 3, activeTabIndex: 1 });

    // add a new button to the end
    await page.evaluate(() => {
      const tabsBar = document.querySelector('p-tabs-bar');
      const tab = document.createElement('button');
      tab.innerText = 'New Tab';
      tabsBar.append(tab);
    });
    await waitForStencilLifecycle(page);

    // click the newly added tab (index 3)
    await getButton(page, 3).click();

    // old tab is index 1, new tab is index 3
    const { animationInfo, buttonStarts, buttonWidths } = await getBarAnimationInfo(page, [1, 3]);

    expect(animationInfo.playState).toBe('running');

    const { keyframes, duration } = animationInfo;
    expect(keyframes).toHaveLength(2);
    // start keyframe should match position and width of the previous active tab (index 1)
    expect(Math.round(getKeyframeWidth(keyframes[0]))).toBe(buttonWidths[1]);
    expect(Math.round(getKeyframeTranslateX(keyframes[0]))).toBe(Math.round(buttonStarts[1]));
    // end keyframe should match position and width of the newly added tab (index 3)
    expect(Math.round(getKeyframeWidth(keyframes[1]))).toBe(buttonWidths[3]);
    expect(Math.round(getKeyframeTranslateX(keyframes[1]))).toBe(Math.round(buttonStarts[3]));
    expect(duration).toBe(420);
  });
});

const isTabInView = (page: Page, tabIndex: number) =>
  page.evaluate((index) => {
    const host = document.querySelector('p-tabs-bar');
    const scroller = host.shadowRoot.querySelector('p-scroller') as HTMLElement;
    const scrollArea = scroller.shadowRoot.querySelector('.scroll') as HTMLElement;
    const tab = host.querySelectorAll('button[role="tab"]')[index] as HTMLElement;

    const scrollRect = scrollArea.getBoundingClientRect();
    const tabRect = tab.getBoundingClientRect();

    return tabRect.left >= scrollRect.left && tabRect.right <= scrollRect.right;
  }, tabIndex);

test.describe('tab visibility', () => {
  test('should scroll active tab into view on initial render', async ({ page }) => {
    await initTabsBar(page, { amount: 8, activeTabIndex: 7, isWrapped: true });

    expect(await isTabInView(page, 7)).toBe(true);
  });

  test('should scroll active tab into view when activeTabIndex changes programmatically', async ({ page }) => {
    await initTabsBar(page, { amount: 8, activeTabIndex: 0, isWrapped: true });

    expect(await isTabInView(page, 7)).toBe(false);

    const host = getHost(page);
    await setProperty(host, 'activeTabIndex', 7);
    await waitForStencilLifecycle(page);
    await waitForAnimation();

    expect(await isTabInView(page, 7)).toBe(true);
  });

  test('should scroll active tab into view on tab click', async ({ page }) => {
    await initTabsBar(page, { amount: 8, activeTabIndex: 0, isWrapped: true });

    expect(await isTabInView(page, 7)).toBe(false);

    await getButton(page, 7).click();

    expect(await isTabInView(page, 7)).toBe(true);
  });

  test('should not change scroll position when activeTabIndex becomes undefined', async ({ page }) => {
    await initTabsBar(page, { amount: 8, activeTabIndex: 0, isWrapped: true });
    const scrollArea = getScrollArea(page);
    const scrollLeftBefore = await getScrollLeft(scrollArea);

    const host = getHost(page);
    await setProperty(host, 'activeTabIndex', undefined);
    await waitForStencilLifecycle(page);

    expect(await getScrollLeft(scrollArea)).toBe(scrollLeftBefore);
  });

  test('should keep active tab in view when slotted content changes', async ({ page }) => {
    await initTabsBar(page, { amount: 8, activeTabIndex: 7, isWrapped: true });

    expect(await isTabInView(page, 7)).toBe(true);

    // add multiple tabs after the active one, causing a re-evaluation of the scroll position
    await page.evaluate(() => {
      const tabsBar = document.querySelector('p-tabs-bar');
      for (let i = 0; i < 5; i++) {
        const tab = document.createElement('button');
        tab.innerText = `New Tab ${i + 1}`;
        tabsBar.append(tab);
      }
    });
    await waitForStencilLifecycle(page);
    await waitForAnimation();

    // activeTabIndex is still 7, onSlotChange should keep it scrolled into view
    expect(await isTabInView(page, 7)).toBe(true);
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

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(2);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  test('should work without unnecessary round trips on init with activeTabIndex', async ({ page }) => {
    await initTabsBar(page, { amount: 3, tag: 'a', activeTabIndex: 1 });
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-tabs-bar'], 'componentDidLoad: p-tabs-bar').toBe(1);
    expect(status.componentDidLoad['p-scroller'], 'componentDidLoad: p-scroller').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(2);
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

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(2);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });
});
