import { test } from '@porsche-design-system/testing/playwright';
import * as fs from 'fs';
import * as path from 'path';
import { goto } from '../helpers';

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
    // AG Grid Enterprise logs a license error for every grid, so these pages can never be console clean
    test.skip(url.endsWith('-enterprise'));
    await goto(page, url);
  });
}
