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
import Image from 'next/image';
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
    hr: ({ children }) => <PDivider className="mt-lg mb-static-md">{children as React.ReactNode}</PDivider>,
    ul: ({ children }) => <PTextList className="mt-md ps-static-lg">{children as React.ReactNode}</PTextList>,
    ol: ({ children }) => (
      <PTextList className="mt-md ps-static-lg" type="numbered">
        {children as React.ReactNode}
      </PTextList>
    ),
    li: ({ children }) => <PTextListItem>{children as React.ReactNode}</PTextListItem>,
    table: ({ children }) => <PTable>{children as React.ReactNode}</PTable>,
    thead: ({ children }) => <PTableHead>{children as React.ReactNode}</PTableHead>,
    th: ({ children }) => <PTableHeadCell>{children as React.ReactNode}</PTableHeadCell>,
    tbody: ({ children }) => <PTableBody>{children as React.ReactNode}</PTableBody>,
    td: ({ children }) => <PTableCell>{children as React.ReactNode}</PTableCell>,
    tr: ({ children }) => <PTableRow>{children as React.ReactNode}</PTableRow>,
    a: ({ href, children }) => (
      <PLinkPure icon={'none'}>
        <Link href={href as string}>{children as React.ReactNode}</Link>
      </PLinkPure>
    ),
    b: ({ children }) => <b className="font-bold">{children as React.ReactNode}</b>,
    strong: ({ children }) => <strong className="font-bold">{children as React.ReactNode}</strong>,
    blockquote: ({ children }) => (
      <blockquote className="ps-static-md border-s-thick border-solid border-contrast-low">
        {children as React.ReactNode}
      </blockquote>
    ),
    code: ({ children }) => <code className="pds-text-small font-code">{children as React.ReactNode}</code>,
    img: ({ src, alt }) => (
      <Image
        src={src as string}
        alt={alt as string}
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }}
      />
    ),
    ...components,
  };
}
