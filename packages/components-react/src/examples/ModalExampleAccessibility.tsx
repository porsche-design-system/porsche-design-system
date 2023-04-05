import { useCallback, useState } from 'react';
import { PModal, PButton, PText, PButtonGroup } from '@porsche-design-system/components-react';

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
      <PModal open={isModalOpen} onDismiss={onDismiss} aria="{ 'aria-label': 'Some Heading' }">
        <PText>Some Content</PText>
        <PButtonGroup className="footer">
          <PButton>Save</PButton>
          <PButton type="button" variant="tertiary" icon="close">
            Close
          </PButton>
        </PButtonGroup>
      </PModal>
    </>
  );
};
