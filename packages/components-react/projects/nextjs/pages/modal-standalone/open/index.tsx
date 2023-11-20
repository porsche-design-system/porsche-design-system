'use client';
import type { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { PModal, PText, PButtonGroup, PButton } from '@porsche-design-system/components-react/ssr';
import ModalStandaloneLayout from './../layout';

const ModalStandaloneOpenPage: NextPage = (): JSX.Element => {
  const router = useRouter();
  const onDismiss = useCallback(() => {
    router.push('/modal-standalone', { scroll: false });
  }, []);

  return (
    <ModalStandaloneLayout>
      <PModal heading="Some Heading" open={true} onDismiss={onDismiss}>
        <PText>Some Content</PText>
        <PButtonGroup className="footer">
          <PButton>Save</PButton>
          <PButton type="button" variant="secondary" icon="close" onClick={onDismiss}>
            Close
          </PButton>
        </PButtonGroup>
      </PModal>
    </ModalStandaloneLayout>
  );
};

export default ModalStandaloneOpenPage;
