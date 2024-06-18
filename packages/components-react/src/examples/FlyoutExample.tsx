import { useCallback, useState } from 'react';
import { PButton, PText, PFlyout, PHeading, PButtonGroup } from '@porsche-design-system/components-react';

export const FlyoutExamplePage = (): JSX.Element => {
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
      <PFlyout open={isFlyoutOpen} onDismiss={onDismiss} aria={{ 'aria-label': 'Some Heading' }}>
        <PHeading slot="header" size="large" tag="h2">
          Some Heading
        </PHeading>
        <PText>Some Content</PText>
        <PButtonGroup slot="footer">
          <PButton type="button">Proceed</PButton>
          <PButton type="button" variant="secondary">
            Cancel
          </PButton>
        </PButtonGroup>
        <PText slot="sub-footer">Some Content</PText>
      </PFlyout>
    </>
  );
};
