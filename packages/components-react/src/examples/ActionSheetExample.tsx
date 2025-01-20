import { PActionSheet, PButton, PHeading, PText } from '@porsche-design-system/components-react';
import { useCallback, useState } from 'react';

export const ActionSheetExamplePage = (): JSX.Element => {
  const [isActionSheetOpen, setIsActionSheetOpen] = useState<boolean>(false);
  const onOpen = useCallback(() => {
    setIsActionSheetOpen(true);
  }, []);
  const onDismiss = useCallback(() => {
    setIsActionSheetOpen(false);
  }, []);

  return (
    <>
      <PButton type="button" aria={{ 'aria-haspopup': 'dialog' }} onClick={onOpen}>
        Open Action Sheet
      </PButton>
      <PActionSheet
        open={isActionSheetOpen}
        onDismiss={onDismiss}
        aria={{ 'aria-label': 'A slightly more detailed label' }}
      >
        <PHeading slot="header" size="large" tag="h2">
          Some Heading
        </PHeading>
        <PText>Some Content</PText>
      </PActionSheet>
    </>
  );
};
