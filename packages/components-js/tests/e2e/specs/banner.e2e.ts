import {
  addEventListener,
  getBrowser, getElementStyle, getElementStyleOnFocus, getElementStyleOnHover,
  initAddEventListener, reattachElement,
  selectNode,
  setContentWithDesignSystem,
  waitForStencilLifecycle
} from '../helpers';
import { Page } from 'puppeteer';

const CSS_FADE_IN_DURATION = 2000;
const CSS_FADE_OUT_DURATION = 1000;

describe('banner', () => {
  let page: Page;

  beforeEach(async () => {
    page = await getBrowser().newPage();
    await initAddEventListener(page);
  });
  afterEach(async () => await page.close());

  const getBannerHost = () => selectNode(page, 'p-banner');
  const getBannerButton = () => selectNode(page, 'p-banner >>> p-button-pure');
  const getBannerTitleLink = () => selectNode(page, 'p-banner [slot="title"] a');
  const getBannerDescriptionLink = () => selectNode(page, 'p-banner [slot="description"] a');

  it('should render', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-banner>
        <span slot="title">Some notification title</span>
        <span slot="description">Some notification description.</span>
      </p-banner>
    `
    );
    const el = await getBannerButton();
    const getActiveEl = await page.$eval('p-banner', (el) => el.shadowRoot.activeElement.tagName);

    expect(el).toBeDefined();
    expect(getActiveEl.toLowerCase()).toBe('p-button-pure');
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
    const el = await getBannerButton();
    expect(el).toBeNull();
  });

  it('should remove banner from DOM by click on close button', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-banner>
        <span slot="title">Some notification title</span>
        <span slot="description">Some notification description.</span>
      </p-banner>
    `
    );

    const innerButton = await getBannerButton();

    await page.waitFor(CSS_FADE_IN_DURATION);
    await innerButton.click();
    await waitForStencilLifecycle(page);
    // we have to wait for the animation to end before the dom is cleared
    await page.waitFor(CSS_FADE_OUT_DURATION);
    expect(await getBannerHost()).toBeNull();
  });

  it('should remove banner from DOM by trigger ESC key', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-banner>
        <span slot="title">Some notification title</span>
        <span slot="description">Some notification description.</span>
      </p-banner>
    `
    );

    await page.waitFor(CSS_FADE_IN_DURATION);
    await page.keyboard.press('Escape');
    await waitForStencilLifecycle(page);
    // we have to wait for the animation to end before the dom is cleared
    await page.waitFor(CSS_FADE_OUT_DURATION);
    expect(await getBannerHost()).toBeNull();
  });

  it('should emit custom event by click on close button', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-banner>
        <span slot="title">Some notification title</span>
        <span slot="description">Some notification description.</span>
      </p-banner>
    `
    );

    const host = await getBannerHost();
    const innerButton = await getBannerButton();
    let calls = 0;
    await addEventListener(host, 'dismiss', () => calls++);

    await page.waitFor(CSS_FADE_IN_DURATION);
    await innerButton.click();
    await waitForStencilLifecycle(page);
    expect(calls).toBe(1);
  });

  it('should remove and re-attach event', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-banner>
        <span slot="title">Some notification title</span>
        <span slot="description">Some notification description.</span>
      </p-banner>
    `
    );
    const host = await getBannerHost();
    const innerButton = await getBannerButton();
    let calls = 0;
    await addEventListener(host, 'dismiss', () => calls++);

    // Remove and re-attach component to check if events are duplicated / fire at all
    await reattachElement(page, 'p-banner');

    await page.waitFor(CSS_FADE_IN_DURATION);
    await innerButton.click();
    await waitForStencilLifecycle(page);
    expect(calls).toBe(1);
  });

  describe('hover state', () => {
    it('should change color of slotted <a> when it is hovered', async () => {
      await setContentWithDesignSystem(
        page,
        `
        <p-banner>
          <span slot="title">Some banner title with a <a href="#">link</a>.</span>
          <span slot="description">Some banner description with a <a href="#">link</a>.</span>
        </p-banner>`
      );

      await page.waitFor(CSS_FADE_IN_DURATION);

      const titleLink = await getBannerTitleLink();
      const titleLinkColorInitial = await getElementStyle(titleLink, 'color');
      const descriptionLink = await getBannerDescriptionLink();
      const descriptionLinkColorInitial = await getElementStyle(titleLink, 'color');

      expect(await getElementStyleOnHover(titleLink, 'color')).not.toBe(titleLinkColorInitial, 'title link should get hover style');

      expect(await getElementStyleOnHover(descriptionLink, 'color')).not.toBe(descriptionLinkColorInitial, 'description link should get hover style');
      expect(await getElementStyle(titleLink, 'color', {waitForTransition: true})).toBe(titleLinkColorInitial, 'title link should loose hover style');
    });
  });

  describe('focus state', () => {
    it('should show outline of slotted <a> when it is focused', async () => {
      await setContentWithDesignSystem(
        page,
        `
        <p-banner>
          <span slot="title">Some banner title with a <a href="#">link</a>.</span>
          <span slot="description">Some banner description with a <a href="#">link</a>.</span>
        </p-banner>`
      );

      await page.waitFor(CSS_FADE_IN_DURATION);

      const titleLink = await getBannerTitleLink();
      const titleLinkOutlineInitial = await getElementStyle(titleLink, 'outline');
      const descriptionLink = await getBannerDescriptionLink();
      const descriptionLinkOutlineInitial = await getElementStyle(titleLink, 'outline');

      expect(await getElementStyleOnFocus(titleLink, 'outline')).not.toBe(titleLinkOutlineInitial, 'title link should get focus style');

      expect(await getElementStyleOnFocus(descriptionLink, 'outline')).not.toBe(descriptionLinkOutlineInitial, 'description link should get focus style');
      expect(await getElementStyle(titleLink, 'outline')).toBe(titleLinkOutlineInitial, 'title link should loose focus style');
    });
  });
});
