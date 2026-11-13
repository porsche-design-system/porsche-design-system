import { expect, test } from '@playwright/test';
import type { Page } from 'playwright';
import { getLifecycleStatus, setContentWithDesignSystem, setProperty, waitForStencilLifecycle } from '../helpers';

const initFieldset = async (page: Page): Promise<void> => {
  await setContentWithDesignSystem(page, `<p-fieldset label="Some label"></p-fieldset>`);
};

const getHost = (page: Page) => page.locator('p-fieldset');

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initFieldset(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-fieldset'], 'componentDidLoad: p-fieldset').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  test('should work without unnecessary round trips after state change', async ({ page }) => {
    await initFieldset(page);
    const host = getHost(page);

    await setProperty(host, 'label', 'Other label');
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-fieldset'], 'componentDidUpdate: p-fieldset').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });
});
