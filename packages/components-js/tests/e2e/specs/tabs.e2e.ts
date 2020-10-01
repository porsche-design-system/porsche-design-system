import {
  getAttribute,
  getBrowser, getElementPositions,
  getProperty,
  initAddEventListener,
  selectNode,
  setContentWithDesignSystem,
  waitForStencilLifecycle
} from '../helpers';
import { ElementHandle, Page } from 'puppeteer';

export const TABS_SCROLL_PERCENTAGE = 0.2;
export const CSS_ANIMATION_DURATION = 1000;

describe('tabs', () => {
  let page: Page;
  beforeEach(async () => {
    page = await getBrowser().newPage();
    await initAddEventListener(page);
  });
  afterEach(async () => await page.close());

  const getAllTabItems = () => page.$$('p-tabs-item');
  const getScrollArea = () => selectNode(page, 'p-tabs >>> .p-tabs__scroll-area');
  const getAllTabs = async () => (await getScrollArea()).$$('.p-tabs__tab');
  const getStatusBar = () => selectNode(page, 'p-tabs >>> .p-tabs__status-bar');
  const getGradientNext = () => selectNode(page, 'p-tabs >>> .p-tabs__gradient--next');
  const getPrevButton = async () =>
    (await selectNode(page, 'p-tabs >>> .p-tabs__action--prev')).$('.p-tabs__action--prev > p-button-pure');
  const getNextButton = async () =>
    (await selectNode(page, 'p-tabs >>> .p-tabs__action--next ')).$('.p-tabs__action--next > p-button-pure');
  const getScrollLeft = (element: ElementHandle) => getProperty(element, 'scrollLeft');

  it('should render', async () => {
    await setContentWithDesignSystem(
      page,
      `
       <p-tabs>
        <p-tabs-item label="Button1">
          Content1
        </p-tabs-item>
        <p-tabs-item label="Button2">
          Content2
        </p-tabs-item>
        <p-tabs-item label="Button3">
          Content3
        </p-tabs-item>
      </p-tabs>
    `
    );
    const allTabs = await getAllTabs();

    expect(allTabs.length).toBe(3);
  });

  it('should render correct content of tab-item on click', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-tabs>
        <p-tabs-item label="Button1">
          Content1
        </p-tabs-item>
        <p-tabs-item label="Button2">
          Content2
        </p-tabs-item>
        <p-tabs-item label="Button3">
          Content3
        </p-tabs-item>
      </p-tabs>
    `
    );

    const allTabItems = await getAllTabItems();
    const firstTabItem = allTabItems[0];
    const secondTabItem = allTabItems[1];
    const allTabs = await getAllTabs();

    expect(await getAttribute(firstTabItem, 'selected')).toBe('');
    expect(await getAttribute(secondTabItem, 'selected')).toBeNull();

    await allTabs[1].click();
    await waitForStencilLifecycle(page);

    expect(await getAttribute(firstTabItem, 'selected')).toBeNull();
    expect(await getAttribute(secondTabItem, 'selected')).toBe('');
  });

  it('should render updated tabs when tab label is changed', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-tabs>
        <p-tabs-item label="Button1">
          Content1
        </p-tabs-item>
        <p-tabs-item label="Button2">
          Content2
        </p-tabs-item>
        <p-tabs-item label="Button3" target="_blank">
          Content3
        </p-tabs-item>
      </p-tabs>
    `
    );
    const allTabsItems = await getAllTabItems();
    const allTabs = await getAllTabs();
    const getLabelOfFirstButton = () => getProperty(allTabs[0], 'innerHTML');
    const getLabelOfFirstTabItem = () => getProperty(allTabsItems[0], 'label');

    expect(await getLabelOfFirstButton()).toBe(await getLabelOfFirstTabItem());

    await allTabsItems[0].evaluate((el) => el.setAttribute('label', 'newButtonName'));
    await waitForStencilLifecycle(page);

    expect(await getLabelOfFirstButton()).toBe(await getLabelOfFirstTabItem());
  });

  it('should render correct tab when selected attribute is set', async () => {
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

  it('should render correct selected tab when multiple tabs have selected attribute', async () => {
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
    const allTabs = await getAllTabs();
    const firstButton = allTabs[0];
    const secondButton = allTabs[1];
    const thirdButton = allTabs[2];

    expect(await getAttribute(firstButton, 'aria-selected')).toBe('false');
    expect(await getAttribute(secondButton, 'aria-selected')).toBe('true');
    expect(await getAttribute(thirdButton, 'aria-selected')).toBe('false');
  });

  it('should render focus on selected tab on keyboard "tab" click', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-tabs>
        <p-tabs-item label="Button1">
          Content1
        </p-tabs-item>
        <p-tabs-item label="Button2">
          Content2
        </p-tabs-item>
        <p-tabs-item label="Button3">
          Content3
        </p-tabs-item>
      </p-tabs>
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
      <p-tabs>
        <p-tabs-item label="Button1">
          Content1 <a href="porsche.com">Link</a>
        </p-tabs-item>
        <p-tabs-item label="Button2">
          Content2
        </p-tabs-item>
        <p-tabs-item label="Button3">
          Content3
        </p-tabs-item>
      </p-tabs>
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
      <p-tabs>
        <p-tabs-item label="Button1">
          Content1
        </p-tabs-item>
        <p-tabs-item label="Button2">
          Content2
        </p-tabs-item>
        <p-tabs-item label="Button3">
          Content3
        </p-tabs-item>
      </p-tabs>
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
      <p-tabs>
        <p-tabs-item label="Button1">
          Content1
        </p-tabs-item>
        <p-tabs-item selected label="Button2">
          Content2
        </p-tabs-item>
        <p-tabs-item label="Button3">
          Content3
        </p-tabs-item>
      </p-tabs>
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

  it('should render scroll 20% on Button next', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <div style="width: 400px">
        <p-tabs size="medium">
          <p-tabs-item label="Button1">
            Content1
          </p-tabs-item>
          <p-tabs-item label="Button2">
            Content2
          </p-tabs-item>
          <p-tabs-item label="Button3">
            Content3
          </p-tabs-item>
          <p-tabs-item label="Button4">
            Content4
          </p-tabs-item>
          <p-tabs-item label="Button5">
            Content5
          </p-tabs-item>
          <p-tabs-item label="Button6">
            Content6
          </p-tabs-item>
          <p-tabs-item label="Button7">
            Content7
          </p-tabs-item>
          <p-tabs-item label="Button8">
            Content8
          </p-tabs-item>
        </p-tabs>
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
        <p-tabs size="medium">
          <p-tabs-item label="Button1">
            Content1
          </p-tabs-item>
          <p-tabs-item label="Button2">
            Content2
          </p-tabs-item>
          <p-tabs-item label="Button3">
            Content3
          </p-tabs-item>
          <p-tabs-item label="Button4">
            Content4
          </p-tabs-item>
          <p-tabs-item label="Button5">
            Content5
          </p-tabs-item>
          <p-tabs-item label="Button6">
            Content6
          </p-tabs-item>
          <p-tabs-item label="Button7">
            Content7
          </p-tabs-item>
          <p-tabs-item label="Button8">
            Content8
          </p-tabs-item>
        </p-tabs>
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
        <p-tabs size="medium">
          <p-tabs-item label="Button1">
            Content1
          </p-tabs-item>
          <p-tabs-item label="Button2">
            Content2
          </p-tabs-item>
          <p-tabs-item label="Button3">
            Content3
          </p-tabs-item>
          <p-tabs-item selected label="Button4">
            Content4
          </p-tabs-item>
          <p-tabs-item label="Button5">
            Content5
          </p-tabs-item>
          <p-tabs-item label="Button6">
            Content6
          </p-tabs-item>
          <p-tabs-item label="Button7">
            Content7
          </p-tabs-item>
          <p-tabs-item label="Button8">
            Content8
          </p-tabs-item>
        </p-tabs>
      </div>
    `
    );

    const allTabs = await getAllTabs();
    const selectedTabOffset = await getProperty(allTabs[3], 'offsetLeft');
    const gradient = await getGradientNext();
    const gradientWidth = await getProperty(gradient, 'offsetWidth');
    const scrollArea = await getScrollArea();
    const scrollDistance = +selectedTabOffset - +gradientWidth;

    await waitForStencilLifecycle(page);

    expect(await getScrollLeft(scrollArea)).toEqual(scrollDistance);
  });

  it('should render correct scroll position on tab click', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <div style="width: 400px">
        <p-tabs size="medium">
          <p-tabs-item label="Button1">
            Content1
          </p-tabs-item>
          <p-tabs-item label="Button2">
            Content2
          </p-tabs-item>
          <p-tabs-item label="Button3">
            Content3
          </p-tabs-item>
          <p-tabs-item label="Button4">
            Content4
          </p-tabs-item>
          <p-tabs-item label="Button5">
            Content5
          </p-tabs-item>
          <p-tabs-item label="Button6">
            Content6
          </p-tabs-item>
          <p-tabs-item label="Button7">
            Content7
          </p-tabs-item>
          <p-tabs-item label="Button8">
            Content8
          </p-tabs-item>
        </p-tabs>
      </div>
    `
    );

    const allTabs = await getAllTabs();
    const gradient = await getGradientNext();
    const gradientWidth = await getProperty(gradient, 'offsetWidth');
    const scrollArea = await getScrollArea();
    const scrollAreaWidth = await getProperty(scrollArea, 'offsetWidth');

    expect(await getScrollLeft(scrollArea)).toEqual(0);

    await allTabs[4].click();
    await waitForStencilLifecycle(page);
    await page.waitFor(CSS_ANIMATION_DURATION);

    const tab3offset = await getProperty(allTabs[4], 'offsetLeft');
    const scrollDistanceRight = +tab3offset - +gradientWidth;
    expect(await getScrollLeft(scrollArea)).toEqual(scrollDistanceRight);

    await allTabs[3].click();
    await waitForStencilLifecycle(page);
    await page.waitFor(CSS_ANIMATION_DURATION);

    const tab2offset = await getProperty(allTabs[3], 'offsetLeft');
    const tabWidth = await getProperty(allTabs[3], 'offsetWidth');
    const scrollDistanceLeft = +tab2offset + +tabWidth + +gradientWidth - +scrollAreaWidth;
    expect(await getScrollLeft(scrollArea)).toEqual(scrollDistanceLeft);
  });

  it('should render same offsetLeft on Statusbar and active tab', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-tabs>
        <p-tabs-item label="Button1">
          Content1
        </p-tabs-item>
        <p-tabs-item label="Button2">
          Content2
        </p-tabs-item>
        <p-tabs-item selected label="Button3">
          Content3
        </p-tabs-item>
      </p-tabs>
    `
    );
    const allTabs = await getAllTabs();
    const statusBar = await getStatusBar();
    const tab3Position = (await getElementPositions(page, allTabs[2])).left;

    expect(Math.round(tab3Position)).toEqual((await getElementPositions(page, statusBar)).left);

    await allTabs[0].click();
    await waitForStencilLifecycle(page);
    await page.waitFor(CSS_ANIMATION_DURATION);

    expect((await getElementPositions(page, allTabs[0])).left).toEqual((await getElementPositions(page, statusBar)).left);
  });
});
