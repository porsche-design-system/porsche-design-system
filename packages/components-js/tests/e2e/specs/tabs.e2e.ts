import { getBrowser, initAddEventListener, selectNode, setContentWithDesignSystem } from '../helpers';
import { Page } from 'puppeteer';

fdescribe('tabs', () => {
  let page: Page;
  beforeEach(async () => {
    page = await getBrowser().newPage();
    await initAddEventListener(page);
  });
  afterEach(async () => await page.close());

  const getTabs = () => selectNode(page, 'p-tabs');
  const getTabItems = () => page.$$('p-tab-item');

  it('should render', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-tabs>
        <p-tab-item>
          Content1
        </p-tab-item>
        <p-tab-item>
          Content2
        </p-tab-item>
        <p-tab-item>
          Content3
        </p-tab-item>
      </p-tabs>
    `
    );
    const tabs = await getTabs();
    const tabItems = await getTabItems();

    console.log(JSON.stringify(await getTabItems()));

    expect(tabs).toBeDefined();
    expect(tabItems).toBeDefined();
  });

  it('should render correct content of tab-item on click', async () => {});
  it('should render buttons and a tags', async () => {});
  it('should update buttons when tab is added', async () => {});
  it('should update buttons when tab is removed', async () => {});
  it('should update buttons when tab label/href/target is changed', async () => {});
  it('should render correct tab-item when active-tab is set', async () => {});
  it('should behave correctly when activeTab index is negative or larger than amount of tabs', async () => {});
  it('should behave correctly when multiple tabs have selected attribute', async () => {});
  it('should behave correctly when activeTab index is used together with selected attribute on tab', async () => {});
});
