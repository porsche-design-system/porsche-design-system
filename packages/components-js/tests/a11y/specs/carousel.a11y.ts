import { type Page, test, expect } from '@playwright/test';
import {
  getActiveElementTagNameInShadowRoot,
  getAttribute,
  getElementStyle,
  setContentWithDesignSystem,
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

const getHost = (page: Page) => page.$('p-carousel');
const getSkipLinkHost = (page: Page) => page.$('p-carousel .skip-link');
const getSplide = (page: Page) => page.$('p-carousel .splide');
const getSplideTrack = (page: Page) => page.$('p-carousel .splide__track');
const getSlides = (page: Page) => page.$$('p-carousel .splide .splide__slide');
const getButtonPrev = (page: Page) => page.$('p-carousel p-button-pure:first-of-type button');
const getButtonNext = (page: Page) => page.$('p-carousel p-button-pure:last-of-type button');

test('should update prev/next buttons aria-labels on slide change', async ({ page }) => {
  await initCarousel(page, { amountOfSlides: 2 });
  const buttonPrev = await getButtonPrev(page);
  const buttonNext = await getButtonNext(page);

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

test('should remove aria-hidden of slides on ready and after slide moved', async ({ page }) => {
  await initCarousel(page);
  const [slide1, slide2, slide3] = await getSlides(page);
  const buttonNext = await getButtonNext(page);

  expect(await getAttribute(slide1, 'aria-hidden')).toBe(null);
  expect(await getAttribute(slide2, 'aria-hidden')).toBe(null);
  expect(await getAttribute(slide3, 'aria-hidden')).toBe(null);

  await buttonNext.click();
  await waitForStencilLifecycle(page);

  expect(await getAttribute(slide1, 'aria-hidden')).toBe(null);
  expect(await getAttribute(slide2, 'aria-hidden')).toBe(null);
  expect(await getAttribute(slide3, 'aria-hidden')).toBe(null);
});

test('should remove aria-hidden of slides on resized', async ({ page }) => {
  await initCarousel(page);
  const [slide1, slide2, slide3] = await getSlides(page);
  await page.setViewportSize({ width: 800, height: 600 });
  await waitForStencilLifecycle(page);

  expect(await getAttribute(slide1, 'aria-hidden')).toBe(null);
  expect(await getAttribute(slide2, 'aria-hidden')).toBe(null);
  expect(await getAttribute(slide3, 'aria-hidden')).toBe(null);
});

test('should expose correct initial accessibility tree', async ({ page }) => {
  await initCarousel(page);
  const buttonPrev = await getButtonPrev(page);
  const buttonNext = await getButtonNext(page);
  const splide = await getSplide(page);
  const splideTrack = await getSplideTrack(page);
  const [slide1, slide2, slide3] = await getSlides(page);

  // await expectA11yToMatchSnapshot(page, buttonPrev, { message: 'buttonPrev' });
  // expect(await getAttribute(buttonPrev, 'aria-controls')).toBe('carousel-panel');
  // await expectA11yToMatchSnapshot(page, buttonNext, { message: 'buttonNext' });
  // expect(await getAttribute(buttonNext, 'aria-controls')).toBe('carousel-panel');
  // await expectA11yToMatchSnapshot(page, splide, { message: 'splide', interestingOnly: false });

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

test.fixme('should expose correct initial accessibility tree when aria prop is defined', async ({ page }) => {
  await initCarousel(page, { aria: "{'aria-label': 'Other Heading'}" });
  const splide = await getSplide(page);

  // await expectA11yToMatchSnapshot(page, splide, { message: 'splide', interestingOnly: false });
});
test('should change skip-link to visible if it receives keyboard focus', async ({ page }) => {
  await initCarousel(page, { skipLinkTarget: '#link-after' });
  const host = await getHost(page);
  const skipLinkHost = await getSkipLinkHost(page);

  expect(await getElementStyle(skipLinkHost, 'opacity')).toBe('0');

  await page.keyboard.press('Tab');

  expect(await getActiveElementTagNameInShadowRoot(host)).toBe('P-LINK-PURE');
  expect(await getElementStyle(skipLinkHost, 'opacity')).toBe('1');
});
