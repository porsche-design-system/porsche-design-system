import type { ElementHandle, Page } from 'playwright';
import { expect, Locator, test } from '@playwright/test';
import {
  addEventListener,
  getActiveElementId,
  getActiveElementTagNameInShadowRoot,
  getAttribute,
  getCssClasses,
  getElementStyle,
  getEventSummary,
  getLifecycleStatus,
  goto,
  reattachElementHandle,
  setContentWithDesignSystem,
  setProperty,
  skipInBrowsers,
  waitForComponentsReady,
  waitForStencilLifecycle,
} from '../helpers';
import type {
  CarouselAriaAttribute,
  SelectedAriaAttributes,
} from '@porsche-design-system/components/dist/types/bundle';

type InitOptions = {
  aria?: SelectedAriaAttributes<CarouselAriaAttribute>;
  slidesPerPage?: number | string;
  amountOfSlides?: number;
  withFocusableElements?: boolean;
  rewind?: boolean;
  activeSlideIndex?: number;
  skipLinkTarget?: string;
  dir?: 'ltr' | 'rtl';
};

const initCarousel = (page: Page, opts?: InitOptions) => {
  const {
    aria,
    slidesPerPage = 1,
    amountOfSlides = 3,
    withFocusableElements = false,
    rewind = true,
    activeSlideIndex,
    skipLinkTarget,
    dir = 'ltr',
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
    dir ? `dir="${dir}"` : '',
  ].join(' ');

  const content = `${focusableElementBefore}<p-carousel heading="Heading" ${attrs}>
  ${slides}
</p-carousel>${focusableElementAfter}`;

  return setContentWithDesignSystem(page, content);
};

const getHost = (page: Page) => page.$('p-carousel');
const getSplide = (page: Page) => page.locator('#splide');
const getSlottedSlides = async (page: Page) => (await page.$('p-carousel')).$$('[slot^="slide-"]');
const getSplideTrack = (page: Page) => page.$('p-carousel .splide__track');
const getSlides = async (page: Page) => page.getByRole('group').all();
const getButtonPrev = (page: Page) => page.$('p-carousel p-button-pure:first-of-type button');
const getButtonNext = (page: Page) => page.$('p-carousel p-button-pure:last-of-type button');
const getPagination = (page: Page) => page.$('p-carousel .pagination');
const getPaginationBullets = async (page: Page) => (await getPagination(page)).$$('span');
const getSkipLink = (page: Page) => page.$('p-carousel .skip-link a');
const isElementCompletelyInViewport = (slide: Locator) => expect(slide).toBeInViewport({ ratio: 1 });
const isElementNotInViewport = (slide: Locator) => expect(slide).not.toBeInViewport({ ratio: 1 });
const waitForSlideToBeActive = (slide: Locator) => expect(slide).toHaveClass(/is-active/);

test('should move slides on prev button clicks', async ({ page }) => {
  await initCarousel(page);
  const buttonPrev = await getButtonPrev(page);
  const [slide1, slide2, slide3] = await getSlides(page);

  await isElementCompletelyInViewport(slide1);
  await isElementNotInViewport(slide2);
  await isElementNotInViewport(slide3);

  await buttonPrev.click();
  await waitForSlideToBeActive(slide3);
  await isElementNotInViewport(slide1);
  await isElementNotInViewport(slide2);
  await isElementCompletelyInViewport(slide3);

  await buttonPrev.click();
  await waitForSlideToBeActive(slide2);
  await isElementNotInViewport(slide1);
  await isElementCompletelyInViewport(slide2);
  await isElementNotInViewport(slide3);

  await buttonPrev.click();
  await waitForSlideToBeActive(slide1);
  await isElementCompletelyInViewport(slide1);
  await isElementNotInViewport(slide2);
  await isElementNotInViewport(slide3);
});

