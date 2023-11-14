'use client';
import type { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { PModal, PText, PButtonGroup, PButton } from '@porsche-design-system/components-react/ssr';

const ModalPage: NextPage = (): JSX.Element => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const onDismiss = useCallback(() => {
    setIsModalOpen(false);
    router.back();
  }, []);
  const style = `
    #app {
      transform: none;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }} />
      <PModal heading="Some Heading" open={isModalOpen} onDismiss={onDismiss}>
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
};

export default ModalPage;
