import type { Page } from 'puppeteer';
import { goto } from '../helpers';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

it('should correctly set activeTabIndex on p-tabs-bar', async () => {
  await goto(page, 'tabs-bar-navigation-bug');

  const getTabsBarActiveTabIndex = (): Promise<number> => page.$eval('p-tabs-bar', (el) => (el as any).activeTabIndex);
  const getHeadingText = (): Promise<string> => page.$eval('p-heading', (el) => el.textContent);

  expect(await getTabsBarActiveTabIndex()).toBe(0);
  expect(await getHeadingText()).toBe('Bug Page 1');

  const [, link2] = await page.$$('a');
  await Promise.all([page.waitForNavigation(), link2.click()]);
  expect(await getTabsBarActiveTabIndex()).toBe(1);
  expect(await getHeadingText()).toBe('Bug Page 2');

  const [, , link3] = await page.$$('a');
  await Promise.all([page.waitForNavigation(), link3.click()]);
  expect(await getTabsBarActiveTabIndex()).toBe(2);
  expect(await getHeadingText()).toBe('Bug Page 3');

  const [link1] = await page.$$('a');
  await Promise.all([page.waitForNavigation(), link1.click()]);
  expect(await getTabsBarActiveTabIndex()).toBe(0);
  expect(await getHeadingText()).toBe('Bug Page 1');
});
