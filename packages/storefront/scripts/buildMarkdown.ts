import fs from 'node:fs';
import path from 'node:path';
import {
  collectPages,
  createSite,
  FRAMEWORKS,
  type Page,
  pageTitle,
  pageToMarkdown,
} from '@porsche-design-system/docs-components/markdown';
import { frameworkNameMap } from '../src/models/framework';
import { getBasePath } from '../src/utils/getBasePath';
import { markdownLinks, markdownMap } from '../src/utils/markdownMap';
import { getStorefrontPages } from '../src/utils/markdownPages';

/**
 * Writes the Storefront's Markdown into the static export, next to its HTML, so agents can read the Storefront. Where
 * each page lands, how it is linked and how `llms.txt` words its sections all come from `markdownMap`. Runs after
 * `next build`, which has to have created `dist/` (#4142). A link to a route that does not exist fails the build.
 */

const INTRODUCTION = '> Design tokens, web components and framework wrappers for building Porsche web applications.';

const outDir = path.resolve(__dirname, '../dist');
const basePath = getBasePath();
const prefix = basePath ? `/${basePath}` : '';

const write = (file: string, content: string): void => {
  const target = path.join(outDir, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content);
};

const fileOf = (page: Page, framework?: (typeof FRAMEWORKS)[number]): string => {
  const location = markdownMap.locate(page, framework);
  if (!location) {
    throw new Error(`[storefront] ${page.route} is flagged for Markdown, but the Markdown map leaves it out`);
  }
  return location.file;
};

const link = (title: string, file: string): string => `[${title}](${prefix}/${file})`;

const variantLinks = (page: Page): string[] =>
  FRAMEWORKS.map((framework) => link(frameworkNameMap[framework], fileOf(page, framework)));

/** The plain `.md` of a page with framework variants, so a guessed URL never returns code for the wrong framework. */
const variantIndex = (page: Page): string =>
  [
    `# ${pageTitle(page)}`,
    '',
    "This page differs per framework. Read the variant for your project's framework:",
    '',
    ...variantLinks(page).map((variant) => `- ${variant}`),
    '',
  ].join('\n');

const llmsEntry = (page: Page): string => {
  const variants = page.kind === 'switchable' ? `Per framework: ${variantLinks(page).join(' · ')}` : undefined;
  const notes = [page.metadata.description, variants].filter(Boolean).join(' ');
  return `- ${link(pageTitle(page), fileOf(page))}${notes ? `: ${notes}` : ''}`;
};

const buildMarkdown = async (): Promise<void> => {
  if (!fs.existsSync(outDir)) {
    throw new Error('[storefront] "dist" is missing – run `next build` first, the Markdown is written into its export');
  }

  const { routes, markdownPages } = getStorefrontPages();
  const pages = await collectPages(markdownPages);
  const site = createSite(routes, pages);
  const resolve = markdownLinks(prefix);
  const sections = new Map<string, { description?: string; entries: string[] }>();

  for (const page of pages) {
    if (page.kind === 'switchable') {
      write(fileOf(page), variantIndex(page));
      for (const framework of FRAMEWORKS) {
        write(fileOf(page, framework), pageToMarkdown(page, framework, site, resolve));
      }
    } else {
      const framework = page.kind === 'specific' ? page.frameworks[0] : undefined;
      write(fileOf(page), pageToMarkdown(page, framework, site, resolve));
    }

    const { title, description } = markdownMap.category(page);
    const section = sections.get(title) ?? { description, entries: [] };
    section.entries.push(llmsEntry(page));
    sections.set(title, section);
  }

  write(
    'llms.txt',
    [
      '# Porsche Design System',
      '',
      INTRODUCTION,
      '',
      'Pages that differ per framework list a variant for each; read the one for the framework of your project.',
      ...[...sections].flatMap(([title, { description, entries }]) => [
        '',
        `## ${title}`,
        '',
        ...(description ? [description, ''] : []),
        ...entries,
      ]),
      '',
    ].join('\n')
  );

  console.warn(`[storefront] wrote ${pages.length} Markdown page(s) and llms.txt to "dist"`);
};

buildMarkdown().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
