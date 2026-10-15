import type { CodeSample, Framework } from '@porsche-design-system/shared';
import {
  type ColorScheme,
  getStoryMarkup,
  type HTMLTagOrComponent,
  type Story,
} from '@porsche-design-system/story-generator';
import type { Root } from 'mdast';
import { escapeCell, leadSentence, markdownTable } from '../../shared/markdown';
import type { SkillTree } from '../../shared/skillTree';
import { tryRenderMdxToMarkdown } from '../mdx/renderMdxToMarkdown';

/**
 * Emits example files and their reference-table rows in one pass so they cannot drift. Story and
 * hand-authored examples share the same framework-specific pipeline.
 */

export const DEFAULT_EXAMPLE_THEME: ColorScheme = 'scheme-light';

export const EXAMPLE_EXTENSION: Record<Framework, string> = {
  'vanilla-js': 'html',
  angular: 'ts',
  react: 'tsx',
  vue: 'vue',
};

const DEFAULT_EXAMPLE_KEY = 'default';

const toFileBase = (key: string): string =>
  key.replace(/(^|[-_\s]+)([a-zA-Z0-9])/g, (_, __, char: string) => char.toUpperCase());

/** Falls back to the example name when its description contains no prose. */
const whenToUse = (description: Root | undefined, fallback: string, framework: Framework): string => {
  if (!description) {
    return fallback;
  }
  const markdown = tryRenderMdxToMarkdown(description, framework);
  return (markdown && leadSentence(markdown)) || fallback;
};

const storyMarkup = (story: Story<HTMLTagOrComponent>, framework: Framework): string =>
  getStoryMarkup(story, { colorScheme: DEFAULT_EXAMPLE_THEME })[framework];

type PlannedExample = { name: string; whenToUse: string; fileBase: string; markup: string };

const planExample = (key: string, example: SkillExampleMeta, framework: Framework): PlannedExample => {
  const base = { name: example.name, fileBase: toFileBase(key) };
  switch (example.kind) {
    case 'story':
      return {
        ...base,
        whenToUse: whenToUse(example.description, example.name, framework),
        markup: storyMarkup(example.story, framework),
      };
    case 'example':
      return {
        ...base,
        whenToUse: whenToUse(example.description, example.name, framework),
        markup: example.example.frameworkMarkup[framework] ?? '',
      };
    case 'description':
      return { ...base, whenToUse: whenToUse(example.description, example.name, framework), markup: '' };
  }
};

/**
 * Storefront example metadata after the skill loader converts MDX descriptions to mdast.
 */
export type SkillExampleMeta =
  | { kind: 'story'; name: string; description?: Root; story: Story<HTMLTagOrComponent> }
  | { kind: 'example'; name: string; description?: Root; example: CodeSample }
  | { kind: 'description'; name: string; description: Root };

export type ComponentExamplesSource = {
  configurator: { story: Story<HTMLTagOrComponent>; example?: CodeSample };
  examples: Record<string, SkillExampleMeta>;
};

/**
 * Writes component examples and returns their reference-table section. The configurator base story
 * is emitted first.
 */
export const writeComponentExamples = (tree: SkillTree, tag: string, source: ComponentExamplesSource): string => {
  const framework = tree.framework;
  const ext = EXAMPLE_EXTENSION[framework];
  const rows: string[][] = [];
  const usedFileBases = new Set<string>();

  const emit = ({ name, whenToUse: note, fileBase, markup }: PlannedExample): void => {
    let fileCell = '—';
    if (markup.trim()) {
      let unique = fileBase;
      for (let index = 2; usedFileBases.has(unique); index++) {
        unique = `${fileBase}${index}`;
      }
      usedFileBases.add(unique);
      const relativePath = `./examples/${unique}.${ext}`;
      tree.writeReference(`components/${tag}/examples/${unique}.${ext}`, markup);
      fileCell = `[${relativePath}](${relativePath})`;
    }
    rows.push([escapeCell(name), escapeCell(note), fileCell]);
  };

  const { example: baseExample } = source.configurator;
  const baseMarkup = baseExample
    ? (baseExample.frameworkMarkup[framework] ?? '')
    : storyMarkup(source.configurator.story, framework);
  if (baseMarkup.trim()) {
    emit({
      name: 'Default',
      whenToUse: 'Minimal default configuration.',
      fileBase: toFileBase(DEFAULT_EXAMPLE_KEY),
      markup: baseMarkup,
    });
  }

  for (const [key, example] of Object.entries(source.examples)) {
    emit(planExample(key, example, framework));
  }

  if (rows.length === 0) {
    return '';
  }

  return ['## Examples', '', markdownTable(['Example', 'When to use', 'File'], rows)].join('\n');
};
