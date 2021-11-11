import { useToastManager, PToast } from '@porsche-design-system/components-react';
import { useCallback } from 'react';

export const ToastExamplePage = (): JSX.Element => {
  const { addToast } = useToastManager();

  const onButtonClick = useCallback(() => addToast({ message: 'Some message', state: 'success' }), [addToast]);

  return (
    <>
      <button onClick={onButtonClick}>Add Toast</button>
      <PToast />
    </>
  );
};
