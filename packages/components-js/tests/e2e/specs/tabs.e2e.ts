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
import { ConsoleMessage, Page } from 'puppeteer';
import { CSS_ANIMATION_DURATION, FOCUS_PADDING } from './tabs-bar.e2e';

describe('tabs', () => {
  let page: Page;
  beforeEach(async () => {
    page = await getBrowser().newPage();
    await initAddEventListener(page);
  });
  afterEach(async () => await page.close());

  const initTabs = (opts?: { amount?: number; activeTabIndex?: number }) => {
    const { amount = 3, activeTabIndex } = opts ?? {};

    const content = `<p-tabs ${activeTabIndex ? `active-tab-index="${activeTabIndex}"` : ''}>
  ${Array.from(Array(amount))
    .map((_, i) => `<p-tabs-item label="Tab ${i + 1}">Content ${i + 1}</p-tabs-item>`)
    .join('')}
</p-tabs>`;

    return setContentWithDesignSystem(page, content);
  };

  const getAllTabsItems = () => page.$$('p-tabs-item');
  const getTabsBar = () => selectNode(page, 'p-tabs >>> p-tabs-bar');
  const getAllTabs = async () => (await getTabsBar()).$$('button');

  it('should render', async () => {
    await initTabs();
    const allTabs = await getAllTabs();

    expect(allTabs.length).toBe(3);
  });

  it('should render correct content of tabs-item on click', async () => {
    await initTabs();

    const [firstTabItem, secondTabItem] = await getAllTabsItems();
    const allTabs = await getAllTabs();

    expect(await getAttribute(firstTabItem, 'hidden')).toBeNull();
    expect(await getAttribute(secondTabItem, 'hidden')).toBe('');

    await allTabs[1].click();
    await waitForStencilLifecycle(page);

    expect(await getAttribute(firstTabItem, 'hidden')).toBe('');
    expect(await getAttribute(secondTabItem, 'hidden')).toBeNull();
  });

  it('should render updated tabs when tab label is changed', async () => {
    await initTabs();
    const allTabsItems = await getAllTabsItems();
    const allTabs = await getAllTabs();
    const getLabelOfFirstButton = () => getProperty(allTabs[0], 'innerHTML');
    const getLabelOfFirstTabItem = () => getProperty(allTabsItems[0], 'label');

    expect(await getLabelOfFirstButton()).toBe(await getLabelOfFirstTabItem());

    await allTabsItems[0].evaluate((el) => el.setAttribute('label', 'newButtonName'));
    await waitForStencilLifecycle(page);

    expect(await getLabelOfFirstButton()).toBe(await getLabelOfFirstTabItem());
  });

  // TODO: remove?
  xit('should render correct tab when selected attribute is set', async () => {
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
  xit('should render correct selected tab when multiple tabs have selected attribute', async () => {
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
    it('should render correct content of tabs-item on keyboard arrow press', async () => {
      await initTabs();
      const [firstTabItem, secondTabItem] = await getAllTabsItems();

      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowRight');
      await waitForStencilLifecycle(page);

      expect(await getAttribute(firstTabItem, 'hidden')).toBe('');
      expect(await getAttribute(secondTabItem, 'hidden')).toBeNull();

      await page.keyboard.press('ArrowLeft');
      await waitForStencilLifecycle(page);

      expect(await getAttribute(firstTabItem, 'hidden')).toBeNull();
      expect(await getAttribute(secondTabItem, 'hidden')).toBe('');
    });

    // TODO: move to tabs-bar or delete?
    xit('should render correct scroll-position on keyboard arrow press', async () => {
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
    it('should trigger event on tab click', async () => {
      await initTabs({ activeTabIndex: 1 }); // start with other index than first
      const host = await selectNode(page, 'p-tabs');
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

    it('should not dispatch event initially', async () => {
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
