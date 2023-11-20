'use client';
import { type PropsWithChildren, useCallback, useState } from 'react';
import { PHeading, PModal, PText, PLink, PButtonGroup, PButton } from '@porsche-design-system/components-react/ssr';
import Link from 'next/link';

export default function ModalRouteChangeLayout({ children }: PropsWithChildren<{}>): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const onOpen = useCallback(() => {
    setIsModalOpen(true);
  }, []);
  const onDismiss = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <section>
      <PHeading>Welcome to Overview</PHeading>
      <PLink>
        <Link href="/">Back to Home</Link>
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
        <Link href="/modal-route-change/open" scroll={false}>
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
      <main>{children}</main>
    </section>
  );
}
