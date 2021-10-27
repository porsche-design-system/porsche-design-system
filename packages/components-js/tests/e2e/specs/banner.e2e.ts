import {
  addEventListener,
  getCssClasses,
  getLifecycleStatus,
  getProperty,
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
        <span slot="title">Some notification title</span>
        <span slot="description">Some notification description.</span>
      </p-banner>`
    );
  };

  const getHost = () => selectNode(page, 'p-banner');
  const getInlineNotification = () => selectNode(page, 'p-banner >>> p-inline-notification');
  const getCloseButton = () => selectNode(page, 'p-banner >>> p-inline-notification >>> p-button-pure.close');

  it('should forward props correctly to p-inline-notification', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-banner state="error" persistent="true" theme="dark">
        <span slot="title">Some notification title</span>
        <span slot="description">Some notification description.</span>
      </p-banner>
    `
    );

    const inlineNotification = await getInlineNotification();
    expect(await getProperty(inlineNotification, 'state')).toBe('error');
    expect(await getProperty(inlineNotification, 'persistent')).toBe(true);
    expect(await getProperty(inlineNotification, 'theme')).toBe('dark');
  });

  describe('close', () => {
    const getComputedElementHandleStyles = async (elHandle: ElementHandle<Element>): Promise<CSSStyleDeclaration> => {
      return elHandle.evaluate((el: Element): CSSStyleDeclaration => {
        return getComputedStyle(el);
      });
    };

    it('should remove banner from DOM by click on close button', async () => {
      await initBanner();

      const closeButton = await getCloseButton();

      await page.waitForTimeout(CSS_FADE_IN_DURATION);
      await closeButton.click();
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
      const closeButton = await getCloseButton();
      let calls = 0;
      await addEventListener(host, 'dismiss', () => calls++);

      await page.waitForTimeout(CSS_FADE_IN_DURATION);
      await closeButton.click();
      await waitForEventSerialization(page);
      expect(calls).toBe(1);
    });

    it('should remove and re-attach event', async () => {
      await initBanner();

      const host = await getHost();
      const closeButton = await getCloseButton();
      let calls = 0;
      await addEventListener(host, 'dismiss', () => calls++);

      // Remove and re-attach component to check if events are duplicated / fire at all
      await reattachElement(page, 'p-banner');

      await page.waitForTimeout(CSS_FADE_IN_DURATION);
      await closeButton.click();
      await waitForEventSerialization(page);
      await waitForEventSerialization(page); // 🙈

      expect(calls).toBe(1);
    });

    it('should not influence other banner styles', async () => {
      await setContentWithDesignSystem(
        page,
        `
        <p-banner id="banner1" style="--p-banner-position-type: static">
          <span slot="title">Some notification title with an <a href="#" onclick="return false">anchor</a>.</span>
          <span slot="description">Some notification description with an <a href="#" onclick="return false">anchor</a>.</span>
        </p-banner>
        <p-banner id="banner2" style="--p-banner-position-type: static">
          <span slot="title">Some notification title with an <a href="#" onclick="return false">anchor</a>.</span>
          <span slot="description">Some notification description with an <a href="#" onclick="return false">anchor</a>.</span>
        </p-banner>`
      );

      const banner1 = await selectNode(page, '#banner1');
      const banner2 = await selectNode(page, '#banner2');
      const closeButtonBanner2 = await selectNode(page, '#banner2 >>> p-inline-notification >>> p-button-pure');

      const classListBanner1 = await getCssClasses(banner1);
      const classListBanner2 = await getCssClasses(banner2);
      const banner1Styles = await getComputedElementHandleStyles(banner1);
      const banner2Styles = await getComputedElementHandleStyles(banner2);

      expect(classListBanner1).toEqual(classListBanner2);
      expect(banner1Styles).toEqual(banner2Styles);

      await closeButtonBanner2.click();
      await waitForEventSerialization(page);

      const classListBanner1AfterClick = await getCssClasses(banner1);
      const banner1StylesAfterClick = await getComputedElementHandleStyles(banner1);

      expect(classListBanner1).toEqual(classListBanner1AfterClick);
      expect(banner1Styles).toEqual(banner1StylesAfterClick);
    });
  });

  describe('lifecycle', () => {
    it('should work without unnecessary round trips on init', async () => {
      await initBanner('error');

      const status = await getLifecycleStatus(page);

      expect(status.componentDidLoad['p-banner'], 'componentDidLoad: p-banner').toBe(1);
      expect(status.componentDidLoad['p-inline-notification'], 'componentDidLoad: p-inline-notification').toBe(1);
      expect(status.componentDidLoad['p-content-wrapper'], 'componentDidLoad: p-content-wrapper').toBe(1);
      expect(status.componentDidLoad['p-headline'], 'componentDidLoad: p-headline').toBe(1);
      expect(status.componentDidLoad['p-text'], 'componentDidLoad: p-text').toBe(2); // one included in button-pure
      expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(2); // one included in button-pure
      expect(status.componentDidLoad['p-button-pure'], 'componentDidLoad: p-button-pure').toBe(1);

      expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(9);
      expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
    });

    it('should work without unnecessary round trips after state change', async () => {
      await initBanner('error');
      const host = await getHost();

      await setProperty(host, 'state', 'warning');
      await waitForStencilLifecycle(page);

      const status = await getLifecycleStatus(page);

      expect(status.componentDidUpdate['p-banner'], 'componentDidUpdate: p-banner').toBe(1);
      expect(status.componentDidUpdate['p-inline-notification'], 'componentDidUpdate: p-inline-notification').toBe(1);
      expect(status.componentDidUpdate['p-icon'], 'componentDidUpdate: p-icon').toBe(1);

      expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(9);
      expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(3);
    });
  });
});
