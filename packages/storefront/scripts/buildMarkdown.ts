import fs from 'node:fs';
import path from 'node:path';
import {
  collectPages,
  createSite,
  FRAMEWORKS,
  markdownFile,
  type Page,
  pageToMarkdown,
  webLinks,
} from '@porsche-design-system/docs-components/markdown';
import { frameworkNameMap } from '../src/models/framework';
import { getBasePath } from '../src/utils/getBasePath';
import { getStorefrontPages } from '../src/utils/markdownPages';

/**
 * Writes the Markdown version of each migrated page into the static export, next to its HTML, so agents can read the
 * Storefront: `/developing/react/getting-started/` gets `/developing/react/getting-started.md`. Runs after `next build`,
 * which has to have created `dist/` (#4142).
 *
 * A page that renders differently per framework gets one file per framework (`button.react.md`) and a plain `.md` that
 * links them. `llms.txt` lists every page once, grouped by section, with the framework variants on the same line. Links
 * point to the Markdown of the same deployment; a link to a route that does not exist fails the build.
 */

const STOREFRONT_SUFFIX = ' - Porsche Design System';
const INTRODUCTION = '> Design tokens, web components and framework wrappers for building Porsche web applications.';

const outDir = path.resolve(__dirname, '../dist');
const basePath = getBasePath();
const withBasePath = (file: string): string => `${basePath ? `/${basePath}` : ''}/${file}`;

const write = (file: string, content: string): void => {
  const target = path.join(outDir, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content);
};

const link = (title: string, file: string): string => `[${title}](${withBasePath(file)})`;

const titleOf = (page: Page): string => (page.metadata.title ?? page.route).replace(STOREFRONT_SUFFIX, '');

/** `developing/react/getting-started` → `Developing` */
const sectionOf = ({ route }: Page): string => {
  const [segment] = route.split('/');
  return segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
};

/** The plain `.md` of a page with framework variants, so a guessed URL never returns code for the wrong framework. */
const variantIndex = (page: Page): string =>
  [
    `# ${titleOf(page)}`,
    '',
    "This page differs per framework. Read the variant for your project's framework:",
    '',
    ...FRAMEWORKS.map((framework) => `- ${link(frameworkNameMap[framework], markdownFile(page, framework))}`),
    '',
  ].join('\n');

const llmsEntry = (page: Page): string => {
  const variants =
    page.kind === 'switchable'
      ? `Per framework: ${FRAMEWORKS.map((framework) => link(frameworkNameMap[framework], markdownFile(page, framework))).join(' · ')}`
      : undefined;
  const notes = [page.metadata.description, variants].filter(Boolean).join(' ');
  return `- ${link(titleOf(page), markdownFile(page))}${notes ? `: ${notes}` : ''}`;
};

const buildMarkdown = async (): Promise<void> => {
  if (!fs.existsSync(outDir)) {
    throw new Error('[storefront] "dist" is missing – run `next build` first, the Markdown is written into its export');
  }

  const { routes, markdownPages } = getStorefrontPages();
  const pages = await collectPages(markdownPages);
  const site = createSite(routes, pages);
  const resolve = webLinks(basePath);
  const sections = new Map<string, string[]>();

  for (const page of pages) {
    if (page.kind === 'switchable') {
      write(markdownFile(page), variantIndex(page));
      for (const framework of FRAMEWORKS) {
        write(markdownFile(page, framework), pageToMarkdown(page, framework, site, resolve));
      }
    } else {
      const framework = page.kind === 'specific' ? page.frameworks[0] : undefined;
      write(markdownFile(page), pageToMarkdown(page, framework, site, resolve));
    }
    sections.set(sectionOf(page), [...(sections.get(sectionOf(page)) ?? []), llmsEntry(page)]);
  }

  write(
    'llms.txt',
    [
      '# Porsche Design System',
      '',
      INTRODUCTION,
      '',
      'Pages that differ per framework list a variant for each; read the one for the framework of your project.',
      ...[...sections].flatMap(([section, entries]) => ['', `## ${section}`, '', ...entries]),
      '',
    ].join('\n')
  );

  console.warn(`[storefront] wrote ${pages.length} Markdown page(s) and llms.txt to "dist"`);
};

buildMarkdown().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
