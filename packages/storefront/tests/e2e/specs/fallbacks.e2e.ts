import { baseURL } from '../helpers';
import type { Page } from 'puppeteer';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const isElementVisible = async (page: Page, cssSelector: string): Promise<boolean> => {
  let visible = true;
  await page.waitForSelector(cssSelector, { visible: true, timeout: 2000 }).catch(() => {
    visible = false;
  });
  return visible;
};

it('should show browser support fallback', async () => {
  const fallbackID = 'porsche-design-system-fallbacks-browser-support';

  await page.goto(`${baseURL}/partials/browser-support-fallback-script`);
  await page.evaluate(() => (window as any).componentsReady());

  expect(await isElementVisible(page, `#${fallbackID}`)).toBe(false);

  const [buttonElement] = await page.$x(`//p-button[contains(., 'Force display of browser support fallback')]`);
  await buttonElement.click();

  expect(await isElementVisible(page, `#${fallbackID}`)).toBe(true);
});

it('should show cookies fallback', async () => {
  const fallbackID = 'porsche-design-system-fallbacks-cookies';

  await page.goto(`${baseURL}/partials/cookies-fallback-script`);
  await page.evaluate(() => (window as any).componentsReady());

  expect(await isElementVisible(page, `#${fallbackID}`)).toBe(false);

  const [buttonElement] = await page.$x(`//p-button[contains(., 'Force display of cookies fallback')]`);
  await buttonElement.click();

  expect(await isElementVisible(page, `#${fallbackID}`)).toBe(true);
});
