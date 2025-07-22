import { expect, test } from '@playwright/test';

test('should have table of contents', async ({ page }) => {
  await page.goto('/news/changelog/');
  const tableOfContentsLinks = page.locator('.toc li');
  await expect(tableOfContentsLinks).toHaveCount(5);
});

test('clicking table of contents link scrolls to the correct section', async ({ page }) => {
  await page.goto('/news/changelog/');

  const tocLinks = page.locator('.toc li a');
  const firstLink = tocLinks.first();
  const linkText = await firstLink.innerText();

  await firstLink.click();

  const href = await firstLink.getAttribute('href');
  expect(href).not.toBeNull();
  // biome-ignore lint/style/noNonNullAssertion: ok
  const sectionId = href!.replace(/^#/, '');

  const headingAnchor = page.locator(`p-heading a[href="${href}"]`);
  const heading = page.locator(`p-heading[id="${sectionId}"]`);

  await expect(headingAnchor).toBeAttached();
  await expect(heading).toBeVisible();
  await expect(heading).toContainText(linkText);
});
