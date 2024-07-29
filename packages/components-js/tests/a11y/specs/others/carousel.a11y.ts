import { type Page, test, expect } from '@playwright/test';
import {
  getActiveElementTagNameInShadowRoot,
  getAttribute,
  getElementStyle,
  setContentWithDesignSystem,
  waitForStencilLifecycle,
} from '../../helpers';
import type {
  CarouselAriaAttribute,
  SelectedAriaAttributes,
} from '@porsche-design-system/components/dist/types/bundle';

type InitOptions = {
  heading?: boolean;
  slottedHeading?: boolean;
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
    heading = true,
    slottedHeading = false,
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
    heading ? `heading="Some heading"` : '',
    aria && `aria="${aria}"`,
    slidesPerPage ? `slides-per-page="${slidesPerPage}"` : '',
    rewind === false ? 'rewind="false"' : '',
    activeSlideIndex ? `active-slide-index="${activeSlideIndex}"` : '',
    skipLinkTarget ? `skip-link-target="${skipLinkTarget}"` : '',
  ].join(' ');

  const content = `${focusableElementBefore}<p-carousel ${attrs}>
  ${slottedHeading ? `<h2 slot="heading">${heading}</h2>` : ''}
  ${slides}
</p-carousel>${focusableElementAfter}`;

  return setContentWithDesignSystem(page, content);
};

const getHost = (page: Page) => page.locator('p-carousel');
const getSkipLinkHost = (page: Page) => page.locator('p-carousel .skip-link');
const getSplide = (page: Page) => page.locator('p-carousel .splide');
const getSplideTrack = (page: Page) => page.locator('p-carousel .splide__track');
const getSlides = (page: Page) => page.locator('p-carousel .splide .splide__slide').all();
const getButtonPrev = (page: Page) => page.locator('p-carousel p-button-pure:first-of-type button');
const getButtonNext = (page: Page) => page.locator('p-carousel p-button-pure:last-of-type button');

test('should update prev/next buttons aria-labels on slide change', async ({ page }) => {
  await initCarousel(page, { amountOfSlides: 2 });
  const buttonPrev = getButtonPrev(page);
  const buttonNext = getButtonNext(page);

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
  const buttonNext = getButtonNext(page);

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

test('should expose correct initial ARIA attributes', async ({ page }) => {
  await initCarousel(page);
  const buttonPrev = getButtonPrev(page);
  const buttonNext = getButtonNext(page);
  const splide = getSplide(page);
  const splideTrack = getSplideTrack(page);
  const [slide1, slide2, slide3] = await getSlides(page);

  // await expectA11yToMatchSnapshot(page, buttonPrev, { message: 'buttonPrev' });
  // expect(await getAttribute(buttonPrev, 'aria-controls')).toBe('carousel-panel');
  // await expectA11yToMatchSnapshot(page, buttonNext, { message: 'buttonNext' });
  // expect(await getAttribute(buttonNext, 'aria-controls')).toBe('carousel-panel');
  // await expectA11yToMatchSnapshot(page, splide, { message: 'splide', interestingOnly: false });

  expect(await getAttribute(splide, 'aria-labelledby')).toBe('heading');

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

test('should expose correct aria-labelledby on splide element if slotted heading is set', async ({ page }) => {
  await initCarousel(page, { heading: false, slottedHeading: true });
  const splide = await getSplide(page);

  expect(await getAttribute(splide, 'aria-labelledby')).toBe('heading');
});

test('should expose correct aria-label when aria prop is defined and heading is set', async ({ page }) => {
  const otherHeading = 'Other heading';
  await initCarousel(page, { aria: `{'aria-label': '${otherHeading}'}` });
  const splide = await getSplide(page);

  expect(await getAttribute(splide, 'aria-labelledby')).toBe(null);
  expect(await getAttribute(splide, 'aria-label')).toBe(otherHeading);
});

test('should expose correct aria-label when aria prop is defined and slotted heading is set', async ({ page }) => {
  const otherHeading = 'Other heading';
  await initCarousel(page, { slottedHeading: true, aria: `{'aria-label': '${otherHeading}'}` });
  const splide = getSplide(page);

  expect(await getAttribute(splide, 'aria-labelledby')).toBe(null);
  expect(await getAttribute(splide, 'aria-label')).toBe(otherHeading);
});

test('should expose correct aria-label when aria prop is defined and no heading is set', async ({ page }) => {
  const someHeading = 'Some heading';
  await initCarousel(page, { heading: false, aria: `{'aria-label': '${someHeading}'}` });
  const splide = getSplide(page);

  expect(await getAttribute(splide, 'aria-labelledby')).toBe(null);
  expect(await getAttribute(splide, 'aria-label')).toBe(someHeading);
});

test('should change skip-link to visible if it receives keyboard focus', async ({ page }) => {
  await initCarousel(page, { skipLinkTarget: '#link-after' });
  const host = getHost(page);
  const skipLinkHost = getSkipLinkHost(page);

  expect(await getElementStyle(skipLinkHost, 'opacity')).toBe('0');

  await page.keyboard.press('Tab');

  expect(await getActiveElementTagNameInShadowRoot(host)).toBe('P-LINK-PURE');
  expect(await getElementStyle(skipLinkHost, 'opacity')).toBe('1');
});
