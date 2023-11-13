import type { ElementHandle, Page } from 'puppeteer';
import { goto } from '../helpers';
import type { Theme } from '@porsche-design-system/components-vue';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

it('should change p-accordion theme to dark', async () => {
  await goto(page, 'accordion-example');

  const accordion = await page.$('p-accordion');
  const getTheme = (handle: ElementHandle<Element>): Promise<Theme> => handle.evaluate((el) => (el as any).theme);
  expect(await getTheme(accordion)).toBe('light');

  await page.select('select[name="theme"]', 'dark');
  expect(await getTheme(accordion)).toBe('dark');
});
