import type { NextPage } from 'next';
import { Suspense } from 'react';
import AsyncTest from '../components/AsyncTest';

const HomePage: NextPage = (): JSX.Element => {
  return (
    <>
      <Suspense fallback="Loading...">
        <AsyncTest />
      </Suspense>
    </>
  );
};

export default HomePage;
