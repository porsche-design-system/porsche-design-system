import { PToast, useToastManager } from '@porsche-design-system/components-react';
import { useEffect } from 'react';

export const ToastBasicLongTextPage = (): JSX.Element => {
  const { addMessage } = useToastManager();
  const style = `
    .playground {
      width: 240px;
    }
  `;
  const toastStyle = {
    '--p-toast-position': 'static',
    '--p-toast-skip-timeout': 'true',
  };
  useEffect(() => {
    addMessage({ message: `Some message` });
  }, []);

  return (
    <>
      <style children={style} />
      <div className="playground light" title="should render toast multiline message on light background">
        <PToast style={toastStyle as any} />
      </div>
    </>
  );
};
