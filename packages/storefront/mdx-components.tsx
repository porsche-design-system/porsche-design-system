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

import React from 'react';
import { DocsLink } from '@/components/common/DocsLink';
import { CodeBlock } from '@/components/mdx/shared/CodeBlock';
import { H1, H2, H3, H4, H5, H6, P } from '@/components/mdx/shared/MdxTypography';
import type { DocsHref } from '@/links';

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
    // MDX isn't typechecked: `tests/unit/specs/links.spec.ts` checks its links against the sitemap instead.
    a: ({ href = '', children }) => (
      <PLinkPure icon="none" underline={true}>
        <DocsLink href={href as DocsHref}>{children as React.ReactNode}</DocsLink>
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
        <CodeBlock className="my-fluid-md" language={/language-(\w+)/.exec(className || '')?.[1]}>
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
