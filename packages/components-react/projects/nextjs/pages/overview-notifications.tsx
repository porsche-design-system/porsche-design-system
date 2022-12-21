/* Auto Generated File */
import type { NextPage } from 'next';
import { PBanner, PModal, PorscheDesignSystemProvider } from '@porsche-design-system/components-react/ssr';
import { Toast } from '../components';

const OverviewNotificationsPage: NextPage = (): JSX.Element => {
  const style = `
    .playground {
      height: 400px;
      padding: 0;
      margin: 0 7vw;
      transform: translateX(0);
      border: 4px solid deeppink;
    }

    my-prefix-p-banner:last-child {
      --p-banner-position-top: 150px;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }} />

      <div className="playground light" title="should render notifications in correct stacking order">
        <div style={{ flex: 1 }}>
          <Toast text="The quick brown fox jumps over the lazy dog" />

          <PModal heading="The quick brown fox jumps over the lazy dog" open={true}>Some Content</PModal>

          <PBanner>
            <span slot="title">Default banner component</span>
            <span slot="description">Some slotted banner description</span>
          </PBanner>
        </div>

        <PorscheDesignSystemProvider prefix="my-prefix">
          <div style={{ flex: 1 }}>
            <PBanner>
              <span slot="title">Prefixed banner component</span>
              <span slot="description">Some slotted banner description</span>
            </PBanner>
          </div>
        </PorscheDesignSystemProvider>
      </div>
    </>
  );
};

export default OverviewNotificationsPage;
