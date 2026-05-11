import { expect, test } from '@playwright/test';
import type { Page } from 'playwright';
import { getLifecycleStatus, setContentWithDesignSystem, setProperty, waitForStencilLifecycle } from '../helpers';

type InitOpts = {
  withIcon?: boolean;
  variant?: string;
};

const initTag = (page: Page, props?: InitOpts) => {
  const { withIcon = false, variant } = props || {};
  const iconAttr = withIcon ? ' icon="car"' : '';
  const variantAttr = variant ? ` variant="${variant}"` : '';

  const content = `<p-tag${iconAttr}${variantAttr}>Some Tag</p-tag>`;

  return setContentWithDesignSystem(page, content);
};

const getHost = (page: Page) => page.locator('p-tag');
const getSpan = (page: Page) => page.locator('p-tag span');

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initTag(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-tag'], 'componentDidLoad: p-tag').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  test('should work without unnecessary round trips on prop change', async ({ page }) => {
    await initTag(page, { withIcon: true });
    const host = getHost(page);

    await setProperty(host, 'icon', 'highway');
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-tag'], 'componentDidUpdate: p-tag').toBe(1);
    expect(status.componentDidUpdate['p-icon'], 'componentDidUpdate: p-icon').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(2);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(2);
  });

  test('should work without unnecessary round trips on variant prop change', async ({ page }) => {
    await initTag(page, { variant: 'primary' });
    const host = getHost(page);

    await setProperty(host, 'variant', 'error');
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-tag'], 'componentDidUpdate: p-tag').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });
});
