'use client';

import { StorefrontFrameworkContext } from '@/components/providers/StorefrontFrameworkProvider';
import { useContext } from 'react';

export const useStorefrontFramework = () => {
  const context = useContext(StorefrontFrameworkContext);
  if (!context) {
    throw new Error('useSelectedFramework must be used within a SelectedFrameworkProvider');
  }
  return context;
};
