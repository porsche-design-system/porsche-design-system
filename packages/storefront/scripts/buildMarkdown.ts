import fs from 'node:fs';
import path from 'node:path';
import { FRAMEWORKS, type PageMetadata, renderMdxPage } from '@porsche-design-system/docs-components/markdown';
import { frameworkNameMap } from '../src/models/framework';
import { getBasePath } from '../src/utils/getBasePath';

/**
 * Writes the Markdown version of each migrated page into the static export, next to its HTML, so agents can read the
 * Storefront: `/developing/react/getting-started/` gets `/developing/react/getting-started.md`. Runs after `next build`,
 * which has to have created `dist/` (#4142).
 *
 * A page that renders differently per framework gets one file per framework (`button.react.md`) and a plain `.md` that
 * links them. `llms.txt` lists every page once, grouped by section, with the framework variants on the same line.
 *
 * Only pages listed here are rendered, and any error in them fails the build. The list grows as pages are migrated
 * to `@porsche-design-system/docs-components`.
 */

const MARKDOWN_PAGES = ['developing/react/getting-started'];

const STOREFRONT_SUFFIX = ' - Porsche Design System';
const INTRODUCTION = '> Design tokens, web components and framework wrappers for building Porsche web applications.';

const appDir = path.resolve(__dirname, '../src/app/(main)');
const outDir = path.resolve(__dirname, '../dist');

const basePath = getBasePath();
const withBasePath = (route: string): string => (basePath ? `/${basePath}${route}` : route);

const write = (file: string, content: string): void => {
  const target = path.join(outDir, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content);
};

const link = (title: string, file: string): string => `[${title}](${withBasePath(`/${file}`)})`;

const listEntry = (title: string, file: string, notes?: string): string =>
  `- ${link(title, file)}${notes ? `: ${notes}` : ''}`;

const variantLinks = (route: string): string =>
  FRAMEWORKS.map((framework) => link(frameworkNameMap[framework], `${route}.${framework}.md`)).join(' · ');

/** `developing/react/getting-started` → `Developing` */
const sectionOf = (route: string): string => {
  const [segment] = route.split('/');
  return segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
};

/** The plain `.md` of a page with framework variants, so a guessed URL never returns code for the wrong framework. */
const variantIndex = (title: string, route: string): string =>
  [
    `# ${title}`,
    '',
    "This page differs per framework. Read the variant for your project's framework:",
    '',
    ...FRAMEWORKS.map((framework) => `- ${link(frameworkNameMap[framework], `${route}.${framework}.md`)}`),
    '',
  ].join('\n');

const buildMarkdown = async (): Promise<void> => {
  if (!fs.existsSync(outDir)) {
    throw new Error('[storefront] "dist" is missing – run `next build` first, the Markdown is written into its export');
  }

  const sections = new Map<string, string[]>();

  for (const route of MARKDOWN_PAGES) {
    const { metadata, markdown } = await renderMdxPage(path.join(appDir, route, 'page.mdx'), {
      destination: 'web',
      resolveLink: (href) => (href.startsWith('/') ? withBasePath(href) : href),
    });
    const { title = route, description }: PageMetadata = metadata;
    const name = title.replace(STOREFRONT_SUFFIX, '');
    let entry: string;

    if (markdown.kind === 'switchable') {
      write(`${route}.md`, variantIndex(name, route));
      for (const framework of FRAMEWORKS) {
        write(`${route}.${framework}.md`, markdown.variants[framework]);
      }
      entry = listEntry(
        name,
        `${route}.md`,
        [description, `Per framework: ${variantLinks(route)}`].filter(Boolean).join(' ')
      );
    } else {
      write(`${route}.md`, markdown.markdown);
      entry = listEntry(name, `${route}.md`, description);
    }

    const section = sectionOf(route);
    sections.set(section, [...(sections.get(section) ?? []), entry]);
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

  console.warn(`[storefront] wrote ${MARKDOWN_PAGES.length} Markdown page(s) and llms.txt to "dist"`);
};

buildMarkdown().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
