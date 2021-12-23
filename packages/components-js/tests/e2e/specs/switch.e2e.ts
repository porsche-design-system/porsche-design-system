import { Page } from 'puppeteer';
import {
  addEventListener,
  expectA11yToMatchSnapshot,
  expectToSkipFocusOnComponent,
  getActiveElementId,
  getAttribute,
  getLifecycleStatus,
  getProperty,
  hasFocus,
  initAddEventListener,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForEventSerialization,
  waitForStencilLifecycle,
} from '../helpers';

describe('switch', () => {
  let page: Page;
  beforeEach(async () => {
    page = await browser.newPage();
    await initAddEventListener(page);
  });
  afterEach(async () => await page.close());

  const getHost = () => selectNode(page, 'p-switch');
  const getButton = () => selectNode(page, 'p-switch >>> button');
  const getLabel = () => selectNode(page, 'p-switch >>> p-text');

  const clickHandlerScript = `
    <script>
      const switchComponent = document.querySelector('p-switch')
      switchComponent.addEventListener('switchChange', (e) => {
          e.target.checked = e.detail.checked;
      });
    </script>`;

  type InitOptions = {
    isDisabled?: boolean;
    isTabbable?: boolean;
    isLoading?: boolean;
    otherMarkup?: string;
  };

  const initSwitch = (opts?: InitOptions): Promise<void> => {
    const { isDisabled = false, isTabbable = true, isLoading = false, otherMarkup = '' } = opts ?? {};
    return setContentWithDesignSystem(
      page,
      `<p-switch tabbable="${isTabbable}" disabled="${isDisabled}" loading="${isLoading}">Some Label</p-switch>${otherMarkup}`
    );
  };

  describe('label', () => {
    it('should check/uncheck switch on click', async () => {
      await initSwitch({ otherMarkup: clickHandlerScript });
      const host = await getHost();
      const label = await getLabel();

      expect(await getProperty(host, 'checked')).toBeFalsy();

      await label.click();
      await waitForStencilLifecycle(page);

      expect(await getProperty(host, 'checked')).toBeTruthy();
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
      await waitForEventSerialization(page); // 🙈

      expect(eventCounter).toBe(1);
    });

    it('should not trigger event on click if switch is disabled', async () => {
      await initSwitch({ isDisabled: true });

      let eventCounter = 0;
      const host = await getHost();
      const button = await getButton();
      await addEventListener(host, 'switchChange', () => eventCounter++);

      await button.click();
      await waitForEventSerialization(page);

      expect(eventCounter).toBe(0);
    });

    it('should not trigger event on click if switch is loading', async () => {
      await initSwitch({ isLoading: true });

      let eventCounter = 0;
      const host = await getHost();
      const button = await getButton();
      await addEventListener(host, 'switchChange', () => eventCounter++);

      await button.click();
      await waitForEventSerialization(page);
      await host.click();
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

      expect(beforeFocusCalls, 'beforeFocusCalls initially').toBe(0);
      expect(hostFocusCalls, 'buttonFocusCalls initially').toBe(0);
      expect(hostFocusInCalls, 'buttonFocusInCalls initially').toBe(0);
      expect(hostBlurCalls, 'buttonBlurCalls initially').toBe(0);
      expect(hostFocusOutCalls, 'buttonFocusOutCalls initially').toBe(0);
      expect(afterFocusCalls, 'afterFocusCalls initially').toBe(0);
      expect(await getActiveElementId(page), 'activeElementId initially').toBe('');

      await page.keyboard.press('Tab');
      await waitForEventSerialization(page);
      expect(beforeFocusCalls, 'beforeFocusCalls after 1st tab').toBe(1);
      expect(hostFocusCalls, 'buttonFocusCalls after 1st tab').toBe(0);
      expect(hostFocusInCalls, 'buttonFocusInCalls after 1st tab').toBe(0);
      expect(hostBlurCalls, 'buttonBlurCalls after 1st tab').toBe(0);
      expect(hostFocusOutCalls, 'buttonFocusOutCalls after 1st tab').toBe(0);
      expect(afterFocusCalls, 'afterFocusCalls after 1st tab').toBe(0);
      expect(await getActiveElementId(page), 'activeElementId after 1st tab').toBe('before');

      await page.keyboard.press('Tab');
      await waitForEventSerialization(page);
      expect(beforeFocusCalls, 'beforeFocusCalls after 2nd tab').toBe(1);
      expect(hostFocusCalls, 'buttonFocusCalls after 2nd tab').toBe(1);
      expect(hostFocusInCalls, 'buttonFocusInCalls after 2nd tab').toBe(1);
      expect(hostBlurCalls, 'buttonBlurCalls after 2nd tab').toBe(0);
      expect(hostFocusOutCalls, 'buttonFocusOutCalls after 2nd tab').toBe(0);
      expect(afterFocusCalls, 'afterFocusCalls after 2nd tab').toBe(0);
      expect(await getActiveElementId(page), 'activeElementId after 2nd tab').toBe('my-switch');

      await page.keyboard.press('Tab');
      await waitForEventSerialization(page);
      expect(beforeFocusCalls, 'beforeFocusCalls after 3rd tab').toBe(1);
      expect(hostFocusCalls, 'buttonFocusCalls after 3rd tab').toBe(1);
      expect(hostFocusInCalls, 'buttonFocusInCalls after 3rd tab').toBe(1);
      expect(hostBlurCalls, 'buttonBlurCalls after 3rd tab').toBe(1);
      expect(hostFocusOutCalls, 'buttonFocusOutCalls after 3rd tab').toBe(1);
      expect(afterFocusCalls, 'afterFocusCalls after 3rd tab').toBe(1);
      expect(await getActiveElementId(page), 'activeElementId after 3rd tab').toBe('after');

      // tab back
      await page.keyboard.down('ShiftLeft');
      await page.keyboard.press('Tab');
      await waitForEventSerialization(page);
      expect(beforeFocusCalls, 'beforeFocusCalls after 1st tab back').toBe(1);
      expect(hostFocusCalls, 'buttonFocusCalls after 1st tab back').toBe(2);
      expect(hostFocusInCalls, 'buttonFocusInCalls after 1st tab back').toBe(2);
      expect(hostBlurCalls, 'buttonBlurCalls after 1st tab back').toBe(1);
      expect(hostFocusOutCalls, 'buttonFocusOutCalls after 1st tab back').toBe(1);
      expect(afterFocusCalls, 'afterFocusCalls after 1st tab back').toBe(1);
      expect(await getActiveElementId(page), 'activeElementId after 1st tab back').toBe('my-switch');

      await page.keyboard.press('Tab');
      await waitForEventSerialization(page);
      expect(beforeFocusCalls, 'beforeFocusCalls after 2nd tab back').toBe(2);
      expect(hostFocusCalls, 'buttonFocusCalls after 2nd tab back').toBe(2);
      expect(hostFocusInCalls, 'buttonFocusInCalls after 2nd tab back').toBe(2);
      expect(hostBlurCalls, 'buttonBlurCalls after 2nd tab back').toBe(2);
      expect(hostFocusOutCalls, 'buttonFocusOutCalls after 2nd tab back').toBe(2);
      expect(afterFocusCalls, 'afterFocusCalls after 2nd tab back').toBe(1);
      expect(await getActiveElementId(page), 'activeElementId after 2nd tab back').toBe('before');

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

  describe('focus', () => {
    it('should keep focus if state switches to loading', async () => {
      await initSwitch();

      const host = await getHost();
      expect(await hasFocus(page, host)).toBe(false);

      await page.keyboard.press('Tab');

      expect(await hasFocus(page, host), 'after Tab').toBe(true);

      await setProperty(host, 'loading', true);
      await waitForStencilLifecycle(page);

      expect(await hasFocus(page, host), 'focus style on loading').toBe(true);

      await setProperty(host, 'loading', false);
      await waitForStencilLifecycle(page);

      expect(await hasFocus(page, host), 'final focus style').toBe(true);
    });

    it.each(['tabbable="false"', 'tabindex="-1"'])('should be removed from tab order for %s', async (attribute) => {
      await setContentWithDesignSystem(
        page,
        `<div id="wrapper">
         <a href="#" id="before">before</a>
         <p-switch ${attribute}>Some label</p-switch>
         <a href="#" id="after">after</a>
        </div>`
      );

      const host = await getHost();
      const before = await selectNode(page, '#before');
      const after = await selectNode(page, '#after');

      await expectToSkipFocusOnComponent(page, host, before, after);
    });
  });

  describe('lifecycle', () => {
    it('should work without unnecessary round trips on init', async () => {
      await initSwitch();
      const status = await getLifecycleStatus(page);

      expect(status.componentDidLoad['p-switch'], 'componentDidLoad: p-switch').toBe(1);
      expect(status.componentDidLoad['p-text'], 'componentDidLoad: p-text').toBe(1);

      expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(2);
      expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
    });

    it('should work without unnecessary round trips with spinner', async () => {
      await initSwitch({ isLoading: true });
      const status = await getLifecycleStatus(page);

      expect(status.componentDidLoad['p-switch'], 'componentDidLoad: p-switch').toBe(1);
      expect(status.componentDidLoad['p-text'], 'componentDidLoad: p-text').toBe(1);
      expect(status.componentDidLoad['p-spinner'], 'componentDidLoad: p-spinner').toBe(1);

      expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(3);
      expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
    });

    it('should work without unnecessary round trips on prop change', async () => {
      await initSwitch();
      const host = await getHost();

      await setProperty(host, 'checked', true);
      await waitForStencilLifecycle(page);

      const status = await getLifecycleStatus(page);

      expect(status.componentDidUpdate['p-switch'], 'componentDidUpdate: p-switch').toBe(1);

      expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(2);
      expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
    });
  });

  describe('accessibility', () => {
    it('should expose correct initial accessibility tree', async () => {
      await initSwitch();
      const label = () => selectNode(page, 'p-switch >>> label');

      await expectA11yToMatchSnapshot(page, await label(), { interestingOnly: false });
    });

    it('should expose correct accessibility tree if checked value is set programmatically', async () => {
      await initSwitch();

      const host = await getHost();
      const button = await getButton();

      await setProperty(host, 'checked', true);
      await waitForStencilLifecycle(page);

      await expectA11yToMatchSnapshot(page, button, { message: 'Checked' });

      await setProperty(host, 'checked', false);
      await waitForStencilLifecycle(page);

      await expectA11yToMatchSnapshot(page, button, { message: 'Unchecked' });
    });

    it('should add aria-busy when loading is set as Attribute and remove when finished', async () => {
      await initSwitch();

      const host = await getHost();
      const button = await getButton();

      expect(await getAttribute(button, 'aria-busy')).toBeNull();

      await setProperty(host, 'loading', true);
      await waitForStencilLifecycle(page);

      expect(await getAttribute(button, 'aria-busy')).toBe('true');

      await setProperty(host, 'loading', false);
      await waitForStencilLifecycle(page);

      expect(await getAttribute(button, 'aria-busy')).toBeNull();
    });
  });
});
