import type { NextPage } from 'next';
import { PHeadline } from '@porsche-design-system/components-react';
import { Nav } from '../components';

const HomePage: NextPage = (): JSX.Element => {
  return (
    <>
      <PHeadline>
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </PHeadline>

      <Nav />
    </>
  );
};

export default HomePage;
