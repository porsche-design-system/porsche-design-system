import { PToast, useToastManager } from '@porsche-design-system/components-react';
import { useEffect } from 'react';

export const ToastBasicLongTextPage = (): JSX.Element => {
  const { addMessage } = useToastManager();

  const style = `
  .inner {
    transform: translateX(0);
    height: 150px;
  }`;

  useEffect(() => {
    addMessage({
      text: 'Some message with a very long text across multiple lines that will break once the max width of 42rem is exceeded.',
    });
  }, [addMessage]);

  return (
    <>
      <style children={style} />
      <div className="playground light" title="should render toast multiline message on light background">
        <div className="inner">
          <PToast offsetBottom={0} />
        </div>
      </div>
    </>
  );
};
