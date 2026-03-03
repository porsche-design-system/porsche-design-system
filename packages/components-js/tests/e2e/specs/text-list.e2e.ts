import type { Page } from 'playwright';
import { expect, test } from '@playwright/test';
import {
  getLifecycleStatus,
  getProperty,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';

const initTextList = (page: Page): Promise<void> => {
  return setContentWithDesignSystem(
    page,
    `
    <p-text-list>
      <p-text-list-item>The quick brown fox jumps over the lazy dog</p-text-list-item>
      <p-text-list-item>The quick <a onclick="return false;" href="#">brown fox</a> jumps over the lazy dog</p-text-list-item>
      <p-text-list-item>
        The quick brown fox jumps over the lazy dog
        <p-text-list>
          <p-text-list-item>
            The quick brown fox jumps over the lazy dog
          </p-text-list-item>
        </p-text-list>
      </p-text-list-item>
    </p-text-list>`
  );
};

const getHost = (page: Page) => page.locator('p-text-list').first();

test.describe('lifecycle', () => {
  test('should change prop without any unnecessary round trips', async ({ page }) => {
    await initTextList(page);
    const host = getHost(page);

    await setProperty(host, 'type', 'numbered');
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);
    expect(status.componentDidUpdate['p-text-list'], 'componentDidUpdate: p-text-list').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
    expect(await getProperty(host, 'type')).toBe('numbered');
  });
});
