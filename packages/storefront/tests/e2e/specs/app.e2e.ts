import { expect, test } from '@playwright/test';

test('should have working home page', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('a[slot="title"]')).toContainText('Porsche Design System');
});
