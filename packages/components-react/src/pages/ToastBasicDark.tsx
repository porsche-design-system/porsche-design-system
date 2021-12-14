import { PToast, useToastManager } from '@porsche-design-system/components-react';
import { useEffect } from 'react';

export const ToastBasicDarkPage = (): JSX.Element => {
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
      <div className="playground dark" title="should render toast neutral on dark background">
        <PToast theme="dark" />
      </div>
    </>
  );
};
