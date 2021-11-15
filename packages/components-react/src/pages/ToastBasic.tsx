import { PToast, useToastManager } from '@porsche-design-system/components-react';
import { useEffect } from 'react';

export const ToastBasicPage = (): JSX.Element => {
  const { addMessage } = useToastManager();

  const toastStyle = {
    '--p-toast-position': 'static',
    '--p-toast-skip-timeout': 'true',
  };
  useEffect(() => {
    addMessage({ message: `Some message` });
  }, []);

  return (
    <div className="playground light" title="should render toast neutral on light background">
      <PToast style={toastStyle as any} />
    </div>
  );
};
