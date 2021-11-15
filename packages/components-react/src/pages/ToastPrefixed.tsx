import { PorscheDesignSystemProvider, PToast, useToastManager } from '@porsche-design-system/components-react';
import { useEffect } from 'react';

export const ToastPrefixedPage = (): JSX.Element => {
  const { addMessage } = useToastManager();

  const toastStyle = {
    '--p-toast-position': 'static',
    '--p-toast-skip-timeout': 'true',
  };
  useEffect(() => {
    addMessage({ message: `Some message` });
  }, []);

  return (
    <div className="playground light" title="should render prefixed toast neutral on light background">
      <PorscheDesignSystemProvider prefix="my-prefix">
        <PToast style={toastStyle as any} />
      </PorscheDesignSystemProvider>
    </div>
  );
};
