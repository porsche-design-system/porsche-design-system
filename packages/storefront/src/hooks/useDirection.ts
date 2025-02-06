import { DirectionContext } from '@/components/providers/DirectionProvider';
import { useContext } from 'react';

export const useDirection = () => {
  const context = useContext(DirectionContext);
  if (!context) {
    throw new Error('useDirection must be used within a DirectionProvider');
  }
  return context;
};
