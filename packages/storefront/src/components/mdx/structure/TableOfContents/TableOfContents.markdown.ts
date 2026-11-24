import { defineMarkdownComponent, type MarkdownComponentOf } from '@porsche-design-system/docs-components/markdown';
import type { TableOfContents as ReactTableOfContents } from './TableOfContents';

/**
 * Nothing. The page's headings are already its structure in Markdown, so a list of links to them would only repeat
 * them.
 */
export const TableOfContents: MarkdownComponentOf<typeof ReactTableOfContents> = defineMarkdownComponent(
  'TableOfContents',
  () => []
);
