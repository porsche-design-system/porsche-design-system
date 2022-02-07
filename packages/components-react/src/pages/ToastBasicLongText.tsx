/* Auto Generated File */
import { PToast, useToastManager } from '@porsche-design-system/components-react';
import { useEffect } from 'react';

export const ToastBasicLongTextPage = (): JSX.Element => {
  const { addMessage } = useToastManager();
  useEffect(() => {
    addMessage({ text: 'Some message with a very long text across multiple lines that will break once the max width of 42rem is exceeded.' });
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

      <div className="playground light" title="should render toast multiline message on light background">
        <PToast />
      </div>
    </>
  );
};
