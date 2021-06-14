import {
  addEventListener,
  expectedStyleOnFocus,
  getActiveElementId,
  getBrowser,
  getLifecycleStatus,
  getOutlineStyle,
  initAddEventListener,
  selectNode,
  setAttribute,
  setContentWithDesignSystem,
  waitForEventSerialization,
  waitForStencilLifecycle,
} from '../helpers';
import { Page } from 'puppeteer';

describe('link-pure', () => {
  let page: Page;

  beforeEach(async () => {
    page = await getBrowser().newPage();
    await initAddEventListener(page);
  });
  afterEach(async () => await page.close());

  const getHost = () => selectNode(page, 'p-link-pure');
  const getLink = () => selectNode(page, 'p-link-pure >>> a');
  const getSlottedLink = () => selectNode(page, 'p-link-pure a');

  const initLinkPure = (opts?: { useSlottedAnchor?: boolean }): Promise<void> => {
    const { useSlottedAnchor = false } = opts ?? {};

    return setContentWithDesignSystem(
      page,
      `
      <p-link-pure onclick="return false;" ${!useSlottedAnchor ? 'href="#"' : ''}>
        ${useSlottedAnchor ? '<a onclick="return false;" href="">' : ''}
        Some label
        ${useSlottedAnchor ? '</a>' : ''}
      </p-link-pure>`
    );
  };

  it('should dispatch correct click events', async () => {
    await setContentWithDesignSystem(
      page,
      `<div><p-link-pure id="hostElement" href="about:blank#">Some label</p-link-pure></div>`
    );

    const wrapper = await selectNode(page, 'div');
    const host = await getHost();
    const link = await getLink();

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

  it('should trigger focus & blur events at the correct time', async () => {
    await setContentWithDesignSystem(
      page,
      `
          <div id="wrapper">
            <a href="#" id="before">before</a>
            <p-link-pure href="#" id="my-link-pure">Some label</p-link-pure>
            <a href="#" id="after">after</a>
          </div>
    `
    );
    const link = await getHost();
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

    expect(beforeFocusCalls).toBe(0, 'beforeFocusCalls initially');
    expect(linkFocusCalls).toBe(0, 'linkFocusCalls initially');
    expect(linkFocusInCalls).toBe(0, 'linkFocusInCalls initially');
    expect(linkBlurCalls).toBe(0, 'linkBlurCalls initially');
    expect(linkFocusOutCalls).toBe(0, 'linkFocusOutCalls initially');
    expect(afterFocusCalls).toBe(0, 'afterFocusCalls initially');
    expect(await getActiveElementId(page)).toBe('', 'activeElementId initially');

    await page.keyboard.press('Tab');
    await waitForEventSerialization(page);
    expect(beforeFocusCalls).toBe(1, 'beforeFocusCalls after 1st tab');
    expect(linkFocusCalls).toBe(0, 'linkFocusCalls after 1st tab');
    expect(linkFocusInCalls).toBe(0, 'linkFocusInCalls after 1st tab');
    expect(linkBlurCalls).toBe(0, 'linkBlurCalls after 1st tab');
    expect(linkFocusOutCalls).toBe(0, 'linkFocusOutCalls after 1st tab');
    expect(afterFocusCalls).toBe(0, 'afterFocusCalls after 1st tab');
    expect(await getActiveElementId(page)).toBe('before', 'activeElementId after 1st tab');

    await page.keyboard.press('Tab');
    await waitForEventSerialization(page);
    expect(beforeFocusCalls).toBe(1, 'beforeFocusCalls after 2nd tab');
    expect(linkFocusCalls).toBe(1, 'linkFocusCalls after 2nd tab');
    expect(linkFocusInCalls).toBe(1, 'linkFocusInCalls after 2nd tab');
    expect(linkBlurCalls).toBe(0, 'linkBlurCalls after 2nd tab');
    expect(linkFocusOutCalls).toBe(0, 'linkFocusOutCalls after 2nd tab');
    expect(afterFocusCalls).toBe(0, 'afterFocusCalls after 2nd tab');
    expect(await getActiveElementId(page)).toBe('my-link-pure', 'activeElementId after 2nd tab');

    await page.keyboard.press('Tab');
    await waitForEventSerialization(page);
    expect(beforeFocusCalls).toBe(1, 'beforeFocusCalls after 3rd tab');
    expect(linkFocusCalls).toBe(1, 'linkFocusCalls after 3rd tab');
    expect(linkFocusInCalls).toBe(1, 'linkFocusInCalls after 3rd tab');
    expect(linkBlurCalls).toBe(1, 'linkBlurCalls after 3rd tab');
    expect(linkFocusOutCalls).toBe(1, 'linkFocusOutCalls after 3rd tab');
    expect(afterFocusCalls).toBe(1, 'afterFocusCalls after 3rd tab');
    expect(await getActiveElementId(page)).toBe('after', 'activeElementId  after 3rd tab');

    // tab back
    await page.keyboard.down('ShiftLeft');
    await page.keyboard.press('Tab');
    await waitForEventSerialization(page);
    expect(beforeFocusCalls).toBe(1, 'beforeFocusCalls after 1st tab back');
    expect(linkFocusCalls).toBe(2, 'linkFocusCalls after 1st tab back');
    expect(linkFocusInCalls).toBe(2, 'linkFocusInCalls after 1st tab back');
    expect(linkBlurCalls).toBe(1, 'linkBlurCalls after 1st tab back');
    expect(linkFocusOutCalls).toBe(1, 'linkFocusOutCalls after 1st tab back');
    expect(afterFocusCalls).toBe(1, 'afterFocusCalls after 1st tab back');
    expect(await getActiveElementId(page)).toBe('my-link-pure', 'activeElementId after 1st tab back');

    await page.keyboard.press('Tab');
    await waitForEventSerialization(page);
    expect(beforeFocusCalls).toBe(2, 'beforeFocusCalls after 2nd tab back');
    expect(linkFocusCalls).toBe(2, 'linkFocusCalls after 2nd tab back');
    expect(linkFocusInCalls).toBe(2, 'linkFocusInCalls after 2nd tab back');
    expect(linkBlurCalls).toBe(2, 'linkBlurCalls after 2nd tab back');
    expect(linkFocusOutCalls).toBe(2, 'linkFocusOutCalls after 2nd tab back');
    expect(afterFocusCalls).toBe(1, 'afterFocusCalls after 2nd tab back');
    expect(await getActiveElementId(page)).toBe('before', 'activeElementId after 2nd tab back');

    await page.keyboard.up('ShiftLeft');
  });

  it('should provide functionality to focus & blur the custom element', async () => {
    await setContentWithDesignSystem(
      page,
      `
          <div id="wrapper">
            <a href="#" id="before">before</a>
            <p-link-pure href="#">Some label</p-link-pure>
          </div>
    `
    );

    const linkHasFocus = () => page.evaluate(() => document.activeElement === document.querySelector('p-link-pure'));

    const link = await getHost();
    const before = await selectNode(page, '#before');
    await before.focus();

    expect(await linkHasFocus()).toBe(false);
    await link.focus();
    expect(await linkHasFocus()).toBe(true);
    await page.evaluate(() => {
      const linkElement: HTMLElement = document.querySelector('p-link-pure');
      linkElement.blur();
    });
    expect(await linkHasFocus()).toBe(false);
  });

  describe('focus state', () => {
    it('should be shown by keyboard navigation only for shadowed <a>', async () => {
      await initLinkPure();

      const link = await getLink();
      const hidden = expectedStyleOnFocus({ color: 'transparent', offset: '1px' });
      const visible = expectedStyleOnFocus({ color: 'hover', offset: '1px' });

      expect(await getOutlineStyle(link, { pseudo: '::before' })).toBe(hidden);

      await link.click();

      expect(await getOutlineStyle(link, { pseudo: '::before' })).toBe(hidden);

      await page.keyboard.down('ShiftLeft');
      await page.keyboard.press('Tab');
      await page.keyboard.up('ShiftLeft');
      await page.keyboard.press('Tab');

      expect(await getOutlineStyle(link, { pseudo: '::before' })).toBe(visible);
    });

    it('should be shown by keyboard navigation only for slotted <a>', async () => {
      await initLinkPure({ useSlottedAnchor: true });

      const link = await getSlottedLink();
      const hidden = expectedStyleOnFocus({ color: 'transparent', offset: '1px' });
      const visible = expectedStyleOnFocus({ color: 'hover', offset: '1px' });

      expect(await getOutlineStyle(link, { pseudo: '::before' })).toBe(hidden);

      await link.click();

      expect(await getOutlineStyle(link, { pseudo: '::before' })).toBe(hidden);

      await page.keyboard.down('ShiftLeft');
      await page.keyboard.press('Tab');
      await page.keyboard.up('ShiftLeft');
      await page.keyboard.press('Tab');

      expect(await getOutlineStyle(link, { pseudo: '::before' })).toBe(visible);
    });
  });

  describe('lifecycle', () => {
    it('should work without unnecessary round trips on init', async () => {
      await initLinkPure();
      const status = await getLifecycleStatus(page);

      expect(status.componentDidLoad['p-link-pure']).toBe(1, 'componentDidLoad: p-link-pure');
      expect(status.componentDidLoad['p-text']).toBe(1, 'componentDidLoad: p-text');
      expect(status.componentDidLoad['p-icon']).toBe(1, 'componentDidLoad: p-icon');

      expect(status.componentDidLoad.all).toBe(3, 'componentDidLoad: all');
      expect(status.componentDidUpdate.all).toBe(0, 'componentDidUpdate: all');
    });

    it('should work without unnecessary round trips on prop change', async () => {
      await initLinkPure();
      const host = await getHost();

      await setAttribute(host, 'size', 'medium');
      await waitForStencilLifecycle(page);
      const status = await getLifecycleStatus(page);

      expect(status.componentDidUpdate['p-link-pure']).toBe(1, 'componentDidUpdate: p-link-pure');

      expect(status.componentDidUpdate.all).toBe(1, 'componentDidUpdate: all');
    });
  });
});
