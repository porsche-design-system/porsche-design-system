import { Page } from 'puppeteer';
import {
  getAttribute,
  getBrowser,
  selectNode,
  setAttribute,
  setContentWithDesignSystem,
  waitForStencilLifecycle,
} from '../helpers';
import { FormState } from '@porsche-design-system/components/src/types';

describe('grid', () => {
  let page: Page;
  beforeEach(async () => (page = await getBrowser().newPage()));
  afterEach(async () => await page.close());

  type InitOptions = {
    state?: FormState;
  };

  const initFieldset = async (opts?: InitOptions) => {
    const { state = 'none' } = opts;

    await setContentWithDesignSystem(
      page,
      `<p-fieldset-wrapper state="${state}" message="Some Message"></p-fieldset-wrapper>`
    );
  };

  const getFieldset = () => selectNode(page, 'p-fieldset-wrapper');
  const getMessage = () => selectNode(page, 'p-fieldset-wrapper >>> .message');

  describe('message', () => {
    it('should have role alert if initialized with state error', async () => {
      await initFieldset({ state: 'error' });
      const message = await getMessage();

      expect(await getAttribute(message, 'role')).toBe('alert');
    });

    it('should have role alert if state changes to error', async () => {
      await initFieldset();

      const host = await getFieldset();
      const message = await getMessage();

      expect(await getAttribute(message, 'role')).toBe('none');

      await setAttribute(host, 'state', 'error');
      await waitForStencilLifecycle(page);

      expect(await getAttribute(message, 'role')).toBe('alert');
    });
  });
});
