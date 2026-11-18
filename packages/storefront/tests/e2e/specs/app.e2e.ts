import { expect, test } from '@porsche-design-system/testing/playwright';

test('should have working home page', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('a[slot="title"]')).toContainText('Porsche Design System');
});
