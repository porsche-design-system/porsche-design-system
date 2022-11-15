/* Auto Generated File */
import { PBanner, PModal, PorscheDesignSystemProvider, PToast, useToastManager } from '@porsche-design-system/components-react';
import { useEffect } from 'react';

export const OverviewNotificationsPage = (): JSX.Element => {
  const { addMessage } = useToastManager();
  useEffect(() => {
    addMessage({ text: 'Some message' });
  }, [addMessage]);

  const style = `
    my-prefix-p-banner {
      --p-banner-position-top: 200px;
    }
  `;

  return (
    <PorscheDesignSystemProvider>
      <style dangerouslySetInnerHTML={{ __html: style }} />

      <div title="should render notifications in correct stacking order">
        <PToast />

        <PModal heading="Some heading" open={true}>Some Content</PModal>

        <PBanner>
          <span slot="title">Default banner component</span>
          <span slot="description">Some slotted banner description</span>
        </PBanner>

        <PBanner>
          <span slot="title">Prefixed banner component</span>
          <span slot="description">Some slotted banner description</span>
        </PBanner>
      </div>
    </PorscheDesignSystemProvider>
  );
};
