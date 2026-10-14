import { expect, test } from '@playwright/test';
import { goto } from '../helpers';

test('should correctly set activeTabIndex on p-tabs-bar', async ({ page }) => {
  await goto(page, 'tabs-bar-navigation-bug');

  const tabsBar = page.locator('p-tabs-bar');
  const heading = page.locator('p-heading');

  await expect(tabsBar).toHaveJSProperty('activeTabIndex', 0);
  await expect(heading).toHaveText('Bug Page 1');

  const [, link2] = await page.locator('a').all();
  await link2.click();
  await expect(tabsBar).toHaveJSProperty('activeTabIndex', 1);
  await expect(heading).toHaveText('Bug Page 2');

  const [, , link3] = await page.locator('a').all();
  await link3.click();
  await expect(tabsBar).toHaveJSProperty('activeTabIndex', 2);
  await expect(heading).toHaveText('Bug Page 3');

  const [link1] = await page.locator('a').all();
  await link1.click();
  await expect(tabsBar).toHaveJSProperty('activeTabIndex', 0);
  await expect(heading).toHaveText('Bug Page 1');
});
