import { test } from '@porsche-design-system/testing/playwright';
import { goto } from '../helpers';
import * as path from 'path';
import * as fs from 'fs';

const filePath = path.resolve('./src/app/app-routing.module.ts');

const fileContent = fs.readFileSync(filePath, 'utf8');

const [, rawRoutes] = /const routes.*(\[[\s\S]*\]);/.exec(fileContent) || [];
const routes: { name: string; path: string; component: string }[] = eval(
  rawRoutes
    .replace(/\.\.\.fromPages\.generatedRoutes.+/, '') // get rid of generatedRoutes
    .replace(/(from(?:Pages|Examples|Styles)\.\w+)/g, "'$1'")
).filter(({ component }: { component: string }) => component);

const exampleRoutes = routes.filter((item) => item.component.startsWith('fromExamples.'));
const exampleUrls = exampleRoutes.map((item) => item.path);

for (const exampleUrl of exampleUrls) {
  test(`should work without error or warning for ${exampleUrl}`, async ({ page }) => {
    // AG Grid Enterprise logs a license error for every grid, so these pages can never be console clean
    test.skip(exampleUrl.endsWith('-enterprise'));
    await goto(page, exampleUrl);
  });
}
