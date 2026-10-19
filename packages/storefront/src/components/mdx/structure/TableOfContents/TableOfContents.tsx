import { PHeading, PLinkPure } from '@porsche-design-system/components-react/ssr';
import { DocsLink } from '@/components/common/DocsLink';
import { getHeadingAnchorId } from '@/links';

type TableOfContentsProps = {
  headings: string[];
};

export const TableOfContents = ({ headings }: TableOfContentsProps) => {
  if (headings.length === 0) {
    return null;
  }

  return (
    <>
      <PHeading className="mt-fluid-lg" size="medium" tag="h2">
        Table of Contents
      </PHeading>
      <ul className="toc mt-fluid-sm mb-fluid-lg">
        {headings.map((heading) => (
          <li key={heading}>
            <PLinkPure iconSource="assets/icon-return.svg">
              <DocsLink href={`#${getHeadingAnchorId(heading)}`}>{heading}</DocsLink>
            </PLinkPure>
          </li>
        ))}
      </ul>
    </>
  );
};
