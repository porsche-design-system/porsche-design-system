import { expect, test } from '@playwright/test';
import type { Page } from 'playwright';
import { getLifecycleStatus, setContentWithDesignSystem, setProperty, waitForStencilLifecycle } from '../helpers';

type InitOpts = {
  variant?: string;
  locale?: string;
};

const initAiTag = (page: Page, props?: InitOpts) => {
  const { variant, locale } = props || {};
  const variantAttr = variant ? ` variant="${variant}"` : '';
  const localeAttr = locale ? ` locale="${locale}"` : '';

  const content = `<p-ai-tag${variantAttr}${localeAttr}></p-ai-tag>`;

  return setContentWithDesignSystem(page, content);
};

const getHost = (page: Page) => page.locator('p-ai-tag');

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initAiTag(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-ai-tag'], 'componentDidLoad: p-ai-tag').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  test('should work without unnecessary round trips on prop change', async ({ page }) => {
    await initAiTag(page);
    const host = getHost(page);

    await setProperty(host, 'variant', 'abbreviation');
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-ai-tag'], 'componentDidUpdate: p-ai-tag').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });

  test('should work without unnecessary round trips on locale prop change', async ({ page }) => {
    await initAiTag(page);
    const host = getHost(page);

    await setProperty(host, 'locale', 'de_DE');
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-ai-tag'], 'componentDidUpdate: p-ai-tag').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });
});
