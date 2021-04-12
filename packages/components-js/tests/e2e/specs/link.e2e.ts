import {
  addEventListener,
  getActiveElementId,
  getBrowser,
  getStyleOnFocus,
  initAddEventListener,
  selectNode,
  setAttribute,
  setContentWithDesignSystem,
  expectedStyleOnFocus,
  waitForStencilLifecycle,
  getOutlineStyle,
  getLifecycleStatus,
} from '../helpers';
import { Page } from 'puppeteer';

describe('link', () => {
  let page: Page;

  beforeEach(async () => {
    page = await getBrowser().newPage();
    await initAddEventListener(page);
  });
  afterEach(async () => await page.close());

  const getHost = () => selectNode(page, 'p-link');
  const getLink = () => selectNode(page, 'p-link >>> a');
  const getSlottedLink = () => selectNode(page, 'p-link a');

  const initLink = (opts?: { useSlottedAnchor?: boolean }): Promise<void> => {
    const { useSlottedAnchor = false } = opts ?? {};

    return setContentWithDesignSystem(
      page,
      `
      <p-link onclick="return false;" ${!useSlottedAnchor ? 'href="#" ' : ''}>
        ${useSlottedAnchor ? '<a onclick="return false;" href="">' : ''}
        Some label
        ${useSlottedAnchor ? '</a>' : ''}
      </p-link>`
    );
  };

  it('should render', async () => {
    await setContentWithDesignSystem(page, `<p-link href="#">Some label</p-link>`);
    const el = await getLink();
    expect(el).toBeDefined();
  });

  it('should dispatch correct click events', async () => {
    await setContentWithDesignSystem(
      page,
      `<div><p-link id="hostElement" href="about:blank#">Some label</p-link></div>`
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

    expect(beforeFocusCalls).toBe(0, 'initially');
    expect(linkFocusCalls).toBe(0, 'initially');
    expect(linkFocusInCalls).toBe(0, 'initially');
    expect(linkBlurCalls).toBe(0, 'initially');
    expect(linkFocusOutCalls).toBe(0, 'initially');
    expect(afterFocusCalls).toBe(0, 'initially');
    expect(await getActiveElementId(page)).toBe('');

    await page.keyboard.press('Tab');
    expect(beforeFocusCalls).toBe(1, 'after 1st tab');
    expect(linkFocusCalls).toBe(0, 'after 1st tab');
    expect(linkFocusInCalls).toBe(0, 'after 1st tab');
    expect(linkBlurCalls).toBe(0, 'after 1st tab');
    expect(linkFocusOutCalls).toBe(0, 'after 1st tab');
    expect(afterFocusCalls).toBe(0, 'after 1st tab');
    expect(await getActiveElementId(page)).toBe('before');

    await page.keyboard.press('Tab');
    expect(beforeFocusCalls).toBe(1, 'after 2nd tab');
    expect(linkFocusCalls).toBe(1, 'after 2nd tab');
    expect(linkFocusInCalls).toBe(1, 'after 2nd tab');
    expect(linkBlurCalls).toBe(0, 'after 2nd tab');
    expect(linkFocusOutCalls).toBe(0, 'after 2nd tab');
    expect(afterFocusCalls).toBe(0, 'after 2nd tab');
    expect(await getActiveElementId(page)).toBe('my-link');

    await page.keyboard.press('Tab');
    expect(beforeFocusCalls).toBe(1, 'after 3rd tab');
    expect(linkFocusCalls).toBe(1, 'after 3rd tab');
    expect(linkFocusInCalls).toBe(1, 'after 3rd tab');
    expect(linkBlurCalls).toBe(1, 'after 3rd tab');
    expect(linkFocusOutCalls).toBe(1, 'after 3rd tab');
    expect(afterFocusCalls).toBe(1, 'after 3rd tab');
    expect(await getActiveElementId(page)).toBe('after');

    // tab back
    await page.keyboard.down('ShiftLeft');
    await page.keyboard.press('Tab');
    expect(beforeFocusCalls).toBe(1, 'after 1st tab back');
    expect(linkFocusCalls).toBe(2, 'after 1st tab back');
    expect(linkFocusInCalls).toBe(2, 'after 1st tab back');
    expect(linkBlurCalls).toBe(1, 'after 1st tab back');
    expect(linkFocusOutCalls).toBe(1, 'after 1st tab back');
    expect(afterFocusCalls).toBe(1, 'after 1st tab back');
    expect(await getActiveElementId(page)).toBe('my-link');

    await page.keyboard.press('Tab');
    expect(beforeFocusCalls).toBe(2, 'after 2nd tab back');
    expect(linkFocusCalls).toBe(2, 'after 2nd tab back');
    expect(linkFocusInCalls).toBe(2, 'after 2nd tab back');
    expect(linkBlurCalls).toBe(2, 'after 2nd tab back');
    expect(linkFocusOutCalls).toBe(2, 'after 2nd tab back');
    expect(afterFocusCalls).toBe(1, 'after 2nd tab back');
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

    const link = await getHost();
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
    it('should be shown by keyboard navigation only for shadowed <a>', async () => {
      await initLink();

      const link = await getLink();
      const hidden = expectedStyleOnFocus({ color: 'transparent' });
      const visible = expectedStyleOnFocus({ color: 'contrastHigh' });

      expect(await getOutlineStyle(link)).toBe(hidden);

      await link.click();

      expect(await getOutlineStyle(link)).toBe(hidden);

      await page.keyboard.down('ShiftLeft');
      await page.keyboard.press('Tab');
      await page.keyboard.up('ShiftLeft');
      await page.keyboard.press('Tab');

      expect(await getOutlineStyle(link)).toBe(visible);
    });

    it('should be shown by keyboard navigation only for slotted <a>', async () => {
      await initLink({ useSlottedAnchor: true });

      const link = await getSlottedLink();
      const hidden = expectedStyleOnFocus({ color: 'transparent' });
      const visible = expectedStyleOnFocus({ color: 'contrastHigh' });

      expect(await getOutlineStyle(link, { pseudo: '::before' })).toBe(hidden);

      await link.click();

      expect(await getOutlineStyle(link, { pseudo: '::before' })).toBe(hidden);

      await page.keyboard.down('ShiftLeft');
      await page.keyboard.press('Tab');
      await page.keyboard.up('ShiftLeft');
      await page.keyboard.press('Tab');

      expect(await getOutlineStyle(link, { pseudo: '::before' })).toBe(visible);
    });

    it('should show outline of shadowed <a> when it is focused', async () => {
      await initLink();

      const host = await getHost();
      const link = await getLink();

      expect(await getStyleOnFocus(link)).toBe(expectedStyleOnFocus({ color: 'contrastHigh' }));

      await setAttribute(host, 'variant', 'secondary');
      await setAttribute(host, 'theme', 'dark');
      await waitForStencilLifecycle(page);
      expect(await getStyleOnFocus(link)).toBe(expectedStyleOnFocus({ theme: 'dark' }));

      await setAttribute(host, 'variant', 'primary');
      await setAttribute(host, 'theme', 'light');
      await waitForStencilLifecycle(page);
      expect(await getStyleOnFocus(link)).toBe(expectedStyleOnFocus({ color: 'brand' }));

      await setAttribute(host, 'variant', 'primary');
      await setAttribute(host, 'theme', 'dark');
      await waitForStencilLifecycle(page);
      expect(await getStyleOnFocus(link)).toBe(expectedStyleOnFocus({ color: 'brand', theme: 'dark' }));

      await setAttribute(host, 'variant', 'tertiary');
      await setAttribute(host, 'theme', 'light');
      await waitForStencilLifecycle(page);
      expect(await getStyleOnFocus(link)).toBe(expectedStyleOnFocus({ color: 'contrastHigh' }));

      await setAttribute(host, 'variant', 'tertiary');
      await setAttribute(host, 'theme', 'dark');
      await waitForStencilLifecycle(page);
      expect(await getStyleOnFocus(link)).toBe(expectedStyleOnFocus({ theme: 'dark' }));
    });

    it('should show outline of slotted <a> when it is focused', async () => {
      await initLink({ useSlottedAnchor: true });

      const host = await getHost();
      const link = await getSlottedLink();

      expect(await getStyleOnFocus(link, 'outline', { pseudo: '::before' })).toBe(
        expectedStyleOnFocus({ color: 'contrastHigh' })
      );

      await setAttribute(host, 'variant', 'secondary');
      await setAttribute(host, 'theme', 'dark');
      await waitForStencilLifecycle(page);
      expect(await getStyleOnFocus(link, 'outline', { pseudo: '::before' })).toBe(
        expectedStyleOnFocus({ theme: 'dark' })
      );

      await setAttribute(host, 'variant', 'primary');
      await setAttribute(host, 'theme', 'light');
      await waitForStencilLifecycle(page);
      expect(await getStyleOnFocus(link, 'outline', { pseudo: '::before' })).toBe(
        expectedStyleOnFocus({ color: 'brand' })
      );

      await setAttribute(host, 'variant', 'primary');
      await setAttribute(host, 'theme', 'dark');
      await waitForStencilLifecycle(page);
      expect(await getStyleOnFocus(link, 'outline', { pseudo: '::before' })).toBe(
        expectedStyleOnFocus({ color: 'brand', theme: 'dark' })
      );

      await setAttribute(host, 'variant', 'tertiary');
      await setAttribute(host, 'theme', 'light');
      await waitForStencilLifecycle(page);
      expect(await getStyleOnFocus(link, 'outline', { pseudo: '::before' })).toBe(
        expectedStyleOnFocus({ color: 'contrastHigh' })
      );

      await setAttribute(host, 'variant', 'tertiary');
      await setAttribute(host, 'theme', 'dark');
      await waitForStencilLifecycle(page);
      expect(await getStyleOnFocus(link, 'outline', { pseudo: '::before' })).toBe(
        expectedStyleOnFocus({ theme: 'dark' })
      );
    });
  });

  describe('lifecycle', () => {
    it('should work without unnecessary round trips on init', async () => {
      await initLink();
      const status = await getLifecycleStatus(page);

      expect(status.componentDidLoad['p-link']).toBe(1, 'componentDidLoad: p-link');
      expect(status.componentDidLoad['p-text']).toBe(1, 'componentDidLoad: p-text');
      expect(status.componentDidLoad['p-icon']).toBe(1, 'componentDidLoad: p-icon');

      expect(status.componentDidLoad.all).toBe(3, 'componentDidLoad: all');
      expect(status.componentDidUpdate.all).toBe(0, 'componentDidUpdate: all');
    });

    it('should work without unnecessary round trips on prop change', async () => {
      await initLink();
      const host = await getHost();

      await setAttribute(host, 'variant', 'tertiary');
      await waitForStencilLifecycle(page);
      const status = await getLifecycleStatus(page);

      expect(status.componentDidUpdate['p-link']).toBe(1, 'componentDidUpdate: p-link');

      expect(status.componentDidUpdate.all).toBe(1, 'componentDidUpdate: all');
    });
  });
});
