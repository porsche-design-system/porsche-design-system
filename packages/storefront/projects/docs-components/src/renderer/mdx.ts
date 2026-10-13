import path from 'node:path';
import { pathToFileURL } from 'node:url';
import type { Root } from 'mdast';
import type { Framework } from './define';
import { jsx } from './jsx-runtime';
import { renderToMdast } from './render';

const USAGE =
  'Run Node with `--conditions=markdown --import tsx --import @porsche-design-system/docs-components/register`.';

export type PageMetadata = { title?: string; description?: string };

export type MdxModule = {
  default: () => unknown;
  metadata?: PageMetadata;
  /** Declared by pages written for one framework, e.g. `export const framework = 'react'` in a getting-started guide. */
  framework?: unknown;
};

/**
 * Imports an MDX file. The process needs the `markdown` export condition and the MDX hook, so that the file and every
 * component it imports resolve to their Markdown implementations.
 */
export const importMdx = async (file: string): Promise<MdxModule> => {
  try {
    return await import(pathToFileURL(path.resolve(file)).href);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ERR_UNKNOWN_FILE_EXTENSION') {
      throw new Error(`Cannot import ${file}: the MDX hook is not registered. ${USAGE}`);
    }
    throw error;
  }
};

/** Renders an imported MDX file for one framework, naming the file in any error. */
export const renderMdxModule = (file: string, mdxModule: MdxModule, framework: Framework): Root => {
  try {
    return renderToMdast(jsx(mdxModule.default, {}), { framework });
  } catch (error) {
    throw new Error(`${file}: ${(error as Error).message}`, { cause: error });
  }
};
