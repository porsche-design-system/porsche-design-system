/* Auto Generated File */
import type { NextPage } from 'next';
import { useState } from 'react';
import { componentsReady } from '@porsche-design-system/components-react/ssr';

/**
 * Since React 18, using componentsReady() within useEffect() constantly resolves with `0` in headless Chrome.
 * Therefore, we make it poll and check that more than `0` components are ready.
 */
export const pollComponentsReady = async (): Promise<number> => {
  const amount = await componentsReady();
  if (amount === 0) {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return pollComponentsReady();
  } else {
    return amount;
  }
};

import { Toast } from '../components';

const ToastBasicDarkPage: NextPage = (): JSX.Element => {
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

      <div className="playground dark" title="should render toast info on dark background">
        <Toast theme="dark" />
      </div>
    </>
  );
};

export default ToastBasicDarkPage;
