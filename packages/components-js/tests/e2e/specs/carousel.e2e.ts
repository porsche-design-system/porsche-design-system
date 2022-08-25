import type { ElementHandle, Page } from 'puppeteer';
import {
  addEventListener,
  expectA11yToMatchSnapshot,
  getAttribute,
  getCssClasses,
  getLifecycleStatus,
  initAddEventListener,
  reattachElementHandle,
  selectNode,
  setContentWithDesignSystem,
  waitForComponentsReady,
  waitForEventSerialization,
  waitForStencilLifecycle,
} from '../helpers';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

type InitOptions = {
  amountOfSlides?: number;
};

const initCarousel = async (opts?: InitOptions) => {
  const { amountOfSlides = 3 } = opts || {};

  const slides = Array.from(Array(amountOfSlides))
    .map((_, i) => `<div>Slide ${i + 1}</div>`)
    .join('\n  ');

  const content = `<p-carousel heading="Heading">
  ${slides}
</p-carousel>`;

  await setContentWithDesignSystem(page, content);
};

const getHost = () => selectNode(page, 'p-carousel');
const getSplide = () => selectNode(page, 'p-carousel >>> .splide');
const getSplideTrack = () => selectNode(page, 'p-carousel >>> .splide__track');
const getSlides = async () => (await selectNode(page, 'p-carousel >>> .splide')).$$('.splide__slide');
// const getSlide = (index: number) => selectNode(page, `p-carousel >>> #splide-slide0${index}`);
// const getSlide1 = () => selectNode(page, 'p-carousel >>> #splide-slide01');
// const getSlide2 = () => selectNode(page, 'p-carousel >>> #splide-slide02');
// const getSlide3 = () => selectNode(page, 'p-carousel >>> #splide-slide03');
const getPrevButtonPure = () => selectNode(page, 'p-carousel >>> p-button-pure:first-of-type');
const getNextButtonPure = () => selectNode(page, 'p-carousel >>> p-button-pure:last-of-type');
const getPrevButton = () => selectNode(page, 'p-carousel >>> p-button-pure:first-of-type >>> button');
const getNextButton = () => selectNode(page, 'p-carousel >>> p-button-pure:last-of-type >>> button');
const getPagination = () => selectNode(page, 'p-carousel >>> .pagination');
const getPaginationBullets = async () => (await getPagination()).$$('span');

const waitForSlideToBeActive = (slide: ElementHandle) =>
  page.waitForFunction((el) => el.classList.contains('is-active'), {}, slide);

it('should move slides on prev button clicks', async () => {
  await initCarousel();
  const buttonPrev = await getPrevButton();
  const [slide1, slide2, slide3] = await getSlides();

  expect(await slide1.isIntersectingViewport()).toBe(true);
  expect(await slide2.isIntersectingViewport()).toBe(false);
  expect(await slide3.isIntersectingViewport()).toBe(false);

  await buttonPrev.click();
  await waitForSlideToBeActive(slide3);
  expect(await slide1.isIntersectingViewport()).toBe(false);
  expect(await slide2.isIntersectingViewport()).toBe(false);
  expect(await slide3.isIntersectingViewport()).toBe(true);

  await buttonPrev.click();
  await waitForSlideToBeActive(slide2);
  expect(await slide1.isIntersectingViewport()).toBe(false);
  expect(await slide2.isIntersectingViewport()).toBe(true);
  expect(await slide3.isIntersectingViewport()).toBe(false);

  await buttonPrev.click();
  await waitForSlideToBeActive(slide1);
  expect(await slide1.isIntersectingViewport()).toBe(true);
  expect(await slide2.isIntersectingViewport()).toBe(false);
  expect(await slide3.isIntersectingViewport()).toBe(false);
});

