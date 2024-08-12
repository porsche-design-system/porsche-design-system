import { test, expect } from '@playwright/test';
import { goto } from '../helpers';

test('should correctly set activeTabIndex on p-tabs-bar', async ({ page }) => {
  await goto(page, 'tabs-bar-navigation-bug');

  const getTabsBarActiveTabIndex = (): Promise<number> =>
    page.locator('p-tabs-bar').evaluate((el) => (el as any).activeTabIndex);
  const getHeadingText = (): Promise<string> => page.locator('p-heading').evaluate((el) => el.textContent);

  expect(await getTabsBarActiveTabIndex()).toBe(0);
  expect(await getHeadingText()).toBe('Bug Page 1');

  const [, link2] = await page.locator('a').all();
  await Promise.all([page.waitForURL(page.url()), link2.click()]);
  expect(await getTabsBarActiveTabIndex()).toBe(1);
  expect(await getHeadingText()).toBe('Bug Page 2');

  const [, , link3] = await page.locator('a').all();
  await Promise.all([page.waitForURL(page.url()), link3.click()]);
  expect(await getTabsBarActiveTabIndex()).toBe(2);
  expect(await getHeadingText()).toBe('Bug Page 3');

  const [link1] = await page.locator('a').all();
  await Promise.all([page.waitForURL(page.url()), link1.click()]);
  expect(await getTabsBarActiveTabIndex()).toBe(0);
  expect(await getHeadingText()).toBe('Bug Page 1');
});
