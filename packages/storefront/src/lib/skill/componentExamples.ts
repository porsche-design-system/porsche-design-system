import type { CodeSample, FrameworkMarkup } from '@porsche-design-system/shared';
import type { ComponentType } from 'react';
import type { StorefrontColorScheme } from '../../models/colorScheme';
import type { ExampleMeta } from '../../models/meta';
import type { Story } from '../../models/story';
import { createFrameworkMarkup } from '../../utils/generator/createFrameworkMarkup';
import type { HTMLTagOrComponent } from '../../utils/generator/generator';
import { escapeCell, leadSentence, markdownTable } from './markdown';
import { renderMdxToMarkdown } from './renderMdxToMarkdown';
import type { Framework, SkillTree } from './skillTree';

/**
 * Emits one example file per component example and owns the examples reference table
 * appended to `references/components/<tag>/<tag>.md`. Co-locating emission and table here
 * means the table rows and the files they point at can never drift — every row is
 * built from the same pass that writes (or skips) the file.
 *
 * A single uniform pipeline drives all four frameworks off the storefront `.meta.ts`:
 *  - `kind: 'story'`   → `createFrameworkMarkup(story.generator(state), state, theme)[framework]`
 *  - `kind: 'example'` → the hand-authored `CodeSample.frameworkMarkup[framework]`
 *  - `kind: 'description'` → no file; the row references prose only
 *  - configurator **base story** → emitted as the default minimal example, unless
 *    `configurator.example` is set, in which case that `CodeSample` is emitted instead
 *    (for imperative components whose storefront page renders a sample, not the story)
 *
 * This also covers Angular, which ships no hand-written examples folder: its files are
 * produced entirely from the story → `createFrameworkMarkup` / `CodeSample` path.
 */

/** Theme the example markup is generated for when the caller does not specify one. */
export const DEFAULT_EXAMPLE_THEME: StorefrontColorScheme = 'scheme-light';

/** Skill `Framework` → `FrameworkMarkup` key (the js skill is the vanilla-JS variant). */
const FRAMEWORK_MARKUP_KEY: Record<Framework, keyof FrameworkMarkup> = {
  js: 'vanilla-js',
  angular: 'angular',
  react: 'react',
  vue: 'vue',
};

/** Skill `Framework` → emitted example-file extension. */
export const EXAMPLE_EXTENSION: Record<Framework, string> = {
  js: 'html',
  angular: 'ts',
  react: 'tsx',
  vue: 'vue',
};

/** Reserved key/name for the configurator base story emitted as the default example. */
const DEFAULT_EXAMPLE_KEY = 'default';

/** PascalCase an `examples` map key into a component-style file base name. */
const toFileBase = (key: string): string =>
  key.replace(/(^|[-_\s]+)([a-zA-Z0-9])/g, (_, __, char: string) => char.toUpperCase());

/** First sentence of the rendered `description`, used as the row's short "when to use". */
const whenToUse = (description: ComponentType | undefined, fallback: string, framework: Framework): string => {
  if (!description) {
    return fallback;
  }
  const { markdown, degraded } = renderMdxToMarkdown(description, framework);
  if (degraded) {
    return fallback;
  }
  return leadSentence(markdown) || fallback;
};

const storyMarkup = (story: Story<HTMLTagOrComponent>, framework: Framework, theme: StorefrontColorScheme): string =>
  createFrameworkMarkup(story.generator(story.state), story.state, theme)[FRAMEWORK_MARKUP_KEY[framework]] ?? '';

/** A single planned example: its display name, short usage note and the markup to emit (if any). */
type PlannedExample = { name: string; whenToUse: string; fileBase: string; markup: string };

const planExample = (
  key: string,
  example: ExampleMeta,
  framework: Framework,
  theme: StorefrontColorScheme
): PlannedExample => {
  const base = { name: example.name, fileBase: toFileBase(key) };
  switch (example.kind) {
    case 'story':
      return {
        ...base,
        whenToUse: whenToUse(example.description, example.name, framework),
        markup: storyMarkup(example.story, framework, theme),
      };
    case 'example':
      return {
        ...base,
        whenToUse: whenToUse(example.description, example.name, framework),
        markup: example.example.frameworkMarkup[FRAMEWORK_MARKUP_KEY[framework]] ?? '',
      };
    case 'description':
      return { ...base, whenToUse: whenToUse(example.description, example.name, framework), markup: '' };
  }
};

/** A component's examples source — the structural subset of `ComponentDocsMeta` this module reads. */
export type ComponentExamplesSource = {
  configurator: { story: Story<HTMLTagOrComponent>; example?: CodeSample };
  examples: Record<string, ExampleMeta>;
};

/** Map of `componentMeta` tag → its storefront examples source. */
export type ComponentExamplesMetaMap = Record<string, ComponentExamplesSource>;

export type ComponentExamplesOptions = {
  metaMap: ComponentExamplesMetaMap;
  framework: Framework;
  /** Theme the story markup is generated for. Defaults to {@link DEFAULT_EXAMPLE_THEME}. */
  theme?: StorefrontColorScheme;
};

/**
 * Write a component's example files into `references/components/<tag>/examples/` and
 * return the `## Examples` reference-table section to append to its `<tag>.md`. The
 * configurator base story is always emitted first as the default minimal example.
 * Returns an empty string when the component has neither a base story nor examples.
 */
export const writeComponentExamples = (
  tree: SkillTree,
  tag: string,
  source: ComponentExamplesSource,
  framework: Framework,
  theme: StorefrontColorScheme = DEFAULT_EXAMPLE_THEME
): string => {
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
    ? (baseExample.frameworkMarkup[FRAMEWORK_MARKUP_KEY[framework]] ?? '')
    : storyMarkup(source.configurator.story, framework, theme);
  if (baseMarkup.trim()) {
    emit({
      name: 'Default',
      whenToUse: 'Minimal default configuration.',
      fileBase: toFileBase(DEFAULT_EXAMPLE_KEY),
      markup: baseMarkup,
    });
  }

  for (const [key, example] of Object.entries(source.examples)) {
    emit(planExample(key, example, framework, theme));
  }

  if (rows.length === 0) {
    return '';
  }

  return ['## Examples', '', markdownTable(['Example', 'When to use', 'File'], rows)].join('\n');
};
