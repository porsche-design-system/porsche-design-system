import { PorscheDesignSystemProvider, PToast, useToastManager } from '@porsche-design-system/components-react';
import { useEffect } from 'react';

export const ToastPrefixedPage = (): JSX.Element => {
  return (
    <PorscheDesignSystemProvider prefix="my-prefix">
      <ToastPrefixed />
    </PorscheDesignSystemProvider>
  );
};

const ToastPrefixed = (): JSX.Element => {
  const { addMessage } = useToastManager();

  useEffect(() => {
    addMessage({ message: `Some message` });
  }, [addMessage]);
  return (
    <div className="playground light" title="should render prefixed toast neutral on light background">
      <PToast />
    </div>
  );
};
