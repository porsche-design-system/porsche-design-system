import { type ElementHandle, type Page, test, expect } from '@playwright/test';
import {
  CSS_ANIMATION_DURATION,
  FOCUS_PADDING,
  getActiveElementId,
  getOffsetLeft,
  getOffsetWidth,
  getScrollLeft,
  isElementAtIndexFocused,
  removeAttribute,
  setContentWithDesignSystem,
  waitForStencilLifecycle,
} from '../../helpers';
import type { BreakpointCustomizable, TabSize } from '@porsche-design-system/components/dist/types/bundle';

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

const getHost = (page: Page) => page.$('p-tabs-bar');
const getScrollArea = (page: Page) => page.$('p-tabs-bar p-scroller .scroll-area');

const clickElement = async (page: Page, el: ElementHandle): Promise<void> => {
  await el.click();
  await waitForStencilLifecycle(page);
  await waitForAnimation();
};

const waitForAnimation = () => new Promise((resolve) => setTimeout(resolve, CSS_ANIMATION_DURATION));

test.describe('keyboard', () => {
  test('should render focus on first tab when no tab is selected on keyboard "tab" press', async ({ page }) => {
    await initTabsBar(page, { amount: 3 });
    const hasButtonFocus = async (page: Page): Promise<boolean> => {
      const snapshot = await page.accessibility.snapshot();
      const button = snapshot.children[0];
      return button.focused;
    };
    expect(await hasButtonFocus(page)).toBeUndefined();

    await page.keyboard.press('Tab');

    expect(await hasButtonFocus(page)).toBe(true);
  });

  test('should render focus on selected tab on keyboard "tab" press', async ({ page }) => {
    await initTabsBar(page, { amount: 3, activeTabIndex: 0 });
    const hasButtonFocus = async (page: Page): Promise<boolean> => {
      const snapshot = await page.accessibility.snapshot();
      const button = snapshot.children[0];
      return button.focused;
    };
    expect(await hasButtonFocus(page)).toBeUndefined();

    await page.keyboard.press('Tab');

    expect(await hasButtonFocus(page)).toBe(true);
  });

  test('should render focus on content on keyboard "tab" press', async ({ page }) => {
    await initTabsBar(page, {
      amount: 3,
      otherMarkup: '<p-text>Hallo <a href="#">Link</a></p-text>',
      activeTabIndex: 0,
    });
    expect(await isElementAtIndexFocused(page, 4)).toBeFalsy();

    await page.keyboard.press('Tab');
    expect(await isElementAtIndexFocused(page, 4)).toBeFalsy();
    await page.keyboard.press('Tab');

    expect(await isElementAtIndexFocused(page, 4)).toBe(true);
  });

  test('should render correct focusedTab on arrow-key press', async ({ page }) => {
    await initTabsBar(page, { amount: 3, activeTabIndex: 0 });
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

  test('should render correct active tab on first/last or home/end press', async ({ page }) => {
    await initTabsBar(page, { amount: 3, activeTabIndex: 1 });
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

  test('should have correct scroll-position on keyboard arrow press when wrapped by p-tabs', async ({ page }) => {
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
    const allButtons = await page.$$('p-tabs p-tabs-bar button');
    const gradientNext = await page.$('p-tabs p-tabs-bar p-scroller .action-next');
    const gradientWidth = await getOffsetWidth(gradientNext);
    const scrollArea = await page.$('p-tabs p-tabs-bar p-scroller .scroll-area');
    const scrollAreaWidth = await getOffsetWidth(scrollArea);

    expect(await getScrollLeft(scrollArea)).toEqual(0);

    const pressKey = async (key: string): Promise<void> => {
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

  test('should focus correct element on arrow and tab key press', async ({ page }) => {
    await initTabsBar(page, {
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

const getTabList = (page: Page) => page.$('p-tabs-bar [role="tablist"]');
test.fixme('should expose correct initial accessibility tree of tablist', async ({ page }) => {
  await initTabsBar(page, { amount: 3 });

  // await expectA11yToMatchSnapshot(page, await getTabList(), { interestingOnly: false });
});

test.fixme('should render correct accessibility tree if activeTabIndex is set ', async ({ page }) => {
  await initTabsBar(page, { amount: 3, activeTabIndex: 1 });

  // await expectA11yToMatchSnapshot(page, await getTabList(), { interestingOnly: false });
});

test.fixme('should render correct accessibility tree if activeTabIndex is removed ', async ({ page }) => {
  await initTabsBar(page, { amount: 3, activeTabIndex: 1 });
  const host = await getHost(page);

  await removeAttribute(host, 'active-tab-index');
  await waitForStencilLifecycle(page);

  // await expectA11yToMatchSnapshot(page, await getTabList(), { interestingOnly: false });
});

test.fixme('should render correct accessibility tree on scrollArea click', async ({ page }) => {
  await initTabsBar(page, { amount: 4, activeTabIndex: 3 });
  const scrollArea = await getScrollArea(page);

  // await expectA11yToMatchSnapshot(page, await getTabList(), {
  //   message: 'Before click',
  //   interestingOnly: false,
  // });

  await clickElement(page, scrollArea);

  // await expectA11yToMatchSnapshot(page, await getTabList(), {
  //   message: 'After click',
  //   interestingOnly: false,
  // });
});

test.fixme('should render correct accessibility tree on focus change and enter press', async ({ page }) => {
  await initTabsBar(page, { amount: 3, activeTabIndex: 0 });

  // await expectA11yToMatchSnapshot(page, await getTabList(), {
  //   message: 'Before change',
  //   interestingOnly: false,
  // });

  await page.keyboard.press('Tab');
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('Enter');
  await waitForStencilLifecycle(page);

  // await expectA11yToMatchSnapshot(page, await getTabList(), {
  //   message: 'After change',
  //   interestingOnly: false,
  // });
});
