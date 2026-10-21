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
import { camelCase, pascalCase } from 'change-case';
import { assertExampleId, componentOf } from '../lib/ids';
import type { AccessibilityExample, StoryExample, StoryExampleMeta } from '../lib/meta';

/**
 * Generates the index of the stories and the accessibility examples, one per folder below `src/`:
 *
 * - `generated/index.ts`: the examples as data, in the shape every project exports – id, kind, title, description,
 *   components and code. Imports neither a story nor a wrapper, so the skills build and the server can read it before
 *   the wrappers are built.
 * - `generated/runtime.ts`: what renders every story example by id, `{ story, slotStories?, controlledStory?,
 *   controlledSlotStories?, Description? }`, for the configurator, the live previews and the descriptions. Its story
 *   modules are `'use client'`, its descriptions MDX.
 */

const projectDir = path.resolve(__dirname, '..');
const srcDir = path.join(projectDir, 'src');
const generatedDir = path.join(projectDir, 'generated');

const DEFAULT_TITLE = 'Default';
/** The color scheme of the code, as the skills show it. */
const COLOR_SCHEME = 'scheme-light';

const STORY_FIELDS = ['story', 'slotStories', 'controlledStory', 'controlledSlotStories'] as const;
type StoryField = (typeof STORY_FIELDS)[number];

type StorySource = {
  id: string;
  title: string;
  description?: string;
  /** The field of the example's stories → the name the story module exports it by. */
  exports: Partial<Record<StoryField, string>>;
  story: Story<HTMLTagOrComponent>;
};

type AccessibilitySource = { id: string; example: AccessibilityExampleSource };

const toId = (file: string): string => path.dirname(file).split(path.sep).join('/');

const isStory = (value: unknown): value is Story<HTMLTagOrComponent> =>
  typeof (value as Story<HTMLTagOrComponent> | undefined)?.generator === 'function';

const isAccessibilityExample = (value: unknown): value is AccessibilityExampleSource =>
  !!value && typeof value === 'object' && 'antiPattern' in value && 'recommended' in value;

const componentsOf = (id: string): TagName[] => {
  const component = componentOf(id);
  if (!component || !(TAG_NAMES as readonly string[]).includes(component)) {
    throw new Error(`[examples-stories] "${id}" names no component: ${component ?? 'not below components/'}`);
  }
  return [component as TagName];
};

const readDescription = (id: string): string | undefined => {
  const file = path.join(srcDir, id, 'example.mdx');
  return fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : undefined;
};

const readTitle = async (id: string): Promise<string> => {
  const file = path.join(srcDir, id, 'meta.ts');
  if (!fs.existsSync(file)) {
    throw new Error(`[examples-stories] "${id}" has no meta.ts with its title`);
  }
  const { meta } = (await import(file)) as { meta?: Partial<StoryExampleMeta> };
  const title = meta?.title?.trim();
  if (!title) {
    throw new Error(`[examples-stories] the meta.ts of "${id}" needs a title`);
  }
  return title;
};

/**
 * The field of every export of a story module. A default story's module may export slot stories and a controlled
 * variant of both next to its story, told apart by their value and by `Controlled` in their name
 * (`popoverControlledSlotStories`); an example's exports its story only.
 */
const readStoryExports = (id: string, module: Record<string, unknown>): Partial<Record<StoryField, string>> => {
  const names = Object.keys(module);
  if (id.endsWith('/default')) {
    const exports: Partial<Record<StoryField, string>> = {};
    for (const name of names) {
      const controlled = name.includes('Controlled');
      const field: StoryField = isStory(module[name])
        ? controlled
          ? 'controlledStory'
          : 'story'
        : controlled
          ? 'controlledSlotStories'
          : 'slotStories';
      if (exports[field]) {
        throw new Error(`[examples-stories] "${id}" exports two of its ${field}: ${exports[field]}, ${name}`);
      }
      exports[field] = name;
    }
    return exports;
  }
  if (names.length !== 1) {
    throw new Error(`[examples-stories] "${id}" has to export exactly one story, not ${names.join(', ') || 'none'}`);
  }
  return { story: names[0] };
};

