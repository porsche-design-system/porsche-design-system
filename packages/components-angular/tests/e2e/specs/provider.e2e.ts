import type { ElementHandle, Page } from 'puppeteer';
import { goto } from '../helpers';
import type { Theme } from '@porsche-design-system/components-react';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

it('should change p-button theme to dark', async () => {
  await goto(page, 'button');

  const button = await page.$('p-button');
  const getTheme = (handle: ElementHandle<Element>): Promise<Theme> => handle.evaluate((el) => (el as any).theme);
  expect(await getTheme(button)).toBe('light');

  await page.select('select[name="theme"]', 'dark');
  expect(await getTheme(button)).toBe('dark');
});
