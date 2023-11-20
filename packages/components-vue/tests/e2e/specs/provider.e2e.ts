import type { ElementHandle, Page } from 'puppeteer';
import { goto } from '../helpers';
import type { Theme } from '@porsche-design-system/components-vue';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

it('should provide global theme correctly to 4th p-button', async () => {
  await goto(page, 'theme-injection');

  const [button1, button2, button3, button4Initial] = await page.$$('p-button');
  const getTheme = (handle: ElementHandle<Element>): Promise<Theme> => handle.evaluate((el) => (el as any).theme);
  expect(await getTheme(button1)).toBe('light');
  expect(await getTheme(button2)).toBe('dark');
  expect(await getTheme(button3)).toBe('light');
  expect(button4Initial).toBeUndefined();

  // conditionally render button4
  await button3.click();
  const [, , , button4Render1] = await page.$$('p-button');
  expect(button4Render1).toBeDefined();
  expect(await getTheme(button4Render1)).toBe('light');

  // change global theme
  await page.select('select[name="theme"]', 'dark');
  expect(await getTheme(button3)).toBe('dark');
  expect(await getTheme(button4Render1)).toBe('dark');

  // remove button4
  await button3.click();
  const [, , , button4] = await page.$$('p-button');
  expect(button4).toBeUndefined();

  // render button4 again
  await button3.click();
  const [, , , button4Render2] = await page.$$('p-button');
  expect(button4Render2).toBeDefined();
  expect(await getTheme(button4Render2)).toBe('dark');

  // change global theme
  await page.select('select[name="theme"]', 'light');
  expect(await getTheme(button3)).toBe('light');
  expect(await getTheme(button4Render2)).toBe('light');
});
