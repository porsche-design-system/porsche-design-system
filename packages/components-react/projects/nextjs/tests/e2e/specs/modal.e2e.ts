import { expect, type Page, test } from '@playwright/test';
import { goto } from '../helpers';

const getModal = (page: Page) => page.locator('p-modal');
const getOpenModalBtn = (page: Page) => page.getByRole('button', { name: 'Open Modal (without route change)' });
const getLinkToModal = (page: Page) => page.getByRole('link', { name: 'Link to Modal (with route change)' });
const getDismissButton = (page: Page) => page.getByRole('button', { name: 'Dismiss modal' });

async function getScrollPosition(page: Page): Promise<number> {
  return page.evaluate(() => window.scrollY);
}

test.use({
  // ensures expected scroll positions are the same
  viewport: { width: 1000, height: 600 },
});

test('should keep same scroll position when modal is opened and closed with route change', async ({ page }) => {
  await goto(page, '/modal-standalone');
  expect(await getScrollPosition(page)).toBe(0);

  await getLinkToModal(page).scrollIntoViewIfNeeded();
  await expect.poll(async () => getScrollPosition(page)).toBe(512);

  await getLinkToModal(page).click();
  await expect.poll(async () => getScrollPosition(page)).toBe(512);

  await page.waitForLoadState();
  await expect.poll(async () => getScrollPosition(page)).toBe(512);

  await getDismissButton(page).click();
  await expect(getModal(page)).toBeHidden();
  await expect.poll(async () => getScrollPosition(page)).toBe(512);
});

test('should keep same scroll position when modal is opened and closed', async ({ page }) => {
  await goto(page, '/modal-standalone');
  expect(await getScrollPosition(page)).toBe(0);

  await getOpenModalBtn(page).scrollIntoViewIfNeeded();
  await expect.poll(async () => getScrollPosition(page)).toBe(512);

  await getOpenModalBtn(page).click();
  await expect.poll(async () => getScrollPosition(page)).toBe(512);

  await page.waitForLoadState();
  await expect.poll(async () => getScrollPosition(page)).toBe(512);

  await getDismissButton(page).click();
  await expect(getModal(page)).toBeHidden();
  await expect.poll(async () => getScrollPosition(page)).toBe(512);
});
