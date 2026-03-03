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

import type React from 'react';
import type { PropsWithChildren } from 'react';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { getChangelogAnchorId } from '@/utils/extractChangelogVersion';

export const H3 = ({ children }: PropsWithChildren) => (
  <PHeading tag="h3" size="large" className="mt-fluid-lg mb-fluid-md max-w-(--max-width-prose)">
    {children}
  </PHeading>
);

export const P = ({ children }: PropsWithChildren) => (
  <PText className="my-fluid-sm max-w-(--max-width-prose)">{children}</PText>
);

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    wrapper: ({ children }) => (
      // biome-ignore lint/correctness/useUniqueElementIds: ok
      <article id="main-content" className="col-span-full xs:col-start-2 xs:col-end-12">
        {children as React.ReactNode}
      </article>
    ),
    h1: ({ children }) => (
      <PDisplay tag="h1" size="small" className="mt-fluid-lg mb-fluid-md max-w-(--max-width-prose)">
        {children as React.ReactNode}
      </PDisplay>
    ),
    h2: ({ children }) => {
      const text = children as string;
      const id = getChangelogAnchorId(text);

      return (
        <PHeading
          tag="h2"
          size="x-large"
          className="mt-fluid-lg mb-fluid-md max-w-(--max-width-prose) group scroll-mt-14"
          id={id}
        >
          {children as React.ReactNode}
          <PLinkPure
            className="ms-static-sm invisible group-hover:visible"
            title="Link to this heading"
            icon="none"
            size="inherit"
          >
            <Link href={`#${id}`}>#</Link>
          </PLinkPure>
        </PHeading>
      );
    },
    h3: ({ children }) => <H3>{children as React.ReactNode}</H3>,
    h4: ({ children }) => (
      <PHeading tag="h4" size="medium" className="my-fluid-md max-w-(--max-width-prose)">
        {children as React.ReactNode}
      </PHeading>
    ),
    h5: ({ children }) => (
      <PHeading tag="h5" size="small" className="my-fluid-md max-w-(--max-width-prose)">
        {children as React.ReactNode}
      </PHeading>
    ),
    h6: ({ children }) => (
      <PHeading tag="h6" size="small" className="my-fluid-md max-w-(--max-width-prose)">
        {children as React.ReactNode}
      </PHeading>
    ),
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
    pre: ({ children }) => (
      <pre className="my-fluid-sm" dir="ltr">
        {children as React.ReactNode}
      </pre>
    ),
    code: ({ children, className }) => {
      const hasLang = /language-(\w+)/.exec(className || '');

      return (
        <>
          {hasLang ? (
            <code
              className="my-fluid-md p-fluid-md max-h-96 overflow-auto rounded-4xl focus-visible:outline-focus outline outline-solid outline-transparent outline-offset-2"
              tabIndex={0}
            >
              {/* @ts-expect-error */}
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
            </code>
          ) : (
            <code className="my-fluid-md rounded-lg">{children as React.ReactNode}</code>
          )}
        </>
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
