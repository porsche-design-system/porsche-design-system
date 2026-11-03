import { expect, test } from '@playwright/test';
import { collectPageErrors, getExampleUrl, setupExamplePage } from '../../helpers/index.ts';

/**
 * `src/patterns/forms/personal-details` – a personal details and address form with validation and reset support.
 */

const url = getExampleUrl('patterns-forms-personal-details');

test('loads without reporting an error', async ({ page }) => {
  const errors = collectPageErrors(page);

  await setupExamplePage(page, url);

  await expect(page).toHaveTitle(/^.+ \| Dummy Patterns$/);
  expect(errors).toEqual([]);
  await expect(page.getByRole('heading', { level: 1, name: 'Personal details' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Continue' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Dismiss Changes' })).toBeVisible();
});

test('validates required fields on submit, clears errors on input, and resets on Dismiss Changes', async ({
  page,
}) => {
  await setupExamplePage(page, url);

  const firstName = page.locator('p-input-text[name="first-name"]');
  const lastName = page.locator('p-input-text[name="last-name"]');
  const email = page.locator('p-input-email[name="email"]');
  const phone = page.locator('p-input-tel[name="phone"]');
  const street = page.locator('p-input-text[name="street"]');
  const houseNumber = page.locator('p-input-text[name="house-number"]');
  const postalCode = page.locator('p-input-text[name="postal-code"]');
  const city = page.locator('p-input-text[name="city"]');

  const currentUrl = page.url();
  await page.getByRole('button', { name: 'Continue' }).click();
  expect(page.url()).toBe(currentUrl);

  await expect(firstName).toHaveJSProperty('state', 'error');
  await expect(lastName).toHaveJSProperty('state', 'error');
  await expect(email).toHaveJSProperty('state', 'error');
  await expect(phone).toHaveJSProperty('state', 'error');
  await expect(street).toHaveJSProperty('state', 'error');
  await expect(houseNumber).toHaveJSProperty('state', 'error');
  await expect(postalCode).toHaveJSProperty('state', 'error');
  await expect(city).toHaveJSProperty('state', 'error');
  await expect(firstName.locator('input')).toBeFocused();

  await firstName.locator('input').fill('Ferry');
  await expect(firstName).toHaveJSProperty('state', 'none');

  await page.getByRole('button', { name: 'Dismiss Changes' }).click();
  await expect(firstName.locator('input')).toHaveValue('');
  await expect(lastName).toHaveJSProperty('state', 'none');
  await expect(email).toHaveJSProperty('state', 'none');
});
