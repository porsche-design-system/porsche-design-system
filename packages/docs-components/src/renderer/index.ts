import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { FRAMEWORKS, type Framework, type MarkdownOptions } from './define';
import { jsx } from './jsx-runtime';
import { renderToMarkdown } from './render';

export type { Destination, Framework, MarkdownContext, MarkdownOptions, MarkdownRenderer } from './define';
export { defineMarkdownComponent, FRAMEWORKS } from './define';
export { renderToMarkdown, renderToMdast } from './render';

const USAGE =
  'Run Node with `--conditions=markdown --import tsx --import @porsche-design-system/docs-components/register`.';

type MdxModule = {
  default: () => unknown;
  metadata?: PageMetadata;
  /** Declared by pages written for one framework, e.g. `export const framework = 'react'` in a getting-started guide. */
  framework?: unknown;
};

export type PageMetadata = { title?: string; description?: string };

/**
 * The Markdown of a page, by how it depends on the framework:
 * - `specific`: the page declares the framework it is written for, and is rendered for that one only.
 * - `independent`: the page renders the same for every framework.
 * - `switchable`: the page renders differently per framework, so it has one variant each.
 */
export type PageMarkdown =
  | { kind: 'specific'; framework: Framework; markdown: string }
  | { kind: 'independent'; markdown: string }
  | { kind: 'switchable'; variants: Record<Framework, string> };

/**
 * Imports an MDX file. The process needs the `markdown` export condition and the MDX hook, so that the file and every
 * component it imports resolve to their Markdown implementations.
 */
const importMdx = async (file: string): Promise<MdxModule> => {
  try {
    return await import(pathToFileURL(path.resolve(file)).href);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ERR_UNKNOWN_FILE_EXTENSION') {
      throw new Error(`Cannot import ${file}: the MDX hook is not registered. ${USAGE}`);
    }
    throw error;
  }
};

const render = (file: string, mdxModule: MdxModule, options: MarkdownOptions): string => {
  try {
    return renderToMarkdown(jsx(mdxModule.default, {}), options);
  } catch (error) {
    throw new Error(`${file}: ${(error as Error).message}`, { cause: error });
  }
};

const isFramework = (value: unknown): value is Framework => FRAMEWORKS.includes(value as Framework);

/** Imports an MDX file and renders it to Markdown for one framework. */
export const renderMdxFileToMarkdown = async (file: string, options: MarkdownOptions): Promise<string> =>
  render(file, await importMdx(file), options);

/**
 * Imports an MDX page and renders it for every framework it applies to. Rendering is cheap once the page is compiled,
 * so whether a page depends on the framework is found by comparing the results, not declared.
 */
export const renderMdxPage = async (
  file: string,
  options: Omit<MarkdownOptions, 'framework'>
): Promise<{ metadata: PageMetadata; markdown: PageMarkdown }> => {
  const mdxModule = await importMdx(file);
  const metadata = mdxModule.metadata ?? {};

  if (mdxModule.framework !== undefined) {
    if (!isFramework(mdxModule.framework)) {
      throw new Error(`${file}: \`framework\` must be one of ${FRAMEWORKS.join(', ')}.`);
    }
    const { framework } = mdxModule;
    return {
      metadata,
      markdown: { kind: 'specific', framework, markdown: render(file, mdxModule, { ...options, framework }) },
    };
  }

  const variants = Object.fromEntries(
    FRAMEWORKS.map((framework) => [framework, render(file, mdxModule, { ...options, framework })])
  ) as Record<Framework, string>;
  const [first, ...rest] = Object.values(variants);
  return {
    metadata,
    markdown: rest.every((variant) => variant === first)
      ? { kind: 'independent', markdown: first }
      : { kind: 'switchable', variants },
  };
};
