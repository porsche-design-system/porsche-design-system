import { useCallback } from 'react';
import { PButton, PButtonGroup, PModal, PText } from '@porsche-design-system/components-react/ssr';
import { useNavigate } from 'react-router';

export default function ModalStandaloneOpen(): JSX.Element {
  const navigate = useNavigate();
  const onDismiss = useCallback(() => {
    navigate(-1);
  }, []);

  return (
    <>
      <PModal heading="Some Heading" open={true} onDismiss={onDismiss}>
        <PText>Some Content</PText>
        <PButtonGroup className="footer">
          <PButton>Save</PButton>
          <PButton type="button" variant="secondary" icon="close" onClick={onDismiss}>
            Close
          </PButton>
        </PButtonGroup>
      </PModal>
    </>
  );
}
