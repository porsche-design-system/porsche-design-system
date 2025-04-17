'use client';

import { StorefrontDirectionContext } from '@/components/providers/StorefrontDirectionProvider';
import { useContext } from 'react';

export const useDirection = () => {
  const context = useContext(StorefrontDirectionContext);
  if (!context) {
    throw new Error('useDirection must be used within a DirectionProvider');
  }
  return context;
};
