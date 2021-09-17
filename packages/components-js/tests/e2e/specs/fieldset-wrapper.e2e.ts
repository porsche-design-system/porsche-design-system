import { Page } from 'puppeteer';
import { getBrowser, selectNode, setContentWithDesignSystem, setProperty, waitForStencilLifecycle } from '../helpers';
import { FormState } from '@porsche-design-system/components/src/types';

describe('fieldset-wrapper', () => {
  let page: Page;
  beforeEach(async () => (page = await getBrowser().newPage()));
  afterEach(async () => await page.close());

  type InitOptions = {
    state?: FormState;
  };

  const initFieldset = async (opts?: InitOptions) => {
    const { state = 'none' } = opts ?? {};

    await setContentWithDesignSystem(
      page,
      `<p-fieldset-wrapper state="${state}" message="Some Message"></p-fieldset-wrapper>`
    );
  };

  const getHost = () => selectNode(page, 'p-fieldset-wrapper');
  const getMessage = () => selectNode(page, 'p-fieldset-wrapper >>> .message');

  describe('accessibility', () => {
    it('should expose correct accessibility tree property in error state', async () => {
      await initFieldset({ state: 'error' });
      const message = await getMessage();
      const snapshotMessage = await page.accessibility.snapshot({
        interestingOnly: false,
        root: message,
      });

      expect(snapshotMessage.role).toBe('alert');
    });

    it('should change accessibility tree property if state added programmatically', async () => {
      await initFieldset();
      const host = await getHost();

      await setProperty(host, 'state', 'error');
      await waitForStencilLifecycle(page);

      const message = await getMessage();
      const snapshotMessage = await page.accessibility.snapshot({
        interestingOnly: false,
        root: message,
      });

      expect(snapshotMessage.role).toBe('alert');
    });
  });
});
