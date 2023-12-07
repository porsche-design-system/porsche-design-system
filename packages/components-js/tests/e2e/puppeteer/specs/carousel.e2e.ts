import type { ElementHandle, Page } from 'puppeteer';
import {
  addEventListener,
  expectA11yToMatchSnapshot,
  getActiveElementId,
  getActiveElementTagNameInShadowRoot,
  getAttribute,
  getCssClasses,
  getElementStyle,
  getEventSummary,
  getLifecycleStatus,
  getProperty,
  goto,
  reattachElementHandle,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForComponentsReady,
  waitForStencilLifecycle,
} from '../helpers';
import type {
  CarouselAriaAttribute,
  SelectedAriaAttributes,
} from '@porsche-design-system/components/dist/types/bundle';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

type InitOptions = {
  aria?: SelectedAriaAttributes<CarouselAriaAttribute>;
  slidesPerPage?: number | string;
  amountOfSlides?: number;
  withFocusableElements?: boolean;
  rewind?: boolean;
  activeSlideIndex?: number;
  skipLinkTarget?: string;
};

const initCarousel = (opts?: InitOptions) => {
  const {
    aria,
    slidesPerPage = 1,
    amountOfSlides = 3,
    withFocusableElements = false,
    rewind = true,
    activeSlideIndex,
    skipLinkTarget,
  } = opts || {};

  const slides = Array.from(Array(amountOfSlides))
    .map((_, i) => {
      const link = withFocusableElements ? ` <a id="link-${i + 1}" href="#" onclick="return false;">Link</a>` : '';
      return `<div id="slide${i + 1}">Slide ${i + 1}${link}</div>`;
    })
    .join('\n  ');

  const focusableElementBefore = withFocusableElements ? '<a id="link-before" href="#">Link before</a>' : '';
  const focusableElementAfter = withFocusableElements ? '<a id="link-after" href="#">Link after</a>' : '';
  const attrs = [
    aria && `aria="${aria}"`,
    slidesPerPage ? `slides-per-page="${slidesPerPage}"` : '',
    rewind === false ? 'rewind="false"' : '',
    activeSlideIndex ? `active-slide-index="${activeSlideIndex}"` : '',
    skipLinkTarget ? `skip-link-target="${skipLinkTarget}"` : '',
  ].join(' ');

  const content = `${focusableElementBefore}<p-carousel heading="Heading" ${attrs}>
  ${slides}
</p-carousel>${focusableElementAfter}`;

  return setContentWithDesignSystem(page, content);
};

const getHost = () => selectNode(page, 'p-carousel');
const getSlottedSlides = async () => (await selectNode(page, 'p-carousel')).$$('[slot^="slide-"]');
const getSplide = () => selectNode(page, 'p-carousel >>> .splide');
const getSplideTrack = () => selectNode(page, 'p-carousel >>> .splide__track');
const getSlides = async () => (await selectNode(page, 'p-carousel >>> .splide')).$$('.splide__slide');
const getButtonPrev = () => selectNode(page, 'p-carousel >>> p-button-pure:first-of-type >>> button');
const getButtonNext = () => selectNode(page, 'p-carousel >>> p-button-pure:last-of-type >>> button');
const getPagination = () => selectNode(page, 'p-carousel >>> .pagination');
const getPaginationBullets = async () => (await getPagination()).$$('span');
const getSkipLink = () => selectNode(page, 'p-carousel >>> .skip-link >>> a');

const waitForSlideToBeActive = (slide: ElementHandle) =>
  page.waitForFunction((el) => el.classList.contains('is-active'), {}, slide);

const isElementCompletelyInViewport = (handle: ElementHandle): Promise<boolean> =>
  handle.isIntersectingViewport({ threshold: 1 });

it('should move slides on prev button clicks', async () => {
  await initCarousel();
  const buttonPrev = await getButtonPrev();
  const [slide1, slide2, slide3] = await getSlides();

  expect(await isElementCompletelyInViewport(slide1)).toBe(true);
  expect(await isElementCompletelyInViewport(slide2)).toBe(false);
  expect(await isElementCompletelyInViewport(slide3)).toBe(false);

  await buttonPrev.click();
  await waitForSlideToBeActive(slide3);
  expect(await isElementCompletelyInViewport(slide1)).toBe(false);
  expect(await isElementCompletelyInViewport(slide2)).toBe(false);
  expect(await isElementCompletelyInViewport(slide3)).toBe(true);

  await buttonPrev.click();
  await waitForSlideToBeActive(slide2);
  expect(await isElementCompletelyInViewport(slide1)).toBe(false);
  expect(await isElementCompletelyInViewport(slide2)).toBe(true);
  expect(await isElementCompletelyInViewport(slide3)).toBe(false);

  await buttonPrev.click();
  await waitForSlideToBeActive(slide1);
  expect(await isElementCompletelyInViewport(slide1)).toBe(true);
  expect(await isElementCompletelyInViewport(slide2)).toBe(false);
  expect(await isElementCompletelyInViewport(slide3)).toBe(false);
});

