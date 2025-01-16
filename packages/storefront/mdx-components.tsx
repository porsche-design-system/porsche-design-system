import {
  PDisplay,
  PDivider,
  PHeading,
  PLinkPure,
  PTable,
  PTableBody,
  PTableCell,
  PTableHead,
  PTableHeadCell,
  PTableRow,
  PText,
  PTextList,
  PTextListItem,
} from '@porsche-design-system/components-react/ssr';
import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';
import Link from 'next/link';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => (
      <PDisplay tag="h1" size="medium" className="mt-lg max-w-4xl">
        {children as React.ReactNode}
      </PDisplay>
    ),
    h2: ({ children }) => (
      <PHeading tag="h2" size="x-large" className="mt-lg max-w-4xl">
        {children as React.ReactNode}
      </PHeading>
    ),
    h3: ({ children }) => (
      <PHeading tag="h3" size="large" className="mt-lg max-w-4xl">
        {children as React.ReactNode}
      </PHeading>
    ),
    h4: ({ children }) => (
      <PHeading tag="h4" size="medium" className="mt-md max-w-4xl">
        {children as React.ReactNode}
      </PHeading>
    ),
    h5: ({ children }) => (
      <PHeading tag="h5" size="small" className="mt-md max-w-4xl">
        {children as React.ReactNode}
      </PHeading>
    ),
    h6: ({ children }) => (
      <PHeading tag="h6" size="small" className="mt-md max-w-4xl">
        {children as React.ReactNode}
      </PHeading>
    ),
    p: ({ children }) => <PText className="mt-sm max-w-4xl">{children as React.ReactNode}</PText>,
    hr: ({ children }) => <PDivider className="mt-lg mb-static-md">{children as React.ReactNode}</PDivider>,
    ul: ({ children }) => <PTextList className="ps-static-lg max-w-4xl">{children as React.ReactNode}</PTextList>,
    ol: ({ children }) => (
      <PTextList className="ps-static-lg max-w-4xl" type="numbered">
        {children as React.ReactNode}
      </PTextList>
    ),
    li: ({ children }) => <PTextListItem>{children as React.ReactNode}</PTextListItem>,
    table: ({ children }) => (
      <PTable className="mt-md" caption="table">
        {children as React.ReactNode}
      </PTable>
    ),
    thead: ({ children }) => <PTableHead>{children as React.ReactNode}</PTableHead>,
    th: ({ children }) => <PTableHeadCell>{children as React.ReactNode}</PTableHeadCell>,
    tbody: ({ children }) => <PTableBody>{children as React.ReactNode}</PTableBody>,
    td: ({ children }) => <PTableCell>{children as React.ReactNode}</PTableCell>,
    tr: ({ children }) => <PTableRow>{children as React.ReactNode}</PTableRow>,
    a: ({ href, children }) => (
      <PLinkPure icon={'none'} underline={true}>
        <Link href={href as string}>{children as React.ReactNode}</Link>
      </PLinkPure>
    ),
    blockquote: ({ children }) => (
      <blockquote className="ps-static-md border-s-4 border-solid border-contrast-low">
        {children as React.ReactNode}
      </blockquote>
    ),
    code: ({ children }) => <code>{children as React.ReactNode}</code>,
    img: ({ src, alt }) => (
      <Image
        className="w-full h-auto rounded-lg"
        src={src as string}
        alt={alt as string}
        width={0}
        height={0}
        sizes="100vw"
      />
    ),
    ...components,
  };
}
