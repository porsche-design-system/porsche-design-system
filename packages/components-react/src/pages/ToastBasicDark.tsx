import { PToast, useToastManager } from '@porsche-design-system/components-react';
import { useEffect } from 'react';

export const ToastBasicDarkPage = (): JSX.Element => {
  const { addMessage } = useToastManager();

  useEffect(() => {
    addMessage({ text: `Some message` });
  }, [addMessage]);

  return (
    <div className="playground dark" title="should render toast neutral on dark background">
      <PToast theme="dark" />
    </div>
  );
};
