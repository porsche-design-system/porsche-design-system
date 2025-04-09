import { expect, test } from '@playwright/test';

test('should open stackblitz with correct version, theme and framework', async ({ page }) => {
  await page.goto('/help/bug-report/');

  await expect(page.getByRole('button', { name: 'Vanilla JS' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'React' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Angular' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Vue' })).toBeVisible();
  await expect(page.locator('#main-content').getByRole('combobox', { name: 'Version', exact: true })).toBeVisible();
  const selectedVersion = await page
    .locator('p-select[name="pds-versions"]')
    .evaluate((select) => (select as any).value);
  const selectedTheme = await page
    .locator('#main-content p-select[name="theme"]')
    .evaluate((select) => (select as any).value);
  await expect(page.locator('#main-content').getByRole('combobox', { name: 'Theme' })).toBeVisible();

  const stackBlitzButton = page.getByText('Open template in StackBlitz');
  const stackBlitzPagePromise = page.waitForEvent('popup');

  await stackBlitzButton.click();
  const stackBlitzPage = await stackBlitzPagePromise;
  await stackBlitzPage.waitForLoadState();

  // Wait for the iframe to appear on the parent page
  await stackBlitzPage.waitForSelector('#PreviewContentWrapper iframe', {
    state: 'attached', // Ensures the iframe is attached to the DOM
    timeout: 90000, // Adjust timeout as needed
  });

  const dependency = stackBlitzPage.getByRole('link', { name: '@porsche-design-system/components-js' });
  await expect(dependency).toBeVisible();
  await expect(stackBlitzPage.getByText(selectedVersion)).toBeVisible();

  const iframeElement = stackBlitzPage.locator('#PreviewContentWrapper iframe');
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
