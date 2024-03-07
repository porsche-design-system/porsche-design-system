import { type Page, test, expect } from '@playwright/test';
import { baseURL } from '../helpers';

const getCurrentUrl = (page: Page): Promise<string> => page.evaluate(() => document.location.href);
const buildUrl = (path?: string): string => `${baseURL}${path}`;

test.describe('home view', () => {
  test('should route to home', async ({ page }) => {
    await page.goto(buildUrl('/'));
    expect(await getCurrentUrl(page)).toBe(buildUrl('/'));
  });
});

test.describe('not found view', () => {
  test('should route to 404', async ({ page }) => {
    await page.goto(buildUrl('/404'));
    expect(await getCurrentUrl(page)).toBe(buildUrl('/404'));
  });

  test('should route to 404 when url is invalid', async ({ page }) => {
    await page.goto(buildUrl('/some/completely/invalid/url'));
    expect(await getCurrentUrl(page)).toBe(buildUrl('/404'));
  });
});

test.describe('custom view', () => {
  test('should route to custom view', async ({ page }) => {
    await page.goto(buildUrl('/license'));
    expect(await getCurrentUrl(page)).toBe(buildUrl('/license'));
  });

  test('should route to 404 when passed custom url is invalid', async ({ page }) => {
    await page.goto(buildUrl('/some-invalid-url'));
    expect(await getCurrentUrl(page)).toBe(buildUrl('/404'));
  });
});

test.describe('page view', () => {
  test('should route to page when no tabs are configured', async ({ page }) => {
    await page.goto(buildUrl('/news/changelog'));
    expect(await getCurrentUrl(page)).toBe(buildUrl('/news/changelog'));
  });

  test('should route to passed tab of page when tabs are configured', async ({ page }) => {
    await page.goto(buildUrl('/components/heading/examples'));
    expect(await getCurrentUrl(page)).toBe(buildUrl('/components/heading/examples'));
  });

  test('should redirect to first configured tab of page when no tab is passed', async ({ page }) => {
    await page.goto(buildUrl('/components/heading'));
    expect(await getCurrentUrl(page)).toBe(buildUrl('/components/heading/examples'));
  });

  test('should redirect to first configured tab of page when passed tab is invalid', async ({ page }) => {
    await page.goto(buildUrl('/components/heading/some-invalid-tab'));
    expect(await getCurrentUrl(page)).toBe(buildUrl('/components/heading/examples'));
  });

  test('should redirect to 404 when passed category is invalid', async ({ page }) => {
    await page.goto(buildUrl('/some-invalid-category/heading'));
    expect(await getCurrentUrl(page)).toBe(buildUrl('/404'));
  });

  test('should redirect to 404 when passed page is invalid', async ({ page }) => {
    await page.goto(buildUrl('/components/some-invalid-page'));
    expect(await getCurrentUrl(page)).toBe(buildUrl('/404'));
  });
});

test.describe('pattern view', () => {
  test('should route to pattern', async ({ page }) => {
    await page.goto(buildUrl('/patterns/forms/example/login'));
    expect(await getCurrentUrl(page)).toBe(buildUrl('/patterns/forms/example/login'));
  });

  test('should redirect to 404 when category is invalid', async ({ page }) => {
    await page.goto(buildUrl('/patterns/some-invalid-category/example-login'));
    expect(await getCurrentUrl(page)).toBe(buildUrl('/404'));
  });

  test('should redirect to 404 when pattern is invalid', async ({ page }) => {
    await page.goto(buildUrl('/patterns/forms/example/some-invalid-pattern'));
    expect(await getCurrentUrl(page)).toBe(buildUrl('/404'));
  });
});
