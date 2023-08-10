'use client';

import { PToast, useToastManager } from '@porsche-design-system/components-react/ssr';
import type { Theme } from '@porsche-design-system/components-react/ssr';
import { useEffect } from 'react';

export const Toast = ({ text, theme }: { text: string; theme?: Theme }): JSX.Element => {
  const { addMessage } = useToastManager();
  useEffect(() => {
    addMessage({ text });
  }, [addMessage, text]);

  return <PToast theme={theme} />;
};
