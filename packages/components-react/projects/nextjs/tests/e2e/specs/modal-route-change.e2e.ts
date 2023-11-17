import type { Page } from 'puppeteer';
import { goto, getAttribute, selectNode } from '../helpers';

let page: Page;

beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const pageUrl = '/modal-route-change';
const getOpenModalBtn = () => selectNode(page, 'p-button >>> button');
const getLinkToModal = () => selectNode(page, 'p-link a[href="/modal-route-change/open"]');
const getDismissButton = () => selectNode(page, 'p-modal >>> p-button-pure >>> button');
const getBodyStyle = async () => getAttribute(await selectNode(page, 'body'), 'style');

fit('should keep same scroll position when modal is opened and closed', async () => {
  await goto(page, pageUrl);
  expect(await getBodyStyle()).toBe(null);

  const linkToModal = await getLinkToModal();
  expect(await linkToModal.isIntersectingViewport()).toBeFalsy();
  await linkToModal.scrollIntoView();
  expect(await linkToModal.isIntersectingViewport()).toBeTruthy();

  await linkToModal.click();
  await page.waitForSelector('p-modal');
  expect(await linkToModal.isIntersectingViewport()).toBeTruthy();

  const dismissButton = await getDismissButton()
  await dismissButton.click()
  expect(await linkToModal.isIntersectingViewport()).toBeTruthy();
});

fit('should keep same scroll position when modal is opened and closed with route change', async () => {
  await goto(page, pageUrl);
  expect(await getBodyStyle()).toBe(null);

  const openModalBtn = await getOpenModalBtn();
  expect(await openModalBtn.isIntersectingViewport()).toBeFalsy();
  await openModalBtn.scrollIntoView();
  expect(await openModalBtn.isIntersectingViewport()).toBeTruthy();

  await openModalBtn.click();
  await page.waitForSelector('p-modal');
  expect(await openModalBtn.isIntersectingViewport()).toBeTruthy();

  const dismissButton = await getDismissButton()
  await dismissButton.click()
  expect(await openModalBtn.isIntersectingViewport()).toBeTruthy();
});

