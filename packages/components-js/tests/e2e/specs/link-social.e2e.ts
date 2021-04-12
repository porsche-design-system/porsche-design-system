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
  waitForInheritedCSSTransition,
  getLifecycleStatus,
} from '../helpers';
import { Page } from 'puppeteer';

describe('link-social', () => {
  let page: Page;

  beforeEach(async () => {
    page = await getBrowser().newPage();
    await initAddEventListener(page);
  });
  afterEach(async () => await page.close());

  const initLinkSocial = (opts?: { useSlottedAnchor?: boolean }): Promise<void> => {
    const { useSlottedAnchor = false } = opts ?? {};

    return setContentWithDesignSystem(
      page,
      `
      <p-link-social onclick="return false;" ${!useSlottedAnchor ? 'href="#"' : ''} icon="logo-facebook">
        ${useSlottedAnchor ? '<a onclick="return false;" href="">' : ''}
        Some label
        ${useSlottedAnchor ? '</a>' : ''}
      </p-link-social>`
    );
  };

  const getHost = () => selectNode(page, 'p-link-social');
  const getLink = () => selectNode(page, 'p-link-social >>> a');
  const getSlottedLink = () => selectNode(page, 'p-link-social a');

  it('should render', async () => {
    await setContentWithDesignSystem(page, `<p-link-social href="#" icon="logo-facebook">Some label</p-link-social>`);
    const el = await getLink();
    expect(el).toBeDefined();
  });

  it('should dispatch correct click events', async () => {
    await setContentWithDesignSystem(
      page,
      `<div><p-link-social id="hostElement" href="about:blank#" icon="logo-facebook">Some label</p-link-social></div>`
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
            <p-link-social href="#" icon="logo-facebook" id="my-link-social">Some label</p-link-social>
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
    await waitForStencilLifecycle(page);
    expect(beforeFocusCalls).toBe(1, 'after 1st tab');
    expect(linkFocusCalls).toBe(0, 'after 1st tab');
    expect(linkFocusInCalls).toBe(0, 'after 1st tab');
    expect(linkBlurCalls).toBe(0, 'after 1st tab');
    expect(linkFocusOutCalls).toBe(0, 'after 1st tab');
    expect(afterFocusCalls).toBe(0, 'after 1st tab');
    expect(await getActiveElementId(page)).toBe('before');

    await page.keyboard.press('Tab');
    await waitForStencilLifecycle(page);
    expect(beforeFocusCalls).toBe(1, 'after 2nd tab');
    expect(linkFocusCalls).toBe(1, 'after 2nd tab');
    expect(linkFocusInCalls).toBe(1, 'after 2nd tab');
    expect(linkBlurCalls).toBe(0, 'after 2nd tab');
    expect(linkFocusOutCalls).toBe(0, 'after 2nd tab');
    expect(afterFocusCalls).toBe(0, 'after 2nd tab');
    expect(await getActiveElementId(page)).toBe('my-link-social');

    await page.keyboard.press('Tab');
    await waitForStencilLifecycle(page);
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
    await waitForStencilLifecycle(page);
    expect(beforeFocusCalls).toBe(1, 'after 1st tab back');
    expect(linkFocusCalls).toBe(2, 'after 1st tab back');
    expect(linkFocusInCalls).toBe(2, 'after 1st tab back');
    expect(linkBlurCalls).toBe(1, 'after 1st tab back');
    expect(linkFocusOutCalls).toBe(1, 'after 1st tab back');
    expect(afterFocusCalls).toBe(1, 'after 1st tab back');
    expect(await getActiveElementId(page)).toBe('my-link-social');

    await page.keyboard.down('ShiftLeft');
    await page.keyboard.press('Tab');
    await waitForStencilLifecycle(page);
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
            <p-link-social href="#" icon="logo-facebook">Some label</p-link-social>
          </div>
    `
    );

    const linkHasFocus = () => page.evaluate(() => document.activeElement === document.querySelector('p-link-social'));

    const link = await getHost();
    const before = await selectNode(page, '#before');
    await before.focus();
    expect(await linkHasFocus()).toBe(false);
    await link.focus();
    expect(await linkHasFocus()).toBe(true);
    await page.evaluate(() => {
      const linkElement = document.querySelector('p-link-social') as HTMLElement;
      linkElement.blur();
    });
    expect(await linkHasFocus()).toBe(false);
  });

  describe('focus state', () => {
    it('should be shown by keyboard navigation only for shadowed <a>', async () => {
      await initLinkSocial();

      const link = await getLink();
      const hidden = expectedStyleOnFocus({ color: 'transparent' });
      const visible = expectedStyleOnFocus({ color: 'default' }); // because of button click, :focus-visible & :hover

      expect(await getOutlineStyle(link)).toBe(hidden);

      await link.click();
      await waitForInheritedCSSTransition(page);

      expect(await getOutlineStyle(link)).toBe(hidden);

      await page.keyboard.down('ShiftLeft');
      await page.keyboard.press('Tab');
      await page.keyboard.up('ShiftLeft');
      await page.keyboard.press('Tab');

      expect(await getOutlineStyle(link)).toBe(visible);
    });

    it('should show outline of shadowed <a> when it is focused', async () => {
      await initLinkSocial();

      const host = await getHost();
      const link = await getLink();

      expect(await getStyleOnFocus(link)).toBe(expectedStyleOnFocus());

      await setAttribute(host, 'theme', 'dark');
      await waitForStencilLifecycle(page);
      expect(await getStyleOnFocus(link)).toBe(expectedStyleOnFocus({ theme: 'dark' }));
    });

    it('should show outline of slotted <a> when it is focused', async () => {
      await initLinkSocial({ useSlottedAnchor: true });

      const host = await getHost();
      const link = await getSlottedLink();

      expect(await getStyleOnFocus(link, 'outline', { pseudo: '::before' })).toBe(expectedStyleOnFocus());

      await setAttribute(host, 'theme', 'dark');
      await waitForStencilLifecycle(page);
      expect(await getStyleOnFocus(link, 'outline', { pseudo: '::before' })).toBe(
        expectedStyleOnFocus({ theme: 'dark' })
      );
    });
  });

  describe('lifecycle', () => {
    it('should work without unnecessary round trips on init', async () => {
      await initLinkSocial();
      const status = await getLifecycleStatus(page);

      expect(status.componentDidLoad['p-link-social']).toBe(1, 'componentDidLoad: p-link-social');
      expect(status.componentDidLoad['p-text']).toBe(1, 'componentDidLoad: p-text');
      expect(status.componentDidLoad['p-icon']).toBe(1, 'componentDidLoad: p-icon');

      expect(status.componentDidLoad.all).toBe(3, 'componentDidLoad: all');
      expect(status.componentDidUpdate.all).toBe(0, 'componentDidUpdate: all');
    });

    it('should work without unnecessary round trips on prop change', async () => {
      await initLinkSocial();
      const host = await getHost();

      await setAttribute(host, 'icon', 'logo-xing');
      await waitForStencilLifecycle(page);
      const status = await getLifecycleStatus(page);

      expect(status.componentDidUpdate['p-link-social']).toBe(1, 'componentDidUpdate: p-link-social');
      expect(status.componentDidUpdate['p-icon']).toBe(1, 'componentDidUpdate: p-icon');

      expect(status.componentDidUpdate.all).toBe(2, 'componentDidUpdate: all');
    });
  });
});
