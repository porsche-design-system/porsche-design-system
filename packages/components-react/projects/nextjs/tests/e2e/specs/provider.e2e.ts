import { type ElementHandle, test, expect } from '@playwright/test';
import { goto } from '../helpers';
import { type Theme } from '@porsche-design-system/components-react';

test('should provide global theme correctly to 4th p-button', async ({ page }) => {
  await goto(page, 'theme-injection');

  const [button1, button2, button3, button4Initial] = await page.locator('p-button').all();
  const getTheme = (handle: ElementHandle<Element>): Promise<Theme> => handle.evaluate((el) => (el as any).theme);
  expect(await getTheme(button1)).toBe('light');
  expect(await getTheme(button2)).toBe('dark');
  expect(await getTheme(button3)).toBe('light');
  expect(button4Initial).toBeUndefined();

  // conditionally render button4
  await button3.click();
  const [, , , button4Render1] = await page.locator('p-button').all();
  expect(button4Render1).toBeDefined();
  expect(await getTheme(button4Render1)).toBe('light');

  // change global theme
  page.locator('select[name="theme"]').selectOption('dark');
  expect(await getTheme(button3)).toBe('dark');
  expect(await getTheme(button4Render1)).toBe('dark');

  // remove button4
  await button3.click();
  const [, , , button4] = await page.locator('p-button').all();
  expect(button4).toBeUndefined();

  // render button4 again
  await button3.click();
  const [, , , button4Render2] = await page.locator('p-button').all();
  expect(button4Render2).toBeDefined();
  expect(await getTheme(button4Render2)).toBe('dark');

  // change global theme
  page.locator('select[name="theme"]').selectOption('light');
  expect(await getTheme(button3)).toBe('light');
  expect(await getTheme(button4Render2)).toBe('light');
});
