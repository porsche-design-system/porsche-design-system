import { PToast, useToastManager } from '@porsche-design-system/components-react';
import type { Theme } from '@porsche-design-system/components-react';
import { useEffect } from 'react';

export const Toast = ({ text, theme }: { text: string; theme?: Theme }): JSX.Element => {
  const { addMessage } = useToastManager();
  useEffect(() => {
    addMessage({ text });
  }, []);

  return <PToast theme={theme} />;
};
