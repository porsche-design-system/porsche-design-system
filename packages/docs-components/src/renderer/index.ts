import path from 'node:path';
import { pathToFileURL } from 'node:url';
import type { MarkdownOptions } from './define';
import { jsx } from './jsx-runtime';
import { renderToMarkdown } from './render';

export type { Destination, Framework, MarkdownContext, MarkdownOptions, MarkdownRenderer } from './define';
export { defineMarkdownComponent } from './define';
export { renderToMarkdown, renderToMdast } from './render';

const USAGE =
  'Run Node with `--conditions=markdown --import tsx --import @porsche-design-system/docs-components/register`.';

/**
 * Imports an MDX file and renders it to Markdown. The process needs the `markdown` export condition and the MDX hook,
 * so that the file and every component it imports resolve to their Markdown implementations.
 */
export const renderMdxFileToMarkdown = async (file: string, options: MarkdownOptions): Promise<string> => {
  let mdxModule: { default: unknown };
  try {
    mdxModule = await import(pathToFileURL(path.resolve(file)).href);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ERR_UNKNOWN_FILE_EXTENSION') {
      throw new Error(`Cannot import ${file}: the MDX hook is not registered. ${USAGE}`);
    }
    throw error;
  }
  try {
    return renderToMarkdown(jsx(mdxModule.default as () => unknown, {}), options);
  } catch (error) {
    throw new Error(`${file}: ${(error as Error).message}`, { cause: error });
  }
};
