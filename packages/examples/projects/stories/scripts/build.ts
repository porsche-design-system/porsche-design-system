import fs from 'node:fs';
import path from 'node:path';
import { FRAMEWORKS, type Framework, TAG_NAMES, type TagName } from '@porsche-design-system/shared';
import {
  type AccessibilityExample as AccessibilityExampleSource,
  getStoryMarkup,
  type HTMLTagOrComponent,
  resolveExamplePayload,
  type Story,
} from '@porsche-design-system/story-generator';
import { camelCase } from 'change-case';
import {
  assertExampleFolders,
  generatedHeader,
  readDescription,
  toExampleId,
  toIdUnion,
  writeExampleModule,
} from '../../../lib/build';
import { assertExampleId, componentOf } from '../../../lib/ids';
import type { AccessibilityExample, StoryExample, StoryExampleMeta } from '../lib/meta';
import {
  COLOR_SCHEME,
  DEFAULT_TITLE,
  isAccessibilityExample,
  isDefaultExample,
  PROJECT,
  readStoryExports,
  type StoryExports,
  toAccessibilityModule,
  toStoryModule,
} from '../lib/stories';

/**
 * Generates the index of the stories and the accessibility examples, one per folder below `src/`:
 *
 * - `generated/index.ts`: the examples as data, in the shape every project exports – id, kind, title, description,
 *   components and code. Imports neither a story nor a wrapper, so the skills build and the server can read it before
 *   the wrappers are built.
 * - `generated/examples/<id>.ts`: every example as a module of its own – its data and what renders it in the
 *   Storefront: a story example's stories (`story`, and for a default story `slotStories`, `controlledStory`,
 *   `controlledSlotStories`) and its `Description`, its `example.mdx`. The story modules are `'use client'`: a page
 *   imports the examples it shows, and so loads their stories only.
 */

const projectDir = path.resolve(__dirname, '..');
const srcDir = path.join(projectDir, 'src');
const generatedDir = path.join(projectDir, 'generated');

type StorySource = {
  id: string;
  title: string;
  description?: string;
  exports: StoryExports;
  story: Story<HTMLTagOrComponent>;
};

type AccessibilitySource = { id: string; example: AccessibilityExampleSource };

const componentsOf = (id: string): TagName[] => {
  const component = componentOf(id);
  if (!component || !(TAG_NAMES as readonly string[]).includes(component)) {
    throw new Error(`[${PROJECT}] "${id}" names no component: ${component ?? 'not below components/'}`);
  }
  return [component as TagName];
};

const readTitle = async (id: string): Promise<string> => {
  const file = path.join(srcDir, id, 'meta.ts');
  if (!fs.existsSync(file)) {
    throw new Error(`[${PROJECT}] "${id}" has no meta.ts with its title`);
  }
  const { meta } = (await import(file)) as { meta?: Partial<StoryExampleMeta> };
  const title = meta?.title?.trim();
  if (!title) {
    throw new Error(`[${PROJECT}] the meta.ts of "${id}" needs a title`);
  }
  return title;
};

const readStories = async (): Promise<StorySource[]> =>
  Promise.all(
    fs
      .globSync('**/story.ts', { cwd: srcDir })
      .sort()
      .map(async (file) => {
        const id = assertExampleId(toExampleId(file), 'story', PROJECT);
        const module = (await import(path.join(srcDir, file))) as Record<string, unknown>;
        const exports = readStoryExports(id, module);
        const isDefault = isDefaultExample(id);
        if (isDefault && fs.existsSync(path.join(srcDir, id, 'meta.ts'))) {
          throw new Error(`[${PROJECT}] "${id}" is a default story, titled "${DEFAULT_TITLE}"; remove its meta.ts`);
        }
        return {
          id,
          title: isDefault ? DEFAULT_TITLE : await readTitle(id),
          description: readDescription(srcDir, id, PROJECT),
          exports,
          story: module[exports.story as string] as Story<HTMLTagOrComponent>,
        };
      })
  );

