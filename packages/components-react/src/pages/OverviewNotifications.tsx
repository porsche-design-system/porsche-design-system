/* Auto Generated File */
import { PBanner, PModal } from '@porsche-design-system/components-react';
import { useState } from 'react';
import { pollComponentsReady } from '../pollComponentsReady';
import { Toast } from '../components';

export const OverviewNotificationsPage = (): JSX.Element => {
  const [allReady, setAllReady] = useState(false);
  useEffect(() => {
    pollComponentsReady().then(() => {
      setAllReady(true);
    });
  }, []);

  const style = `
    .playground {
      height: 400px;
      padding: 0;
      margin: 0 7vw;
      transform: translateX(0);
      border: 4px solid deeppink;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }} />

      <div className="playground light" title="should render notifications in correct stacking order">
        <Toast />

        <PModal heading="The quick brown fox jumps over the lazy dog" open={true}>Some Content</PModal>

        <PBanner open={true}>
          <span slot="title">Default banner component</span>
          <span slot="description">Some slotted banner description</span>
        </PBanner>
      </div>
    </>
  );
};
