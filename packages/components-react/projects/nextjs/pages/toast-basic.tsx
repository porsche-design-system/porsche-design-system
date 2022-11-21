/* Auto Generated File */
import type { NextPage } from 'next';
import { PToast, useToastManager } from '@porsche-design-system/components-react/ssr';
import { useEffect } from 'react';

const ToastBasicPage: NextPage = (): JSX.Element => {
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
      <style dangerouslySetInnerHTML={{ __html: style }} />

      <div className="playground light" title="should render toast neutral on light background">
        <PToast />
      </div>
    </>
  );
};

export default ToastBasicPage;
