import { Page } from 'puppeteer';
import {
  addEventListener,
  expectA11yToMatchSnapshot,
  getAttribute,
  getElementStyle,
  getLifecycleStatus,
  hasFocus,
  initAddEventListener,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForEventSerialization,
  waitForStencilLifecycle,
} from '../helpers';
import { HeadlineTag } from '@porsche-design-system/components/src/components/basic/typography/headline/headline-utils';

describe('accordion', () => {
  let page: Page;
  beforeEach(async () => (page = await browser.newPage()));
  afterEach(async () => await page.close());

  type InitOptions = {
    tag?: HeadlineTag;
    otherMarkup?: string;
    hasInput?: boolean;
    isOpen?: boolean;
  };

  const clickHandlerScript = `
    <script>
      const accordion = document.querySelector('p-accordion')
      accordion.addEventListener('accordionChange', (e) => {
          e.target.open = e.detail.open;
      });
    </script>`;

  const initAccordion = async (opts?: InitOptions) => {
    const { tag = 'h2', otherMarkup = '', hasInput, isOpen = false } = opts ?? {};

    const content = `<p-accordion heading="Some Accordion" tag="${tag}" open="${isOpen}">
Test content Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
ut labore et dolore magna aliquyam erat, sed diam voluptua.${hasInput ? '<input type="text"/>' : ''}
</p-accordion>${otherMarkup}`;

    await setContentWithDesignSystem(page, content);
  };

  const getHost = () => selectNode(page, 'p-accordion');
  const getButton = () => selectNode(page, 'p-accordion >>> button');
  const getInput = () => selectNode(page, 'input');
  const getCollapsible = () => selectNode(page, 'p-accordion >>> .collapsible');
  const getBody = () => selectNode(page, 'body');

  const getOverflowOnCollapsible = async () => getElementStyle(await getCollapsible(), 'overflow');
  const getVisibilityOnCollapsible = async () => getElementStyle(await getCollapsible(), 'visibility');

  it('should set "visibility: visible" on collapsible on initial open', async () => {
    await initAccordion({ isOpen: true });
    expect(await getVisibilityOnCollapsible()).toBe('visible');
  });

  it('should set "visibility: visible" on collapsible on initial close', async () => {
    await initAccordion();
    expect(await getVisibilityOnCollapsible()).toBe('hidden');
  });

  it('should set "visibility: visible" on collapsible on open change', async () => {
    await initAccordion();
    const host = await getHost();

    expect(await getVisibilityOnCollapsible(), 'initially').toBe('hidden');

    await setProperty(host, 'open', true);
    await waitForStencilLifecycle(page);

    expect(await getVisibilityOnCollapsible(), 'after open=true').toBe('visible');

    await setProperty(host, 'open', false);
    await waitForStencilLifecycle(page);

    expect(await getVisibilityOnCollapsible(), 'after open=false').toBe('hidden');
  });

  it('should have correct visibility after fast open/close re-trigger', async () => {
    await initAccordion({ otherMarkup: clickHandlerScript });
    const button = await getButton();

    // expand -> collapse -> expand
    await button.click();
    await button.click();
    await button.click();
    await waitForStencilLifecycle(page);

    expect(await getVisibilityOnCollapsible()).toBe('visible');
  });

  it('should have correct visibility after fast close/open re-trigger', async () => {
    await initAccordion({ isOpen: true, otherMarkup: clickHandlerScript });
    const button = await getButton();

    // collapse -> expand -> collapse
    await button.click();
    await button.click();
    await button.click();
    await waitForStencilLifecycle(page);

    expect(await getVisibilityOnCollapsible()).toBe('hidden');
  });

  it('should have correct overflow when changed from closed to opened to closed', async () => {
    await initAccordion({ otherMarkup: clickHandlerScript });
    const button = await getButton();

    expect(await getOverflowOnCollapsible(), 'initial closed').toBe('hidden');

    await button.click();
    await waitForStencilLifecycle(page);

    expect(await getOverflowOnCollapsible(), 'after click to open').toBe('visible');

    await button.click();
    await waitForStencilLifecycle(page);

    expect(await getOverflowOnCollapsible(), 'after click to close').toBe('hidden');
  });

  it('should have correct overflow when changed from opened to closed to opened', async () => {
    await initAccordion({ isOpen: true, otherMarkup: clickHandlerScript });
    const button = await getButton();

    expect(await getOverflowOnCollapsible(), 'initial opened').toBe('visible');

    await button.click();
    await waitForStencilLifecycle(page);

    expect(await getOverflowOnCollapsible(), 'after click to close').toBe('hidden');

    await button.click();
    await waitForStencilLifecycle(page);

    expect(await getOverflowOnCollapsible(), 'after click to open').toBe('visible');
  });

  it('should show aria-expanded true when open and false when closed', async () => {
    await initAccordion({ otherMarkup: clickHandlerScript });
    const button = await getButton();

    expect(await getAttribute(button, 'aria-expanded'), 'initial when closed').toBe('false');

    await button.click();
    await waitForStencilLifecycle(page);

    expect(await getAttribute(button, 'aria-expanded'), 'after click to open').toBe('true');

    await button.click();
    await waitForStencilLifecycle(page);

    expect(await getAttribute(button, 'aria-expanded'), 'after click to close').toBe('false');
  });

  it('should set correct inline content height using ResizeObserver', async () => {
    await initAccordion({ otherMarkup: clickHandlerScript });

    const button = await getButton();

    await button.click();
    await waitForStencilLifecycle(page);

    const inlineStyle = await page.evaluate(() => {
      const content = document.querySelector('p-accordion').shadowRoot.querySelector('.collapsible') as HTMLElement;
      return content.style.cssText;
    });

    expect(inlineStyle).toMatchInlineSnapshot(`"height: 1.656rem;"`);
  });

  it('should set correct inline content height using MutationObserver and window resize listener', async () => {
    await page.evaluate(() => {
      delete window.ResizeObserver;
    });

    await initAccordion({ otherMarkup: clickHandlerScript });

    const button = await getButton();

    await button.click();
    await waitForStencilLifecycle(page);

    const inlineStyle = await page.evaluate(() => {
      const content = document.querySelector('p-accordion').shadowRoot.querySelector('.collapsible') as HTMLElement;
      return content.style.cssText;
    });

    expect(inlineStyle).toMatchInlineSnapshot(`"height: 1.656rem;"`);
  });

  describe('events', () => {
    beforeEach(async () => await initAddEventListener(page));

    it('should emit accordionChange event on button mouse click', async () => {
      await initAccordion({ otherMarkup: clickHandlerScript });
      let eventCounter = 0;
      const host = await getHost();
      const button = await getButton();
      await addEventListener(host, 'accordionChange', () => eventCounter++);

      expect(eventCounter).toBe(0);

      await button.click();
      await waitForEventSerialization(page);

      expect(eventCounter).toBe(1);
    });

    it('should emit accordionChange event on enter press', async () => {
      await initAccordion({ otherMarkup: clickHandlerScript });
      let eventCounter = 0;
      const host = await getHost();
      await addEventListener(host, 'accordionChange', () => eventCounter++);

      expect(eventCounter).toBe(0);

      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await waitForEventSerialization(page);

      expect(eventCounter).toBe(1);
    });
  });

  describe('focus', () => {
    it('should have focusable content when opened', async () => {
      await initAccordion({ otherMarkup: clickHandlerScript, hasInput: true });
      const button = await getButton();
      const input = await getInput();
      const body = await getBody();

      expect(await hasFocus(page, body)).toBe(true);

      await button.click();
      await waitForStencilLifecycle(page);
      await page.keyboard.press('Tab');

      expect(await hasFocus(page, input)).toBe(true);
    });

    it('should not have focusable content when closed', async () => {
      const otherMarkup = '<a href="#">Some Link</a>';
      await initAccordion({ otherMarkup, hasInput: true });
      const host = await getHost();
      const body = await getBody();
      const link = await selectNode(page, 'a');

      expect(await hasFocus(page, body)).toBe(true);

      await page.keyboard.press('Tab');

      expect(await hasFocus(page, host)).toBe(true);

      await page.keyboard.press('Tab');

      expect(await hasFocus(page, link)).toBe(true);
    });

    it('should lose focus on content when closed', async () => {
      await initAccordion({ otherMarkup: clickHandlerScript, hasInput: true, isOpen: true });
      const host = await getHost();
      const input = await getInput();
      const body = await getBody();

      await page.keyboard.press('Tab');

      expect(await hasFocus(page, host)).toBe(true);

      await page.keyboard.press('Tab');

      expect(await hasFocus(page, input)).toBe(true);

      await setProperty(host, 'open', false);
      await waitForStencilLifecycle(page);

      expect(await hasFocus(page, body)).toBe(true);
    });
  });

  describe('lifecycle', () => {
    it('should work without unnecessary round trips on init', async () => {
      await initAccordion();
      const status = await getLifecycleStatus(page);

      expect(status.componentDidLoad['p-accordion'], 'componentDidLoad: p-accordion').toBe(1);
      expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(1);

      expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
      expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(2);
    });

    it('should work without unnecessary round trips on prop change', async () => {
      await initAccordion();
      const host = await getHost();
      await setProperty(host, 'open', true);
      await waitForStencilLifecycle(page);
      const status = await getLifecycleStatus(page);

      expect(status.componentDidUpdate['p-accordion'], 'componentDidUpdate: p-accordion').toBe(1);
      expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
      expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(2);
    });
  });

  describe('accessibility', () => {
    it('should expose correct initial accessibility tree and aria properties', async () => {
      await initAccordion();
      const button = await getButton();

      await expectA11yToMatchSnapshot(page, button, { message: 'Of Button' });
      expect(await getAttribute(button, 'aria-controls')).toBe('accordion-panel');
    });

    it('should expose correct accessibility tree properties in open state', async () => {
      await initAccordion({ otherMarkup: clickHandlerScript });
      const button = await getButton();
      const panel = await getCollapsible();
      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');
      await waitForStencilLifecycle(page);

      await expectA11yToMatchSnapshot(page, button, { message: 'Of Button' });
      await expectA11yToMatchSnapshot(page, panel, { message: 'Of Panel', interestingOnly: false });
    });
  });
});
