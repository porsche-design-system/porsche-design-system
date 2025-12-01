import type { Page } from 'playwright';
import { expect, test } from '@playwright/test';
import {
  getElementStyle,
  getLifecycleStatus,
  getProperty,
  setContentWithDesignSystem,
  setProperty,
  skipInBrowsers,
  waitForStencilLifecycle,
} from '../helpers';

const initText = (page: Page): Promise<void> => {
  return setContentWithDesignSystem(
    page,
    `
    <p-text>
      <p>Some message with a <a onclick="return false;" href="#">link</a>.</p>
    </p-text>`
  );
};

const getHost = (page: Page) => page.locator('p-text');
const getParagraph = (page: Page) => page.locator('p-text p');

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initText(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-text'], 'componentDidLoad: p-text').toBe(1);

    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
    expect(status.componentDidLoad.all, 'componentDidUpdate: all').toBe(1);
  });

  test('should work without unnecessary round trips after state change', async ({ page }) => {
    await initText(page);
    const host = getHost(page);

    await setProperty(host, 'weight', 'semibold');
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-text'], 'componentDidUpdate: p-text').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });

});

skipInBrowsers(['firefox', 'webkit'], () => {
  test('should have "text-size-adjust: none" set', async ({ page }) => {
    await setContentWithDesignSystem(
      page,
      `
    <p-text>
      Some message
    </p-text>`
    );
    const paragraph = getParagraph(page);
    const webkitTextSizeAdjustStyle = await getElementStyle(paragraph, 'webkitTextSizeAdjust' as any);

    // when webkitTextSizeAdjust is set to "none", it defaults to 100%
    expect(webkitTextSizeAdjustStyle).toBe('100%');
  });
});
