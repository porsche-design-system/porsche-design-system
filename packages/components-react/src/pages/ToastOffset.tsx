import { PToast, useToastManager } from '@porsche-design-system/components-react';
import { useEffect } from 'react';

export const ToastOffsetPage = (): JSX.Element => {
  const { addMessage } = useToastManager();

  const toastStyle = {
    '--p-toast-position': 'static',
    '--p-toast-skip-timeout': 'true',
    display: 'block',
    marginLeft: '-0.5rem',
    marginRight: '0.5rem',
  };

  useEffect(() => {
    addMessage({ message: `Some message` });
  }, []);

  return (
    <div className="playground light" title="should render toast neutral on light background with offset {bottom: 0}">
      <PToast style={toastStyle as any} offset={{ bottom: 0 }} />
    </div>
  );
};
