import type { Page } from 'puppeteer';
import {
  expectA11yToMatchSnapshot,
  getAttribute,
  selectNode,
  setContentWithDesignSystem,
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

const getSplide = () => selectNode(page, 'p-carousel >>> .splide');
const getSplideTrack = () => selectNode(page, 'p-carousel >>> .splide__track');
const getSlides = async () => (await selectNode(page, 'p-carousel >>> .splide')).$$('.splide__slide');
const getButtonPrev = () => selectNode(page, 'p-carousel >>> p-button-pure:first-of-type >>> button');
const getButtonNext = () => selectNode(page, 'p-carousel >>> p-button-pure:last-of-type >>> button');

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
