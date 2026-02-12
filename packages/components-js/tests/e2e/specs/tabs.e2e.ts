import { expect, type Locator, type Page, test } from '@playwright/test';
import {
  addEventListener,
  getAttribute,
  getConsoleErrorsAmount,
  getEventSummary,
  getLifecycleStatus,
  getProperty,
  initConsoleObserver,
  reattachElement,
  setContentWithDesignSystem,
  setProperty,
  sleep,
  waitForComponentsReady,
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

const getHost = (page: Page) => page.locator('p-tabs');
const getAllTabsItems = (page: Page) => page.locator('p-tabs-item').all();
const getTabsBar = (page: Page) => page.locator('p-tabs p-tabs-bar').first();
const getAllTabs = async (page: Page) => getTabsBar(page).locator('button[role="tab"]').all();
const getHiddenAttribute = (locator: Locator) => getAttribute(locator, 'hidden');
const isHidden = async (locator: Locator): Promise<boolean> => (await getHiddenAttribute(locator)) === '';

test('should render', async ({ page }) => {
  await initTabs(page);
  const allTabs = await getAllTabs(page);

  expect(allTabs.length).toBe(3);
});

test('should render correct tabs-item on click', async ({ page }) => {
  await initTabs(page);

  const [firstTabsItem, secondTabsItem] = await getAllTabsItems(page);
  const [, secondTab] = await getAllTabs(page);

  expect(await isHidden(firstTabsItem)).toBe(false);
  expect(await isHidden(secondTabsItem)).toBe(true);

  await secondTab.click();
  await waitForStencilLifecycle(page);

  expect(await isHidden(firstTabsItem)).toBe(true);
  expect(await isHidden(secondTabsItem)).toBe(false);
});

test('should render updated tabs when tab label is changed', async ({ page }) => {
  await initTabs(page);
  const [firstTabsItem] = await getAllTabsItems(page);
  const [firstTab] = await getAllTabs(page);
  const getLabelOfFirstButton = () => getProperty(firstTab, 'innerHTML');
  const getLabelOfFirstTabItem = () => getProperty(firstTabsItem, 'label');
  const getAriaLabelOfFirstTabItem = () => getAttribute(firstTabsItem, 'aria-label');

  expect(await getLabelOfFirstButton()).toBe(await getLabelOfFirstTabItem());
  expect(await getAriaLabelOfFirstTabItem()).toBe(await getLabelOfFirstTabItem());

  await setProperty(firstTabsItem, 'label', 'newButtonName');
  await waitForStencilLifecycle(page);

  expect(await getLabelOfFirstButton()).toBe(await getLabelOfFirstTabItem());
  expect(await getAriaLabelOfFirstTabItem()).toBe(await getLabelOfFirstTabItem());
});

test('should respect changes to activeTabIndex', async ({ page }) => {
  await initTabs(page);
  const host = getHost(page);
  const [firstTabsItem, secondTabsItem, thirdTabsItem] = await getAllTabsItems(page);

  const setActiveTabIndex = async (index: number) => {
    await setProperty(host, 'activeTabIndex', index);
    await waitForStencilLifecycle(page);
  };

  expect(await isHidden(firstTabsItem)).toBe(false);
  expect(await isHidden(secondTabsItem)).toBe(true);
  expect(await isHidden(thirdTabsItem)).toBe(true);

  await setActiveTabIndex(2);
  expect(await isHidden(firstTabsItem)).toBe(true);
  expect(await isHidden(secondTabsItem)).toBe(true);
  expect(await isHidden(thirdTabsItem)).toBe(false);

  await setActiveTabIndex(1);
  expect(await isHidden(firstTabsItem)).toBe(true);
  expect(await isHidden(secondTabsItem)).toBe(false);
  expect(await isHidden(thirdTabsItem)).toBe(true);
});

test.describe('slotted content changes', () => {
  test('should display p-tabs-item when new p-tabs-item is added and button is clicked', async ({ page }) => {
    await initTabs(page, { amount: 1, activeTabIndex: 0 });
    await waitForStencilLifecycle(page);

    await page.evaluate(() => {
      const tabs = document.querySelector('p-tabs');
      const tab = document.createElement('p-tabs-item');
      (tab as any).label = 'Tabs Item Added';
      tab.innerText = 'Added Tabs Item Content';
      tabs.append(tab);
    });
    await waitForStencilLifecycle(page);

    const [firstTabsItem, secondTabsItem] = await getAllTabsItems(page);

    await expect(firstTabsItem).not.toHaveAttribute('hidden');
    await expect(secondTabsItem).toHaveAttribute('hidden');

    await page.getByRole('tab').nth(1).click();
    await waitForStencilLifecycle(page);

    await expect(secondTabsItem).not.toHaveAttribute('hidden');
    await expect(firstTabsItem).toHaveAttribute('hidden');
  });

  test('should display same active p-tabs-item when last p-tabs-item is removed', async ({ page }) => {
    await initTabs(page, { amount: 3, activeTabIndex: 1 });
    await waitForStencilLifecycle(page);

    await page.evaluate(() => {
      const tabs = document.querySelector('p-tabs');
      tabs.removeChild(tabs.children[2]);
    });
    await waitForStencilLifecycle(page);

    const [firstTabsItem, secondTabsItem] = await getAllTabsItems(page);

    await expect(secondTabsItem).not.toHaveAttribute('hidden');
    await expect(firstTabsItem).toHaveAttribute('hidden');
  });

  test('should display no tab when active p-tabs-item on last position is removed', async ({ page }) => {
    await initTabs(page, { amount: 3, activeTabIndex: 2 });
    await waitForStencilLifecycle(page);

    await page.evaluate(() => {
      const tabs = document.querySelector('p-tabs');
      tabs.removeChild(tabs.children[2]);
    });
    await waitForStencilLifecycle(page);

    const [firstTabsItem, secondTabsItem] = await getAllTabsItems(page);

    await expect(secondTabsItem).toHaveAttribute('hidden');
    await expect(firstTabsItem).toHaveAttribute('hidden');
  });

  test('should display no tab when p-tabs-item on last position is active and p-tabs-item in the middle is removed', async ({
    page,
  }) => {
    await initTabs(page, { amount: 3, activeTabIndex: 2 });
    await waitForStencilLifecycle(page);

    await page.evaluate(() => {
      const tabs = document.querySelector('p-tabs');
      tabs.removeChild(tabs.children[1]);
    });
    await waitForStencilLifecycle(page);

    const [firstTabsItem, secondTabsItem] = await getAllTabsItems(page);

    await expect(secondTabsItem).toHaveAttribute('hidden');
    await expect(firstTabsItem).toHaveAttribute('hidden');
  });

  test('should display next tab when p-tabs-item in the middle is active and removed', async ({ page }) => {
    await initTabs(page, { amount: 3, activeTabIndex: 1 });
    await waitForStencilLifecycle(page);

    await page.evaluate(() => {
      const tabs = document.querySelector('p-tabs');
      tabs.removeChild(tabs.children[1]);
    });
    await waitForStencilLifecycle(page);

    const [firstTabsItem, secondTabsItem] = await getAllTabsItems(page);

    await expect(secondTabsItem).not.toHaveAttribute('hidden');
    await expect(firstTabsItem).toHaveAttribute('hidden');
  });
});

test.describe('text selection', () => {
  test('should be possible to select/highlight text within tabs item', async ({ page }) => {
    await initTabs(page);
    const tabContentRect = await page.evaluate(() => {
      const tabContent1 = document.querySelector('[label="Tab 1"]');
      const { x, y } = tabContent1.getBoundingClientRect();
      return { x, y };
    });
    await page.mouse.click(tabContentRect.x, tabContentRect.y, { clickCount: 2 });
    const selection = await page.evaluate(() => window.getSelection().toString());
    expect(selection).toBe('Content');
  });
});

test.describe('events', () => {
  test('should trigger update event on tab click', async ({ page }) => {
    await initTabs(page, { activeTabIndex: 1 }); // start with other index than first
    const host = getHost(page);
    const [firstButton, secondButton, thirdButton] = await getAllTabs(page);
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

  test('should not dispatch update event initially', async ({ page }) => {
    const COUNTER_KEY = 'pdsEventCounter';
    await setContentWithDesignSystem(page, ''); // empty page

    // render p-tabs with attached event listener at once
    await page.evaluate((COUNTER_KEY: string) => {
      const el = document.createElement('p-tabs');

      Array.from(Array(2)).forEach((_, i) => {
        const child = document.createElement('p-tabs-item');
        (child as any).label = `Tab ${i + 1}`;
        child.innerText = `Content ${i + 1}`;
        el.appendChild(child);
      });

      // count events in browser
      window[COUNTER_KEY] = 0;
      el.addEventListener('update', () => window[COUNTER_KEY]++);

      document.body.appendChild(el);
    }, COUNTER_KEY);

    await waitForComponentsReady(page);

    // retrieve counted events from browser
    const getCountedEvents = (): Promise<number> =>
      page.evaluate((COUNTER_KEY: string) => window[COUNTER_KEY], COUNTER_KEY);

    expect(await getCountedEvents()).toBe(0);

    const [, secondButton] = await getAllTabs(page);
    await secondButton.click();
    await waitForStencilLifecycle(page);
    await sleep(200);

    // to be on the safe side

    expect(await getCountedEvents()).toBe(1);
  });
});

test('should not crash without children', async ({ page }) => {
  initConsoleObserver(page);

  await setContentWithDesignSystem(page, `<p-tabs></p-tabs>`);
  expect(getConsoleErrorsAmount()).toBe(0);

  await page.evaluate(() => console.error('test error'));
  expect(getConsoleErrorsAmount()).toBe(1);
});

test('should not inherit nested tabs to parent', async ({ page }) => {
  await initTabs(page, { amount: 3 });

  // add tabs into first tab
  const [firstTabsItem] = await getAllTabsItems(page);
  await firstTabsItem.evaluate((el) => {
    const markup = `<p-tabs>
  <p-tabs-item label="Nested Tab 1">Nested Tab 1 Content</p-tabs-item>
  <p-tabs-item label="Nested Tab 2">Nested Tab 2 Content</p-tabs-item>
</p-tabs>`;
    el.innerHTML = markup;
  });

  await waitForStencilLifecycle(page);

  expect((await getAllTabs(page)).length).toBe(3);
});

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initTabs(page, { amount: 3 });
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-tabs'], 'componentDidLoad: p-tabs').toBe(1);
    expect(status.componentDidLoad['p-tabs-bar'], 'componentDidLoad: p-tabs-bar').toBe(1); // includes 4 didLoad calls
    expect(status.componentDidLoad['p-tabs-item'], 'componentDidLoad: p-tabs-item').toBe(3);
    expect(status.componentDidLoad['p-scroller'], 'componentDidLoad: p-scroller').toBe(1);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(2);
    expect(status.componentDidLoad['p-button'], 'componentDidLoad: p-button').toBe(2);

    expect(status.componentDidUpdate['p-scroller'], 'componentDidUpdate: p-scroller').toBe(0);
    expect(status.componentDidUpdate['p-tabs-bar'], 'componentDidUpdate: p-tabs-bar').toBe(0);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(10);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  test('should work without unnecessary round trips on prop change', async ({ page }) => {
    await initTabs(page, { amount: 3 });
    const host = getHost(page);

    await setProperty(host, 'activeTabIndex', '2');
    await waitForStencilLifecycle(page);

    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-tabs'], 'componentDidUpdate: p-tabs').toBe(1);
    expect(status.componentDidUpdate['p-tabs-bar'], 'componentDidUpdate: p-tabs-bar').toBe(1);
    expect(status.componentDidUpdate['p-tabs-item'], 'componentDidUpdate: p-tabs-item').toBe(0);
    expect(status.componentDidUpdate['p-scroller'], 'componentDidUpdate: p-scroller').toBe(0);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(10);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(2);
  });
});
