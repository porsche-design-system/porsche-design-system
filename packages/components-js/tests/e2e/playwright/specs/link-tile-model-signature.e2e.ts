import type { Page } from 'playwright';
import { expect, test } from '@playwright/test';
import {
  getActiveElementId,
  getActiveElementTagName,
  getAttribute,
  getLifecycleStatus,
  getProperty,
  setContentWithDesignSystem,
  setProperty,
  skipInBrowsers,
  sleep,
  waitForStencilLifecycle,
} from '../helpers';

const getHost = (page: Page) => page.$('p-link-tile-model-signature');
const getOverlayAnchor = (page: Page) => page.$('p-link-tile-model-signature a');
const getPrimaryLink = (page: Page) => page.$('p-link-tile-model-signature p-link[slot="primary"]');
const getPrimaryLinkAnchor = (page: Page) => page.$('p-link-tile-model-signature p-link[slot="primary"] a');
const getHeading = (page: Page) => page.$('p-link-tile-model-signature .heading');

const initLinkTileModelSignature = (page: Page, opts?: { useSlottedAnchor?: boolean }): Promise<void> => {
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

test('should mirror anchor props of slot name="primary" onto overlay anchor for usage with href prop', async ({
  page,
}) => {
  await initLinkTileModelSignature(page);

  const primaryLink = await getPrimaryLink(page);
  const overlayAnchor = await getOverlayAnchor(page);

  expect(await getProperty(overlayAnchor, 'href')).toEqual(await getProperty(primaryLink, 'href'));
});

test('should mirror anchor props of slot name="primary" onto overlay anchor for usage with slotted anchor', async ({
  page,
}) => {
  await initLinkTileModelSignature(page, { useSlottedAnchor: true });

  const primaryLink = await getPrimaryLink(page);
  const primaryLinkAnchor = await getPrimaryLinkAnchor(page);
  const overlayAnchor = await getOverlayAnchor(page);

  expect(await getProperty(primaryLink, 'href')).toEqual(undefined);
  expect(await getProperty(overlayAnchor, 'href')).toEqual(await getProperty(primaryLinkAnchor, 'href'));
});

test('should have correct headingTag', async ({ page }) => {
  await initLinkTileModelSignature(page);
  const getHeadingTagName = async (): Promise<string> => await (await getHeading(page)).evaluate((el) => el.tagName);

  expect(await getHeadingTagName()).toBe('H2');

  const host = await getHost(page);
  await setProperty(host, 'headingTag', 'h3');
  await waitForStencilLifecycle(page);

  expect(await getHeadingTagName()).toBe('H3');
});

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initLinkTileModelSignature(page);
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

  test('should work without unnecessary round trips on prop change', async ({ page }) => {
    await initLinkTileModelSignature(page);
    const host = await getHost(page);

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
  test('should fallback to target self', async ({ page }) => {
    const linkReqMatcher = 'porsche-design-system.link.';

    // Delay link request
    await page.route('**/*', async (route) => {
      if (route.request().url().includes(linkReqMatcher)) {
        await sleep(1000);
        await route.continue();
      } else {
        await route.continue();
      }

      const resUrls = [];
      page.on('response', (res) => {
        if (res.url().endsWith('js') && res.status() === 200) {
          resUrls.push(res.url());
        }
      });

      await initLinkTileModelSignature(page);
      const overlayAnchor = await getOverlayAnchor(page);

      expect(await getAttribute(overlayAnchor, 'target')).toEqual('_self');
      expect(resUrls.at(-1)).toContain(linkReqMatcher);
    });
  });
});

test.describe('focus', () => {
  skipInBrowsers(['firefox', 'webkit']);

  test('should have correct focus order', async ({ page }) => {
    await initLinkTileModelSignature(page);
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
