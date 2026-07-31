'use client';

import { useContext } from 'react';
import { StorefrontFrameworkContext } from '@/components/providers/StorefrontFrameworkProvider';
import { resolveFramework } from '@/models/framework';

/**
 * Storefront-wide framework selection. `storefrontFramework` is the raw selection, which can be `next`
 * where a page offers it; `framework` is the supported framework it maps to.
 */
export const useStorefrontFramework = () => {
  const context = useContext(StorefrontFrameworkContext);
  if (!context) {
    throw new Error('useStorefrontFramework must be used within a StorefrontFrameworkProvider');
  }
  return { ...context, framework: resolveFramework(context.storefrontFramework) };
};
