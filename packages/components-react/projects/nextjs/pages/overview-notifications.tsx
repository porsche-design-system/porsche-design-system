/* Auto Generated File */
import type { NextPage } from 'next';
import { PBanner, PModal } from '@porsche-design-system/components-react/ssr';
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

const OverviewNotificationsPage: NextPage = (): JSX.Element => {
  const [allReady, setAllReady] = useState(false);
  useEffect(() => {
    pollComponentsReady().then(() => {
      setAllReady(true);
    });
  }, []);

  const style = `
    .playground > div {
      height: 300px;
      transform: translateX(0);
      border: 1px solid deeppink;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }} />

      <div className="playground light" title="should render notifications in correct stacking order">
        <div>
          <Toast />

          <PModal heading="The quick brown fox jumps over the lazy dog" open={true}>Some Content</PModal>

          <PBanner open={true}>
            <span slot="title">Default banner component</span>
            <span slot="description">Some slotted banner description</span>
          </PBanner>
        </div>
      </div>
    </>
  );
};

export default OverviewNotificationsPage;
