import { Page } from 'puppeteer';
import {
  addEventListener,
  expectA11yToMatchSnapshot,
  getAttribute,
  getLifecycleStatus,
  initAddEventListener,
  selectNode,
  setContentWithDesignSystem,
  waitForEventSerialization,
  waitForStencilLifecycle,
} from '../helpers';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

type InitOptions = {};

const initCarousel = async (opts?: InitOptions) => {
  const content = `<p-carousel heading="Heading">
  <div>Slide 1</div>
  <div>Slide 2</div>
  <div>Slide 3</div>
</p-carousel>`;

  await setContentWithDesignSystem(page, content);
};

const getHost = () => selectNode(page, 'p-carousel');
const getSplide = () => selectNode(page, 'p-carousel >>> .splide');
const getSplideTrack = () => selectNode(page, 'p-carousel >>> .splide__track');
const getSlide1 = () => selectNode(page, 'p-carousel >>> #splide-slide01');
const getSlide2 = () => selectNode(page, 'p-carousel >>> #splide-slide02');
const getSlide3 = () => selectNode(page, 'p-carousel >>> #splide-slide03');
const getPrevButton = () => selectNode(page, 'p-carousel >>> p-button-pure:first-of-type >>> button');
const getNextButton = () => selectNode(page, 'p-carousel >>> p-button-pure:last-of-type >>> button');
const getPagination = () => selectNode(page, 'p-carousel >>> .pagination');

xit('should update pagination on prev/next button click', async () => {});

xdescribe('adding/removing slides', () => {
  it('should update pagination', async () => {});
  it('should update aria-labels of prev/next buttons', async () => {});
});

xdescribe('viewport change', () => {
  it('should update visible amount of slides for BreakpointCustomizable slidesPerPage', async () => {});
});

xdescribe('focus behavior', () => {});

describe('events', () => {
  beforeEach(async () => await initAddEventListener(page));

  it('should emit carouselChange event on slide change', async () => {
    await initCarousel();
    let eventCounter = 0;
    const host = await getHost();
    const prevButton = await getPrevButton();
    const nextButton = await getNextButton();
    await addEventListener(host, 'carouselChange', () => eventCounter++);
    expect(eventCounter).toBe(0);

    await nextButton.click();
    await waitForEventSerialization(page);
    expect(eventCounter).toBe(1);

    await prevButton.click();
    await waitForEventSerialization(page);
    expect(eventCounter).toBe(2);
  });
});

describe('lifecycle', () => {
  it('should work without unnecessary round trips on init', async () => {
    await initCarousel();
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-carousel'], 'componentDidLoad: p-carousel').toBe(1);
    expect(status.componentDidLoad['p-button-pure'], 'componentDidLoad: p-button-pure').toBe(2);
    expect(status.componentDidLoad['p-text'], 'componentDidLoad: p-text').toBe(2);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(2);

    expect(status.componentDidUpdate['p-button-pure'], 'componentDidUpdate: p-button-pure').toBe(2);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(2);
    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(7);
  });

  it('should work without unnecessary round trips on btn next click', async () => {
    await initCarousel();
    const buttonNext = await getNextButton();
    await buttonNext.click();

    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-button-pure'], 'componentDidUpdate: p-button-pure').toBe(4);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(4);
    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(7);
  });
});

describe('accessibility', () => {
  it('should expose correct initial accessibility tree and aria properties', async () => {
    await initCarousel();
    const buttonPrev = await getPrevButton();
    const buttonNext = await getNextButton();
    const splide = await getSplide();
    const splideTrack = await getSplideTrack();
    const slide1 = await getSlide1();
    const slide2 = await getSlide2();
    const slide3 = await getSlide3();

    await expectA11yToMatchSnapshot(page, buttonPrev, { message: 'buttonPrev' });
    // expect(await getAttribute(buttonPrev, 'aria-controls')).toBe('carousel-panel');
    await expectA11yToMatchSnapshot(page, buttonNext, { message: 'buttonNext' });
    // expect(await getAttribute(buttonNext, 'aria-controls')).toBe('carousel-panel');
    await expectA11yToMatchSnapshot(page, splide, { message: 'splide', interestingOnly: false });

    expect(await getAttribute(splideTrack, 'aria-live')).toBe('polite');
    expect(await getAttribute(splideTrack, 'aria-atomic')).toBe('true');

    expect(await getAttribute(slide1, 'role')).toBe('group');
    expect(await getAttribute(slide1, 'aria-roledescription')).toBe('slide');
    expect(await getAttribute(slide1, 'aria-label')).toBe('1 of 3');

    expect(await getAttribute(slide2, 'role')).toBe('group');
    expect(await getAttribute(slide2, 'aria-roledescription')).toBe('slide');
    expect(await getAttribute(slide2, 'aria-label')).toBe('2 of 3');

    expect(await getAttribute(slide3, 'role')).toBe('group');
    expect(await getAttribute(slide3, 'aria-roledescription')).toBe('slide');
    expect(await getAttribute(slide3, 'aria-label')).toBe('3 of 3');
  });
});
