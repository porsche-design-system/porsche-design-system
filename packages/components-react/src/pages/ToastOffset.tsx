import { PToast, useToastManager } from '@porsche-design-system/components-react';
import { useEffect } from 'react';

export const ToastOffsetPage = (): JSX.Element => {
  const { addMessage } = useToastManager();

  const style = `p-toast {
    display: block;
    margin-left: -0.5rem;
    margin-right: 0.5rem;
  }`;

  useEffect(() => {
    addMessage({ message: `Some message` });
  }, [addMessage]);

  return (
    <>
      <style children={style} />
      <div className="playground light" title="should render toast neutral on light background with offset {bottom: 0}">
        <PToast offset={{ bottom: 0 }} />
      </div>
    </>
  );
};
