import { defineMarkdownComponent } from '../../renderer/define';
import type { TableOfContentsProps } from './TableOfContents';

/**
 * Nothing. The page's headings are already its structure in Markdown, so a list of links to them would only repeat
 * them.
 */
export const TableOfContents = defineMarkdownComponent<TableOfContentsProps>('TableOfContents', () => []);
