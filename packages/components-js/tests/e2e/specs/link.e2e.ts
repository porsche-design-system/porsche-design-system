import { expect, test } from '@porsche-design-system/testing/playwright';
import type { Page } from 'playwright';
import {
  addEventListener,
  getActiveElementId,
  getActiveElementTagName,
  getElementStyle,
  getEventSummary,
  getLifecycleStatus,
  setContentWithDesignSystem,
  setProperty,
  skipInBrowsers,
  waitForStencilLifecycle,
} from '../helpers';

const getHost = (page: Page) => page.locator('p-link');
const getLink = (page: Page) => page.locator('p-link a');
const getSlottedLink = (page: Page) => page.locator('p-link a');

const initLink = (page: Page, opts?: { useSlottedAnchor?: boolean }): Promise<void> => {
  const { useSlottedAnchor = false } = opts || {};

  return setContentWithDesignSystem(
    page,
    `
    <p-link onclick="return false;" ${!useSlottedAnchor ? 'href="#" ' : 'style="width: 500px;"'}>
      ${useSlottedAnchor ? '<a onclick="return false;" href="">' : ''}
      Some label
      ${useSlottedAnchor ? '</a>' : ''}
    </p-link>`
  );
};

test('should dispatch correct click events', async ({ page }) => {
  await setContentWithDesignSystem(page, `<div><p-link id="hostElement" href="about:blank#">Some label</p-link></div>`);

  const wrapper = page.locator('div');
  const host = getHost(page);
  const link = getLink(page);

  await addEventListener(wrapper, 'click');

  await link.click();
  await host.click();
  const { counter, targets } = await getEventSummary(wrapper, 'click');

  expect(counter).toBe(2);
  for (const target of targets) {
    expect(target.id).toBe('hostElement');
  }
});

skipInBrowsers(['webkit', 'firefox'], () => {
  test('should trigger focus & blur events at the correct time', async ({ page }) => {
    await setContentWithDesignSystem(
      page,
      `
    <div id="wrapper">
      <a href="#" id="before">before</a>
      <p-link href="#" id="my-link">Some label</p-link>
      <a href="#" id="after">after</a>
    </div>`
    );

    const link = getHost(page);
    const before = page.locator('#before');
    const after = page.locator('#after');

    await addEventListener(before, 'focus');
    await addEventListener(link, 'focus');
    await addEventListener(link, 'focusin');
    await addEventListener(link, 'blur');
    await addEventListener(link, 'focusout');
    await addEventListener(after, 'focus');

    expect((await getEventSummary(before, 'focus')).counter, 'beforeFocusCalls initially').toBe(0);
    expect((await getEventSummary(link, 'focus')).counter, 'linkFocusCalls initially').toBe(0);
    expect((await getEventSummary(link, 'focusin')).counter, 'linkFocusInCalls initially').toBe(0);
    expect((await getEventSummary(link, 'blur')).counter, 'linkBlurCalls initially').toBe(0);
    expect((await getEventSummary(link, 'focusout')).counter, 'linkFocusOutCalls initially').toBe(0);
    expect((await getEventSummary(after, 'focus')).counter, 'afterFocusCalls initially').toBe(0);
    expect(await getActiveElementId(page), 'activeElementId initially').toBe('');

    await page.keyboard.press('Tab');
    expect((await getEventSummary(before, 'focus')).counter, 'beforeFocusCalls after 1st tab').toBe(1);
    expect((await getEventSummary(link, 'focus')).counter, 'linkFocusCalls after 1st tab').toBe(0);
    expect((await getEventSummary(link, 'focusin')).counter, 'linkFocusInCalls after 1st tab').toBe(0);
    expect((await getEventSummary(link, 'blur')).counter, 'linkBlurCalls after 1st tab').toBe(0);
    expect((await getEventSummary(link, 'focusout')).counter, 'linkFocusOutCalls after 1st tab').toBe(0);
    expect((await getEventSummary(after, 'focus')).counter, 'afterFocusCalls after 1st tab').toBe(0);
    expect(await getActiveElementId(page), 'activeElementId after 1st tab').toBe('before');

    await page.keyboard.press('Tab');
    expect((await getEventSummary(before, 'focus')).counter, 'beforeFocusCalls after 2nd tab').toBe(1);
    expect((await getEventSummary(link, 'focus')).counter, 'linkFocusCalls after 2nd tab').toBe(1);
    expect((await getEventSummary(link, 'focusin')).counter, 'linkFocusInCalls after 2nd tab').toBe(1);
    expect((await getEventSummary(link, 'blur')).counter, 'linkBlurCalls after 2nd tab').toBe(0);
    expect((await getEventSummary(link, 'focusout')).counter, 'linkFocusOutCalls after 2nd tab').toBe(0);
    expect((await getEventSummary(after, 'focus')).counter, 'afterFocusCalls after 2nd tab').toBe(0);
    expect(await getActiveElementId(page), 'activeElementId after 2nd tab').toBe('my-link');

    await page.keyboard.press('Tab');
    expect((await getEventSummary(before, 'focus')).counter, 'beforeFocusCalls after 3rd tab').toBe(1);
    expect((await getEventSummary(link, 'focus')).counter, 'linkFocusCalls after 3rd tab').toBe(1);
    expect((await getEventSummary(link, 'focusin')).counter, 'linkFocusInCalls after 3rd tab').toBe(1);
    expect((await getEventSummary(link, 'blur')).counter, 'linkBlurCalls after 3rd tab').toBe(1);
    expect((await getEventSummary(link, 'focusout')).counter, 'linkFocusOutCalls after 3rd tab').toBe(1);
    expect((await getEventSummary(after, 'focus')).counter, 'afterFocusCalls after 3rd tab').toBe(1);
    expect(await getActiveElementId(page), 'activeElementId after 3rd tab').toBe('after');

    // tab back
    await page.keyboard.down('ShiftLeft');
    await page.keyboard.press('Tab');
    expect((await getEventSummary(before, 'focus')).counter, 'beforeFocusCalls after 1st tab back').toBe(1);
    expect((await getEventSummary(link, 'focus')).counter, 'linkFocusCalls after 1st tab back').toBe(2);
    expect((await getEventSummary(link, 'focusin')).counter, 'linkFocusInCalls after 1st tab back').toBe(2);
    expect((await getEventSummary(link, 'blur')).counter, 'linkBlurCalls after 1st tab back').toBe(1);
    expect((await getEventSummary(link, 'focusout')).counter, 'linkFocusOutCalls after 1st tab back').toBe(1);
    expect((await getEventSummary(after, 'focus')).counter, 'afterFocusCalls after 1st tab back').toBe(1);
    expect(await getActiveElementId(page), 'activeElementId after 1st tab back').toBe('my-link');

    await page.keyboard.press('Tab');
    expect((await getEventSummary(before, 'focus')).counter, 'beforeFocusCalls after 2nd tab back').toBe(2);
    expect((await getEventSummary(link, 'focus')).counter, 'linkFocusCalls after 2nd tab back').toBe(2);
    expect((await getEventSummary(link, 'focusin')).counter, 'linkFocusInCalls after 2nd tab back').toBe(2);
    expect((await getEventSummary(link, 'blur')).counter, 'linkBlurCalls after 2nd tab back').toBe(2);
    expect((await getEventSummary(link, 'focusout')).counter, 'linkFocusOutCalls after 2nd tab back').toBe(2);
    expect((await getEventSummary(after, 'focus')).counter, 'afterFocusCalls after 2nd tab back').toBe(1);
    expect(await getActiveElementId(page), 'activeElementId after 2nd tab back').toBe('before');

    await page.keyboard.up('ShiftLeft');
  });
});

