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

    expect(beforeFocusCalls).withContext('beforeFocusCalls initially').toBe(0);
    expect(linkFocusCalls).withContext('linkFocusCalls initially').toBe(0);
    expect(linkFocusInCalls).withContext('linkFocusInCalls initially').toBe(0);
    expect(linkBlurCalls).withContext('linkBlurCalls initially').toBe(0);
    expect(linkFocusOutCalls).withContext('linkFocusOutCalls initially').toBe(0);
    expect(afterFocusCalls).withContext('afterFocusCalls initially').toBe(0);
    expect(await getActiveElementId(page))
      .withContext('activeElementId initially')
      .toBe('');

    await page.keyboard.press('Tab');
    await waitForEventSerialization(page);
    expect(beforeFocusCalls).withContext('beforeFocusCalls after 1st tab').toBe(1);
    expect(linkFocusCalls).withContext('linkFocusCalls after 1st tab').toBe(0);
    expect(linkFocusInCalls).withContext('linkFocusInCalls after 1st tab').toBe(0);
    expect(linkBlurCalls).withContext('linkBlurCalls after 1st tab').toBe(0);
    expect(linkFocusOutCalls).withContext('linkFocusOutCalls after 1st tab').toBe(0);
    expect(afterFocusCalls).withContext('afterFocusCalls after 1st tab').toBe(0);
    expect(await getActiveElementId(page))
      .withContext('activeElementId after 1st tab')
      .toBe('before');

    await page.keyboard.press('Tab');
    await waitForEventSerialization(page);
    expect(beforeFocusCalls).withContext('beforeFocusCalls after 2nd tab').toBe(1);
    expect(linkFocusCalls).withContext('linkFocusCalls after 2nd tab').toBe(1);
    expect(linkFocusInCalls).withContext('linkFocusInCalls after 2nd tab').toBe(1);
    expect(linkBlurCalls).withContext('linkBlurCalls after 2nd tab').toBe(0);
    expect(linkFocusOutCalls).withContext('linkFocusOutCalls after 2nd tab').toBe(0);
    expect(afterFocusCalls).withContext('afterFocusCalls after 2nd tab').toBe(0);
    expect(await getActiveElementId(page))
      .withContext('activeElementId after 2nd tab')
      .toBe('my-link-pure');

    await page.keyboard.press('Tab');
    await waitForEventSerialization(page);
    expect(beforeFocusCalls).withContext('beforeFocusCalls after 3rd tab').toBe(1);
    expect(linkFocusCalls).withContext('linkFocusCalls after 3rd tab').toBe(1);
    expect(linkFocusInCalls).withContext('linkFocusInCalls after 3rd tab').toBe(1);
    expect(linkBlurCalls).withContext('linkBlurCalls after 3rd tab').toBe(1);
    expect(linkFocusOutCalls).withContext('linkFocusOutCalls after 3rd tab').toBe(1);
    expect(afterFocusCalls).withContext('afterFocusCalls after 3rd tab').toBe(1);
    expect(await getActiveElementId(page))
      .withContext('activeElementId  after 3rd tab')
      .toBe('after');

    // tab back
    await page.keyboard.down('ShiftLeft');
    await page.keyboard.press('Tab');
    await waitForEventSerialization(page);
    expect(beforeFocusCalls).withContext('beforeFocusCalls after 1st tab back').toBe(1);
    expect(linkFocusCalls).withContext('linkFocusCalls after 1st tab back').toBe(2);
    expect(linkFocusInCalls).withContext('linkFocusInCalls after 1st tab back').toBe(2);
    expect(linkBlurCalls).withContext('linkBlurCalls after 1st tab back').toBe(1);
    expect(linkFocusOutCalls).withContext('linkFocusOutCalls after 1st tab back').toBe(1);
    expect(afterFocusCalls).withContext('afterFocusCalls after 1st tab back').toBe(1);
    expect(await getActiveElementId(page))
      .withContext('activeElementId after 1st tab back')
      .toBe('my-link-pure');

    await page.keyboard.press('Tab');
    await waitForEventSerialization(page);
    expect(beforeFocusCalls).withContext('beforeFocusCalls after 2nd tab back').toBe(2);
    expect(linkFocusCalls).withContext('linkFocusCalls after 2nd tab back').toBe(2);
    expect(linkFocusInCalls).withContext('linkFocusInCalls after 2nd tab back').toBe(2);
    expect(linkBlurCalls).withContext('linkBlurCalls after 2nd tab back').toBe(2);
    expect(linkFocusOutCalls).withContext('linkFocusOutCalls after 2nd tab back').toBe(2);
    expect(afterFocusCalls).withContext('afterFocusCalls after 2nd tab back').toBe(1);
    expect(await getActiveElementId(page))
      .withContext('activeElementId after 2nd tab back')
      .toBe('before');

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

      expect(status.componentDidLoad['p-link-pure']).withContext('componentDidLoad: p-link-pure').toBe(1);
      expect(status.componentDidLoad['p-text']).withContext('componentDidLoad: p-text').toBe(1);
      expect(status.componentDidLoad['p-icon']).withContext('componentDidLoad: p-icon').toBe(1);

      expect(status.componentDidLoad.all).withContext('componentDidLoad: all').toBe(3);
      expect(status.componentDidUpdate.all).withContext('componentDidUpdate: all').toBe(0);
    });

    it('should work without unnecessary round trips on prop change', async () => {
      await initLinkPure();
      const host = await getHost();

      await setAttribute(host, 'size', 'medium');
      await waitForStencilLifecycle(page);
      const status = await getLifecycleStatus(page);

      expect(status.componentDidUpdate['p-link-pure']).withContext('componentDidUpdate: p-link-pure').toBe(1);

      expect(status.componentDidUpdate.all).withContext('componentDidUpdate: all').toBe(1);
    });
  });
});
