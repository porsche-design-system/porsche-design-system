import type { Page } from 'playwright';
import { expect, test } from '@playwright/test';
import {
  addEventListener,
  getActiveElementId,
  getActiveElementTagNameInShadowRoot,
  getEventSummary,
  getLifecycleStatus,
  setContentWithDesignSystem,
  setProperty,
  skipInBrowsers,
  waitForStencilLifecycle,
} from '../helpers';

const getHost = (page: Page) => page.locator('p-wordmark');
const getLink = (page: Page) => page.locator('p-wordmark a');

const initWordmark = (
  page: Page,
  opts?: {
    hasHref?: boolean;
    isWrapped?: boolean;
    hasFocusableElementBefore?: boolean;
    hasFocusableElementAfter?: boolean;
  }
): Promise<void> => {
  const {
    hasHref = false,
    isWrapped = false,
    hasFocusableElementBefore = false,
    hasFocusableElementAfter = false,
  } = opts || {};

  const focusableElementBefore = hasFocusableElementBefore ? `<a href="#" id="before">before</a>` : '';
  const focusableElementAfter = hasFocusableElementAfter ? `<a href="#" id="after">after</a>` : '';
  const markup = `<p-wordmark ${hasHref ? 'href="about:blank#" ' : ''} id="my-wordmark"></p-wordmark>`;

  return setContentWithDesignSystem(
    page,
    isWrapped ? `<div>${focusableElementBefore}${markup}${focusableElementAfter}</div>` : markup
  );
};

