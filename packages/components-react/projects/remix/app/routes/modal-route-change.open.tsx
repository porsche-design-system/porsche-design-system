import { useCallback, useState } from 'react';
import { useNavigate } from '@remix-run/react';
import { PButton, PButtonGroup, PModal, PText } from '@porsche-design-system/components-react/ssr';

export default function OverviewModal(): JSX.Element {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const onDismiss = useCallback(() => {
    setIsModalOpen(false);
    navigate(-1);
  }, []);

  return (
    <PModal heading="Some Heading" open={isModalOpen} onDismiss={onDismiss}>
      <PText>Some Content</PText>
      <PButtonGroup className="footer">
        <PButton>Save</PButton>
        <PButton type="button" variant="secondary" icon="close" onClick={onDismiss}>
          Close
        </PButton>
      </PButtonGroup>
    </PModal>
  );
}
