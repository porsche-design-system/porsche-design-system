import { PToast, useToastManager } from '@porsche-design-system/components-react/ssr';
import type { Theme } from '@porsche-design-system/components-react/ssr';
import { useEffect } from 'react';

export const Toast = ({ text, theme, state }: { text: string; theme?: Theme; state: string }): JSX.Element => {
  const { addMessage } = useToastManager();
  useEffect(() => {
    addMessage({ text });
  }, [addMessage, text, state]);

  return <PToast theme={theme} />;
};