test('should provide functionality to focus & blur the custom element', async ({ page }) => {
  await setContentWithDesignSystem(
    page,
    `
    <div id="wrapper">
      <a href="#" id="before">before</a>
      <p-link href="#">Some label</p-link>
    </div>`
  );

  const linkHasFocus = () => page.evaluate(() => document.activeElement === document.querySelector('p-link'));

  const link = getHost(page);
  const before = page.locator('#before');
  await before.focus();
  expect(await linkHasFocus()).toBe(false);
  await link.focus();
  expect(await linkHasFocus()).toBe(true);
  await page.evaluate(() => {
    const linkElement = document.querySelector('p-link');
    if (!linkElement) throw new Error('p-link not found');
    linkElement.blur();
  });
  expect(await linkHasFocus()).toBe(false);
});

skipInBrowsers(['webkit', 'firefox'], () => {
  test('should render the focus ring for an empty href', async ({ page }) => {
    await setContentWithDesignSystem(page, `<p-link onclick="return false;" href="">Some label</p-link>`);

    const link = getLink(page);
    expect(await getElementStyle(link, 'outlineStyle'), 'initially').toBe('none');

    await page.keyboard.press('Tab');
    expect(await getElementStyle(link, 'outlineStyle'), 'after tab').toBe('solid');
  });
});

test.describe('slotted anchor', () => {
  test('should have the same width as host', async ({ page }) => {
    await initLink(page, { useSlottedAnchor: true });

    const host = getHost(page);
    const hostWidthInPx = await getElementStyle(host, 'width');
    const slottedAnchorWidthInPx = await getElementStyle(await getSlottedLink(page), 'width', { pseudo: '::before' });

    expect(hostWidthInPx).toBe('500px');
    expect(slottedAnchorWidthInPx).toBe('500px');
  });
});

