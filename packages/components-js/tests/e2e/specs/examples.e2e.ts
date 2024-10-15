import { expect, test } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';
import {
  getConsoleErrorMessages,
  getConsoleErrorsAmount,
  getConsoleWarningMessages,
  getConsoleWarningsAmount,
  goto,
  initConsoleObserver,
} from '../helpers';

test.beforeEach(async ({ page }) => {
  initConsoleObserver(page);
});
test.afterEach(async ({ page }) => await page.close());

const filePath = path.resolve(require.resolve('@porsche-design-system/components-js'), '../../../../index.html');
const fileContent = fs.readFileSync(filePath, 'utf8');

const [, rawOptions] = /<optgroup label="Examples">.*([\s\S]*?)<\/optgroup>/.exec(fileContent) || [];
const routes: { name: string; path: string }[] = rawOptions
  .split('\n')
  .filter((x) => x.trim())
  .map((option) => {
    const [, path, name] = /<option value="([a-z-]+)">([a-zA-Z ]+)<\/option>/.exec(option) || [];
    return { name, path };
  })
  .filter(({ path }) => path);

const exampleRoutes = routes.filter((item) => item.path.includes('example'));
const exampleUrls = exampleRoutes.map((item) => item.path);

for (const url of exampleUrls) {
  test(`if example at ${url} works without error or warning`, async ({ page, browserName }) => {
    test.skip(browserName !== 'chromium');
    // Skip AG Grid pages since they will show licensing errors
    test.skip(['ag-grid-example', 'ag-grid-example-storefront'].includes(url));
    await goto(page, url);

    if (getConsoleErrorsAmount() !== 0) {
      console.log(getConsoleErrorMessages());
    }
    expect(getConsoleErrorsAmount()).toBe(0);

    if (getConsoleWarningsAmount() !== 0) {
      console.log(getConsoleWarningMessages());
    }
    expect(getConsoleWarningsAmount()).toBe(0);

    await page.evaluate(() => console.error('test error'));
    expect(getConsoleErrorsAmount()).toBe(1);

    await page.evaluate(() => console.warn('test warning'));
    expect(getConsoleWarningsAmount()).toBe(1);
  });
}
