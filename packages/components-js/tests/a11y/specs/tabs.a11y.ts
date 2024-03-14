import { type ElementHandle, type Page, test, expect } from '@playwright/test';
import {
  CSS_ANIMATION_DURATION,
  getAttribute,
  isElementAtIndexFocused,
  removeAttribute,
  setContentWithDesignSystem,
  waitForStencilLifecycle,
} from '../helpers';

const initTabs = (page: Page, opts?: { amount?: number; activeTabIndex?: number }) => {
  const { amount = 3, activeTabIndex } = opts || {};

  const content = `<p-tabs ${activeTabIndex ? `active-tab-index="${activeTabIndex}"` : ''}>
  ${Array.from(Array(amount))
    .map((_, i) => `<p-tabs-item label="Tab ${i + 1}">Content ${i + 1}</p-tabs-item>`)
    .join('')}
</p-tabs>`;

  return setContentWithDesignSystem(page, content);
};

const getHost = (page: Page) => page.$('p-tabs');
const getAllTabsItems = (page: Page) => page.$$('p-tabs-item');
const getTabsBar = (page: Page) => page.$('p-tabs p-tabs-bar');
const getHiddenAttribute = (element: ElementHandle<SVGElement | HTMLElement>) => getAttribute(element, 'hidden');
const isHidden = async (element: ElementHandle<SVGElement | HTMLElement>): Promise<boolean> =>
  (await getHiddenAttribute(element)) === '';

test.describe('keyboard', () => {
  test('should display correct tabs-item on keyboard arrow press', async ({ page }) => {
    await initTabs(page);
    const [firstTabsItem, secondTabsItem] = await getAllTabsItems(page);

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowRight');
    await waitForStencilLifecycle(page);

    expect(await isHidden(firstTabsItem)).toBe(true);
    expect(await isHidden(secondTabsItem)).toBe(false);

    await page.keyboard.press('ArrowLeft');
    await waitForStencilLifecycle(page);

    expect(await isHidden(firstTabsItem)).toBe(false);
    expect(await isHidden(secondTabsItem)).toBe(true);
  });

  test('should render correct focusedTab on arrow-key press', async ({ page }) => {
    await initTabs(page, { activeTabIndex: 2 });
    const host = await getHost(page);
    await removeAttribute(host, 'active-tab-index');
    await waitForStencilLifecycle(page);
    await new Promise((resolve) => setTimeout(resolve, CSS_ANIMATION_DURATION));

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
});

test.fixme('should expose correct initial accessibility tree of tabpanel', async ({ page }) => {
  await initTabs(page);
  const tabpanel = (page: Page) => page.$('p-tabs > [role="tabpanel"]');

  // await expectA11yToMatchSnapshot(page, await tabpanel(), { interestingOnly: false });
});
