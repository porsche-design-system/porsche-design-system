'use client';

import { PTabs, PTabsItem } from '@porsche-design-system/components-react/ssr';
import { Children, isValidElement, type ReactElement, type ReactNode } from 'react';

type ContentTabProps = {
  // Label of the tab, rendered in the tab bar.
  label: string;
  children?: ReactNode;
};

/** Single panel of a `ContentTabs` group. Only meaningful as a direct child of `ContentTabs`. */
export const ContentTab = ({ children }: ContentTabProps) => <>{children}</>;

type ContentTabsProps = {
  // Accessible name of the tab bar; a page can contain several independent tab groups.
  label: string;
  children?: ReactNode;
};

/** Tab group for MDX content, switching between alternative variants of the same documentation step. */
export const ContentTabs = ({ label, children }: ContentTabsProps) => {
  const tabs = Children.toArray(children).filter(
    (child): child is ReactElement<ContentTabProps> =>
      isValidElement<ContentTabProps>(child) && typeof child.props.label === 'string'
  );

  if (tabs.length === 0) {
    return null;
  }

  return (
    <PTabs className="my-fluid-md" aria={{ 'aria-label': label }} compact={true}>
      {tabs.map((tab) => (
        <PTabsItem key={tab.props.label} label={tab.props.label}>
          {tab.props.children}
        </PTabsItem>
      ))}
    </PTabs>
  );
};
