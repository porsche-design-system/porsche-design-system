import {
  expectA11yToMatchSnapshot,
  getActiveElementId,
  getActiveElementTagName,
  getAttribute,
  getLifecycleStatus,
  getProperty,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';
import type { Page } from 'puppeteer';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const getHost = () => selectNode(page, 'p-link-tile-model-signature');
const getRoot = () => selectNode(page, 'p-link-tile-model-signature >>> .root');
const getOverlayAnchor = () => selectNode(page, 'p-link-tile-model-signature >>> a');
const getPrimaryLink = () => selectNode(page, 'p-link-tile-model-signature p-link[slot="primary"]');
const getPrimaryLinkAnchor = () => selectNode(page, 'p-link-tile-model-signature p-link[slot="primary"] a');
const getHeading = () => selectNode(page, 'p-link-tile-model-signature >>> .heading');

const initLinkTileModelSignature = (opts?: { useSlottedAnchor?: boolean }): Promise<void> => {
  const { useSlottedAnchor = false } = opts || {};

  const primaryAttrs = useSlottedAnchor ? '' : ' href="https://porsche.com/"';
  const primaryChild = useSlottedAnchor ? '<a href="https://porsche.com/">Some label</a>' : 'Some label';

  return setContentWithDesignSystem(
    page,
    `<p-link-tile-model-signature heading="Some heading">
  <img src="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII='" alt="Some image label" />
  <p-link slot="primary"${primaryAttrs}>${primaryChild}</p-link>
  <p-link slot="secondary" href="#">Some label</p-link>
</p-link-tile-model-signature>`
  );
};

it('should mirror anchor props of slot name="primary" onto overlay anchor for usage with href prop', async () => {
  await initLinkTileModelSignature();

  const primaryLink = await getPrimaryLink();
  const overlayAnchor = await getOverlayAnchor();

  expect(await getProperty(overlayAnchor, 'href')).toEqual(await getProperty(primaryLink, 'href'));
});

it('should mirror anchor props of slot name="primary" onto overlay anchor for usage with slotted anchor', async () => {
  await initLinkTileModelSignature({ useSlottedAnchor: true });

  const primaryLink = await getPrimaryLink();
  const primaryLinkAnchor = await getPrimaryLinkAnchor();
  const overlayAnchor = await getOverlayAnchor();

  expect(await getProperty(primaryLink, 'href')).toEqual(undefined);
  expect(await getProperty(overlayAnchor, 'href')).toEqual(await getProperty(primaryLinkAnchor, 'href'));
});

it('should have correct headingTag', async () => {
  await initLinkTileModelSignature();
  const getHeadingTagName = async (): Promise<string> => await (await getHeading()).evaluate((el) => el.tagName);

  expect(await getHeadingTagName()).toBe('H2');

  const host = await getHost();
  await setProperty(host, 'headingTag', 'h3');
  await waitForStencilLifecycle(page);

  expect(await getHeadingTagName()).toBe('H3');
});

describe('lifecycle', () => {
  it('should work without unnecessary round trips on init', async () => {
    await initLinkTileModelSignature();
    const status = await getLifecycleStatus(page);

    expect(
      status.componentDidLoad['p-link-tile-model-signature'],
      'componentDidLoad: p-link-tile-model-signature'
    ).toBe(1);
    expect(status.componentDidLoad['p-model-signature'], 'componentDidLoad: p-model-signature').toBe(1);
    expect(status.componentDidLoad['p-link'], 'componentDidLoad: p-link').toBe(2);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(4);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  it('should work without unnecessary round trips on prop change', async () => {
    await initLinkTileModelSignature();
    const host = await getHost();

    await setProperty(host, 'model', 'taycan');
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(
      status.componentDidUpdate['p-link-tile-model-signature'],
      'componentDidUpdate: p-link-tile-model-signature'
    ).toBe(1);
    expect(status.componentDidUpdate['p-model-signature'], 'componentDidUpdate: p-model-signature').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(2);
  });

  // If the component has no target='_self' fallback the target can be null if the link request is delayed (flaky snapshot test)
  it('should fallback to target self', async () => {
    const linkReqMatcher = 'porsche-design-system.link.';
    await page.setRequestInterception(true);

    // Delay link request
    page.on('request', (req) => {
      if (req.isInterceptResolutionHandled()) return;
      req.url().includes(linkReqMatcher) ? setTimeout(() => req.continue(), 1000) : req.continue();
    });

    const resUrls = [];
    page.on('response', (res) => {
      if (res.url().endsWith('js') && res.status() === 200) {
        resUrls.push(res.url());
      }
    });

    await initLinkTileModelSignature();
    const overlayAnchor = await getOverlayAnchor();

    expect(await getAttribute(overlayAnchor, 'target')).toEqual('_self');
    expect(resUrls.at(-1)).toContain(linkReqMatcher);
  });
});

describe('accessibility', () => {
  it('should expose correct initial accessibility tree properties', async () => {
    await initLinkTileModelSignature();
    const root = await getRoot();

    await expectA11yToMatchSnapshot(page, root, { interestingOnly: false });
  });
});

describe('focus', () => {
  it('should have correct focus order', async () => {
    await initLinkTileModelSignature();
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
    expect(await getActiveElementTagName(page), 'active element after second tab click').toBe('P-LINK');

    await page.keyboard.press('Tab');
    expect(await getActiveElementTagName(page), 'active element after third tab click').toBe('P-LINK');

    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page), 'active element after fourth tab click').toBe('after');
  });
});
