import { Link, Outlet } from '@remix-run/react';
import { useCallback, useState } from 'react';
import { PModal, PText, PLink, PButtonGroup, PButton } from '@porsche-design-system/components-react/ssr';

export default function ModalLayout(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const onOpen = useCallback(() => {
    setIsModalOpen(true);
  }, []);
  const onDismiss = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <main>
      <PLink>
        <Link to="/">Back to Home</Link>
      </PLink>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        <div
          style={{
            height: '1000px',
            background: 'deeppink',
          }}
        ></div>
        <div
          style={{
            height: '1000px',
            background: 'darkcyan',
          }}
        ></div>
      </div>
      <PLink>
        <Link to="/modal-standalone/open" preventScrollReset={true}>
          Link to Modal (with route change)
        </Link>
      </PLink>
      <PButton type="button" aria={{ 'aria-haspopup': 'dialog' }} onClick={onOpen}>
        Open Modal (without route change)
      </PButton>
      {isModalOpen && (
        <PModal heading="Some Heading" open={isModalOpen} onDismiss={onDismiss}>
          <PText>Some Content</PText>
          <PButtonGroup className="footer">
            <PButton>Save</PButton>
            <PButton type="button" variant="secondary" icon="close" onClick={onDismiss}>
              Close
            </PButton>
          </PButtonGroup>
        </PModal>
      )}
      <Outlet />
    </main>
  );
}
