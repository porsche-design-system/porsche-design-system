import { type Page, test, expect } from '@playwright/test';

const waitForComponentsToBeReady = async (page: Page): Promise<void> => {
  await page.evaluate(() =>
    (window as unknown as Window & { componentsReady: () => Promise<number> }).componentsReady()
  );
};

test('should show browser support fallback', async ({ page }) => {
  const fallbackID = 'porsche-design-system-fallbacks-browser-support';

  await page.goto('/partials/browser-support-fallback-script');
  await waitForComponentsToBeReady(page);

  await expect(page.locator(`#${fallbackID}`)).not.toBeVisible();

  page.locator(`xpath=//p-button[contains(., 'Force display of browser support fallback')]`).click();

  await expect(page.locator(`#${fallbackID}`)).toBeVisible();
});

test('should show cookies fallback', async ({ page }) => {
  const fallbackID = 'porsche-design-system-fallbacks-cookies';

  await page.goto('/partials/cookies-fallback-script');
  await waitForComponentsToBeReady(page);

  await expect(page.locator(`#${fallbackID}`)).not.toBeVisible();

  page.locator(`xpath=//p-button[contains(., 'Force display of cookies fallback')]`).click();

  await expect(page.locator(`#${fallbackID}`)).toBeVisible();
});
