import { Page } from 'puppeteer';
import { goto, getConsoleErrorsAmount, initConsoleObserver } from '../helpers';
import * as path from 'path';
import * as fs from 'fs';

let page: Page;

beforeEach(async () => {
  page = await browser.newPage();
  initConsoleObserver(page);
});
afterEach(async () => await page.close());

const filePath = path.resolve(
  require.resolve('@porsche-design-system/components-angular'),
  '../../../../src/app/app-routing.module.ts'
);
const fileContent = fs.readFileSync(filePath, 'utf-8');

const [, rawRoutes] = /const routes.*(\[(?:.|\s)*\]);/.exec(fileContent) || [];
const routes: { name: string; path: string; component: string }[] = eval(
  rawRoutes
    .replace(/\.\.\.\[(?:.|\s)*?\].*/, '') // get rid of generatedRoutes
    .replace(/(from(?:Pages|Examples)\.\w+)/g, "'$1'")
);

const exampleRoutes = routes.filter((item) => item.component?.startsWith('fromExamples.'));
const exampleUrls = exampleRoutes.map((item) => item.path);

it.each(exampleUrls)('should work without error for %s', async (exampleUrl) => {
  await goto(page, exampleUrl);
  expect(getConsoleErrorsAmount()).toBe(0);

  await page.evaluate(() => console.error('test error'));
  expect(getConsoleErrorsAmount()).toBe(1);
});
