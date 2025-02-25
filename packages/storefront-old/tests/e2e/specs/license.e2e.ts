import { expect, Locator, type Page, test } from '@playwright/test';
import { getProperty } from '../helpers';

const getTitle = (page: Page): Promise<string> => page.locator('.vmark > h1').evaluate((x) => x.innerHTML);
const isLinkActive = async (element: Locator): Promise<boolean> =>
  (await getCssClasses(element)).includes('router-link-active');
const getCssClasses = async (element: Locator): Promise<string> =>
  Object.values(await getProperty(element, 'classList')).join(' ');

test('should navigate to license', async ({ page }) => {
  await page.goto('/');

  const linkElement = page.locator(`xpath=//div[contains(@class, 'menu-desktop')]//footer//a[contains(., 'License')]`);

  expect(await isLinkActive(linkElement)).toBe(false);

  await linkElement.click();

  expect(await isLinkActive(linkElement)).toBe(true);
  expect(await getTitle(page)).toBe('License');
  expect(true).toBe(true);
});
