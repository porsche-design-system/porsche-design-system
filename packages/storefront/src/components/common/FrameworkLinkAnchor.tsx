'use client';

import { PLinkPure } from '@porsche-design-system/components-react/ssr';
import type { Framework } from '@porsche-design-system/shared';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { useFrameworkValue } from '@/hooks/useFrameworkValue';

type FrameworkLinkAnchorProps = {
  /** Route per framework, pre-resolved on the server by `FrameworkLink`. */
  hrefs: Record<Framework, string>;
  children: ReactNode;
};

/** Client part of `FrameworkLink`, picking the route of the selected framework. */
export const FrameworkLinkAnchor = ({ hrefs, children }: FrameworkLinkAnchorProps) => (
  <PLinkPure icon="none" underline={true}>
    <Link href={useFrameworkValue(hrefs)}>{children}</Link>
  </PLinkPure>
);
