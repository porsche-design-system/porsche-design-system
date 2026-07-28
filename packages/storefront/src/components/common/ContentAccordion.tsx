'use client';

import {
  type AccordionUpdateEventDetail,
  type IconName,
  PAccordion,
  PHeading,
  PIcon,
} from '@porsche-design-system/components-react/ssr';
import { type ReactNode, useState } from 'react';

type ContentAccordionProps = {
  heading: string;
  headingTag?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  icon?: IconName;
  open?: boolean;
  children?: ReactNode;
};

/** Collapsible section for MDX content, e.g. to offer an optional shortcut without dominating the page. */
export const ContentAccordion = ({
  heading,
  headingTag = 'h3',
  icon,
  open = false,
  children,
}: ContentAccordionProps) => {
  const [isOpen, setIsOpen] = useState(open);

  return (
    <PAccordion
      className="max-w-(--max-width-prose)"
      indent={true}
      open={isOpen}
      onUpdate={(e: CustomEvent<AccordionUpdateEventDetail>) => setIsOpen(e.detail.open)}
    >
      <div slot="summary" className="flex items-center gap-static-xs">
        {icon && <PIcon name={icon} />}
        <PHeading tag={headingTag} size="small" weight="semibold">
          {heading}
        </PHeading>
      </div>
      {/* max-w-0 with min-w-full keeps wide content such as code blocks from stretching the accordion's grid track */}
      <div className="max-w-0 min-w-full">{children}</div>
    </PAccordion>
  );
};
