import type { Page } from 'puppeteer';
import { getElementStyle, selectNode } from '@porsche-design-system/js/tests/e2e/puppeteer/helpers';
import { baseURL } from '../helpers';
import { ALGOLIA_APP_ID } from '../../../storefront.config';
import { ALGOLIA_RESPONSE_MOCK } from '../helpers/algolia-response-mock';

let page: Page;
beforeEach(async () => {
  page = await browser.newPage();
  await page.goto(baseURL);
  await page.evaluate(() => (window as any).componentsReady());

  await page.setRequestInterception(true);
  page.on('request', (request) => {
    if (request.url().includes(ALGOLIA_APP_ID)) {
      request.respond({
        status: 200,
        contentType: 'application/json; charset=UTF-8',
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify(ALGOLIA_RESPONSE_MOCK),
      });
    } else {
      request.continue();
    }
  });
});
afterEach(async () => await page.close());

const getHitsWrapper = () => selectNode(page, '.spacer');
const getAmountOfAlgoliaHits = (): Promise<number> =>
  page.evaluate(() => document.querySelectorAll('.ais-Hits-item').length);
const waitForResultsToBeGone = () => page.waitForFunction(() => !document.querySelector('.ais-Hits-item'));

const searchInputSelector = 'input[type="search"]';
const searchTerm = 'button';

const getSearch = () => selectNode(page, '.header p-text-field-wrapper[label="Search"]');
const waitForSearchInputToBeDisplayed = () =>
  page.waitForFunction(() => !document.querySelector('searchInputSelector'));

// const openSearchOnButtonClick = async () => {
//   const searchButton = await page.$('.header p-button[type="button"]');
//
//   await searchButton.click();
//   await waitForSearchInputToBeDisplayed();
// };

const sendAlgoliaRequest = async () =>
  Promise.all([
    page.type(searchInputSelector, searchTerm),
    page.waitForResponse((response) => response.status() === 200),
    page.waitForSelector('.ais-Hits-item'),
  ]);

describe('search', () => {
  it('should not display hits initially', async () => {
    const amount = await getAmountOfAlgoliaHits();
    const hitsWrapper = await getHitsWrapper();

    expect(await getElementStyle(hitsWrapper, 'display')).toBe('none');
    expect(amount).toBe(0);
  });

  it('should display 4 hits after typing "button"', async () => {
    // await openSearchOnButtonClick();
    await sendAlgoliaRequest();
    const hitsWrapper = await getHitsWrapper();
    const amount = await getAmountOfAlgoliaHits();

    expect(await getElementStyle(hitsWrapper, 'display')).toBe('block');
    expect(amount).toBe(3);
  });

  it('should hide hits after clicking on a result', async () => {
    // await openSearchOnButtonClick();
    await sendAlgoliaRequest();
    const [linkElement] = await page.$x(`//header//a[contains(., 'Button')]`);
    await linkElement.click();
    const hitsWrapper = await getHitsWrapper();

    expect(await getElementStyle(hitsWrapper, 'display')).toBe('none');
  });

  it('should show hits after navigation and click on search input focus', async () => {
    // await openSearchOnButtonClick();
    await sendAlgoliaRequest();
    const [linkElement] = await page.$x(`//header//a[contains(., 'Button')]`);
    await linkElement.click();

    await page.focus(searchInputSelector);
    const hitsWrapper = await getHitsWrapper();

    expect(await getElementStyle(hitsWrapper, 'display')).toBe('block');
  });

  it('should hide hits after clearing the search', async () => {
    // await openSearchOnButtonClick();
    await sendAlgoliaRequest();
    await page.focus(searchInputSelector);
    for (let i = 0; i < searchTerm.length; i++) {
      await page.keyboard.press('Backspace');
    }

    await waitForResultsToBeGone();
    const hitsWrapper = await getHitsWrapper();
    const amount = await getAmountOfAlgoliaHits();

    expect(await getElementStyle(hitsWrapper, 'display')).toBe('none');
    expect(amount).toBe(0);
  });

  it('should hide hits after pressing ESC', async () => {
    // await openSearchOnButtonClick();
    await sendAlgoliaRequest();
    await page.focus(searchInputSelector);
    await page.keyboard.press('Escape');

    await waitForResultsToBeGone();
    const hitsWrapper = await getHitsWrapper();
    const amount = await getAmountOfAlgoliaHits();

    expect(await getElementStyle(hitsWrapper, 'display')).toBe('none');
    expect(amount).toBe(0);
  });

  it('should keep hits hidden after clearing input and focusing search', async () => {
    // await openSearchOnButtonClick();
    await sendAlgoliaRequest();
    await page.focus(searchInputSelector);
    await page.keyboard.press('Escape');

    await waitForResultsToBeGone();
    const hitsWrapper = await getHitsWrapper();
    const amount = await getAmountOfAlgoliaHits();

    await page.focus(searchInputSelector);

    expect(await getElementStyle(hitsWrapper, 'display')).toBe('none');
    expect(amount).toBe(0);
  });

  // it('should hide search after clearing the search and move focus from search field', async () => {
  //   // await openSearchOnButtonClick();
  //   await sendAlgoliaRequest();
  //   const search = await getSearch();
  //   await page.focus(searchInputSelector);
  //   await page.keyboard.press('Escape');
  //
  //   await waitForResultsToBeGone();
  //   await page.$eval(searchInputSelector, (e: HTMLInputElement) => e.blur());
  //
  //   expect(await getElementStyle(search, 'display')).toBe('none');
  // });
});
