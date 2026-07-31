'use client';

import { PLinkPure } from '@porsche-design-system/components-react/ssr';
import type { Framework } from '@porsche-design-system/shared';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { useStorefrontFramework } from '@/hooks/useStorefrontFramework';

type FrameworkLinkAnchorProps = {
  /** Route per framework, pre-resolved on the server by `FrameworkLink`. */
  hrefs: Record<Framework, string>;
  children: ReactNode;
};

/** Client part of `FrameworkLink`, picking the route of the selected framework. */
export const FrameworkLinkAnchor = ({ hrefs, children }: FrameworkLinkAnchorProps) => {
  const { framework } = useStorefrontFramework();

  return (
    <PLinkPure icon="none" underline={true}>
      <Link href={hrefs[framework]}>{children}</Link>
    </PLinkPure>
  );
};
