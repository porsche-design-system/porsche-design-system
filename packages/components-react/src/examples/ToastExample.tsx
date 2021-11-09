import { useEffect } from 'react';
import { useToastManager, PToast } from '@porsche-design-system/components-react';

export const ToastExamplePage = (): JSX.Element => {
  const { addToast } = useToastManager();

  useEffect(() => {
    addToast({ message: 'asd', state: 'success' });
    addToast({ message: 'asd2', state: 'success' });
  }, [addToast]);

  return (
    <>
      <button onClick={() => addToast({ message: 'some message ' + new Date().toISOString(), state: 'success' })}>
        Add Toast
      </button>
      <PToast />
    </>
  );
};
