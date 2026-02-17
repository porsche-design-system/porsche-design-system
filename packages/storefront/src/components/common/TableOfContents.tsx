import { PHeading, PLinkPure } from '@porsche-design-system/components-react/ssr';
import Link from 'next/link';
import { getChangelogAnchorId } from '@/utils/extractChangelogVersion';

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
              <Link href={`#${getChangelogAnchorId(heading)}`}>{heading}</Link>
            </PLinkPure>
          </li>
        ))}
      </ul>
    </>
  );
};
