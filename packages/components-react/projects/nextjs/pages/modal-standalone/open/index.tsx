'use client';

import { PButton, PHeading, PModal, PText } from '@porsche-design-system/components-react/ssr';
import type { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import ModalStandaloneLayout from './../layout';

const ModalStandaloneOpenPage: NextPage = (): JSX.Element => {
  const router = useRouter();
  const onDismiss = useCallback(() => {
    router.push('/modal-standalone', { scroll: false });
  }, []);

  return (
    <ModalStandaloneLayout>
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
    </ModalStandaloneLayout>
  );
};

export default ModalStandaloneOpenPage;
