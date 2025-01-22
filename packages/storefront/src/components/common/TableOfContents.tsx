import { PHeading, PLinkPure } from '@porsche-design-system/components-react/ssr';
import { kebabCase } from 'change-case';
import Link from 'next/link';

type TableOfContentsProps = {
  headings: string[];
};

export const TableOfContents = ({ headings }: TableOfContentsProps) => {
  if (headings.length === 0) {
    return null;
  }

  return (
    <>
      <PHeading className="mt-lg" size="medium" tag="h2">
        Table of Contents
      </PHeading>
      <ul className="mt-sm mb-lg">
        {headings.map((heading) => (
          <li key={heading}>
            <PLinkPure iconSource="assets/icon-return.svg">
              <Link href={`#${kebabCase(heading)}`}>{heading}</Link>
            </PLinkPure>
          </li>
        ))}
      </ul>
    </>
  );
};
