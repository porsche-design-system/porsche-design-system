'use client';

import { PToast, useToastManager } from '@porsche-design-system/components-react/ssr';
import { useEffect } from 'react';

export const Toast = ({ text }: { text: string }): JSX.Element => {
  const { addMessage } = useToastManager();
  useEffect(() => {
    addMessage({ text });
  }, [addMessage, text]);

  return <PToast />;
};
