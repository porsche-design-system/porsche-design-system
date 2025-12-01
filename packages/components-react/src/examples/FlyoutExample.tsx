import { PButton, PFlyout, PHeading, PText } from '@porsche-design-system/components-react';
import { useCallback, useState } from 'react';

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
        Open Modal
      </PButton>
      <PFlyout open={isFlyoutOpen} onDismiss={onDismiss} aria={{ 'aria-label': 'Some Heading' }}>
        <PHeading slot="header" size="large" tag="h2">
          Some Heading
        </PHeading>
        <PText>Some Content</PText>
        <PButton slot="footer" type="button">
          Proceed
        </PButton>
        <PButton slot="footer" type="button" variant="secondary">
          Cancel
        </PButton>
        <PText slot="sub-footer">Some Content</PText>
      </PFlyout>
    </>
  );
};
