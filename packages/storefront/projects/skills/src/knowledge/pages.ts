import {
  type OutputFile,
  outputFiles,
  outputFileToMarkdown,
  type Page,
  pageTitle,
  type Site,
  type Framework as StorefrontFramework,
} from '@porsche-design-system/docs-components/markdown';
import { escapeCell, markdownTable } from '../shared/markdown';
import type { Framework, SkillTree } from '../shared/skillTree';
import { skillLinks, skillMap } from './skillMap';

/**
 * Writes the Storefront pages rendered by `@porsche-design-system/docs-components`, the same Markdown the Storefront
 * serves next to its HTML, into a skill, and indexes them in `SKILL.md`. Where they land and how the index is worded is
 * the skill map's (`skillMap.ts`).
 */

const STOREFRONT_FRAMEWORK: Record<Framework, StorefrontFramework> = {
  js: 'vanilla-js',
  angular: 'angular',
  react: 'react',
  vue: 'vue',
};

/** Writes the skill's references and returns them, in sitemap order. */
export const writePageReferences = (tree: SkillTree, pages: readonly Page[], site: Site): OutputFile[] => {
  const framework = STOREFRONT_FRAMEWORK[tree.framework];
  const resolve = skillLinks(framework);
  const files = outputFiles(pages, skillMap(framework), framework);

  for (const file of files) {
    tree.write(file.file, outputFileToMarkdown(file, framework, site, resolve));
  }
  return files;
};

/** One `SKILL.md` section per category, worded by the skill map, with a row per reference and the sections it holds. */
export const renderPageSections = (framework: Framework, files: readonly OutputFile[]): string => {
  const map = skillMap(STOREFRONT_FRAMEWORK[framework]);
  const categories = new Map<string, { description?: string; files: OutputFile[] }>();
  for (const file of files) {
    const { title, description } = map.category(file.pages[0].page);
    const category = categories.get(title) ?? { description, files: [] };
    category.files.push(file);
    categories.set(title, category);
  }

  return [...categories]
    .map(([title, category]) =>
      [
        `## ${title}`,
        '',
        ...(category.description ? [category.description, ''] : []),
        markdownTable(
          ['Page', 'Sections', 'Reference'],
          category.files.map((file) => [
            escapeCell(file.title ?? pageTitle(file.pages[0].page)),
            escapeCell(file.pages.map(({ page, section }) => section ?? pageTitle(page)).join(', ')),
            `[${file.file.split('/').pop()}](${file.file})`,
          ])
        ),
      ].join('\n')
    )
    .join('\n\n');
};
