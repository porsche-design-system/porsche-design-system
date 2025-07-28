import { expect, type Locator, test } from '@playwright/test';
import { goto } from '../helpers';

test.describe('core-initializer', () => {
  test('should initialize component deterministically', async ({ page }) => {
    await goto(page, 'core-initializer');
    await page.waitForFunction(() => document.querySelectorAll('p-text-field-wrapper').length === 2);

    const getOuterHTML = (locator: Locator) => locator.evaluate((el) => el.outerHTML);

    await expect
      .poll(async () => await getOuterHTML(page.locator('p-text-field-wrapper').nth(0)))
      .toBe(await getOuterHTML(page.locator('p-text-field-wrapper').nth(1)));
  });
});
