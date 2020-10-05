import { ElementHandle, Page } from 'puppeteer';
import {
  addEventListener,
  getAttribute,
  getBrowser,
  getElementPositions,
  getProperty,
  initAddEventListener,
  selectNode,
  setContentWithDesignSystem,
  waitForStencilLifecycle
} from '../helpers';
import { CSS_ANIMATION_DURATION, TABS_SCROLL_PERCENTAGE } from './tabs.e2e';

describe('tabs-bar', () => {
  let page: Page;
  beforeEach(async () => {
    page = await getBrowser().newPage();
    await initAddEventListener(page);
  });
  afterEach(async () => await page.close());

  const getAllTabs = () => page.$$('a,button');
  const getAllButtons = () => page.$$('button');
  const getScrollArea = () => selectNode(page, 'p-tabs-bar >>> .p-tabs-bar__scroll-area');
  const getStatusBar = () => selectNode(page, 'p-tabs-bar >>> .p-tabs-bar__status-bar');
  const getGradientNext = () => selectNode(page, 'p-tabs-bar >>> .p-tabs-bar__gradient--next');
  const getPrevButton = async () =>
    (await selectNode(page, 'p-tabs-bar >>> .p-tabs-bar__action--prev')).$('.p-tabs-bar__action--prev > p-button-pure');
  const getNextButton = async () =>
    (await selectNode(page, 'p-tabs-bar >>> .p-tabs-bar__action--next ')).$(
      '.p-tabs-bar__action--next > p-button-pure'
    );
  const getScrollLeft = (element: ElementHandle) => getProperty(element, 'scrollLeft');

  it('should render correct active tab if attribute is set ', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-tabs-bar active-tab-index="1">
        <button>
          Content1
        </button>
        <button>
          Content2
        </button>
        <button>
          Content3
        </button>
      </p-tabs-bar>
    `
    );
    const allButtons = await getAllButtons();
    await page.waitFor(40); // class gets set through js, this takes a little time

    expect(await getAttribute(allButtons[0], 'aria-selected')).toBe('false');
    expect(await getAttribute(allButtons[1], 'aria-selected')).toBe('true');
    expect(await getAttribute(allButtons[2], 'aria-selected')).toBe('false');
  });

  it('should render only one selected tab if multiple selected are set', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-tabs-bar active-tab-index="0">
        <button>
          Content1
        </button>
        <button selected>
          Content2
        </button>
        <button selected>
          Content3
        </button>
      </p-tabs-bar>
    `
    );
    const allButtons = await getAllButtons();
    await page.waitFor(40); // class gets set through js, this takes a little time

    expect(await getAttribute(allButtons[0], 'aria-selected')).toBe('true');
    expect(await getAttribute(allButtons[1], 'aria-selected')).toBe('false');
    expect(await getAttribute(allButtons[2], 'aria-selected')).toBe('false');
  });

  it('should render scroll 20% on Button next', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <div style="width: 400px">
       <p-tabs-bar size="medium">
          <button>
            Content1
          </button>
          <button>
            Content2
          </button>
          <button>
            Content3
          </button>
           <button>
            Content4
          </button>
          <button>
            Content5
          </button>
          <button>
            Content6
          </button>
           <button>
            Content7
          </button>
          <button>
            Content8
          </button>
        </p-tabs-bar>
      </div>
    `
    );
    const nextButton = await getNextButton();
    const scrollArea = await getScrollArea();
    const scrollAreaWidth = await getProperty(scrollArea, 'offsetWidth');
    const scrollDistance = Math.round(+scrollAreaWidth * TABS_SCROLL_PERCENTAGE);

    expect(await getScrollLeft(scrollArea)).toEqual(0);

    await nextButton.click();
    await waitForStencilLifecycle(page);
    await page.waitFor(CSS_ANIMATION_DURATION);

    expect(await getScrollLeft(scrollArea)).toEqual(scrollDistance);
  });

  it('should render scroll 20% on Button prev', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <div style="width: 400px">
       <p-tabs-bar size="medium">
          <button>
            Content1
          </button>
          <button>
            Content2
          </button>
          <button>
            Content3
          </button>
           <button>
            Content4
          </button>
          <button>
            Content5
          </button>
          <button>
            Content6
          </button>
           <button>
            Content7
          </button>
          <button>
            Content8
          </button>
        </p-tabs-bar>
      </div>
    `
    );
    const nextButton = await getNextButton();
    const prevButton = await getPrevButton();
    const scrollArea = await getScrollArea();
    const scrollAreaWidth = await getProperty(scrollArea, 'offsetWidth');
    const scrollDistance = Math.round(+scrollAreaWidth * TABS_SCROLL_PERCENTAGE);

    expect(await getScrollLeft(scrollArea)).toEqual(0);

    await nextButton.click();
    await waitForStencilLifecycle(page);
    await page.waitFor(CSS_ANIMATION_DURATION);

    expect(await getScrollLeft(scrollArea)).toEqual(scrollDistance);

    await nextButton.click();
    await waitForStencilLifecycle(page);
    await page.waitFor(CSS_ANIMATION_DURATION);

    expect(await getScrollLeft(scrollArea)).toEqual(scrollDistance * 2);

    await prevButton.click();
    await waitForStencilLifecycle(page);
    await page.waitFor(CSS_ANIMATION_DURATION);

    expect(await getScrollLeft(scrollArea)).toEqual(scrollDistance);
  });

  it('should render correct scroll-position on selected tab', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <div style="width: 400px">
       <p-tabs-bar active-tab-index="3" size="medium">
          <button>
            Content1
          </button>
          <button>
            Content2
          </button>
          <button>
            Content3
          </button>
           <button>
            Content4
          </button>
          <button>
            Content5
          </button>
          <button>
            Content6
          </button>
           <button>
            Content7
          </button>
          <button>
            Content8
          </button>
       </p-tabs-bar>
      </div>
    `
    );
    const allButtons = await getAllButtons();
    const selectedTabOffset = await getProperty(allButtons[3], 'offsetLeft');
    const gradient = await getGradientNext();
    const gradientWidth = await getProperty(gradient, 'offsetWidth');
    const scrollArea = await getScrollArea();
    const scrollDistance = +selectedTabOffset - +gradientWidth;

    await waitForStencilLifecycle(page);

    expect(await getScrollLeft(scrollArea)).toEqual(scrollDistance);
  });

  it('should render correct scroll-position on tab click', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <div style="width: 400px">
       <p-tabs-bar size="medium">
          <button>
            Content1
          </button>
          <button>
            Content2
          </button>
          <button>
            Content3
          </button>
           <button>
            Content4
          </button>
          <button>
            Content5
          </button>
          <button>
            Content6
          </button>
           <button>
            Content7
          </button>
          <button>
            Content8
          </button>
       </p-tabs-bar>
      </div>
    `
    );
    const allButtons = await getAllButtons();
    const gradient = await getGradientNext();
    const gradientWidth = await getProperty(gradient, 'offsetWidth');
    const scrollArea = await getScrollArea();
    const scrollAreaWidth = await getProperty(scrollArea, 'offsetWidth');

    expect(await getScrollLeft(scrollArea)).toEqual(0);

    await allButtons[4].click();
    await waitForStencilLifecycle(page);
    await page.waitFor(CSS_ANIMATION_DURATION);

    const tab3offset = await getProperty(allButtons[4], 'offsetLeft');
    const scrollDistanceRight = +tab3offset - +gradientWidth;
    expect(await getScrollLeft(scrollArea)).toEqual(scrollDistanceRight);

    await allButtons[3].click();
    await waitForStencilLifecycle(page);
    await page.waitFor(CSS_ANIMATION_DURATION);

    const tab2offset = await getProperty(allButtons[3], 'offsetLeft');
    const tabWidth = await getProperty(allButtons[3], 'offsetWidth');
    const scrollDistanceLeft = +tab2offset + +tabWidth + +gradientWidth - +scrollAreaWidth;
    expect(await getScrollLeft(scrollArea)).toEqual(scrollDistanceLeft);
  });

  it('should render same offsetLeft on Statusbar and active tab', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <div style="width: 400px">
       <p-tabs-bar active-tab-index="2" size="medium">
          <button>
            Content1
          </button>
          <button>
            Content2
          </button>
          <button>
            Content3
          </button>
       </p-tabs-bar>
      </div>
    `
    );
    const allButtons = await getAllButtons();
    const statusBar = await getStatusBar();
    const tab3Position = (await getElementPositions(page, allButtons[2])).left;

    expect(Math.round(tab3Position)).toEqual((await getElementPositions(page, statusBar)).left);

    await allButtons[0].click();
    await waitForStencilLifecycle(page);
    await page.waitFor(CSS_ANIMATION_DURATION);

    expect((await getElementPositions(page, allButtons[0])).left).toEqual(
      (await getElementPositions(page, statusBar)).left
    );
  });

  it('should render focus on selected tab on keyboard "tab" click', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-tabs-bar>
        <button>
          Button 1
        </button>
        <button>
          Button 2
        </button>
        <button>
          Button 3
        </button>
      </p-tabs-bar>
      `
    );
    const getButtonFocus = async () => {
      const snapshot = await page.accessibility.snapshot();
      const button = snapshot.children[0];
      return button.focused;
    };
    expect(await getButtonFocus()).toBeUndefined();

    await page.keyboard.press('Tab');

    expect(await getButtonFocus()).toBe(true);
  });

  it('should render focus on content on keyboard "tab" click', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-tabs-bar>
        <button>
          Button 1
        </button>
        <button>
          Button 2
        </button>
        <button>
          Button 3
        </button>
      </p-tabs-bar>
      <p-text>Hallo <a href="#">Link</a></p-text>
    `
    );
    const getLinkFocus = async () => {
      const snapshot = await page.accessibility.snapshot();
      const link = snapshot.children[snapshot.children.length - 1];
      return link.focused;
    };
    expect(await getLinkFocus()).toBeUndefined();

    await page.keyboard.press('Tab');
    expect(await getLinkFocus()).toBeUndefined();
    await page.keyboard.press('Tab');

    expect(await getLinkFocus()).toBe(true);
  });

  it('should render correct active tab on arrow-key press', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-tabs-bar>
        <button>
          Button 1
        </button>
        <button>
          Button 2
        </button>
        <button>
          Button 3
        </button>
      </p-tabs-bar>
    `
    );
    const allTabs = await getAllTabs();

    expect(await getAttribute(allTabs[0], 'aria-selected')).toBe('true');
    expect(await getAttribute(allTabs[1], 'aria-selected')).toBe('false');

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowRight');
    await waitForStencilLifecycle(page);

    expect(await getAttribute(allTabs[1], 'aria-selected')).toBe('true');
    expect(await getAttribute(allTabs[0], 'aria-selected')).toBe('false');

    await page.keyboard.press('ArrowLeft');
    await waitForStencilLifecycle(page);

    expect(await getAttribute(allTabs[0], 'aria-selected')).toBe('true');
    expect(await getAttribute(allTabs[1], 'aria-selected')).toBe('false');
  });

  it('should render correct active tab on first/last or home/end press', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-tabs-bar active-tab-index="1">
        <button>
          Content1
        </button>
        <button>
          Content2
        </button>
        <button>
          Content3
        </button>
      </p-tabs-bar>
    `
    );
    const allTabs = await getAllTabs();
    const firstButton = allTabs[0];
    const lastButton = allTabs[allTabs.length - 1];

    expect(await getAttribute(firstButton, 'aria-selected')).toBe('false');
    expect(await getAttribute(allTabs[1], 'aria-selected')).toBe('true');
    expect(await getAttribute(lastButton, 'aria-selected')).toBe('false');

    await page.keyboard.press('Tab');
    await page.keyboard.press('End');
    await waitForStencilLifecycle(page);

    expect(await getAttribute(lastButton, 'aria-selected')).toBe('true');
    expect(await getAttribute(firstButton, 'aria-selected')).toBe('false');

    await page.keyboard.press('Home');
    await waitForStencilLifecycle(page);

    expect(await getAttribute(firstButton, 'aria-selected')).toBe('true');
    expect(await getAttribute(lastButton, 'aria-selected')).toBe('false');
  });

  it('should trigger event on button click', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-tabs-bar active-tab-index="1">
        <button>
          Content1
        </button>
        <button>
          Content2
        </button>
        <button>
          Content3
        </button>
      </p-tabs-bar>
    `
    );
    const host = await selectNode(page,'p-tabs-bar');
    const [firstButton, secondButton, thirdButton] = await getAllButtons();
    let eventCounter = 0;
    await addEventListener(host, 'click', () => eventCounter++);

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
});
