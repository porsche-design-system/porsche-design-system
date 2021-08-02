import { Page } from 'puppeteer';
import {
  getAttribute,
  getBrowser,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';
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

  describe('message', () => {
    it('should have role alert if initialized with state error', async () => {
      await initFieldset({ state: 'error' });
      const message = await getMessage();

      expect(await getAttribute(message, 'role')).toBe('alert');
    });

    it('should have role alert if state changes to error', async () => {
      await initFieldset();

      const host = await getHost();

      await setProperty(host, 'state', 'error');
      await waitForStencilLifecycle(page);

      expect(await getAttribute(await getMessage(), 'role')).toBe('alert');
    });
  });
});
