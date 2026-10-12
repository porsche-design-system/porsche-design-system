import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { type Framework, renderMdxFileToMarkdown } from '@porsche-design-system/docs-components/markdown';
import { getBasePath } from '../src/utils/getBasePath';

/**
 * Writes the Markdown version of each migrated page into the static export, next to its HTML, so agents can read the
 * Storefront: `/developing/react/getting-started/` gets `/developing/react/getting-started.md`. Also writes an
 * `llms.txt` that lists them. Runs after `next build`, which has to have created `dist/` (#4142).
 *
 * Only pages listed here are rendered, and any error in them fails the build. The list grows as pages are migrated
 * to `@porsche-design-system/docs-components`.
 */

/** Route of each migrated page, and the framework its Markdown is rendered for. */
const MARKDOWN_PAGES: Record<string, Framework> = {
  'developing/react/getting-started': 'react',
};

const STOREFRONT_SUFFIX = ' - Porsche Design System';

const appDir = path.resolve(__dirname, '../src/app/(main)');
const outDir = path.resolve(__dirname, '../dist');

type PageMetadata = { title?: string; description?: string };

const buildMarkdown = async (): Promise<void> => {
  if (!fs.existsSync(outDir)) {
    throw new Error('[storefront] "dist" is missing – run `next build` first, the Markdown is written into its export');
  }

  const basePath = getBasePath();
  const withBasePath = (route: string): string => (basePath ? `/${basePath}${route}` : route);
  const llmsEntries: string[] = [];

  for (const [route, framework] of Object.entries(MARKDOWN_PAGES)) {
    const file = path.join(appDir, route, 'page.mdx');
    const markdown = await renderMdxFileToMarkdown(file, {
      framework,
      destination: 'web',
      resolveLink: (href) => (href.startsWith('/') ? withBasePath(href) : href),
    });
    const target = path.join(outDir, `${route}.md`);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, markdown);

    // Already imported by the render, so this only reads the page's `metadata` export.
    const { metadata = {} }: { metadata?: PageMetadata } = await import(pathToFileURL(file).href);
    const title = (metadata.title ?? route).replace(STOREFRONT_SUFFIX, '');
    llmsEntries.push(
      `- [${title}](${withBasePath(`/${route}.md`)})${metadata.description ? `: ${metadata.description}` : ''}`
    );
  }

  const llms = [
    '# Porsche Design System',
    '',
    '> Design tokens, web components and framework wrappers for building Porsche web applications.',
    '',
    '## Docs',
    '',
    ...llmsEntries,
    '',
  ].join('\n');
  fs.writeFileSync(path.join(outDir, 'llms.txt'), llms);

  console.warn(`[storefront] wrote ${llmsEntries.length} Markdown page(s) and llms.txt to "dist"`);
};

buildMarkdown().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
