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

  const style = `
  .playground {
    height: 300px;
    padding: 0;
    transform: translateX(0);
    border: 1px solid deeppink;
  }`;

  useEffect(() => {
    addMessage({ text: `Some message` });
  }, [addMessage]);

  return (
    <>
      <style children={style} />
      <div className="playground light" title="should render prefixed toast neutral on light background">
        <PToast />
      </div>
    </>
  );
};
