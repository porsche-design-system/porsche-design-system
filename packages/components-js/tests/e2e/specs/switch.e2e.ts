import { Page } from 'puppeteer';
import {
  getAttribute,
  getBrowser,
  getLifecycleStatus,
  selectNode,
  setAttribute,
  setContentWithDesignSystem,
  waitForStencilLifecycle,
} from '../helpers';
import { TabSize } from '@porsche-design-system/components/dist/types/components/navigation/tabs-bar/tabs-bar-utils';

describe('switch', () => {
  let page: Page;
  beforeEach(async () => (page = await getBrowser().newPage()));
  afterEach(async () => await page.close());

  const getHost = () => selectNode(page, 'p-switch');

  const clickHandlerScript = `
    <script>
      const switchComponent = document.querySelector('switch')
      switchComponent.addEventListener('switchChange', (switchChangeEvent) => {
          const { checked } = switchChangeEvent.detail;
          switchChangeEvent.target.setAttribute('checked', checked);
      });
    </script>`;

  type InitOptions = {
    otherMarkup?: string;
  };

  const initSwitch = (opts?: InitOptions): Promise<void> => {
    const { otherMarkup = '' } = opts && {};
    return setContentWithDesignSystem(page, `<p-switch label="Some label"></p-switch>${otherMarkup}`);
  };

  describe('accessibility', () => {
    it('should set correct aria-checked value', async () => {});
  });

  describe('event', () => {
    it('should trigger event on switch click', async () => {});
    it('should not trigger event if switch is disabled', async () => {});
    it('should change checked value switch click ', async () => {
      await initSwitch({ otherMarkup: clickHandlerScript });
      const host = await getHost();

      expect(await getAttribute(host, 'checked')).toBeFalse();

      await host.click();
      await waitForStencilLifecycle(page);

      expect(await getAttribute(host, 'checked')).toBeTrue();
    });
  });

  describe('lifecycle', () => {
    it('should work without unnecessary round trips on init', async () => {
      await initSwitch();
      const status = await getLifecycleStatus(page);

      expect(status.componentDidLoad['p-tabs-bar']).toBe(1, 'componentDidLoad: p-switch');
      expect(status.componentDidLoad['p-text']).toBe(1, 'componentDidLoad: p-text');

      expect(status.componentDidLoad.all).toBe(2, 'componentDidLoad: all');
      expect(status.componentDidUpdate.all).toBe(0, 'componentDidUpdate: all');
    });

    it('should work without unnecessary round trips on prop change', async () => {
      await initSwitch();
      const host = await getHost();

      await setAttribute(host, 'active-tab-index', '2');
      await waitForStencilLifecycle(page);

      const status = await getLifecycleStatus(page);

      expect(status.componentDidUpdate['p-switch']).toBe(1, 'componentDidUpdate: p-switch');

      expect(status.componentDidLoad.all).toBe(2, 'componentDidLoad: all');
      expect(status.componentDidUpdate.all).toBe(1, 'componentDidUpdate: all');
    });
  });
});
