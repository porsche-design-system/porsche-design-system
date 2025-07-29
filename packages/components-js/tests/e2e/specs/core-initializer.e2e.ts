import { expect, type Locator, test } from '@playwright/test';
import { goto } from '../helpers';

test.describe('core-initializer', () => {
  test('should initialize component deterministically', async ({ page }) => {
    await goto(page, 'core-initializer');
    await page.waitForFunction(() => document.querySelectorAll('p-text-field-wrapper').length === 2);

    const locator = page.locator('p-text-field-wrapper');
    const getOuterHTML = async (index: number) => await locator.nth(index).evaluate((el) => el.outerHTML);

    await expect.poll(async () => await getOuterHTML(0)).toBe(await getOuterHTML(1));
  });
});
