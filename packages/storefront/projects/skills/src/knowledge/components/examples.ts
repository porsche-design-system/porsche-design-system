import type { Framework } from '@porsche-design-system/shared';
import type { Root } from 'mdast';
import { escapeCell, leadSentence, markdownTable } from '../../shared/markdown';
import type { SkillTree } from '../../shared/skillTree';
import { tryRenderMdxToMarkdown } from '../mdx/renderMdxToMarkdown';

/**
 * Emits example files and their reference-table rows in one pass so they cannot drift. Story and
 * hand-authored examples come from the catalogue of `@porsche-design-system/examples` alike, their code
 * generated in the light color scheme.
 */

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

type PlannedExample = { name: string; whenToUse: string; fileBase: string; markup: string };

/** `components/button/ai-drop-shadow` → `AiDropShadow`: the file of an example is named by its slug. */
const toExampleFileBase = (id: string): string => toFileBase(id.split('/').pop() ?? id);

const planExample = ({ id, title, description, code }: SkillExample, framework: Framework): PlannedExample => ({
  name: title,
  fileBase: toExampleFileBase(id),
  whenToUse: whenToUse(description, title, framework),
  markup: code[framework] ?? '',
});

/**
 * A story or framework example of the catalogue as the skill writes it, its MDX description parsed.
 */
export type SkillExample = { id: string; title: string; description?: Root; code: Record<Framework, string> };

export type ComponentExamplesSource = {
  configurator: SkillExample;
  examples: SkillExample[];
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

  const baseMarkup = source.configurator.code[framework] ?? '';
  if (baseMarkup.trim()) {
    emit({
      name: 'Default',
      whenToUse: 'Minimal default configuration.',
      fileBase: toFileBase(DEFAULT_EXAMPLE_KEY),
      markup: baseMarkup,
    });
  }

  for (const example of source.examples) {
    emit(planExample(example, framework));
  }

  if (rows.length === 0) {
    return '';
  }

  return ['## Examples', '', markdownTable(['Example', 'When to use', 'File'], rows)].join('\n');
};
