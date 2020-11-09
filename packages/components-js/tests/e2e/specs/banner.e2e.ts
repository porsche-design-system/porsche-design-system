import {
  addEventListener,
  getBrowser, getStyleOnFocus,
  initAddEventListener, reattachElement,
  selectNode,
  setContentWithDesignSystem,
  waitForStencilLifecycle
} from '../helpers';
import { Page } from 'puppeteer';
import { expectedStyleOnFocus } from '../constants';

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
  const getTitleLink = () => selectNode(page, 'p-banner [slot="title"] a');
  const getDescriptionLink = () => selectNode(page, 'p-banner [slot="description"] a');

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

      const titleLink = await getTitleLink();
      const descriptionLink = await getDescriptionLink();

      expect(await getStyleOnFocus(titleLink)).toBe(expectedStyleOnFocus());
      expect(await getStyleOnFocus(descriptionLink)).toBe(expectedStyleOnFocus());
    });
  });
});