const readStories = async (): Promise<StorySource[]> =>
  Promise.all(
    fs
      .globSync('**/story.ts', { cwd: srcDir })
      .sort()
      .map(async (file) => {
        const id = assertExampleId(toId(file), 'story');
        const module = (await import(path.join(srcDir, file))) as Record<string, unknown>;
        const exports = readStoryExports(id, module);
        const story = exports.story && module[exports.story];
        if (!isStory(story)) {
          throw new Error(`[examples-stories] "${id}" exports no story`);
        }
        const isDefault = id.endsWith('/default');
        if (isDefault && fs.existsSync(path.join(srcDir, id, 'meta.ts'))) {
          throw new Error(
            `[examples-stories] "${id}" is a default story, titled "${DEFAULT_TITLE}"; remove its meta.ts`
          );
        }
        return {
          id,
          title: isDefault ? DEFAULT_TITLE : await readTitle(id),
          description: readDescription(id),
          exports,
          story,
        };
      })
  );

const readAccessibilityExamples = async (): Promise<AccessibilitySource[]> =>
  Promise.all(
    fs
      .globSync('**/example.ts', { cwd: srcDir })
      .sort()
      .map(async (file) => {
        const id = assertExampleId(toId(file), 'accessibility');
        const entries = Object.entries((await import(path.join(srcDir, file))) as Record<string, unknown>);
        const [[, example] = []] = entries;
        if (entries.length !== 1 || !isAccessibilityExample(example)) {
          throw new Error(`[examples-stories] "${id}" has to export exactly one accessibility example`);
        }
        return { id, example };
      })
  );

/** Fails for a file that belongs to no example: every folder holds one example and nothing else. */
const assertFolders = (stories: StorySource[], accessibilityExamples: AccessibilitySource[]): void => {
  const allowed: Record<string, string[]> = Object.fromEntries([
    ...stories.map(({ id }) => [id, ['story.ts', 'meta.ts', 'example.mdx']]),
    ...accessibilityExamples.map(({ id }) => [id, ['example.ts']]),
  ]);
  const stray = fs
    .globSync('**/*', { cwd: srcDir, withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => path.relative(srcDir, path.join(entry.parentPath, entry.name)))
    .filter((file) => !allowed[toId(file)]?.includes(path.basename(file)));
  if (stray.length) {
    throw new Error(`[examples-stories] files outside of an example:\n${stray.join('\n')}`);
  }
};

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

const header = '// Generated by scripts/build.ts from src/ – do not edit.';
const union = (ids: string[]): string => ids.map((id) => `  | '${id}'`).join('\n') || '  never';
const importPath = (id: string, file: string): string => `../src/${id}/${file}`;

const generate = async (): Promise<void> => {
  const [stories, accessibilityExamples] = await Promise.all([readStories(), readAccessibilityExamples()]);
  assertFolders(stories, accessibilityExamples);

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
      `export type StoryExampleId =\n${union(storyIds)};`,
      '',
      `export type AccessibilityExampleId =\n${union(accessibilityIds)};`,
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

  const exportNames = stories.flatMap(({ exports }) => Object.values(exports));
  const duplicate = exportNames.find((name, index) => exportNames.indexOf(name) !== index);
  if (duplicate) {
    throw new Error(`[examples-stories] two stories are exported as "${duplicate}"`);
  }

  const descriptionName = (id: string): string => `${pascalCase(id)}Description`;
  const runtimeFields = ({ id, exports, description }: StorySource): string[] => [
    ...STORY_FIELDS.filter((field) => exports[field]).map((field) => `${field}: ${exports[field]}`),
    ...(description === undefined ? [] : [`Description: ${descriptionName(id)}`]),
  ];

  fs.writeFileSync(
    path.join(generatedDir, 'runtime.ts'),
    [
      header,
      "import type { StoryExampleId } from './index';",
      ...stories.map(
        ({ id, exports }) => `import { ${Object.values(exports).sort().join(', ')} } from '${importPath(id, 'story')}';`
      ),
      ...stories
        .filter(({ description }) => description !== undefined)
        .map(({ id }) => `import ${descriptionName(id)} from '${importPath(id, 'example.mdx')}';`),
      '',
      '/**',
      ' * What renders every story example in the Storefront, by id: its stories, as the configurator and the live',
      " * preview take them, and its description, `example.mdx`, for the consumer's MDX loader to compile. The story",
      " * modules are `'use client'`: import this on the server only, and hand a client component what it shows.",
      ' */',
      `export const storyExampleRuntime = {\n${stories
        .map((source) => `  '${source.id}': { ${runtimeFields(source).join(', ')} },`)
        .join('\n')}\n} satisfies { readonly [Id in StoryExampleId]: object };`,
      '',
    ].join('\n')
  );

  console.log(
    `[examples-stories] generated ${stories.length} stories and ${accessibilityExamples.length} accessibility examples into ${path.relative(projectDir, generatedDir)}/`
  );
};

generate().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
