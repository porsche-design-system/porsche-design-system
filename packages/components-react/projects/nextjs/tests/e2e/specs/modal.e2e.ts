import { type Page, test, expect } from '@playwright/test';
import { goto, getAttribute } from '../helpers';
import { viewportWidthM } from '@porsche-design-system/shared/testing/playwright.vrt.config';

const pageUrl = '/modal-standalone';
const getOpenModalBtn = (page: Page) => page.getByRole('button', { name: 'Open Modal (without route change)' }); // selectNode(page, 'p-button >>> button');
const getLinkToModal = (page: Page) => page.getByRole('link', { name: 'Link to Modal (with route change)' }); // selectNode(page, 'p-link a[href="/modal-standalone/open"]');
const getDismissButton = (page: Page) => page.getByRole('button', { name: 'Dismiss modal' }); // selectNode(page, 'p-modal >>> p-button-pure >>> button');
const getRootElement = (page: Page) => page.$('html');
const getBodyStyle = async (page: Page) => getAttribute(await page.$('body'), 'style');

test.use({
  // ensures expected scroll positions are the same
  viewport: { width: viewportWidthM, height: 600 },
});

test('should keep same scroll position when modal is opened and closed with route change', async ({ page }) => {
  await goto(page, pageUrl);
  expect(await getBodyStyle(page)).toBe(null);

  const linkToModal = await getLinkToModal(page);
  const rootElement = await getRootElement(page);
  expect(await rootElement.evaluate((el) => el.scrollTop)).toBe(0);

  await linkToModal.scrollIntoViewIfNeeded();
  expect(await rootElement.evaluate((el) => el.scrollTop)).toBe(532);

  await linkToModal.click();
  expect(await rootElement.evaluate((el) => el.scrollTop)).toBe(532);

  await page.waitForLoadState();
  const dismissButton = await getDismissButton(page);

  expect(await rootElement.evaluate((el) => el.scrollTop)).toBe(532);

  await dismissButton.click();

  await page.waitForFunction(() => !document.querySelector('p-modal'));
  expect(await rootElement.evaluate((el) => el.scrollTop)).toBe(532);
});

test('should keep same scroll position when modal is opened and closed', async ({ page }) => {
  await goto(page, pageUrl);
  expect(await getBodyStyle(page)).toBe(null);

  const openModalBtn = await getOpenModalBtn(page);
  const rootElement = await getRootElement(page);
  expect(await rootElement.evaluate((el) => el.scrollTop)).toBe(0);

  await openModalBtn.scrollIntoViewIfNeeded();
  expect(await rootElement.evaluate((el) => el.scrollTop)).toBe(532);

  await openModalBtn.click();
  expect(await rootElement.evaluate((el) => el.scrollTop)).toBe(532);

  await page.waitForLoadState();
  const dismissButton = await getDismissButton(page);
  await dismissButton.click();

  expect(await getBodyStyle(page)).toBe('');
  expect(await rootElement.evaluate((el) => el.scrollTop)).toBe(532);
});