it('should move slides on next button clicks', async () => {
  await initCarousel();
  const buttonNext = await getButtonNext();
  const [slide1, slide2, slide3] = await getSlides();

  expect(await isElementCompletelyInViewport(slide1)).toBe(true);
  expect(await isElementCompletelyInViewport(slide2)).toBe(false);
  expect(await isElementCompletelyInViewport(slide3)).toBe(false);

  await buttonNext.click();
  await waitForSlideToBeActive(slide2);
  expect(await isElementCompletelyInViewport(slide1)).toBe(false);
  expect(await isElementCompletelyInViewport(slide2)).toBe(true);
  expect(await isElementCompletelyInViewport(slide3)).toBe(false);

  await buttonNext.click();
  await waitForSlideToBeActive(slide3);
  expect(await isElementCompletelyInViewport(slide1)).toBe(false);
  expect(await isElementCompletelyInViewport(slide2)).toBe(false);
  expect(await isElementCompletelyInViewport(slide3)).toBe(true);

  await buttonNext.click();
  await waitForSlideToBeActive(slide1);
  expect(await isElementCompletelyInViewport(slide1)).toBe(true);
  expect(await isElementCompletelyInViewport(slide2)).toBe(false);
  expect(await isElementCompletelyInViewport(slide3)).toBe(false);
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

it('should update infinite pagination on prev button clicks', async () => {
  await initCarousel({ amountOfSlides: 6 });
  const buttonPrev = await getButtonPrev();
  const paginationBullets = await getPaginationBullets();

  expect(await getCssClasses(paginationBullets[0])).toBe('bullet bullet--active');
  expect(await getCssClasses(paginationBullets[1])).toBe('bullet');
  expect(await getCssClasses(paginationBullets[2])).toBe('bullet');
  expect(await getCssClasses(paginationBullets[3])).toBe('bullet');
  expect(await getCssClasses(paginationBullets[4])).toBe('bullet bullet--infinite');
  expect(await getCssClasses(paginationBullets[5])).toBe('bullet');

  await buttonPrev.click();
  expect(await getCssClasses(paginationBullets[0])).toBe('bullet');
  expect(await getCssClasses(paginationBullets[1])).toBe('bullet bullet--infinite');
  expect(await getCssClasses(paginationBullets[2])).toBe('bullet');
  expect(await getCssClasses(paginationBullets[3])).toBe('bullet');
  expect(await getCssClasses(paginationBullets[4])).toBe('bullet');
  expect(await getCssClasses(paginationBullets[5])).toBe('bullet bullet--active');

  await buttonPrev.click();
  expect(await getCssClasses(paginationBullets[0])).toBe('bullet');
  expect(await getCssClasses(paginationBullets[1])).toBe('bullet bullet--infinite');
  expect(await getCssClasses(paginationBullets[2])).toBe('bullet');
  expect(await getCssClasses(paginationBullets[3])).toBe('bullet');
  expect(await getCssClasses(paginationBullets[4])).toBe('bullet bullet--active');
  expect(await getCssClasses(paginationBullets[5])).toBe('bullet');

  await buttonPrev.click();
  expect(await getCssClasses(paginationBullets[0])).toBe('bullet');
  expect(await getCssClasses(paginationBullets[1])).toBe('bullet bullet--infinite');
  expect(await getCssClasses(paginationBullets[2])).toBe('bullet');
  expect(await getCssClasses(paginationBullets[3])).toBe('bullet bullet--active');
  expect(await getCssClasses(paginationBullets[4])).toBe('bullet');
  expect(await getCssClasses(paginationBullets[5])).toBe('bullet bullet--infinite');
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

it('should update infinite pagination on next button clicks', async () => {
  await initCarousel({ amountOfSlides: 6 });
  const buttonNext = await getButtonNext();
  const paginationBullets = await getPaginationBullets();

  expect(await getCssClasses(paginationBullets[0])).toBe('bullet bullet--active');
  expect(await getCssClasses(paginationBullets[1])).toBe('bullet');
  expect(await getCssClasses(paginationBullets[2])).toBe('bullet');
  expect(await getCssClasses(paginationBullets[3])).toBe('bullet');
  expect(await getCssClasses(paginationBullets[4])).toBe('bullet bullet--infinite');
  expect(await getCssClasses(paginationBullets[5])).toBe('bullet');

  await buttonNext.click();
  expect(await getCssClasses(paginationBullets[0])).toBe('bullet');
  expect(await getCssClasses(paginationBullets[1])).toBe('bullet bullet--active');
  expect(await getCssClasses(paginationBullets[2])).toBe('bullet');
  expect(await getCssClasses(paginationBullets[3])).toBe('bullet');
  expect(await getCssClasses(paginationBullets[4])).toBe('bullet bullet--infinite');
  expect(await getCssClasses(paginationBullets[5])).toBe('bullet');

  await buttonNext.click();
  expect(await getCssClasses(paginationBullets[0])).toBe('bullet bullet--infinite');
  expect(await getCssClasses(paginationBullets[1])).toBe('bullet');
  expect(await getCssClasses(paginationBullets[2])).toBe('bullet bullet--active');
  expect(await getCssClasses(paginationBullets[3])).toBe('bullet');
  expect(await getCssClasses(paginationBullets[4])).toBe('bullet bullet--infinite');
  expect(await getCssClasses(paginationBullets[5])).toBe('bullet');

  await buttonNext.click();
  expect(await getCssClasses(paginationBullets[0])).toBe('bullet');
  expect(await getCssClasses(paginationBullets[1])).toBe('bullet bullet--infinite');
  expect(await getCssClasses(paginationBullets[2])).toBe('bullet');
  expect(await getCssClasses(paginationBullets[3])).toBe('bullet bullet--active');
  expect(await getCssClasses(paginationBullets[4])).toBe('bullet');
  expect(await getCssClasses(paginationBullets[5])).toBe('bullet bullet--infinite');
});

it('should have working pagination and prev/next buttons after reconnect', async () => {
  await initCarousel();
  const host = await getHost();
  const buttonPrev = await getButtonPrev();
  const buttonNext = await getButtonNext();
  const [slide1, slide2, slide3] = await getSlides();

  await reattachElementHandle(host);
  // different refs after reconnect, so we have to select them here
  const [bullet1, bullet2, bullet3] = await getPaginationBullets();

  expect(await isElementCompletelyInViewport(slide1)).toBe(true);
  expect(await isElementCompletelyInViewport(slide2)).toBe(false);
  expect(await isElementCompletelyInViewport(slide3)).toBe(false);
  expect(await getCssClasses(bullet1)).toBe('bullet bullet--active');
  expect(await getCssClasses(bullet2)).toBe('bullet');
  expect(await getCssClasses(bullet3)).toBe('bullet');

  await buttonNext.click();
  await waitForSlideToBeActive(slide2);
  expect(await isElementCompletelyInViewport(slide1)).toBe(false);
  expect(await isElementCompletelyInViewport(slide2)).toBe(true);
  expect(await isElementCompletelyInViewport(slide3)).toBe(false);
  expect(await getCssClasses(bullet1)).toBe('bullet');
  expect(await getCssClasses(bullet2)).toBe('bullet bullet--active');
  expect(await getCssClasses(bullet3)).toBe('bullet');

  await buttonPrev.click();
  await waitForSlideToBeActive(slide1);
  expect(await isElementCompletelyInViewport(slide1)).toBe(true);
  expect(await isElementCompletelyInViewport(slide2)).toBe(false);
  expect(await isElementCompletelyInViewport(slide3)).toBe(false);
  expect(await getCssClasses(bullet1)).toBe('bullet bullet--active');
  expect(await getCssClasses(bullet2)).toBe('bullet');
  expect(await getCssClasses(bullet3)).toBe('bullet');
});

it('should disable prev/next buttons on first/last slide when rewind=false', async () => {
  await initCarousel({ rewind: false });
  const buttonPrev = await getButtonPrev();
  const buttonNext = await getButtonNext();
  const [slide1, slide2, slide3] = await getSlides();

  expect(await getAttribute(buttonPrev, 'aria-disabled')).toBe('true');
  expect(await getAttribute(buttonNext, 'aria-disabled')).toBe(null);

  await buttonNext.click();
  await waitForSlideToBeActive(slide2);
  expect(await getAttribute(buttonPrev, 'aria-disabled')).toBe(null);
  expect(await getAttribute(buttonNext, 'aria-disabled')).toBe(null);

  await buttonNext.click();
  await waitForSlideToBeActive(slide3);
  expect(await getAttribute(buttonPrev, 'aria-disabled')).toBe(null);
  expect(await getAttribute(buttonNext, 'aria-disabled')).toBe('true');

  await buttonPrev.click();
  await waitForSlideToBeActive(slide2);
  expect(await getAttribute(buttonPrev, 'aria-disabled')).toBe(null);
  expect(await getAttribute(buttonNext, 'aria-disabled')).toBe(null);

  await buttonPrev.click();
  await waitForSlideToBeActive(slide1);
  expect(await getAttribute(buttonPrev, 'aria-disabled')).toBe('true');
  expect(await getAttribute(buttonNext, 'aria-disabled')).toBe(null);
});

it('should not have pagination and prev/next buttons when there is only one page and slidesPerPage is not auto', async () => {
  await initCarousel({ slidesPerPage: 3 });
  const buttonPrev = await selectNode(page, 'p-carousel >>> p-button-pure:first-of-type');
  const buttonNext = await selectNode(page, 'p-carousel >>> p-button-pure:last-of-type');
  const pagination = await getPagination();

  expect(buttonPrev).toBeNull();
  expect(buttonNext).toBeNull();
  expect(pagination).toBeNull();
});

it('should have normal cursor when there is only one page and slidesPerPage is not auto', async () => {
  await initCarousel({ slidesPerPage: 3 });
  const track = await getSplideTrack();
  expect(await getElementStyle(track, 'cursor')).toBe('auto');
});

it('should have grab cursor when there is only more than one page', async () => {
  await initCarousel();
  const track = await getSplideTrack();
  expect(await getElementStyle(track, 'cursor')).toBe('grab');
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

  it('should update tabindex attribute of slide', async () => {
    await initCarousel({ amountOfSlides: 2 });
    const host = await getHost();
    const [slide1, slide2] = await getSlottedSlides();
    await waitForStencilLifecycle(page);

    expect(await getAttribute(slide1, 'tabindex')).toBe('0');
    expect(await getAttribute(slide2, 'tabindex')).toBe('0');

    await addSlide(host);
    await waitForStencilLifecycle(page);
    const [slide1Added, slide2Added, slide3Added] = await getSlottedSlides();

    expect(await getAttribute(slide1Added, 'tabindex')).toBe('0');
    expect(await getAttribute(slide2Added, 'tabindex')).toBe('0');
    expect(await getAttribute(slide3Added, 'tabindex')).toBe('0');

    await removeSlide(host);
    await waitForStencilLifecycle(page);
    const [slide1Removed, slide2Removed] = await getSlottedSlides();

    expect(await getAttribute(slide1Removed, 'tabindex')).toBe('0');
    expect(await getAttribute(slide2Removed, 'tabindex')).toBe('0');
  });

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

  it('should update infinite pagination', async () => {
    await initCarousel({ amountOfSlides: 6 });
    const host = await getHost();

    const pagination = await getPagination();
    expect(await pagination.evaluate((el) => el.children.length)).toBe(6);
    const bullets = await getPaginationBullets();
    expect(await getCssClasses(bullets[0])).toBe('bullet bullet--active');
    expect(await getCssClasses(bullets[1])).toBe('bullet');
    expect(await getCssClasses(bullets[2])).toBe('bullet');
    expect(await getCssClasses(bullets[3])).toBe('bullet');
    expect(await getCssClasses(bullets[4])).toBe('bullet bullet--infinite');
    expect(await getCssClasses(bullets[5])).toBe('bullet');

    await addSlide(host);
    await waitForStencilLifecycle(page);

    expect((await getSlides()).length).toBe(7);
    expect(await pagination.evaluate((el) => el.children.length)).toBe(7);
    const afterSlideBullets = await getPaginationBullets();
    expect(await getCssClasses(afterSlideBullets[6])).toBe('bullet');

    await removeSlide(host);
    await waitForStencilLifecycle(page);
    expect((await getSlides()).length).toBe(6);
    expect(await pagination.evaluate((el) => el.children.length)).toBe(6);
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

    const buttonPrev2 = await selectNode(page, 'p-carousel >>> p-button-pure:first-of-type');
    const buttonNext2 = await selectNode(page, 'p-carousel >>> p-button-pure:last-of-type');
    expect(buttonPrev2).toBeNull();
    expect(buttonNext2).toBeNull();
  });

  it('should show/hide pagination and prev/next buttons depending on the amount of pages', async () => {
    await initCarousel({ slidesPerPage: 2 });
    const host = await getHost();

    expect((await getSlides()).length).toBe(3);

    const buttonPrev1 = await getButtonPrev();
    const buttonNext1 = await getButtonNext();
    const pagination1 = await getPagination();

    expect(buttonPrev1).not.toBeNull();
    expect(buttonNext1).not.toBeNull();
    expect(pagination1).not.toBeNull();

    await removeSlide(host);
    await waitForStencilLifecycle(page);
    expect((await getSlides()).length).toBe(2);

    const buttonPrev2 = await selectNode(page, 'p-carousel >>> p-button-pure:first-of-type');
    const buttonNext2 = await selectNode(page, 'p-carousel >>> p-button-pure:last-of-type');
    const pagination2 = await getPagination();

    expect(buttonPrev2).toBeNull();
    expect(buttonNext2).toBeNull();
    expect(pagination2).toBeNull();

    await addSlide(host);
    await waitForStencilLifecycle(page);
    expect((await getSlides()).length).toBe(3);

    const buttonPrev3 = await getButtonPrev();
    const buttonNext3 = await getButtonNext();
    const pagination3 = await getPagination();

    expect(buttonPrev3).not.toBeNull();
    expect(buttonNext3).not.toBeNull();
    expect(pagination3).not.toBeNull();
  });
});

describe('viewport change', () => {
  it('should update visible amount of slides for BreakpointCustomizable slidesPerPage', async () => {
    await initCarousel({ slidesPerPage: '{ base: 1, s: 2, m: 3}', amountOfSlides: 6 });
    const [slide1, slide2, slide3, slide4, slide5, slide6] = await getSlides();

    await page.setViewport({ height: 1000, width: 350 });
    expect(await isElementCompletelyInViewport(slide1)).toBe(true);
    expect(await isElementCompletelyInViewport(slide2)).toBe(false);
    expect(await isElementCompletelyInViewport(slide3)).toBe(false);
    expect(await isElementCompletelyInViewport(slide4)).toBe(false);
    expect(await isElementCompletelyInViewport(slide5)).toBe(false);
    expect(await isElementCompletelyInViewport(slide6)).toBe(false);

    await page.setViewport({ height: 1000, width: 760 });
    expect(await isElementCompletelyInViewport(slide1)).toBe(true);
    expect(await isElementCompletelyInViewport(slide2)).toBe(true);
    expect(await isElementCompletelyInViewport(slide3)).toBe(false);
    expect(await isElementCompletelyInViewport(slide4)).toBe(false);
    expect(await isElementCompletelyInViewport(slide5)).toBe(false);
    expect(await isElementCompletelyInViewport(slide6)).toBe(false);

    await page.setViewport({ height: 1000, width: 1000 });
    expect(await isElementCompletelyInViewport(slide1)).toBe(true);
    expect(await isElementCompletelyInViewport(slide2)).toBe(true);
    expect(await isElementCompletelyInViewport(slide3)).toBe(true);
    expect(await isElementCompletelyInViewport(slide4)).toBe(false);
    expect(await isElementCompletelyInViewport(slide5)).toBe(false);
    expect(await isElementCompletelyInViewport(slide6)).toBe(false);
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
    await initCarousel({ amountOfSlides: 2, slidesPerPage: 1, withFocusableElements: true });
    const host = await getHost();

    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('link-before');

    await page.keyboard.press('Tab');
    expect(await getActiveElementTagNameInShadowRoot(host)).toBe('P-BUTTON-PURE');

    await page.keyboard.press('Tab');
    expect(await getActiveElementTagNameInShadowRoot(host)).toBe('P-BUTTON-PURE');

    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('slide1');

    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('link-1');

    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('slide2');

    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('link-2');

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
    expect(await getActiveElementId(page)).toBe('slide1');

    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('link-1');

    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('slide2');

    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('link-2');

    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('slide3');

    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('link-3');

    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('link-after');
  });

  it('should have correct focus cycle if next button is clicked and then tabbed', async () => {
    await initCarousel({ slidesPerPage: 1, withFocusableElements: false });
    const host = await getHost();
    const [slide1, slide2, slide3] = await getSlides();
    const btnNext = await getButtonNext();

    await btnNext.focus();
    await page.keyboard.press('Enter');
    await page.keyboard.press('Tab');
    await waitForSlideToBeActive(slide2);

    expect(await getActiveElementId(page)).toBe('slide2');
  });

  it('should have correct focus cycle if skip link has focus and is clicked', async () => {
    await goto(page, ''); // need to have actual window.location
    await initCarousel({ slidesPerPage: 2, withFocusableElements: true, skipLinkTarget: '#link-after' });
    const skipLink = await getSkipLink();

    await skipLink.focus();
    await page.keyboard.press('Enter');

    expect(await getActiveElementId(page)).toBe('link-after');
  });
});

describe('events', () => {
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

    await addEventListener(host, 'carouselChange');
    expect((await getEventSummary(host, 'carouselChange')).counter).toBe(0);

    await nextButton.click();
    expect((await getEventSummary(host, 'carouselChange')).counter).toBe(1);

    await prevButton.click();
    expect((await getEventSummary(host, 'carouselChange')).counter).toBe(2);
  });

  it('should correctly emit carouselChange event after reconnect', async () => {
    await initCarousel();
    const host = await getHost();
    const prevButton = await getButtonPrev();
    const nextButton = await getButtonNext();

    await addEventListener(host, 'carouselChange');

    await reattachElementHandle(host);
    expect((await getEventSummary(host, 'carouselChange')).counter).toBe(0);

    await nextButton.click();
    expect((await getEventSummary(host, 'carouselChange')).counter).toBe(1);

    await prevButton.click();
    expect((await getEventSummary(host, 'carouselChange')).counter).toBe(2);
  });

  it('should emit both carouselChange and update event', async () => {
    await initCarousel();
    const host = await getHost();

    await addEventListener(host, 'carouselChange');
    await addEventListener(host, 'update');
    expect((await getEventSummary(host, 'carouselChange')).counter).toBe(0);
    expect((await getEventSummary(host, 'update')).counter).toBe(0);

    const nextButton = await getButtonNext();
    await nextButton.click();
    expect((await getEventSummary(host, 'carouselChange')).counter).toBe(1);
    expect((await getEventSummary(host, 'update')).counter).toBe(1);
  });

  // TODO: find a way to test native click behaviour
  xit('should emit native events on slotted interactive elements', async () => {
    await initCarousel({ amountOfSlides: 4, slidesPerPage: 1, withFocusableElements: true });
    const getSlottedLink1 = selectNode(page, '#link-1');
    const getSlottedLink2 = selectNode(page, '#link-4');

    await (await getSlottedLink1).click();
    await (await getSlottedLink2).click();
  });
});

describe('activeSlideIndex', () => {
  it('should set active slide correctly on initialization', async () => {
    await initCarousel({ activeSlideIndex: 2 });
    const [slide1, slide2, slide3] = await getSlides();

    expect(await isElementCompletelyInViewport(slide1)).toBe(false);
    expect(await isElementCompletelyInViewport(slide2)).toBe(false);
    expect(await isElementCompletelyInViewport(slide3)).toBe(true);
  });

  it('should slide correctly when changed', async () => {
    await initCarousel();
    const host = await getHost();
    const [slide1, slide2, slide3] = await getSlides();

    expect(await isElementCompletelyInViewport(slide1)).toBe(true);
    expect(await isElementCompletelyInViewport(slide2)).toBe(false);
    expect(await isElementCompletelyInViewport(slide3)).toBe(false);

    await setProperty(host, 'activeSlideIndex', 1);
    await waitForSlideToBeActive(slide2);
    expect(await isElementCompletelyInViewport(slide1)).toBe(false);
    expect(await isElementCompletelyInViewport(slide2)).toBe(true);
    expect(await isElementCompletelyInViewport(slide3)).toBe(false);

    await setProperty(host, 'activeSlideIndex', 2);
    await waitForSlideToBeActive(slide3);
    expect(await isElementCompletelyInViewport(slide1)).toBe(false);
    expect(await isElementCompletelyInViewport(slide2)).toBe(false);
    expect(await isElementCompletelyInViewport(slide3)).toBe(true);

    await setProperty(host, 'activeSlideIndex', 0);
    await waitForSlideToBeActive(slide1);
    expect(await isElementCompletelyInViewport(slide1)).toBe(true);
    expect(await isElementCompletelyInViewport(slide2)).toBe(false);
    expect(await isElementCompletelyInViewport(slide3)).toBe(false);
  });

  it('should not cause new lifecycle', async () => {
    await initCarousel();
    const host = await getHost();

    const initialStatus = await getLifecycleStatus(page);
    expect(initialStatus.componentDidUpdate['p-button-pure'], 'componentDidUpdate: p-button-pure').toBe(2); // modified after render
    expect(initialStatus.componentDidUpdate.all, 'initial componentDidUpdate: all').toBe(2);
    expect(initialStatus.componentDidLoad.all, 'initial componentDidLoad: all').toBe(5);

    await setProperty(host, 'activeSlideIndex', 1);
    await waitForStencilLifecycle(page);

    const finalStatus = await getLifecycleStatus(page);
    expect(finalStatus.componentDidUpdate['p-button-pure'], 'componentDidUpdate: p-button-pure').toBe(3); // aria and disabled props where modified
    expect(finalStatus.componentDidUpdate.all, 'final componentDidUpdate: all').toBe(3);
    expect(finalStatus.componentDidLoad.all, 'final componentDidLoad: all').toBe(5);
  });

  it('should emit update event', async () => {
    await initCarousel();
    const host = await getHost();

    await addEventListener(host, 'update');
    expect((await getEventSummary(host, 'update')).counter).toBe(0);

    await setProperty(host, 'activeSlideIndex', 1);
    expect((await getEventSummary(host, 'update')).counter).toBe(1);
  });

  it('should slide correctly if slides without focusable elements are tabbed for slidesPerPage=1', async () => {
    await initCarousel({ slidesPerPage: 1, withFocusableElements: false });
    const [slide1, slide2, slide3] = await getSlides();
    const [slideSlotted1] = await getSlottedSlides();

    await slideSlotted1.focus();
    expect(await isElementCompletelyInViewport(slide1)).toBe(true);
    expect(await isElementCompletelyInViewport(slide2)).toBe(false);
    expect(await isElementCompletelyInViewport(slide3)).toBe(false);

    await page.keyboard.press('Tab');
    await waitForSlideToBeActive(slide2);

    expect(await isElementCompletelyInViewport(slide1)).toBe(false);
    expect(await isElementCompletelyInViewport(slide2)).toBe(true);
    expect(await isElementCompletelyInViewport(slide3)).toBe(false);

    await page.keyboard.press('Tab');
    await waitForSlideToBeActive(slide3);

    expect(await isElementCompletelyInViewport(slide1)).toBe(false);
    expect(await isElementCompletelyInViewport(slide2)).toBe(false);
    expect(await isElementCompletelyInViewport(slide3)).toBe(true);

    await page.keyboard.down('Shift');
    await page.keyboard.press('Tab');
    await waitForSlideToBeActive(slide2);

    expect(await isElementCompletelyInViewport(slide1)).toBe(false);
    expect(await isElementCompletelyInViewport(slide2)).toBe(true);
    expect(await isElementCompletelyInViewport(slide3)).toBe(false);
  });

  it('should slide correctly if slides without focusable elements are tabbed for slidesPerPage=2', async () => {
    await initCarousel({ amountOfSlides: 6, slidesPerPage: 2, withFocusableElements: false });
    const [slide1, slide2, slide3, slide4] = await getSlides();
    const [slideSlotted1] = await getSlottedSlides();

    await slideSlotted1.focus();
    expect(await isElementCompletelyInViewport(slide1)).toBe(true);
    expect(await isElementCompletelyInViewport(slide2)).toBe(true);
    expect(await isElementCompletelyInViewport(slide3)).toBe(false);

    await page.keyboard.press('Tab');
    await waitForSlideToBeActive(slide1);

    expect(await isElementCompletelyInViewport(slide1)).toBe(true);
    expect(await isElementCompletelyInViewport(slide2)).toBe(true);
    expect(await isElementCompletelyInViewport(slide3)).toBe(false);

    await page.keyboard.press('Tab');
    await waitForSlideToBeActive(slide2);

    expect(await isElementCompletelyInViewport(slide1)).toBe(false);
    expect(await isElementCompletelyInViewport(slide2)).toBe(true);
    expect(await isElementCompletelyInViewport(slide3)).toBe(true);

    await page.keyboard.press('Tab');
    await waitForSlideToBeActive(slide3);

    expect(await isElementCompletelyInViewport(slide2)).toBe(false);
    expect(await isElementCompletelyInViewport(slide3)).toBe(true);
    expect(await isElementCompletelyInViewport(slide4)).toBe(true);

    await page.keyboard.down('Shift');
    await page.keyboard.press('Tab');
    await waitForSlideToBeActive(slide3);

    expect(await isElementCompletelyInViewport(slide2)).toBe(false);
    expect(await isElementCompletelyInViewport(slide3)).toBe(true);
    expect(await isElementCompletelyInViewport(slide4)).toBe(true);

    await page.keyboard.down('Shift');
    await page.keyboard.press('Tab');
    await waitForSlideToBeActive(slide2);

    expect(await isElementCompletelyInViewport(slide2)).toBe(true);
    expect(await isElementCompletelyInViewport(slide3)).toBe(true);
    expect(await isElementCompletelyInViewport(slide4)).toBe(false);
  });

  it('should slide correctly if slides with focusable elements are tabbed', async () => {
    await initCarousel({ slidesPerPage: 1, withFocusableElements: true });
    const [slide1, slide2, slide3] = await getSlides();
    const [slideSlotted1] = await getSlottedSlides();

    await slideSlotted1.focus();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await waitForSlideToBeActive(slide2);

    expect(await isElementCompletelyInViewport(slide1)).toBe(false);
    expect(await isElementCompletelyInViewport(slide2)).toBe(true);
    expect(await isElementCompletelyInViewport(slide3)).toBe(false);

    await page.keyboard.down('Shift');
    await page.keyboard.press('Tab');
    await waitForSlideToBeActive(slide1);

    expect(await isElementCompletelyInViewport(slide1)).toBe(true);
    expect(await isElementCompletelyInViewport(slide2)).toBe(false);
    expect(await isElementCompletelyInViewport(slide3)).toBe(false);
  });

  it('should slide correctly if slides with focusable elements are tabbed for slidesPerPage=2', async () => {
    await initCarousel({ amountOfSlides: 4, slidesPerPage: 2, withFocusableElements: true });
    const [slide1, slide2, slide3, slide4] = await getSlides();
    const [slideSlotted1] = await getSlottedSlides();

    await slideSlotted1.focus();
    expect(await isElementCompletelyInViewport(slide1)).toBe(true);
    expect(await isElementCompletelyInViewport(slide2)).toBe(true);
    expect(await isElementCompletelyInViewport(slide3)).toBe(false);

    await page.keyboard.press('Tab');

    expect(await isElementCompletelyInViewport(slide1)).toBe(true);
    expect(await isElementCompletelyInViewport(slide2)).toBe(true);
    expect(await isElementCompletelyInViewport(slide3)).toBe(false);

    await page.keyboard.press('Tab');
    await waitForSlideToBeActive(slide1);

    expect(await isElementCompletelyInViewport(slide1)).toBe(true);
    expect(await isElementCompletelyInViewport(slide2)).toBe(true);
    expect(await isElementCompletelyInViewport(slide3)).toBe(false);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await waitForSlideToBeActive(slide2);

    expect(await isElementCompletelyInViewport(slide2)).toBe(true);
    expect(await isElementCompletelyInViewport(slide3)).toBe(true);
    expect(await isElementCompletelyInViewport(slide4)).toBe(false);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await waitForSlideToBeActive(slide3);

    expect(await isElementCompletelyInViewport(slide2)).toBe(false);
    expect(await isElementCompletelyInViewport(slide3)).toBe(true);
    expect(await isElementCompletelyInViewport(slide4)).toBe(true);

    await page.keyboard.down('Shift');
    await page.keyboard.press('Tab');
    await waitForSlideToBeActive(slide3);

    expect(await isElementCompletelyInViewport(slide2)).toBe(false);
    expect(await isElementCompletelyInViewport(slide3)).toBe(true);
    expect(await isElementCompletelyInViewport(slide4)).toBe(true);

    await page.keyboard.down('Shift');
    await page.keyboard.press('Tab');
    await page.keyboard.down('Shift');
    await page.keyboard.press('Tab');
    await waitForSlideToBeActive(slide2);

    expect(await isElementCompletelyInViewport(slide2)).toBe(true);
    expect(await isElementCompletelyInViewport(slide3)).toBe(true);
    expect(await isElementCompletelyInViewport(slide4)).toBe(false);

    await page.keyboard.down('Shift');
    await page.keyboard.press('Tab');
    await page.keyboard.down('Shift');
    await page.keyboard.press('Tab');
    await waitForSlideToBeActive(slide1);

    expect(await isElementCompletelyInViewport(slide1)).toBe(true);
    expect(await isElementCompletelyInViewport(slide2)).toBe(true);
    expect(await isElementCompletelyInViewport(slide3)).toBe(false);
  });
});

describe('lifecycle', () => {
  it('should work without unnecessary round trips on init', async () => {
    await initCarousel();
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-carousel'], 'componentDidLoad: p-carousel').toBe(1);
    expect(status.componentDidLoad['p-button-pure'], 'componentDidLoad: p-button-pure').toBe(2);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(2);

    expect(status.componentDidUpdate['p-button-pure'], 'componentDidUpdate: p-button-pure').toBe(2);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(2);
    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(5);
  });

  it('should work without unnecessary round trips on btn next click', async () => {
    await initCarousel();
    const buttonNext = await getButtonNext();
    await buttonNext.click();

    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-button-pure'], 'componentDidUpdate: p-button-pure').toBe(3);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(3);
    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(5);
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

  it('should remove aria-hidden of slides on ready and after slide moved', async () => {
    await initCarousel();
    const [slide1, slide2, slide3] = await getSlides();
    const buttonNext = await getButtonNext();

    expect(await getAttribute(slide1, 'aria-hidden')).toBe(null);
    expect(await getAttribute(slide2, 'aria-hidden')).toBe(null);
    expect(await getAttribute(slide3, 'aria-hidden')).toBe(null);

    await buttonNext.click();
    await waitForStencilLifecycle(page);

    expect(await getAttribute(slide1, 'aria-hidden')).toBe(null);
    expect(await getAttribute(slide2, 'aria-hidden')).toBe(null);
    expect(await getAttribute(slide3, 'aria-hidden')).toBe(null);
  });

  it('should remove aria-hidden of slides on resized', async () => {
    await initCarousel();
    const [slide1, slide2, slide3] = await getSlides();

    await page.setViewport({ width: 800, height: 600 });
    await waitForStencilLifecycle(page);

    expect(await getAttribute(slide1, 'aria-hidden')).toBe(null);
    expect(await getAttribute(slide2, 'aria-hidden')).toBe(null);
    expect(await getAttribute(slide3, 'aria-hidden')).toBe(null);
  });

  it('should expose correct initial accessibility tree', async () => {
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

  it('should expose correct initial accessibility tree when aria prop is defined', async () => {
    await initCarousel({ aria: "{'aria-label': 'Other Heading'}" });
    const splide = await getSplide();

    await expectA11yToMatchSnapshot(page, splide, { message: 'splide', interestingOnly: false });
  });
});
