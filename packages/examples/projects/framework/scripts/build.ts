import fs from 'node:fs';
import path from 'node:path';
import { FRAMEWORKS, type Framework } from '@porsche-design-system/shared';
import {
  assertExampleFolders,
  generatedHeader,
  readDescription,
  toExampleId,
  toGeneratedDir,
  toIdUnion,
  writeExampleModule,
} from '../../../lib/build';
import { assertExampleId } from '../../../lib/ids';
import type { FrameworkExample, FrameworkExampleMeta } from '../lib/meta';
import { exampleAppPaths, sourceFiles, toFrameworkMarkup, toPreview } from '../lib/sources';

/**
 * Generates the framework examples from the example apps of the wrappers, one per `src/**\/meta.ts`:
 *
 * - `generated/index.ts`: the examples as data, their code strings for every framework. Imports no wrapper, so the
 *   skills build and anything else that reads the code can load it before the wrappers are built.
 * - `generated/previews/`: the live React preview of every example, a client component each, named by its React source.
 * - `generated/examples/<id>.ts`: every example as a module of its own – its data, its live `Preview` and its
 *   `Description`. A page imports the examples it shows, and so loads their previews only.
 */

const projectDir = path.resolve(__dirname, '..');
const srcDir = path.join(projectDir, 'src');
const packagesDir = path.resolve(projectDir, '../../..');
const generatedDir = path.join(projectDir, 'generated');
const previewsDir = path.join(generatedDir, 'previews');

const PROJECT = 'examples-framework';

type Source = { id: string; meta: FrameworkExampleMeta; files: Record<Framework, string> };

const readSources = async (): Promise<Source[]> => {
  const metaFiles = fs.globSync('**/meta.ts', { cwd: srcDir }).sort();

  return Promise.all(
    metaFiles.map(async (metaFile) => {
      const id = assertExampleId(toExampleId(metaFile), 'framework', PROJECT);
      const { meta } = (await import(path.join(srcDir, metaFile))) as { meta: FrameworkExampleMeta };
      if (!meta.title?.trim()) {
        throw new Error(`[${PROJECT}] the meta.ts of "${id}" needs a title`);
      }
      const files = sourceFiles(meta.source);
      for (const framework of FRAMEWORKS) {
        const file = path.join(packagesDir, exampleAppPaths[framework], files[framework]);
        if (!fs.existsSync(file)) {
          throw new Error(`[${PROJECT}] "${id}" has no ${framework} source: ${path.relative(packagesDir, file)}`);
        }
      }
      return { id, meta, files };
    })
  );
};

const readSource = (framework: Framework, file: string): string =>
  fs.readFileSync(path.join(packagesDir, exampleAppPaths[framework], file), 'utf8');

/** `SelectExampleDynamic.tsx` → `SelectExampleDynamic`, the file of its preview below `generated/previews/`. */
const previewName = ({ files }: Source): string => path.basename(files.react, '.tsx');

const generate = async (): Promise<void> => {
  const sources = await readSources();
  assertExampleFolders(srcDir, Object.fromEntries(sources.map(({ id }) => [id, ['meta.ts', 'example.mdx']])), PROJECT);

  const previewNames = sources.map(previewName);
  const duplicate = previewNames.find((name, index) => previewNames.indexOf(name) !== index);
  if (duplicate) {
    throw new Error(`[${PROJECT}] two examples share the preview "${duplicate}"`);
  }

  fs.mkdirSync(previewsDir, { recursive: true });

  const examples = sources.map((source): FrameworkExample => {
    const sourcesByFramework = Object.fromEntries(
      FRAMEWORKS.map((framework) => [framework, readSource(framework, source.files[framework])])
    ) as Record<Framework, string>;

    fs.writeFileSync(path.join(previewsDir, source.files.react), toPreview(sourcesByFramework.react));

    const description = readDescription(srcDir, source.id, PROJECT);
    return {
      id: source.id,
      kind: 'framework',
      title: source.meta.title,
      ...(description === undefined ? {} : { description }),
      components: source.meta.components,
      code: toFrameworkMarkup(sourcesByFramework),
    };
  });

  const header = generatedHeader('src/**/meta.ts and the example apps of the wrappers');

  fs.writeFileSync(
    path.join(generatedDir, 'index.ts'),
    [
      header,
      "import type { FrameworkExample } from '../lib/meta';",
      '',
      "export type { FrameworkExample, FrameworkExampleMeta } from '../lib/meta';",
      '',
      `export type FrameworkExampleId =\n${toIdUnion(examples.map(({ id }) => id))};`,
      '',
      '/**',
      ' * Every example by id, in the shape every project of `packages/examples` exports and its catalogue merges: what',
      ' * names it, its description (MDX source), the components it shows and its code. Data only.',
      ' */',
      `export const frameworkExamples: { readonly [Id in FrameworkExampleId]: FrameworkExample<Id> } = ${JSON.stringify(
        Object.fromEntries(examples.map((example) => [example.id, example])),
        null,
        2
      )};`,
      '',
    ].join('\n')
  );

  for (const [index, source] of sources.entries()) {
    const up = toGeneratedDir(source.id);
    const hasDescription = examples[index].description !== undefined;
    writeExampleModule(generatedDir, source.id, [
      header,
      `import { frameworkExamples } from '${up}index';`,
      `import Preview from '${up}previews/${previewName(source)}';`,
      ...(hasDescription ? [`import Description from '${up}../src/${source.id}/example.mdx';`] : []),
      '',
      'export default {',
      `  ...frameworkExamples['${source.id}'],`,
      '  Preview,',
      ...(hasDescription ? ['  Description,'] : []),
      '};',
    ]);
  }

  console.log(`[${PROJECT}] generated ${examples.length} examples into ${path.relative(projectDir, generatedDir)}/`);
};

generate().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
