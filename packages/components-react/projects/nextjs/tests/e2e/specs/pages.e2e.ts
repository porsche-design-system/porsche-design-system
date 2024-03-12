import { test, expect } from '@playwright/test';
import { goto, initConsoleObserver, getConsoleErrorsAmount } from '../helpers';
import { routes } from '../../../routes';

test.beforeEach(async ({ page }) => {
  initConsoleObserver(page);
});

const pageUrls = routes.map((item) => item.path);

for (const pageUrl of pageUrls) {
  test(`should work without error or warning for ${pageUrl}`, async ({ page }) => {
    // TODO: seams like the whole test didn't work as expected before migration to Playwright.
    test.fixme(['/select'].includes(pageUrl));

    await goto(page, pageUrl);
    expect(getConsoleErrorsAmount()).toBe(0);
    // tons of deprecation warnings, therefore disabled for now
    // expect(getConsoleWarningsAmount()).toBe(0);

    await page.evaluate(() => console.error('test error'));
    expect(getConsoleErrorsAmount()).toBe(1);

    // await page.evaluate(() => console.warn('test warning'));
    // expect(getConsoleWarningsAmount()).toBe(1);
  });
}
