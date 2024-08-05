import type { Page } from 'playwright';
import { expect, test } from '@playwright/test';
import { getLifecycleStatus, setContentWithDesignSystem, setProperty, waitForStencilLifecycle } from '../helpers';
import type { IconName } from '@porsche-design-system/components';

type InitOptions = {
  name?: IconName;
};

const initOptions: InitOptions[] = [{}];

const initIcon = async (page: Page, opts?: InitOptions): Promise<void> => {
  const { name } = opts || {};

  const nameAttribute = name ? `name="${name}"` : '';
  const attributes = `${nameAttribute}`;

  const content = `<p-icon ${attributes} aria="{ 'aria-label': 'Some label' }" />`;

  await setContentWithDesignSystem(page, content);
};

const getHost = (page: Page) => page.locator('p-icon');

test.describe('lifecycle', () => {
  for (const opts of initOptions) {
    test('should work without unnecessary round trips on init', async ({ page }) => {
      await initIcon(page, opts);
      const status = await getLifecycleStatus(page);

      expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(1);

      expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
      expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
    });

    test('should work without unnecessary round trips after state change', async ({ page }) => {
      await initIcon(page, { ...opts, name: 'highway' });
      const host = getHost(page);

      await setProperty(host, 'name', 'car');
      await waitForStencilLifecycle(page);
      const status = await getLifecycleStatus(page);

      expect(status.componentDidUpdate['p-icon'], 'componentDidUpdate: p-icon').toBe(1);

      expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
      expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
    });
  }
});
