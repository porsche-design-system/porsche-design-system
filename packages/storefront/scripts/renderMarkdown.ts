import { parseArgs } from 'node:util';
import { type Framework, renderMdxFileToMarkdown } from '@porsche-design-system/docs-components/markdown';

/**
 * Renders a Storefront MDX page to the Markdown an agent reads, e.g.
 * `npm run render:markdown -- 'src/app/(main)/developing/react/getting-started/page.mdx'`.
 * The first slice of #4142; the build will later write one `.md` per page instead.
 */

const STOREFRONT_URL = 'https://designsystem.porsche.com/v4';

const main = async (): Promise<void> => {
  const { positionals, values } = parseArgs({
    allowPositionals: true,
    options: { framework: { type: 'string', default: 'react' } },
  });
  const [file] = positionals;
  if (!file) {
    throw new Error('Pass the MDX page to render.');
  }

  const markdown = await renderMdxFileToMarkdown(file, {
    framework: values.framework as Framework,
    destination: 'web',
    resolveLink: (href) => (href.startsWith('/') ? `${STOREFRONT_URL}${href}` : href),
  });
  process.stdout.write(markdown);
};

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
