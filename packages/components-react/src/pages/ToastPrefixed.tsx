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
  .inner {
    transform: translateX(0);
    height: 56px;
  }`;

  useEffect(() => {
    addMessage({ text: `Some message` });
  }, [addMessage]);

  return (
    <>
      <style children={style} />
      <div className="playground light" title="should render prefixed toast neutral on light background">
        <div className="inner">
          <PToast offsetBottom={0} />
        </div>
      </div>
    </>
  );
};
