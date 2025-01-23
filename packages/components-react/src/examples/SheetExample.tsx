import { PButton, PHeading, PSheet, PText } from '@porsche-design-system/components-react';
import { useCallback, useState } from 'react';

export const SheetExamplePage = (): JSX.Element => {
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
  const onOpen = useCallback(() => {
    setIsSheetOpen(true);
  }, []);
  const onDismiss = useCallback(() => {
    setIsSheetOpen(false);
  }, []);

  return (
    <>
      <PButton type="button" aria={{ 'aria-haspopup': 'dialog' }} onClick={onOpen}>
        Open Sheet
      </PButton>
      <PSheet open={isSheetOpen} onDismiss={onDismiss} aria={{ 'aria-label': 'A slightly more detailed label' }}>
        <PHeading slot="header" size="large" tag="h2">
          Some Heading
        </PHeading>
        <PText>Some Content</PText>
      </PSheet>
    </>
  );
};
