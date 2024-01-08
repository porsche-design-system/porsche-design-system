import type { Page } from 'puppeteer';
import { goto, getAttribute, selectNode } from '../helpers';

let page: Page;

beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const pageUrl = '/modal-standalone';
const getOpenModalBtn = () => selectNode(page, 'p-button >>> button');
const getLinkToModal = () => selectNode(page, 'p-link a[href="/modal-standalone/open"]');
const getDismissButton = () => selectNode(page, 'p-modal >>> p-button-pure >>> button');
const getRootElement = () => selectNode(page, 'html');
const getBodyStyle = async () => getAttribute(await selectNode(page, 'body'), 'style');

it('should keep same scroll position when modal is opened and closed with route change', async () => {
  await goto(page, pageUrl);
  expect(await getBodyStyle()).toBe(null);

  const linkToModal = await getLinkToModal();
  const rootElement = await getRootElement();
  expect(await rootElement.evaluate((el) => el.scrollTop)).toBe(0);

  await linkToModal.scrollIntoView();
  expect(await rootElement.evaluate((el) => el.scrollTop)).toBe(336);

  await linkToModal.click();
  await page.waitForSelector('p-modal >>> p-button-pure >>> button');
  expect(await rootElement.evaluate((el) => el.scrollTop)).toBe(336);

  const dismissButton = await getDismissButton();
  await Promise.all([
    page.waitForNavigation({
      waitUntil: 'networkidle0',
    }),
    dismissButton.click(),
  ]);
  await page.waitForFunction(() => !document.querySelector('p-modal'));

  expect(await (await getRootElement()).evaluate((el) => el.scrollTop)).toBe(336);
});

it('should keep same scroll position when modal is opened and closed', async () => {
  await goto(page, pageUrl);
  expect(await getBodyStyle()).toBe(null);

  const openModalBtn = await getOpenModalBtn();
  const rootElement = await getRootElement();
  expect(await rootElement.evaluate((el) => el.scrollTop)).toBe(0);

  await openModalBtn.scrollIntoView();
  expect(await rootElement.evaluate((el) => el.scrollTop)).toBe(336);

  await openModalBtn.click();
  await page.waitForSelector('p-modal >>> p-button-pure >>> button');
  expect(await rootElement.evaluate((el) => el.scrollTop)).toBe(336);

  const dismissButton = await getDismissButton();
  await dismissButton.click();
  expect(await getBodyStyle()).toBe('');
  expect(await rootElement.evaluate((el) => el.scrollTop)).toBe(336);
});
