import { PHeading } from '@porsche-design-system/components-react/ssr';
import { Suspense } from 'react';
import AsyncTest from "../../components/AsyncTest";

export default function StreamingPage() {
  return (
    <>
      <PHeading>Test for Streaming DSR component</PHeading>
      <Suspense fallback="Loading...">
        <AsyncTest />
      </Suspense>
    </>
  );
};

