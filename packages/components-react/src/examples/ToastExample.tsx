import { useToastManager, PToast } from '@porsche-design-system/components-react';
import { useState } from 'react';

export const ToastExamplePage = (): JSX.Element => {
  const { addMessage } = useToastManager();
  const [counter, setCounter] = useState(1);

  const onButtonClick = () => {
    addMessage({ text: `Some message ${counter}`, state: 'success' });
    setCounter((prev) => prev + 1);
  };

  return (
    <>
      <button type="button" onClick={onButtonClick}>
        Queue Toast
      </button>
      <PToast />
    </>
  );
};
