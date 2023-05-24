import { useCallback, useState } from 'react';
import { PButton, PModal, PText, PButtonGroup, PCheckboxWrapper } from '@porsche-design-system/components-react';

export const ModalExampleChangeContentPage = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const onOpen = useCallback(() => {
    setIsModalOpen(true);
  }, []);
  const onDismiss = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const [someValue, setSomeValue] = useState<string>('Hello world!');

  return (
    <>
      <PButton type="button" aria={{ 'aria-haspopup': 'dialog' }} onClick={onOpen}>
        Open Modal
      </PButton>

      <PModal
        id="modal-scrollable"
        heading="Some Heading"
        fullscreen={{ base: true, s: false }}
        open={isModalOpen}
        onDismiss={onDismiss}
      >
        <PText>Some Content</PText>
        <div style={{ height: '70vh' }} />
        <PText>
          More Content <p>{someValue}</p>
        </PText>
        <PCheckboxWrapper label="Some label" hide-label="false">
          <input type="checkbox" name="some-name-1" onChange={() => setSomeValue('Checkbox change')} />
        </PCheckboxWrapper>
        <div style={{ height: '40vh' }} />
        <PText>Even More Content</PText>
        <PButtonGroup className="footer">
          <PButton>Save</PButton>
          <PButton type="button" variant="secondary" icon="close">
            Close
          </PButton>
        </PButtonGroup>
      </PModal>
    </>
  );
};
