import { PHeading, PLinkPure, PText } from '@porsche-design-system/components-react/ssr';
import type { PropsWithChildren } from 'react';
import { DocsLink } from '@/components/common/DocsLink';
import { getHeadingAnchorId } from '@/links';

/**
 * The typography MDX maps its markdown headings and paragraphs to, kept out of `mdxComponents.tsx`
 * so components that need to match MDX prose can import them without pulling the whole MDX mapping —
 * and, for client components, its entire module graph — across the client boundary.
 */

export const H1 = ({ children }: PropsWithChildren) => (
  <PHeading tag="h1" size="3xl" id="main-heading" className="mt-fluid-lg mb-fluid-md max-w-(--max-width-prose)">
    {children}
  </PHeading>
);

/** A heading with the anchor a `TableOfContents` links to, factored out so `H2` and `H3Anchored` share it. */
const AnchoredHeading = ({ tag, size, children }: { tag: 'h2' | 'h3'; size: 'xl' | 'large' } & PropsWithChildren) => {
  const id = getHeadingAnchorId(children as string);

  return (
    <PHeading
      tag={tag}
      size={size}
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
        <DocsLink href={`#${id}`}>#</DocsLink>
      </PLinkPure>
    </PHeading>
  );
};

export const H2 = ({ children }: PropsWithChildren) => (
  <AnchoredHeading tag="h2" size="xl">
    {children}
  </AnchoredHeading>
);

export const H3 = ({ children }: PropsWithChildren) => (
  <PHeading tag="h3" size="lg" className="mt-fluid-lg mb-fluid-md max-w-(--max-width-prose)">
    {children}
  </PHeading>
);

/**
 * An anchored `h3`, for a page whose `TableOfContents` links into sub-sections of a `H2` group – unlike the plain `H3`
 * markdown maps to, which stays anchor-less since more than one page repeats the same `###` text, which would repeat
 * the same `id` as well.
 */
export const H3Anchored = ({ children }: PropsWithChildren) => (
  <AnchoredHeading tag="h3" size="large">
    {children}
  </AnchoredHeading>
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
