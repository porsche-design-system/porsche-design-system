import {
  addEventListener,
  expectA11yToMatchSnapshot,
  getActiveElementId,
  getActiveElementTagName,
  getActiveElementTagNameInShadowRoot,
  getEventSummary,
  getHTMLAttributes,
  getLifecycleStatus,
  getProperty,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';
import type { Page } from 'puppeteer';
import type { Components } from '@porsche-design-system/components/src/components';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const getHost = () => selectNode(page, 'p-link-tile-product');
const getRoot = () => selectNode(page, 'p-link-tile-product >>> .root');
const getLikeButton = () => selectNode(page, 'p-link-tile-product >>> .button');
const getWrapper = () => selectNode(page, 'p-link-tile-product >>> .wrapper');

type InitOptions = {
  props?: Components.PLinkTileProduct;
  slotted?: string;
  options?: {
    markupBefore?: string;
    markupAfter?: string;
  };
};

const initLinkTileProduct = (opt?: InitOptions): Promise<void> => {
  const { props = { heading: 'Some product name', price: '1.199,00 €', href: '/' }, slotted = '', options } = opt || {};
  const { markupBefore = '', markupAfter = '' } = options || {};

  const markup = `${markupBefore}
      <p-link-tile-product ${getHTMLAttributes(props)}>
        ${slotted}
      </p-link-tile-product>
      ${markupAfter}`;

  return setContentWithDesignSystem(page, markup);
};

describe('like button', () => {
  it('should update like button icon on like prop change', async () => {
    await initLinkTileProduct();
    const host = await getHost();
    const likeButton = await getLikeButton();
    expect(likeButton).toBeDefined();
    expect(await getProperty(host, 'liked')).toBe(false);
    expect(await getProperty(likeButton, 'icon')).toBe('heart');

    await setProperty(host, 'liked', true);
    await waitForStencilLifecycle(page);

    expect(await getProperty(host, 'liked')).toBe(true);
    expect(await getProperty(likeButton, 'icon')).toBe('heart-filled');
  });
  it('should emit like event on like button click', async () => {
    await initLinkTileProduct();
    const host = await getHost();
    await addEventListener(host, 'like');

    expect((await getEventSummary(host, 'like')).counter, 'before like click').toBe(0);
    const likeButton = await getLikeButton();
    expect(likeButton).toBeDefined();
    expect(await getProperty(host, 'liked')).toBe(false);
    expect(await getProperty(likeButton, 'icon')).toBe('heart');

    await likeButton.click();
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'like')).counter, 'after like click').toBe(1);
    expect((await getEventSummary(host, 'like')).details, 'after like click').toEqual([{ liked: false }]);

    await setProperty(host, 'liked', true);
    await waitForStencilLifecycle(page);
    await likeButton.click();
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'like')).counter, 'after setting like prop to true').toBe(2);
    expect((await getEventSummary(host, 'like')).details, 'after setting like prop to true').toEqual([
      { liked: false },
      { liked: true },
    ]);
  });
});

describe('lifecycle', () => {
  it('should work without unnecessary round trips on init', async () => {
    await initLinkTileProduct();
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-link-tile-product'], 'componentDidLoad: p-link-product').toBe(1);
    expect(status.componentDidLoad['p-button-pure'], 'componentDidLoad: p-button-pure').toBe(1);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(3);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  it('should work without unnecessary round trips on prop change', async () => {
    await initLinkTileProduct();
    const host = await getHost();

    await setProperty(host, 'heading', 'Some new heading');
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-link-tile-product'], 'componentDidUpdate: p-link-tile-product').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });
});

describe('accessibility', () => {
  it('should expose correct initial accessibility tree properties', async () => {
    await initLinkTileProduct();
    const root = await getRoot();

    await expectA11yToMatchSnapshot(page, root, { interestingOnly: false });
  });

  it('should expose correct accessibility tree properties when price original is set', async () => {
    await initLinkTileProduct({
      props: { heading: 'Some product name', price: '718,00 €', priceOriginal: '911,00 €' },
    });
    const wrapper = await getWrapper();

    await expectA11yToMatchSnapshot(page, wrapper, { interestingOnly: false });
  });
});

describe('focus', () => {
  it('should have correct focus order when using href prop', async () => {
    await initLinkTileProduct();
    const host = await getHost();
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

  it('should have correct focus order when slotted link', async () => {
    await initLinkTileProduct({
      props: { heading: 'Some product name', price: '1.199,00 €', href: undefined },
      slotted: '<a slot="anchor" href="/">Some product name, 1.199,00 €</a>',
    });
    const host = await getHost();
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
