import { PorscheDesignSystemProvider, PToast, useToastManager } from '@porsche-design-system/components-react';
import { useEffect } from 'react';

export const ToastPrefixedPage = (): JSX.Element => {
  const { addMessage } = useToastManager();

  const style = `p-toast {
    --p-toast-position: static;
    --p-toast-skip-timeout: true;
  }`;

  useEffect(() => {
    addMessage({ message: `Some message` });
  }, [addMessage]);

  return (
    <>
      <style children={style} />
      <div className="playground light" title="should render prefixed toast neutral on light background">
        <PorscheDesignSystemProvider prefix="my-prefix">
          <PToast />
        </PorscheDesignSystemProvider>
      </div>
    </>
  );
};
