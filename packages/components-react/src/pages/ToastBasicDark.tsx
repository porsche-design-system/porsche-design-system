import { PToast, useToastManager } from '@porsche-design-system/components-react';
import { useEffect } from 'react';

export const ToastBasicDarkPage = (): JSX.Element => {
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
      <div className="playground dark" title="should render toast neutral on dark background">
        <div className="inner">
          <PToast theme="dark" offsetBottom={0} />
        </div>
      </div>
    </>
  );
};
