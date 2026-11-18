import { test } from '@porsche-design-system/testing/playwright';
import * as fs from 'fs';
import * as path from 'path';
import { goto } from '../helpers';

const filePath = path.resolve(require.resolve('@porsche-design-system/components-react'), '../../../../src/routes.tsx');
const fileContent = fs.readFileSync(filePath, 'utf8');

const [, rawRoutes] = /const routes.*(\[[\s\S]*\]);/.exec(fileContent) || [];
const routes: { name: string; path: string; element: string }[] = eval(
  rawRoutes
    .replace(/\.\.\.\[[\s\S]*?\].*/, '') // get rid of generatedRoutes
    .replace(/<(from(?:Pages|Examples|Styles)\.\w+)\s\/>/g, "'$1'")
).filter(({ element }: { element: string }) => element);

const exampleRoutes = routes.filter((item) => item.element.startsWith('fromExamples.'));
const exampleUrls = exampleRoutes.map((item) => item.path.slice(1));

for (const exampleUrl of exampleUrls) {
  test(`should work without error or warning for ${exampleUrl}`, async ({ page }) => {
    // AG Grid Enterprise logs a license error for every grid, so these pages can never be console clean
    test.skip(exampleUrl.endsWith('-enterprise'));
    await goto(page, exampleUrl);
  });
}
