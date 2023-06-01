import { useCallback, useState } from 'react';
import { PButton, PText, PFlyout, PHeading } from '@porsche-design-system/components-react';

export const FlyoutExampleSlottedPage = (): JSX.Element => {
  const [isFlyoutOpen, setIsFlyoutOpen] = useState<boolean>(false);
  const onOpen = useCallback(() => {
    setIsFlyoutOpen(true);
  }, []);
  const onDismiss = useCallback(() => {
    setIsFlyoutOpen(false);
  }, []);

  return (
    <>
      <PButton type="button" aria={{ 'aria-haspopup': 'dialog' }} onClick={onOpen}>
        Open Flyout
      </PButton>
      <PFlyout open={isFlyoutOpen} onDismiss={onDismiss} aria={{ 'aria-label': 'Sticky Heading' }}>
        <div slot="header">
          <PHeading tag="h5" size="large">
            Sticky Heading
          </PHeading>
          <PText size="small">Sticky header text</PText>
        </div>
        <PText style={{ width: '50vw', height: '100vh' }}>Some Content</PText>
        <div slot="footer">
          <PButton type="button">Footer Button</PButton>
        </div>
      </PFlyout>
    </>
  );
};
