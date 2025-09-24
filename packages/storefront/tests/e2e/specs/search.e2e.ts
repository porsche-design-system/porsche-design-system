import { expect, type Page, test } from '@playwright/test';
import { TYPESENSE_SEARCH_ONLY_KEY } from '@/lib/typesense/client';
import { TYPESENSE_RESPONSE_MOCK } from '../helpers/typesense-response-mock';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => (window as any).componentsReady());

  await page.route('**/*', async (route) => {
    if (route.request().url().includes(TYPESENSE_SEARCH_ONLY_KEY)) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json; charset=UTF-8',
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify(TYPESENSE_RESPONSE_MOCK),
      });
    } else {
      await route.continue();
    }
  });
});

const searchTerm = 'button';

const sendAlgoliaRequest = async (page: Page) =>
  Promise.all([getSearchInput(page).fill(searchTerm), page.waitForResponse((response) => response.status() === 200)]);

const getOpenSearchButton = (page: Page) => page.getByRole('button', { name: 'Search' });
const getSearchModal = (page: Page) => page.getByRole('dialog', { name: 'Search' });
const getSearchInput = (page: Page) => page.getByPlaceholder('What are you looking for?');
const getAlgoliaHits = (page: Page) => page.locator('.hit');

const openSearchModal = async (page: Page) => {
  const button = getOpenSearchButton(page);
  const modal = getSearchModal(page);
  const input = getSearchInput(page);

  await button.click();
  await expect(modal).toBeVisible();
  await expect(input).toBeVisible();
  await expect(input).toBeFocused();
};

test.describe('search', () => {
  test('should not display search modal initially', async ({ page }) => {
    const modal = getSearchModal(page);
    await expect(modal).toBeHidden();
  });

  test('should display search modal after clicking on search icon', async ({ page }) => {
    await openSearchModal(page);
  });

  test('should not display hits initially', async ({ page }) => {
    await openSearchModal(page);
    await expect(getAlgoliaHits(page)).toHaveCount(0);
  });

  test('should display 3 hits after typing "button"', async ({ page }) => {
    await openSearchModal(page);
    await sendAlgoliaRequest(page);
    await expect(getAlgoliaHits(page)).toHaveCount(7);
  });

  test('should hide hits after clicking on a result', async ({ page }) => {
    await openSearchModal(page);
    await sendAlgoliaRequest(page);
    const modal = getSearchModal(page);

    await page.locator('.hit').first().click();
    await expect(modal).toBeHidden();
  });

  test('should keep hits after navigation and reopening of search modal', async ({ page }) => {
    await openSearchModal(page);
    await sendAlgoliaRequest(page);
    const modal = getSearchModal(page);

    await sendAlgoliaRequest(page);
    await expect(getAlgoliaHits(page)).toHaveCount(7);
    await page.locator('.hit').first().click();
    await expect(modal).toBeHidden();

    await openSearchModal(page);
    await expect(getAlgoliaHits(page)).toHaveCount(7);
  });

  test('should hide hits after clearing the search', async ({ page }) => {
    await openSearchModal(page);
    await sendAlgoliaRequest(page);
    await expect(getAlgoliaHits(page)).toHaveCount(7);

    const input = getSearchInput(page);
    await input.fill('');

    await expect(getAlgoliaHits(page)).toHaveCount(0);
  });
});
