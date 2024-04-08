import type { ElementHandle, Page } from 'playwright';
import { expect, test } from '@playwright/test';
import {
  addEventListener,
  getCssClasses,
  getElementStyle,
  getEventSummary,
  getLifecycleStatus,
  getProperty,
  reattachElementHandle,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';
import type { BannerState, BannerHeadingTag } from '@porsche-design-system/components';

type InitOptions = {
  open: boolean;
  state?: BannerState;
  dismissButton?: boolean;
  headingTag?: BannerHeadingTag;
};

const initBanner = (page: Page, opts: InitOptions): Promise<void> => {
  const { open = false, state, dismissButton = true, headingTag } = opts || {};

  const attrs = [
    `open="${open}"`,
    state ? `state="${state}"` : '',
    `dismiss-button="${dismissButton}"`,
    headingTag && `heading-tag="${headingTag}"`,
  ].join(' ');

  return setContentWithDesignSystem(
    page,
    `
    <p-banner ${attrs} heading="Some notification title" decription="Some notification description.">
    </p-banner>`
  );
};

const getHost = (page: Page) => page.$('p-banner');
const getInlineNotification = (page: Page) => page.$('p-banner p-inline-notification');
const getCloseButton = (page: Page) => page.$('p-banner p-inline-notification p-button-pure.close');
const getHeadingTagName = async (page: Page): Promise<string> =>
  (await getHost(page)).evaluate(
    (el) => el.shadowRoot.querySelector('p-inline-notification').shadowRoot.querySelector('.heading').tagName
  );

test('should forward props correctly to p-inline-notification', async ({ page }) => {
  await setContentWithDesignSystem(
    page,
    `
    <p-banner state="error" dismiss-button="false" theme="dark">
      <span slot="title">Some notification title</span>
      <span slot="description">Some notification description.</span>
    </p-banner>`
  );

  const inlineNotification = await getInlineNotification(page);
  expect(await getProperty(inlineNotification, 'state')).toBe('error');
  expect(await getProperty(inlineNotification, 'dismissButton')).toBe(false);
  expect(await getProperty(inlineNotification, 'theme')).toBe('dark');
});

test('should not show banner by default', async ({ page }) => {
  await initBanner(page, { open: false });
  const banner = await getHost(page);
  expect(await getElementStyle(banner, 'opacity')).toBe('0');
  expect(await getElementStyle(banner, 'visibility')).toBe('hidden');
});

test('should show banner when prop open is true', async ({ page }) => {
  await initBanner(page, { open: true });
  const banner = await getHost(page);
  expect(await getElementStyle(banner, 'opacity')).toBe('1');
  expect(await getElementStyle(banner, 'visibility')).toBe('visible');
});

test('should show banner when setting open prop true ', async ({ page }) => {
  await initBanner(page, { open: false });
  const banner = await getHost(page);
  await setProperty(banner, 'open', true);
  await waitForStencilLifecycle(page);
  expect(await getElementStyle(banner, 'opacity')).toBe('1');
  expect(await getElementStyle(banner, 'visibility')).toBe('visible');
});

test('should not show banner by setting open prop false', async ({ page }) => {
  await initBanner(page, { open: true });
  const banner = await getHost(page);
  await setProperty(banner, 'open', false);
  await waitForStencilLifecycle(page);
  expect(await getElementStyle(banner, 'opacity')).toBe('0');
  expect(await getElementStyle(banner, 'visibility')).toBe('hidden');
});

test('should render correct heading tag when tag property is set', async ({ page }) => {
  await initBanner(page, { open: true, headingTag: 'h2' });
  expect(await getHeadingTagName(page)).toBe('H2');
});

test.describe('close', () => {
  const getComputedElementHandleStyles = async (elHandle: ElementHandle<Element>): Promise<CSSStyleDeclaration> => {
    return elHandle.evaluate((el: Element): CSSStyleDeclaration => {
      return getComputedStyle(el);
    });
  };

  test('should not show dismiss button when dismissButton prop is set false', async ({ page }) => {
    await initBanner(page, { open: true, dismissButton: false });
    const banner = await getHost(page);
    expect(await getCloseButton(page)).toBeNull();
  });

  test('should emit dismiss event by pressing ESC key', async ({ page }) => {
    await initBanner(page, { open: true });
    const host = await getHost(page);
    await addEventListener(host, 'dismiss');
    await page.keyboard.press('Escape');
    expect((await getEventSummary(host, 'dismiss')).counter).toBe(1);
  });

  test('should not emit dismiss event by pressing ESC key when banner is not open', async ({ page }) => {
    await initBanner(page, { open: false });
    const host = await getHost(page);
    await addEventListener(host, 'dismiss');
    await page.keyboard.press('Escape');
    expect((await getEventSummary(host, 'dismiss')).counter).toBe(0);
  });

  test('should not emit dismiss event by pressing ESC key when dismissButton is set false', async ({ page }) => {
    await initBanner(page, { open: true, dismissButton: false });
    const host = await getHost(page);
    await addEventListener(host, 'dismiss');
    await page.keyboard.press('Escape');
    expect((await getEventSummary(host, 'dismiss')).counter).toBe(0);
  });

  test('should emit dismiss by click on close button', async ({ page }) => {
    await initBanner(page, { open: true });
    const host = await getHost(page);
    await addEventListener(host, 'dismiss');
    const closeButton = await getCloseButton(page);
    await closeButton.click();
    expect((await getEventSummary(host, 'dismiss')).counter).toBe(1);
  });

  test('should remove and re-attach keydown event listener', async ({ page }) => {
    await initBanner(page, { open: true });
    const host = await getHost(page);
    await addEventListener(host, 'dismiss');
    expect((await getEventSummary(host, 'dismiss')).counter).toBe(0);
    await reattachElementHandle(host);
    await page.keyboard.press('Escape');
    expect((await getEventSummary(host, 'dismiss')).counter).toBe(1);
  });

  test('should not influence other banner styles', async ({ page }) => {
    await setContentWithDesignSystem(
      page,
      `
      <p-banner open id="banner1" style="--p-banner-position-type: static">
        <span slot="title">Some notification title with an <a href="#" onclick="return false">anchor</a>.</span>
        <span slot="description">Some notification description with an <a href="#" onclick="return false">anchor</a>.</span>
      </p-banner>
      <p-banner open id="banner2" style="--p-banner-position-type: static">
        <span slot="title">Some notification title with an <a href="#" onclick="return false">anchor</a>.</span>
        <span slot="description">Some notification description with an <a href="#" onclick="return false">anchor</a>.</span>
      </p-banner>`
    );

    const banner1 = await page.$('#banner1');
    const banner2 = await page.$('#banner2');
    const closeButtonBanner2 = await page.$('#banner2 p-inline-notification p-button-pure');

    const classListBanner1 = await getCssClasses(banner1);
    const classListBanner2 = await getCssClasses(banner2);
    const banner1Styles = await getComputedElementHandleStyles(banner1);
    const banner2Styles = await getComputedElementHandleStyles(banner2);

    expect(classListBanner1).toEqual(classListBanner2);
    expect(banner1Styles).toEqual(banner2Styles);

    await closeButtonBanner2.click();

    const classListBanner1AfterClick = await getCssClasses(banner1);
    const banner1StylesAfterClick = await getComputedElementHandleStyles(banner1);

    expect(classListBanner1).toEqual(classListBanner1AfterClick);
    expect(banner1Styles).toEqual(banner1StylesAfterClick);
  });
});

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initBanner(page, { state: 'error', open: true });
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-banner'], 'componentDidLoad: p-banner').toBe(1);
    expect(status.componentDidLoad['p-inline-notification'], 'componentDidLoad: p-inline-notification').toBe(1);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(2); // one included in button-pure
    expect(status.componentDidLoad['p-button-pure'], 'componentDidLoad: p-button-pure').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(5);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  test('should work without unnecessary round trips after state change', async ({ page }) => {
    await initBanner(page, { state: 'error', open: true });
    const host = await getHost(page);

    await setProperty(host, 'state', 'warning');
    await waitForStencilLifecycle(page);

    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-banner'], 'componentDidUpdate: p-banner').toBe(1);
    expect(status.componentDidUpdate['p-inline-notification'], 'componentDidUpdate: p-inline-notification').toBe(1);
    expect(status.componentDidUpdate['p-icon'], 'componentDidUpdate: p-icon').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(5);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(3);
  });
});
