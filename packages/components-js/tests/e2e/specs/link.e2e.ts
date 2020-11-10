import {
  addEventListener,
  getActiveElementId,
  getBrowser, getStyleOnFocus,
  initAddEventListener,
  selectNode, setAttribute,
  setContentWithDesignSystem,
  waitForStencilLifecycle
} from '../helpers';
import { Page } from 'puppeteer';
import { expectedStyleOnFocus } from '../constants';

describe('link', () => {
  let page: Page;

  beforeEach(async () => {
    page = await getBrowser().newPage();
    await initAddEventListener(page);
  });
  afterEach(async () => await page.close());

  const getLinkHost = () => selectNode(page, 'p-link');
  const getLinkRealLink = () => selectNode(page, 'p-link >>> a');
  const getSlottedLink = () => selectNode(page, 'p-link a');

  it('should render', async () => {
    await setContentWithDesignSystem(page, `<p-link href="#">Some label</p-link>`);
    const el = await getLinkRealLink();
    expect(el).toBeDefined();
  });

  it('should dispatch correct click events', async () => {
    await setContentWithDesignSystem(
      page,
      `<div><p-link id="hostElement" href="about:blank#">Some label</p-link></div>`
    );

    const wrapper = await selectNode(page, 'div');
    const host = await getLinkHost();
    const link = await getLinkRealLink();

    const events = [];
    await addEventListener(wrapper, 'click', (ev) => events.push(ev));

    await link.click();
    await host.click();
    await waitForStencilLifecycle(page);

    expect(events.length).toBe(2);
    for (const event of events) {
      expect(event.target.id).toBe('hostElement');
    }
  });

  it(`should trigger focus&blur events at the correct time`, async () => {
    await setContentWithDesignSystem(
      page,
      `
      <div id="wrapper">
        <a href="#" id="before">before</a>
        <p-link href="#" id="my-link">Some label</p-link>
        <a href="#" id="after">after</a>
      </div>
    `
    );

    const link = await getLinkHost();
    const before = await selectNode(page, '#before');
    const after = await selectNode(page, '#after');

    let beforeFocusCalls = 0;
    await addEventListener(before, 'focus', () => beforeFocusCalls++);
    let linkFocusCalls = 0;
    await addEventListener(link, 'focus', () => linkFocusCalls++);
    let linkFocusInCalls = 0;
    await addEventListener(link, 'focusin', () => linkFocusInCalls++);
    let linkBlurCalls = 0;
    await addEventListener(link, 'blur', () => linkBlurCalls++);
    let linkFocusOutCalls = 0;
    await addEventListener(link, 'focusout', () => linkFocusOutCalls++);
    let afterFocusCalls = 0;
    await addEventListener(after, 'focus', () => afterFocusCalls++);

    expect(beforeFocusCalls).toBe(0);
    expect(linkFocusCalls).toBe(0);
    expect(linkFocusInCalls).toBe(0);
    expect(linkBlurCalls).toBe(0);
    expect(linkFocusOutCalls).toBe(0);
    expect(afterFocusCalls).toBe(0);
    expect(await getActiveElementId(page)).toBe('');

    await page.keyboard.press('Tab');
    expect(beforeFocusCalls).toBe(1);
    expect(linkFocusCalls).toBe(0);
    expect(linkFocusInCalls).toBe(0);
    expect(linkBlurCalls).toBe(0);
    expect(linkFocusOutCalls).toBe(0);
    expect(afterFocusCalls).toBe(0);
    expect(await getActiveElementId(page)).toBe('before');

    await page.keyboard.press('Tab');
    expect(beforeFocusCalls).toBe(1);
    expect(linkFocusCalls).toBe(1);
    expect(linkFocusInCalls).toBe(1);
    expect(linkBlurCalls).toBe(0);
    expect(linkFocusOutCalls).toBe(0);
    expect(afterFocusCalls).toBe(0);
    expect(await getActiveElementId(page)).toBe('my-link');

    await page.keyboard.press('Tab');
    expect(beforeFocusCalls).toBe(1);
    expect(linkFocusCalls).toBe(1);
    expect(linkFocusInCalls).toBe(1);
    expect(linkBlurCalls).toBe(1);
    expect(linkFocusOutCalls).toBe(1);
    expect(afterFocusCalls).toBe(1);
    expect(await getActiveElementId(page)).toBe('after');

    // tab back
    await page.keyboard.down('ShiftLeft');
    await page.keyboard.press('Tab');
    expect(beforeFocusCalls).toBe(1);
    expect(linkFocusCalls).toBe(2);
    expect(linkFocusInCalls).toBe(2);
    expect(linkBlurCalls).toBe(1);
    expect(linkFocusOutCalls).toBe(1);
    expect(afterFocusCalls).toBe(1);
    expect(await getActiveElementId(page)).toBe('my-link');

    await page.keyboard.down('ShiftLeft');
    await page.keyboard.press('Tab');
    expect(beforeFocusCalls).toBe(2);
    expect(linkFocusCalls).toBe(2);
    expect(linkFocusInCalls).toBe(2);
    expect(linkBlurCalls).toBe(2);
    expect(linkFocusOutCalls).toBe(2);
    expect(afterFocusCalls).toBe(1);
    expect(await getActiveElementId(page)).toBe('before');

    await page.keyboard.up('ShiftLeft');
  });

  it(`should provide methods to focus&blur the element`, async () => {
    await setContentWithDesignSystem(
      page,
      `
      <div id="wrapper">
        <a href="#" id="before">before</a>
        <p-link href="#">Some label</p-link>
      </div>
    `
    );

    const linkHasFocus = () => page.evaluate(() => document.activeElement === document.querySelector('p-link'));

    const link = await getLinkHost();
    const before = await selectNode(page, '#before');
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

  describe('focus state', () => {
    it('should show outline of shadowed <a> when it is focused', async () => {
      await setContentWithDesignSystem(
        page,
        `<p-link href="#">Some label</p-link>`
      );

      const host = await getLinkHost();
      const link = await getLinkRealLink();

      expect(await getStyleOnFocus(link)).toBe(expectedStyleOnFocus({color: 'contrastHigh'}));

      await setAttribute(host, 'variant', 'secondary');
      await setAttribute(host, 'theme', 'dark');
      await waitForStencilLifecycle(page);
      expect(await getStyleOnFocus(link)).toBe(expectedStyleOnFocus({color: 'default', theme: 'dark'}));

      await setAttribute(host, 'variant', 'primary');
      await setAttribute(host, 'theme', 'light');
      await waitForStencilLifecycle(page);
      expect(await getStyleOnFocus(link)).toBe(expectedStyleOnFocus({color: 'brand'}));

      await setAttribute(host, 'variant', 'primary');
      await setAttribute(host, 'theme', 'dark');
      await waitForStencilLifecycle(page);
      expect(await getStyleOnFocus(link)).toBe(expectedStyleOnFocus({color: 'brand', theme: 'dark'}));

      await setAttribute(host, 'variant', 'tertiary');
      await setAttribute(host, 'theme', 'light');
      await waitForStencilLifecycle(page);
      expect(await getStyleOnFocus(link)).toBe(expectedStyleOnFocus({color: 'contrastHigh'}));

      await setAttribute(host, 'variant', 'tertiary');
      await setAttribute(host, 'theme', 'dark');
      await waitForStencilLifecycle(page);
      expect(await getStyleOnFocus(link)).toBe(expectedStyleOnFocus({color: 'default', theme: 'dark'}));
    });

    it('should show outline of slotted <a> when it is focused', async () => {
      await setContentWithDesignSystem(
        page,
        `<p-link>
          <a href="#">Some label</a>
        </p-link>`
      );

      const host = await getLinkHost();
      const link = await getSlottedLink();

      expect(await getStyleOnFocus(link, 'outline', {pseudo: '::before'})).toBe(expectedStyleOnFocus({color: 'contrastHigh'}));

      await setAttribute(host, 'variant', 'secondary');
      await setAttribute(host, 'theme', 'dark');
      await waitForStencilLifecycle(page);
      expect(await getStyleOnFocus(link, 'outline', {pseudo: '::before'})).toBe(expectedStyleOnFocus({color: 'default', theme: 'dark'}));

      await setAttribute(host, 'variant', 'primary');
      await setAttribute(host, 'theme', 'light');
      await waitForStencilLifecycle(page);
      expect(await getStyleOnFocus(link, 'outline', {pseudo: '::before'})).toBe(expectedStyleOnFocus({color: 'brand'}));

      await setAttribute(host, 'variant', 'primary');
      await setAttribute(host, 'theme', 'dark');
      await waitForStencilLifecycle(page);
      expect(await getStyleOnFocus(link, 'outline', {pseudo: '::before'})).toBe(expectedStyleOnFocus({color: 'brand', theme: 'dark'}));

      await setAttribute(host, 'variant', 'tertiary');
      await setAttribute(host, 'theme', 'light');
      await waitForStencilLifecycle(page);
      expect(await getStyleOnFocus(link, 'outline', {pseudo: '::before'})).toBe(expectedStyleOnFocus({color: 'contrastHigh'}));

      await setAttribute(host, 'variant', 'tertiary');
      await setAttribute(host, 'theme', 'dark');
      await waitForStencilLifecycle(page);
      expect(await getStyleOnFocus(link, 'outline', {pseudo: '::before'})).toBe(expectedStyleOnFocus({color: 'default', theme: 'dark'}));
    });
  });
});
