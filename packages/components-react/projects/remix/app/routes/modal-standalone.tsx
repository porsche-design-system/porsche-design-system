import { Link, Outlet } from '@remix-run/react';
import {useCallback, useState} from 'react';
import {PModal, PText, PLink, PButton, PHeading} from '@porsche-design-system/components-react/ssr';

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
        <PModal open={isModalOpen} onDismiss={onDismiss}>
          <PHeading slot="header" size="large" tag="h2">
            Some Heading
          </PHeading>
          <PText>Some Content</PText>
          <PButton slot="footer">Save</PButton>
          <PButton slot="footer" type="button" variant="secondary" icon="close" onClick={onDismiss}>
            Close
          </PButton>
        </PModal>
      )}
      <Outlet />
    </main>
  );
}
