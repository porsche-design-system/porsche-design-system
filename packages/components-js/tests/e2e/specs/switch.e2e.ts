import { Page } from 'puppeteer';
import {
  addEventListener,
  getActiveElementId,
  getAttribute,
  getBrowser,
  getLifecycleStatus,
  getProperty,
  hasFocus,
  initAddEventListener,
  removeAttribute,
  selectNode,
  setAttribute,
  setContentWithDesignSystem,
  setProperty,
  waitForEventSerialization,
  waitForStencilLifecycle,
} from '../helpers';

describe('switch', () => {
  let page: Page;
  beforeEach(async () => {
    page = await getBrowser().newPage();
    await initAddEventListener(page);
  });
  afterEach(async () => await page.close());

  const tagName = 'p-switch';
  const getHost = () => selectNode(page, tagName);
  const getButton = () => selectNode(page, 'p-switch >>> button');
  const getLabel = () => selectNode(page, 'p-switch >>> p-text');

  const clickHandlerScript = `
    <script>
      const switchComponent = document.querySelector('p-switch')
      switchComponent.addEventListener('switchChange', (switchChangeEvent) => {
          const { checked } = switchChangeEvent.detail;
          switchChangeEvent.target.setAttribute('checked', checked);
      });
    </script>`;

  type InitOptions = {
    disabled?: boolean;
    tabbable?: boolean;
    loading?: boolean;
    otherMarkup?: string;
  };

  const initSwitch = (opts?: InitOptions): Promise<void> => {
    const { disabled = false, tabbable = true, loading = false, otherMarkup = '' } = opts ?? {};
    return setContentWithDesignSystem(
      page,
      `<p-switch tabbable="${tabbable}" disabled="${disabled}" loading="${loading}">Some Label</p-switch>${otherMarkup}`
    );
  };

  describe('label', () => {
    it('should check/uncheck switch on click', async () => {
      await initSwitch({ otherMarkup: clickHandlerScript });
      const host = await getHost();
      const label = await getLabel();

      expect(await getProperty(host, 'checked')).toBeFalse();

      await label.click();
      await waitForStencilLifecycle(page);

      expect(await getProperty(host, 'checked')).toBeTrue();
    });
  });

  describe('accessibility', () => {
    it('should set correct aria-checked value', async () => {
      await initSwitch();

      const host = await getHost();
      const button = await getButton();

      expect(await getAttribute(button, 'aria-checked')).toBe('false');

      await setAttribute(host, 'checked', 'true');
      await waitForStencilLifecycle(page);

      expect(await getAttribute(button, 'aria-checked')).toBe('true');

      await removeAttribute(host, 'checked');
      await waitForStencilLifecycle(page);

      expect(await getAttribute(button, 'aria-checked')).toBe('false');
    });

    it('should add aria-busy when loading is set as Attribute and remove when finished', async () => {
      await initSwitch();

      const host = await getHost();
      const button = await getButton();

      expect(await getAttribute(button, 'aria-busy')).toBeNull();

      await setAttribute(host, 'loading', 'true');
      await waitForStencilLifecycle(page);

      expect(await getAttribute(button, 'aria-busy')).toBe('true');

      await setAttribute(host, 'loading', 'false');
      await waitForStencilLifecycle(page);

      expect(await getAttribute(button, 'aria-busy')).toBeNull();
    });

    it('should be removed from tab order for tabbable false', async () => {
      await setContentWithDesignSystem(
        page,
        `<div id="wrapper">
 <a href="#" id="before">before</a>
 <p-switch tabbable="false">Some label</p-switch>
 <a href="#" id="after">after</a>
</div>`
      );

      const host = await getHost();
      const before = await selectNode(page, '#before');
      const after = await selectNode(page, '#after');

      await before.focus();

      let hostFocusCalls = 0;
      await addEventListener(host, 'focus', () => hostFocusCalls++);
      let afterFocusCalls = 0;
      await addEventListener(after, 'focus', () => afterFocusCalls++);

      await page.keyboard.press('Tab');
      await waitForEventSerialization(page);
      expect(hostFocusCalls).toBe(0, 'hostFocusCalls after tab');
      expect(afterFocusCalls).toBe(1, 'afterFocusCalls after tab');

      await page.keyboard.press('Tab');
      await waitForEventSerialization(page);
      expect(hostFocusCalls).toBe(0, 'hostFocusCalls after second tab');
      expect(afterFocusCalls).toBe(1, 'afterFocusCalls after second tab');
    });
  });

  describe('events', () => {
    it('should trigger event on click', async () => {
      await initSwitch();

      let eventCounter = 0;
      const host = await getHost();
      const button = await getButton();
      await addEventListener(host, 'switchChange', () => eventCounter++);

      await button.click();
      await waitForEventSerialization(page);

      expect(eventCounter).toBe(1);
    });

    it('should not trigger event on click if switch is disabled', async () => {
      await initSwitch({ disabled: true });

      let eventCounter = 0;
      const host = await getHost();
      const button = await getButton();
      await addEventListener(host, 'switchChange', () => eventCounter++);

      await button.click();
      await waitForEventSerialization(page);

      expect(eventCounter).toBe(0);
    });

    it('should dispatch correct click events', async () => {
      await setContentWithDesignSystem(page, `<div><p-switch id="hostElement">Some label</p-switch></div>`);

      const wrapper = await selectNode(page, 'div');
      const host = await getHost();
      const button = await getButton();

      const events = [];
      await addEventListener(wrapper, 'click', (ev) => events.push(ev));

      await button.click();
      await host.click();
      await waitForEventSerialization(page);

      expect(events.length).toBe(2);
      for (const event of events) {
        expect(event.target.id).toBe('hostElement');
      }
    });

    it('should trigger focus & blur events at the correct time', async () => {
      await setContentWithDesignSystem(
        page,
        `<div id="wrapper">
 <a href="#" id="before">before</a>
 <p-switch id="my-switch">Some label</p-switch>
 <a href="#" id="after">after</a>
</div>`
      );

      const host = await getHost();
      const before = await selectNode(page, '#before');
      const after = await selectNode(page, '#after');

      let beforeFocusCalls = 0;
      await addEventListener(before, 'focus', () => beforeFocusCalls++);
      let hostFocusCalls = 0;
      await addEventListener(host, 'focus', () => hostFocusCalls++);
      let hostFocusInCalls = 0;
      await addEventListener(host, 'focusin', () => hostFocusInCalls++);
      let hostBlurCalls = 0;
      await addEventListener(host, 'blur', () => hostBlurCalls++);
      let hostFocusOutCalls = 0;
      await addEventListener(host, 'focusout', () => hostFocusOutCalls++);
      let afterFocusCalls = 0;
      await addEventListener(after, 'focus', () => afterFocusCalls++);

      expect(beforeFocusCalls).toBe(0, 'beforeFocusCalls initially');
      expect(hostFocusCalls).toBe(0, 'buttonFocusCalls initially');
      expect(hostFocusInCalls).toBe(0, 'buttonFocusInCalls initially');
      expect(hostBlurCalls).toBe(0, 'buttonBlurCalls initially');
      expect(hostFocusOutCalls).toBe(0, 'buttonFocusOutCalls initially');
      expect(afterFocusCalls).toBe(0, 'afterFocusCalls initially');
      expect(await getActiveElementId(page)).toBe('', 'activeElementId initially');

      await page.keyboard.press('Tab');
      await waitForEventSerialization(page);
      expect(beforeFocusCalls).toBe(1, 'beforeFocusCalls after 1st tab');
      expect(hostFocusCalls).toBe(0, 'buttonFocusCalls after 1st tab');
      expect(hostFocusInCalls).toBe(0, 'buttonFocusInCalls after 1st tab');
      expect(hostBlurCalls).toBe(0, 'buttonBlurCalls after 1st tab');
      expect(hostFocusOutCalls).toBe(0, 'buttonFocusOutCalls after 1st tab');
      expect(afterFocusCalls).toBe(0, 'afterFocusCalls after 1st tab');
      expect(await getActiveElementId(page)).toBe('before', 'activeElementId after 1st tab');

      await page.keyboard.press('Tab');
      await waitForEventSerialization(page);
      expect(beforeFocusCalls).toBe(1, 'beforeFocusCalls after 2nd tab');
      expect(hostFocusCalls).toBe(1, 'buttonFocusCalls after 2nd tab');
      expect(hostFocusInCalls).toBe(1, 'buttonFocusInCalls after 2nd tab');
      expect(hostBlurCalls).toBe(0, 'buttonBlurCalls after 2nd tab');
      expect(hostFocusOutCalls).toBe(0, 'buttonFocusOutCalls after 2nd tab');
      expect(afterFocusCalls).toBe(0, 'afterFocusCalls after 2nd tab');
      expect(await getActiveElementId(page)).toBe('my-switch', 'activeElementId after 2nd tab');

      await page.keyboard.press('Tab');
      await waitForEventSerialization(page);
      expect(beforeFocusCalls).toBe(1, 'beforeFocusCalls after 3rd tab');
      expect(hostFocusCalls).toBe(1, 'buttonFocusCalls after 3rd tab');
      expect(hostFocusInCalls).toBe(1, 'buttonFocusInCalls after 3rd tab');
      expect(hostBlurCalls).toBe(1, 'buttonBlurCalls after 3rd tab');
      expect(hostFocusOutCalls).toBe(1, 'buttonFocusOutCalls after 3rd tab');
      expect(afterFocusCalls).toBe(1, 'afterFocusCalls after 3rd tab');
      expect(await getActiveElementId(page)).toBe('after', 'activeElementId after 3rd tab');

      // tab back
      await page.keyboard.down('ShiftLeft');
      await page.keyboard.press('Tab');
      await waitForEventSerialization(page);
      expect(beforeFocusCalls).toBe(1, 'beforeFocusCalls after 1st tab back');
      expect(hostFocusCalls).toBe(2, 'buttonFocusCalls after 1st tab back');
      expect(hostFocusInCalls).toBe(2, 'buttonFocusInCalls after 1st tab back');
      expect(hostBlurCalls).toBe(1, 'buttonBlurCalls after 1st tab back');
      expect(hostFocusOutCalls).toBe(1, 'buttonFocusOutCalls after 1st tab back');
      expect(afterFocusCalls).toBe(1, 'afterFocusCalls after 1st tab back');
      expect(await getActiveElementId(page)).toBe('my-switch', 'activeElementId after 1st tab back');

      await page.keyboard.press('Tab');
      await waitForEventSerialization(page);
      expect(beforeFocusCalls).toBe(2, 'beforeFocusCalls after 2nd tab back');
      expect(hostFocusCalls).toBe(2, 'buttonFocusCalls after 2nd tab back');
      expect(hostFocusInCalls).toBe(2, 'buttonFocusInCalls after 2nd tab back');
      expect(hostBlurCalls).toBe(2, 'buttonBlurCalls after 2nd tab back');
      expect(hostFocusOutCalls).toBe(2, 'buttonFocusOutCalls after 2nd tab back');
      expect(afterFocusCalls).toBe(1, 'afterFocusCalls after 2nd tab back');
      expect(await getActiveElementId(page)).toBe('before', 'activeElementId after 2nd tab back');

      await page.keyboard.up('ShiftLeft');
    });

    it('should provide functionality to focus & blur the custom element', async () => {
      await setContentWithDesignSystem(
        page,
        `<div id="wrapper">
 <a href="#" id="before">before</a>
 <p-switch>Some label</p-switch>
</div>`
      );

      const host = await getHost();
      const before = await selectNode(page, '#before');
      await before.focus();
      expect(await hasFocus(page, host)).toBe(false);
      await host.focus();
      expect(await hasFocus(page, host)).toBe(true);
      // Cant use ElementHandle 'host' because .blur() is not available
      await page.evaluate(() => {
        const switchElement = document.querySelector('p-switch') as HTMLElement;
        switchElement.blur();
      });
      expect(await hasFocus(page, host)).toBe(false);
    });
  });

  describe('lifecycle', () => {
    it('should work without unnecessary round trips on init', async () => {
      await initSwitch();
      const status = await getLifecycleStatus(page);

      expect(status.componentDidLoad['p-switch']).toBe(1, 'componentDidLoad: p-switch');
      expect(status.componentDidLoad['p-text']).toBe(1, 'componentDidLoad: p-text');

      expect(status.componentDidLoad.all).toBe(2, 'componentDidLoad: all');
      expect(status.componentDidUpdate.all).toBe(0, 'componentDidUpdate: all');
    });

    it('should work without unnecessary round trips with spinner', async () => {
      await initSwitch({ loading: true });
      const status = await getLifecycleStatus(page);

      expect(status.componentDidLoad['p-switch']).toBe(1, 'componentDidLoad: p-switch');
      expect(status.componentDidLoad['p-text']).toBe(1, 'componentDidLoad: p-text');
      expect(status.componentDidLoad['p-spinner']).toBe(1, 'componentDidLoad: p-spinner');

      expect(status.componentDidLoad.all).toBe(3, 'componentDidLoad: all');
      expect(status.componentDidUpdate.all).toBe(0, 'componentDidUpdate: all');
    });

    it('should work without unnecessary round trips on prop change', async () => {
      await initSwitch();
      const host = await getHost();

      await setAttribute(host, 'checked', 'true');
      await waitForStencilLifecycle(page);

      const status = await getLifecycleStatus(page);

      expect(status.componentDidUpdate['p-switch']).toBe(1, 'componentDidUpdate: p-switch');

      expect(status.componentDidLoad.all).toBe(2, 'componentDidLoad: all');
      expect(status.componentDidUpdate.all).toBe(1, 'componentDidUpdate: all');
    });
  });
});