it('should move slides on next button clicks', async () => {
  await initCarousel();
  const buttonNext = await getNextButton();
  const [slide1, slide2, slide3] = await getSlides();

  expect(await slide1.isIntersectingViewport()).toBe(true);
  expect(await slide2.isIntersectingViewport()).toBe(false);
  expect(await slide3.isIntersectingViewport()).toBe(false);

  await buttonNext.click();
  await waitForSlideToBeActive(slide2);
  expect(await slide1.isIntersectingViewport()).toBe(false);
  expect(await slide2.isIntersectingViewport()).toBe(true);
  expect(await slide3.isIntersectingViewport()).toBe(false);

  await buttonNext.click();
  await waitForSlideToBeActive(slide3);
  expect(await slide1.isIntersectingViewport()).toBe(false);
  expect(await slide2.isIntersectingViewport()).toBe(false);
  expect(await slide3.isIntersectingViewport()).toBe(true);

  await buttonNext.click();
  await waitForSlideToBeActive(slide1);
  expect(await slide1.isIntersectingViewport()).toBe(true);
  expect(await slide2.isIntersectingViewport()).toBe(false);
  expect(await slide3.isIntersectingViewport()).toBe(false);
});

it('should update pagination on prev button clicks', async () => {
  await initCarousel();
  const buttonPrev = await getPrevButton();
  const pagination = await getPagination();
  const [bullet1, bullet2, bullet3] = await getPaginationBullets();

  expect(await getCssClasses(bullet1)).toBe('bullet bullet--active');
  expect(await getCssClasses(bullet2)).toBe('bullet');
  expect(await getCssClasses(bullet3)).toBe('bullet');

  await buttonPrev.click();
  expect(await getCssClasses(bullet1)).toBe('bullet');
  expect(await getCssClasses(bullet2)).toBe('bullet');
  expect(await getCssClasses(bullet3)).toBe('bullet bullet--active');

  await buttonPrev.click();
  expect(await getCssClasses(bullet1)).toBe('bullet');
  expect(await getCssClasses(bullet2)).toBe('bullet bullet--active');
  expect(await getCssClasses(bullet3)).toBe('bullet');

  await buttonPrev.click();
  expect(await getCssClasses(bullet1)).toBe('bullet bullet--active');
  expect(await getCssClasses(bullet2)).toBe('bullet');
  expect(await getCssClasses(bullet3)).toBe('bullet');
});

it('should update pagination on next button clicks', async () => {
  await initCarousel();
  const buttonNext = await getNextButton();
  const pagination = await getPagination();
  const [bullet1, bullet2, bullet3] = await getPaginationBullets();

  expect(await getCssClasses(bullet1)).toBe('bullet bullet--active');
  expect(await getCssClasses(bullet2)).toBe('bullet');
  expect(await getCssClasses(bullet3)).toBe('bullet');

  await buttonNext.click();
  expect(await getCssClasses(bullet1)).toBe('bullet');
  expect(await getCssClasses(bullet2)).toBe('bullet bullet--active');
  expect(await getCssClasses(bullet3)).toBe('bullet');

  await buttonNext.click();
  expect(await getCssClasses(bullet1)).toBe('bullet');
  expect(await getCssClasses(bullet2)).toBe('bullet');
  expect(await getCssClasses(bullet3)).toBe('bullet bullet--active');

  await buttonNext.click();
  expect(await getCssClasses(bullet1)).toBe('bullet bullet--active');
  expect(await getCssClasses(bullet2)).toBe('bullet');
  expect(await getCssClasses(bullet3)).toBe('bullet');
});

