'use client';

import type { NextPage } from 'next';
import ModalStandaloneLayout from './layout';

const ModalStandalonePage: NextPage = (): JSX.Element => {
  // page is defined within layout.tsx to enable per-page layout
  // https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts#per-page-layouts
  return <ModalStandaloneLayout></ModalStandaloneLayout>;
};

export default ModalStandalonePage;
