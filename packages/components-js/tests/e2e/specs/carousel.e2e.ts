import type { ElementHandle, Page } from 'puppeteer';
import {
  addEventListener,
  expectA11yToMatchSnapshot,
  getActiveElementId,
  getActiveElementTagNameInShadowRoot,
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
  slidesPerPage?: number | string;
  amountOfSlides?: number;
  withFocusableElements?: boolean;
};

const initCarousel = async (opts?: InitOptions) => {
  const { slidesPerPage = 1, amountOfSlides = 3, withFocusableElements = false } = opts || {};

  const slides = Array.from(Array(amountOfSlides))
    .map((_, i) => {
      const link = withFocusableElements ? ` <a id="link-${i + 1}" href="#">Link</a>` : '';
      return `<div>Slide ${i + 1}${link}</div>`;
    })
    .join('\n  ');

  const focusableElementBefore = withFocusableElements ? '<a id="link-before" href="#">Link before</a>' : '';
  const focusableElementAfter = withFocusableElements ? '<a id="link-after" href="#">Link after</a>' : '';
  const attrs = slidesPerPage ? ` slides-per-page="${slidesPerPage}"` : '';

  const content = `${focusableElementBefore}<p-carousel heading="Heading"${attrs}>
  ${slides}
</p-carousel>${focusableElementAfter}`;

  await setContentWithDesignSystem(page, content);
};

const getHost = () => selectNode(page, 'p-carousel');
const getSplide = () => selectNode(page, 'p-carousel >>> .splide');
const getSplideTrack = () => selectNode(page, 'p-carousel >>> .splide__track');
const getSlides = async () => (await selectNode(page, 'p-carousel >>> .splide')).$$('.splide__slide');
const getButtonPrev = () => selectNode(page, 'p-carousel >>> p-button-pure:first-of-type >>> button');
const getButtonNext = () => selectNode(page, 'p-carousel >>> p-button-pure:last-of-type >>> button');
const getPagination = () => selectNode(page, 'p-carousel >>> .pagination');
const getPaginationBullets = async () => (await getPagination()).$$('span');

const waitForSlideToBeActive = (slide: ElementHandle) =>
  page.waitForFunction((el) => el.classList.contains('is-active'), {}, slide);

