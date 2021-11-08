import { useEffect, useRef } from 'react';
import { componentsReady, PToastB } from '@porsche-design-system/components-react';
import { ToastController } from '@porsche-design-system/components/src/components/feedback/toast-a/toast-a-manager';

export const ToastExampleManagedPage = (): JSX.Element => {
  const toastManager = useRef<typeof PToastB>();
  // const {addMessage] = useToastController();

  useEffect(() => {
    componentsReady().then(() => {
      // @ts-ignore
      toastManager.current.addMessage({ message: 'asd', state: 'success' });
      // @ts-ignore
      toastManager.current.addMessage({ message: 'asd2', state: 'success' });
      setTimeout(() => {
        // @ts-ignore
        toastManager.current.addMessage({ message: 'asd3', state: 'success' });
      }, 10000);
    });
  }, []);

  return (
    <>
      {/*// @ts-ignore*/}
      <PToastB ref={toastManager}></PToastB>
    </>
  );
};
