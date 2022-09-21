import { useCallback, useState } from 'react';
import { PModal, PButton, PText, PButtonGroup } from '@porsche-design-system/components-react';

export const ModalExampleAccessibilityPage = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleModalOpen = useCallback(() => {
    setIsModalOpen(true);
  }, []);
  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      <PButton type="button" aria={{ 'aria-haspopup': 'dialog' }} onClick={handleModalOpen}>
        Open Modal
      </PButton>
      <PModal open={isModalOpen} onClose={handleModalClose}>
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
