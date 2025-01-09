import { expect, test } from '@playwright/test';
import { initConsoleObserver } from '../helpers';

test.beforeEach(async ({ page }) => {
  initConsoleObserver(page);
});

test('should have working playground tabs and syntax highlight', async ({ page }) => {
  await page.goto('/components/button/examples#variants');
  await page.evaluate(() => (window as any).componentsReady());

  const selectedTab = await page.getByRole('tab', { selected: true }).first();
  expect(await selectedTab.textContent()).toBe('Vanilla JS');

  await page.getByRole('tab', { name: 'Angular' }).first().click();
  const selectedTabSecond = await page.getByRole('tab', { selected: true }).first();
  expect(await selectedTabSecond.textContent()).toBe('Angular');

  const playground = page.locator('.playground').first();
  const code = playground.locator('pre').first();
  expect(code.getByRole('code')).toBeDefined();
  const codeExample = code.getByText('p-button').first();
  expect(codeExample).toBeDefined();
  await expect(codeExample).toHaveCSS('color', 'rgb(0, 114, 153)');

  await page.getByRole('tab', { name: 'React' }).first().click();

  const code2 = playground.locator('pre').first();
  expect(code2.getByRole('code')).toBeDefined();
  const codeExample2 = code2.getByText('PButton').first();
  expect(codeExample2).toBeDefined();
  await expect(codeExample2).toHaveCSS('color', 'rgb(0, 114, 153)');
});

test('should have working playground tabs and syntax highlight when initially selectedFramework is react', async ({
  page,
}) => {
  await page.goto('/');
  const innerLocalStorage = await page.evaluateHandle(() => window.localStorage);
  await innerLocalStorage.evaluate((storage) => storage.setItem('selectedFramework', 'react'));

  await page.goto('/components/button/examples#variants');
  await page.evaluate(() => (window as any).componentsReady());

  const selectedTab = await page.getByRole('tab', { selected: true }).first();
  expect(await selectedTab.textContent()).toBe('React');

  const playground = page.locator('.playground').first();
  const code = playground.locator('pre').first();
  expect(code.getByRole('code')).toBeDefined();
  const codeExample = code.getByText('PButton').first();
  expect(codeExample).toBeDefined();
  await expect(codeExample).toHaveCSS('color', 'rgb(0, 114, 153)');

  await page.getByRole('tab', { name: 'Vue' }).first().click();
  const selectedTabSecond = await page.getByRole('tab', { selected: true }).first();
  expect(await selectedTabSecond.textContent()).toBe('Vue');

  const code2 = playground.locator('pre').first();
  expect(code2.getByRole('code')).toBeDefined();
  const codeExample2 = code2.getByText('PButton').first();
  expect(codeExample2).toBeDefined();
  await expect(codeExample2).toHaveCSS('color', 'rgb(0, 114, 153)');
});
