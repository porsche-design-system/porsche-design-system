'use client';
import type { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { PHeading, PModal, PText, PLink, PButtonGroup, PButton } from '@porsche-design-system/components-react/ssr';

const ModalPage: NextPage = (): JSX.Element => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const onDismiss = useCallback(() => {
    setIsModalOpen(false);
    router.back();
  }, []);

  return (
    <>
      <PHeading>Modal</PHeading>
      <PLink href="https://www.porsche.com">Some Link</PLink>
      <a href="https://www.porsche.com">Some Link</a>
      <div style={{ height: '1000px' }}></div>
      <PModal id="modal-scrollable" heading="Some Heading" open={isModalOpen} onDismiss={onDismiss}>
        <PText>Some Content</PText>
        <div style={{ height: '40vh' }} />
        <PText>More Content</PText>
        <div style={{ height: '40vh' }} />
        <PText>Even More Content</PText>
        <PButtonGroup className="footer">
          <PButton>Save</PButton>
          <PButton type="button" variant="secondary" icon="close" onClick={onDismiss}>
            Close
          </PButton>
        </PButtonGroup>
      </PModal>
    </>
  );
};

export default ModalPage;
