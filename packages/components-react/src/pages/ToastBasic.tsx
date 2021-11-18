import { PToast, useToastManager } from '@porsche-design-system/components-react';
import { useEffect } from 'react';

export const ToastBasicPage = (): JSX.Element => {
  const { addMessage } = useToastManager();

  const style = `
  .playground {
    transform: translateX(0);
    height: 150px;
    padding: 0;
  }`;

  useEffect(() => {
    addMessage({ text: `Some message` });
  }, [addMessage]);

  return (
    <>
      <style children={style} />
      <div className="playground light" title="should render toast neutral on light background">
        <PToast />
      </div>
    </>
  );
};
