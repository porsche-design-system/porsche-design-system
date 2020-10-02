import {
  getAttribute,
  getBrowser,
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

    expect(await getAttribute(firstButton, 'class')).toBeNull();
    expect(await getAttribute(secondButton, 'class')).toContain('selected');
    expect(await getAttribute(thirdButton, 'class')).toBeNull();
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

    expect(await getAttribute(firstButton, 'class')).toBeNull();
    expect(await getAttribute(secondButton, 'class')).toContain('selected');
    expect(await getAttribute(thirdButton, 'class')).toBeNull();
  });
});
