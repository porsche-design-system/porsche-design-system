import { expect, test } from '@playwright/test';
import type { Page } from 'playwright';
import { getLifecycleStatus, setContentWithDesignSystem, setProperty, waitForStencilLifecycle } from '../helpers';

const initDivider = async (page: Page): Promise<void> => {
  await setContentWithDesignSystem(page, `<p-divider></p-divider>`);
};

const getHost = (page: Page) => page.locator('p-divider');

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initDivider(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-divider'], 'componentDidLoad: p-divider').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  test('should work without unnecessary round trips after state change', async ({ page }) => {
    await initDivider(page);
    const host = getHost(page);

    await setProperty(host, 'direction', 'vertical');
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-divider'], 'componentDidUpdate: p-divider').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });
});
