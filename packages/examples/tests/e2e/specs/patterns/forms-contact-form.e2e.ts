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

test('validates required fields on submit and clears errors as the user corrects them', async ({ page }) => {
  await setupExamplePage(page, url);

  const firstName = page.locator('p-input-text[name="first-name"]');
  const lastName = page.locator('p-input-text[name="last-name"]');
  const email = page.locator('p-input-email[name="email"]');
  const terms = page.locator('p-checkbox[name="terms"]');
  const submit = page.getByRole('button', { name: 'Send non-binding request' });

  const currentUrl = page.url();
  await submit.click();
  expect(page.url()).toBe(currentUrl);

  await expect(firstName).toHaveJSProperty('state', 'error');
  await expect(firstName).toHaveJSProperty('message', 'Please enter your first name.');
  await expect(lastName).toHaveJSProperty('state', 'error');
  await expect(lastName).toHaveJSProperty('message', 'Please enter your last name.');
  await expect(email).toHaveJSProperty('state', 'error');
  await expect(email).toHaveJSProperty('message', 'Please enter a valid email address.');
  await expect(terms).toHaveJSProperty('state', 'error');
  await expect(terms).toHaveJSProperty('message', 'Please agree to the General Terms and Conditions.');
  await expect(firstName.locator('input')).toBeFocused();

  await firstName.locator('input').fill('Ferry');
  await expect(firstName).toHaveJSProperty('state', 'none');
  await expect(firstName).toHaveJSProperty('message', '');

  await lastName.locator('input').fill('Porsche');
  await expect(lastName).toHaveJSProperty('state', 'none');

  await email.locator('input').fill('invalid-email');
  await expect(email).toHaveJSProperty('state', 'error');
  await email.locator('input').fill('ferry@porsche.de');
  await expect(email).toHaveJSProperty('state', 'none');

  await terms.locator('input').check();
  await expect(terms).toHaveJSProperty('state', 'none');
});
