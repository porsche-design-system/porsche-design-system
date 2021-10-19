import {
  addEventListener,
  expectedStyleOnFocus,
  expectToMatchSnapshot,
  getAttribute,
  getCssClasses,
  getLifecycleStatus,
  getOutlineStyle,
  initAddEventListener,
  reattachElement,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForEventSerialization,
  waitForStencilLifecycle,
} from '../helpers';
import { ElementHandle, Page } from 'puppeteer';
import { BannerState } from '@porsche-design-system/components/dist/types/bundle';

const CSS_FADE_IN_DURATION = 600;
const CSS_FADE_OUT_DURATION = 600;

describe('banner', () => {
  let page: Page;

  beforeEach(async () => {
    page = await browser.newPage();
    await initAddEventListener(page);
  });
  afterEach(async () => await page.close());

  const initBanner = (state?: BannerState): Promise<void> => {
    const attributes = state ? `state="${state}"` : '';

    return setContentWithDesignSystem(
      page,
      `
      <p-banner ${attributes}>
        <span slot="title">Some notification title with an <a href="#" onclick="return false">anchor</a>.</span>
        <span slot="description">Some notification description with an <a href="#" onclick="return false">anchor</a>.</span>
      </p-banner>`
    );
  };

  const getHost = () => selectNode(page, 'p-banner');
  const getButton = () => selectNode(page, 'p-banner >>> p-button-pure');
  const getTitleLink = () => selectNode(page, 'p-banner [slot="title"] a');
  const getDescriptionLink = () => selectNode(page, 'p-banner [slot="description"] a');

  it('should render close button with type of "button"', async () => {
    await initBanner();
    const closeBtnReal = await selectNode(page, 'p-banner >>> p-button-pure >>> button');
    expect(await getAttribute(closeBtnReal, 'type')).toBe('button');
  });

  it('should render without button', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-banner persistent="true">
        <span slot="title">Some notification title</span>
        <span slot="description">Some notification description.</span>
      </p-banner>
    `
    );
    const el = await getButton();
    expect(el).toBeNull();
  });

  describe('close', () => {
    const getComputedElementHandleStyles = async (elHandle: ElementHandle<Element>): Promise<CSSStyleDeclaration> => {
      return elHandle.evaluate((el: Element): CSSStyleDeclaration => {
        return getComputedStyle(el);
      });
    };

    it('should remove banner from DOM by click on close button', async () => {
      await initBanner();

      const button = await getButton();

      await page.waitForTimeout(CSS_FADE_IN_DURATION);
      await button.click();
      await waitForEventSerialization(page);
      // we have to wait for the animation to end before the dom is cleared
      await page.waitForTimeout(CSS_FADE_OUT_DURATION);
      expect(await getHost()).toBeNull();
    });

    it('should remove banner from DOM by trigger ESC key', async () => {
      await initBanner();

      await page.waitForTimeout(CSS_FADE_IN_DURATION);
      await page.keyboard.press('Escape');
      await waitForEventSerialization(page);
      // we have to wait for the animation to end before the dom is cleared
      await page.waitForTimeout(CSS_FADE_OUT_DURATION);
      expect(await getHost()).toBeNull();
    });

    it('should emit custom event by click on close button', async () => {
      await initBanner();

      const host = await getHost();
      const button = await getButton();
      let calls = 0;
      await addEventListener(host, 'dismiss', () => calls++);

      await page.waitForTimeout(CSS_FADE_IN_DURATION);
      await button.click();
      await waitForEventSerialization(page);
      expect(calls).toBe(1);
    });

    it('should remove and re-attach event', async () => {
      await initBanner();

      const host = await getHost();
      const button = await getButton();
      let calls = 0;
      await addEventListener(host, 'dismiss', () => calls++);

      // Remove and re-attach component to check if events are duplicated / fire at all
      await reattachElement(page, 'p-banner');

      await page.waitForTimeout(CSS_FADE_IN_DURATION);
      await button.click();
      await waitForEventSerialization(page);
      await waitForEventSerialization(page); // 🙈

      expect(calls).toBe(1);
    });

    it('should not influence other banner styles', async () => {
      await setContentWithDesignSystem(
        page,
        `
      <p-banner id="bannerOne" style="--p-banner-position-type: static">
        <span slot="title">Some notification title with an <a href="#" onclick="return false">anchor</a>.</span>
        <span slot="description">Some notification description with an <a href="#" onclick="return false">anchor</a>.</span>
      </p-banner>
      <p-banner id="bannerTwo" style="--p-banner-position-type: static">
        <span slot="title">Some notification title with an <a href="#" onclick="return false">anchor</a>.</span>
        <span slot="description">Some notification description with an <a href="#" onclick="return false">anchor</a>.</span>
      </p-banner>`
      );

      const bannerOne = await selectNode(page, '#bannerOne');
      const bannerTwo = await selectNode(page, '#bannerTwo');
      const closeButtonBannerTwo = await selectNode(page, '#bannerTwo >>> p-button-pure');

      const classListBannerOne = await getCssClasses(bannerOne);
      const classListBannerTwo = await getCssClasses(bannerTwo);
      const bannerOneStyles = await getComputedElementHandleStyles(bannerOne);
      const bannerTwoStyles = await getComputedElementHandleStyles(bannerTwo);

      expect(classListBannerOne).toEqual(classListBannerTwo);
      expect(bannerOneStyles).toEqual(bannerTwoStyles);

      await closeButtonBannerTwo.click();
      await waitForEventSerialization(page);

      const classListBannerOneAfterClick = await getCssClasses(bannerOne);
      const bannerOneStylesAfterClick = await getComputedElementHandleStyles(bannerOne);

      expect(classListBannerOne).toEqual(classListBannerOneAfterClick);
      expect(bannerOneStyles).toEqual(bannerOneStylesAfterClick);
    });
  });

  describe('focus state', () => {
    it('should be shown by keyboard navigation only for slotted <a>', async () => {
      await initBanner();

      const titleLink = await getTitleLink();
      const descriptionLink = await getDescriptionLink();
      const hidden = expectedStyleOnFocus({ color: 'transparent', offset: '1px' });
      const visible = expectedStyleOnFocus({ color: 'hover', offset: '1px' });

      await page.waitForTimeout(CSS_FADE_IN_DURATION);

      expect(await getOutlineStyle(titleLink)).toBe(hidden);
      expect(await getOutlineStyle(descriptionLink)).toBe(hidden);

      await titleLink.click();

      expect(await getOutlineStyle(titleLink)).toBe(hidden);

      await page.keyboard.down('ShiftLeft');
      await page.keyboard.press('Tab');
      await page.keyboard.up('ShiftLeft');
      await page.keyboard.press('Tab');

      expect(await getOutlineStyle(titleLink)).toBe(visible);

      await descriptionLink.click();

      expect(await getOutlineStyle(descriptionLink)).toBe(hidden);

      await page.keyboard.down('ShiftLeft');
      await page.keyboard.press('Tab');
      await page.keyboard.up('ShiftLeft');
      await page.keyboard.press('Tab');

      expect(await getOutlineStyle(descriptionLink)).toBe(visible);
    });
  });

  describe('lifecycle', () => {
    it('should work without unnecessary round trips on init', async () => {
      await initBanner('error');

      const status = await getLifecycleStatus(page);

      expect(status.componentDidLoad['p-banner'], 'componentDidLoad: p-banner').toBe(1);
      expect(status.componentDidLoad['p-content-wrapper'], 'componentDidLoad: p-content-wrapper').toBe(1);
      expect(status.componentDidLoad['p-headline'], 'componentDidLoad: p-headline').toBe(1);
      expect(status.componentDidLoad['p-text'], 'componentDidLoad: p-text').toBe(2); // one included in button-pure
      expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(2); // one included in button-pure
      expect(status.componentDidLoad['p-button-pure'], 'componentDidLoad: p-button-pure').toBe(1);

      expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(8);
      expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
    });

    it('should work without unnecessary round trips after state change', async () => {
      await initBanner('error');
      const host = await getHost();

      await setProperty(host, 'state', 'warning');
      await waitForStencilLifecycle(page);

      const status = await getLifecycleStatus(page);

      expect(status.componentDidUpdate['p-banner'], 'componentDidUpdate: p-banner').toBe(1);
      expect(status.componentDidUpdate['p-icon'], 'componentDidUpdate: p-icon').toBe(1);

      expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(8);
      expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(2);
    });
  });

  describe('accessibility', () => {
    it('should expose correct initial accessibility tree properties', async () => {
      await initBanner('neutral');
      const getWrapper = () => selectNode(page, 'p-banner >>> p-content-wrapper');

      await expectToMatchSnapshot(page, await getWrapper(), { interestingOnly: false });
    });
  });
});
