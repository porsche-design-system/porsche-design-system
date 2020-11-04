import {
  addEventListener,
  getAttribute,
  getBrowser,
  getProperty,
  initAddEventListener,
  reattachElement,
  selectNode,
  setContentWithDesignSystem,
  waitForStencilLifecycle,
} from '../helpers';
import { Page } from 'puppeteer';
import { CSS_ANIMATION_DURATION, FOCUS_PADDING } from './tabs-bar.e2e';

describe('tabs', () => {
  let page: Page;
  beforeEach(async () => {
    page = await getBrowser().newPage();
    await initAddEventListener(page);
  });
  afterEach(async () => await page.close());

  const getAllTabItems = () => page.$$('p-tabs-item');
  const getTabsBar = () => selectNode(page, 'p-tabs >>> p-tabs-bar');
  const getAllTabs = async () => (await getTabsBar()).$$('button');

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

    const [firstTabItem, secondTabItem] = await getAllTabItems();
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
    const [firstButton, secondButton, thirdButton] = await getAllTabs();

    expect(await getAttribute(firstButton, 'aria-selected')).toBe('false');
    expect(await getAttribute(secondButton, 'aria-selected')).toBe('true');
    expect(await getAttribute(thirdButton, 'aria-selected')).toBe('false');
  });

  it('should render correct content of tab-item on keyboard arrow click', async () => {
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

    const [firstTabItem, secondTabItem] = await getAllTabItems();

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowRight');
    await waitForStencilLifecycle(page);

    expect(await getAttribute(firstTabItem, 'selected')).toBeNull();
    expect(await getAttribute(secondTabItem, 'selected')).toBe('');

    await page.keyboard.press('ArrowLeft');
    await waitForStencilLifecycle(page);

    expect(await getAttribute(firstTabItem, 'selected')).toBe('');
    expect(await getAttribute(secondTabItem, 'selected')).toBeNull();
  });

  it('should trigger event on tab click', async () => {
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
    const host = await selectNode(page, 'p-tabs');
    const [firstButton, secondButton, thirdButton] = await getAllTabs();
    let eventCounter = 0;
    await addEventListener(host, 'click', () => eventCounter++);

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

  it('should render correct scroll-position on keyboard arrow click', async () => {
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
