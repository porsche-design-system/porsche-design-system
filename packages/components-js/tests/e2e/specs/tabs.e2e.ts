import {
  addEventListener,
  getAttribute,
  getBrowser,
  getLifecycleStatus,
  getProperty,
  initAddEventListener,
  isElementAtIndexFocused,
  reattachElement,
  removeAttribute,
  selectNode,
  setAttribute,
  setContentWithDesignSystem,
  waitForComponentsReady,
  waitForStencilLifecycle,
} from '../helpers';
import { ConsoleMessage, ElementHandle, Page } from 'puppeteer';
import { CSS_ANIMATION_DURATION } from './tabs-bar.e2e';

describe('tabs', () => {
  let page: Page;
  beforeEach(async () => (page = await getBrowser().newPage()));
  afterEach(async () => await page.close());

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
  const getHidden = (element: ElementHandle) => getAttribute(element, 'hidden');

  it('should render', async () => {
    await initTabs();
    const allTabs = await getAllTabs();

    expect(allTabs.length).toBe(3);
  });

  it('should render correct tabs-item on click', async () => {
    await initTabs();

    const [firstTabsItem, secondTabsItem] = await getAllTabsItems();
    const [, secondTab] = await getAllTabs();

    expect(await getHidden(firstTabsItem)).toBeNull();
    expect(await getHidden(secondTabsItem)).toBe('');

    await secondTab.click();
    await waitForStencilLifecycle(page);

    expect(await getHidden(firstTabsItem)).toBe('');
    expect(await getHidden(secondTabsItem)).toBeNull();
  });

  it('should render updated tabs when tab label is changed', async () => {
    await initTabs();
    const [firstTabsItem] = await getAllTabsItems();
    const [firstTab] = await getAllTabs();
    const getLabelOfFirstButton = () => getProperty(firstTab, 'innerHTML');
    const getLabelOfFirstTabItem = () => getProperty(firstTabsItem, 'label');

    expect(await getLabelOfFirstButton()).toBe(await getLabelOfFirstTabItem());

    await firstTabsItem.evaluate((el) => el.setAttribute('label', 'newButtonName'));
    await waitForStencilLifecycle(page);

    expect(await getLabelOfFirstButton()).toBe(await getLabelOfFirstTabItem());
  });

  it('should respect changes to activeTabIndex', async () => {
    await initTabs();
    const host = await getHost();
    const [firstTabsItem, secondTabsItem, thirdTabsItem] = await getAllTabsItems();
    const setActiveTabIndex = async (index: number) => {
      await host.evaluate((el, index: number) => el.setAttribute('active-tab-index', String(index)), index);
      await waitForStencilLifecycle(page);
    };

    expect(await getHidden(firstTabsItem)).toBeNull();
    expect(await getHidden(secondTabsItem)).toBe('');
    expect(await getHidden(thirdTabsItem)).toBe('');

    await setActiveTabIndex(2);
    expect(await getHidden(firstTabsItem)).toBe('');
    expect(await getHidden(secondTabsItem)).toBe('');
    expect(await getHidden(thirdTabsItem)).toBeNull();

    await setActiveTabIndex(1);
    expect(await getHidden(firstTabsItem)).toBe('');
    expect(await getHidden(secondTabsItem)).toBeNull();
    expect(await getHidden(thirdTabsItem)).toBe('');
  });

  describe('keyboard', () => {
    it('should display correct tabs-item on keyboard arrow press', async () => {
      await initTabs();
      const [firstTabsItem, secondTabsItem] = await getAllTabsItems();

      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowRight');
      await waitForStencilLifecycle(page);

      expect(await getHidden(firstTabsItem)).toBe('');
      expect(await getHidden(secondTabsItem)).toBeNull();

      await page.keyboard.press('ArrowLeft');
      await waitForStencilLifecycle(page);

      expect(await getHidden(firstTabsItem)).toBeNull();
      expect(await getHidden(secondTabsItem)).toBe('');
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

      expect(await isElementAtIndexFocused(page, 0)).toBeTrue();

      await page.keyboard.press('ArrowRight');
      await waitForStencilLifecycle(page);

      expect(await isElementAtIndexFocused(page, 0)).toBeFalsy();
      expect(await isElementAtIndexFocused(page, 1)).toBeTrue();

      await page.keyboard.press('ArrowLeft');
      await waitForStencilLifecycle(page);

      expect(await isElementAtIndexFocused(page, 0)).toBeTrue();
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
          child.setAttribute('label', `Tab ${i + 1}`);
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

    const getErrorsAmount = () => consoleMessages.filter((x) => x.type() === 'error').length;

    await setContentWithDesignSystem(page, `<p-tabs></p-tabs>`);
    expect(getErrorsAmount()).toBe(0);

    await page.evaluate(() => console.error('test error'));
    expect(getErrorsAmount()).toBe(1);
  });

  describe('lifecycle', () => {
    it('should work without unnecessary round trips on init', async () => {
      await initTabs({ amount: 3 });
      const status = await getLifecycleStatus(page);

      expect(status.componentDidLoad['p-tabs']).toBe(1, 'componentDidLoad: p-tabs');
      expect(status.componentDidLoad['p-tabs-bar']).toBe(1, 'componentDidLoad: p-tabs-bar'); // Includes 7 didLoad calls
      expect(status.componentDidLoad['p-tabs-item']).toBe(3, 'componentDidLoad: p-tabs-item');

      expect(status.componentDidLoad.all).toBe(11, 'componentDidLoad: all');
      expect(status.componentDidUpdate.all).toBe(0, 'componentDidUpdate: all');
    });

    it('should work without unnecessary round trips on prop change', async () => {
      await initTabs({ amount: 3 });
      const host = await getHost();

      await setAttribute(host, 'active-tab-index', '2');
      await waitForStencilLifecycle(page);

      const status = await getLifecycleStatus(page);

      expect(status.componentDidUpdate['p-tabs']).toBe(1, 'componentDidUpdate: p-tabs');
      expect(status.componentDidUpdate['p-tabs-bar']).toBe(1, 'componentDidUpdate: p-tabs-bar');

      expect(status.componentDidLoad.all).toBe(11, 'componentDidLoad: all');
      expect(status.componentDidUpdate.all).toBe(2, 'componentDidUpdate: all');
    });
  });
});