it('should have working pagination and prev/next buttons after reconnect', async () => {
  await initCarousel();
  const host = await getHost();
  const buttonPrev = await getPrevButton();
  const buttonNext = await getNextButton();
  const pagination = await getPagination();
  const [slide1, slide2, slide3] = await getSlides();

  await reattachElementHandle(page, host);
  // different refs after reconnect, so we have to select them here
  const [bullet1, bullet2, bullet3] = await getPaginationBullets();

  expect(await slide1.isIntersectingViewport()).toBe(true);
  expect(await slide2.isIntersectingViewport()).toBe(false);
  expect(await slide3.isIntersectingViewport()).toBe(false);
  expect(await getCssClasses(bullet1)).toBe('bullet bullet--active');
  expect(await getCssClasses(bullet2)).toBe('bullet');
  expect(await getCssClasses(bullet3)).toBe('bullet');

  await buttonNext.click();
  await waitForSlideToBeActive(slide2);
  expect(await slide1.isIntersectingViewport()).toBe(false);
  expect(await slide2.isIntersectingViewport()).toBe(true);
  expect(await slide3.isIntersectingViewport()).toBe(false);
  expect(await getCssClasses(bullet1)).toBe('bullet');
  expect(await getCssClasses(bullet2)).toBe('bullet bullet--active');
  expect(await getCssClasses(bullet3)).toBe('bullet');

  await buttonPrev.click();
  await waitForSlideToBeActive(slide1);
  expect(await slide1.isIntersectingViewport()).toBe(true);
  expect(await slide2.isIntersectingViewport()).toBe(false);
  expect(await slide3.isIntersectingViewport()).toBe(false);
  expect(await getCssClasses(bullet1)).toBe('bullet bullet--active');
  expect(await getCssClasses(bullet2)).toBe('bullet');
  expect(await getCssClasses(bullet3)).toBe('bullet');
});

describe('adding/removing slides', () => {
  const addSlide = (host: ElementHandle): Promise<void> => {
    return host.evaluate((host) => {
      const el = document.createElement('div');
      el.innerText = `Slide ${host.children.length + 1}`;
      host.append(el);
    });
  };

  const removeSlide = async (host: ElementHandle): Promise<void> => {
    return host.evaluate((host) => {
      host.children[host.children.length - 1].remove();
    });
  };

  it('should update pagination', async () => {
    await initCarousel({ amountOfSlides: 2 });
    const host = await getHost();

    const pagination = await getPagination();
    expect(await pagination.evaluate((el) => el.children.length)).toBe(2);
    const [bullet1, bullet2] = await getPaginationBullets();
    expect(await getCssClasses(bullet1)).toBe('bullet bullet--active');
    expect(await getCssClasses(bullet2)).toBe('bullet');

    await addSlide(host);
    await waitForStencilLifecycle(page);

    expect((await getSlides()).length).toBe(3);
    expect(await pagination.evaluate((el) => el.children.length)).toBe(3);
    const [, , bullet3] = await getPaginationBullets();
    expect(await getCssClasses(bullet3)).toBe('bullet');

    await removeSlide(host);
    await waitForStencilLifecycle(page);
    expect((await getSlides()).length).toBe(2);
    expect(await pagination.evaluate((el) => el.children.length)).toBe(2);
  });

  it('should update aria-labels of prev/next buttons', async () => {
    await initCarousel({ amountOfSlides: 2 });
    const host = await getHost();
    const buttonPrev = await getPrevButton();
    const buttonNext = await getNextButton();

    await buttonNext.click();
    await waitForStencilLifecycle(page);
    expect((await getSlides()).length).toBe(2);
    expect(await getAttribute(buttonPrev, 'aria-label')).toBe('Previous slide');
    expect(await getAttribute(buttonNext, 'aria-label')).toBe('Go to first slide');

    await addSlide(host);
    await waitForStencilLifecycle(page);
    expect((await getSlides()).length).toBe(3);
    expect(await getAttribute(buttonPrev, 'aria-label')).toBe('Previous slide');
    expect(await getAttribute(buttonNext, 'aria-label')).toBe('Next slide');

    await removeSlide(host);
    await waitForStencilLifecycle(page);
    expect((await getSlides()).length).toBe(2);
    expect(await getAttribute(buttonPrev, 'aria-label')).toBe('Previous slide');
    expect(await getAttribute(buttonNext, 'aria-label')).toBe('Go to first slide');

    await removeSlide(host);
    await waitForStencilLifecycle(page);
    expect((await getSlides()).length).toBe(1);
    expect(await getAttribute(buttonPrev, 'aria-label')).toBe('Go to last slide');
    expect(await getAttribute(buttonNext, 'aria-label')).toBe('Go to first slide');
  });
});

