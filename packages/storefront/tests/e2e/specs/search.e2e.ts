import { Page } from 'puppeteer';
import { getElementStyle, selectNode, waitForEventSerialization } from '@porsche-design-system/js/tests/e2e/helpers';
import { baseURL } from '../helpers';
import { ALGOLIA_APP_ID } from '../../../storefront.config';
import { ALGOLIA_RESPONSE_MOCK } from '../helpers/algolia-response-mock';

let page: Page;
beforeEach(async () => {
  page = await browser.newPage();
  await page.goto(baseURL, { waitUntil: 'networkidle0' });
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

const getAlgoliaHitsWrapper = async () => selectNode(page, '.ais-Hits');
const getAlgoliaHits = async () =>
  page.evaluate(() => {
    return Array.from(document.querySelectorAll('.ais-Hits-item'));
  });

const getNavigation = () => selectNode(page, 'p-accordion');
const searchInputSelector = 'input[type="search"]';
const searchTerm = 'button';

const sendAlgoliaRequest = async () =>
  Promise.all([
    page.type(searchInputSelector, searchTerm),
    page.waitForResponse((response) => response.status() === 200),
  ]);

describe('search', () => {
  it('should not display hits initially', async () => {
    const algoliaHitsList = await getAlgoliaHits();
    const algoliaHitsWrapper = await getAlgoliaHitsWrapper();

    expect(await getElementStyle(algoliaHitsWrapper, 'display')).toBe('none');
    expect(algoliaHitsList.length).toBe(0);
  });

  it('should display 4 hits after typing "button"', async () => {
    await sendAlgoliaRequest();
    const algoliaHitsWrapper = await getAlgoliaHitsWrapper();
    const algoliaHitsList = await getAlgoliaHits();

    expect(await getElementStyle(algoliaHitsWrapper, 'display')).toBe('block');
    expect(algoliaHitsList.length).toBe(4);
  });

  it('should hide navigation when displaying hits', async () => {
    expect(await getNavigation()).not.toBeNull();

    await sendAlgoliaRequest();

    expect(await getNavigation()).toBeNull();
  });

  it('should hide hits and show navigation after clicking on a result', async () => {
    await sendAlgoliaRequest();

    const [linkElement] = await page.$x(`//div[@class='sidebar']//nav//a[contains(., 'Button')]`);
    await linkElement.click();

    const algoliaHitsWrapper = await getAlgoliaHitsWrapper();

    expect(await getElementStyle(algoliaHitsWrapper, 'display')).toBe('none');
    expect(await getNavigation()).not.toBeNull();
  });

  it('should show hits after navigation and click on search input focus', async () => {
    await sendAlgoliaRequest();

    const [linkElement] = await page.$x(`//div[@class='sidebar']//nav//a[contains(., 'Button')]`);
    await linkElement.click();

    await page.focus(searchInputSelector);

    const algoliaHitsWrapper = await getAlgoliaHitsWrapper();

    expect(await getElementStyle(algoliaHitsWrapper, 'display')).toBe('block');
    expect(await getNavigation()).toBeNull();
  });

  it('should hide hits and show navigation after clearing the search', async () => {
    await sendAlgoliaRequest();

    await page.focus(searchInputSelector);
    for (let i = 0; i < searchTerm.length; i++) {
      await page.keyboard.press('Backspace');
    }

    const algoliaHitsWrapper = await getAlgoliaHitsWrapper();
    const algoliaHitsList = await getAlgoliaHits();

    expect(await getElementStyle(algoliaHitsWrapper, 'display')).toBe('none');
    expect(algoliaHitsList.length).toBe(4);
    expect(await getNavigation()).not.toBeNull();
  });

  it('should hide hits after pressing ESC', async () => {
    await sendAlgoliaRequest();
    await page.focus(searchInputSelector);
    await page.keyboard.press('Escape');

    const algoliaHitsWrapper = await getAlgoliaHitsWrapper();
    const algoliaHitsList = await getAlgoliaHits();

    expect(await getElementStyle(algoliaHitsWrapper, 'display')).toBe('none');
    expect(algoliaHitsList.length).toBe(4);
    expect(await getNavigation()).not.toBeNull();
  });

  it('should keep hits hidden after clearing input and focusing search', async () => {
    await sendAlgoliaRequest();
    await page.focus(searchInputSelector);
    await page.keyboard.press('Escape');

    const algoliaHitsWrapper = await getAlgoliaHitsWrapper();
    const algoliaHitsList = await getAlgoliaHits();

    await page.focus(searchInputSelector);

    expect(await getElementStyle(algoliaHitsWrapper, 'display')).toBe('none');
    expect(algoliaHitsList.length).toBe(4);
    expect(await getNavigation()).not.toBeNull();
  });
});
