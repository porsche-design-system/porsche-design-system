import { expect, test } from '@playwright/test';

test('should navigate to license', async ({ page }) => {
  await page.goto('/');

  const linkElement = page.locator(`a[href="/license/"]`);

  await expect(linkElement).toBeVisible();

  await linkElement.click();

  await expect(page.locator('#main-content > p-display')).toHaveText('License');
  expect(true).toBe(true);
});
