import { type Page, expect, test } from '@playwright/test';

const getCurrentUrl = (page: Page): Promise<string> => page.evaluate(() => document.location.pathname);

test.describe('home view', () => {
  test('should route to home', async ({ page }) => {
    await page.goto('/');
    expect(await getCurrentUrl(page)).toBe('/');
  });
});

test.describe('not found view', () => {
  test('should route to 404', async ({ page }) => {
    await page.goto('/404');
    expect(await getCurrentUrl(page)).toBe('/404');
  });

  test('should route to 404 when url is invalid', async ({ page }) => {
    await page.goto('/some/completely/invalid/url');
    expect(await getCurrentUrl(page)).toBe('/404');
  });
});

test.describe('custom view', () => {
  test('should route to custom view', async ({ page }) => {
    await page.goto('/license');
    expect(await getCurrentUrl(page)).toBe('/license');
  });

  test('should route to 404 when passed custom url is invalid', async ({ page }) => {
    await page.goto('/some-invalid-url');
    expect(await getCurrentUrl(page)).toBe('/404');
  });
});

test.describe('page view', () => {
  test('should route to page when no tabs are configured', async ({ page }) => {
    await page.goto('/news/changelog');
    expect(await getCurrentUrl(page)).toBe('/news/changelog');
  });

  test('should route to passed tab of page when tabs are configured', async ({ page }) => {
    await page.goto('/components/heading/examples');
    expect(await getCurrentUrl(page)).toBe('/components/heading/examples');
  });

  test('should redirect to first configured tab of page when no tab is passed', async ({ page }) => {
    await page.goto('/components/heading');
    expect(await getCurrentUrl(page)).toBe('/components/heading/examples');
  });

  test('should redirect to first configured tab of page when passed tab is invalid', async ({ page }) => {
    await page.goto('/components/heading/some-invalid-tab');
    expect(await getCurrentUrl(page)).toBe('/components/heading/examples');
  });

  test('should redirect to 404 when passed category is invalid', async ({ page }) => {
    await page.goto('/some-invalid-category/heading');
    expect(await getCurrentUrl(page)).toBe('/404');
  });

  test('should redirect to 404 when passed page is invalid', async ({ page }) => {
    await page.goto('/components/some-invalid-page');
    expect(await getCurrentUrl(page)).toBe('/404');
  });
});

test.describe('pattern view', () => {
  test('should route to pattern', async ({ page }) => {
    await page.goto('/patterns/forms/example/login');
    expect(await getCurrentUrl(page)).toBe('/patterns/forms/example/login');
  });

  test('should redirect to 404 when category is invalid', async ({ page }) => {
    await page.goto('/patterns/some-invalid-category/example-login');
    expect(await getCurrentUrl(page)).toBe('/404');
  });

  test('should redirect to 404 when pattern is invalid', async ({ page }) => {
    await page.goto('/patterns/forms/example/some-invalid-pattern');
    expect(await getCurrentUrl(page)).toBe('/404');
  });
});
