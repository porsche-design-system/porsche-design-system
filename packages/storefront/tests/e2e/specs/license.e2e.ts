import { baseURL } from '../helpers';
import type { ElementHandle, Page } from 'puppeteer';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const getTitle = (page: Page): Promise<string> => page.$eval('.vmark > h1', (x) => x.innerHTML);
const isLinkActive = async (element: ElementHandle): Promise<boolean> =>
  (await getCssClasses(element)).includes('router-link-active');
const getCssClasses = async (element: ElementHandle): Promise<string> =>
  Object.values((await (await element.getProperty('classList')).jsonValue()) as string).join(' ');

it('should navigate to license', async () => {
  await page.goto(baseURL);
  await page.evaluate(() => (window as any).componentsReady());

  const [linkElement] = await page.$x(`//div[contains(@class, 'menu-desktop')]//footer//a[contains(., 'License')]`);

  expect(await isLinkActive(linkElement)).toBe(false);

  await linkElement.click();
  await page.waitForSelector('.vmark');
  await page.evaluate(() => (window as any).componentsReady());

  expect(await isLinkActive(linkElement)).toBe(true);

  expect(await getTitle(page)).toBe('License');
});
