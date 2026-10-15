'use client';

import { PLinkPure } from '@porsche-design-system/components-react/ssr';
import type { Framework } from '@porsche-design-system/shared';
import type { ReactNode } from 'react';
import { DocsLink } from '@/components/common/DocsLink';
import { useStorefrontFramework } from '@/hooks/useStorefrontFramework';
import type { DocsHref } from '@/links';

type FrameworkLinkAnchorProps = {
  /** Route per framework, pre-resolved on the server by `FrameworkLink`. */
  hrefs: Record<Framework, DocsHref>;
  children: ReactNode;
};

/** Client part of `FrameworkLink`, picking the route of the selected framework. */
export const FrameworkLinkAnchor = ({ hrefs, children }: FrameworkLinkAnchorProps) => {
  const { framework } = useStorefrontFramework();

  return (
    <PLinkPure icon="none" underline={true}>
      <DocsLink href={hrefs[framework]}>{children}</DocsLink>
    </PLinkPure>
  );
};
