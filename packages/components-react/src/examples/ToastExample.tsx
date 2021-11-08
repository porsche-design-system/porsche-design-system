import { useEffect } from 'react';
import { useToastManager, PToast } from '@porsche-design-system/components-react';

export const ToastExamplePage = (): JSX.Element => {
  const { addMessage } = useToastManager();

  useEffect(() => {
    addMessage({ message: 'asd', state: 'success' });
    addMessage({ message: 'asd2', state: 'success' });
    setTimeout(() => {
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
