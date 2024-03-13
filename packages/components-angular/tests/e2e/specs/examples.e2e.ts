import { test, expect } from '@playwright/test';
import { goto, getConsoleErrorsAmount, getConsoleWarningsAmount, initConsoleObserver } from '../helpers';
import * as path from 'path';
import * as fs from 'fs';

test.beforeEach(async ({ page }) => {
  initConsoleObserver(page);
});

const filePath = path.resolve('./src/app/app-routing.module.ts');

const fileContent = fs.readFileSync(filePath, 'utf8');

const [, rawRoutes] = /const routes.*(\[[\s\S]*\]);/.exec(fileContent) || [];
const routes: { name: string; path: string; component: string }[] = eval(
  rawRoutes
    .replace(/\.\.\.fromPages\.generatedRoutes.+/, '') // get rid of generatedRoutes
    .replace(/(from(?:Pages|Examples|Styles)\.\w+)/g, "'$1'")
).filter(({ component }) => component);

const exampleRoutes = routes.filter((item) => item.component.startsWith('fromExamples.'));
const exampleUrls = exampleRoutes.map((item) => item.path);

for (const exampleUrl of exampleUrls) {
  test(`should work without error or warning for ${exampleUrl}`, async ({ page }) => {
    await goto(page, exampleUrl);
    expect(getConsoleErrorsAmount()).toBe(0);
    expect(getConsoleWarningsAmount()).toBe(0);

    await page.evaluate(() => console.error('test error'));
    expect(getConsoleErrorsAmount()).toBe(1);

    await page.evaluate(() => console.warn('test warning'));
    expect(getConsoleWarningsAmount()).toBe(1);
  });
}
