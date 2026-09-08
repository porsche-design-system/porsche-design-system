import {
  PButton,
  PHeading,
  PSheet,
  PText,
  type SheetDismissEventDetail,
} from '@porsche-design-system/components-react';
import { useCallback, useState } from 'react';

export const SheetExamplePage = () => {
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
  const [dismissReason, setDismissReason] = useState<SheetDismissEventDetail['reason'] | undefined>(undefined);
  const onOpen = useCallback(() => {
    setIsSheetOpen(true);
  }, []);
  const onDismiss = useCallback((e: CustomEvent<SheetDismissEventDetail>) => {
    setDismissReason(e.detail.reason);
    setIsSheetOpen(false);
  }, []);

  return (
    <>
      <PButton type="button" aria={{ 'aria-haspopup': 'dialog' }} onClick={onOpen}>
        Open Sheet
      </PButton>
      <PText>Last dismissed via: {dismissReason ?? 'not dismissed yet'}</PText>
      <PSheet open={isSheetOpen} onDismiss={onDismiss} aria={{ 'aria-label': 'A slightly more detailed label' }}>
        <PHeading slot="header" size="large" tag="h2">
          Some Heading
        </PHeading>
        <PText>Some Content</PText>
      </PSheet>
    </>
  );
};
