import { ElementHandle, Page } from 'puppeteer';
import {
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

  const getAllAnchorElements = () => page.$$('a');
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
        <a href="#content1">
          Content1
        </a>
        <a href="#content2">
          Content2
        </a>
        <a href="#content3">
          Content3
        </a>
      </p-tabs-bar>
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
       <p-tabs-bar active-tab-index="0">
        <a href="#content1">
          Content1
        </a>
        <a selected href="#content2">
          Content2
        </a>
        <a selected href="#content3">
          Content3
        </a>
      </p-tabs-bar>
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
       <p-tabs-bar size="medium">
          <a href="#content1">
            Content1
          </a>
          <a href="#content2">
            Content2
          </a>
          <a href="#content3">
            Content3
          </a>
           <a href="#content4">
            Content4
          </a>
          <a href="#content5">
            Content5
          </a>
          <a href="#content6">
            Content6
          </a>
           <a href="#content7">
            Content7
          </a>
          <a href="#content8">
            Content8
          </a>
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
          <a href="#content1">
            Content1
          </a>
          <a href="#content2">
            Content2
          </a>
          <a href="#content3">
            Content3
          </a>
           <a href="#content4">
            Content4
          </a>
          <a href="#content5">
            Content5
          </a>
          <a href="#content6">
            Content6
          </a>
           <a href="#content7">
            Content7
          </a>
          <a href="#content8">
            Content8
          </a>
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
          <a href="#content1">
            Content1
          </a>
          <a href="#content2">
            Content2
          </a>
          <a href="#content3">
            Content3
          </a>
           <a href="#content4">
            Content4
          </a>
          <a href="#content5">
            Content5
          </a>
          <a href="#content6">
            Content6
          </a>
           <a href="#content7">
            Content7
          </a>
          <a href="#content8">
            Content8
          </a>
        </p-tabs-bar>
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
       <p-tabs-bar size="medium">
          <a href="#content1">
            Content1
          </a>
          <a href="#content2">
            Content2
          </a>
          <a href="#content3">
            Content3
          </a>
           <a>
            Content4
          </a>
          <a>
            Content5
          </a>
          <a href="#content6">
            Content6
          </a>
           <a href="#content7">
            Content7
          </a>
          <a href="#content8">
            Content8
          </a>
        </p-tabs-bar>
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
    await page.waitFor(CSS_ANIMATION_DURATION);

    const tab3offset = await getProperty(allAnchors[4], 'offsetLeft');
    const scrollDistanceRight = +tab3offset - +gradientWidth;
    expect(await getScrollLeft(scrollArea)).toEqual(scrollDistanceRight);

    await allAnchors[3].click();
    await waitForStencilLifecycle(page);
    await page.waitFor(CSS_ANIMATION_DURATION);

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
       <p-tabs-bar active-tab-index="2" size="medium">
          <a>
            Content1
          </a>
          <a href="#content2">
            Content2
          </a>
          <a href="#content3">
            Content3
          </a>
        </p-tabs-bar>
      </div>
    `
    );
    const allAnchors = await getAllAnchorElements();
    const statusBar = await getStatusBar();
    const tab3Position = (await getElementPositions(page, allAnchors[2])).left;

    expect(Math.round(tab3Position)).toEqual((await getElementPositions(page, statusBar)).left);

    await allAnchors[0].click();
    await waitForStencilLifecycle(page);
    await page.waitFor(CSS_ANIMATION_DURATION);

    expect((await getElementPositions(page, allAnchors[0])).left).toEqual(
      (await getElementPositions(page, statusBar)).left
    );
  });
});
