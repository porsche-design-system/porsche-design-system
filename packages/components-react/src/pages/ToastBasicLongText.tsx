import { PToast, useToastManager } from '@porsche-design-system/components-react';
import { useEffect } from 'react';

export const ToastBasicLongTextPage = (): JSX.Element => {
  const { addMessage } = useToastManager();

  useEffect(() => {
    addMessage({ text: 'Some message with a very long text across multiple lines' });
  }, [addMessage]);

  return (
    <div
      className="playground light"
      style={{ width: 240 }}
      title="should render toast multiline message on light background"
    >
      <PToast />
    </div>
  );
};
