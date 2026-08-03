import { PHeading, PLinkPure, PText } from '@porsche-design-system/components-react/ssr';
import Link from 'next/link';
import type { PropsWithChildren } from 'react';
import { getChangelogAnchorId } from '@/utils/extractChangelogVersion';

/**
 * The typography MDX maps its markdown headings and paragraphs to, kept out of `mdx-components.tsx`
 * so components that need to match MDX prose can import them without pulling the whole MDX mapping —
 * and, for client components, its entire module graph — across the client boundary.
 */

export const H1 = ({ children }: PropsWithChildren) => (
  <PHeading tag="h1" size="3xl" id="main-heading" className="mt-fluid-lg mb-fluid-md max-w-(--max-width-prose)">
    {children}
  </PHeading>
);

export const H2 = ({ children }: PropsWithChildren) => {
  const id = getChangelogAnchorId(children as string);

  return (
    <PHeading
      tag="h2"
      size="xl"
      className="mt-fluid-lg mb-fluid-md max-w-(--max-width-prose) group scroll-mt-14 focus-visible:outline outline-focus outline-offset-2 rounded-lg"
      id={id}
      tabIndex={-1}
    >
      {children}
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
};

export const H3 = ({ children }: PropsWithChildren) => (
  <PHeading tag="h3" size="large" className="mt-fluid-lg mb-fluid-md max-w-(--max-width-prose)">
    {children}
  </PHeading>
);

export const H4 = ({ children }: PropsWithChildren) => (
  <PHeading tag="h4" size="md" className="my-fluid-md max-w-(--max-width-prose)">
    {children}
  </PHeading>
);

export const H5 = ({ children }: PropsWithChildren) => (
  <PHeading tag="h5" size="sm" weight="semibold" className="my-fluid-md max-w-(--max-width-prose)">
    {children}
  </PHeading>
);

export const H6 = ({ children }: PropsWithChildren) => (
  <PHeading tag="h6" size="sm" weight="semibold" className="my-fluid-md max-w-(--max-width-prose)">
    {children}
  </PHeading>
);

export const P = ({ children }: PropsWithChildren) => (
  <PText className="my-fluid-sm max-w-(--max-width-prose)">{children}</PText>
);
