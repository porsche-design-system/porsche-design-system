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
      <PHeading size="medium" tag="h2">
        Table of Contents
      </PHeading>
      <ul>
        {headings.map((heading) => (
          <li key={heading}>
            <PLinkPure>
              <Link href={`#${kebabCase(heading)}`}>{heading}</Link>
            </PLinkPure>
          </li>
        ))}
      </ul>
    </>
  );
};
