import {
  addEventListener,
  expectedStyleOnFocus,
  expectA11yToMatchSnapshot,
  getActiveElementId,
  getLifecycleStatus,
  getOutlineStyle,
  initAddEventListener,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForEventSerialization,
  waitForStencilLifecycle,
  initConsoleObserver,
  getConsoleErrorsAmount,
} from '../helpers';
import { Page } from 'puppeteer';

describe('link-pure', () => {
  let page: Page;

  beforeEach(async () => {
    page = await browser.newPage();
    await initAddEventListener(page);
  });
  afterEach(async () => await page.close());

  const getHost = () => selectNode(page, 'p-link-pure');
  const getLink = () => selectNode(page, 'p-link-pure >>> a');
  const getIcon = () => selectNode(page, 'p-link-pure >>> p-icon >>> svg');
  const getSpan = () => selectNode(page, 'p-link-pure >>> span');
  const getSlottedLink = () => selectNode(page, 'p-link-pure a');

  const initLinkPure = (opts?: { useSlottedAnchor?: boolean; withSubline?: boolean }): Promise<void> => {
    const { useSlottedAnchor = false, withSubline = false } = opts ?? {};

    return setContentWithDesignSystem(
      page,
      `
      <p-link-pure onclick="return false;" ${!useSlottedAnchor ? 'href="#"' : ''}>
        ${useSlottedAnchor ? '<a onclick="return false;" href="">' : ''}
        Some label
        ${useSlottedAnchor ? '</a>' : ''}
        ${withSubline ? '<span slot="subline">Some Subline </span>' : ''}
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

  it('should throw error when used without href', async () => {
    initConsoleObserver(page);
    await setContentWithDesignSystem(
      page,
      `<p-link-pure>Some label</p-link-pure><p-link-pure href="#">Some label</p-link-pure><p-link-pure><a href="#">Some label</a></p-link-pure>`
    );

    expect(getConsoleErrorsAmount()).toBe(1);
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

    expect(beforeFocusCalls, 'beforeFocusCalls initially').toBe(0);
    expect(linkFocusCalls, 'linkFocusCalls initially').toBe(0);
    expect(linkFocusInCalls, 'linkFocusInCalls initially').toBe(0);
    expect(linkBlurCalls, 'linkBlurCalls initially').toBe(0);
    expect(linkFocusOutCalls, 'linkFocusOutCalls initially').toBe(0);
    expect(afterFocusCalls, 'afterFocusCalls initially').toBe(0);
    expect(await getActiveElementId(page), 'activeElementId initially').toBe('');

    await page.keyboard.press('Tab');
    await waitForEventSerialization(page);
    expect(beforeFocusCalls, 'beforeFocusCalls after 1st tab').toBe(1);
    expect(linkFocusCalls, 'linkFocusCalls after 1st tab').toBe(0);
    expect(linkFocusInCalls, 'linkFocusInCalls after 1st tab').toBe(0);
    expect(linkBlurCalls, 'linkBlurCalls after 1st tab').toBe(0);
    expect(linkFocusOutCalls, 'linkFocusOutCalls after 1st tab').toBe(0);
    expect(afterFocusCalls, 'afterFocusCalls after 1st tab').toBe(0);
    expect(await getActiveElementId(page), 'activeElementId after 1st tab').toBe('before');

    await page.keyboard.press('Tab');
    await waitForEventSerialization(page);
    expect(beforeFocusCalls, 'beforeFocusCalls after 2nd tab').toBe(1);
    expect(linkFocusCalls, 'linkFocusCalls after 2nd tab').toBe(1);
    expect(linkFocusInCalls, 'linkFocusInCalls after 2nd tab').toBe(1);
    expect(linkBlurCalls, 'linkBlurCalls after 2nd tab').toBe(0);
    expect(linkFocusOutCalls, 'linkFocusOutCalls after 2nd tab').toBe(0);
    expect(afterFocusCalls, 'afterFocusCalls after 2nd tab').toBe(0);
    expect(await getActiveElementId(page), 'activeElementId after 2nd tab').toBe('my-link-pure');

    await page.keyboard.press('Tab');
    await waitForEventSerialization(page);
    expect(beforeFocusCalls, 'beforeFocusCalls after 3rd tab').toBe(1);
    expect(linkFocusCalls, 'linkFocusCalls after 3rd tab').toBe(1);
    expect(linkFocusInCalls, 'linkFocusInCalls after 3rd tab').toBe(1);
    expect(linkBlurCalls, 'linkBlurCalls after 3rd tab').toBe(1);
    expect(linkFocusOutCalls, 'linkFocusOutCalls after 3rd tab').toBe(1);
    expect(afterFocusCalls, 'afterFocusCalls after 3rd tab').toBe(1);
    expect(await getActiveElementId(page), 'activeElementId  after 3rd tab').toBe('after');

    // tab back
    await page.keyboard.down('ShiftLeft');
    await page.keyboard.press('Tab');
    await waitForEventSerialization(page);
    expect(beforeFocusCalls, 'beforeFocusCalls after 1st tab back').toBe(1);
    expect(linkFocusCalls, 'linkFocusCalls after 1st tab back').toBe(2);
    expect(linkFocusInCalls, 'linkFocusInCalls after 1st tab back').toBe(2);
    expect(linkBlurCalls, 'linkBlurCalls after 1st tab back').toBe(1);
    expect(linkFocusOutCalls, 'linkFocusOutCalls after 1st tab back').toBe(1);
    expect(afterFocusCalls, 'afterFocusCalls after 1st tab back').toBe(1);
    expect(await getActiveElementId(page), 'activeElementId after 1st tab back').toBe('my-link-pure');

    await page.keyboard.press('Tab');
    await waitForEventSerialization(page);
    expect(beforeFocusCalls, 'beforeFocusCalls after 2nd tab back').toBe(2);
    expect(linkFocusCalls, 'linkFocusCalls after 2nd tab back').toBe(2);
    expect(linkFocusInCalls, 'linkFocusInCalls after 2nd tab back').toBe(2);
    expect(linkBlurCalls, 'linkBlurCalls after 2nd tab back').toBe(2);
    expect(linkFocusOutCalls, 'linkFocusOutCalls after 2nd tab back').toBe(2);
    expect(afterFocusCalls, 'afterFocusCalls after 2nd tab back').toBe(1);
    expect(await getActiveElementId(page), 'activeElementId after 2nd tab back').toBe('before');

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

      expect(status.componentDidLoad['p-link-pure'], 'componentDidLoad: p-link-pure').toBe(1);
      expect(status.componentDidLoad['p-text'], 'componentDidLoad: p-text').toBe(1);
      expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(1);

      expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(3);
      expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
    });

    it('should work without unnecessary round trips on prop change', async () => {
      await initLinkPure();
      const host = await getHost();

      await setProperty(host, 'size', 'medium');
      await waitForStencilLifecycle(page);
      const status = await getLifecycleStatus(page);

      expect(status.componentDidUpdate['p-link-pure'], 'componentDidUpdate: p-link-pure').toBe(1);

      expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
    });
  });

  describe('accessibility', () => {
    it('should expose correct initial accessibility tree properties', async () => {
      await initLinkPure();
      const link = await getLink();
      const icon = await getIcon();

      const snapshotIcon = await page.accessibility.snapshot({
        root: icon,
        interestingOnly: false,
      });

      await expectA11yToMatchSnapshot(page, link);
      expect(snapshotIcon).toBeNull();
    });

    it('should expose correct accessibility tree if label is hidden', async () => {
      await initLinkPure();
      const host = await getHost();
      const link = await getLink();
      await setProperty(host, 'hide-label', 'true');
      await waitForStencilLifecycle(page);

      await expectA11yToMatchSnapshot(page, link);
    });

    it('should expose correct accessibility tree description if subline property is set', async () => {
      await initLinkPure({ withSubline: true });
      const link = await getLink();

      await expectA11yToMatchSnapshot(page, link);
    });

    it('should not expose accessibility tree description with slotted anchor and subline', async () => {
      await initLinkPure({ useSlottedAnchor: true, withSubline: true });
      const span = await getSpan();

      const snapshot = await page.accessibility.snapshot({
        root: span,
      });

      expect(snapshot).toBeNull();
    });

    it('should expose correct accessibility tree if accessibility properties are set', async () => {
      await initLinkPure();
      const host = await getHost();
      const link = await getLink();

      await setProperty(host, 'aria', {
        'aria-label': 'Some more detailed label',
      });
      await waitForStencilLifecycle(page);
      await expectA11yToMatchSnapshot(page, link);
    });
  });
});
