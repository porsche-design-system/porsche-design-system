import {
  getAttribute,
  getBrowser,
  getProperty,
  initAddEventListener,
  selectNode,
  setContentWithDesignSystem,
  waitForStencilLifecycle
} from '../helpers';
import { Page } from 'puppeteer';

fdescribe('tabs', () => {
  let page: Page;
  beforeEach(async () => {
    page = await getBrowser().newPage();
    await initAddEventListener(page);
  });
  afterEach(async () => await page.close());

  const getTab = () => selectNode(page, 'p-tabs');
  const getAllTabItems = () => page.$$('p-tabs-item');
  const getNav = () => selectNode(page, 'p-tabs >>> nav');
  const getAllButtons = async () => (await getNav()).$$('.p-tabs__button');

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
    const tabs = await getTab();
    const tabItems = await getAllTabItems();

    expect(tabs).toBeDefined();
    expect(tabItems.length).toBe(3);
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
    const allButtons = await getAllButtons();

    expect(await getAttribute(firstTabItem, 'selected')).toBe('');
    expect(await getAttribute(secondTabItem, 'selected')).toBeNull();

    await allButtons[1].click();
    await waitForStencilLifecycle(page);

    expect(await getAttribute(firstTabItem, 'selected')).toBeNull();
    expect(await getAttribute(secondTabItem, 'selected')).toBe('');
  });

  it('should render buttons and a tags', async () => {
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
        <p-tabs-item label="Button3" href="https://porsche.com">
          Content3
        </p-tabs-item>
      </p-tabs>
    `
    );
    const allButtons = await getAllButtons();

    expect(allButtons.length).toBe(3);
  });

  it('should update buttons when tab-item is added', async () => {
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
    const tabsElement = await getTab();
    const buttonsInitial = await getAllButtons();
    expect(buttonsInitial.length).toBe(3);

    await tabsElement.evaluate((el) => {
      const tabsItem = document.createElement('p-tabs-item');
      (tabsItem as any).label = 'NewContent';
      el.appendChild(tabsItem);
    });

    await waitForStencilLifecycle(page);
    const buttonsUpdated = await getAllButtons();
    expect(buttonsUpdated.length).toBe(4);
  });

  it('should update buttons when tabs-item is removed', async () => {
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

    const tabsElement = await getTab();
    const buttonsInitial = await getAllButtons();
    expect(buttonsInitial.length).toBe(3);

    await tabsElement.evaluate((el) => {
      const tabItem = document.querySelector('p-tabs-item[label="Button3"]');
      el.removeChild(tabItem);
    });

    await waitForStencilLifecycle(page);
    const buttonsUpdated = await getAllButtons();
    expect(buttonsUpdated.length).toBe(2);
  });

  it('should update buttons when tab label/href/target is changed', async () => {
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
        <p-tabs-item label="Button3" href="https://porsche.com" target="_blank">
          Content3
        </p-tabs-item>
      </p-tabs>
    `
    );
    const allTabsItems = await getAllTabItems();
    const allButtons = await getAllButtons();
    const anchor = allButtons[2];
    const getLabelOfFirstButton = () => getProperty(allButtons[0], 'innerHTML');
    const getHrefOfAnchor = () => getAttribute(anchor, 'href');
    const getTargetOfAnchor = () => getAttribute(anchor, 'target');

    expect(await getLabelOfFirstButton()).toBe('Button1');
    expect(await getHrefOfAnchor()).toBe('https://porsche.com');
    expect(await getTargetOfAnchor()).toBe('_blank');

    await allTabsItems[0].evaluate((el) => el.setAttribute('label', 'newButtonName'));
    await anchor.evaluate((el) => el.setAttribute('href', 'https://newHref.com'));
    await anchor.evaluate((el) => el.setAttribute('target', '_self'));
    await waitForStencilLifecycle(page);

    expect(await getLabelOfFirstButton()).toBe('newButtonName');
    expect(await getHrefOfAnchor()).toBe('https://newHref.com');
    expect(await getTargetOfAnchor()).toBe('_self');
  });

  it('should render correct tab-item when active-tab is set', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-tabs active-tab="1">
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
    const thirdTabItem = allTabItems[2];

    expect(await getAttribute(firstTabItem, 'selected')).toBeNull();
    expect(await getAttribute(secondTabItem, 'selected')).toBe('');
    expect(await getAttribute(thirdTabItem, 'selected')).toBeNull();
  });

  it('should behave correctly when activeTab index is negative', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-tabs active-tab="-1">
        <p-tabs-item label="Button1">
          Content1
        </p-tabs-item>
        <p-tabs-item label="Button2">
          Content2
        </p-tabs-item>
        <p-tabs-item label="Button3" selected>
          Content3
        </p-tabs-item>
      </p-tabs>
    `
    );
    const allTabItems = await getAllTabItems();
    const firstTabItem = allTabItems[0];
    const secondTabItem = allTabItems[1];
    const thirdTabItem = allTabItems[2];

    expect(await getAttribute(firstTabItem, 'selected')).toBe('');
    expect(await getAttribute(secondTabItem, 'selected')).toBeNull();
    expect(await getAttribute(thirdTabItem, 'selected')).toBeNull();
  });

  it('should behave correctly when activeTab index is larger than amount of tabs', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-tabs active-tab="4">
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
    const thirdTabItem = allTabItems[2];

    expect(await getAttribute(firstTabItem, 'selected')).toBeNull();
    expect(await getAttribute(secondTabItem, 'selected')).toBeNull();
    expect(await getAttribute(thirdTabItem, 'selected')).toBe('');
  });

  it('should behave correctly when multiple tabs have selected attribute', async () => {
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
    const allTabItems = await getAllTabItems();
    const firstTabItem = allTabItems[0];
    const secondTabItem = allTabItems[1];
    const thirdTabItem = allTabItems[2];

    expect(await getAttribute(firstTabItem, 'selected')).toBeNull();
    expect(await getAttribute(secondTabItem, 'selected')).toBe('');
    expect(await getAttribute(thirdTabItem, 'selected')).toBeNull();
  });

  it('should behave correctly when activeTab index is used together with selected attribute on tab', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-tabs active-tab="0">
        <p-tabs-item label="Button1">
          Content1
        </p-tabs-item>
        <p-tabs-item label="Button2">
          Content2
        </p-tabs-item>
        <p-tabs-item label="Button3" selected>
          Content3
        </p-tabs-item>
      </p-tabs>
    `
    );
    const allTabItems = await getAllTabItems();
    const firstTabItem = allTabItems[0];
    const secondTabItem = allTabItems[1];
    const thirdTabItem = allTabItems[2];

    expect(await getAttribute(firstTabItem, 'selected')).toBe('');
    expect(await getAttribute(secondTabItem, 'selected')).toBeNull();
    expect(await getAttribute(thirdTabItem, 'selected')).toBeNull();
  });
});
