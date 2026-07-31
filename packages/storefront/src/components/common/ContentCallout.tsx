import { type IconName, PIcon, PText } from '@porsche-design-system/components-react/ssr';
import type { ReactNode } from 'react';

type ContentCalloutProps = {
  /** Title of the callout; also names the landmark. Deliberately not a heading, so the page outline
   * and its table of contents keep matching the markdown headings. */
  title: string;
  icon?: IconName;
  children?: ReactNode;
};

/** Highlighted section for MDX content, e.g. to promote a shortcut above the regular instructions. */
export const ContentCallout = ({ title, icon, children }: ContentCalloutProps) => (
  <aside
    className="my-fluid-md p-fluid-md rounded-3xl bg-info-frosted-soft forced-colors:outline [&>*:last-child]:mb-0"
    aria-label={title}
  >
    <div className="flex items-center gap-static-xs">
      {icon && <PIcon name={icon} color="info" />}
      <PText weight="semibold">{title}</PText>
    </div>
    {children}
  </aside>
);
