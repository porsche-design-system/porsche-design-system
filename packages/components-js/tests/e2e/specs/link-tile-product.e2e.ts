import { expect, test } from '@playwright/test';
import { Components } from '@porsche-design-system/components';
import type { Page } from 'playwright';
import {
  addEventListener,
  getActiveElementId,
  getActiveElementTagName,
  getActiveElementTagNameInShadowRoot,
  getEventSummary,
  getHTMLAttributes,
  getLifecycleStatus,
  getProperty,
  setContentWithDesignSystem,
  setProperty,
  skipInBrowsers,
  waitForStencilLifecycle,
} from '../helpers';

const getHost = (page: Page) => page.locator('p-link-tile-product');
const getLikeButton = (page: Page) => page.locator('p-link-tile-product .button');

type InitOptions = {
  props?: Components.PLinkTileProduct;
  slotted?: string;
  options?: {
    markupBefore?: string;
    markupAfter?: string;
  };
};

const initLinkTileProduct = (page: Page, opt?: InitOptions): Promise<void> => {
  const { props = { heading: 'Some product name', price: '1.199,00 €', href: '/' }, slotted = '', options } = opt || {};
  const { markupBefore = '', markupAfter = '' } = options || {};

  const markup = `${markupBefore}
      <p-link-tile-product ${getHTMLAttributes(props)}>
        ${slotted}
      </p-link-tile-product>
      ${markupAfter}`;

  return setContentWithDesignSystem(page, markup);
};

test.describe('like button', () => {
  test('should update like button icon on like prop change', async ({ page }) => {
    await initLinkTileProduct(page);
    const host = getHost(page);
    const likeButton = getLikeButton(page);

    await expect.poll(() => likeButton).toBeDefined();
    await expect(host).toHaveJSProperty('liked', false);
    await expect(likeButton).toHaveJSProperty('icon', 'heart');

    await setProperty(host, 'liked', true);
    await waitForStencilLifecycle(page);

    await expect(host).toHaveJSProperty('liked', true);
    await expect(likeButton).toHaveJSProperty('icon', 'heart-filled');
  });
  test('should emit like event on like button click', async ({ page }) => {
    await initLinkTileProduct(page);
    const host = getHost(page);
    await addEventListener(host, 'like');

    await expect
      .poll(async () => (await getEventSummary(host, 'like')).counter, { message: 'before like click' })
      .toBe(0);
    const likeButton = getLikeButton(page);
    await expect.poll(() => likeButton).toBeDefined();
    await expect(host).toHaveJSProperty('liked', false);
    await expect(likeButton).toHaveJSProperty('icon', 'heart');

    await likeButton.click();
    await waitForStencilLifecycle(page);

    await expect
      .poll(async () => (await getEventSummary(host, 'like')).counter, { message: 'after like click' })
      .toBe(1);
    await expect
      .poll(async () => (await getEventSummary(host, 'like')).details, { message: 'after like click' })
      .toEqual([{ liked: false }]);

    await setProperty(host, 'liked', true);
    await waitForStencilLifecycle(page);
    await likeButton.click();
    await waitForStencilLifecycle(page);

    await expect
      .poll(async () => (await getEventSummary(host, 'like')).counter, { message: 'after setting like prop to true' })
      .toBe(2);
    await expect
      .poll(async () => (await getEventSummary(host, 'like')).details, { message: 'after setting like prop to true' })
      .toEqual([{ liked: false }, { liked: true }]);
  });
});

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initLinkTileProduct(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-link-tile-product'], 'componentDidLoad: p-link-product').toBe(1);
    expect(status.componentDidLoad['p-button-pure'], 'componentDidLoad: p-button-pure').toBe(1);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(3);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  test('should work without unnecessary round trips on prop change', async ({ page }) => {
    await initLinkTileProduct(page);
    const host = getHost(page);

    await setProperty(host, 'heading', 'Some new heading');
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    await expect
      .poll(() => status.componentDidUpdate['p-link-tile-product'], 'componentDidUpdate: p-link-tile-product')
      .toBe(1);
    await expect.poll(() => status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });
});

test.describe('focus', () => {
  skipInBrowsers(['firefox', 'webkit']);

  test('should have correct focus order when using href prop', async ({ page }) => {
    await initLinkTileProduct(page);
    const host = getHost(page);
    await page.evaluate(() => {
      const linkBefore = document.createElement('a');
      linkBefore.id = 'before';
      linkBefore.href = '#';
      document.body.prepend(linkBefore);

      const linkAfter = document.createElement('a');
      linkAfter.id = 'after';
      linkAfter.href = '#';
      document.body.append(linkAfter);
    });

    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page), 'active element after first tab click').toBe('before');

    await page.keyboard.press('Tab');
    expect(await getActiveElementTagName(page), 'active element after second tab click').toBe('P-LINK-TILE-PRODUCT');
    expect(await getActiveElementTagNameInShadowRoot(host), 'active element after second tab click').toBe('A');

    await page.keyboard.press('Tab');
    expect(await getActiveElementTagName(page), 'active element after third tab click').toBe('P-LINK-TILE-PRODUCT');
    expect(await getActiveElementTagNameInShadowRoot(host), 'active element after third tab click').toBe(
      'P-BUTTON-PURE'
    );

    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page), 'active element after fourth tab click').toBe('after');
  });

  test('should have correct focus order when slotted link', async ({ page }) => {
    await initLinkTileProduct(page, {
      props: { heading: 'Some product name', price: '1.199,00 €', href: undefined },
      slotted: '<a slot="anchor" href="/packages/components-js/public">Some product name, 1.199,00 €</a>',
    });
    const host = getHost(page);
    await page.evaluate(() => {
      const linkBefore = document.createElement('a');
      linkBefore.id = 'before';
      linkBefore.href = '#';
      document.body.prepend(linkBefore);

      const linkAfter = document.createElement('a');
      linkAfter.id = 'after';
      linkAfter.href = '#';
      document.body.append(linkAfter);
    });

    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page), 'active element after first tab click').toBe('before');

    await page.keyboard.press('Tab');
    expect(await getActiveElementTagName(page), 'active element after second tab click').toBe('A');

    await page.keyboard.press('Tab');
    expect(await getActiveElementTagName(page), 'active element after third tab click').toBe('P-LINK-TILE-PRODUCT');
    expect(await getActiveElementTagNameInShadowRoot(host), 'active element after third tab click').toBe(
      'P-BUTTON-PURE'
    );

    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page), 'active element after fourth tab click').toBe('after');
  });
});
