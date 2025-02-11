import { expect, test } from '@playwright/test';

test('should have working property select', async ({ page }) => {
  await page.goto('/components/accordion/examples');

  const markup = page.locator('.markup');
  const accordion = page.locator('.demo p-accordion');

  await expect(accordion).toBeVisible();
  await expect(accordion).toHaveJSProperty('size', 'small');
  await expect(markup).toContainText('p-accordion');

  const sizeSelect = page.locator('p-select[name="size"]');
  await expect(sizeSelect).toBeVisible();
  await expect(sizeSelect).toHaveJSProperty('value', 'small');
  await expect(markup).not.toContainText('size');
  await sizeSelect.click();
  await sizeSelect.locator('p-select-option').last().click();
  await expect(markup).toContainText('size="medium"');
  await expect(accordion).toHaveJSProperty('size', 'medium');

  await sizeSelect.getByText('Reset').click();
  await expect(sizeSelect).toHaveJSProperty('value', 'small');
  await expect(accordion).toHaveJSProperty('size', 'small');
  await expect(markup).not.toContainText('size');
});

test('should have working property text-field', async ({ page }) => {
  await page.goto('/components/accordion/examples');

  const markup = page.locator('.markup');
  const accordion = page.locator('.demo p-accordion');

  await expect(accordion).toBeVisible();
  await expect(accordion).toHaveJSProperty('heading', 'Some Heading');
  await expect(markup).toContainText('heading="Some Heading"');

  const headingTextField = page.locator('p-text-field-wrapper[name="heading"]');
  // await expect(sizeSelect).toBeVisible();
  // await expect(sizeSelect).toHaveJSProperty('value', 'small');
  // await expect(markup).not.toContainText('size');
  // await sizeSelect.click();
  // await sizeSelect.locator('p-select-option').last().click();
  // await expect(markup).toContainText('size="medium"');
  // await expect(accordion).toHaveJSProperty('size', 'medium');
});

// TODO: Test default value is deleted again for all types
