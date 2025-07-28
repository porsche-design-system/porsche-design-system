import { expect, type Locator, test } from '@playwright/test';
import { goto } from '../helpers';

test.describe('core-initializer', () => {
  test('should initialize component deterministically', async ({ page }) => {
    await goto(page, 'core-initializer');
    await page.waitForFunction(() => document.querySelectorAll('p-text-field-wrapper').length === 2);

    const getOuterHTML = (locator: Locator) => locator.evaluate((el) => el.outerHTML);

    const component1HTML = async () => await getOuterHTML(page.locator('p-text-field-wrapper').nth(0));
    const component2HTML = async () => await getOuterHTML(page.locator('p-text-field-wrapper').nth(1));

    await expect.poll(async () => await component1HTML()).toBe(await component2HTML());

    if (component1HTML !== component2HTML) {
      console.log('component1HTML', await component1HTML());
      console.log('component2HTML', await component2HTML());
    }
  });
});
