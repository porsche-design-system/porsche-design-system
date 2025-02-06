import { TextZoomContext } from '@/components/providers/TextZoomProvider';
import { useContext } from 'react';

export const useTextZoom = () => {
  const context = useContext(TextZoomContext);
  if (!context) {
    throw new Error('useTextZoom must be used within a TextZoomProvider');
  }
  return context;
};
