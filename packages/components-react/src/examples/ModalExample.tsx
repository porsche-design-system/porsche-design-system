import {
  type ModalDismissEventDetail,
  PButton,
  PHeading,
  PModal,
  PText,
} from '@porsche-design-system/components-react';
import { useCallback, useState } from 'react';

export const ModalExampleAccessibilityPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [dismissReason, setDismissReason] = useState<ModalDismissEventDetail['reason'] | undefined>(undefined);
  const onOpen = useCallback(() => {
    setIsModalOpen(true);
  }, []);
  const onDismiss = useCallback((e: CustomEvent<ModalDismissEventDetail>) => {
    setDismissReason(e.detail.reason);
    setIsModalOpen(false);
  }, []);

  return (
    <>
      <PButton type="button" aria={{ 'aria-haspopup': 'dialog' }} onClick={onOpen}>
        Open Modal
      </PButton>
      <PText>Last dismissed via: {dismissReason ?? 'not dismissed yet'}</PText>
      <PModal open={isModalOpen} onDismiss={onDismiss} aria={{ 'aria-label': 'A slightly more detailed label' }}>
        <PHeading slot="header" size="large" tag="h2">
          Some Heading
        </PHeading>
        <PText>Some Content</PText>
        <PButton slot="footer" type="button">
          Accept
        </PButton>
        <PButton slot="footer" type="button" variant="secondary">
          Deny
        </PButton>
      </PModal>
    </>
  );
};