it('should move slides on prev button clicks', async () => {
  await initCarousel();
  const buttonPrev = await getButtonPrev();
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
  const buttonNext = await getButtonNext();
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
  const buttonPrev = await getButtonPrev();
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
  const buttonNext = await getButtonNext();
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
  const buttonPrev = await getButtonPrev();
  const buttonNext = await getButtonNext();
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
    const buttonPrev = await getButtonPrev();
    const buttonNext = await getButtonNext();

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

describe('viewport change', () => {
  it('should update visible amount of slides for BreakpointCustomizable slidesPerPage', async () => {
    await initCarousel({ slidesPerPage: '{ base: 1, s: 2, m: 3}', amountOfSlides: 6 });
    const [slide1, slide2, slide3, slide4, slide5, slide6] = await getSlides();

    await page.setViewport({ height: 1000, width: 350 });
    expect(await slide1.isIntersectingViewport()).toBe(true);
    expect(await slide2.isIntersectingViewport()).toBe(false);
    expect(await slide3.isIntersectingViewport()).toBe(false);
    expect(await slide4.isIntersectingViewport()).toBe(false);
    expect(await slide5.isIntersectingViewport()).toBe(false);
    expect(await slide6.isIntersectingViewport()).toBe(false);

    await page.setViewport({ height: 1000, width: 760 });
    expect(await slide1.isIntersectingViewport()).toBe(true);
    expect(await slide2.isIntersectingViewport()).toBe(true);
    expect(await slide3.isIntersectingViewport()).toBe(false);
    expect(await slide4.isIntersectingViewport()).toBe(false);
    expect(await slide5.isIntersectingViewport()).toBe(false);
    expect(await slide6.isIntersectingViewport()).toBe(false);

    await page.setViewport({ height: 1000, width: 1000 });
    expect(await slide1.isIntersectingViewport()).toBe(true);
    expect(await slide2.isIntersectingViewport()).toBe(true);
    expect(await slide3.isIntersectingViewport()).toBe(true);
    expect(await slide4.isIntersectingViewport()).toBe(false);
    expect(await slide5.isIntersectingViewport()).toBe(false);
    expect(await slide6.isIntersectingViewport()).toBe(false);
  });

  it('should update pagination for BreakpointCustomizable slidesPerPage', async () => {
    await initCarousel({ slidesPerPage: '{ base: 1, s: 2, m: 3}', amountOfSlides: 6 });
    const pagination = await getPagination();

    await page.setViewport({ height: 1000, width: 350 });
    await waitForStencilLifecycle(page);
    expect(await pagination.evaluate((el) => el.children.length)).toBe(6);

    await page.setViewport({ height: 1000, width: 760 });
    await waitForStencilLifecycle(page);
    expect(await pagination.evaluate((el) => el.children.length)).toBe(5);

    await page.setViewport({ height: 1000, width: 1000 });
    await waitForStencilLifecycle(page);
    expect(await pagination.evaluate((el) => el.children.length)).toBe(4);
  });
});

describe('focus behavior', () => {
  it('should have correct focus cycle for slidesPerPage=1', async () => {
    await initCarousel({ slidesPerPage: 1, withFocusableElements: true });
    const host = await getHost();

    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('link-before');

    await page.keyboard.press('Tab');
    expect(await getActiveElementTagNameInShadowRoot(host)).toBe('P-BUTTON-PURE');

    await page.keyboard.press('Tab');
    expect(await getActiveElementTagNameInShadowRoot(host)).toBe('P-BUTTON-PURE');

    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('link-1');

    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('link-after');
  });

  it('should have correct focus cycle for slidesPerPage=2', async () => {
    await initCarousel({ slidesPerPage: 2, withFocusableElements: true });
    const host = await getHost();

    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('link-before');

    await page.keyboard.press('Tab');
    expect(await getActiveElementTagNameInShadowRoot(host)).toBe('P-BUTTON-PURE');

    await page.keyboard.press('Tab');
    expect(await getActiveElementTagNameInShadowRoot(host)).toBe('P-BUTTON-PURE');

    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('link-1');

    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('link-2');

    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('link-after');
  });

  it('should set inert attribute on invisible slides initially for slidesPerPage=1', async () => {
    await initCarousel({ slidesPerPage: 1 });
    const [slide1, slide2, slide3] = await getSlides();

    expect(await getAttribute(slide1, 'inert')).toBeNull();
    expect(await getAttribute(slide2, 'inert')).toBeDefined();
    expect(await getAttribute(slide3, 'inert')).toBeDefined();
  });

  it('should set inert attribute on invisible slides initially for slidesPerPage=2', async () => {
    await initCarousel({ slidesPerPage: 2 });
    const [slide1, slide2, slide3] = await getSlides();

    expect(await getAttribute(slide1, 'inert')).toBeNull();
    expect(await getAttribute(slide2, 'inert')).toBeNull();
    expect(await getAttribute(slide3, 'inert')).toBeDefined();
  });

  it('should set inert attribute on invisible slides after sliding for slidesPerPage=1', async () => {
    await initCarousel({ slidesPerPage: 1 });
    const buttonNext = await getButtonNext();
    const buttonPrev = await getButtonPrev();
    const [slide1, slide2, slide3] = await getSlides();

    await buttonNext.click();
    await waitForStencilLifecycle(page);
    expect(await getAttribute(slide1, 'inert')).toBeDefined();
    expect(await getAttribute(slide2, 'inert')).toBeNull();
    expect(await getAttribute(slide3, 'inert')).toBeDefined();

    await buttonPrev.click();
    await waitForStencilLifecycle(page);
    expect(await getAttribute(slide1, 'inert')).toBeNull();
    expect(await getAttribute(slide2, 'inert')).toBeDefined();
    expect(await getAttribute(slide3, 'inert')).toBeDefined();
  });

  it('should set inert attribute on invisible slides after sliding for slidesPerPage=2', async () => {
    await initCarousel({ slidesPerPage: 2 });
    const buttonNext = await getButtonNext();
    const buttonPrev = await getButtonPrev();
    const [slide1, slide2, slide3] = await getSlides();

    await buttonNext.click();
    await waitForStencilLifecycle(page);
    expect(await getAttribute(slide1, 'inert')).toBeDefined();
    expect(await getAttribute(slide2, 'inert')).toBeDefined();
    expect(await getAttribute(slide3, 'inert')).toBeNull();

    await buttonPrev.click();
    await waitForStencilLifecycle(page);
    expect(await getAttribute(slide1, 'inert')).toBeNull();
    expect(await getAttribute(slide2, 'inert')).toBeNull();
    expect(await getAttribute(slide3, 'inert')).toBeDefined();
  });
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

    const nextButton = await getButtonNext();
    await nextButton.click();
    expect(await page.evaluate(() => (document as any).eventCounter)).toBe(1);
  });

  it('should emit carouselChange event on slide change', async () => {
    await initCarousel();
    const host = await getHost();
    const prevButton = await getButtonPrev();
    const nextButton = await getButtonNext();

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
    const prevButton = await getButtonPrev();
    const nextButton = await getButtonNext();

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
    const buttonNext = await getButtonNext();
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
    const buttonPrev = await getButtonPrev();
    const buttonNext = await getButtonNext();

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
    const buttonPrev = await getButtonPrev();
    const buttonNext = await getButtonNext();
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
