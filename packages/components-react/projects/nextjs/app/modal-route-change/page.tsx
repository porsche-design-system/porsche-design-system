'use client';

import type { NextPage } from 'next';
import { PLink } from '@porsche-design-system/components-react/ssr';
import Link from 'next/link';

const ModalRouteChangePage: NextPage = (): JSX.Element => {
  return (
    <>
      <PLink>
        <Link href="/">Back to Home</Link>
      </PLink>

      <div style={{ height: '1000px' }}></div>

      <PLink>
        <Link href="/modal-route-change/open">Open Modal</Link>
      </PLink>
    </>
  );
};

export default ModalRouteChangePage;
