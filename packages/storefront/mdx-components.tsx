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

import React from 'react';

import { CodeBlock } from '@/components/common/CodeBlock';
import { H1, H2, H3, H4, H5, H6, P } from '@/components/common/MdxTypography';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <H1>{children as React.ReactNode}</H1>,
    h2: ({ children }) => <H2>{children as React.ReactNode}</H2>,
    h3: ({ children }) => <H3>{children as React.ReactNode}</H3>,
    h4: ({ children }) => <H4>{children as React.ReactNode}</H4>,
    h5: ({ children }) => <H5>{children as React.ReactNode}</H5>,
    h6: ({ children }) => <H6>{children as React.ReactNode}</H6>,
    p: ({ children }) => <P>{children as React.ReactNode}</P>,
    hr: ({ children }) => <PDivider className="my-fluid-lg">{children as React.ReactNode}</PDivider>,
    ul: ({ children }) => (
      <PTextList className="my-fluid-sm ms-static-lg max-w-(--max-width-prose)">
        {children as React.ReactNode}
      </PTextList>
    ),
    ol: ({ children }) => (
      <PTextList className="my-fluid-sm ms-static-lg max-w-(--max-width-prose)" type="numbered">
        {children as React.ReactNode}
      </PTextList>
    ),
    li: ({ children }) => <PTextListItem>{children as React.ReactNode}</PTextListItem>,
    table: ({ children }) => (
      <PTable className="my-fluid-md" caption="table">
        {children as React.ReactNode}
      </PTable>
    ),
    thead: ({ children }) => <PTableHead>{children as React.ReactNode}</PTableHead>,
    th: ({ children }) => <PTableHeadCell>{children as React.ReactNode}</PTableHeadCell>,
    tbody: ({ children }) => <PTableBody>{children as React.ReactNode}</PTableBody>,
    td: ({ children }) => <PTableCell multiline={true}>{children as React.ReactNode}</PTableCell>,
    tr: ({ children }) => <PTableRow>{children as React.ReactNode}</PTableRow>,
    a: ({ href, children }) => (
      <PLinkPure icon="none" underline={true}>
        <Link href={href as string}>{children as React.ReactNode}</Link>
      </PLinkPure>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-fluid-sm ps-static-md border-s-4 border-solid border-contrast-low">
        {children as React.ReactNode}
      </blockquote>
    ),
    // A fenced code block reaches the mapping as `pre > code`, so the language and the code are read
    // from the `code` element instead of rendering it; `code` itself then only handles inline code.
    pre: ({ children }) => {
      const { className, children: code } = React.isValidElement<{ className?: string; children?: React.ReactNode }>(
        children
      )
        ? children.props
        : { className: undefined, children };

      return (
        <CodeBlock language={/language-(\w+)/.exec(className || '')?.[1]}>
          {typeof code === 'string' ? code : ''}
        </CodeBlock>
      );
    },
    code: ({ children }) => <code className="my-fluid-md rounded-lg">{children as React.ReactNode}</code>,
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
