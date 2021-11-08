import { useEffect, useRef } from 'react';
import { useToastManager, PToast } from '@porsche-design-system/components-react';

export const ToastExamplePage = (): JSX.Element => {
  const { addMessage } = useToastManager();

  useEffect(() => {
    // @ts-ignore
    addMessage({ message: 'asd', state: 'success' });
    // @ts-ignore
    addMessage({ message: 'asd2', state: 'success' });
    setTimeout(() => {
      // @ts-ignore
      addMessage({ message: 'asd3', state: 'success' });
    }, 10000);
  }, []);

  return (
    <>
      <button onClick={() => addMessage({ message: 'some message ' + new Date().toISOString(), state: 'success' })}>
        Add Toast
      </button>
      <PToast />
    </>
  );
};
