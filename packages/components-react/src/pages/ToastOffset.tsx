import { PToast, useToastManager } from '@porsche-design-system/components-react';
import { useEffect } from 'react';

export const ToastOffsetPage = (): JSX.Element => {
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
      <div className="playground light" title="should render toast neutral on light background with offsetBottom">
        <div className="inner">
          <PToast offsetBottom={{ base: 0, xs: 10, s: 0, m: 10, l: 0, xl: 0 }} />
        </div>
      </div>
    </>
  );
};
