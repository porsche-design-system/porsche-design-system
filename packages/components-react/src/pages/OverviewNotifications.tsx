/* Auto Generated File */
import { PBanner, PModal } from '@porsche-design-system/components-react';
import { Toast } from '../components';

export const OverviewNotificationsPage = (): JSX.Element => {
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
        <Toast text="The quick brown fox jumps over the lazy dog" />

        <PModal heading="The quick brown fox jumps over the lazy dog" open={true}>Some Content</PModal>

        <PBanner>
          <span slot="title">Default banner component</span>
          <span slot="description">Some slotted banner description</span>
        </PBanner>
      </div>
    </>
  );
};
