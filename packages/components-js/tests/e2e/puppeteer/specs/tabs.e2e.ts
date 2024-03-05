import {
  CSS_ANIMATION_DURATION,
  expectA11yToMatchSnapshot,
  getAttribute,
  isElementAtIndexFocused,
  removeAttribute,
  selectNode,
  setContentWithDesignSystem,
  waitForStencilLifecycle,
} from '../helpers';
import type { ElementHandle, Page } from 'puppeteer';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const initTabs = (opts?: { amount?: number; activeTabIndex?: number }) => {
  const { amount = 3, activeTabIndex } = opts || {};

  const content = `<p-tabs ${activeTabIndex ? `active-tab-index="${activeTabIndex}"` : ''}>
  ${Array.from(Array(amount))
    .map((_, i) => `<p-tabs-item label="Tab ${i + 1}">Content ${i + 1}</p-tabs-item>`)
    .join('')}
</p-tabs>`;

  return setContentWithDesignSystem(page, content);
};

const getHost = () => selectNode(page, 'p-tabs');
const getAllTabsItems = () => page.$$('p-tabs-item');
const getTabsBar = () => selectNode(page, 'p-tabs >>> p-tabs-bar');
const getHiddenAttribute = (element: ElementHandle) => getAttribute(element, 'hidden');
const isHidden = async (element: ElementHandle): Promise<boolean> => (await getHiddenAttribute(element)) === '';

describe('keyboard', () => {
  it('should display correct tabs-item on keyboard arrow press', async () => {
    await initTabs();
    const [firstTabsItem, secondTabsItem] = await getAllTabsItems();

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

  it('should render correct focusedTab on arrow-key press', async () => {
    await initTabs({ activeTabIndex: 2 });
    const host = await getHost();
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

describe('accessibility', () => {
  it('should expose correct initial accessibility tree of tabpanel', async () => {
    await initTabs();
    const tabpanel = () => selectNode(page, 'p-tabs > [role="tabpanel"]');

    await expectA11yToMatchSnapshot(page, await tabpanel(), { interestingOnly: false });
  });
});
