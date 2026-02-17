import { PButton, PHeading, PModal, PText } from '@porsche-design-system/components-react';
import { useCallback, useState } from 'react';

export const ModalExampleAccessibilityPage = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const onOpen = useCallback(() => {
    setIsModalOpen(true);
  }, []);
  const onDismiss = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      <PButton type="button" aria={{ 'aria-haspopup': 'dialog' }} onClick={onOpen}>
        Open Modal
      </PButton>
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
