import { useCallback, useState } from 'react';
import { PButton, PText, PFlyout } from '@porsche-design-system/components-react';

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
      <PFlyout open={isFlyoutOpen} onDismiss={onDismiss}>
        <PText>Some content that dynamically scales the width of the flyout.</PText>
      </PFlyout>
    </>
  );
};
