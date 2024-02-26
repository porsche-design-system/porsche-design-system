import type { MDXComponents } from 'mdx/types';
import {
  PDivider,
  PTable,
  PTableBody,
  PTableCell,
  PTableHead,
  PTableHeadCell,
  PTableRow,
  PTextList,
  PTextListItem,
} from '@porsche-design-system/components-react/ssr';

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => <h1 className="mdx-h1">{children}</h1>,
    h2: ({ children }) => <h2 className="mdx-h2">{children}</h2>,
    h3: ({ children }) => <h3 className="mdx-h3">{children}</h3>,
    h4: ({ children }) => <h4 className="mdx-h4">{children}</h4>,
    h5: ({ children }) => <h5 className="mdx-h5">{children}</h5>,
    h6: ({ children }) => <h6 className="mdx-h6">{children}</h6>,
    p: ({ children }) => <p className="mdx-p">{children}</p>,
    hr: ({ children }) => <PDivider>{children}</PDivider>,
    ul: ({ children }) => <PTextList>{children}</PTextList>,
    ol: ({ children }) => <PTextList type="numbered">{children}</PTextList>,
    li: ({ children }) => <PTextListItem>{children}</PTextListItem>,
    table: ({ children }) => <PTable>{children}</PTable>,
    thead: ({ children }) => <PTableHead>{children}</PTableHead>,
    th: ({ children }) => <PTableHeadCell>{children}</PTableHeadCell>,
    tbody: ({ children }) => <PTableBody>{children}</PTableBody>,
    td: ({ children }) => <PTableCell>{children}</PTableCell>,
    tr: ({ children }) => <PTableRow>{children}</PTableRow>,
    ...components,
  };
}
