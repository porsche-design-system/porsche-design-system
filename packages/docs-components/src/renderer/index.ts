import type { Framework } from './define';
import { importMdx, renderMdxModule } from './mdx';
import { serializeMarkdown } from './render';

export type { Framework, MarkdownContext, MarkdownOptions, MarkdownRenderer } from './define';
export { defineMarkdownComponent, FRAMEWORKS } from './define';
export type { PageMetadata } from './mdx';
export type { LinkResolver, LinkSource, LinkTarget, Page, PageKind, PageSource, Site } from './pages';
export {
  collectPages,
  createSite,
  findPages,
  markdownFile,
  pageToMarkdown,
  skillLinks,
  skillReference,
  webLinks,
} from './pages';
export { renderToMarkdown, renderToMdast, serializeMarkdown } from './render';

/** Imports an MDX file and renders it to Markdown for one framework, leaving its links as they are. */
export const renderMdxFileToMarkdown = async (file: string, framework: Framework): Promise<string> =>
  serializeMarkdown(renderMdxModule(file, await importMdx(file), framework));
