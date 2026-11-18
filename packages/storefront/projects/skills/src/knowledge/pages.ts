import {
  type OutputFile,
  type OutputMap,
  outputFiles,
  outputFileToMarkdown,
  type Page,
  pageTitle,
  type Site,
} from '@porsche-design-system/docs-components/markdown';
import type { Framework } from '@porsche-design-system/shared';
import { escapeCell, markdownTable } from '../shared/markdown';
import type { SkillTree } from '../shared/skillTree';
import { skillLinks, skillMap } from './skillMap';

/**
 * Writes the Storefront pages rendered by `@porsche-design-system/docs-components`, the same Markdown the Storefront
 * serves next to its HTML, into a skill, and indexes them in `SKILL.md`. Where they land and how the index is worded is
 * the skill map's (`skillMap.ts`).
 */

/** The pages the Storefront renders as Markdown, and what their links resolve against. */
export type StorefrontPages = {
  /** The pages rendered by `@porsche-design-system/docs-components`, the same Markdown the Storefront serves. */
  pages: readonly Page[];
  /** Every Storefront route, so links between pages resolve and a link to a missing page fails the build. */
  site: Site;
  /** The structure of the Storefront's Markdown, for links to pages outside the skill. */
  markdownMap: OutputMap;
};

/** Writes the skill's references and returns them, in sitemap order. */
export const writePageReferences = (tree: SkillTree, { pages, site, markdownMap }: StorefrontPages): OutputFile[] => {
  const { framework } = tree;
  const resolve = skillLinks(framework, markdownMap);
  const files = outputFiles(pages, skillMap(framework), framework);

  for (const file of files) {
    tree.write(file.file, outputFileToMarkdown(file, framework, site, resolve));
  }
  return files;
};

/** One `SKILL.md` section per category, worded by the skill map, with a row per reference and the sections it holds. */
export const renderPageSections = (framework: Framework, files: readonly OutputFile[]): string => {
  const map = skillMap(framework);
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
