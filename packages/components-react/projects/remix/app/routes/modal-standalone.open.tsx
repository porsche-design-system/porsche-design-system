import { useCallback } from 'react';
import { useNavigate } from '@remix-run/react';
import {PButton, PHeading, PModal, PText} from '@porsche-design-system/components-react/ssr';

export default function ModalStandaloneOpen(): JSX.Element {
  const navigate = useNavigate();
  const onDismiss = useCallback(() => {
    navigate(-1);
  }, []);

  return (
    <>
      <PModal open={true} onDismiss={onDismiss}>
        <PHeading slot="header" size="large" tag="h2">
          Some Heading
        </PHeading>
        <PText>Some Content</PText>
        <PButton slot="footer">Save</PButton>
        <PButton slot="footer" type="button" variant="secondary" icon="close" onClick={onDismiss}>
          Close
        </PButton>
      </PModal>
    </>
  );
}
