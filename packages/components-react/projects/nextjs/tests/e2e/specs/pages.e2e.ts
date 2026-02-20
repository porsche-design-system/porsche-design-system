import { expect, test } from '@playwright/test';
import { routes } from '../../../routes';
import { getConsoleErrorsAmount, goto, initConsoleObserver } from '../helpers';

test.beforeEach(async ({ page }) => {
  initConsoleObserver(page);
});

const pageUrls = routes.map((item) => item.path).filter((url) => url !== '/streaming');

for (const pageUrl of pageUrls) {
  test(`should work without error or warning for ${pageUrl}`, async ({ page }) => {
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
