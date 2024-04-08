import type { Page } from 'playwright';
import { expect, type Locator, test, type ElementHandle } from '@playwright/test';
import { getLifecycleStatus, setContentWithDesignSystem, setProperty, waitForStencilLifecycle } from '../helpers';
import { type ModelSignatureFetchPriority } from '@porsche-design-system/components';

const getHost = (page: Page): Promise<ElementHandle<HTMLElement>> => page.$('p-model-signature');
const getImage = (page: Page): Locator => page.locator('p-model-signature').getByRole('img');

const initModelSignature = (
  page: Page,
  opts?: {
    fetchPriority?: ModelSignatureFetchPriority;
    lazy?: boolean;
  }
): Promise<void> => {
  const { fetchPriority, lazy } = opts || {};
  const attrs = [fetchPriority ? `fetch-priority="${fetchPriority}"` : '', lazy ? `lazy="${lazy}"` : ''].join(' ');

  return setContentWithDesignSystem(page, `<p-model-signature ${attrs}></p-model-signature>`);
};

test.describe('fetch', () => {
  test('should set native fetchpriority="low" attribute', async ({ page }) => {
    await initModelSignature(page, { fetchPriority: 'low' });

    await expect(getImage(page)).toHaveAttribute('fetchpriority', 'low');
  });

  test('should set native fetchpriority="high" attribute', async ({ page }) => {
    await initModelSignature(page, { fetchPriority: 'high' });

    await expect(getImage(page)).toHaveAttribute('fetchpriority', 'high');
  });

  test('should not set native fetchpriority="auto" attribute since it\'s the browser default', async ({ page }) => {
    await initModelSignature(page, { fetchPriority: 'auto' });

    await expect(getImage(page)).not.toHaveAttribute('fetchpriority');
  });

  test('should set native loading="lazy" attribute', async ({ page }) => {
    await initModelSignature(page, { lazy: true });

    await expect(getImage(page)).toHaveAttribute('loading', 'lazy');
  });

  test('should not set native loading="eager" attribute since it\'s the browser default', async ({ page }) => {
    await initModelSignature(page, { lazy: false });

    await expect(getImage(page)).not.toHaveAttribute('loading');
  });
});

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
