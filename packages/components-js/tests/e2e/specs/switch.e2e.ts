import { Page } from 'puppeteer';
import {
  addEventListener,
  getActiveElementTagName,
  getAttribute,
  getBrowser,
  getLifecycleStatus,
  getProperty,
  initAddEventListener,
  selectNode,
  setAttribute,
  setContentWithDesignSystem,
  waitForStencilLifecycle,
} from '../helpers';

describe('switch', () => {
  let page: Page;
  beforeEach(async () => (page = await getBrowser().newPage()));
  afterEach(async () => await page.close());

  const tagName = 'p-switch';
  const getHost = () => selectNode(page, tagName);
  const getButton = () => selectNode(page, 'p-switch >>> button');
  const getLabel = () => selectNode(page, 'p-switch >>> p-text');

  const clickHandlerScript = `
    <script>
      const switchComponent = document.querySelector('switch')
      switchComponent.addEventListener('switchChange', (switchChangeEvent) => {
          const { checked } = switchChangeEvent.detail;
          switchChangeEvent.target.setAttribute('checked', checked);
      });
    </script>`;

  type InitOptions = {
    disabled?: boolean;
    tabbable?: boolean;
    otherMarkup?: string;
  };

  const initSwitch = (opts?: InitOptions): Promise<void> => {
    const { disabled = false, tabbable = true, otherMarkup = '' } = opts ?? {};
    return setContentWithDesignSystem(
      page,
      `<p-switch label="Some label" tabbable="${tabbable}" disabled="${disabled}"></p-switch>${otherMarkup}`
    );
  };

  describe('label', () => {
    it('should check/uncheck switch on label click', async () => {
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
    });

    it('should set correct aria-busy value', async () => {
      await initSwitch();

      const host = await getHost();
      const button = await getButton();

      expect(await getAttribute(button, 'aria-busy')).toBeNull();

      await setAttribute(host, 'loading', 'true');
      await waitForStencilLifecycle(page);

      expect(await getAttribute(button, 'aria-busy')).toBe('true');
    });

    it('should not be active element if tabbable is set to false', async () => {
      await initSwitch({ tabbable: false });
      await page.keyboard.press('Tab');

      expect(await getActiveElementTagName(page)).not.toBe(tagName);
    });
  });

  describe('events', () => {
    beforeEach(async () => await initAddEventListener(page));

    it('should trigger event on click', async () => {
      await initSwitch({ otherMarkup: clickHandlerScript });

      let eventCounter = 0;
      const host = await getHost();
      const button = await getButton();
      await addEventListener(host, 'switchChange', () => eventCounter++);

      await button.click();
      await waitForStencilLifecycle(page);

      expect(eventCounter).toBe(1);
    });

    it('should not trigger event on click if switch is disabled', async () => {
      await initSwitch({ disabled: true, otherMarkup: clickHandlerScript });

      let eventCounter = 0;
      const host = await getHost();
      const button = await getButton();
      await addEventListener(host, 'switchChange', () => eventCounter++);

      await button.click();
      await waitForStencilLifecycle(page);

      expect(eventCounter).toBe(0);
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
