import { PToast, useToastManager } from '@porsche-design-system/components-react';
import { useEffect } from 'react';

export const ToastBasicPage = (): JSX.Element => {
  const { addMessage } = useToastManager();

  useEffect(() => {
    addMessage({ message: `Some message` });
  }, [addMessage]);

  return (
    <div className="playground light" title="should render toast neutral on light background">
      <PToast />
    </div>
  );
};