xdescribe('viewport change', () => {
  it('should update visible amount of slides for BreakpointCustomizable slidesPerPage', async () => {});

  it('should update pagination for BreakpointCustomizable slidesPerPage', async () => {});
});

xdescribe('focus behavior', () => {
  it('should disable focusing for invisible slides initially', async () => {});

  it('should disable focusing for invisible slides after sliding', async () => {});
});

describe('events', () => {
  beforeEach(async () => await initAddEventListener(page));

  it('should not emit carouselChange event initially', async () => {
    await setContentWithDesignSystem(page, '');
    await page.evaluate(() => {
      (document as any).eventCounter = 0;
      const carousel = document.createElement('p-carousel');
      carousel.innerHTML = '<div>Slide 1</div><div>Slide 2</div>';
      carousel.addEventListener('carouselChange', () => (document as any).eventCounter++);
      document.body.append(carousel);
    });

    await waitForComponentsReady(page);
    expect(await page.evaluate(() => (document as any).eventCounter)).toBe(0);

    const nextButton = await getNextButton();
    await nextButton.click();
    expect(await page.evaluate(() => (document as any).eventCounter)).toBe(1);
  });

  it('should emit carouselChange event on slide change', async () => {
    await initCarousel();
    const host = await getHost();
    const prevButton = await getPrevButton();
    const nextButton = await getNextButton();

    let eventCounter = 0;
    await addEventListener(host, 'carouselChange', () => eventCounter++);
    expect(eventCounter).toBe(0);

    await nextButton.click();
    await waitForEventSerialization(page);
    expect(eventCounter).toBe(1);

    await prevButton.click();
    await waitForEventSerialization(page);
    expect(eventCounter).toBe(2);
  });

  it('should correctly emit carouselChange event after reconnect', async () => {
    await initCarousel();
    const host = await getHost();
    const prevButton = await getPrevButton();
    const nextButton = await getNextButton();

    let eventCounter = 0;
    await addEventListener(host, 'carouselChange', () => eventCounter++);

    await reattachElementHandle(page, host);
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
  it('should update prev/next buttons aria-labels on slide change', async () => {
    await initCarousel({ amountOfSlides: 2 });
    const buttonPrev = await getPrevButton();
    const buttonNext = await getNextButton();

    expect(await getAttribute(buttonPrev, 'aria-label')).toBe('Go to last slide');
    expect(await getAttribute(buttonNext, 'aria-label')).toBe('Next slide');

    await buttonNext.click();
    await waitForStencilLifecycle(page);
    expect(await getAttribute(buttonPrev, 'aria-label')).toBe('Previous slide');
    expect(await getAttribute(buttonNext, 'aria-label')).toBe('Go to first slide');

    await buttonNext.click();
    await waitForStencilLifecycle(page);
    expect(await getAttribute(buttonPrev, 'aria-label')).toBe('Go to last slide');
    expect(await getAttribute(buttonNext, 'aria-label')).toBe('Next slide');

    await buttonPrev.click();
    await waitForStencilLifecycle(page);
    expect(await getAttribute(buttonPrev, 'aria-label')).toBe('Previous slide');
    expect(await getAttribute(buttonNext, 'aria-label')).toBe('Go to first slide');
  });

  it('should expose correct initial accessibility tree and aria properties', async () => {
    await initCarousel();
    const buttonPrev = await getPrevButton();
    const buttonNext = await getNextButton();
    const splide = await getSplide();
    const splideTrack = await getSplideTrack();
    const [slide1, slide2, slide3] = await getSlides();

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
