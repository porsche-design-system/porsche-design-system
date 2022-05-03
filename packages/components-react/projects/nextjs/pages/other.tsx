import type { NextPage } from 'next';
import { PHeadline, PText } from '@porsche-design-system/components-react';
import { Nav } from '../components';

const OtherPage: NextPage = (): JSX.Element => {
  return (
    <>
      <PHeadline>Other</PHeadline>
      <PText>Some more text</PText>

      <Nav />
    </>
  );
};

export default OtherPage;
