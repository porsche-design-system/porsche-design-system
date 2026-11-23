import fs from 'node:fs';
import path from 'node:path';
import { frameworkExamples } from '@porsche-design-system/examples-framework';
import { pageExamples } from '@porsche-design-system/examples-pages';
import { accessibilityExamples, storyExamples } from '@porsche-design-system/examples-stories';
import { generatedHeader } from '../lib/build';

/**
 * Makes every example importable by its id, `@porsche-design-system/examples/<id>`: one module per example below
 * `generated/`, which re-exports the module of its project – its data and what renders it. A page imports the examples
 * it shows, so it loads their stories and previews only.
 */

const generatedDir = path.resolve(__dirname, '../generated');
const header = generatedHeader('the examples of every project');

/** From `generated/<id>.ts` up to this package: `components/button/form` → `../../../`. */
const toPackageDir = (id: string): string => '../'.repeat(id.split('/').length);

const modules = new Map<string, string>();
const add = (id: string, source: string): void => {
  if (modules.has(id)) {
    throw new Error(`[examples] two projects have an example "${id}"`);
  }
  modules.set(id, source);
};

/**
 * Re-exports the module of an example from its project, typed by its id: the typecheck of `build:site` fails for a
 * module that drifts from its type in `src/module.ts`.
 */
const reExport = (project: string, id: string): string =>
  [
    `import type { ExampleModuleOf } from '${toPackageDir(id)}src/module';`,
    `import example from '@porsche-design-system/${project}/examples/${id}';`,
    '',
    `export default example satisfies ExampleModuleOf<'${id}'>;`,
  ].join('\n');

for (const id of [...Object.keys(storyExamples), ...Object.keys(accessibilityExamples)]) {
  add(id, reExport('examples-stories', id));
}
for (const id of Object.keys(frameworkExamples)) {
  add(id, reExport('examples-framework', id));
}
for (const id of Object.keys(pageExamples)) {
  add(id, reExport('examples-pages', id));
}

fs.rmSync(generatedDir, { recursive: true, force: true });
for (const [id, source] of modules) {
  const file = path.join(generatedDir, `${id}.ts`);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${header}\n${source}\n`);
}

console.log(
  `[examples] made ${modules.size} examples importable by id from ${path.relative(process.cwd(), generatedDir)}/`
);
