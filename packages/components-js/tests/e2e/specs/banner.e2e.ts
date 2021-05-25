import {
  addEventListener,
  expectedStyleOnFocus,
  getActiveElementTagNameInShadowRoot,
  getBrowser,
  getLifecycleStatus,
  getOutlineStyle,
  getProperty,
  getStyleOnFocus,
  initAddEventListener,
  reattachElement,
  selectNode,
  setAttribute,
  setContentWithDesignSystem,
  waitForInheritedCSSTransition,
  waitForStencilLifecycle,
} from '../helpers';
import { ElementHandle, Page } from 'puppeteer';
import { BannerState } from '@porsche-design-system/components/dist/types/bundle';

const CSS_FADE_IN_DURATION = 2000;
const CSS_FADE_OUT_DURATION = 1000;

describe('banner', () => {
  let page: Page;

  beforeEach(async () => {
    page = await getBrowser().newPage();
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

  it('should render and focus close button', async () => {
    await initBanner();

    const host = await getHost();
    const activeElement = await getActiveElementTagNameInShadowRoot(host);

    expect(activeElement.toLowerCase()).toBe('p-button-pure');
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
      await waitForStencilLifecycle(page);
      // we have to wait for the animation to end before the dom is cleared
      await page.waitForTimeout(CSS_FADE_OUT_DURATION);
      expect(await getHost()).toBeNull();
    });

    it('should remove banner from DOM by trigger ESC key', async () => {
      await initBanner();

      await page.waitForTimeout(CSS_FADE_IN_DURATION);
      await page.keyboard.press('Escape');
      await waitForStencilLifecycle(page);
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
      await waitForStencilLifecycle(page);
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
      await waitForStencilLifecycle(page);
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
      const closeButton = await selectNode(page, '#bannerTwo >>> p-button-pure');

      let classListBannerOne = await getProperty(bannerOne, 'classList');
      let classListBannerTwo = await getProperty(bannerTwo, 'classList');
      let bannerOneStyles = await getComputedElementHandleStyles(bannerOne);
      let bannerTwoStyles = await getComputedElementHandleStyles(bannerTwo);

      expect(classListBannerOne).toEqual(classListBannerTwo);
      expect(bannerOneStyles).toEqual(bannerTwoStyles);

      await closeButton.click();
      await waitForStencilLifecycle(page);

      classListBannerOne = await getProperty(bannerOne, 'classList');
      bannerOneStyles = await getComputedElementHandleStyles(bannerOne);

      expect(classListBannerOne).toEqual(classListBannerTwo);
      expect(bannerOneStyles).toEqual(bannerTwoStyles);
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
      await waitForInheritedCSSTransition(page);

      expect(await getOutlineStyle(titleLink)).toBe(hidden);

      await page.keyboard.down('ShiftLeft');
      await page.keyboard.press('Tab');
      await page.keyboard.up('ShiftLeft');
      await page.keyboard.press('Tab');

      expect(await getOutlineStyle(titleLink)).toBe(visible);

      await descriptionLink.click();
      await waitForInheritedCSSTransition(page);

      expect(await getOutlineStyle(descriptionLink)).toBe(hidden);

      await page.keyboard.down('ShiftLeft');
      await page.keyboard.press('Tab');
      await page.keyboard.up('ShiftLeft');
      await page.keyboard.press('Tab');

      expect(await getOutlineStyle(descriptionLink)).toBe(visible);
    });

    it('should show outline of slotted <a> when it is focused', async () => {
      await initBanner();

      await page.waitForTimeout(CSS_FADE_IN_DURATION);

      const titleLink = await getTitleLink();
      const descriptionLink = await getDescriptionLink();

      expect(await getStyleOnFocus(titleLink)).toBe(expectedStyleOnFocus({ offset: '1px' }));
      expect(await getStyleOnFocus(descriptionLink)).toBe(expectedStyleOnFocus({ offset: '1px' }));
    });
  });

  describe('lifecycle', () => {
    it('should work without unnecessary round trips on init', async () => {
      await initBanner('error');

      const status = await getLifecycleStatus(page);

      expect(status.componentDidLoad['p-banner']).toBe(1, 'componentDidLoad: p-banner');
      expect(status.componentDidLoad['p-content-wrapper']).toBe(1, 'componentDidLoad: p-content-wrapper');
      expect(status.componentDidLoad['p-headline']).toBe(1, 'componentDidLoad: p-headline');
      expect(status.componentDidLoad['p-text']).toBe(2, 'componentDidLoad: p-text'); // one included in button-pure
      expect(status.componentDidLoad['p-icon']).toBe(2, 'componentDidLoad: p-icon'); // one included in button-pure
      expect(status.componentDidLoad['p-button-pure']).toBe(1, 'componentDidLoad: p-button-pure');

      expect(status.componentDidLoad.all).toBe(8, 'componentDidLoad: all');
      expect(status.componentDidUpdate.all).toBe(0, 'componentDidUpdate: all');
    });

    it('should work without unnecessary round trips after state change', async () => {
      await initBanner('error');
      const host = await getHost();

      await setAttribute(host, 'state', 'warning');
      await waitForStencilLifecycle(page);

      const status = await getLifecycleStatus(page);

      expect(status.componentDidUpdate['p-banner']).toBe(1, 'componentDidUpdate: p-banner');
      expect(status.componentDidUpdate['p-icon']).toBe(1, 'componentDidUpdate: p-icon');

      expect(status.componentDidLoad.all).toBe(8, 'componentDidLoad: all');
      expect(status.componentDidUpdate.all).toBe(2, 'componentDidUpdate: all');
    });
  });
});
