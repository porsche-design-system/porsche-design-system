import { expect, test } from '@playwright/test';
import type { Page } from 'playwright';
import { getLifecycleStatus, setContentWithDesignSystem, setProperty, waitForStencilLifecycle } from '../helpers';

const initCanvas = async (page: Page): Promise<void> => {
  await setContentWithDesignSystem(page, `<p-canvas><span slot="title">App name</span></p-canvas>`);
};

const getHost = (page: Page) => page.locator('p-canvas');

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initCanvas(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-canvas'], 'componentDidLoad: p-canvas').toBe(1);
    expect(status.componentDidLoad['p-button'], 'componentDidLoad: p-button').toBe(2);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(2);
    expect(status.componentDidLoad['p-crest'], 'componentDidLoad: p-crest').toBe(1);
    expect(status.componentDidLoad['p-wordmark'], 'componentDidLoad: p-wordmark').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(7);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  test('should work without unnecessary round trips after state change', async ({ page }) => {
    await initCanvas(page);
    const host = getHost(page);

    await setProperty(host, 'sidebarStartOpen', true);
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-canvas'], 'componentDidUpdate: p-canvas').toBe(1);
    expect(status.componentDidUpdate['p-button'], 'componentDidUpdate: p-button').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(7);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(2);
  });
});
