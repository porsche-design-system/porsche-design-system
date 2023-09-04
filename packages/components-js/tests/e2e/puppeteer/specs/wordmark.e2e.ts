import type { Page } from 'puppeteer';
import {
  addEventListener,
  expectA11yToMatchSnapshot,
  getActiveElementId,
  getActiveElementTagNameInShadowRoot,
  getAttribute,
  getEventSummary,
  getLifecycleStatus,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const getHost = () => selectNode(page, 'p-wordmark');
const getLink = () => selectNode(page, 'p-wordmark >>> a');

const initWordmark = (opts?: {
  hasHref?: boolean;
  isWrapped?: boolean;
  hasFocusableElementBefore?: boolean;
  hasFocusableElementAfter?: boolean;
}): Promise<void> => {
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

describe('with link', () => {
  it('should render <a> tag when href prop is defined', async () => {
    await initWordmark();
    const host = await getHost();

    expect(await getLink()).toBe(null);

    await setProperty(host, 'href', '#some-link');
    await waitForStencilLifecycle(page);

    expect(await getLink()).not.toBe(null);
  });

  it('should dispatch correct click events', async () => {
    await initWordmark({ hasHref: true, isWrapped: true });

    const wrapper = await selectNode(page, 'div');
    const host = await getHost();
    const link = await getLink();

    await addEventListener(wrapper, 'click');

    await link.click();
    await host.click();
    const { counter, targets } = await getEventSummary(wrapper, 'click');

    expect(counter).toBe(2);
    for (const target of targets) {
      expect(target.id).toBe('my-wordmark');
    }
  });

  it('should trigger focus & blur events at the correct time', async () => {
    await initWordmark({
      hasHref: true,
      isWrapped: true,
      hasFocusableElementBefore: true,
      hasFocusableElementAfter: true,
    });

    const host = await getHost();
    const before = await selectNode(page, '#before');
    const after = await selectNode(page, '#after');

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
    expect(await getActiveElementTagNameInShadowRoot(host), 'activeElement within shadow root after 2nd tab').toBe('A');

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
    expect(await getActiveElementTagNameInShadowRoot(host), 'activeElement within shadow root after 1st tab back').toBe(
      'A'
    );

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

  it('should provide methods to focus & blur the element', async () => {
    await initWordmark({ hasHref: true, isWrapped: true, hasFocusableElementBefore: true });
    const host = await getHost();
    const before = await selectNode(page, '#before');
    const wordmarkHasFocus = () => page.evaluate(() => document.activeElement === document.querySelector('p-wordmark'));

    await before.focus();
    expect(await wordmarkHasFocus()).toBe(false);

    await host.focus();
    expect(await wordmarkHasFocus()).toBe(true);

    await page.evaluate(() => (document.querySelector('p-wordmark') as HTMLElement).blur());
    expect(await wordmarkHasFocus()).toBe(false);
  });
});

describe('lifecycle', () => {
  it('should work without unnecessary round trips on init', async () => {
    await initWordmark();
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-wordmark'], 'componentDidLoad: p-wordmark').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });
});

describe('accessibility', () => {
  it('should expose correct initial accessibility tree', async () => {
    await initWordmark();
    await expectA11yToMatchSnapshot(page, await getHost(), { interestingOnly: false });
  });

  it('should expose correct accessibility tree if accessibility properties are set', async () => {
    await initWordmark({ hasHref: true });
    const host = await getHost();
    const link = await getLink();

    await setProperty(host, 'aria', {
      'aria-label': 'Some more detailed label',
    });
    await waitForStencilLifecycle(page);
    await expectA11yToMatchSnapshot(page, link);
  });
});
