/* Auto Generated File */
import { PorscheDesignSystemProvider } from '@porsche-design-system/components-react';
import { useState } from 'react';
import { pollComponentsReady } from '../pollComponentsReady';
import { Toast } from '../components';

export const ToastPrefixedPage = (): JSX.Element => {
  const [allReady, setAllReady] = useState(false);
  useEffect(() => {
    pollComponentsReady().then(() => {
      setAllReady(true);
    });
  }, []);

  const style = `
    .playground {
      height: 300px;
      padding: 0;
      transform: translateX(0);
      border: 1px solid deeppink;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }} />

      <PorscheDesignSystemProvider prefix="my-prefix">
        <div className="playground light" title="should render prefixed toast info on light background">
          <Toast />
        </div>
      </PorscheDesignSystemProvider>
    </>
  );
};
