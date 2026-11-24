import type { Page } from '@playwright/test';
import { schemes } from '@porsche-design-system/testing';
import { waitForComponentsHydrated } from '@porsche-design-system/testing/playwright';
import { getExampleUrl, setupExamplePage } from '../../../helpers/index.ts';
import { expect, expectNoViolations, test, testInitialStates } from '../../helpers/index.ts';

/**
 * `src/patterns/forms/booking` – the booking flow in its initial, personal-data, confirmation and validation states.
 */

const id = 'patterns-forms-booking';
const url = getExampleUrl(id);

const fillPersonalDetails = async (page: Page) => {
  await page.locator('p-segmented-control[name="salutation"] p-segmented-control-item[value="mr"]').click();
  await page.locator('p-input-text[name="first-name"] input').fill('Klaus');
  await page.locator('p-input-text[name="last-name"] input').fill('Kleber');
  await page.locator('p-input-date[name="date-of-birth"] input').fill('1974-01-01');
  await page.locator('p-checkbox[name="driving-licence"] input').check();
  await page.locator('p-input-tel[name="phone"] input').fill('172 39948839');
  await page.locator('p-input-email[name="email"] input').fill('klaus.kleber@gmail.com');
};

const goToPersonalData = async (page: Page) => {
  await page.locator('p-segmented-control[name="time"] p-segmented-control-item[value="15:30"]').click();
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.getByRole('heading', { level: 2, name: 'Your details' })).toBeVisible();
};

const goToConfirmation = async (page: Page) => {
  await goToPersonalData(page);
  await fillPersonalDetails(page);
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.getByRole('heading', { level: 2, name: 'Confirm your booking' })).toBeVisible();
};

testInitialStates(id);

for (const scheme of schemes) {
  test(`personal data step with color-scheme ${scheme}`, async ({ page, makeAxeBuilder }, testInfo) => {
    await setupExamplePage(page, url, { prefersColorScheme: scheme });
    await goToPersonalData(page);
    await waitForComponentsHydrated(page);

    await expectNoViolations(makeAxeBuilder(), testInfo, `${id}--personal-data--${scheme}`);
  });

  test(`confirmation step with color-scheme ${scheme}`, async ({ page, makeAxeBuilder }, testInfo) => {
    await setupExamplePage(page, url, { prefersColorScheme: scheme });
    await goToConfirmation(page);
    await waitForComponentsHydrated(page);

    await expectNoViolations(makeAxeBuilder(), testInfo, `${id}--confirmation--${scheme}`);
  });

  test(`validation errors with color-scheme ${scheme}`, async ({ page, makeAxeBuilder }, testInfo) => {
    await setupExamplePage(page, url, { prefersColorScheme: scheme });
    await goToPersonalData(page);
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page.locator('p-input-text[name="first-name"]')).toHaveJSProperty('state', 'error');
    await waitForComponentsHydrated(page);

    await expectNoViolations(makeAxeBuilder(), testInfo, `${id}--errors--${scheme}`);
  });
}
