import { expect, type Locator, Page, test } from '@playwright/test';
import type { BannerState } from '@porsche-design-system/components';
import {
  addEventListener,
  getCssClasses,
  getElementStyle,
  getEventSummary,
  getLifecycleStatus,
  getProperty,
  reattachElement,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';

type InitOptions = {
  open: boolean;
  state?: BannerState;
  dismissButton?: boolean;
};

const initBanner = (page: Page, opts: InitOptions): Promise<void> => {
  const { open = false, state, dismissButton = true } = opts || {};

  const attrs = [`open="${open}"`, state ? `state="${state}"` : '', `dismiss-button="${dismissButton}"`].join(' ');

  return setContentWithDesignSystem(
    page,
    `
    <p-banner ${attrs} heading="Some notification title" decription="Some notification description.">
    </p-banner>`
  );
};

const getHost = (page: Page) => page.locator('p-banner');
const getBannerPopover = (page: Page) => page.locator('p-banner [popover]');
const getCloseButton = (page: Page) => page.locator('p-banner [popover] .dismiss');

test('should not show banner by default', async ({ page }) => {
  await initBanner(page, { open: false });
  await expect(getBannerPopover(page)).toBeHidden();
});

test('should show banner when prop open is true', async ({ page }) => {
  await initBanner(page, { open: true });
  await expect(getBannerPopover(page)).toBeVisible();
});

test('should show banner when setting open prop true ', async ({ page }) => {
  await initBanner(page, { open: false });
  await setProperty(getHost(page), 'open', true);
  await expect(getBannerPopover(page)).toBeVisible();
});

test('should not show banner by setting open prop false', async ({ page }) => {
  await initBanner(page, { open: true });
  await setProperty(getHost(page), 'open', false);
  await expect(getBannerPopover(page)).toBeHidden();
});

test.describe('close', () => {
  const getComputedElementStyles = async (elHandle: Locator): Promise<CSSStyleDeclaration> => {
    return elHandle.evaluate((el: Element): CSSStyleDeclaration => {
      return getComputedStyle(el);
    });
  };

  test('should not show dismiss button when dismissButton prop is set false', async ({ page }) => {
    await initBanner(page, { open: true, dismissButton: false });
    const banner = getHost(page);
    await expect(getCloseButton(page)).toHaveCount(0);
  });

  test('should emit dismiss event by pressing ESC key', async ({ page }) => {
    await initBanner(page, { open: true });
    const host = getHost(page);
    await addEventListener(host, 'dismiss');
    await page.keyboard.press('Escape');
    expect((await getEventSummary(host, 'dismiss')).counter).toBe(1);
  });

  test('should not emit dismiss event by pressing ESC key when banner is not open', async ({ page }) => {
    await initBanner(page, { open: false });
    const host = getHost(page);
    await addEventListener(host, 'dismiss');
    await page.keyboard.press('Escape');
    expect((await getEventSummary(host, 'dismiss')).counter).toBe(0);
  });

  test('should not emit dismiss event by pressing ESC key when dismissButton is set false', async ({ page }) => {
    await initBanner(page, { open: true, dismissButton: false });
    const host = getHost(page);
    await addEventListener(host, 'dismiss');
    await page.keyboard.press('Escape');
    expect((await getEventSummary(host, 'dismiss')).counter).toBe(0);
  });

  test('should emit dismiss by click on close button', async ({ page }) => {
    await initBanner(page, { open: true });
    const host = getHost(page);
    await addEventListener(host, 'dismiss');
    const closeButton = getCloseButton(page);
    await closeButton.click();
    expect((await getEventSummary(host, 'dismiss')).counter).toBe(1);
  });

  test('should remove and re-attach keydown event listener', async ({ page }) => {
    await initBanner(page, { open: true });
    const host = getHost(page);
    await addEventListener(host, 'dismiss');
    expect((await getEventSummary(host, 'dismiss')).counter).toBe(0);
    await reattachElement(host);
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

    const banner1 = page.locator('#banner1');
    const banner2 = page.locator('#banner2');
    const closeButtonBanner2 = page.locator('#banner2 p-button');

    const classListBanner1 = await getCssClasses(banner1);
    const classListBanner2 = await getCssClasses(banner2);
    const banner1Styles = await getComputedElementStyles(banner1);
    const banner2Styles = await getComputedElementStyles(banner2);

    expect(classListBanner1).toEqual(classListBanner2);
    expect(banner1Styles).toEqual(banner2Styles);

    await closeButtonBanner2.click();

    const classListBanner1AfterClick = await getCssClasses(banner1);
    const banner1StylesAfterClick = await getComputedElementStyles(banner1);

    expect(classListBanner1).toEqual(classListBanner1AfterClick);
    expect(banner1Styles).toEqual(banner1StylesAfterClick);
  });
});

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initBanner(page, { state: 'error', open: true });
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-banner'], 'componentDidLoad: p-banner').toBe(1);
    expect(status.componentDidLoad['p-button'], 'componentDidLoad: p-button').toBe(1);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-banner').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(3);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  test('should work without unnecessary round trips after state change', async ({ page }) => {
    await initBanner(page, { state: 'error', open: true });
    const host = getHost(page);

    await setProperty(host, 'state', 'warning');
    await waitForStencilLifecycle(page);

    const status = await getLifecycleStatus(page);

    await expect
      .poll(
        async () => {
          const status = await getLifecycleStatus(page);
          return status.componentDidUpdate['p-banner'];
        },
        {
          message: 'componentDidUpdate: p-banner',
        }
      )
      .toBe(1);

    await expect
      .poll(
        async () => {
          const status = await getLifecycleStatus(page);
          return status.componentDidLoad.all;
        },
        {
          message: 'componentDidLoad: all',
        }
      )
      .toBe(3);
    await expect
      .poll(
        async () => {
          const status = await getLifecycleStatus(page);
          return status.componentDidUpdate.all;
        },
        {
          message: 'componentDidUpdate: all',
        }
      )
      .toBe(1);
  });
});
