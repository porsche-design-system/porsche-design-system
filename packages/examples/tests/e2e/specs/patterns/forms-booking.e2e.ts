import { expect, type Page, test } from '@playwright/test';
import { collectPageErrors, getExampleUrl, setupExamplePage } from '../../helpers/index.ts';

/**
 * `src/patterns/forms/booking` – a three-step test drive booking flow with stepper navigation and per-step validation.
 */

const url = getExampleUrl('patterns-forms-booking');

const fillPersonalDetails = async (page: Page) => {
  await page.locator('p-segmented-control[name="salutation"] p-segmented-control-item[value="mr"]').click();
  await page.locator('p-input-text[name="first-name"] input').fill('Klaus');
  await page.locator('p-input-text[name="last-name"] input').fill('Kleber');
  await page.locator('p-input-date[name="date-of-birth"] input').fill('1974-01-01');
  await page.locator('p-checkbox[name="driving-licence"] input').check();
  await page.locator('p-input-tel[name="phone"] input').fill('172 39948839');
  await page.locator('p-input-email[name="email"] input').fill('klaus.kleber@gmail.com');
};

test('loads without reporting an error', async ({ page }) => {
  const errors = collectPageErrors(page);

  await setupExamplePage(page, url);

  await expect(page).toHaveTitle(/^.+ \| Dummy Patterns$/);
  expect(errors).toEqual([]);
  await expect(page.getByRole('heading', { level: 1, name: 'Booking' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Choose your date and time' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Continue' })).toBeVisible();
});

test('walks through all three steps, validates each, and supports back and edit', async ({ page }) => {
  await setupExamplePage(page, url);

  const currentUrl = page.url();

  await expect(page.locator('#booking-stepper-personal-data > .sr-only')).toHaveCount(1);
  await expect(page.locator('#booking-stepper-confirmation > .sr-only')).toHaveCount(1);

  await page.locator('p-segmented-control[name="time"]').evaluate((el: HTMLElement & { value?: string }) => {
    el.value = undefined;
  });
  await page.getByRole('button', { name: 'Continue' }).click();
  expect(page.url()).toBe(currentUrl);
  await expect(page.locator('p-segmented-control[name="time"]')).toHaveJSProperty('state', 'error');
  await expect(page.locator('p-segmented-control[name="time"]')).toHaveJSProperty(
    'message',
    'Please select a time slot.'
  );

  await page.locator('p-segmented-control[name="time"] p-segmented-control-item[value="15:30"]').click();
  await expect(page.locator('p-segmented-control[name="time"]')).toHaveJSProperty('state', 'none');
  await page.getByRole('button', { name: 'Continue' }).click();

  await expect(page.getByRole('heading', { level: 2, name: 'Your details' })).toBeVisible();
  // Focus lands on the `p-heading` host (tabindex=-1); the inner heading is not the focused node.
  await expect(page.locator('#booking-heading')).toBeFocused();
  await expect(page.locator('#booking-stepper-personal-data > .sr-only')).toHaveCount(0);
  await expect(page.locator('#booking-stepper-confirmation > .sr-only')).toHaveCount(1);

  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.locator('p-input-text[name="first-name"]')).toHaveJSProperty('state', 'error');
  await expect(page.locator('p-input-text[name="last-name"]')).toHaveJSProperty('state', 'error');
  await expect(page.locator('p-input-date[name="date-of-birth"]')).toHaveJSProperty('state', 'error');
  await expect(page.locator('p-input-tel[name="phone"]')).toHaveJSProperty('state', 'error');
  await expect(page.locator('p-input-email[name="email"]')).toHaveJSProperty('state', 'error');

  await fillPersonalDetails(page);
  await page.getByRole('button', { name: 'Continue' }).click();

  await expect(page.getByRole('heading', { level: 2, name: 'Confirm your booking' })).toBeVisible();
  await expect(page.locator('#booking-summary-date')).toHaveText('16 April 2026');
  await expect(page.locator('#booking-summary-time')).toHaveText('15:30 – 16:00');
  await expect(page.locator('#booking-summary-name')).toHaveText('Mr. Klaus Kleber');
  await expect(page.locator('#booking-summary-email')).toHaveText('klaus.kleber@gmail.com');
  await expect(page.locator('#booking-summary-phone')).toHaveText('+49 172 39948839');
  await expect(page.locator('#booking-summary-country')).toHaveText('Germany');

  await page.getByRole('button', { name: 'Confirm booking' }).click();
  await expect(page.locator('p-checkbox[name="terms"]')).toHaveJSProperty('state', 'error');
  await page.locator('p-checkbox[name="terms"] input').check();
  await expect(page.locator('p-checkbox[name="terms"]')).toHaveJSProperty('state', 'none');

  await page.locator('#booking-edit-personal').click();
  await expect(page.getByRole('heading', { level: 2, name: 'Your details' })).toBeVisible();

  await page.getByRole('button', { name: 'Back' }).click();
  await expect(page.getByRole('heading', { level: 2, name: 'Choose your date and time' })).toBeVisible();
});
