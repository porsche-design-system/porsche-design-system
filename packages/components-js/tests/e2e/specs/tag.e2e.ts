import { expect, test } from '@playwright/test';
import type { Page } from 'playwright';
import { getLifecycleStatus, setContentWithDesignSystem, setProperty, waitForStencilLifecycle } from '../helpers';

type InitOpts = {
  withIcon?: boolean;
};

const initTag = (page: Page, props?: InitOpts) => {
  const { withIcon = false } = props || {};
  const attributes = withIcon ? ' icon="car"' : '';

  const content = `<p-tag${attributes}>Some Tag</p-tag>`;

  return setContentWithDesignSystem(page, content);
};

const getHost = (page: Page) => page.locator('p-tag');
const getSpan = (page: Page) => page.locator('p-tag span');

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initTag(page);

    await expect
      .poll(async () => (await getLifecycleStatus(page)).componentDidLoad['p-tag'], 'componentDidLoad: p-tag')
      .toBe(1);

    await expect
      .poll(async () => (await getLifecycleStatus(page)).componentDidLoad.all, 'componentDidLoad: all')
      .toBe(1);
    await expect
      .poll(async () => (await getLifecycleStatus(page)).componentDidUpdate.all, 'componentDidUpdate: all')
      .toBe(0);
  });

  test('should work without unnecessary round trips on prop change', async ({ page }) => {
    await initTag(page, { withIcon: true });
    const host = getHost(page);

    await setProperty(host, 'icon', 'highway');
    await waitForStencilLifecycle(page);

    await expect
      .poll(async () => (await getLifecycleStatus(page)).componentDidUpdate['p-tag'], 'componentDidUpdate: p-tag')
      .toBe(1);
    await expect
      .poll(async () => (await getLifecycleStatus(page)).componentDidUpdate['p-icon'], 'componentDidUpdate: p-icon')
      .toBe(1);

    await expect
      .poll(async () => (await getLifecycleStatus(page)).componentDidLoad.all, 'componentDidLoad: all')
      .toBe(2);
    await expect
      .poll(async () => (await getLifecycleStatus(page)).componentDidUpdate.all, 'componentDidUpdate: all')
      .toBe(2);
  });
});
