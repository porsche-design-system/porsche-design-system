import {
  addEventListener,
  expectA11yToMatchSnapshot,
  getAttribute,
  getConsoleErrorsAmount,
  getLifecycleStatus,
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
  waitForStencilLifecycle,
} from '../helpers';
import { ElementHandle, Page } from 'puppeteer';

describe('tabs', () => {
  let page: Page;
  beforeEach(async () => (page = await browser.newPage()));
  afterEach(async () => await page.close());
  const CSS_ANIMATION_DURATION = 1000;

  const initTabs = async (opts?: { amount?: number; activeTabIndex?: number }) => {
    const { amount = 3, activeTabIndex } = opts ?? {};

    const content = `<p-tabs ${activeTabIndex ? `active-tab-index="${activeTabIndex}"` : ''}>
  ${Array.from(Array(amount))
    .map((_, i) => `<p-tabs-item label="Tab ${i + 1}">Content ${i + 1}</p-tabs-item>`)
    .join('')}
</p-tabs>`;

    await setContentWithDesignSystem(page, content);
  };

  const getHost = () => selectNode(page, 'p-tabs');
  const getAllTabsItems = () => page.$$('p-tabs-item');
  const getTabsBar = () => selectNode(page, 'p-tabs >>> p-tabs-bar');
  const getAllTabs = async () => (await getTabsBar()).$$('button');
  const getHiddenAttribute = (element: ElementHandle) => getAttribute(element, 'hidden');
  const isHidden = async (element: ElementHandle): Promise<boolean> => (await getHiddenAttribute(element)) === '';

  it('should render', async () => {
    await initTabs();
    const allTabs = await getAllTabs();

    expect(allTabs.length).toBe(3);
  });

  it('should render correct tabs-item on click', async () => {
    await initTabs();

    const [firstTabsItem, secondTabsItem] = await getAllTabsItems();
    const [, secondTab] = await getAllTabs();

    expect(await isHidden(firstTabsItem)).toBe(false);
    expect(await isHidden(secondTabsItem)).toBe(true);

    await secondTab.click();
    await waitForStencilLifecycle(page);

    expect(await isHidden(firstTabsItem)).toBe(true);
    expect(await isHidden(secondTabsItem)).toBe(false);
  });

  it('should render updated tabs when tab label is changed', async () => {
    await initTabs();
    const [firstTabsItem] = await getAllTabsItems();
    const [firstTab] = await getAllTabs();
    const getLabelOfFirstButton = () => getProperty(firstTab, 'innerHTML');
    const getLabelOfFirstTabItem = () => getProperty(firstTabsItem, 'label');

    expect(await getLabelOfFirstButton()).toBe(await getLabelOfFirstTabItem());

    await setProperty(firstTabsItem, 'label', 'newButtonName');
    await waitForStencilLifecycle(page);

    expect(await getLabelOfFirstButton()).toBe(await getLabelOfFirstTabItem());
  });

  it('should respect changes to activeTabIndex', async () => {
    await initTabs();
    const host = await getHost();
    const [firstTabsItem, secondTabsItem, thirdTabsItem] = await getAllTabsItems();

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

  describe('slotted content changes', () => {
    it('should display p-tabs-item when new p-tabs-item is added and button is clicked', async () => {
      await initTabs({ amount: 1, activeTabIndex: 0 });
      await waitForStencilLifecycle(page);

      await page.evaluate(() => {
        const tabs = document.querySelector('p-tabs');
        const tab = document.createElement('p-tabs-item');
        (tab as any).label = 'Tabs Item Added';
        tab.innerText = 'Added Tabs Item Content';
        tabs.append(tab);
      });
      await waitForStencilLifecycle(page);

      const [, secondButton] = await getAllTabs();
      const [firstTabsItem, secondTabsItem] = await getAllTabsItems();

      expect(await isHidden(firstTabsItem)).toBe(false);
      expect(await isHidden(secondTabsItem)).toBe(true);

      await secondButton.click();
      await waitForStencilLifecycle(page);

      expect(await isHidden(secondTabsItem)).toBe(false);
      expect(await isHidden(firstTabsItem)).toBe(true);
    });

    it('should display same active p-tabs-item when last p-tabs-item is removed', async () => {
      await initTabs({ amount: 3, activeTabIndex: 1 });
      await waitForStencilLifecycle(page);

      await page.evaluate(() => {
        const tabs = document.querySelector('p-tabs');
        tabs.removeChild(tabs.children[2]);
      });
      await waitForStencilLifecycle(page);

      const [firstTabsItem, secondTabsItem] = await getAllTabsItems();

      expect(await isHidden(secondTabsItem)).toBe(false);
      expect(await isHidden(firstTabsItem)).toBe(true);
    });

    it('should display no tab when active p-tabs-item on last position is removed', async () => {
      await initTabs({ amount: 3, activeTabIndex: 2 });
      await waitForStencilLifecycle(page);

      await page.evaluate(() => {
        const tabs = document.querySelector('p-tabs');
        tabs.removeChild(tabs.children[2]);
      });
      await waitForStencilLifecycle(page);

      const [firstTabsItem, secondTabsItem] = await getAllTabsItems();

      expect(await isHidden(secondTabsItem)).toBe(true);
      expect(await isHidden(firstTabsItem)).toBe(true);
    });

    it('should display no tab when p-tabs-item on last position is active and p-tabs-item in the middle is removed', async () => {
      await initTabs({ amount: 3, activeTabIndex: 2 });
      await waitForStencilLifecycle(page);

      await page.evaluate(() => {
        const tabs = document.querySelector('p-tabs');
        tabs.removeChild(tabs.children[1]);
      });
      await waitForStencilLifecycle(page);

      const [firstTabsItem, secondTabsItem] = await getAllTabsItems();

      expect(await isHidden(secondTabsItem)).toBe(true);
      expect(await isHidden(firstTabsItem)).toBe(true);
    });

    it('should display next tab when p-tabs-item in the middle is active and removed', async () => {
      await initTabs({ amount: 3, activeTabIndex: 1 });
      await waitForStencilLifecycle(page);

      await page.evaluate(() => {
        const tabs = document.querySelector('p-tabs');
        tabs.removeChild(tabs.children[1]);
      });
      await waitForStencilLifecycle(page);

      const [firstTabsItem, secondTabsItem] = await getAllTabsItems();

      expect(await isHidden(secondTabsItem)).toBe(false);
      expect(await isHidden(firstTabsItem)).toBe(true);
    });
  });

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
      await page.waitForTimeout(CSS_ANIMATION_DURATION);

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

  describe('events', () => {
    beforeEach(async () => await initAddEventListener(page));

    it('should trigger tabChange event on tab click', async () => {
      await initTabs({ activeTabIndex: 1 }); // start with other index than first
      const host = await getHost();
      const [firstButton, secondButton, thirdButton] = await getAllTabs();
      let eventCounter = 0;
      await addEventListener(host, 'tabChange', () => eventCounter++);

      // Remove and re-attach component to check if events are duplicated / fire at all
      await reattachElement(page, 'p-tabs');

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

    it('should not dispatch tabChange event initially', async () => {
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
        el.addEventListener('tabChange', () => window[COUNTER_KEY]++);

        document.body.appendChild(el);
      }, COUNTER_KEY);

      await waitForComponentsReady(page);

      // retrieve counted events from browser
      const getCountedEvents = (): Promise<number> =>
        page.evaluate((COUNTER_KEY: string) => window[COUNTER_KEY], COUNTER_KEY);

      expect(await getCountedEvents()).toBe(0);

      const [, secondButton] = await getAllTabs();
      await secondButton.click();
      await waitForStencilLifecycle(page);
      await page.waitForTimeout(200); // to be on the safe side

      expect(await getCountedEvents()).toBe(1);
    });
  });

  it('should not crash without children', async () => {
    initConsoleObserver(page);

    await setContentWithDesignSystem(page, `<p-tabs></p-tabs>`);
    expect(getConsoleErrorsAmount()).toBe(0);

    await page.evaluate(() => console.error('test error'));
    expect(getConsoleErrorsAmount()).toBe(1);
  });

  it('should not inherit nested tabs to parent', async () => {
    await initTabs({ amount: 3 });

    // add tabs into first tab
    const [firstTabsItem] = await getAllTabsItems();
    await firstTabsItem.evaluate((el) => {
      const markup = `<p-tabs>
  <p-tabs-item label="Nested Tab 1">Nested Tab 1 Content</p-tabs-item>
  <p-tabs-item label="Nested Tab 2">Nested Tab 2 Content</p-tabs-item>
</p-tabs>`;
      el.innerHTML = markup;
    });

    await waitForStencilLifecycle(page);

    expect((await getAllTabs()).length).toBe(3);
  });

  describe('lifecycle', () => {
    it('should work without unnecessary round trips on init', async () => {
      await initTabs({ amount: 3 });
      const status = await getLifecycleStatus(page);

      expect(status.componentDidLoad['p-tabs'], 'componentDidLoad: p-tabs').toBe(1);
      expect(status.componentDidLoad['p-tabs-bar'], 'componentDidLoad: p-tabs-bar').toBe(1); // Includes 7 didLoad calls
      expect(status.componentDidLoad['p-tabs-item'], 'componentDidLoad: p-tabs-item').toBe(3);

      expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(11);
      expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
    });

    it('should work without unnecessary round trips on prop change', async () => {
      await initTabs({ amount: 3 });
      const host = await getHost();

      await setProperty(host, 'activeTabIndex', '2');
      await waitForStencilLifecycle(page);

      const status = await getLifecycleStatus(page);

      expect(status.componentDidUpdate['p-tabs'], 'componentDidUpdate: p-tabs').toBe(1);
      expect(status.componentDidUpdate['p-tabs-bar'], 'componentDidUpdate: p-tabs-bar').toBe(1);

      expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(11);
      expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(2);
    });
  });

  describe('accessibility', () => {
    it('should expose correct initial accessibility tree of tabpanel', async () => {
      await initTabs();
      const tabpanel = () => selectNode(page, 'p-tabs > [role="tabpanel"]');

      await expectA11yToMatchSnapshot(page, await tabpanel(), { interestingOnly: false });
    });
  });
});