const readAccessibilityExamples = async (): Promise<AccessibilitySource[]> =>
  Promise.all(
    fs
      .globSync('**/example.ts', { cwd: srcDir })
      .sort()
      .map(async (file) => {
        const id = assertExampleId(toExampleId(file), 'accessibility', PROJECT);
        const entries = Object.entries((await import(path.join(srcDir, file))) as Record<string, unknown>);
        const [[, example] = []] = entries;
        if (entries.length !== 1 || !isAccessibilityExample(example)) {
          throw new Error(`[${PROJECT}] "${id}" has to export exactly one accessibility example`);
        }
        return { id, example };
      })
  );

const toStoryExample = ({ id, title, description, story }: StorySource): StoryExample => ({
  id,
  kind: 'story',
  title,
  ...(description !== undefined && { description }),
  components: componentsOf(id),
  code: getStoryMarkup(story, { colorScheme: COLOR_SCHEME }),
});

const toAccessibilityExample = ({ id, example }: AccessibilitySource): AccessibilityExample => {
  const side = (payload: AccessibilityExampleSource['antiPattern'], name: string): Record<Framework, string> =>
    Object.fromEntries(
      FRAMEWORKS.map((framework) => [
        framework,
        resolveExamplePayload(payload, framework, {
          tag: componentOf(id) ?? id,
          key: camelCase(path.basename(id)),
          side: name,
          framework,
        }),
      ])
    ) as Record<Framework, string>;

  return {
    id,
    kind: 'accessibility',
    title: example.name,
    components: componentsOf(id),
    antiPattern: side(example.antiPattern, 'antiPattern'),
    recommended: side(example.recommended, 'recommended'),
  };
};

const header = generatedHeader('src/');

const generate = async (): Promise<void> => {
  const [stories, accessibilityExamples] = await Promise.all([readStories(), readAccessibilityExamples()]);
  assertExampleFolders(
    srcDir,
    Object.fromEntries([
      ...stories.map(({ id }) => [id, ['story.ts', 'meta.ts', 'example.mdx']]),
      ...accessibilityExamples.map(({ id }) => [id, ['example.ts']]),
    ]),
    PROJECT
  );

  const storyIds = stories.map(({ id }) => id);
  const accessibilityIds = accessibilityExamples.map(({ id }) => id);

  fs.mkdirSync(generatedDir, { recursive: true });

  fs.writeFileSync(
    path.join(generatedDir, 'index.ts'),
    [
      header,
      "import type { AccessibilityExample, StoryExample } from '../lib/meta';",
      '',
      "export type { AccessibilityExample, StoryExample, StoryExampleMeta } from '../lib/meta';",
      '',
      `export type StoryExampleId =\n${toIdUnion(storyIds)};`,
      '',
      `export type AccessibilityExampleId =\n${toIdUnion(accessibilityIds)};`,
      '',
      '/** Every story example by id: what names it, its description and its code. Data only. */',
      `export const storyExamples: { readonly [Id in StoryExampleId]: StoryExample<Id> } = ${JSON.stringify(
        Object.fromEntries(stories.map((source) => [source.id, toStoryExample(source)])),
        null,
        2
      )};`,
      '',
      '/** Every accessibility example by id: its title and the snippets of both sides. Data only. */',
      `export const accessibilityExamples: { readonly [Id in AccessibilityExampleId]: AccessibilityExample<Id> } = ${JSON.stringify(
        Object.fromEntries(accessibilityExamples.map((source) => [source.id, toAccessibilityExample(source)])),
        null,
        2
      )};`,
      '',
    ].join('\n')
  );

  for (const { id, exports, description } of stories) {
    writeExampleModule(generatedDir, id, toStoryModule(id, exports, description !== undefined));
  }
  for (const { id } of accessibilityExamples) {
    writeExampleModule(generatedDir, id, toAccessibilityModule(id));
  }

  console.log(
    `[${PROJECT}] generated ${stories.length} stories and ${accessibilityExamples.length} accessibility examples into ${path.relative(projectDir, generatedDir)}/`
  );
};

generate().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
