import { PToastC, PToastItemC } from '@porsche-design-system/components-react';
import { useEffect, useState } from 'react';

export const ToastExamplePage = (): JSX.Element => {
  const [toasts, setToasts] = useState([
    { toastId: '1', message: 'asd1' },
    { toastId: '2', message: 'asd2' },
  ]);

  useEffect(() => {
    setTimeout(() => {
      setToasts(() => [{ toastId: '3', message: 'asd3' }]);
    }, 10000);
  }, []);

  return (
    <>
      <PToastC>
        {toasts.map((toast) => (
          <PToastItemC
            key={toast.toastId}
            // @ts-ignore
            onClose={(e) => {
              // @ts-ignore
              setToasts((toasts) => toasts.filter((toast) => toast.toastId !== e.target.toastId));
            }}
            {...toast}
          />
        ))}
      </PToastC>
    </>
  );
};