test.describe('cover', () => {
  const cardWidth = 400;
  const cardHeight = 300;
  const coverModes = ['href', 'empty href', 'slotted anchor'] as const;

  const getCard = (page: Page) => page.locator('#card');
  const getSecondaryAction = (page: Page) => page.locator('#secondary');

  const initCoverLink = (
    page: Page,
    mode: (typeof coverModes)[number],
    opts?: { hideLabel?: boolean }
  ): Promise<void> => {
    const { hideLabel = false } = opts || {};
    const attributes = `cover${hideLabel ? ' hide-label="true" icon="arrow-right"' : ''}`;

    return setContentWithDesignSystem(
      page,
      `
      <div id="card" style="position: relative; box-sizing: border-box; width: ${cardWidth}px; height: ${cardHeight}px; padding: 24px; --p-link-cover-radius: 16px;">
        <p>Some text</p>
        <button type="button" id="secondary" style="position: relative; z-index: 2;">Some secondary action</button>
        ${
          mode === 'slotted anchor'
            ? `<p-link ${attributes}><a onclick="return false;" href="">Some label</a></p-link>`
            : `<p-link ${attributes} onclick="return false;" href="${mode === 'href' ? '#' : ''}">Some label</p-link>`
        }
      </div>`
    );
  };

  for (const mode of coverModes) {
    test.describe(mode, () => {
      for (const hideLabel of [false, true]) {
        test(`should be clickable on the whole area of its positioned ancestor for hideLabel: ${hideLabel}`, async ({
          page,
        }) => {
          await initCoverLink(page, mode, { hideLabel });

          const link = getLink(page);
          const cardBox = await getCard(page).boundingBox();
          const hostBox = await getHost(page).boundingBox();
          if (!cardBox || !hostBox) throw new Error('card or p-link not rendered');

          // center of the right edge, which is neither part of the visible link nor of the rounded corners
          const x = cardBox.x + cardBox.width - 4;
          const y = cardBox.y + cardBox.height / 2;
          expect(x, 'click position is outside the visible link').toBeGreaterThan(hostBox.x + hostBox.width);

          await addEventListener(link, 'click');
          await page.mouse.click(x, y);

          expect((await getEventSummary(link, 'click')).counter).toBe(1);
        });
      }

      test('should keep an interactive element placed above it operable', async ({ page }) => {
        await initCoverLink(page, mode);

        const link = getLink(page);
        const secondaryAction = getSecondaryAction(page);
        await addEventListener(link, 'click');
        await addEventListener(secondaryAction, 'click');

        await secondaryAction.click();

        expect((await getEventSummary(secondaryAction, 'click')).counter, 'secondary action clicks').toBe(1);
        expect((await getEventSummary(link, 'click')).counter, 'link clicks').toBe(0);
      });

      skipInBrowsers(['webkit', 'firefox'], () => {
        test('should render the focus ring around its positioned ancestor and be operable by keyboard', async ({
          page,
        }) => {
          await initCoverLink(page, mode);

          const link = getLink(page);
          await addEventListener(link, 'click');

          expect(await getElementStyle(link, 'outlineStyle', { pseudo: '::before' }), 'initially').toBe('none');

          await page.keyboard.press('Tab');
          expect(await getActiveElementId(page), 'activeElementId after 1st tab').toBe('secondary');
          expect(await getElementStyle(link, 'outlineStyle', { pseudo: '::before' }), 'after 1st tab').toBe('none');

          await page.keyboard.press('Tab');
          expect(await getActiveElementTagName(page), 'activeElementTagName after 2nd tab').toBe(
            mode === 'slotted anchor' ? 'A' : 'P-LINK'
          );
          expect(await getElementStyle(link, 'outlineStyle'), 'outline of link after 2nd tab').toBe('none');
          expect(await getElementStyle(link, 'outlineStyle', { pseudo: '::before' }), 'after 2nd tab').toBe('solid');
          expect(await getElementStyle(link, 'width', { pseudo: '::before' })).toBe(`${cardWidth}px`);
          expect(await getElementStyle(link, 'height', { pseudo: '::before' })).toBe(`${cardHeight}px`);
          expect(await getElementStyle(link, 'borderTopLeftRadius', { pseudo: '::before' })).toBe('16px');

          await page.keyboard.press('Enter');
          expect((await getEventSummary(link, 'click')).counter).toBe(1);
        });
      });
    });
  }
});

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initLink(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-link'], 'componentDidLoad: p-link').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  test('should work without unnecessary round trips on prop change', async ({ page }) => {
    await initLink(page);
    const host = getHost(page);

    await setProperty(host, 'icon', 'arrow-right');
    await waitForStencilLifecycle(page);

    await expect
      .poll(
        async () => {
          const status = await getLifecycleStatus(page);
          return status.componentDidUpdate['p-link'];
        },
        { message: 'componentDidUpdate: p-link' }
      )
      .toBe(1);

    await expect
      .poll(
        async () => {
          const status = await getLifecycleStatus(page);
          return status.componentDidLoad['p-icon'];
        },
        { message: 'componentDidLoad: p-icon' }
      )
      .toBe(1);

    await expect
      .poll(
        async () => {
          const status = await getLifecycleStatus(page);
          return status.componentDidUpdate.all;
        },
        { message: 'componentDidUpdate: all' }
      )
      .toBe(1);

    await expect
      .poll(
        async () => {
          const status = await getLifecycleStatus(page);
          return status.componentDidLoad.all;
        },
        { message: 'componentDidLoad: all' }
      )
      .toBe(2);
  });
});
