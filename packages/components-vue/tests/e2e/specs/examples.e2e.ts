import * as fs from 'fs';
import * as path from 'path';
import { expect, test } from '@playwright/test';
import { getConsoleErrorsAmount, getConsoleWarningsAmount, goto, initConsoleObserver } from '../helpers';

test.beforeEach(async ({ page }) => {
  initConsoleObserver(page);
});

const filePath = path.resolve(
  require.resolve('@porsche-design-system/components-vue'),
  '../../../../src/router/index.ts'
);
const fileContent = fs.readFileSync(filePath, 'utf8');

const [, rawRoutes] = /const routes.*(\[[\s\S]*\]);/.exec(fileContent) || [];
const routes: { name: string; path: string; component: string }[] = eval(
  rawRoutes
    .replace(/\.\.\..*/, '') // get rid of generatedRoutes
    .replace(/(from(?:Pages|Examples|VanillaExtractStyles|TailwindStyles)\.\w+)/g, "'$1'")
).filter(({ component }) => component);

const exampleRoutes = routes.filter((item) => item.component.startsWith('fromExamples.'));
const exampleUrls = exampleRoutes.map((item) => item.path);

for (const exampleUrl of exampleUrls) {
  test(`should work without error or warning for "${exampleUrl}"`, async ({ page }) => {
    // TODO: seams like the whole test didn't work as expected before migration to Playwright.
    //  In case navigation happens with `goto()` and `BASE_URL` like before, the test passes but it won't load the page at all.
    test.fixme(
      [
        '/carousel-example-dynamic-slides',
        '/carousel-example-focus-on-center-slide',
        '/carousel-example-events',
        '/carousel-example-jump-to-slide',
        '/inline-notification-example-action-button',
        '/modal-example-accessibility',
        '/select-example',
        '/multi-select-example-dynamic', // TODO: Active once text-field-wrapper validation warning bug is fixed (https://github.com/porsche-design-system/porsche-design-system/issues/3821)
        '/select-example-dynamic', // TODO: Active once text-field-wrapper validation warning bug is fixed (https://github.com/porsche-design-system/porsche-design-system/issues/3821)
        '/text-field-wrapper-example-imask',
        '/text-field-wrapper-example-search',
      ].includes(exampleUrl)
    );
    // Skip AG Grid pages since they will show licensing errors
    test.skip(['/ag-grid-example', '/ag-grid-example-storefront'].includes(exampleUrl));
    await goto(page, exampleUrl);
    expect(getConsoleErrorsAmount()).toBe(0);
    expect(getConsoleWarningsAmount()).toBe(0);

    await page.evaluate(() => console.error('test error'));
    expect(getConsoleErrorsAmount()).toBe(1);

    await page.evaluate(() => console.warn('test warning'));
    expect(getConsoleWarningsAmount()).toBe(1);
  });
}
