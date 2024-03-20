import type { Page } from 'playwright';
import { expect, test } from '@playwright/test';
import {
  addEventListener,
  getActiveElementId,
  getElementStyle,
  getEventSummary,
  getLifecycleStatus,
  setContentWithDesignSystem,
  setProperty,
  skipInBrowsers,
  waitForStencilLifecycle,
} from '../helpers';

const getHost = (page: Page) => page.$('p-link');
const getLink = (page: Page) => page.$('p-link a');
const getSlottedLink = (page: Page) => page.$('p-link a');

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

  const wrapper = await page.$('div');
  const host = await getHost(page);
  const link = await getLink(page);

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

    const link = await getHost(page);
    const before = await page.$('#before');
    const after = await page.$('#after');

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

  const link = await getHost(page);
  const before = await page.$('#before');
  await before.focus();
  expect(await linkHasFocus()).toBe(false);
  await link.focus();
  expect(await linkHasFocus()).toBe(true);
  await page.evaluate(() => {
    const linkElement: HTMLElement = document.querySelector('p-link');
    linkElement.blur();
  });
  expect(await linkHasFocus()).toBe(false);
});

test.describe('slotted anchor', () => {
  test('should have the same width as host', async ({ page }) => {
    await initLink(page, { useSlottedAnchor: true });

    const host = await getHost(page);
    const hostWidthInPx = await getElementStyle(host, 'width');
    const slottedAnchorWidthInPx = await getElementStyle(await getSlottedLink(page), 'width', { pseudo: '::before' });

    expect(hostWidthInPx).toBe('500px');
    expect(slottedAnchorWidthInPx).toBe('500px');
  });
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
    const host = await getHost(page);

    await setProperty(host, 'icon', 'arrow-right');
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-link'], 'componentDidUpdate: p-link').toBe(1);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(2);
  });
});