test.describe('with link', () => {
  test('should render <a> tag when href prop is defined', async ({ page }) => {
    await initWordmark(page);
    const host = getHost(page);

    await expect(getLink(page)).toHaveCount(0);

    await setProperty(host, 'href', '#some-link');
    await waitForStencilLifecycle(page);

    await expect(getLink(page)).not.toHaveCount(0);
  });

  test('should dispatch correct click events', async ({ page }) => {
    await initWordmark(page, { hasHref: true, isWrapped: true });

    const wrapper = page.locator('div');
    const host = getHost(page);
    const link = getLink(page);

    await addEventListener(wrapper, 'click');

    await link.click();
    await host.click();
    const { counter, targets } = await getEventSummary(wrapper, 'click');

    expect(counter).toBe(2);
    for (const target of targets) {
      expect(target.id).toBe('my-wordmark');
    }
  });

  skipInBrowsers(['firefox', 'webkit'], () => {
    test('should trigger focus & blur events at the correct time', async ({ page }) => {
      await initWordmark(page, {
        hasHref: true,
        isWrapped: true,
        hasFocusableElementBefore: true,
        hasFocusableElementAfter: true,
      });

      const host = getHost(page);
      const before = page.locator('#before');
      const after = page.locator('#after');

      await addEventListener(before, 'focus');
      await addEventListener(host, 'focus');
      await addEventListener(host, 'focusin');
      await addEventListener(host, 'blur');
      await addEventListener(host, 'focusout');
      await addEventListener(after, 'focus');

      expect((await getEventSummary(before, 'focus')).counter, 'beforeFocusCalls initially').toBe(0);
      expect((await getEventSummary(host, 'focus')).counter, 'wordmarkFocusCalls initially').toBe(0);
      expect((await getEventSummary(host, 'focusin')).counter, 'wordmarkFocusInCalls initially').toBe(0);
      expect((await getEventSummary(host, 'blur')).counter, 'wordmarkBlurCalls initially').toBe(0);
      expect((await getEventSummary(host, 'focusout')).counter, 'wordmarkFocusOutCalls initially').toBe(0);
      expect((await getEventSummary(after, 'focus')).counter, 'afterFocusCalls initially').toBe(0);
      expect(await getActiveElementId(page), 'activeElementId initially').toBe('');

      await page.keyboard.press('Tab');
      expect((await getEventSummary(before, 'focus')).counter, 'beforeFocusCalls after 1st tab').toBe(1);
      expect((await getEventSummary(host, 'focus')).counter, 'wordmarkFocusCalls after 1st tab').toBe(0);
      expect((await getEventSummary(host, 'focusin')).counter, 'wordmarkFocusInCalls after 1st tab').toBe(0);
      expect((await getEventSummary(host, 'blur')).counter, 'wordmarkBlurCalls after 1st tab').toBe(0);
      expect((await getEventSummary(host, 'focusout')).counter, 'wordmarkFocusOutCalls after 1st tab').toBe(0);
      expect((await getEventSummary(after, 'focus')).counter, 'afterFocusCalls after 1st tab').toBe(0);
      expect(await getActiveElementId(page), 'activeElementId after 1st tab').toBe('before');

      await page.keyboard.press('Tab');
      expect((await getEventSummary(before, 'focus')).counter, 'beforeFocusCalls after 2nd tab').toBe(1);
      expect((await getEventSummary(host, 'focus')).counter, 'wordmarkFocusCalls after 2nd tab').toBe(1);
      expect((await getEventSummary(host, 'focusin')).counter, 'wordmarkFocusInCalls after 2nd tab').toBe(1);
      expect((await getEventSummary(host, 'blur')).counter, 'wordmarkBlurCalls after 2nd tab').toBe(0);
      expect((await getEventSummary(host, 'focusout')).counter, 'wordmarkFocusOutCalls after 2nd tab').toBe(0);
      expect((await getEventSummary(after, 'focus')).counter, 'afterFocusCalls after 2nd tab').toBe(0);
      expect(await getActiveElementId(page), 'activeElementId after 1st tab').toBe('my-wordmark');
      expect(await getActiveElementTagNameInShadowRoot(host), 'activeElement within shadow root after 2nd tab').toBe(
        'A'
      );

      await page.keyboard.press('Tab');
      expect((await getEventSummary(before, 'focus')).counter, 'beforeFocusCalls after 3rd tab').toBe(1);
      expect((await getEventSummary(host, 'focus')).counter, 'wordmarkFocusCalls after 3rd tab').toBe(1);
      expect((await getEventSummary(host, 'focusin')).counter, 'wordmarkFocusInCalls after 3rd tab').toBe(1);
      expect((await getEventSummary(host, 'blur')).counter, 'wordmarkBlurCalls after 3rd tab').toBe(1);
      expect((await getEventSummary(host, 'focusout')).counter, 'wordmarkFocusOutCalls after 3rd tab').toBe(1);
      expect((await getEventSummary(after, 'focus')).counter, 'afterFocusCalls after 3rd tab').toBe(1);
      expect(await getActiveElementId(page), 'activeElementId after 3rd tab').toBe('after');

      // tab back
      await page.keyboard.down('ShiftLeft');
      await page.keyboard.press('Tab');
      expect((await getEventSummary(before, 'focus')).counter, 'beforeFocusCalls after 1st tab back').toBe(1);
      expect((await getEventSummary(host, 'focus')).counter, 'wordmarkFocusCalls after 1st tab back').toBe(2);
      expect((await getEventSummary(host, 'focusin')).counter, 'wordmarkFocusInCalls after 1st tab back').toBe(2);
      expect((await getEventSummary(host, 'blur')).counter, 'wordmarkBlurCalls after 1st tab back').toBe(1);
      expect((await getEventSummary(host, 'focusout')).counter, 'wordmarkFocusOutCalls after 1st tab back').toBe(1);
      expect((await getEventSummary(after, 'focus')).counter, 'afterFocusCalls after 1st tab back').toBe(1);
      expect(await getActiveElementId(page), 'activeElementId after 1st tab back').toBe('my-wordmark');
      expect(
        await getActiveElementTagNameInShadowRoot(host),
        'activeElement within shadow root after 1st tab back'
      ).toBe('A');

      await page.keyboard.press('Tab');
      expect((await getEventSummary(before, 'focus')).counter, 'beforeFocusCalls after 2nd tab back').toBe(2);
      expect((await getEventSummary(host, 'focus')).counter, 'wordmarkFocusCalls after 2nd tab back').toBe(2);
      expect((await getEventSummary(host, 'focusin')).counter, 'wordmarkFocusInCalls after 2nd tab back').toBe(2);
      expect((await getEventSummary(host, 'blur')).counter, 'wordmarkBlurCalls after 2nd tab back').toBe(2);
      expect((await getEventSummary(host, 'focusout')).counter, 'wordmarkFocusOutCalls after 2nd tab back').toBe(2);
      expect((await getEventSummary(after, 'focus')).counter, 'afterFocusCalls after 2nd tab back').toBe(1);
      expect(await getActiveElementId(page), 'activeElementId after 2nd tab back').toBe('before');

      await page.keyboard.up('ShiftLeft');
    });
  });

  test('should provide methods to focus & blur the element', async ({ page }) => {
    await initWordmark(page, { hasHref: true, isWrapped: true, hasFocusableElementBefore: true });
    const host = getHost(page);
    const before = page.locator('#before');
    const wordmarkHasFocus = () => page.evaluate(() => document.activeElement === document.querySelector('p-wordmark'));

    await before.focus();
    expect(await wordmarkHasFocus()).toBe(false);

    await host.focus();
    expect(await wordmarkHasFocus()).toBe(true);

    await page.evaluate(() => (document.querySelector('p-wordmark') as HTMLElement).blur());
    expect(await wordmarkHasFocus()).toBe(false);
  });
});

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initWordmark(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-wordmark'], 'componentDidLoad: p-wordmark').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });
});