test('should move slides on next button clicks', async ({ page }) => {
  await initCarousel(page);
  const buttonNext = await getButtonNext(page);
  const [slide1, slide2, slide3] = await getSlides(page);

  await isElementCompletelyInViewport(slide1);
  await isElementNotInViewport(slide2);
  await isElementNotInViewport(slide3);

  await buttonNext.click();
  await waitForSlideToBeActive(slide2);
  await isElementNotInViewport(slide1);
  await isElementCompletelyInViewport(slide2);
  await isElementNotInViewport(slide3);

  await buttonNext.click();
  await waitForSlideToBeActive(slide3);
  await isElementNotInViewport(slide1);
  await isElementNotInViewport(slide2);
  await isElementCompletelyInViewport(slide3);

  await buttonNext.click();
  await waitForSlideToBeActive(slide1);
  await isElementCompletelyInViewport(slide1);
  await isElementNotInViewport(slide2);
  await isElementNotInViewport(slide3);
});

test('should update pagination on prev button clicks', async ({ page }) => {
  await initCarousel(page);
  const buttonPrev = await getButtonPrev(page);
  const [bullet1, bullet2, bullet3] = await getPaginationBullets(page);

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

test('should update infinite pagination on prev button clicks', async ({ page }) => {
  await initCarousel(page, { amountOfSlides: 6 });
  const buttonPrev = await getButtonPrev(page);
  const paginationBullets = await getPaginationBullets(page);

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

test('should update pagination on next button clicks', async ({ page }) => {
  await initCarousel(page);
  const buttonNext = await getButtonNext(page);
  const [bullet1, bullet2, bullet3] = await getPaginationBullets(page);

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

test('should update infinite pagination on next button clicks', async ({ page }) => {
  await initCarousel(page, { amountOfSlides: 6 });
  const buttonNext = await getButtonNext(page);
  const paginationBullets = await getPaginationBullets(page);

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

test('should have working pagination and prev/next buttons after reconnect', async ({ page }) => {
  await initCarousel(page);
  const host = await getHost(page);
  const buttonPrev = await getButtonPrev(page);
  const buttonNext = await getButtonNext(page);
  const [slide1, slide2, slide3] = await getSlides(page);

  await reattachElementHandle(host);
  // different refs after reconnect, so we have to select them here
  const [bullet1, bullet2, bullet3] = await getPaginationBullets(page);

  await isElementCompletelyInViewport(slide1);
  await isElementNotInViewport(slide2);
  await isElementNotInViewport(slide3);
  expect(await getCssClasses(bullet1)).toBe('bullet bullet--active');
  expect(await getCssClasses(bullet2)).toBe('bullet');
  expect(await getCssClasses(bullet3)).toBe('bullet');

  await buttonNext.click();
  await waitForSlideToBeActive(slide2);
  await isElementNotInViewport(slide1);
  await isElementCompletelyInViewport(slide2);
  await isElementNotInViewport(slide3);
  expect(await getCssClasses(bullet1)).toBe('bullet');
  expect(await getCssClasses(bullet2)).toBe('bullet bullet--active');
  expect(await getCssClasses(bullet3)).toBe('bullet');

  await buttonPrev.click();
  await waitForSlideToBeActive(slide1);
  await isElementCompletelyInViewport(slide1);
  await isElementNotInViewport(slide2);
  await isElementNotInViewport(slide3);
  expect(await getCssClasses(bullet1)).toBe('bullet bullet--active');
  expect(await getCssClasses(bullet2)).toBe('bullet');
  expect(await getCssClasses(bullet3)).toBe('bullet');
});

test('should disable prev/next buttons on first/last slide when rewind=false', async ({ page }) => {
  await initCarousel(page, { rewind: false });
  const buttonPrev = await getButtonPrev(page);
  const buttonNext = await getButtonNext(page);
  const [slide1, slide2, slide3] = await getSlides(page);

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

test('should not have pagination and prev/next buttons when there is only one page and slidesPerPage is not auto', async ({
  page,
}) => {
  await initCarousel(page, { slidesPerPage: 3 });
  const buttonPrev = await page.$('p-carousel p-button-pure:first-of-type');
  const buttonNext = await page.$('p-carousel p-button-pure:last-of-type');
  const pagination = await getPagination(page);

  expect(buttonPrev).toBeNull();
  expect(buttonNext).toBeNull();
  expect(pagination).toBeNull();
});

test('should have normal cursor when there is only one page and slidesPerPage is not auto', async ({ page }) => {
  await initCarousel(page, { slidesPerPage: 3 });
  const track = await getSplideTrack(page);
  expect(await getElementStyle(track, 'cursor')).toBe('auto');
});

test('should have grab cursor when there is only more than one page', async ({ page }) => {
  await initCarousel(page);
  const track = await getSplideTrack(page);
  expect(await getElementStyle(track, 'cursor')).toBe('grab');
});

test('should navigate to slide when pagination is clicked', async ({ page }) => {
  await initCarousel(page);
  const [bullet1, bullet2, bullet3] = await getPaginationBullets(page);
  const [slide1, slide2, slide3] = await getSlides(page);

  await bullet2.click();
  await waitForSlideToBeActive(slide2);

  await bullet3.click();
  await waitForSlideToBeActive(slide3);

  await bullet1.click();
  await waitForSlideToBeActive(slide1);
});

test('should navigate to slide when infinite pagination is clicked', async ({ page }) => {
  await initCarousel(page);
  await initCarousel(page, { amountOfSlides: 6 });
  const bullets = await getPaginationBullets(page);
  const slides = await getSlides(page);

  await bullets[1].click();
  await waitForSlideToBeActive(slides[1]);

  await bullets[2].click();
  await waitForSlideToBeActive(slides[2]);

  await bullets[0].click();
  await waitForSlideToBeActive(slides[0]);

  await bullets[4].click();
  await waitForSlideToBeActive(slides[4]);

  await bullets[5].click();
  await waitForSlideToBeActive(slides[5]);

  await bullets[1].click();
  await waitForSlideToBeActive(slides[1]);
});

test.describe('adding/removing slides', () => {
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

  test('should update tabindex attribute of slide', async ({ page }) => {
    await initCarousel(page, { amountOfSlides: 2 });
    const host = await getHost(page);
    const [slide1, slide2] = await getSlottedSlides(page);
    await waitForStencilLifecycle(page);

    expect(await getAttribute(slide1, 'tabindex')).toBe('0');
    expect(await getAttribute(slide2, 'tabindex')).toBe('0');

    await addSlide(host);
    await waitForStencilLifecycle(page);
    const [slide1Added, slide2Added, slide3Added] = await getSlottedSlides(page);

    expect(await getAttribute(slide1Added, 'tabindex')).toBe('0');
    expect(await getAttribute(slide2Added, 'tabindex')).toBe('0');
    expect(await getAttribute(slide3Added, 'tabindex')).toBe('0');

    await removeSlide(host);
    await waitForStencilLifecycle(page);
    const [slide1Removed, slide2Removed] = await getSlottedSlides(page);

    expect(await getAttribute(slide1Removed, 'tabindex')).toBe('0');
    expect(await getAttribute(slide2Removed, 'tabindex')).toBe('0');
  });

  test('should update pagination', async ({ page }) => {
    await initCarousel(page, { amountOfSlides: 2 });
    const host = await getHost(page);

    const pagination = await getPagination(page);
    expect(await pagination.evaluate((el) => el.children.length)).toBe(2);
    const [bullet1, bullet2] = await getPaginationBullets(page);
    expect(await getCssClasses(bullet1)).toBe('bullet bullet--active');
    expect(await getCssClasses(bullet2)).toBe('bullet');

    await addSlide(host);
    await waitForStencilLifecycle(page);

    expect((await getSlides(page)).length).toBe(3);
    expect(await pagination.evaluate((el) => el.children.length)).toBe(3);
    const [, , bullet3] = await getPaginationBullets(page);
    expect(await getCssClasses(bullet3)).toBe('bullet');

    await removeSlide(host);
    await waitForStencilLifecycle(page);
    expect((await getSlides(page)).length).toBe(2);
    expect(await pagination.evaluate((el) => el.children.length)).toBe(2);
  });

  test('should update infinite pagination', async ({ page }) => {
    await initCarousel(page, { amountOfSlides: 6 });
    const host = await getHost(page);

    const pagination = await getPagination(page);
    expect(await pagination.evaluate((el) => el.children.length)).toBe(6);
    const bullets = await getPaginationBullets(page);
    expect(await getCssClasses(bullets[0])).toBe('bullet bullet--active');
    expect(await getCssClasses(bullets[1])).toBe('bullet');
    expect(await getCssClasses(bullets[2])).toBe('bullet');
    expect(await getCssClasses(bullets[3])).toBe('bullet');
    expect(await getCssClasses(bullets[4])).toBe('bullet bullet--infinite');
    expect(await getCssClasses(bullets[5])).toBe('bullet');

    await addSlide(host);
    await waitForStencilLifecycle(page);

    expect((await getSlides(page)).length).toBe(7);
    expect(await pagination.evaluate((el) => el.children.length)).toBe(7);
    const afterSlideBullets = await getPaginationBullets(page);
    expect(await getCssClasses(afterSlideBullets[6])).toBe('bullet');

    await removeSlide(host);
    await waitForStencilLifecycle(page);
    expect((await getSlides(page)).length).toBe(6);
    expect(await pagination.evaluate((el) => el.children.length)).toBe(6);
  });

  test('should update aria-labels of prev/next buttons', async ({ page }) => {
    await initCarousel(page, { amountOfSlides: 2 });
    const host = await getHost(page);
    const buttonPrev = await getButtonPrev(page);
    const buttonNext = await getButtonNext(page);

    await buttonNext.click();
    await waitForStencilLifecycle(page);
    expect((await getSlides(page)).length).toBe(2);
    expect(await getAttribute(buttonPrev, 'aria-label')).toBe('Previous slide');
    expect(await getAttribute(buttonNext, 'aria-label')).toBe('Go to first slide');

    await addSlide(host);
    await waitForStencilLifecycle(page);
    expect((await getSlides(page)).length).toBe(3);
    expect(await getAttribute(buttonPrev, 'aria-label')).toBe('Previous slide');
    expect(await getAttribute(buttonNext, 'aria-label')).toBe('Next slide');

    await removeSlide(host);
    await waitForStencilLifecycle(page);
    expect((await getSlides(page)).length).toBe(2);
    expect(await getAttribute(buttonPrev, 'aria-label')).toBe('Previous slide');
    expect(await getAttribute(buttonNext, 'aria-label')).toBe('Go to first slide');

    await removeSlide(host);
    await waitForStencilLifecycle(page);
    expect((await getSlides(page)).length).toBe(1);

    const buttonPrev2 = await page.$('p-carousel p-button-pure:first-of-type');
    const buttonNext2 = await page.$('p-carousel p-button-pure:last-of-type');
    expect(buttonPrev2).toBeNull();
    expect(buttonNext2).toBeNull();
  });

  test('should show/hide pagination and prev/next buttons depending on the amount of pages', async ({ page }) => {
    await initCarousel(page, { slidesPerPage: 2 });
    const host = await getHost(page);

    expect((await getSlides(page)).length).toBe(3);

    const buttonPrev1 = await getButtonPrev(page);
    const buttonNext1 = await getButtonNext(page);
    const pagination1 = await getPagination(page);

    expect(buttonPrev1).not.toBeNull();
    expect(buttonNext1).not.toBeNull();
    expect(pagination1).not.toBeNull();

    await removeSlide(host);
    await waitForStencilLifecycle(page);
    expect((await getSlides(page)).length).toBe(2);

    const buttonPrev2 = await page.$('p-carousel p-button-pure:first-of-type');
    const buttonNext2 = await page.$('p-carousel p-button-pure:last-of-type');
    const pagination2 = await getPagination(page);

    expect(buttonPrev2).toBeNull();
    expect(buttonNext2).toBeNull();
    expect(pagination2).toBeNull();

    await addSlide(host);
    await waitForStencilLifecycle(page);
    expect((await getSlides(page)).length).toBe(3);

    const buttonPrev3 = await getButtonPrev(page);
    const buttonNext3 = await getButtonNext(page);
    const pagination3 = await getPagination(page);

    expect(buttonPrev3).not.toBeNull();
    expect(buttonNext3).not.toBeNull();
    expect(pagination3).not.toBeNull();
  });
});

test.describe('viewport change', () => {
  test('should update visible amount of slides for BreakpointCustomizable slidesPerPage', async ({ page }) => {
    await initCarousel(page, { slidesPerPage: '{ base: 1, s: 2, m: 3}', amountOfSlides: 6 });
    const [slide1, slide2, slide3, slide4, slide5, slide6] = await getSlides(page);

    await page.setViewportSize({ height: 1000, width: 350 });
    await isElementCompletelyInViewport(slide1);
    await isElementNotInViewport(slide2);
    await isElementNotInViewport(slide3);
    await isElementNotInViewport(slide4);
    await isElementNotInViewport(slide5);
    await isElementNotInViewport(slide6);

    await page.setViewportSize({ height: 1000, width: 760 });
    await isElementCompletelyInViewport(slide1);
    await isElementCompletelyInViewport(slide2);
    await isElementNotInViewport(slide3);
    await isElementNotInViewport(slide4);
    await isElementNotInViewport(slide5);
    await isElementNotInViewport(slide6);

    await page.setViewportSize({ height: 1000, width: 1000 });
    await isElementCompletelyInViewport(slide1);
    await isElementCompletelyInViewport(slide2);
    await isElementCompletelyInViewport(slide3);
    await isElementNotInViewport(slide4);
    await isElementNotInViewport(slide5);
    await isElementNotInViewport(slide6);
  });

  test('should update pagination for BreakpointCustomizable slidesPerPage', async ({ page }) => {
    await initCarousel(page, { slidesPerPage: '{ base: 1, s: 2, m: 3}', amountOfSlides: 6 });
    const pagination = await getPagination(page);

    await page.setViewportSize({ height: 1000, width: 350 });
    await waitForStencilLifecycle(page);
    expect(await pagination.evaluate((el) => el.children.length)).toBe(6);

    await page.setViewportSize({ height: 1000, width: 760 });
    await waitForStencilLifecycle(page);
    expect(await pagination.evaluate((el) => el.children.length)).toBe(5);

    await page.setViewportSize({ height: 1000, width: 1000 });
    await waitForStencilLifecycle(page);
    expect(await pagination.evaluate((el) => el.children.length)).toBe(4);
  });
});

test.describe('focus behavior', () => {
  skipInBrowsers(['firefox', 'webkit']);

  test('should have correct focus cycle for slidesPerPage=1', async ({ page }) => {
    await initCarousel(page, { amountOfSlides: 2, slidesPerPage: 1, withFocusableElements: true });
    const host = await getHost(page);

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

  test('should have correct focus cycle for slidesPerPage=2', async ({ page }) => {
    await initCarousel(page, { slidesPerPage: 2, withFocusableElements: true });
    const host = await getHost(page);

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

  test('should have correct focus cycle if next button is clicked and then tabbed', async ({ page }) => {
    await initCarousel(page, { slidesPerPage: 1, withFocusableElements: false });
    const host = await getHost(page);
    const [slide1, slide2, slide3] = await getSlides(page);
    const btnNext = await getButtonNext(page);

    await btnNext.focus();
    await page.keyboard.press('Enter');
    await page.keyboard.press('Tab');
    await waitForSlideToBeActive(slide2);

    expect(await getActiveElementId(page)).toBe('slide2');
  });

  test('should have correct focus cycle if skip link has focus and is clicked', async ({ page }) => {
    await goto(page, ''); // need to have actual window.location
    await initCarousel(page, { slidesPerPage: 2, withFocusableElements: true, skipLinkTarget: '#link-after' });
    const skipLink = await getSkipLink(page);

    await skipLink.focus();
    await page.keyboard.press('Enter');

    expect(await getActiveElementId(page)).toBe('link-after');
  });
});

test.describe('events', () => {
  test('should not emit carouselChange event initially', async ({ page }) => {
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

    const nextButton = await getButtonNext(page);
    await nextButton.click();
    expect(await page.evaluate(() => (document as any).eventCounter)).toBe(1);
  });

  test('should emit carouselChange event on slide change', async ({ page }) => {
    await initCarousel(page);
    const host = await getHost(page);
    const prevButton = await getButtonPrev(page);
    const nextButton = await getButtonNext(page);

    await addEventListener(host, 'carouselChange');
    expect((await getEventSummary(host, 'carouselChange')).counter).toBe(0);

    await nextButton.click();
    expect((await getEventSummary(host, 'carouselChange')).counter).toBe(1);

    await prevButton.click();
    expect((await getEventSummary(host, 'carouselChange')).counter).toBe(2);
  });

  test('should correctly emit carouselChange event after reconnect', async ({ page }) => {
    await initCarousel(page);
    const host = await getHost(page);
    const prevButton = await getButtonPrev(page);
    const nextButton = await getButtonNext(page);

    await addEventListener(host, 'carouselChange');

    await reattachElementHandle(host);
    expect((await getEventSummary(host, 'carouselChange')).counter).toBe(0);

    await nextButton.click();
    expect((await getEventSummary(host, 'carouselChange')).counter).toBe(1);

    await prevButton.click();
    expect((await getEventSummary(host, 'carouselChange')).counter).toBe(2);
  });

  test('should emit both carouselChange and update event', async ({ page }) => {
    await initCarousel(page);
    const host = await getHost(page);

    await addEventListener(host, 'carouselChange');
    await addEventListener(host, 'update');
    expect((await getEventSummary(host, 'carouselChange')).counter).toBe(0);
    expect((await getEventSummary(host, 'update')).counter).toBe(0);

    const nextButton = await getButtonNext(page);
    await nextButton.click();
    expect((await getEventSummary(host, 'carouselChange')).counter).toBe(1);
    expect((await getEventSummary(host, 'update')).counter).toBe(1);
  });

  // TODO: find a way to test native click behaviour
  test.skip('should emit native events on slotted interactive elements', async ({ page }) => {
    await initCarousel(page, { amountOfSlides: 4, slidesPerPage: 1, withFocusableElements: true });
    const getSlottedLink1 = page.$('#link-1');
    const getSlottedLink2 = page.$('#link-4');

    await (await getSlottedLink1).click();
    await (await getSlottedLink2).click();
  });
});

test.describe('activeSlideIndex', () => {
  skipInBrowsers(['firefox', 'webkit']);

  test('should set active slide correctly on initialization', async ({ page }) => {
    await initCarousel(page, { activeSlideIndex: 2 });
    const [slide1, slide2, slide3] = await getSlides(page);

    await isElementNotInViewport(slide1);
    await isElementNotInViewport(slide2);
    await isElementCompletelyInViewport(slide3);
  });

  test('should slide correctly when changed', async ({ page }) => {
    await initCarousel(page);
    const host = await getHost(page);
    const [slide1, slide2, slide3] = await getSlides(page);

    await isElementCompletelyInViewport(slide1);
    await isElementNotInViewport(slide2);
    await isElementNotInViewport(slide3);

    await setProperty(host, 'activeSlideIndex', 1);
    await waitForSlideToBeActive(slide2);
    await isElementNotInViewport(slide1);
    await isElementCompletelyInViewport(slide2);
    await isElementNotInViewport(slide3);

    await setProperty(host, 'activeSlideIndex', 2);
    await waitForSlideToBeActive(slide3);
    await isElementNotInViewport(slide1);
    await isElementNotInViewport(slide2);
    await isElementCompletelyInViewport(slide3);

    await setProperty(host, 'activeSlideIndex', 0);
    await waitForSlideToBeActive(slide1);
    await isElementCompletelyInViewport(slide1);
    await isElementNotInViewport(slide2);
    await isElementNotInViewport(slide3);
  });

  test('should not cause new lifecycle', async ({ page }) => {
    await initCarousel(page);
    const host = await getHost(page);

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

  test('should emit update event', async ({ page }) => {
    await initCarousel(page);
    const host = await getHost(page);

    await addEventListener(host, 'update');
    expect((await getEventSummary(host, 'update')).counter).toBe(0);

    await setProperty(host, 'activeSlideIndex', 1);
    expect((await getEventSummary(host, 'update')).counter).toBe(1);
  });

  test('should slide correctly if slides without focusable elements are tabbed for slidesPerPage=1', async ({
    page,
  }) => {
    await initCarousel(page, { slidesPerPage: 1, withFocusableElements: false });
    const [slide1, slide2, slide3] = await getSlides(page);
    const [slideSlotted1] = await getSlottedSlides(page);

    await slideSlotted1.focus();
    await isElementCompletelyInViewport(slide1);
    await isElementNotInViewport(slide2);
    await isElementNotInViewport(slide3);

    await page.keyboard.press('Tab');
    await waitForSlideToBeActive(slide2);

    await isElementNotInViewport(slide1);
    await isElementCompletelyInViewport(slide2);
    await isElementNotInViewport(slide3);

    await page.keyboard.press('Tab');
    await waitForSlideToBeActive(slide3);

    await isElementNotInViewport(slide1);
    await isElementNotInViewport(slide2);
    await isElementCompletelyInViewport(slide3);

    await page.keyboard.down('Shift');
    await page.keyboard.press('Tab');
    await waitForSlideToBeActive(slide2);

    await isElementNotInViewport(slide1);
    await isElementCompletelyInViewport(slide2);
    await isElementNotInViewport(slide3);
  });

  test('should slide correctly if slides without focusable elements are tabbed for slidesPerPage=2', async ({
    page,
  }) => {
    await initCarousel(page, { amountOfSlides: 6, slidesPerPage: 2, withFocusableElements: false });
    const [slide1, slide2, slide3, slide4] = await getSlides(page);
    const [slideSlotted1] = await getSlottedSlides(page);

    await slideSlotted1.focus();
    await isElementCompletelyInViewport(slide1);
    await isElementCompletelyInViewport(slide2);
    await isElementNotInViewport(slide3);

    await page.keyboard.press('Tab');
    await waitForSlideToBeActive(slide1);

    await isElementCompletelyInViewport(slide1);
    await isElementCompletelyInViewport(slide2);
    await isElementNotInViewport(slide3);

    await page.keyboard.press('Tab');
    await waitForSlideToBeActive(slide2);

    await isElementNotInViewport(slide1);
    await isElementCompletelyInViewport(slide2);
    await isElementCompletelyInViewport(slide3);

    await page.keyboard.press('Tab');
    await waitForSlideToBeActive(slide3);

    await isElementNotInViewport(slide2);
    await isElementCompletelyInViewport(slide3);
    await isElementCompletelyInViewport(slide4);

    await page.keyboard.down('Shift');
    await page.keyboard.press('Tab');
    await waitForSlideToBeActive(slide3);

    await isElementNotInViewport(slide2);
    await isElementCompletelyInViewport(slide3);
    await isElementCompletelyInViewport(slide4);

    await page.keyboard.down('Shift');
    await page.keyboard.press('Tab');
    await waitForSlideToBeActive(slide2);

    await isElementCompletelyInViewport(slide2);
    await isElementCompletelyInViewport(slide3);
    await isElementNotInViewport(slide4);
  });

  test('should slide correctly if slides with focusable elements are tabbed', async ({ page }) => {
    await initCarousel(page, { slidesPerPage: 1, withFocusableElements: true });
    const [slide1, slide2, slide3] = await getSlides(page);
    const [slideSlotted1] = await getSlottedSlides(page);

    await slideSlotted1.focus();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await waitForSlideToBeActive(slide2);

    await isElementNotInViewport(slide1);
    await isElementCompletelyInViewport(slide2);
    await isElementNotInViewport(slide3);

    await page.keyboard.down('Shift');
    await page.keyboard.press('Tab');
    await waitForSlideToBeActive(slide1);

    await isElementCompletelyInViewport(slide1);
    await isElementNotInViewport(slide2);
    await isElementNotInViewport(slide3);
  });

  test('should slide correctly if slides with focusable elements are tabbed for slidesPerPage=2', async ({ page }) => {
    await initCarousel(page, { amountOfSlides: 4, slidesPerPage: 2, withFocusableElements: true });
    const [slide1, slide2, slide3, slide4] = await getSlides(page);
    const [slideSlotted1] = await getSlottedSlides(page);

    await slideSlotted1.focus();
    await isElementCompletelyInViewport(slide1);
    await isElementCompletelyInViewport(slide2);
    await isElementNotInViewport(slide3);

    await page.keyboard.press('Tab');

    await isElementCompletelyInViewport(slide1);
    await isElementCompletelyInViewport(slide2);
    await isElementNotInViewport(slide3);

    await page.keyboard.press('Tab');
    await waitForSlideToBeActive(slide1);

    await isElementCompletelyInViewport(slide1);
    await isElementCompletelyInViewport(slide2);
    await isElementNotInViewport(slide3);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await waitForSlideToBeActive(slide2);

    await isElementCompletelyInViewport(slide2);
    await isElementCompletelyInViewport(slide3);
    await isElementNotInViewport(slide4);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await waitForSlideToBeActive(slide3);

    await isElementNotInViewport(slide2);
    await isElementCompletelyInViewport(slide3);
    await isElementCompletelyInViewport(slide4);

    await page.keyboard.down('Shift');
    await page.keyboard.press('Tab');
    await waitForSlideToBeActive(slide3);

    await isElementNotInViewport(slide2);
    await isElementCompletelyInViewport(slide3);
    await isElementCompletelyInViewport(slide4);

    await page.keyboard.down('Shift');
    await page.keyboard.press('Tab');
    await page.keyboard.down('Shift');
    await page.keyboard.press('Tab');
    await waitForSlideToBeActive(slide2);

    await isElementCompletelyInViewport(slide2);
    await isElementCompletelyInViewport(slide3);
    await isElementNotInViewport(slide4);

    await page.keyboard.down('Shift');
    await page.keyboard.press('Tab');
    await page.keyboard.down('Shift');
    await page.keyboard.press('Tab');
    await waitForSlideToBeActive(slide1);

    await isElementCompletelyInViewport(slide1);
    await isElementCompletelyInViewport(slide2);
    await isElementNotInViewport(slide3);
  });
});

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initCarousel(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-carousel'], 'componentDidLoad: p-carousel').toBe(1);
    expect(status.componentDidLoad['p-button-pure'], 'componentDidLoad: p-button-pure').toBe(2);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(2);

    expect(status.componentDidUpdate['p-button-pure'], 'componentDidUpdate: p-button-pure').toBe(2);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(2);
    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(5);
  });

  test('should work without unnecessary round trips on btn next click', async ({ page }) => {
    await initCarousel(page);
    const buttonNext = await getButtonNext(page);
    await buttonNext.click();

    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-button-pure'], 'componentDidUpdate: p-button-pure').toBe(3);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(3);
    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(5);
  });
});

test.describe('rtl mode', () => {
  test('should render with rtl mode enabled', async ({ page }) => {
    await initCarousel(page, { dir: 'rtl' });
    const splide = getSplide(page);
    await expect(splide).toHaveClass(/splide--rtl/);
  });

  test('should move slides on prev button clicks', async ({ page }) => {
    await initCarousel(page, { dir: 'rtl' });
    const buttonPrev = await getButtonPrev(page);
    const [slide1, slide2, slide3] = await getSlides(page);

    await isElementCompletelyInViewport(slide1);
    await isElementNotInViewport(slide2);
    await isElementNotInViewport(slide3);

    await buttonPrev.click();
    await waitForSlideToBeActive(slide3);
    await isElementNotInViewport(slide1);
    await isElementNotInViewport(slide2);
    await isElementCompletelyInViewport(slide3);

    await buttonPrev.click();
    await waitForSlideToBeActive(slide2);
    await isElementNotInViewport(slide1);
    await isElementCompletelyInViewport(slide2);
    await isElementNotInViewport(slide3);

    await buttonPrev.click();
    await waitForSlideToBeActive(slide1);
    await isElementCompletelyInViewport(slide1);
    await isElementNotInViewport(slide2);
    await isElementNotInViewport(slide3);
  });

  test('should move slides on next button clicks', async ({ page }) => {
    await initCarousel(page, { dir: 'rtl' });
    const buttonNext = await getButtonNext(page);
    const [slide1, slide2, slide3] = await getSlides(page);

    await isElementCompletelyInViewport(slide1);
    await isElementNotInViewport(slide2);
    await isElementNotInViewport(slide3);

    await buttonNext.click();
    await waitForSlideToBeActive(slide2);
    await isElementNotInViewport(slide1);
    await isElementCompletelyInViewport(slide2);
    await isElementNotInViewport(slide3);

    await buttonNext.click();
    await waitForSlideToBeActive(slide3);
    await isElementNotInViewport(slide1);
    await isElementNotInViewport(slide2);
    await isElementCompletelyInViewport(slide3);

    await buttonNext.click();
    await waitForSlideToBeActive(slide1);
    await isElementCompletelyInViewport(slide1);
    await isElementNotInViewport(slide2);
    await isElementNotInViewport(slide3);
  });
});
