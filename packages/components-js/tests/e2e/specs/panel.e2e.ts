import { Page } from 'puppeteer';
import {
  addEventListener,
  expectedStyleOnFocus,
  getBrowser,
  getLifecycleStatus,
  getOutlineStyle,
  getProperty,
  hasFocus,
  initAddEventListener,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForEventSerialization,
  waitForStencilLifecycle,
} from '../helpers';
import { HeadlineTag } from '@porsche-design-system/components/src/components/basic/typography/headline/headline-utils';

describe('panel', () => {
  let page: Page;
  beforeEach(async () => (page = await getBrowser().newPage()));
  afterEach(async () => await page.close());

  type InitOptions = {
    tag?: HeadlineTag;
    otherMarkup?: string;
    hasInput?: boolean;
  };

  const clickHandlerScript = `
    <script>
      const panel = document.querySelector('p-panel')
      panel.addEventListener('panelChange', (panelChangeEvent) => {
          const { open } = panelChangeEvent.detail;
          panelChangeEvent.target.setAttribute('open', open);
      });
    </script>`;

  const initPanel = async (opts?: InitOptions) => {
    const { tag, otherMarkup, hasInput } = opts ?? {};

    const content = `<p-panel headline="Some Panel" tag="${tag}">
  <p>
    Test content Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
    ut labore et dolore magna aliquyam erat, sed diam voluptua.
  </p>${hasInput ? '<input type="text"/>' : ''}
</p-panel>${otherMarkup}`;

    await setContentWithDesignSystem(page, content);
  };

  const getHost = () => selectNode(page, 'p-panel');
  const getHeadline = () => selectNode(page, 'p-panel >>> p-headline');
  const getButton = () => selectNode(page, 'p-panel >>> button');
  const getIcon = () => selectNode(page, 'p-panel >>> p-icon');
  const getInput = () => selectNode(page, 'input');

  describe('events', () => {
    beforeEach(async () => await initAddEventListener(page));

    it('should emit panelChange event on headline mouse click', async () => {
      await initPanel({ otherMarkup: clickHandlerScript });
      let eventCounter = 0;
      const host = await getHost();
      const headline = await getHeadline();
      await addEventListener(host, 'panelChange', () => eventCounter++);

      expect(eventCounter).toBe(0);

      await headline.click();
      await waitForEventSerialization(page);

      expect(eventCounter).toBe(1);
    });

    it('should emit panelChange event on button mouse click', async () => {
      await initPanel({ otherMarkup: clickHandlerScript });
      let eventCounter = 0;
      const host = await getHost();
      const button = await getButton();
      await addEventListener(host, 'panelChange', () => eventCounter++);

      expect(eventCounter).toBe(0);

      await button.click();
      await waitForEventSerialization(page);

      expect(eventCounter).toBe(1);
    });

    it('should emit panelChange event on enter press', async () => {
      await initPanel({ otherMarkup: clickHandlerScript });
      let eventCounter = 0;
      const host = await getHost();
      await addEventListener(host, 'panelChange', () => eventCounter++);

      expect(eventCounter).toBe(0);

      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');

      expect(eventCounter).toBe(1);
    });
  });

  describe('focus', () => {
    it('should not have focus on click', async () => {
      await initPanel({ otherMarkup: clickHandlerScript });
      const button = await getButton();
      const hidden = expectedStyleOnFocus({ color: 'transparent', offset: '1px' });
      const visible = expectedStyleOnFocus({ color: 'default', offset: '1px' });

      expect(await getOutlineStyle(button))
        .withContext('before click')
        .toBe(hidden);

      await button.click();
      await waitForStencilLifecycle(page);

      expect(await getOutlineStyle(button))
        .withContext('after click')
        .toBe(hidden);

      await page.keyboard.press('Tab');
      await page.keyboard.down('ShiftLeft');
      await page.keyboard.press('Tab');
      await page.keyboard.up('ShiftLeft');

      expect(await getOutlineStyle(button))
        .withContext('after Tab')
        .toBe(visible);
    });

    it('should have focusable content when opened', async () => {
      await initPanel({ otherMarkup: clickHandlerScript, hasInput: true });
      const button = await getButton();
      const input = await getInput();

      expect(await hasFocus(page, input)).toBe(false);

      await button.click();
      await waitForStencilLifecycle(page);
      await page.keyboard.press('Tab');

      expect(await hasFocus(page, input)).toBe(true);
    });

    it('should not have focusable content when closed', async () => {
      await initPanel({ otherMarkup: clickHandlerScript, hasInput: true });
      const input = await getInput();

      expect(await hasFocus(page, input)).toBe(false);

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      expect(await hasFocus(page, input)).toBe(false);
    });
  });

  describe('accessibility', () => {
    it('should have correct icon aria-label name on open / close', async () => {
      await initPanel({ otherMarkup: clickHandlerScript });
      const button = await getButton();
      const icon = await getIcon();

      expect(await getProperty(icon, 'ariaLabel')).toBe('Open icon');

      await button.click();
      await waitForStencilLifecycle(page);

      expect(await getProperty(icon, 'ariaLabel')).toBe('Close icon');
    });
  });

  describe('lifecycle', () => {
    it('should work without unnecessary round trips on init', async () => {
      await initPanel();
      const status = await getLifecycleStatus(page);

      expect(status.componentDidLoad['p-panel']).withContext('componentDidLoad: p-panel').toBe(1);
      expect(status.componentDidLoad['p-headline']).withContext('componentDidLoad: p-headline').toBe(1);
      expect(status.componentDidLoad['p-text']).withContext('componentDidLoad: p-text').toBe(1);
      expect(status.componentDidLoad['p-icon']).withContext('componentDidLoad: p-icon').toBe(1);

      expect(status.componentDidUpdate.all).withContext('componentDidUpdate: all').toBe(0);
      expect(status.componentDidLoad.all).withContext('componentDidLoad: all').toBe(4);
    });

    it('should work without unnecessary round trips on prop change', async () => {
      await initPanel();
      const host = await getHost();
      await setProperty(host, 'open', true);
      await waitForStencilLifecycle(page);
      const status = await getLifecycleStatus(page);

      expect(status.componentDidUpdate['p-panel']).withContext('componentDidUpdate: p-panel').toBe(1);
      expect(status.componentDidUpdate.all).withContext('componentDidUpdate: all').toBe(1);
      expect(status.componentDidLoad.all).withContext('componentDidLoad: all').toBe(4);
    });
  });
});
