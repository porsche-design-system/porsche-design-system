/* Auto Generated File */
import { PToast, useToastManager } from '@porsche-design-system/components-react';
import { useEffect } from 'react';

export const ToastBasicDarkPage = (): JSX.Element => {
  const { addMessage } = useToastManager();
  useEffect(() => {
    addMessage({ text: 'Some message' });
  }, [addMessage]);


  const style = `
    .playground {
      height: 300px;
      padding: 0;
      transform: translateX(0);
      border: 1px solid deeppink;
    }
  `;

  return (
    <>
      <style children={style} />

      <div className="playground dark" title="should render toast neutral on dark background">
        <PToast theme="dark" />
      </div>
    </>
  );
};
