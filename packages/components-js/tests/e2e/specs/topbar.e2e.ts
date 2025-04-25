import type { Page } from 'playwright';
import { expect, test } from '@playwright/test';
import {
  addEventListener,
  getActiveElementId,
  getActiveElementTagNameInShadowRoot,
  getEventSummary,
  getLifecycleStatus,
  setContentWithDesignSystem,
  setProperty,
  skipInBrowsers,
  waitForStencilLifecycle,
} from '../helpers';

const getHost = (page: Page) => page.locator('p-topbar');
const getCrestLink = (page: Page) => page.locator('p-topbar p-crest a');
const getWordmarkLink = (page: Page) => page.locator('p-topbar p-wordmark a');

const initTopbar = (
  page: Page,
  opts?: {
    hasHref?: boolean;
  }
): Promise<void> => {
  const { hasHref = false } = opts || {};

  const markup = `<p-topbar ${hasHref ? 'href="about:blank#" ' : ''}></p-topbar>`;

  return setContentWithDesignSystem(page, markup);
};

test.describe('with link', () => {
  test('should render <a> tag when href prop is defined', async ({ page }) => {
    await initTopbar(page);
    const host = getHost(page);

    await expect(getCrestLink(page)).toHaveCount(0);
    await expect(getWordmarkLink(page)).toHaveCount(0);

    await setProperty(host, 'href', '#some-link');
    await waitForStencilLifecycle(page);

    await expect(getCrestLink(page)).toHaveCount(1);
    await expect(getWordmarkLink(page)).toHaveCount(1);
  });
});

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initTopbar(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-topbar'], 'componentDidLoad: p-topbar').toBe(1);
    expect(status.componentDidLoad['p-crest'], 'componentDidLoad: p-crest').toBe(1);
    expect(status.componentDidLoad['p-wordmark'], 'componentDidLoad: p-wordmark').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(3);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });
});
