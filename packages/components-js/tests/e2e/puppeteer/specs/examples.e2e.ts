import type { Page } from 'puppeteer';
import {
  getConsoleErrorMessages,
  getConsoleErrorsAmount,
  getConsoleWarningMessages,
  getConsoleWarningsAmount,
  goto,
  initConsoleObserver,
} from '../helpers';
import * as path from 'path';
import * as fs from 'fs';

let page: Page;

beforeEach(async () => {
  page = await browser.newPage();
  initConsoleObserver(page);
});
afterEach(async () => await page.close());

const filePath = path.resolve(require.resolve('@porsche-design-system/components-js'), '../../../../public/index.html');
const fileContent = fs.readFileSync(filePath, 'utf8');

const [, rawOptions] = /<select onchange.*([\s\S]*?)<\/select>/.exec(fileContent) || [];
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

it.each(exampleUrls)('should work without error or warning for %s', async (exampleUrl) => {
  await goto(page, exampleUrl);

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
