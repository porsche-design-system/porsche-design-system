/* Auto Generated File */
import { PBanner, PModal, PorscheDesignSystemProvider, PToast, useToastManager } from '@porsche-design-system/components-react';
import { useEffect } from 'react';

export const OverviewNotificationsPage = (): JSX.Element => {
  const { addMessage } = useToastManager();
  useEffect(() => {
    addMessage({ text: 'The quick brown fox jumps over the lazy dog' });
  }, [addMessage]);

  const style = `
    .playground {
      height: 400px;
      padding: 0;
      margin: 0 7vw;
      transform: translateX(0);
      border: 4px solid deeppink;
    }

    p-banner:last-child,
    my-prefix-p-banner:last-child {
      --p-banner-position-top: 150px;
    }
  `;

  return (
    <PorscheDesignSystemProvider>
      <style dangerouslySetInnerHTML={{ __html: style }} />

      <div className="playground light" title="should render notifications in correct stacking order">
        <PToast />

        <PModal heading="The quick brown fox jumps over the lazy dog" open={true}>Some Content</PModal>

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
