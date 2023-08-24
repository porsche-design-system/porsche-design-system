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

const ToastPage: NextPage = (): JSX.Element => {
  const [allReady, setAllReady] = useState(false);
  useEffect(() => {
    pollComponentsReady().then(() => {
      setAllReady(true);
    });
  }, []);

  return (
    <>
      <div className="visualize-grid">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className="playground light" title="should render toast" style={{ height: '300px' }}>
        <Toast />
      </div>
    </>
  );
};

export default ToastPage;
