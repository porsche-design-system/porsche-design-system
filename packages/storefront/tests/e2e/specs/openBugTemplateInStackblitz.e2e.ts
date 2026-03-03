import { expect, test } from '@playwright/test';

test('should open stackblitz with correct theme and framework', async ({ page }) => {
  test.setTimeout(120000);
  await page.goto('/help/bug-report/');

  await expect(page.getByRole('button', { name: 'Vanilla JS' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'React' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Angular' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Vue' })).toBeVisible();
  const selectedTheme = await page
    .locator('#main-content p-select[name="theme"]')
    .evaluate((select) => (select as any).value);
  await expect(page.locator('#main-content p-select[name="theme"]')).toBeVisible();

  const stackBlitzButton = page.getByText('Open template in StackBlitz');
  const stackBlitzPagePromise = page.waitForEvent('popup');

  await stackBlitzButton.click();
  const stackBlitzPage = await stackBlitzPagePromise;
  await stackBlitzPage.waitForLoadState();

  // Wait for the iframe to appear on the parent page
  await stackBlitzPage.waitForSelector('iframe[title="Preview page"]', {
    state: 'attached', // Ensures the iframe is attached to the DOM
    timeout: 120000, // Adjust timeout as needed
  });

  const iframeElement = stackBlitzPage.locator('iframe[title="Preview page"]');
  const iframe = iframeElement.contentFrame();

  if (iframe) {
    const text = iframe.getByText('Place your reproduction code here');
    await expect(text).toBeVisible();
    await expect(text).toHaveAttribute('theme', selectedTheme);
  } else {
    throw new Error('Unable to access the iframe content, possibly due to cross-origin restrictions');
  }

  await stackBlitzPage.close();
});
