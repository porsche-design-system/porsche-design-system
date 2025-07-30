import { expect, type Locator, test } from '@playwright/test';
import { goto } from '../helpers';

test.describe('core-initializer', () => {
  test('should initialize component deterministically', async ({ page }) => {
    await goto(page, 'core-initializer');
    await page.waitForFunction(() => document.querySelectorAll('p-text-field-wrapper').length === 2);

    const component1 = page.locator('p-text-field-wrapper').nth(0);
    const component2 = page.locator('p-text-field-wrapper').nth(1);

    await expect
      .poll(async () => {
        const component1HTML = await component1.evaluate((el) => el.outerHTML);
        const component2HTML = await component2.evaluate((el) => el.outerHTML);
        if (component1HTML !== component2HTML) {
          console.log('component1HTML', component1HTML);
          console.log('component2HTML', component2HTML);
        }
        return component1HTML === component2HTML;
      })
      .toBe(true);
  });
});
