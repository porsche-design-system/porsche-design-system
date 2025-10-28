'use client';

import { PButton, PHeading, PLink, PModal, PText } from '@porsche-design-system/components-react/ssr';
import Link from 'next/link';
import { type PropsWithChildren, useCallback, useState } from 'react';

export default function ModalStandaloneLayout({ children }: PropsWithChildren<{}>): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const onOpen = useCallback(() => {
    setIsModalOpen(true);
  }, []);
  const onDismiss = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <section>
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
        {/*The default behavior of <Link> is to scroll to the top of a new route or to maintain
        the scroll position for backwards and forwards navigation. When scroll={false}, next/link will not
        scroll to the top of the page after a navigation.*/}
        <Link href="/modal-standalone/open" scroll={false}>
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
      <main>{children}</main>
    </section>
  );
}
