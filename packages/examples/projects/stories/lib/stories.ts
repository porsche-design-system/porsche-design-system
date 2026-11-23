import type { AccessibilityExample, HTMLTagOrComponent, Story } from '@porsche-design-system/story-generator';
import { generatedHeader, toGeneratedDir } from '../../../lib/build';

/**
 * How a story module becomes an example: which of its exports is which of the example's stories, and the module of the
 * example that `@porsche-design-system/examples-stories/examples/<id>` resolves to. Pure, so the build only reads and
 * writes files.
 */

export const PROJECT = 'examples-stories';

/** The color scheme of the code, as the skills show it. */
export const COLOR_SCHEME = 'scheme-light';

/** The title of every default story, which has no `meta.ts`. */
export const DEFAULT_TITLE = 'Default';

export const STORY_FIELDS = ['story', 'slotStories', 'controlledStory', 'controlledSlotStories'] as const;
export type StoryField = (typeof STORY_FIELDS)[number];

/** The field of the example's stories → the name the story module exports it by. */
export type StoryExports = Partial<Record<StoryField, string>>;

export const isDefaultExample = (id: string): boolean => id.endsWith('/default');

export const isStory = (value: unknown): value is Story<HTMLTagOrComponent> =>
  typeof (value as Story<HTMLTagOrComponent> | undefined)?.generator === 'function';

export const isAccessibilityExample = (value: unknown): value is AccessibilityExample =>
  !!value && typeof value === 'object' && 'antiPattern' in value && 'recommended' in value;

/**
 * The field of every export of a story module. A default story's module may export slot stories and a controlled
 * variant of both next to its story, told apart by their value and by `Controlled` in their name
 * (`popoverControlledSlotStories`); an example's module exports its story only.
 */
export const readStoryExports = (id: string, module: Record<string, unknown>): StoryExports => {
  const names = Object.keys(module);
  if (!isDefaultExample(id)) {
    if (names.length !== 1 || !isStory(module[names[0]])) {
      throw new Error(`[${PROJECT}] "${id}" has to export exactly one story, not ${names.join(', ') || 'none'}`);
    }
    return { story: names[0] };
  }
  const exports: StoryExports = {};
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
      throw new Error(`[${PROJECT}] "${id}" exports two of its ${field}: ${exports[field]}, ${name}`);
    }
    exports[field] = name;
  }
  if (!exports.story) {
    throw new Error(`[${PROJECT}] "${id}" exports no story`);
  }
  return exports;
};

const header = generatedHeader('src/');

/** One story example as a module: its data, its stories and its description. */
export const toStoryModule = (id: string, exports: StoryExports, hasDescription: boolean): string[] => {
  const up = toGeneratedDir(id);
  return [
    header,
    `import { storyExamples } from '${up}index';`,
    `import { ${Object.values(exports).sort().join(', ')} } from '${up}../src/${id}/story';`,
    ...(hasDescription ? [`import Description from '${up}../src/${id}/example.mdx';`] : []),
    '',
    'export default {',
    `  ...storyExamples['${id}'],`,
    ...STORY_FIELDS.filter((field) => exports[field]).map((field) => `  ${field}: ${exports[field]},`),
    ...(hasDescription ? ['  Description,'] : []),
    '};',
  ];
};

/** One accessibility example as a module: its data. */
export const toAccessibilityModule = (id: string): string[] => [
  header,
  `import { accessibilityExamples } from '${toGeneratedDir(id)}index';`,
  '',
  `export default accessibilityExamples['${id}'];`,
];
