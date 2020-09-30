import { ElementHandle, Page } from 'puppeteer';
import {
  getAttribute,
  getBrowser,
  getProperty,
  initAddEventListener,
  selectNode,
  setContentWithDesignSystem, waitForStencilLifecycle
} from '../helpers';

describe('tabs-nav', () => {
  let page: Page;
  beforeEach(async () => {
    page = await getBrowser().newPage();
    await initAddEventListener(page);
  });
  afterEach(async () => await page.close());

  const getTabNav = () => selectNode(page, 'p-tabs-nav');
  const getAllAnchorElements = () => page.$$('a');
  const getScrollArea = () => selectNode(page, 'p-tabs-nav >>> .p-tabs-nav__scroll-area');
  const getStatusBar = () => selectNode(page, 'p-tabs-nav >>> .p-tabs-nav__status-bar');
  const getGradientNext = () => selectNode(page, 'p-tabs-nav >>> .p-tabs-nav__gradient--next');
  const getElementPositions = async (element: ElementHandle) => {
    return await page.evaluate((element) => {
      const { top, left, bottom, right } = element.getBoundingClientRect();
      return { top, left, bottom, right };
    }, element);
  };
  const getPrev = async () =>
    (await selectNode(page, 'p-tabs-nav >>> .p-tabs-nav__action--prev')).$('.p-tabs-nav__action--prev > p-button-pure');
  const getNext = async () =>
    (await selectNode(page, 'p-tabs-nav >>> .p-tabs-nav__action--next ')).$('.p-tabs-nav__action--next > p-button-pure');
  const getScrollLeft = (element: ElementHandle) => getProperty(element, 'scrollLeft');

  it('should render', async () => {
    await setContentWithDesignSystem(
      page,
      `
       <p-tabs-nav>
        <a label="Button1" href="#content1">
          Content1
        </a>
        <a label="Button2" href="#content2">
          Content2
        </a>
        <a label="Button3" href="#content3">
          Content3
        </a>
      </p-tabs-nav>
    `
    );
    const tabsNav = await getTabNav();
    const anchorElements = await getAllAnchorElements();

    expect(tabsNav).toBeDefined();
    expect(anchorElements.length).toBe(3);
  });

  it('should render correct active tab if attribute is set ', async () => {
    await setContentWithDesignSystem(
      page,
      `
       <p-tabs-nav active-tab-index="1">
        <a label="Button1" href="#content1">
          Content1
        </a>
        <a label="Button2" href="#content2">
          Content2
        </a>
        <a label="Button3" href="#content3">
          Content3
        </a>
      </p-tabs-nav>
    `
    );
    const allAnchors = await getAllAnchorElements();
    await page.waitFor(40); // class gets set through js, this takes a little time

    expect(await getAttribute(allAnchors[0], 'class')).toBeNull();
    expect(await getAttribute(allAnchors[1], 'class')).toContain('selected');
    expect(await getAttribute(allAnchors[2], 'class')).toBeNull();
  });

  it('should render only one selected tab if multiple selected are set', async () => {
    await setContentWithDesignSystem(
      page,
      `
       <p-tabs-nav active-tab-index="0">
        <a label="Button1" href="#content1">
          Content1
        </a>
        <a selected label="Button2" href="#content2">
          Content2
        </a>
        <a selected label="Button3" href="#content3">
          Content3
        </a>
      </p-tabs-nav>
    `
    );
    const allAnchors = await getAllAnchorElements();
    await page.waitFor(40); // class gets set through js, this takes a little time

    expect(await getAttribute(allAnchors[0], 'class')).toContain('selected');
    expect(await getAttribute(allAnchors[1], 'class')).toBeNull();
    expect(await getAttribute(allAnchors[2], 'class')).toBeNull();
  });

  it('should render scroll 20% on Button next', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <div style="width: 400px">
       <p-tabs-nav size="medium">
          <a label="Button1" href="#content1">
            Content1
          </a>
          <a label="Button2" href="#content2">
            Content2
          </a>
          <a label="Button3" href="#content3">
            Content3
          </a>
           <a label="Button4" href="#content4">
            Content4
          </a>
          <a label="Button5" href="#content5">
            Content5
          </a>
          <a label="Button6" href="#content6">
            Content6
          </a>
           <a label="Button7" href="#content7">
            Content7
          </a>
          <a label="Button8" href="#content8">
            Content8
          </a>
        </p-tabs-nav>
      </div>
    `
    );
    const nextButton = await getNext();
    const scrollArea = await getScrollArea();
    const scrollAreaWidth = await getProperty(scrollArea, 'offsetWidth');
    const scrollDistance = Math.round(+scrollAreaWidth * 0.2);

    expect(await getScrollLeft(scrollArea)).toEqual(0);

    await nextButton.click();
    await waitForStencilLifecycle(page);
    await page.waitFor(1000);

    expect(await getScrollLeft(scrollArea)).toEqual(scrollDistance);

  });

  it('should render scroll 20% on Button prev', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <div style="width: 400px">
       <p-tabs-nav size="medium">
          <a label="Button1" href="#content1">
            Content1
          </a>
          <a label="Button2" href="#content2">
            Content2
          </a>
          <a label="Button3" href="#content3">
            Content3
          </a>
           <a label="Button4" href="#content4">
            Content4
          </a>
          <a label="Button5" href="#content5">
            Content5
          </a>
          <a label="Button6" href="#content6">
            Content6
          </a>
           <a label="Button7" href="#content7">
            Content7
          </a>
          <a label="Button8" href="#content8">
            Content8
          </a>
        </p-tabs-nav>
      </div>
    `
    );
    const nextButton = await getNext();
    const prevButton = await getPrev();
    const scrollArea = await getScrollArea();
    const scrollAreaWidth = await getProperty(scrollArea, 'offsetWidth');
    const scrollDistance = Math.round(+scrollAreaWidth * 0.2);

    expect(await getScrollLeft(scrollArea)).toEqual(0);

    await nextButton.click();
    await waitForStencilLifecycle(page);
    await page.waitFor(1000);

    expect(await getScrollLeft(scrollArea)).toEqual(scrollDistance);

    await nextButton.click();
    await waitForStencilLifecycle(page);
    await page.waitFor(1000);

    expect(await getScrollLeft(scrollArea)).toEqual(scrollDistance * 2);

    await prevButton.click();
    await waitForStencilLifecycle(page);
    await page.waitFor(1000);

    expect(await getScrollLeft(scrollArea)).toEqual(scrollDistance);

  });

  it('should render correct scroll-position on selected tab', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <div style="width: 400px">
       <p-tabs-nav active-tab-index="3" size="medium">
          <a label="Button1" href="#content1">
            Content1
          </a>
          <a label="Button2" href="#content2">
            Content2
          </a>
          <a label="Button3" href="#content3">
            Content3
          </a>
           <a label="Button4" href="#content4">
            Content4
          </a>
          <a label="Button5" href="#content5">
            Content5
          </a>
          <a label="Button6" href="#content6">
            Content6
          </a>
           <a label="Button7" href="#content7">
            Content7
          </a>
          <a label="Button8" href="#content8">
            Content8
          </a>
        </p-tabs-nav>
      </div>
    `
    );
    const allAnchors = await getAllAnchorElements();
    const selectedTabOffset = await getProperty(allAnchors[3], 'offsetLeft');
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
       <p-tabs-nav size="medium">
          <a label="Button1" href="#content1">
            Content1
          </a>
          <a label="Button2" href="#content2">
            Content2
          </a>
          <a label="Button3" href="#content3">
            Content3
          </a>
           <a label="Button4">
            Content4
          </a>
          <a label="Button5">
            Content5
          </a>
          <a label="Button6" href="#content6">
            Content6
          </a>
           <a label="Button7" href="#content7">
            Content7
          </a>
          <a label="Button8" href="#content8">
            Content8
          </a>
        </p-tabs-nav>
      </div>
    `
    );
    const allAnchors = await getAllAnchorElements();
    const gradient = await getGradientNext();
    const gradientWidth = await getProperty(gradient, 'offsetWidth');
    const scrollArea = await getScrollArea();
    const scrollAreaWidth = await getProperty(scrollArea, 'offsetWidth');

    expect(await getScrollLeft(scrollArea)).toEqual(0);

    await allAnchors[4].click();
    await waitForStencilLifecycle(page);
    await page.waitFor(1000);

    const tab3offset = await getProperty(allAnchors[4], 'offsetLeft');
    const scrollDistanceRight = +tab3offset - +gradientWidth;
    expect(await getScrollLeft(scrollArea)).toEqual(scrollDistanceRight);

    await allAnchors[3].click();
    await waitForStencilLifecycle(page);
    await page.waitFor(1000);

    const tab2offset = await getProperty(allAnchors[3], 'offsetLeft');
    const tabWidth = await getProperty(allAnchors[3], 'offsetWidth');
    const scrollDistanceLeft = +tab2offset + +tabWidth + +gradientWidth - +scrollAreaWidth;
    expect(await getScrollLeft(scrollArea)).toEqual(scrollDistanceLeft);
  });

  it('should render same offsetLeft on Statusbar and active tab', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <div style="width: 400px">
       <p-tabs-nav active-tab-index="2" size="medium">
          <a label="Button1">
            Content1
          </a>
          <a label="Button2" href="#content2">
            Content2
          </a>
          <a label="Button3" href="#content3">
            Content3
          </a>
        </p-tabs-nav>
      </div>
    `
    );
    const allAnchors = await getAllAnchorElements();
    const statusBar = await getStatusBar();
    const tab3Position = (await getElementPositions(allAnchors[2])).left;

    expect(Math.round(tab3Position)).toEqual((await getElementPositions(statusBar)).left);

    await allAnchors[0].click();
    await waitForStencilLifecycle(page);
    await page.waitFor(1000);

    expect((await getElementPositions(allAnchors[0])).left).toEqual((await getElementPositions(statusBar)).left);
  });
});
