import { expect, test } from '@playwright/test';
import type { Page } from 'playwright';
import { getLifecycleStatus, setContentWithDesignSystem, setProperty, waitForStencilLifecycle } from '../helpers';

const initSpinner = async (page: Page): Promise<void> => {
  await setContentWithDesignSystem(page, `<p-spinner aria="{ 'aria-label': 'Loading page content' }"></p-spinner>`);
};

const getHost = (page: Page) => page.locator('p-spinner');

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initSpinner(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-spinner'], 'componentDidLoad: p-spinner').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  test('should work without unnecessary round trips after state change', async ({ page }) => {
    await initSpinner(page);
    const host = getHost(page);

    await setProperty(host, 'size', 'lg');
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-spinner'], 'componentDidUpdate: p-spinner').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });
});
