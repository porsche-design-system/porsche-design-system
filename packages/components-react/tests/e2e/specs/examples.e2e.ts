import { Page } from 'puppeteer';
import { goto, initConsoleObserver, getConsoleErrorsAmount } from '../helpers';
import * as fs from 'fs';
import * as path from 'path';

let page: Page;

beforeEach(async () => {
  page = await browser.newPage();
  initConsoleObserver(page);
});
afterEach(async () => await page.close());

const filePath = path.resolve(require.resolve('@porsche-design-system/components-react'), '../../../src/routes.tsx');
const fileContent = fs.readFileSync(filePath, 'utf-8');

const [, rawRoutes] = /const routes.*(\[(?:.|\s)*\]);/.exec(fileContent) || [];
const routes: { name: string; path: string; component: string }[] = eval(
  rawRoutes
    .replace(/\.\.\.\[(?:.|\s)*?\].*/, '') // get rid of generatedRoutes
    .replace(/(from(?:Pages|Examples)\.\w+)/g, "'$1'")
);

const exampleRoutes = routes.filter((item) => item.component?.startsWith('fromExamples.'));
const exampleUrls = exampleRoutes.map((item) => item.path.substr(1));

it.each(exampleUrls)('should work without error for %s', async (exampleUrl) => {
  await goto(page, exampleUrl);
  expect(getConsoleErrorsAmount()).toBe(0);

  await page.evaluate(() => console.error('test error'));
  expect(getConsoleErrorsAmount()).toBe(1);
});
