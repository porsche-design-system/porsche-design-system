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
import { kebabCase } from 'change-case';
import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';
import Link from 'next/link';
import type React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    wrapper: ({ children }) => (
      <article className="col-span-full xs:col-start-2 xs:col-end-12">{children as React.ReactNode}</article>
    ),
    h1: ({ children }) => (
      <PDisplay tag="h1" size="medium" className="mt-lg mb-md max-w-prose">
        {children as React.ReactNode}
      </PDisplay>
    ),
    h2: ({ children }) => (
      <PHeading tag="h2" size="x-large" className="mt-lg mb-md max-w-prose group" id={kebabCase(children as string)}>
        {children as React.ReactNode}
        <PLinkPure
          className="ms-static-sm invisible group-hover:visible"
          title="Link to this heading"
          icon="none"
          size="inherit"
        >
          <Link href={`#${kebabCase(children as string)}`}>#</Link>
        </PLinkPure>
      </PHeading>
    ),
    h3: ({ children }) => (
      <PHeading tag="h3" size="large" className="mt-lg mb-md max-w-prose">
        {children as React.ReactNode}
      </PHeading>
    ),
    h4: ({ children }) => (
      <PHeading tag="h4" size="medium" className="my-md max-w-prose">
        {children as React.ReactNode}
      </PHeading>
    ),
    h5: ({ children }) => (
      <PHeading tag="h5" size="small" className="my-md max-w-prose">
        {children as React.ReactNode}
      </PHeading>
    ),
    h6: ({ children }) => (
      <PHeading tag="h6" size="small" className="my-md max-w-prose">
        {children as React.ReactNode}
      </PHeading>
    ),
    p: ({ children }) => <PText className="my-sm max-w-prose">{children as React.ReactNode}</PText>,
    hr: ({ children }) => <PDivider className="my-lg">{children as React.ReactNode}</PDivider>,
    ul: ({ children }) => (
      <PTextList className="my-sm ms-static-lg max-w-prose">{children as React.ReactNode}</PTextList>
    ),
    ol: ({ children }) => (
      <PTextList className="my-sm ms-static-lg max-w-prose" type="numbered">
        {children as React.ReactNode}
      </PTextList>
    ),
    li: ({ children }) => <PTextListItem>{children as React.ReactNode}</PTextListItem>,
    table: ({ children }) => (
      <PTable className="my-md" caption="table">
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
      <blockquote className="my-sm ps-static-md border-s-4 border-solid border-contrast-low">
        {children as React.ReactNode}
      </blockquote>
    ),
    pre: ({ children }) => <pre className="my-sm">{children as React.ReactNode}</pre>,
    code: ({ children, className }) => {
      const hasLang = /language-(\w+)/.exec(className || '');

      return (
        <code className="my-md">
          {hasLang ? (
            // @ts-expect-error
            <SyntaxHighlighter
              language={
                {
                  js: 'javascript',
                  javascript: 'javascript',
                  ts: 'typescript',
                  typescript: 'typescript',
                  diff: 'diff',
                  json: 'json',
                  html: 'html',
                  scss: 'scss',
                  css: 'css',
                  shell: 'shell',
                  bash: 'bash',
                  tsx: 'typescript',
                  jsx: 'javascript',
                }[hasLang[1]] || 'javascript'
              }
              PreTag="div"
              CodeTag="div"
              showLineNumbers={false}
              useInlineStyles={false}
            >
              {children as React.ReactNode}
            </SyntaxHighlighter>
          ) : (
            (children as React.ReactNode)
          )}
        </code>
      );
    },
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
