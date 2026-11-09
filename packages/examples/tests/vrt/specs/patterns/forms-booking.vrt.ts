import { expect, type Page, test } from '@playwright/test';
import { getDevice, getExampleUrl, setupExamplePage } from '../../../helpers/index.ts';
import { testInitialStates, waitForStableState } from '../../helpers/index.ts';

/**
 * `src/patterns/forms/booking` – the booking flow in its initial, personal-data, confirmation and validation states.
 */

const id = 'patterns-forms-booking';
const url = getExampleUrl(id);

const goToPersonalData = async (page: Page) => {
  await page.locator('p-segmented-control[name="time"] p-segmented-control-item[value="15:30"]').click();
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.getByRole('heading', { level: 2, name: 'Your details' })).toBeVisible();
};

const fillPersonalDetails = async (page: Page) => {
  await page.locator('p-segmented-control[name="salutation"] p-segmented-control-item[value="mr"]').click();
  await page.locator('p-input-text[name="first-name"] input').fill('Klaus');
  await page.locator('p-input-text[name="last-name"] input').fill('Kleber');
  await page.locator('p-input-date[name="date-of-birth"] input').fill('1974-01-01');
  await page.locator('p-checkbox[name="driving-licence"] input').check();
  await page.locator('p-input-tel[name="phone"] input').fill('172 39948839');
  await page.locator('p-input-email[name="email"] input').fill('klaus.kleber@gmail.com');
};

testInitialStates(id);

test('personal data', async ({ page }) => {
  const device = getDevice();
  await setupExamplePage(page, url);

  await goToPersonalData(page);
  await waitForStableState(page);

  await expect(page).toHaveScreenshot(`${id}--personal-data--${device}.png`, { fullPage: true });
});

test('confirmation', async ({ page }) => {
  const device = getDevice();
  await setupExamplePage(page, url);

  await goToPersonalData(page);
  await fillPersonalDetails(page);
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.getByRole('heading', { level: 2, name: 'Confirm your booking' })).toBeVisible();
  await expect(page.locator('#booking-summary-name')).toHaveText('Mr. Klaus Kleber');
  await waitForStableState(page);

  await expect(page).toHaveScreenshot(`${id}--confirmation--${device}.png`, { fullPage: true });
});

test('validation errors', async ({ page }) => {
  const device = getDevice();
  await setupExamplePage(page, url);

  await goToPersonalData(page);
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.locator('p-input-text[name="first-name"]')).toHaveJSProperty('state', 'error');
  await waitForStableState(page);

  await expect(page).toHaveScreenshot(`${id}--errors--${device}.png`, { fullPage: true });
});
