import { useCallback } from 'react';
import { useNavigate } from '@remix-run/react';
import { PButton, PButtonGroup, PModal, PText } from '@porsche-design-system/components-react/ssr';

export default function ModalOpen(): JSX.Element {
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
