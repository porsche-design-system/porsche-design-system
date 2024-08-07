import { expect, type Page, test } from '@playwright/test';
import { getElementStyle } from '../../../../components-js/tests/e2e/helpers';
import { ALGOLIA_APP_ID } from '../../../storefront.config';
import { ALGOLIA_RESPONSE_MOCK } from '../helpers';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => (window as any).componentsReady());

  await page.route('**/*', async (route) => {
    if (route.request().url().includes(ALGOLIA_APP_ID)) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json; charset=UTF-8',
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify(ALGOLIA_RESPONSE_MOCK),
      });
    } else {
      await route.continue();
    }
  });
});

const getHitsWrapper = (page: Page) => page.locator('.spacer').first();
const getAmountOfAlgoliaHits = (page: Page): Promise<number> =>
  page.evaluate(() => document.querySelectorAll('.ais-Hits-item').length);
const waitForResultsToBeGone = (page: Page) => page.waitForFunction(() => !document.querySelector('.ais-Hits-item'));

const searchInputSelector = 'input[type="search"]';
const searchTerm = 'button';

const sendAlgoliaRequest = async (page: Page) =>
  Promise.all([
    page.type(searchInputSelector, searchTerm),
    page.waitForResponse((response) => response.status() === 200),
    page.waitForSelector('.ais-Hits-item'),
  ]);

test.describe('search', () => {
  test('should not display hits initially', async ({ page }) => {
    const amount = await getAmountOfAlgoliaHits(page);
    const hitsWrapper = getHitsWrapper(page);

    expect(await getElementStyle(hitsWrapper, 'display')).toBe('none');
    expect(amount).toBe(0);
  });

  test('should display 4 hits after typing "button"', async ({ page }) => {
    await sendAlgoliaRequest(page);
    const hitsWrapper = getHitsWrapper(page);
    const amount = await getAmountOfAlgoliaHits(page);

    expect(await getElementStyle(hitsWrapper, 'display')).toBe('block');
    expect(amount).toBe(3);
  });

  test('should hide hits after clicking on a result', async ({ page }) => {
    await sendAlgoliaRequest(page);
    const [linkElement] = await page.locator(`xpath=//header//a[contains(., 'Button')]`).all();
    await linkElement.click();
    const hitsWrapper = getHitsWrapper(page);

    expect(await getElementStyle(hitsWrapper, 'display')).toBe('none');
  });

  test('should show hits after navigation and click on search input focus', async ({ page }) => {
    await sendAlgoliaRequest(page);
    const [linkElement] = await page.locator(`xpath=//header//a[contains(., 'Button')]`).all();
    await linkElement.click();

    await page.focus(searchInputSelector);
    const hitsWrapper = getHitsWrapper(page);

    expect(await getElementStyle(hitsWrapper, 'display')).toBe('block');
  });

  test('should hide hits after clearing the search', async ({ page }) => {
    await sendAlgoliaRequest(page);
    await page.focus(searchInputSelector);
    for (let i = 0; i < searchTerm.length; i++) {
      await page.keyboard.press('Backspace');
    }

    await waitForResultsToBeGone(page);
    const hitsWrapper = getHitsWrapper(page);
    const amount = await getAmountOfAlgoliaHits(page);

    expect(await getElementStyle(hitsWrapper, 'display')).toBe('none');
    expect(amount).toBe(0);
  });

  test('should hide hits after pressing ESC', async ({ page }) => {
    await sendAlgoliaRequest(page);
    await page.focus(searchInputSelector);
    await page.keyboard.press('Escape');

    await waitForResultsToBeGone(page);
    const hitsWrapper = getHitsWrapper(page);
    const amount = await getAmountOfAlgoliaHits(page);

    expect(await getElementStyle(hitsWrapper, 'display')).toBe('none');
    expect(amount).toBe(0);
  });

  test('should keep hits hidden after clearing input and focusing search', async ({ page }) => {
    await sendAlgoliaRequest(page);
    await page.focus(searchInputSelector);
    await page.keyboard.press('Escape');

    await waitForResultsToBeGone(page);
    const hitsWrapper = getHitsWrapper(page);
    const amount = await getAmountOfAlgoliaHits(page);

    await page.focus(searchInputSelector);

    expect(await getElementStyle(hitsWrapper, 'display')).toBe('none');
    expect(amount).toBe(0);
  });
});
