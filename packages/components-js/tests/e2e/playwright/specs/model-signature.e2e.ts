import type { Page } from 'playwright';
import { expect, test } from '@playwright/test';
import {
  getLifecycleStatus,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';

let page: Page;

test.beforeEach(async ({ browser }) => {
  page = await browser.newPage();
});

test.afterEach(async () => {
  await page.close();
});

const initModelSignature = (page: Page): Promise<void> => {
  return setContentWithDesignSystem(page, `<p-model-signature></p-model-signature>`);
};

const getHost = (page: Page) => selectNode(page, 'p-model-signature');

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initModelSignature(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-model-signature'], 'componentDidLoad: p-model-signature').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  test('should work without unnecessary round trips on prop change', async ({ page }) => {
    await initModelSignature(page);
    const host = await getHost(page);

    await setProperty(host, 'model', 'taycan');
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-model-signature'], 'componentDidUpdate: p-model-signature').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });
});
