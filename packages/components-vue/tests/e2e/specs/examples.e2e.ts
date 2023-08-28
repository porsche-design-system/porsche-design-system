import type { Page } from 'puppeteer';
import { goto, initConsoleObserver, getConsoleErrorsAmount, getConsoleWarningsAmount } from '../helpers';
import * as fs from 'fs';
import * as path from 'path';

let page: Page;

beforeEach(async () => {
  page = await browser.newPage();
  initConsoleObserver(page);
});

afterEach(async () => await page.close());

const filePath = path.resolve(
  require.resolve('@porsche-design-system/components-vue'),
  '../../../../src/router/index.ts'
);
const fileContent = fs.readFileSync(filePath, 'utf8');

const [, rawRoutes] = /const routes.*(\[[\s\S]*\]);/.exec(fileContent) || [];
const routes: { name: string; path: string; component: string }[] = eval(
  rawRoutes
    .replace(/\.\.\..*/, '') // get rid of generatedRoutes
    .replace(/(from(?:Pages|Examples|Styles)\.\w+)/g, "'$1'")
).filter(({ component }) => component);

const exampleRoutes = routes.filter((item) => item.component.startsWith('fromExamples.'));
const exampleUrls = exampleRoutes.map((item) => item.path);

it.each(exampleUrls)('should work without error or warning for %s', async (exampleUrl) => {
  await goto(page, exampleUrl);
  expect(getConsoleErrorsAmount()).toBe(0);
  expect(getConsoleWarningsAmount()).toBe(0);

  await page.evaluate(() => console.error('test error'));
  expect(getConsoleErrorsAmount()).toBe(1);

  await page.evaluate(() => console.warn('test warning'));
  expect(getConsoleWarningsAmount()).toBe(1);
});
