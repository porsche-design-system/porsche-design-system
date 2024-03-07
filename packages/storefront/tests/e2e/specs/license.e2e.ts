import { type Page, type ElementHandle, test, expect } from '@playwright/test';
import { baseURL, getProperty } from '../helpers';

const getTitle = (page: Page): Promise<string> => page.$eval('.vmark > h1', (x) => x.innerHTML);
const isLinkActive = async (element: ElementHandle): Promise<boolean> =>
  (await getCssClasses(element)).includes('router-link-active');
const getCssClasses = async (element: ElementHandle): Promise<string> =>
  Object.values(await getProperty(element, 'classList')).join(' ');

test('should navigate to license', async ({ page }) => {
  await page.goto(baseURL);

  const linkElement = await page.locator(
    `xpath=//div[contains(@class, 'menu-desktop')]//footer//a[contains(., 'License')]`
  );

  expect(await isLinkActive(linkElement)).toBe(false);

  await linkElement.click();

  expect(await isLinkActive(linkElement)).toBe(true);
  expect(await getTitle(page)).toBe('License');
  expect(true).toBe(true);
});
