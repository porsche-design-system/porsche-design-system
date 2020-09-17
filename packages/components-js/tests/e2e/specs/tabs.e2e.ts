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
  const getStatusBar = () => selectNode(page, 'p-tabs >>> .p-tabs__status');
  const getElementPositions = async (element: ElementHandle) => {
    return await page.evaluate((element) => {
      const { top, left, bottom, right } = element.getBoundingClientRect();
      return { top, left, bottom, right };
    }, element);
  };
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

  it('should scroll 20% on Button next', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <div style="width: 400px">
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
          <p-tabs-item label="Button4">
            Content4
          </p-tabs-item>
          <p-tabs-item label="Button5">
            Content5
          </p-tabs-item>
          <p-tabs-item label="Button6">
            Content6
          </p-tabs-item>
        </p-tabs>
      </div>
    `
    );
    const nextButton = await getNextButton();
    const nav = await getNav();
    const width = await getProperty(nav, 'offsetWidth');
    const scrollDistance = +width * 0.2;

    expect(await getScrollLeft(nav)).toEqual(0);

    await nextButton.click();
    await waitForStencilLifecycle(page);
    await page.waitFor(1000);

    expect(await getScrollLeft(nav)).toEqual(scrollDistance);
  });

  it('should scroll 20% on Button prev', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <div style="width: 400px">
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
          <p-tabs-item label="Button4">
            Content4
          </p-tabs-item>
          <p-tabs-item label="Button5">
            Content5
          </p-tabs-item>
          <p-tabs-item label="Button6">
            Content6
          </p-tabs-item>
        </p-tabs>
      </div>
    `
    );

    const nextButton = await getNextButton();
    const prevButton = await getPrevButton();
    const nav = await getNav();
    const width = await getProperty(nav, 'offsetWidth');
    const scrollDistance = +width * 0.2;

    expect(await getScrollLeft(nav)).toEqual(0);

    await nextButton.click();
    await waitForStencilLifecycle(page);
    await page.waitFor(1000);

    expect(await getScrollLeft(nav)).toEqual(scrollDistance);

    await nextButton.click();
    await waitForStencilLifecycle(page);
    await page.waitFor(1000);

    expect(await getScrollLeft(nav)).toEqual(scrollDistance * 2);

    await prevButton.click();
    await waitForStencilLifecycle(page);
    await page.waitFor(1000);

    expect(await getScrollLeft(nav)).toEqual(scrollDistance);
  });

  it('should have same offsetLeft on Statusbar and active tab', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-tabs active-tab="0">
        <p-tabs-item label="Button1" id="firstButton">
          Content1
        </p-tabs-item>
        <p-tabs-item label="Button2" id="secondButton">
          Content2
        </p-tabs-item>
        <p-tabs-item label="Button3" selected>
          Content3
        </p-tabs-item>
      </p-tabs>
    `
    );
    const allButtons = await getAllButtons();
    const statusBar = await getStatusBar();

    expect((await getElementPositions(allButtons[0])).left).toEqual((await getElementPositions(statusBar)).left);

    await allButtons[2].click();
    await waitForStencilLifecycle(page);
    await page.waitFor(1000);

    expect(Math.round((await getElementPositions(allButtons[2])).left)).toEqual(
      (await getElementPositions(statusBar)).left
    );
  });
});
