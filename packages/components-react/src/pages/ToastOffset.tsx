import { PToast, useToastManager } from '@porsche-design-system/components-react';
import { useEffect } from 'react';

export const ToastOffsetPage = (): JSX.Element => {
  const { addMessage } = useToastManager();

  const style = `p-toast {
    --p-toast-position: relative;
    display: block;
    margin-left: -7vw;
    margin-right: 7vw;
  }`;

  useEffect(() => {
    addMessage({ message: `Some message` });
  }, [addMessage]);

  return (
    <>
      <style children={style} />
      <div className="playground light" title="should render toast neutral on light background with offset {bottom: 0}">
        <PToast offsetBottom={0} />
      </div>
    </>
  );
};
