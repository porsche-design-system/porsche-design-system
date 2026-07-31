'use client';

import type { Framework } from '@porsche-design-system/shared';
import { useStorefrontFramework } from '@/hooks/useStorefrontFramework';

/** Picks the variant of the storefront-wide selected framework. */
export const useFrameworkValue = <T>(values: Record<Framework, T>): T =>
  values[useStorefrontFramework().storefrontFramework];
