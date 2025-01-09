import {
  PDivider,
  PLinkPure,
  PTable,
  PTableBody,
  PTableCell,
  PTableHead,
  PTableHeadCell,
  PTableRow,
  PTextList,
  PTextListItem,
} from '@porsche-design-system/components-react/ssr';
import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => <h1 className="pds-heading-xx-large">{children as React.ReactNode}</h1>,
    h2: ({ children }) => <h2 className="pds-heading-x-large">{children as React.ReactNode}</h2>,
    h3: ({ children }) => <h3 className="pds-heading-large">{children as React.ReactNode}</h3>,
    h4: ({ children }) => <h4 className="pds-heading-medium">{children as React.ReactNode}</h4>,
    h5: ({ children }) => <h5 className="pds-heading-small">{children as React.ReactNode}</h5>,
    h6: ({ children }) => <h6 className="pds-heading-small">{children as React.ReactNode}</h6>,
    p: ({ children }) => <p className="pds-text-small">{children as React.ReactNode}</p>,
    hr: ({ children }) => <PDivider>{children as React.ReactNode}</PDivider>,
    ul: ({ children }) => <PTextList>{children as React.ReactNode}</PTextList>,
    ol: ({ children }) => <PTextList type="numbered">{children as React.ReactNode}</PTextList>,
    li: ({ children }) => <PTextListItem>{children as React.ReactNode}</PTextListItem>,
    table: ({ children }) => <PTable>{children as React.ReactNode}</PTable>,
    thead: ({ children }) => <PTableHead>{children as React.ReactNode}</PTableHead>,
    th: ({ children }) => <PTableHeadCell>{children as React.ReactNode}</PTableHeadCell>,
    tbody: ({ children }) => <PTableBody>{children as React.ReactNode}</PTableBody>,
    td: ({ children }) => <PTableCell>{children as React.ReactNode}</PTableCell>,
    tr: ({ children }) => <PTableRow>{children as React.ReactNode}</PTableRow>,
    a: ({ href, children }) => (
      <PLinkPure icon={'none'}>
        <Link href={href!}>{children as React.ReactNode}</Link>
      </PLinkPure>
    ),
    ...components,
  };
}
