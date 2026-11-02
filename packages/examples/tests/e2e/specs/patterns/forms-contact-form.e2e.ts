import { expect, test } from '@playwright/test';
import { collectPageErrors, getExampleUrl, setupExamplePage } from '../../helpers/index.ts';

/**
 * `src/patterns/forms/contact-form` – a contact inquiry form with optional call preferences, service checkboxes and
 * required personal details.
 */

const url = getExampleUrl('patterns-forms-contact-form');

test('loads without reporting an error', async ({ page }) => {
  const errors = collectPageErrors(page);

  await setupExamplePage(page, url);

  await expect(page).toHaveTitle(/^.+ \| Dummy Patterns$/);
  expect(errors).toEqual([]);
  await expect(page.getByRole('heading', { level: 1, name: 'Contact' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Send non-binding request' })).toBeVisible();
});

test('selects options and prevents navigation on submit', async ({ page }) => {
  await setupExamplePage(page, url);

  const preferredDay = page.locator('p-segmented-control[name="preferred-day"]');
  await expect(preferredDay).toHaveJSProperty('value', '2026-10-21');

  await page.locator('p-segmented-control-item[value="2026-10-22"]').click();
  await expect(preferredDay).toHaveJSProperty('value', '2026-10-22');

  const salutation = page.locator('p-radio-group[name="salutation"]');
  await page.locator('p-radio-group-option[value="mrs"]').click();
  await expect(salutation).toHaveJSProperty('value', 'mrs');

  const currentUrl = page.url();
  await page.getByRole('button', { name: 'Send non-binding request' }).click();
  expect(page.url()).toBe(currentUrl);
});
