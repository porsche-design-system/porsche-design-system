import { PToast, Theme, ToastState, useToastManager } from '@porsche-design-system/components-react';
import { useEffect } from 'react';
import { match } from 'react-router-dom';

type Props = {
  match: match<{ state: ToastState; theme?: Theme }>;
};

export const ToastPage = ({
  match: {
    params: { state, theme = 'light' },
  },
}: Props): JSX.Element => {
  const { addMessage } = useToastManager();

  useEffect(() => {
    addMessage({ message: `Some ${state} message`, state });
  }, [state]);

  return <PToast theme={theme} />;
};
