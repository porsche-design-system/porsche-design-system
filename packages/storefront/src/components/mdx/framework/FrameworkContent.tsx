'use client';

import type { Framework } from '@porsche-design-system/shared';
import type { ReactNode } from 'react';
import { useStorefrontFramework } from '@/hooks/useStorefrontFramework';

type FrameworkContentProps = {
  /** The content per framework, resolved on the server. A framework without content renders nothing. */
  content: Partial<Record<Framework, ReactNode>>;
};

/**
 * The client part of every framework-aware MDX component: the server resolves the content for each framework, and this
 * renders the one selected. Only rendered content crosses to the client, never the functions that build it.
 */
export const FrameworkContent = ({ content }: FrameworkContentProps) =>
  content[useStorefrontFramework().framework] ?? null;
