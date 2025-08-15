import { expect, test } from '@playwright/test';
import type { FlagName } from '@porsche-design-system/components';
import type { Page } from 'playwright';
import { getLifecycleStatus, setContentWithDesignSystem, setProperty, waitForStencilLifecycle } from '../helpers';

type InitOptions = {
  name?: FlagName;
};

const initOptions: InitOptions[] = [{}];

const initFlag = async (page: Page, opts?: InitOptions): Promise<void> => {
  const { name } = opts || {};

  const nameAttribute = name ? `name="${name}"` : '';
  const attributes = `${nameAttribute}`;

  const content = `<p-flag ${attributes} aria="{ 'aria-label': 'Some label' }" />`;

  await setContentWithDesignSystem(page, content);
};

const getHost = (page: Page) => page.locator('p-flag');

test.describe('lifecycle', () => {
  for (const opts of initOptions) {
    test('should work without unnecessary round trips on init', async ({ page }) => {
      await initFlag(page, opts);
      const status = await getLifecycleStatus(page);

      expect(status.componentDidLoad['p-flag'], 'componentDidLoad: p-flag').toBe(1);

      expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
      expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
    });

    test('should work without unnecessary round trips after state change', async ({ page }) => {
      await initFlag(page, { ...opts, name: 'us' });
      const host = getHost(page);

      await setProperty(host, 'name', 'gb');
      await waitForStencilLifecycle(page);
      const status = await getLifecycleStatus(page);

      expect(status.componentDidUpdate['p-flag'], 'componentDidUpdate: p-flag').toBe(1);

      expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
      expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
    });
  }
});
