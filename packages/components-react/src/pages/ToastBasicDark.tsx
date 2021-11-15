import { PToast, useToastManager } from '@porsche-design-system/components-react';
import { useEffect } from 'react';

export const ToastBasicDarkPage = (): JSX.Element => {
  const { addMessage } = useToastManager();
  const toastStyle = {
    '--p-toast-position': 'static',
    '--p-toast-skip-timeout': 'true',
  };
  useEffect(() => {
    addMessage({ message: `Some message` });
  }, []);

  return (
    <div className="playground dark" title="should render toast neutral on dark background">
      <PToast style={toastStyle as any} theme={'dark'} />
    </div>
  );
};
