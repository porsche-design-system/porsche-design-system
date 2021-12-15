import { Page } from 'puppeteer';
import { getElementStyle, selectNode, waitForEventSerialization } from '@porsche-design-system/js/tests/e2e/helpers';
import { baseURL } from '../helpers';

let page: Page;
beforeEach(async () => {
  page = await browser.newPage();
  await page.goto(baseURL, { waitUntil: 'networkidle0' });
  await page.evaluate(() => (window as any).componentsReady());
});
afterEach(async () => await page.close());

const getAlgoliaHitsWrapper = async () => selectNode(page, '.ais-Hits');
const getAlgoliaHits = async () =>
  page.evaluate(() => {
    return Array.from(document.querySelectorAll('.ais-Hits-item'));
  });

const getNavigation = () => selectNode(page, 'p-accordion');
const searchInputSelector = 'input[type="search"]';

const sendAlgoliaRequest = async () =>
  Promise.all([
    page.type(searchInputSelector, 'button'),
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

  xit('should hide hits and show navigation after clearing the search', async () => {
    await sendAlgoliaRequest();
    await page.evaluate((searchInputSelector) => {
      // no query fired by algolia internals when done like this
      (document.querySelector(searchInputSelector) as HTMLInputElement).value = '';
    }, searchInputSelector);

    const algoliaHitsWrapper = await getAlgoliaHitsWrapper();

    expect(await getElementStyle(algoliaHitsWrapper, 'display')).toBe('none');
    expect(await getNavigation()).not.toBeNull();
  });

  xit('should hide hits after pressing ESC', async () => {
    await sendAlgoliaRequest();
    await page.focus(searchInputSelector);
    // not doing what chrome / safari do
    // firefox escape on input field does not clear it
    await page.keyboard.press('Escape');
    const algoliaHitsWrapper = await getAlgoliaHitsWrapper();

    expect(await getElementStyle(algoliaHitsWrapper, 'display')).toBe('none');
    expect(await getNavigation()).not.toBeNull();
  });
});
