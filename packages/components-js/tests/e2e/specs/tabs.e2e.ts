import {
  addEventListener,
  getAttribute,
  getBrowser,
  getProperty,
  initAddEventListener,
  reattachElement,
  selectNode,
  setContentWithDesignSystem,
  waitForStencilLifecycle
} from '../helpers';
import { ConsoleMessage, ElementHandle, Page } from 'puppeteer';
import { CSS_ANIMATION_DURATION, FOCUS_PADDING } from './tabs-bar.e2e';

describe('tabs', () => {
  let page: Page;
  beforeEach(async () => {
    page = await getBrowser().newPage();
    await initAddEventListener(page);
  });
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

  const getTabs = () => selectNode(page, 'p-tabs');
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
    const host = await getTabs();
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

  // TODO: remove?
  xit('should display correct tab when selected attribute is set', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-tabs>
        <p-tabs-item label="Button1">
          Content1
        </p-tabs-item>
        <p-tabs-item label="Button2" selected>
          Content2
        </p-tabs-item>
        <p-tabs-item label="Button3">
          Content3
        </p-tabs-item>
      </p-tabs>
    `
    );
    const [firstButton, secondButton, thirdButton] = await getAllTabs();

    expect(await getAttribute(firstButton, 'aria-selected')).toBe('false');
    expect(await getAttribute(secondButton, 'aria-selected')).toBe('true');
    expect(await getAttribute(thirdButton, 'aria-selected')).toBe('false');
  });

  // TODO: remove?
  xit('should display correct tab when multiple tabs have selected attribute', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-tabs>
        <p-tabs-item label="Button1">
          Content1
        </p-tabs-item>
        <p-tabs-item label="Button2" selected>
          Content2
        </p-tabs-item>
        <p-tabs-item label="Button3" selected>
          Content3
        </p-tabs-item>
      </p-tabs>
    `
    );
    const [firstButton, secondButton, thirdButton] = await getAllTabs();

    expect(await getAttribute(firstButton, 'aria-selected')).toBe('false');
    expect(await getAttribute(secondButton, 'aria-selected')).toBe('true');
    expect(await getAttribute(thirdButton, 'aria-selected')).toBe('false');
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

    // TODO: move to tabs-bar or delete?
    xit('should have correct scroll-position on keyboard arrow press', async () => {
      await setContentWithDesignSystem(
        page,
        `
      <div style="width: 400px">
        <p-tabs size="medium">
          <p-tabs-item label="Button1">Content1</p-tabs-item>
          <p-tabs-item label="Button2">Content2</p-tabs-item>
          <p-tabs-item label="Button3">Content3</p-tabs-item>
          <p-tabs-item label="Button4">Content4</p-tabs-item>
          <p-tabs-item label="Button5">Content5</p-tabs-item>
          <p-tabs-item label="Button6">Content6</p-tabs-item>
          <p-tabs-item label="Button7">Content7</p-tabs-item>
          <p-tabs-item label="Button8">Content8</p-tabs-item>
        </p-tabs>
      </div>
    `
      );
      const gradientNext = await selectNode(page, 'p-tabs >>> p-tabs-bar >>> .p-tabs-bar__gradient--next');
      const allButtons = await getAllTabs();
      const gradientWidth = await getProperty(gradientNext, 'offsetWidth');
      const scrollArea = await selectNode(page, 'p-tabs >>> p-tabs-bar >>> .p-tabs-bar__scroll-area');
      const scrollAreaWidth = await getProperty(scrollArea, 'offsetWidth');
      const getScrollAreaScrollLeft = () => getProperty(scrollArea, 'scrollLeft');

      expect(await getScrollAreaScrollLeft()).toEqual(0);

      await page.keyboard.press('Tab');
      await page.waitForTimeout(CSS_ANIMATION_DURATION);
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(CSS_ANIMATION_DURATION);
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(CSS_ANIMATION_DURATION);
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(CSS_ANIMATION_DURATION);
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(CSS_ANIMATION_DURATION);

      const tab5offset = await getProperty(allButtons[4], 'offsetLeft');
      const scrollDistanceRight = +tab5offset - +gradientWidth + FOCUS_PADDING;
      expect(await getScrollAreaScrollLeft()).toEqual(scrollDistanceRight);

      await page.keyboard.press('ArrowLeft');
      await page.waitForTimeout(CSS_ANIMATION_DURATION);

      const tab2offset = await getProperty(allButtons[3], 'offsetLeft');
      const tabWidth = await getProperty(allButtons[3], 'offsetWidth');
      const scrollDistanceLeft = +tab2offset + +tabWidth + +gradientWidth - +scrollAreaWidth;
      expect(await getScrollAreaScrollLeft()).toEqual(scrollDistanceLeft);
    });
  });

  describe('events', () => {
    it('should trigger tabChange event on tab click', async () => {
      await initTabs({ activeTabIndex: 1 }); // start with other index than first
      const host = await getTabs();
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

        Array.from(Array(2)).forEach((x, i) => {
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

      await waitForStencilLifecycle(page);

      // retrieve counted events from browser
      const eventCounter: number = await page.evaluate((COUNTER_KEY: string) => window[COUNTER_KEY], COUNTER_KEY);

      expect(eventCounter).toBe(0);
    });
  });

  it('should not crash without children', async () => {
    let lastConsoleMsg: ConsoleMessage = undefined;
    page.on('console', (msg) => {
      lastConsoleMsg = msg;
      if (msg.type() === 'error') {
        console.log(msg.args()[0]['_remoteObject'].description);
      }
    });

    await setContentWithDesignSystem(page, `<p-tabs></p-tabs>`);

    expect(lastConsoleMsg.type()).not.toBe('error');
  });
});
